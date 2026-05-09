import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../animations';
import { courses } from '../data';

export function CatalogPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

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
          <p className="text-blue-500 text-lg">Найдите идеальную программу для своего развития</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-slate-50 rounded-2xl p-6 mb-12">
          <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-transparent transition-all duration-300 hover:shadow-xl hover:shadow-[#3B82F633] focus-within:border-[#3B82F6]">
            <img src="/images/search.png" alt="Search" className="w-5 h-5" />
            <input type="text" placeholder="Поиск курсов..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 outline-none text-slate-700 placeholder-slate-400" />
          </div>
        </motion.div>

        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <motion.div key={course.id} variants={fadeInUp} className="bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-xl transition-shadow flex flex-col h-full" whileHover={{ y: -5 }}>
              <div className="relative">
                <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
                <span className="absolute top-3 right-3 bg-white/90 backdrop-blur text-blue-500 text-xs px-3 py-1 rounded-full">{course.format}</span>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <span className="text-blue-500 text-xs font-medium">{course.category}</span>
                <h3 className="text-lg font-semibold text-slate-900 mt-1 mb-3 min-h-[30px] whitespace-pre-line">{course.title}</h3>
                <div className="space-y-1 text-sm text-slate-500 mb-4 min-h-[72px]">
                  <div className="flex items-center gap-1"><img src="/images/clock.png" alt="Clock" className="w-4 h-4" /> {course.hours} часов</div>
                  <div className="flex items-center gap-1"><img src="/images/star.png" alt="Rating" className="w-4 h-4" /> {course.rating} ({course.students} студентов)</div>
                  <div className="flex items-center gap-1"><img src="/images/hum.png" alt="Instructor" className="w-4 h-4" /> {course.instructor}</div>
                </div>
                <div className="border-t border-slate-100 pt-4 mt-auto">
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
