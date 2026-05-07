/**
 * ============================================================================
 * АКАДЕМИЯ ЗНАНИЙ - Образовательная платформа
 * ============================================================================
 * 
 * Это полноценное веб-приложение для образовательной платформы с следующими
 * возможностями:
 * - Каталог курсов с поиском и фильтрацией
 * - Страницы отдельных курсов с подробной информацией
 * - Подбор курса через квиз (5 вопросов)
 * - База знаний со статьями, глоссарием и вебинарами
 * - Аутентификация пользователей (вход/регистрация)
 * - Форма записи на консультацию
 * - Адаптивный дизайн с анимациями
 * 
 * СТЕК ТЕХНОЛОГИЙ:
 * - React 19 + TypeScript
 * - React Router DOM (навигация между страницами)
 * - Framer Motion (анимации)
 * - Tailwind CSS 4 (стилизация)
 * - LocalStorage (хранение данных пользователя)
 * 
 * ============================================================================
 */

// ИМПОРТЫ БИБЛИОТЕК
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef, useCallback } from 'react';

// ============================================================================
// ТИПЫ ДАННЫХ (INTERFACES)
// ============================================================================
// Описываем структуру данных для всех объектов, которые используем в приложении

/** Курс обучения */
interface Course {
  id: string;                    // Уникальный идентификатор курса (для URL)
  title: string;                 // Название курса
  category: string;              // Категория (IT, Дизайн, Маркетинг и т.д.)
  hours: number;                 // Длительность в часах
  rating: number;                // Рейтинг (0-5)
  students: number;              // Количество студентов
  instructor: string;            // ФИО преподавателя (кратко)
  price: number;                 // Полная стоимость в рублях
  monthlyPrice: number;          // Стоимость в месяц (рассрочка)
  format: 'Полностью дистанционно' | 'Очно-заочно'; // Формат обучения
  document: string;              // Тип документа по окончании
  image: string;                 // URL изображения курса
  description: string;           // Краткое описание
  instructorFullName: string;    // Полное ФИО преподавателя
  instructorTitle: string;       // Должность/звание преподавателя
  instructorExperience: string;  // Опыт преподавателя
  modules: Module[];             // Массив модулей курса
  benefits: string[];            // Список преимуществ курса
  months: number;                // Длительность в месяцах
  tags: string[];                // Теги для поиска
}

/** Модуль курса */
interface Module {
  number: number;    // Номер модуля
  title: string;     // Название модуля
  topics: string[];  // Список тем в модуле
}

/** Статья в базе знаний */
interface Article {
  id: string;        // Уникальный ID статьи
  title: string;     // Заголовок статьи
  category: string;  // Категория статьи
  readTime: string;  // Время чтения (например, "5 минут")
  excerpt: string;   // Краткое описание (анонс)
  image: string;     // URL изображения
  content: string;   // Полный текст статьи
}

/** Термин из глоссария */
interface Term {
  term: string;       // Сам термин
  category: string;   // Категория (IT, Дизайн и т.д.)
  definition: string; // Определение термина
}

/** Вебинар */
interface Webinar {
  id: string;         // Уникальный ID
  title: string;      // Название вебинара
  author: string;     // Автор/спикер
  date: string;       // Дата проведения
  views: number;      // Количество просмотров
  image: string;      // URL изображения-превью
  videoId: string;    // ID видео на YouTube (для embed)
}

/** Вопрос для квиза подбора курса */
interface Question {
  id: number;         // Номер вопроса
  question: string;   // Текст вопроса
  options: {          // Варианты ответов
    value: string;    // Значение для логики подбора
    label: string;    // Текст для отображения
  }[];
}

/** Пользователь */
interface User {
  email: string;      // Email пользователя
  name: string;       // Имя пользователя
  isLoggedIn: boolean; // Статус авторизации
}

/** Форма для заявки */
interface FormData {
  name: string;   // Имя
  email: string;  // Email
  phone: string;  // Телефон
}

// ============================================================================
// ДАННЫЕ (DATA)
// ============================================================================
// Здесь хранятся все статические данные приложения

