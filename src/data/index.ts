import type { Course, Question, Article, Term, Webinar } from '../types';

export const courses: Course[] = [
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
    image: '/images/courses/data.jpg',
    description: 'Комплексная программа обучения аналитике данных и машинному обучению.',
    instructorFullName: 'Иванов Александр Сергеевич',
    instructorTitle: 'практикующий Data Scientist',
    instructorExperience: 'Более 10 лет опыта в анализе данных и машинном обучении. Работал в ведущих IT-компаниях.',
    months: 8,
    tags: ['программирование', 'анализ данных', 'python', 'ml'],
    modules: [
      { number: 1, title: 'Введение в Data Science', topics: ['Основы программирования на Python', 'Работа с Jupyter Notebook', 'Библиотеки NumPy и Pandas', 'Визуализация данных с Matplotlib и Seaborn'] },
      { number: 2, title: 'Математика для Data Science', topics: ['Линейная алгебра', 'Математический анализ', 'Теория вероятностей', 'Статистика и статистические тесты'] },
      { number: 3, title: 'Машинное обучение', topics: ['Supervised Learning: регрессия и классификация', 'Unsupervised Learning: кластеризация', 'Работа с библиотекой Scikit-learn', 'Оценка качества моделей'] },
      { number: 4, title: 'Глубокое обучение', topics: ['Нейронные сети и их архитектуры', 'Работа с TensorFlow и Keras', 'Компьютерное зрение', 'Обработка естественного языка (NLP)'] },
      { number: 5, title: 'Практические проекты', topics: ['Анализ реальных датасетов', 'Построение предсказательных моделей', 'Деплой ML-моделей', 'Итоговый проект'] }
    ],
    benefits: ['Доступ к платформе на время обучения и 1 год после', 'Библиотека материалов и датасетов', 'Личный куратор и поддержка', 'Помощь в трудоустройстве']
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
    image: '/images/courses/graphic.jpg',
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
    image: '/images/courses/pm.png',
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
    image: '/images/courses/front.png',
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
    image: '/images/courses/build.png',
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
    title: 'Digital-маркетинг и\nSMM',
    category: 'Маркетинг',
    hours: 180,
    rating: 4.8,
    students: 1780,
    instructor: 'Новикова Е.С.',
    price: 42000,
    monthlyPrice: 3500,
    format: 'Полностью дистанционно',
    document: 'Удостоверение о повышении квалификации',
    image: '/images/courses/smm.png',
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
];

