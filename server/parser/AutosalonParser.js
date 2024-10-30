import axios from 'axios';
import * as cheerio from 'cheerio';
import mongoose from 'mongoose';

// Подключение к MongoDB
mongoose.connect('mongodb://localhost:27017/test');

// Определение схемы для автосалонов
const salonSchema = new mongoose.Schema({
    name: String,
    address: String,
    phone: String,
    website: String,
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
                // Формируем полный URL, если ссылка относительная
                const fullLink = link.startsWith('/') ? `${BASE_URL}${link}` : link;
                // Если ссылка не содержит базовый URL, добавляем его
                if (!fullLink.startsWith(BASE_URL)) {
                    salonLinks.push(`${BASE_URL}/${link}`);
                } else {
                    salonLinks.push(fullLink);
                }
                console.log(`Собранная ссылка: ${fullLink}`); // Логирование ссылки
            }
        });

        return salonLinks;
    } catch (error) {
        console.error('Ошибка при получении ссылок:', error.message);
        return [];
    }
}

async function fetchSalonData(link) {
    try {
        const { data } = await axios.get(link, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
            }
        });
        const $ = cheerio.load(data);

        const name = $('span[itemprop="name"]').text().trim();
        const address = $('span[itemprop="address"]').text().trim();
        const phone = $('span[itemprop="telephone"]').text().trim();
        const website = $('span[itemprop="url"]').text().trim();

        return { name, address, phone, website };
    } catch (error) {
        console.error(`Ошибка при получении данных для ${link}:`, error.message);
        return null;
    }
}

async function saveSalonData(salonData) {
    if (salonData) {
        const salon = new Autosalon(salonData);
        await salon.save();
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