/** Список всех курсов */
const courses: Course[] = [
  {
    id: 'data-science',
    title: 'Data Science: от основ машинного обучения',
    category: 'IT и программирование',
    hours: 320,
    rating: 4.9,
    students: 1240,
    instructor: 'Иванов А.С.',
    price: 65000,
    monthlyPrice: 5417,
    format: 'Полностью дистанционно',
    document: 'Диплом о профессиональной переподготовке',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop',
    description: 'Комплексная программа обучения аналитике данных и машинному обучению.',
    instructorFullName: 'Иванов Александр Сергеевич',
    instructorTitle: 'практикующий Data Scientist',
    instructorExperience: 'Более 10 лет опыта в анализе данных и машинном обучении.',
    months: 8,
    tags: ['программирование', 'анализ данных', 'python', 'ml'],
    modules: [
      { number: 1, title: 'Введение в Data Science', topics: ['Основы Python', 'Jupyter Notebook', 'NumPy и Pandas', 'Визуализация данных'] },
      { number: 2, title: 'Математика для Data Science', topics: ['Линейная алгебра', 'Матанализ', 'Теория вероятностей', 'Статистика'] },
      { number: 3, title: 'Машинное обучение', topics: ['Supervised Learning', 'Unsupervised Learning', 'Scikit-learn', 'Оценка моделей'] },
      { number: 4, title: 'Глубокое обучение', topics: ['Нейронные сети', 'TensorFlow и Keras', 'Компьютерное зрение', 'NLP'] },
      { number: 5, title: 'Практические проекты', topics: ['Анализ датасетов', 'Предсказательные модели', 'Деплой', 'Итоговый проект'] }
    ],
    benefits: ['Доступ к платформе', 'Библиотека материалов', 'Личный куратор', 'Помощь в трудоустройстве']
  },
  {
    id: 'graphic-design',
    title: 'Графический дизайн и визуальные коммуникации',
    category: 'Дизайн',
    hours: 256,
    rating: 4.8,
    students: 890,
    instructor: 'Петрова М.И.',
    price: 48000,
    monthlyPrice: 4000,
    format: 'Очно-заочно',
    document: 'Диплом о профессиональной переподготовке',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799314346d?w=800&h=500&fit=crop',
    description: 'Освойте профессию графического дизайнера с нуля.',
    instructorFullName: 'Петрова Мария Ивановна',
    instructorTitle: 'арт-директор, дизайнер',
    instructorExperience: '15 лет опыта в графическом дизайне.',
    months: 6,
    tags: ['дизайн', 'творчество', 'adobe', 'figma'],
    modules: [
      { number: 1, title: 'Основы дизайна', topics: ['Композиция', 'Теория цвета', 'Типографика', 'Брендинг'] },
      { number: 2, title: 'Инструменты дизайнера', topics: ['Photoshop', 'Illustrator', 'InDesign', 'Figma'] },
      { number: 3, title: 'Практика дизайна', topics: ['Логотипы', 'Полиграфия', 'Веб-дизайн', 'Соцсети'] },
      { number: 4, title: 'Портфолио и карьера', topics: ['Портфолио', 'Поиск клиентов', 'Ценообразование', 'Презентация'] }
    ],
    benefits: ['Портфолио из 10+ работ', 'Сообщество дизайнеров', 'Поиск заказов', 'Сертификат Adobe']
  },
  {
    id: 'project-management',
    title: 'Управление проектами (Project Management)',
    category: 'Управление',
    hours: 144,
    rating: 4.7,
    students: 1560,
    instructor: 'Сидоров В.П.',
    price: 35000,
    monthlyPrice: 2917,
    format: 'Полностью дистанционно',
    document: 'Удостоверение о повышении квалификации',
    image: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&h=500&fit=crop',
    description: 'Научитесь эффективно управлять проектами любой сложности.',
    instructorFullName: 'Сидоров Владимир Петрович',
    instructorTitle: 'PMP, сертифицированный проектный менеджер',
    instructorExperience: '20 лет опыта управления проектами.',
    months: 4,
    tags: ['менеджмент', 'управление', 'agile', 'scrum'],
    modules: [
      { number: 1, title: 'Основы управления проектами', topics: ['Жизненный цикл', 'Инициация', 'Планирование', 'Риски'] },
      { number: 2, title: 'Agile и Scrum', topics: ['Принципы Agile', 'Scrum', 'Sprint Planning', 'Daily Standup'] },
      { number: 3, title: 'Инструменты PM', topics: ['Jira', 'Trello', 'MS Project', 'Диаграмма Ганта'] },
      { number: 4, title: 'Команда и коммуникации', topics: ['Управление командой', 'Коммуникация', 'Конфликты', 'Мотивация'] }
    ],
    benefits: ['Подготовка к PMP', 'Шаблоны документации', 'База знаний PM', 'Карьерная консультация']
  },
  {
    id: 'frontend-react',
    title: 'Frontend-разработка: React и современный JavaScript',
    category: 'IT и программирование',
    hours: 288,
    rating: 4.9,
    students: 2100,
    instructor: 'Киселев М.В.',
    price: 58000,
    monthlyPrice: 4833,
    format: 'Полностью дистанционно',
    document: 'Диплом о профессиональной переподготовке',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=500&fit=crop',
    description: 'Станьте профессиональным frontend-разработчиком.',
    instructorFullName: 'Киселев Михаил Викторович',
    instructorTitle: 'Senior Frontend Developer',
    instructorExperience: '12 лет разработки frontend-приложений.',
    months: 6,
    tags: ['программирование', 'веб-разработка', 'javascript', 'react'],
    modules: [
      { number: 1, title: 'Современный JavaScript', topics: ['ES6+', 'Асинхронность', 'API', 'Модули'] },
      { number: 2, title: 'React основы', topics: ['Компоненты', 'Хуки', 'Состояние', 'Роутинг'] },
      { number: 3, title: 'Продвинутый React', topics: ['Redux', 'React Query', 'Оптимизация', 'Тестирование'] },
      { number: 4, title: 'TypeScript и инструменты', topics: ['TypeScript', 'Типизация React', 'Webpack', 'CI/CD'] },
      { number: 5, title: 'Финальный проект', topics: ['Архитектура', 'SPA', 'Деплой', 'Презентация'] }
    ],
    benefits: ['Портфолио из 5 проектов', 'Code review', 'Подготовка к собеседованиям', 'Гарантия трудоустройства']
  },
  {
    id: 'construction',
    title: 'Строительство и техническая экспертиза',
    category: 'Строительство',
    hours: 360,
    rating: 4.6,
    students: 450,
    instructor: 'Малафеев Б.А.',
    price: 72000,
    monthlyPrice: 6000,
    format: 'Очно-заочно',
    document: 'Диплом о профессиональной переподготовке',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=500&fit=crop',
    description: 'Программа для инженеров и специалистов строительной отрасли.',
    instructorFullName: 'Малафеев Борис Андреевич',
    instructorTitle: 'кандидат технических наук',
    instructorExperience: '25 лет в строительной отрасли.',
    months: 9,
    tags: ['строительство', 'инженерия', 'экспертиза'],
    modules: [
      { number: 1, title: 'Нормативная база', topics: ['СП и ГОСТ', 'Техрегламенты', 'Лицензирование', 'СРО'] },
      { number: 2, title: 'Технологии строительства', topics: ['Материалы', 'Монолит', 'Каркасы', 'Инженерные системы'] },
      { number: 3, title: 'Экспертиза и контроль', topics: ['Технадзор', 'Приемка', 'Дефектовка', 'Судебная экспертиза'] },
      { number: 4, title: 'Управление стройкой', topics: ['Организация работ', 'Сметы', 'Охрана труда', 'Экология'] }
    ],
    benefits: ['Реестр экспертов', 'Допуск к СРО', 'Выезды на объекты', 'Обновление материалов']
  },
  {
    id: 'digital-marketing',
    title: 'Digital-маркетинг и SMM',
    category: 'Маркетинг',
    hours: 180,
    rating: 4.8,
    students: 1780,
    instructor: 'Новикова Е.С.',
    price: 42000,
    monthlyPrice: 3500,
    format: 'Полностью дистанционно',
    document: 'Удостоверение о повышении квалификации',
    image: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&h=500&fit=crop',
    description: 'Освойте востребованную профессию digital-маркетолога.',
    instructorFullName: 'Новикова Елена Сергеевна',
    instructorTitle: 'Head of Digital Marketing',
    instructorExperience: '10 лет в digital-маркетинге.',
    months: 5,
    tags: ['маркетинг', 'smm', 'реклама', 'таргет'],
    modules: [
      { number: 1, title: 'Основы digital-маркетинга', topics: ['Стратегия', 'ЦА', 'Позиционирование', 'Аналитика'] },
      { number: 2, title: 'SMM и контент', topics: ['Стратегия в соцсетях', 'Контент-план', 'Визуал', 'Копирайтинг'] },
      { number: 3, title: 'Таргетированная реклама', topics: ['VK Реклама', 'Яндекс.Директ', 'Telegram Ads', 'Оптимизация'] },
      { number: 4, title: 'Аналитика и отчетность', topics: ['Метрика', 'Analytics', 'Сквозная аналитика', 'ROI'] }
    ],
    benefits: ['Реальные проекты', 'Бюджет на рекламу', 'Сертификаты', 'Чат маркетологов']
  },
  {
    id: 'python-beginner',
    title: 'Python для начинающих',
    category: 'IT и программирование',
    hours: 120,
    rating: 4.7,
    students: 3200,
    instructor: 'Смирнов П.А.',
    price: 28000,
    monthlyPrice: 2333,
    format: 'Полностью дистанционно',
    document: 'Сертификат о прохождении курса',
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&h=500&fit=crop',
    description: 'Идеальный старт в программировании.',
    instructorFullName: 'Смирнов Петр Александрович',
    instructorTitle: 'Python Developer',
    instructorExperience: '8 лет разработки на Python.',
    months: 3,
    tags: ['программирование', 'python', 'начинающим'],
    modules: [
      { number: 1, title: 'Основы Python', topics: ['Синтаксис', 'Типы данных', 'Условные операторы', 'Циклы'] },
      { number: 2, title: 'Функции и модули', topics: ['Функции', 'Модули', 'Обработка ошибок', 'Файлы'] },
      { number: 3, title: 'Проекты', topics: ['Парсер', 'Telegram бот', 'Веб-скрапинг', 'Финальный проект'] }
    ],
    benefits: ['Базовые знания', '3 проекта', 'Поддержка куратора', 'Сертификат']
  }
];

