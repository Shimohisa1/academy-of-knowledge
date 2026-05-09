import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { courses } from '../data';

export function CourseDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = courses.find(c => c.id === id);

  if (!course) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-slate-900 mb-4">Курс не найден</h1>
        <button onClick={() => navigate('/catalog')} className="text-blue-500 hover:underline">Вернуться в каталог</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <span className="text-blue-500 text-sm">{course.category}</span>
          <h1 className="text-4xl font-serif text-blue-500 mt-2 mb-4">{course.title}</h1>
          <p className="text-slate-500 max-w-2xl mx-auto">{course.description}</p>
          <div className="flex items-center justify-center gap-6 mt-4 text-blue-500">
            <div className="flex items-center gap-1"><img src="/images/star.png" alt="Rating" className="w-4 h-4" /> {course.rating} ({course.students} студентов)</div>
            <div className="flex items-center gap-1"><img src="/images/clockcol.png" alt="Clock" className="w-4 h-4" /> {course.hours} часов</div>
            <div className="flex items-center gap-1"><img src="/images/humcol.png" alt="Instructor" className="w-4 h-4" /> {course.instructor}</div>
          </div>
        </motion.div>

        <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => navigate('/catalog')} className="text-slate-400 hover:text-slate-600 mb-6 flex items-center gap-2" whileHover={{ x: -5 }}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>Назад
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xl shadow-[#3B82F633]">
              <h2 className="text-2xl font-serif text-slate-900 mb-4">Преподаватель</h2>
              <div className="flex items-start gap-4">
                <div className="w-24 h-24 rounded-full bg-slate-200 overflow-hidden">
                  <img src="/images/teachers/ivanoval.jpg" alt={course.instructorFullName} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{course.instructorFullName}</h3>
                  <p className="text-blue-500 mb-2">{course.instructorTitle}</p>
                  <p className="text-slate-500 text-sm">{course.instructorExperience}</p>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xl shadow-[#3B82F633]">
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
                              <img src="/images/suc.png" alt="Success" className="w-3 h-3 flex-shrink-0" />
                              {topic}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xl shadow-[#3B82F633]">
              <h2 className="text-2xl font-serif text-slate-900 mb-4">Что вы получите</h2>
              <ul className="space-y-3">
                {course.benefits.map((benefit, idx) => (
                  <motion.li key={idx} className="flex items-center gap-3 text-slate-600" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + idx * 0.1 }}>
                    <img src="/images/suc.png" alt="Success" className="w-5 h-5 flex-shrink-0" />
                    {benefit}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xl shadow-[#3B82F633]">
              <img src={course.image} alt={course.title} className="w-full h-44 object-cover rounded-2xl mb-5" />
              <div className="mb-4">
                <span className="text-2xl font-semibold text-slate-900">{course.price.toLocaleString()} ₽</span>
                <p className="text-sm text-slate-500">или {course.monthlyPrice.toLocaleString()} ₽ / мес</p>
              </div>
              <motion.button className="w-full bg-[#3B82F6] hover:brightness-90 text-white py-3 rounded-xl font-medium mb-3" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>Записаться на курс</motion.button>
              <motion.button className="w-full bg-[#F0F4FF] hover:brightness-90 text-slate-700 py-3 rounded-xl font-medium" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>Задать вопрос</motion.button>
              <div className="border-t border-slate-100 mt-4 pt-4 space-y-4">
                <div className="flex items-center gap-3"><img src="/images/medal.png" alt="Document" className="w-7 h-7 shrink-0 object-contain" /><div><p className="font-medium text-slate-900 text-sm">Документ</p><p className="text-xs text-slate-500">{course.document}</p></div></div>
                <div className="flex items-center gap-3"><img src="/images/book.png" alt="Format" className="w-7 h-7 shrink-0 object-contain" /><div><p className="font-medium text-slate-900 text-sm">Формат</p><p className="text-xs text-slate-500">{course.format}</p></div></div>
                <div className="flex items-center gap-3"><img src="/images/humans.png" alt="Students" className="w-7 h-7 shrink-0 object-contain" /><div><p className="font-medium text-slate-900 text-sm">Студентов</p><p className="text-xs text-slate-500">{course.students}</p></div></div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="bg-[#3B82F626] opacity-15 rounded-2xl p-6">
              <h3 className="text-lg font-serif text-slate-900 mb-2">Нужна помощь с выбором?</h3>
              <p className="text-sm text-slate-500 mb-4">Наши специалисты помогут подобрать подходящую программу</p>
              <Link to="/matcher" className="text-[#3B82F6] hover:brightness-90 font-medium flex items-center gap-1">
                Подобрать программу
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
