import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { articles } from '../data';

export function ArticlePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const article = articles.find(a => a.id === id);

  if (!article) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-slate-900 mb-4">Статья не найдена</h1>
        <button onClick={() => navigate('/knowledge-base')} className="text-blue-500 hover:underline">Вернуться</button>
      </div>
    </div>
  );

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
            <span className="text-slate-400 text-sm">{article.readTime}</span>
          </div>
          <h1 className="text-4xl font-serif text-slate-900 mb-6">{article.title}</h1>
          <div className="prose prose-lg text-slate-600">
            <p>{article.content}</p>
          </div>
        </motion.article>
      </div>
    </div>
  );
}
