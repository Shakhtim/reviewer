import axios from 'axios';
import * as cheerio from 'cheerio';
import mongoose from 'mongoose';

// Подключение к MongoDB
mongoose.connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Определение схемы для отзывов
const reviewSchema = new mongoose.Schema({
    author: { type: String, required: true },
    nameSalon: { type: String, required: true },
    datePublished: { type: Date, required: true },
    title: { type: String, required: false },
    text: { type: String, required: true },
});

// Создание модели для отзывов
const Review = mongoose.model('Review', reviewSchema);

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

        // Извлечение ссылок на автосалоны
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

async function fetchReviews(link, nameSalon) {
    try {
        const { data } = await axios.get(link, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
            }
        });
        const $ = cheerio.load(data);

        const reviews = [];
        const nameSalon = $('.vcard.infosalon .fn.org').text().trim() || 'Без названия';
        $('.jot-comment').each((index, element) => {
            const author = $(element).find('.jot-name [itemprop="name"]').text().trim() || 'Автор отсутствует';
            const datePublished = $(element).find('[itemprop="datePublished"]').attr('content') || new Date();
            const title = $(element).find('.jot-subject h3').text().trim() || '';
            const text = $(element).find('[itemprop="reviewBody"]').text().trim() || '';

            reviews.push({
                author,
                nameSalon,
                datePublished: new Date(datePublished),
                title,
                text,
            });
        });

        return reviews;
        
    } catch (error) {
        console.error(`Ошибка при получении отзывов для ${link}:`, error.message);
        return [];
    }
}

async function saveReviewData(reviews) {
    for (const reviewData of reviews) {
        if (reviewData) {
            const existingReview = await Review.findOne({ author: reviewData.author, nameSalon: reviewData.nameSalon, datePublished: reviewData.datePublished });
            if (!existingReview) {
                const review = new Review(reviewData);
                await review.save();
                console.log(`Сохранен отзыв от: ${reviewData.author} для салона: ${reviewData.nameSalon}`);
            } else {
                console.log(`Отзыв от ${reviewData.author} для салона ${reviewData.nameSalon} уже существует в базе данных.`);
            }
        }
    }
}

async function main() {
    const salonLinks = await fetchSalonLinks();
    for (const link of salonLinks) {
        await delay(1000); // Задержка в 1 секунду между запросами
        const nameSalon = link.split('/').pop(); // Получаем название автосалона из ссылки
        const reviews = await fetchReviews(link, nameSalon);
        await saveReviewData(reviews);
    }

    console.log('Отзывы успешно сохранены в базе данных.');
}

main()
    .then(() => mongoose.connection.close())
    .catch(err => {
        console.error(err);
        mongoose.connection.close();
    });