/** Вопросы для квиза подбора курса */
const questions: Question[] = [
  { 
    id: 1, 
    question: 'Какая сфера деятельности вас интересует?', 
    options: [
      { value: 'it', label: 'IT и программирование' },
      { value: 'design', label: 'Дизайн и творчество' },
      { value: 'marketing', label: 'Маркетинг и продажи' },
      { value: 'management', label: 'Управление и бизнес' },
      { value: 'construction', label: 'Строительство и инженерия' }
    ]
  },
  { 
    id: 2, 
    question: 'Какой у вас уровень подготовки?', 
    options: [
      { value: 'beginner', label: 'Начинающий (никогда не изучал)' },
      { value: 'basic', label: 'Базовый (знаком с основами)' },
      { value: 'intermediate', label: 'Средний (есть опыт работы)' },
      { value: 'advanced', label: 'Продвинутый (хочу углубить знания)' }
    ]
  },
  { 
    id: 3, 
    question: 'Сколько времени готовы уделять обучению?', 
    options: [
      { value: 'short', label: 'До 3 месяцев' },
      { value: 'medium', label: '3-6 месяцев' },
      { value: 'long', label: '6-12 месяцев' }
    ]
  },
  { 
    id: 4, 
    question: 'Какой формат обучения предпочитаете?', 
    options: [
      { value: 'online', label: 'Полностью онлайн' },
      { value: 'blended', label: 'Смешанный (онлайн + очно)' },
      { value: 'any', label: 'Не имеет значения' }
    ]
  },
  { 
    id: 5, 
    question: 'Какой бюджет на обучение?', 
    options: [
      { value: 'low', label: 'До 30 000 ₽' },
      { value: 'medium', label: '30 000 - 50 000 ₽' },
      { value: 'high', label: 'Более 50 000 ₽' },
      { value: 'any', label: 'Не имеет значения' }
    ]
  }
];

