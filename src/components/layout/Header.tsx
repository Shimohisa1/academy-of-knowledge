import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { User } from '../../types';

interface HeaderProps {
  onOpenAuth: () => void;
  user: User | null;
  onLogout: () => void;
}

export function Header({ onOpenAuth, user, onLogout }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <img src="/images/logo2.png" alt="Академия Знаний" className="w-8 h-8" />
            <span className="text-blue-500 font-medium text-sm">Академия <br /> Знаний</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link to="/catalog" className="text-slate-700 hover:text-blue-500 transition-colors">Курсы</Link>
            <Link to="/knowledge-base" className="text-slate-700 hover:text-blue-500 transition-colors">База знаний</Link>
            <Link to="/matcher" className="text-slate-700 hover:text-blue-500 transition-colors">Подбор курса</Link>
          </nav>

          <div className="flex items-center gap-4">
            {user?.isLoggedIn ? (
              <div className="flex items-center gap-4">
                <span className="text-slate-700">Привет, {user.name}!</span>
                <button onClick={onLogout} className="text-slate-500 hover:text-slate-700">Выйти</button>
              </div>
            ) : (
              <>
                <button onClick={onOpenAuth} className="hidden sm:block text-blue-500 hover:bg-[#3B82F633] px-5 py-2 rounded-xl font-medium transition-colors">Войти</button>
                <motion.button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-xl font-medium transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (user) {
                      navigate('/matcher');
                    } else {
                      onOpenAuth();
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
