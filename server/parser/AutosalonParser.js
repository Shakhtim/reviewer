import axios from 'axios';
import * as cheerio from 'cheerio';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

// Подключение к MongoDB
mongoose.connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Определение схемы для автосалонов
const salonSchema = new mongoose.Schema({
    nameSalon: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    city: { type: String, required: true },
    image: { type: String, required: true },
    site: { type: String, required: true },
    status: { type: Boolean, default: false },
    schedule: { type: String },
    rating: { type: Number, min: 0, max: 5 },
});

// Создание модели для автосалонов
const Autosalon = mongoose.model('Autosalon', salonSchema);

const BASE_URL = 'https://автоопрос.рф';

// Функция задержки
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchSalonLinks() {
    try {
        const { data } = await axios.get(`${BASE_URL}/avtosalonyi_moskvyi`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
            }
        });
        const $ = cheerio.load(data);
        const salonLinks = [];

        $('div.item a[href]').each((index, element) => {
            const link = $(element).attr('href');
            if (link) {
                const fullLink = link.startsWith('http://') || link.startsWith('https://') 
                    ? link 
                    : `${BASE_URL}${link.startsWith('/') ? link : '/' + link}`;
                salonLinks.push(fullLink);
                console.log(`Собранная ссылка: ${fullLink}`); // Логирование ссылки
            }
        });

        return salonLinks;
    } catch (error) {
        console.error('Ошибка при получении ссылок:', error.message);
        return [];
    }
}

async function downloadImage(url, filename) {
    const folderPath = path.join('C:/react-projects/otzovik.local/', 'uploads', 'autosalons');

    // Создаем папку, если она не существует
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }

    // Функция для очистки имени файла от недопустимых символов
    const cleanFilename = (name) => {
        return name.replace(/[<>:"/\\|?*]/g, '_').substring(0, 255); // Ограничение длины имени файла до 255 символов
    };

    // Очищаем имя файла
    const safeFilename = cleanFilename(filename);

    const filePath = path.join(folderPath, safeFilename);

    const writer = fs.createWriteStream(filePath);

    const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream',
    });

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
    });
}

async function fetchSalonData(link) {
    try {
        const validUrl = link.startsWith('http://') || link.startsWith('https://');
        if (!validUrl) {
            console.error(`Некорректный URL: ${link}`);
            return null;
        }

        const { data } = await axios.get(link, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
            }
        });
        const $ = cheerio.load(data);

        // Извлечение данных из блока vcard
        const statusText = $('.vcard.infosalon .job').text().trim() || 'Информация отсутствует';
        const nameSalon = $('.vcard.infosalon .fn.org').text().trim() || 'Без названия';
        const address = $('.vcard.infosalon .street-address').text().trim() || 'Адрес отсутствует';
        const city = $('.vcard.infosalon .locality').text().trim() || 'Город отсутствует';
        const phone = $('.vcard.infosalon .tel').text().trim() || 'Телефон отсутствует';
        const schedule = $('.vcard.infosalon .workhours').text().trim() || 'Расписание отсутствует';
        const site = $('.vcard.infosalon [itemprop="url"]').text().trim() || 'Сайт отсутствует';
        const imagePath = $('.img_h img').attr('src') || 'Картинка отсутствует';
        
        // Сохраните полный путь к изображению
        const fullImagePath = imagePath.startsWith('http') ? imagePath : `${BASE_URL}/${imagePath}`;
        
        // Обрезаем путь, чтобы сохранить только имя файла
        const imageFilename = fullImagePath.split('/').pop(); 

        // Скачиваем изображение
        await downloadImage(fullImagePath, imageFilename);

        // Определение статуса как булево значение
        const status = statusText === 'Работает';

        // Логирование извлеченных данных
        console.log(`Данные для ${link}:`, {
            nameSalon,
            city,
            address,
            phone,
            status,
            schedule,
            site,
            image: imageFilename,
        });

        if (city === 'Москва') {
            return {
                nameSalon,
                address,
                city,
                phone,
                status,
                schedule,
                site,
                image: imageFilename, // Сохраняем только имя файла
            };
        }
        
    } catch (error) {
        console.error(`Ошибка при получении данных для ${link}:`, error.message);
        return null;
    }
}

async function saveSalonData(salonData) {
    if (salonData) {
        const existingSalon = await Autosalon.findOne({ nameSalon: salonData.nameSalon });
        if (!existingSalon) {
            const salon = new Autosalon(salonData);
            await salon.save();
            console.log(`Сохранен автосалон: ${salonData.nameSalon}`);
        } else {
            console.log(`Автосалон ${salonData.nameSalon} уже существует в базе данных.`);
        }
    }
}

async function main() {
    const salonLinks = await fetchSalonLinks();
    for (const link of salonLinks) {
        await delay(1000); // Задержка в 1 секунду между запросами
        const salonData = await fetchSalonData(link);
        await saveSalonData(salonData);
    }

    console.log('Данные успешно сохранены в базе данных.');
}

main()
    .then(() => mongoose.connection.close())
    .catch(err => {
        console.error(err);
        mongoose.connection.close();
    });