/** Статьи для базы знаний */
const articles: Article[] = [
  { id: '1', title: 'Как поступить на курс: пошаговая инструкция', category: 'Гайды', readTime: '5 минут', excerpt: 'Подробное руководство по записи на курс.', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop', content: 'Шаг 1: Выберите курс в каталоге. Шаг 2: Нажмите кнопку "Записаться". Шаг 3: Заполните форму заявки. Шаг 4: Оплатите обучение. Шаг 5: Получите доступ к платформе и начните учиться!' },
  { id: '2', title: 'Data Scientist: профессия будущего', category: 'Обзоры профессий', readTime: '8 минут', excerpt: 'Что делает Data Scientist.', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop', content: 'Data Scientist — это специалист, который анализирует большие данные и строит прогнозные модели. Средняя зарплата от 150 000 рублей.' },
  { id: '3', title: 'Frontend-разработчик: путь от новичка до профи', category: 'Обзоры профессий', readTime: '10 минут', excerpt: 'Как стать Frontend-разработчиком.', image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600&h=400&fit=crop', content: 'Frontend-разработчик создаёт пользовательские интерфейсы. Изучайте HTML, CSS, JavaScript, React.' },
  { id: '4', title: 'Как эффективно учиться онлайн: 10 советов', category: 'Гайды', readTime: '6 минут', excerpt: 'Проверенные методики для обучения.', image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=400&fit=crop', content: '1. Составьте расписание. 2. Делайте перерывы. 3. Практикуйтесь. 4. Задавайте вопросы. 5. Повторяйте материал.' },
  { id: '5', title: 'Digital-маркетолог: навыки и карьера', category: 'Обзоры профессий', readTime: '7 минут', excerpt: 'Что входит в работу digital-маркетолога.', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop', content: 'Digital-маркетолог продвигает бренды в интернете. Нужны знания SMM, таргета, аналитики.' },
  { id: '6', title: 'Графический дизайнер: творчество и технологии', category: 'Обзоры профессий', readTime: '9 минут', excerpt: 'Обзор профессии дизайнера.', image: 'https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?w=600&h=400&fit=crop', content: 'Графический дизайнер создаёт визуальный контент. Изучайте Photoshop, Illustrator, Figma.' }
];

/** Термины для глоссария */
const termsData: Term[] = [
  { term: 'API', category: 'IT', definition: 'Application Programming Interface - набор методов для взаимодействия программ.' },
  { term: 'Machine Learning', category: 'Data Science', definition: 'Машинное обучение - раздел ИИ, изучающий алгоритмы, способные обучаться.' },
  { term: 'UX/UI Design', category: 'Дизайн', definition: 'Проектирование пользовательского опыта и интерфейсов.' },
  { term: 'SEO', category: 'Маркетинг', definition: 'Поисковая оптимизация сайтов для улучшения видимости.' },
  { term: 'Scrum', category: 'Управление', definition: 'Фреймворк для гибкой разработки продуктов.' },
  { term: 'React', category: 'IT', definition: 'JavaScript-библиотека для создания пользовательских интерфейсов.' },
  { term: 'SMM', category: 'Маркетинг', definition: 'Маркетинг в социальных сетях.' },
  { term: 'Figma', category: 'Дизайн', definition: 'Инструмент для дизайна интерфейсов и прототипирования.' }
];

/** Вебинары с YouTube видео */
const webinars: Webinar[] = [
  { id: '1', title: 'Введение в Data Science', author: 'Александр Иванов', date: '20 марта 2026', views: 2400, image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop', videoId: 'rfscVS0vtbw' },
  { id: '2', title: 'Тренды веб-разработки в 2026', author: 'Дмитрий Козлов', date: '15 марта 2026', views: 3100, image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600&h=400&fit=crop', videoId: 'PkZNo7MFNFg' },
  { id: '3', title: 'Как начать карьеру в IT', author: 'Елена Новикова', date: '10 марта 2026', views: 4200, image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop', videoId: 'k9WqpQp8VSU' }
];

/** Изображения для слайдера на главной странице */
const sliderImages = [
  '/images/slider/sl1.png',
  '/images/slider/sl2.png',
  '/images/slider/sl3.png',
  '/images/slider/sl4.png',
];

/** Часто задаваемые вопросы (FAQ) */
const faqs = [
  { q: 'Как начать обучение?', a: 'Для начала обучения выберите интересующий курс, заполните заявку на сайте и оплатите обучение. После этого вы получите доступ к платформе и сможете начать учиться.' },
  { q: 'Как проходит аттестация?', a: 'Аттестация проходит в формате онлайн-тестирования и защиты практических проектов. Некоторые программы требуют очной защиты.' },
  { q: 'Выдается ли диплом государственного образца?', a: 'Да, программы профессиональной переподготовки завершаются выдачей диплома государственного образца.' },
  { q: 'Можно ли учиться с мобильного телефона?', a: 'Да, наша платформа адаптирована для мобильных устройств. Вы можете учиться с телефона, планшета или компьютера.' }
];

/** Новости для главной страницы */
const news = [
  { title: 'Новые программы повышения квалификации в области IT', desc: 'Мы запустили 5 новых программ для IT-специалистов: Python-разработка, Data Science, Кибербезопасность и другие...', date: '28 марта 2026', category: 'Новости', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop', id: 'news1' },
  { title: 'Расписание вебинаров на май 2026', desc: 'Приглашаем на бесплатные вебинары для абитуриентов. Узнайте больше о наших программах, задайте вопросы...', date: '20 апреля 2026', category: 'События', image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=400&fit=crop', id: 'news2' },
  { title: 'Как онлайн-образование меняет карьерные возможности', desc: 'Статья от нашего ректора о том, как дистанционное обучение открывает новые горизонты для профессионального развития...', date: '20 марта 2026', category: 'Статьи', image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=600&h=400&fit=crop', id: 'news3' }
];

// ============================================================================
// АНИМАЦИИ (FRAMER MOTION VARIANTS)
// ============================================================================
// Предопределённые настройки анимаций для переиспользования

/** Анимация появления элемента с движением вверх */
const fadeInUp = { 
  hidden: { opacity: 0, y: 20 },   // Начальное состояние: невидим, смещён вниз
  visible: { opacity: 1, y: 0 }    // Конечное состояние: виден, на месте
};

/** Анимация для контейнера с дочерними элементами (появляются по очереди) */
const staggerContainer = { 
  hidden: { opacity: 0 }, 
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.1 } // Каждый дочерний элемент появляется с задержкой 0.1с
  } 
};

// ============================================================================
// КОМПОНЕНТЫ
// ============================================================================

/**
 * Модальное окно авторизации (вход/регистрация)
 * @param isOpen - открыто ли модальное окно
 * @param onClose - функция закрытия окна
 * @param onLogin - функция успешного входа (сохраняет пользователя)
 */
function AuthModal({ isOpen, onClose, onLogin }: { isOpen: boolean; onClose: () => void; onLogin: (user: User) => void }) {
  const [isLogin, setIsLogin] = useState(true); // Режим: вход (true) или регистрация (false)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  /** Обработка отправки формы */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Создаём объект пользователя и сохраняем в localStorage
    const user = { email, name: name || email.split('@')[0], isLoggedIn: true };
    localStorage.setItem('user', JSON.stringify(user));
    onLogin(user); // Передаём пользователя в родительский компонент
    onClose(); // Закрываем модальное окно
  };

  // Если окно закрыто - ничего не рендерим
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose} // Закрытие по клику на затемнение
      >
        <motion.div 
          className="bg-white rounded-2xl p-8 max-w-md w-full"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()} // Предотвращаем закрытие при клике на форму
        >
          <h2 className="text-2xl font-serif text-slate-900 mb-6 text-center">
            {isLogin ? 'Вход в аккаунт' : 'Регистрация'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Поле имени (только для регистрации) */}
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
              >
                <input
                  type="text"
                  placeholder="Ваше имя"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500"
                  required={!isLogin}
                />
              </motion.div>
            )}
            {/* Поле email */}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500"
              required
            />
            {/* Поле пароля */}
            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500"
              required
            />
            {/* Кнопка отправки */}
            <motion.button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-medium transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLogin ? 'Войти' : 'Зарегистрироваться'}
            </motion.button>
          </form>
          
          {/* Переключатель между входом и регистрацией */}
          <p className="text-center mt-6 text-slate-600">
            {isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}{' '}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-500 hover:underline font-medium"
            >
              {isLogin ? 'Зарегистрироваться' : 'Войти'}
            </button>
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/**
 * Модальное окно для записи на консультацию
 * @param isOpen - открыто ли окно
 * @param onClose - функция закрытия
 */
function ConsultationModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', phone: '' });

  /** Обработка отправки формы */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Сохраняем заявку в localStorage (в реальном проекте здесь была бы отправка на сервер)
    localStorage.setItem('consultationRequest', JSON.stringify({ ...formData, date: new Date().toISOString() }));
    alert('Спасибо! Мы свяжемся с вами в ближайшее время.');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div 
          className="bg-white rounded-2xl p-8 max-w-md w-full"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-2xl font-serif text-slate-900 mb-2 text-center">Записаться на консультацию</h2>
          <p className="text-slate-500 text-center mb-6">Оставьте свои данные, и мы перезвоним вам</p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Ваше имя"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500"
              required
            />
            <input
              type="tel"
              placeholder="Телефон"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500"
              required
            />
            <motion.button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-medium transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Отправить заявку
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/**
 * Шапка сайта (Header)
 * Содержит логотип, навигацию и кнопки входа
 * @param onOpenAuth - функция открытия модального окна авторизации
 * @param user - текущий пользователь
 * @param onLogout - функция выхода
 */
function Header({ onOpenAuth, user, onLogout }: { onOpenAuth: () => void; user: User | null; onLogout: () => void }) {
  const navigate = useNavigate();
  
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Логотип */}
          <Link to="/" className="flex items-center gap-2">
          <img 
                  src="./images/logo2.png" 
                  alt="Академия Знаний" 
                  className="w-8 h-8"
                />
            <span className="text-blue-500 font-medium text-sm">Академия <br /> Знаний</span>
          </Link>
          
          {/* Навигация */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/catalog" className="text-slate-700 hover:text-blue-500 transition-colors">Курсы</Link>
            <Link to="/knowledge-base" className="text-slate-700 hover:text-blue-500 transition-colors">База знаний</Link>
            <Link to="/matcher" className="text-slate-700 hover:text-blue-500 transition-colors">Подбор курса</Link>
          </nav>
          
          {/* Кнопки справа */}
          <div className="flex items-center gap-4">
            {user?.isLoggedIn ? (
              // Если пользователь авторизован
              <div className="flex items-center gap-4">
                <span className="text-slate-700">Привет, {user.name}!</span>
                <button onClick={onLogout} className="text-slate-500 hover:text-slate-700">Выйти</button>
              </div>
            ) : (
              // Если не авторизован
              <>
                <button onClick={onOpenAuth} className="hidden sm:block text-blue-500 hover:text-blue-600 transition-colors">Войти</button>
                <motion.button 
                  className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-xl font-medium transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (user?.isLoggedIn) {
                      navigate('/matcher'); // Если авторизован - идём на подбор курса
                    } else {
                      onOpenAuth(); // Если нет - открываем форму входа
                    }
                  }}
                >
                  Начать обучение
                </motion.button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

/**
 * Подвал сайта (Footer)
 * Содержит контакты и навигацию
 */
function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Информация о компании */}
          <div>
            <div className="flex items-center gap-2 mb-4">
               <img 
                src="./images/logo3.png" 
                alt="Академия Знаний" 
                className="w-8 h-8"
              />
              <span className="font-medium text-sm text-white">Академия <br /> Знаний</span>
            </div>
            <p className="text-slate-400 text-sm max-w-xs">Современная образовательная платформа с государственной аккредитацией.</p>
          </div>
          {/* Навигация */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Навигация</h3>
            <ul className="space-y-2 text-slate-400">
              <li><Link to="/catalog" className="hover:text-white transition-colors">Каталог курсов</Link></li>
              <li><Link to="/knowledge-base" className="hover:text-white transition-colors">База знаний</Link></li>
              <li><Link to="/matcher" className="hover:text-white transition-colors">Подбор программы</Link></li>
            </ul>
          </div>
          {/* Контакты */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Контакты</h3>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-center gap-2">📞 +7 (946) 123-45-67</li>
              <li className="flex items-center gap-2">✉️ AcademyofKnowledge@mail.ru</li>
              <li className="flex items-center gap-2">📍 г. Самара, Московское шоссе, 125А</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400 text-sm">
          © 2026 Академия Знаний. Все права защищены.
        </div>
      </div>
    </footer>
  );
}

/**
 * Страница подбора курса (Квиз)
 * Пошаговый опрос для подбора подходящих курсов
 * @param onOpenConsultation - функция открытия формы консультации
 */
function CourseMatcherPage({ onOpenConsultation }: { onOpenConsultation: () => void }) {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0); // Текущий шаг квиза (0-4)
  const [answers, setAnswers] = useState<Record<number, string>>({}); // Ответы пользователя
  const [showResults, setShowResults] = useState(false); // Показывать ли результаты
  const [matchedCourses, setMatchedCourses] = useState<{ course: Course; match: number }[]>([]); // Подобранные курсы

  // Загрузка сохранённых ответов из localStorage при монтировании компонента
  useEffect(() => {
    const saved = localStorage.getItem('matcherAnswers');
    if (saved) {
      const parsed = JSON.parse(saved);
      setAnswers(parsed.answers);
      setCurrentStep(parsed.currentStep);
      if (parsed.showResults) {
        setShowResults(true);
        calculateMatches(parsed.answers);
      }
    }
  }, []);

  // Сохранение прогресса в localStorage при изменении
  useEffect(() => {
    localStorage.setItem('matcherAnswers', JSON.stringify({ answers, currentStep, showResults }));
  }, [answers, currentStep, showResults]);

  /** Обработка выбора ответа */
  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [questions[currentStep].id]: value });
  };

  /** Переход к следующему шагу или показ результатов */
  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      calculateMatches(answers);
    }
  };

  /** Возврат к предыдущему шагу */
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  /** Расчёт совпадений курсов на основе ответов */
  const calculateMatches = (currentAnswers: Record<number, string>) => {
    const results = courses.map(course => {
      let match = 50; // Базовый процент совпадения
      
      // Совпадение по категории
      const categoryAnswer = currentAnswers[1];
      if (categoryAnswer === 'it' && course.category === 'IT и программирование') match += 25;
      if (categoryAnswer === 'design' && course.category === 'Дизайн') match += 25;
      if (categoryAnswer === 'marketing' && course.category === 'Маркетинг') match += 25;
      if (categoryAnswer === 'management' && course.category === 'Управление') match += 20;
      if (categoryAnswer === 'construction' && course.category === 'Строительство') match += 25;

      // Совпадение по уровню подготовки
      const levelAnswer = currentAnswers[2];
      if (levelAnswer === 'beginner' && course.hours < 200) match += 10;
      if (levelAnswer === 'intermediate' && course.hours >= 200 && course.hours < 300) match += 10;
      if (levelAnswer === 'advanced' && course.hours >= 300) match += 10;

      // Совпадение по длительности
      const durationAnswer = currentAnswers[3];
      if (durationAnswer === 'short' && course.months <= 3) match += 10;
      if (durationAnswer === 'medium' && course.months > 3 && course.months <= 6) match += 10;
      if (durationAnswer === 'long' && course.months > 6) match += 10;

      // Совпадение по формату
      const formatAnswer = currentAnswers[4];
      if (formatAnswer === 'online' && course.format === 'Полностью дистанционно') match += 5;
      if (formatAnswer === 'blended' && course.format === 'Очно-заочно') match += 5;

      // Совпадение по бюджету
      const budgetAnswer = currentAnswers[5];
      if (budgetAnswer === 'low' && course.price <= 30000) match += 5;
      if (budgetAnswer === 'medium' && course.price > 30000 && course.price <= 50000) match += 5;
      if (budgetAnswer === 'high' && course.price > 50000) match += 5;

      return { course, match: Math.min(match, 99) };
    });

    // Сортируем по проценту совпадения и берём топ-3
    const sorted = results.sort((a, b) => b.match - a.match).slice(0, 3);
    setMatchedCourses(sorted);
    setShowResults(true);
  };

  /** Сброс квиза и начало заново */
  const handleRestart = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResults(false);
    setMatchedCourses([]);
    localStorage.removeItem('matcherAnswers');
  };

  // Расчёт прогресса в процентах
  const progress = ((currentStep + 1) / questions.length) * 100;

  // ============================================================================
  // ЭКРАН РЕЗУЛЬТАТОВ
  // ============================================================================
  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="text-5xl font-serif text-blue-500 mb-4">Подбор программы обучения</h1>
            <p className="text-slate-600 text-lg">Мы подобрали <span className="text-green-500 font-semibold underline">{matchedCourses.length} программы</span></p>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="space-y-6">
            {matchedCourses.map(({ course, match }, index) => (
              <motion.div key={course.id} initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 * index }}
                className="bg-white rounded-2xl p-6 border border-slate-100 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-serif text-slate-900">{course.title}</h3>
                    <p className="text-slate-500 mt-1">{course.format}</p>
                  </div>
                  <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full font-semibold text-sm">{match}% совпадение</span>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div><p className="text-slate-400 text-sm">Стоимость</p><p className="font-semibold text-slate-900">{course.price.toLocaleString()} ₽</p></div>
                  <div><p className="text-slate-400 text-sm">Длительность</p><p className="font-semibold text-slate-900">{course.months} месяцев</p></div>
                  <div><p className="text-slate-400 text-sm">Рассрочка</p><p className="font-semibold text-slate-900">{course.monthlyPrice.toLocaleString()} ₽/мес</p></div>
                </div>
                <div className="flex gap-4">
                  <motion.button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-medium"
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => navigate(`/course/${course.id}`)}>
                    Подробнее о курсе
                  </motion.button>
                  <motion.button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-xl font-medium"
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    Записаться
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="mt-12 bg-blue-50 rounded-2xl p-8 text-center"
          >
            <h3 className="text-2xl font-serif text-slate-900 mb-2">Нужна консультация?</h3>
            <p className="text-slate-600 mb-6">Наши специалисты помогут сделать окончательный выбор</p>
            <div className="flex justify-center gap-4">
              <motion.button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-xl font-medium"
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onOpenConsultation}>
                Записаться на консультацию
              </motion.button>
              <motion.button className="border-2 border-blue-500 text-blue-500 hover:bg-blue-50 px-8 py-3 rounded-xl font-medium"
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => navigate('/catalog')}>
                Перейти к каталогу
              </motion.button>
            </div>
          </motion.div>

          <div className="text-center mt-8">
            <motion.button className="text-slate-500 hover:text-slate-700 font-medium"
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleRestart}>
              Начать заново
            </motion.button>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================================
  // ЭКРАН КВИЗА (ПОШАГОВЫЕ ВОПРОСЫ)
  // ============================================================================
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-5xl font-serif text-blue-500 mb-4">Подбор программы обучения</h1>
          <p className="text-slate-600 text-lg">Ответьте на вопросы, и мы подберем курсы</p>
        </motion.div>

        {/* Индикатор прогресса */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-slate-500 mb-2">
            <span>Вопрос {currentStep + 1} из {questions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <motion.div className="h-full bg-blue-500" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.3 }} />
          </div>
        </div>

        {/* Карточка вопроса */}
        <AnimatePresence mode="wait">
          <motion.div key={currentStep} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl p-8 border border-slate-100 shadow-lg"
          >
            <h2 className="text-2xl font-serif text-slate-900 mb-6">{questions[currentStep].question}</h2>
            <div className="space-y-3">
              {questions[currentStep].options.map((option) => (
                <motion.button key={option.value}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${answers[questions[currentStep].id] === option.value ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50'}`}
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => handleAnswer(option.value)}>
                  {option.label}
                </motion.button>
              ))}
            </div>
            <div className="flex justify-between mt-8">
              <motion.button className={`px-6 py-3 rounded-xl font-medium ${currentStep === 0 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-slate-100'}`}
                onClick={handleBack} disabled={currentStep === 0} whileHover={currentStep > 0 ? { scale: 1.05 } : {}}>
                Назад
              </motion.button>
              <motion.button className={`px-8 py-3 rounded-xl font-medium ${answers[questions[currentStep].id] ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
                onClick={handleNext} disabled={!answers[questions[currentStep].id]} whileHover={answers[questions[currentStep].id] ? { scale: 1.05 } : {}}>
                {currentStep === questions.length - 1 ? 'Показать результаты' : 'Далее'}
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/**
 * Главная страница (HomePage)
 * Содержит: слайдер, преимущества, направления, FAQ, новости, контакты
 * @param onOpenAuth - функция открытия формы авторизации
 */
function HomePage({ onOpenAuth }: { onOpenAuth: () => void }) {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0); // Текущий слайд (0-3)
  const [openFaqs, setOpenFaqs] = useState<number[]>([]); // Массив индексов открытых вопросов FAQ
  const slideTimerRef = useRef<NodeJS.Timeout | null>(null); // Ссылка на таймер слайдера

  /** Функция запуска таймера автопереключения слайдов */
  const startSlideTimer = useCallback(() => {
    // Очищаем существующий таймер
    if (slideTimerRef.current) {
      clearInterval(slideTimerRef.current);
    }
    // Создаём новый таймер
    slideTimerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 5000);
  }, []);

  // Запускаем таймер при монтировании компонента
  useEffect(() => {
    startSlideTimer();
    // Очищаем таймер при размонтировании
    return () => {
      if (slideTimerRef.current) {
        clearInterval(slideTimerRef.current);
      }
    };
  }, [startSlideTimer]);

  /** Переключение на следующий слайд (сбрасывает таймер) */
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    startSlideTimer(); // Сбрасываем и запускаем таймер заново
  };
  /** Переключение на предыдущий слайд (сбрасывает таймер) */
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
    startSlideTimer(); // Сбрасываем и запускаем таймер заново
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* HERO SECTION со слайдером */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <h1 className="text-5xl font-serif text-slate-900 inline-flex items-center gap-3">
              АКАДЕМИЯ ЗНАНИЙ
                <img 
                  src="./images/logo.png" 
                  alt="Академия Знаний" 
                  className="w-10 h-10"
                />
                <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/>
            </h1>
          </motion.div>
          
          {/* Слайдер изображений */}
          <div className="relative rounded-2xl overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img key={currentSlide} src={sliderImages[currentSlide]} alt="Академия" className="w-full h-96 object-cover"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} />
            </AnimatePresence>
            {/* Кнопки навигации слайдера */}
            <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-lg hover:bg-slate-50 transition-colors">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-lg hover:bg-slate-50 transition-colors">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
          
          {/* Индикаторы слайдов (точки) */}
          <div className="flex justify-center gap-2 mt-4">
            {sliderImages.map((_, idx) => (
              <button 
                key={idx} 
                onClick={() => {
                  setCurrentSlide(idx);
                  startSlideTimer(); // Сбрасываем и запускаем таймер заново
                }} 
                className={`w-3 h-3 rounded-full transition-colors ${idx === currentSlide ? 'bg-blue-500' : 'bg-slate-200'}`} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* СЕКЦИЯ ПРЕИМУЩЕСТВ */}
      <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl font-serif text-slate-900 mb-8">Образование, доступное 24/7</motion.h2>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {['Государственная аккредитация', 'Современная онлайн-платформа', 'Практико-ориентированные курсы', 'Библиотека материалов', 'Поддержка кураторов', 'Опытные преподаватели'].map((feature, idx) => (
              <motion.div key={idx} variants={fadeInUp} className="bg-slate-50 rounded-xl p-6 hover:shadow-lg transition-shadow cursor-default" whileHover={{ y: -5 }}>
                <h3 className="text-xl font-serif text-slate-900 mb-3">{feature}</h3>
                <p className="text-slate-600 text-sm">Описание преимущества образовательной платформы.</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* СЕКЦИЯ НАПРАВЛЕНИЙ ОБУЧЕНИЯ */}
      <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl font-serif text-slate-900 mb-2">Направления обучения</motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-slate-600 mb-8">Выберите программу</motion.p>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'Программы переподготовки', img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop' },
              { title: 'Курсы повышения квалификации', img: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=600&h=400&fit=crop' },
              { title: 'Высшее образование', img: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop' },
              { title: 'Дополнительное образование', img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop' }
            ].map((program, idx) => (
              <motion.div key={idx} variants={fadeInUp} className="border border-blue-200 rounded-xl overflow-hidden hover:shadow-xl transition-shadow" whileHover={{ scale: 1.02 }}>
                <img src={program.img} alt={program.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="font-semibold text-slate-900 mb-2">{program.title}</h3>
                  <p className="text-slate-600 text-sm mb-4">Описание направления обучения.</p>
                  <motion.button className="w-full bg-slate-50 hover:bg-slate-100 text-slate-700 py-2 rounded-lg transition-colors"
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => navigate('/catalog')}>
                    Подробнее
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* СЕКЦИЯ FAQ (ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ) */}
      <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl font-serif text-slate-900 mb-8">Часто задаваемые вопросы</motion.h2>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqs.includes(idx); // Проверяем, открыт ли этот вопрос
              return (
                <motion.div key={idx} variants={fadeInUp} className="border border-slate-100 rounded-xl overflow-hidden" whileHover={{ scale: 1.01 }}>
                  {/* Кнопка вопроса - при клике добавляет/удаляет индекс из массива открытых */}
                  <button 
                    onClick={() => {
                      if (isOpen) {
                        setOpenFaqs(openFaqs.filter(i => i !== idx)); // Закрываем, если уже открыт
                      } else {
                        setOpenFaqs([...openFaqs, idx]); // Открываем, если закрыт
                      }
                    }} 
                    className="w-full p-6 flex items-center justify-between bg-white hover:bg-slate-50 transition-colors"
                  >
                    <span className="text-lg text-slate-900 text-left">{faq.q}</span>
                    <motion.svg className="w-6 h-6 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" animate={{ rotate: isOpen ? 180 : 0 }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </motion.svg>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{
                          duration: 0.2,
                          ease: [0.4, 0, 0.2, 1]
                        }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-4 border-t border-slate-100">
                          <p className="text-slate-600">{faq.a}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>

      {/* СЕКЦИЯ НОВОСТЕЙ */}
      <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl font-serif text-slate-900 mb-2">Новости и статьи</motion.h2>
              <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-slate-600">Следите за новостями</motion.p>
            </div>
          </div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {news.map((item, idx) => (
              <motion.div key={idx} variants={fadeInUp} className="border border-slate-100 rounded-xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                whileHover={{ y: -5 }} onClick={() => navigate(`/article/${item.id}`)}>
                <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <span className="inline-block bg-blue-500 text-white text-xs px-2 py-1 rounded-full mb-3">{item.category}</span>
                  <h3 className="font-semibold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-sm mb-4">{item.desc}</p>
                  <span className="text-slate-400 text-xs">📅 {item.date}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* СЕКЦИЯ КОНТАКТОВ */}
      <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl font-serif text-slate-900 mb-8">Контакты</motion.h2>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Текстовая информация */}
            <div>
              <p className="text-lg text-slate-900 mb-4">443111, г. Самара, Московское шоссе, 125А</p>
              <div className="mb-6"><h3 className="text-slate-500 font-medium mb-2">Режим работы</h3><p className="text-slate-700">Пн-Пт 8:30-17:00, обед 13:00-13:30</p></div>
              <div className="mb-6"><h3 className="text-slate-500 font-medium mb-2">Email</h3><p className="text-slate-700">AcademyofKnowledge@mail.ru</p></div>
              <div className="mb-6"><h3 className="text-slate-500 font-medium mb-2">Телефон</h3><p className="text-slate-700">+7 (946) 123-45-67</p></div>
              <motion.button className="bg-slate-50 hover:bg-slate-100 text-slate-900 px-6 py-3 rounded-xl transition-colors"
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onOpenAuth}>+7 (946) 123-45-67</motion.button>
            </div>
            {/* Google Maps Embed */}
            <div className="rounded-xl overflow-hidden h-96 bg-slate-100">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.57!2d50.123!3d53.234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTPCsDE0JzAyLjQiTiA1MMKwMDcnMjIuOCJF!5e0!3m2!1sru!2sru!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
                title="Карта - Академия Знаний"
              />
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}

/**
 * Страница каталога курсов
 * Содержит поиск и список всех курсов
 */
function CatalogPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(''); // Поисковый запрос
  
  // Фильтрация курсов по поисковому запросу
  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-5xl font-serif text-blue-500 mb-4">Каталог курсов</h1>
          <p className="text-blue-500 text-lg">Найдите идеальную программу</p>
        </motion.div>
        
        {/* Поисковая строка */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-slate-50 rounded-2xl p-6 mb-12">
          <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3">
            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input type="text" placeholder="Поиск курсов..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 outline-none text-slate-700 placeholder-slate-400" />
          </div>
        </motion.div>
        
        {/* Сетка курсов */}
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <motion.div key={course.id} variants={fadeInUp} className="bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-xl transition-shadow" whileHover={{ y: -5 }}>
              <div className="relative">
                <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
                <span className="absolute top-3 right-3 bg-white/90 backdrop-blur text-blue-500 text-xs px-3 py-1 rounded-full">{course.format}</span>
              </div>
              <div className="p-5">
                <span className="text-blue-500 text-xs font-medium">{course.category}</span>
                <h3 className="text-lg font-semibold text-slate-900 mt-1 mb-3">{course.title}</h3>
                <div className="space-y-1 text-sm text-slate-500 mb-4">
                  <div className="flex items-center gap-1">⏱️ {course.hours} часов</div>
                  <div className="flex items-center gap-1">⭐ {course.rating} ({course.students} студентов)</div>
                  <div className="flex items-center gap-1">👤 {course.instructor}</div>
                </div>
                <div className="border-t border-slate-100 pt-4 mt-4">
                  <div className="flex items-center justify-between mb-3">
                    <div><span className="text-xl font-semibold text-slate-900">{course.price.toLocaleString()}₽</span><p className="text-xs text-slate-500">или рассрочка</p></div>
                    <motion.button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-xl font-medium"
                      whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => navigate(`/course/${course.id}`)}>
                      Записаться
                    </motion.button>
                  </div>
                  <p className="text-xs text-slate-500">{course.document}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

/**
 * Страница отдельного курса
 * Содержит подробную информацию: описание, программу, преподавателя, цену
 */
function CourseDetailPage() {
  const { id } = useParams(); // Получаем ID курса из URL
  const navigate = useNavigate();
  const course = courses.find(c => c.id === id); // Находим курс по ID
  
  // Если курс не найден - показываем сообщение
  if (!course) return <div className="min-h-screen flex items-center justify-center"><div className="text-center"><h1 className="text-2xl font-semibold text-slate-900 mb-4">Курс не найден</h1><button onClick={() => navigate('/catalog')} className="text-blue-500 hover:underline">Вернуться в каталог</button></div></div>;
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Заголовок курса */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <span className="text-blue-500 text-sm">{course.category}</span>
          <h1 className="text-4xl font-serif text-blue-500 mt-2 mb-4">{course.title}</h1>
          <p className="text-slate-500 max-w-2xl mx-auto">{course.description}</p>
          <div className="flex items-center justify-center gap-6 mt-4 text-blue-500">
            <div className="flex items-center gap-1">⭐ {course.rating} ({course.students} студентов)</div>
            <div className="flex items-center gap-1">⏱️ {course.hours} часов</div>
            <div className="flex items-center gap-1">👤 {course.instructor}</div>
          </div>
        </motion.div>
        
        {/* Кнопка "Назад" */}
        <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => navigate('/catalog')} className="text-slate-400 hover:text-slate-600 mb-6 flex items-center gap-2" whileHover={{ x: -5 }}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>Назад
        </motion.button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Левая колонка (2/3 ширины) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Информация о преподавателе */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl p-6 border border-slate-100">
              <h2 className="text-2xl font-serif text-slate-900 mb-4">Преподаватель</h2>
              <div className="flex items-start gap-4">
                <div className="w-24 h-24 rounded-full bg-slate-200 overflow-hidden"><img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop" alt={course.instructorFullName} className="w-full h-full object-cover" /></div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{course.instructorFullName}</h3>
                  <p className="text-blue-500 mb-2">{course.instructorTitle}</p>
                  <p className="text-slate-500 text-sm">{course.instructorExperience}</p>
                </div>
              </div>
            </motion.div>
            
            {/* Программа курса */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl p-6 border border-slate-100">
              <h2 className="text-2xl font-serif text-slate-900 mb-4">Программа курса</h2>
              <div className="space-y-4">
                {course.modules.map((module) => (
                  <motion.div key={module.number} className="border border-slate-100 rounded-xl p-4" whileHover={{ scale: 1.01 }}>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-500 font-semibold text-sm flex-shrink-0">{module.number}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900 mb-2">Модуль {module.number}: {module.title}</h3>
                        <ul className="space-y-1">
                          {module.topics.map((topic, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm text-slate-500">
                              <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{topic}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* Преимущества курса */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-2xl p-6 border border-slate-100">
              <h2 className="text-2xl font-serif text-slate-900 mb-4">Что вы получите</h2>
              <ul className="space-y-3">
                {course.benefits.map((benefit, idx) => (
                  <motion.li key={idx} className="flex items-center gap-3 text-slate-600" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + idx * 0.1 }}>
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{benefit}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
          
          {/* Правая колонка (1/3 ширины) - карточка с ценой */}
          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-lg">
              <img src={course.image} alt={course.title} className="w-full h-40 object-cover rounded-xl mb-4" />
              <div className="mb-4"><span className="text-2xl font-semibold text-slate-900">{course.price.toLocaleString()} ₽</span><p className="text-sm text-slate-500">или {course.monthlyPrice.toLocaleString()} ₽ / мес</p></div>
              <motion.button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-medium mb-3" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>Записаться на курс</motion.button>
              <motion.button className="w-full bg-slate-50 hover:bg-slate-100 text-slate-700 py-3 rounded-xl font-medium" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>Задать вопрос</motion.button>
              <div className="border-t border-slate-100 mt-4 pt-4 space-y-4">
                <div className="flex items-start gap-3"><svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg><div><p className="font-medium text-slate-900 text-sm">Документ</p><p className="text-xs text-slate-500">{course.document}</p></div></div>
                <div className="flex items-start gap-3"><svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg><div><p className="font-medium text-slate-900 text-sm">Формат</p><p className="text-xs text-slate-500">{course.format}</p></div></div>
                <div className="flex items-start gap-3"><svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg><div><p className="font-medium text-slate-900 text-sm">Студентов</p><p className="text-xs text-slate-500">{course.students}</p></div></div>
              </div>
            </motion.div>
            
            {/* Карточка помощи с выбором */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="bg-blue-50 rounded-2xl p-6">
              <h3 className="text-lg font-serif text-slate-900 mb-2">Нужна помощь с выбором?</h3>
              <p className="text-sm text-slate-500 mb-4">Наши специалисты помогут подобрать программу</p>
              <Link to="/matcher" className="text-blue-500 hover:text-blue-600 font-medium flex items-center gap-1">Подобрать программу<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Страница базы знаний
 * Содержит: статьи, глоссарий терминов, архив вебинаров
 */
function KnowledgeBasePage() {
  const [showAllTerms, setShowAllTerms] = useState(false); // Показывать ли все термины
  const displayedTerms = showAllTerms ? termsData : termsData.slice(0, 4); // Показываем 4 или все термины

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-5xl font-serif text-blue-500 mb-4">База знаний</h1>
          <p className="text-blue-500 text-lg">Полезные материалы</p>
        </motion.div>
        
        {/* СЕКЦИЯ СТАТЕЙ */}
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mb-16">
          <h2 className="text-3xl font-serif text-slate-900 mb-8">Статьи и гайды</h2>
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <motion.div key={article.id} variants={fadeInUp} className="bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-lg transition-shadow" whileHover={{ y: -5 }}>
                <img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-blue-100 text-blue-500 text-xs px-2 py-1 rounded-full">{article.category}</span>
                    <span className="text-slate-400 text-xs">{article.readTime}</span>
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">{article.title}</h3>
                  <p className="text-slate-500 text-sm mb-4">{article.excerpt}</p>
                  <Link to={`/article/${article.id}`} className="text-blue-500 hover:text-blue-600 font-medium text-sm">Читать →</Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
        
        {/* СЕКЦИЯ ГЛОССАРИЯ */}
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mb-16">
          <h2 className="text-3xl font-serif text-slate-900 mb-8">Глоссарий терминов</h2>
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-4">
            {displayedTerms.map((term, idx) => (
              <motion.div key={idx} variants={fadeInUp} className="bg-white rounded-xl p-5 border-l-4 border-blue-500" whileHover={{ scale: 1.01 }}>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-slate-900">{term.term}</h3>
                  <span className="bg-slate-100 text-slate-500 text-xs px-2 py-0.5 rounded">{term.category}</span>
                </div>
                <p className="text-slate-500 text-sm">{term.definition}</p>
              </motion.div>
            ))}
          </motion.div>
          <div className="text-center mt-6">
            <motion.button className="text-blue-500 hover:text-blue-600 font-medium" whileHover={{ scale: 1.05 }} onClick={() => setShowAllTerms(!showAllTerms)}>
              {showAllTerms ? 'Свернуть' : 'Показать все термины'}
            </motion.button>
          </div>
        </motion.section>
        
        {/* СЕКЦИЯ ВЕБИНАРОВ */}
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <h2 className="text-3xl font-serif text-slate-900 mb-8">Архив вебинаров</h2>
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {webinars.map((webinar) => (
              <motion.div key={webinar.id} variants={fadeInUp} className="bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-lg transition-shadow" whileHover={{ y: -5 }}>
                {/* YouTube embed - videoId можно изменить в массиве webinars выше */}
                <div className="aspect-video">
                  <iframe src={`https://www.youtube.com/embed/${webinar.videoId}`} title={webinar.title} className="w-full h-full" allowFullScreen></iframe>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-slate-900 mb-2">{webinar.title}</h3>
                  <p className="text-slate-500 text-sm mb-2">{webinar.author} • {webinar.date}</p>
                  <p className="text-slate-400 text-xs">{webinar.views} просмотров</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
}

