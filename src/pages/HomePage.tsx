import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../animations';
import { sliderImages, faqs, news } from '../data';

interface HomePageProps {
  onOpenAuth: () => void;
}

export function HomePage({ onOpenAuth: _onOpenAuth }: HomePageProps) {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openFaqs, setOpenFaqs] = useState<number[]>([]);
  const slideTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ← ЗДЕСЬ: состояние для поп-апа "Скопировано!"
  const [copied, setCopied] = useState(false);

  const startSlideTimer = useCallback(() => {
    if (slideTimerRef.current) {
      clearInterval(slideTimerRef.current);
    }
    slideTimerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 5000);
  }, []);

  useEffect(() => {
    startSlideTimer();
    return () => {
      if (slideTimerRef.current) {
        clearInterval(slideTimerRef.current);
      }
    };
  }, [startSlideTimer]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    startSlideTimer();
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
    startSlideTimer();
  };

  // ← ЗДЕСЬ: функция копирования с автоматическим сбросом через 2 секунды
  const handleCopyPhone = () => {
    navigator.clipboard.writeText('+79461234567');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* HERO SECTION со слайдером */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <h1 className="text-5xl font-serif text-slate-900 inline-flex items-center gap-3">
              АКАДЕМИЯ ЗНАНИЙ
              <img src="/images/logo.png" alt="Академия Знаний" className="w-10 h-10" />
            </h1>
          </motion.div>
          <div className="relative rounded-2xl overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img key={currentSlide} src={sliderImages[currentSlide]} alt="Академия" className="w-full h-[500px] object-cover"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} />
            </AnimatePresence>
            <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-lg hover:bg-slate-50 transition-colors">
              <img src="/images/slider/arrl.png" alt="Previous" className="w-2 h-4 flex-shrink-0" />
            </button>
            <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-lg hover:bg-slate-50 transition-colors">
              <img src="/images/slider/arrr.png" alt="Next" className="w-2 h-4 flex-shrink-0" />
            </button>
          </div>

          <div className="flex justify-center gap-2 mt-4">
            {sliderImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => { setCurrentSlide(idx); startSlideTimer(); }}
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
            {[
              { title: 'Государственная аккредитация', description: 'Дипломы государственного образца, признаваемые по всей России' },
              { title: 'Современная онлайн-платформа', description: 'Удобная платформа для обучения с любого устройства в любое время' },
              { title: 'Практико-ориентированные курсы', description: 'Программы, разработанные с учетом требований работодателей' },
              { title: 'Библиотека материалов', description: 'Пожизненный доступ к учебным материалам после завершения обучения' },
              { title: 'Поддержка кураторов', description: 'Персональное сопровождение на протяжении всего обучения' },
              { title: 'Опытные преподаватели', description: 'Кандидаты и доктора наук, практикующие специалисты' }
            ].map((feature, idx) => (
              <motion.div key={idx} variants={fadeInUp}
                className="bg-[#F0F4FF] rounded-xl p-6 transition-all duration-200 cursor-default outline-transparent hover:outline hover:outline-[#3B82F6] hover:shadow-md hover:shadow-[#3B82F6]"
                whileHover={{ y: -5 }}>
                <h3 className="text-xl font-serif text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* СЕКЦИЯ НАПРАВЛЕНИЙ ОБУЧЕНИЯ */}
      <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl font-serif text-slate-900 mb-2">Направления обучения</motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-slate-600 mb-8">Выберите программу, которая соответствует вашим целям</motion.p>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'Программы профессиональной переподготовки', img: 'images/learnway/ca1.png', description: 'Получите новую специальность за 3-6 месяцев с выдачей диплома государственного образца' },
              { title: 'Курсы повышения квалификации', img: 'images/learnway/ca2.png', description: 'Актуализируйте знания и получите удостоверение о повышении квалификации' },
              { title: 'Высшее образование', img: 'images/learnway/ca3.png', description: 'Бакалавриат и магистратура по актуальным направлениям подготовки' },
              { title: 'Дополнительное образование', img: 'images/learnway/ca4.png', description: 'Разнообразные курсы для взрослых и детей по развитию навыков и хобби' }
            ].map((program, idx) => (
              <motion.div key={idx} variants={fadeInUp} className="border border-blue-200 rounded-xl overflow-hidden hover:shadow-xl hover:shadow-[#3B82F633] transition-shadow flex flex-col" whileHover={{ scale: 1.02 }}>
                <img src={program.img} alt={program.title} className="w-full h-48 object-cover" />
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-semibold text-slate-900 mb-2">{program.title}</h3>
                  <p className="text-slate-600 text-sm mb-4">{program.description}</p>
                  <motion.button className="w-full bg-slate-50 hover:bg-[#3B82F633] text-slate-700 py-2 rounded-lg transition-colors mt-auto"
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => navigate('/catalog')}>
                    Подробнее
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* СЕКЦИЯ FAQ */}
      <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl font-serif text-slate-900 mb-8">Часто задаваемые вопросы</motion.h2>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqs.includes(idx);
              return (
                <motion.div key={idx} variants={fadeInUp} className="border border-slate-100 rounded-xl overflow-hidden" whileHover={{ scale: 1.01 }}>
                  <button
                    onClick={() => {
                      if (isOpen) {
                        setOpenFaqs(openFaqs.filter(i => i !== idx));
                      } else {
                        setOpenFaqs([...openFaqs, idx]);
                      }
                    }}
                    className="w-full p-6 flex items-center justify-between bg-white hover:bg-slate-50 transition-colors"
                  >
                    <span className="text-lg text-slate-900 text-left">{faq.q}</span>
                    <motion.img
                      src="/images/plus.png"
                      alt="Открыть"
                      className="w-6 h-6"
                      animate={{ rotate: isOpen ? 135 : 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
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
          <div className="flex items-start justify-between mb-8">
            <div>
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl font-serif text-slate-900 mb-2">Новости и статьи</motion.h2>
              <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-slate-600">Следите за последними новостями института</motion.p>
            </div>
            <Link to="/knowledge-base">
              <button className="px-5 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-700 transition-all hover:bg-[#3B82F633]">Все новости</button>
            </Link>
          </div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {news.map((item, idx) => (
              <motion.div key={idx} variants={fadeInUp} className="group border border-slate-100 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer"
                whileHover={{ y: -5 }} onClick={() => navigate(`/article/${item.id}`)}>
                <div className="relative">
                  <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                  <span className="absolute top-4 left-4 bg-blue-500 text-white text-xs px-3 py-1 rounded-full">{item.category}</span>
                </div>
                <div className="p-6 flex flex-col h-[260px]">
                  <h3 className="font-semibold text-slate-900 mb-2 transition-colors duration-300 group-hover:text-[#3B82F6]">{item.title}</h3>
                  <p className="text-slate-600 text-sm mb-4">{item.desc}</p>
                  <span className="text-slate-400 text-xs mt-auto flex items-center">
                    <img src='images/calendar.png' alt="Дата" className="inline-block mr-2 w-4 h-4" /> {item.date}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* СЕКЦИЯ КОНТАКТОВ */}
      <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl font-serif text-slate-900 mb-8">Контакты</motion.h2>
              <p className="text-lg text-slate-900 mb-4">443111, г. Самара, Московское шоссе, 125А</p>
              <div className="mb-6">
                <h3 className="text-slate-500 font-medium mb-2">Режим работы</h3>
                <p className="text-slate-700">Понедельник–пятница с 8:30 до 17:00, <br /> перерыв на обед с 13:00 до 13:30</p>
              </div>
              <div className="mb-6">
                <h3 className="text-slate-500 font-medium mb-2">Email</h3>
                <p className="text-slate-700">AcademyofKnowledge@mail.ru</p>
              </div>
              <div className="mb-6">
                <h3 className="text-slate-500 font-medium mb-2">Телефон</h3>
                <p className="text-slate-700">+7 (946) 123-45-67</p>
              </div>
              <div className="mb-6">
                <h3 className="text-slate-500 font-medium mb-2">Есть вопросы?</h3>
                <p className="text-slate-700">За консультацией по образовательным <br /> услугам обращаться по телефону:</p>
              </div>

              {/* ↓ КНОПКА С ПОП-АПОМ "Скопировано!" */}
              <div className="relative inline-block">
                <motion.button
                  className="bg-[#F0F4FF] hover:bg-[#3B82F633] text-slate-900 px-6 py-3 rounded-xl transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCopyPhone}
                >
                  +7 (946) 123-45-67
                </motion.button>

                {/* Поп-ап появляется над кнопкой */}
                <AnimatePresence>
                  {copied && (
                    <motion.span
                      className="absolute -top-9 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs px-3 py-1.5 rounded-full whitespace-nowrap shadow-lg"
                      initial={{ opacity: 0, y: 5, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                    >
                      ✓ Скопировано!
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="rounded-xl overflow-hidden h-[500px] bg-slate-100">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2387.8202432270796!2d50.20842334840396!3d53.238998532909164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x41661938dd516f03%3A0xea94d2ac4356b0fe!2z0JzQvtGB0LrQvtCy0YHQutC-0LUg0YguLCAxMjXQkCwg0KHQsNC80LDRgNCwLCDQodCw0LzQsNGA0YHQutCw0Y8g0L7QsdC7LiwgNDQzMTEx!5e0!3m2!1sru!2sru!4v1778230585153!5m2!1sru!2sru"
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
