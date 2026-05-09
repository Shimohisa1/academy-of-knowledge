import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../animations';
import { articles, termsData, webinars } from '../data';

export function KnowledgeBasePage() {
  const [showAllTerms, setShowAllTerms] = useState(false);
  const displayedTerms = showAllTerms ? termsData : termsData.slice(0, 4);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-5xl font-serif text-blue-500 mb-4">База знаний</h1>
          <p className="text-blue-500 text-lg">Полезные материалы для успешного обучения и развития карьеры</p>
        </motion.div>

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
                  <Link to={`/article/${article.id}`} className="text-blue-500 hover:text-blue-600 font-medium text-sm">Читать</Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

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

        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <h2 className="text-3xl font-serif text-slate-900 mb-8">Архив вебинаров</h2>
          <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {webinars.map((webinar) => (
              <motion.div key={webinar.id} variants={fadeInUp} className="bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-lg transition-shadow" whileHover={{ y: -5 }}>
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