/**
 * Страница отдельной статьи
 * Показывает полный текст статьи
 */
function ArticlePage() {
  const { id } = useParams(); // Получаем ID статьи из URL
  const navigate = useNavigate();
  const article = articles.find(a => a.id === id); // Находим статью

  // Если статья не найдена
  if (!article) return <div className="min-h-screen flex items-center justify-center"><div className="text-center"><h1 className="text-2xl font-semibold text-slate-900 mb-4">Статья не найдена</h1><button onClick={() => navigate('/knowledge-base')} className="text-blue-500 hover:underline">Вернуться</button></div></div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => navigate('/knowledge-base')} className="text-slate-400 hover:text-slate-600 mb-6 flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>Назад
        </motion.button>
        
        <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <img src={article.image} alt={article.title} className="w-full h-64 object-cover rounded-2xl mb-6" />
          <div className="flex items-center gap-4 mb-4">
            <span className="bg-blue-100 text-blue-500 text-xs px-3 py-1 rounded-full">{article.category}</span>
            <span className="text-slate-400 text-sm">⏱️ {article.readTime}</span>
          </div>
          <h1 className="text-4xl font-serif text-slate-900 mb-6">{article.title}</h1>
          <div className="prose prose-lg text-slate-600">
            <p>{article.content}</p>
            <p className="mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
          </div>
        </motion.article>
      </div>
    </div>
  );
}