export const questions: Question[] = [
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

export const articles: Article[] = [
  { id: '1', title: 'Как поступить на курс: пошаговая инструкция', category: 'Гайды', readTime: '5 минут', excerpt: 'Подробное руководство по записи на курс.', image: '/images/learnbase/lb1.jpg', content: 'Шаг 1: Выберите курс в каталоге. Шаг 2: Нажмите кнопку "Записаться". Шаг 3: Заполните форму заявки. Шаг 4: Оплатите обучение. Шаг 5: Получите доступ к платформе и начните учиться!' },
  { id: '2', title: 'Data Scientist: профессия будущего', category: 'Обзоры профессий', readTime: '8 минут', excerpt: 'Что делает Data Scientist.', image: '/images/learnbase/lb2.png', content: 'Data Scientist — это специалист, который анализирует большие данные и строит прогнозные модели. Средняя зарплата от 150 000 рублей.' },
  { id: '3', title: 'Frontend-разработчик: путь от новичка до профи', category: 'Обзоры профессий', readTime: '10 минут', excerpt: 'Как стать Frontend-разработчиком.', image: '/images/learnbase/lb3.jpg', content: 'Frontend-разработчик создаёт пользовательские интерфейсы. Изучайте HTML, CSS, JavaScript, React.' },
  { id: '4', title: 'Как эффективно учиться онлайн: 10 советов', category: 'Гайды', readTime: '6 минут', excerpt: 'Проверенные методики для обучения.', image: '/images/learnbase/lb4.png', content: '1. Составьте расписание. 2. Делайте перерывы. 3. Практикуйтесь. 4. Задавайте вопросы. 5. Повторяйте материал.' },
  { id: '5', title: 'Digital-маркетолог: навыки и карьера', category: 'Обзоры профессий', readTime: '7 минут', excerpt: 'Что входит в работу digital-маркетолога.', image: '/images/learnbase/lb5.png', content: 'Digital-маркетолог продвигает бренды в интернете. Нужны знания SMM, таргета, аналитики.' },
  { id: '6', title: 'Графический дизайнер: творчество и технологии', category: 'Обзоры профессий', readTime: '9 минут', excerpt: 'Обзор профессии дизайнера.', image: '/images/learnbase/lb6.jpg', content: 'Графический дизайнер создаёт визуальный контент. Изучайте Photoshop, Illustrator, Figma.' }
];

export const termsData: Term[] = [
  { term: 'API', category: 'IT', definition: 'Application Programming Interface - набор методов для взаимодействия программ.' },
  { term: 'Machine Learning', category: 'Data Science', definition: 'Машинное обучение - раздел ИИ, изучающий алгоритмы, способные обучаться.' },
  { term: 'UX/UI Design', category: 'Дизайн', definition: 'Проектирование пользовательского опыта и интерфейсов.' },
  { term: 'SEO', category: 'Маркетинг', definition: 'Поисковая оптимизация сайтов для улучшения видимости.' },
  { term: 'Scrum', category: 'Управление', definition: 'Фреймворк для гибкой разработки продуктов.' },
  { term: 'React', category: 'IT', definition: 'JavaScript-библиотека для создания пользовательских интерфейсов.' },
  { term: 'SMM', category: 'Маркетинг', definition: 'Маркетинг в социальных сетях.' },
  { term: 'Figma', category: 'Дизайн', definition: 'Инструмент для дизайна интерфейсов и прототипирования.' }
];

export const webinars: Webinar[] = [
  { id: '1', title: 'Введение в Data Science', author: 'Александр Иванов', date: '20 марта 2026', views: 2400, image: '', videoId: 'rfscVS0vtbw' },
  { id: '2', title: 'Тренды веб-разработки в 2026', author: 'Дмитрий Козлов', date: '15 марта 2026', views: 3100, image: '', videoId: 'PkZNo7MFNFg' },
  { id: '3', title: 'Как начать карьеру в IT', author: 'Елена Новикова', date: '10 марта 2026', views: 4200, image: '', videoId: 'k9WqpQp8VSU' }
];

export const sliderImages = [
  '/images/slider/sl1.png',
  '/images/slider/sl2.png',
  '/images/slider/sl3.png',
  '/images/slider/sl4.png',
];

export const faqs = [
  { q: 'Как начать обучение?', a: 'Для начала обучения необходимо выбрать интересующую программу, заполнить заявку на поступление и предоставить необходимые документы. После проверки документов и оплаты вы получите доступ к личному кабинету на образовательной платформе' },
  { q: 'Как проходит аттестация?', a: 'Аттестация проходит в формате онлайн-тестирования и защиты практических проектов. Некоторые программы требуют очной защиты.' },
  { q: 'Выдается ли диплом государственного образца?', a: 'Да, программы профессиональной переподготовки завершаются выдачей диплома государственного образца.' },
  { q: 'Можно ли учиться с мобильного телефона?', a: 'Да, наша платформа адаптирована для мобильных устройств. Вы можете учиться с телефона, планшета или компьютера.' }
];

export const news = [
  { title: 'Новые программы повышения квалификации в области IT', desc: 'Мы запустили 5 новых программ для IT-специалистов: Python-разработка, Data Science, Кибербезопасность и другие...', date: '28 марта 2026', category: 'Новости', image: 'images/news/news1.jpg', id: 'news1' },
  { title: 'Расписание вебинаров на май 2026', desc: 'Приглашаем на бесплатные вебинары для абитуриентов. Узнайте больше о наших программах, задайте вопросы...', date: '20 апреля 2026', category: 'События', image: 'images/news/news2.jpg', id: 'news2' },
  { title: 'Как онлайн-образование меняет карьерные возможности', desc: 'Статья от нашего ректора о том, как дистанционное обучение открывает новые горизонты для профессионального развития...', date: '20 марта 2026', category: 'Статьи', image: 'images/news/news3.jpg', id: 'news3' }
];