// ============================================================================
// ГЛАВНЫЙ КОМПОНЕНТ ПРИЛОЖЕНИЯ (APP)
// ============================================================================
/**
 * Корневой компонент приложения
 * - Настраивает роутинг (навигацию между страницами)
 * - Управляет состоянием пользователя
 * - Рендерит модальные окна
 */
export default function App() {
  // Состояние пользователя (загружается из localStorage)
  const [user, setUser] = useState<User | null>(null);
  // Состояния модальных окон
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);

  // Загрузка пользователя из localStorage при старте приложения
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  /** Обработка успешного входа */
  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
  };

  /** Обработка выхода */
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <Router>
      <div className="min-h-screen bg-white">
        {/* Шапка сайта */}
        <Header onOpenAuth={() => setIsAuthModalOpen(true)} user={user} onLogout={handleLogout} />
        
        {/* Основной контент (маршруты) */}
        <main>
          <Routes>
            <Route path="/" element={<HomePage onOpenAuth={() => setIsAuthModalOpen(true)} />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/course/:id" element={<CourseDetailPage />} />
            <Route path="/knowledge-base" element={<KnowledgeBasePage />} />
            <Route path="/matcher" element={<CourseMatcherPage onOpenConsultation={() => setIsConsultationModalOpen(true)} />} />
            <Route path="/article/:id" element={<ArticlePage />} />
          </Routes>
        </main>
        
        {/* Подвал сайта */}
        <Footer />
        
        {/* Модальные окна */}
        <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} onLogin={handleLogin} />
        <ConsultationModal isOpen={isConsultationModalOpen} onClose={() => setIsConsultationModalOpen(false)} />
      </div>
    </Router>
  );
}
