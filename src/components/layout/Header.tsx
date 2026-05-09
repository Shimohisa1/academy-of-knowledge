import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import type { User } from '../../types';

interface HeaderProps {
  onOpenAuth: () => void;
  user: User | null;
  onLogout: () => void;
}

export function Header({ onOpenAuth, user, onLogout }: HeaderProps) {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (path: string) => {
    setMobileOpen(false);
    navigate(path);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2">
            <img src="/images/logo2.png" alt="Академия Знаний" className="w-8 h-8" />
            <span className="text-blue-500 font-medium text-sm">
              Академия <br /> Знаний
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/catalog" className="text-slate-700 hover:text-blue-500 transition-colors">Курсы</Link>
            <Link to="/knowledge-base" className="text-slate-700 hover:text-blue-500 transition-colors">База знаний</Link>
            <Link to="/matcher" className="text-slate-700 hover:text-blue-500 transition-colors">Подбор курса</Link>
          </nav>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-4">

            {/* AUTH DESKTOP */}
            {user?.isLoggedIn ? (
              <div className="hidden md:flex items-center gap-4">
                <span className="text-slate-700">Привет, {user.name}!</span>
                <button onClick={onLogout} className="text-slate-500 hover:text-slate-700">
                  Выйти
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <button
                  onClick={onOpenAuth}
                  className="text-blue-500 hover:bg-[#3B82F633] px-5 py-2 rounded-xl font-medium transition-colors"
                >
                  Войти
                </button>

                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-xl font-medium transition-colors"
                  onClick={() => {
                    if (user) {
                      navigate('/matcher');
                    } else {
                      onOpenAuth();
                    }
                  }}
                >
                  Начать обучение
                </button>
              </div>
            )}

            {/* MOBILE BURGER */}
            <button
              className="md:hidden flex flex-col gap-1"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <span className="w-6 h-0.5 bg-slate-700" />
              <span className="w-6 h-0.5 bg-slate-700" />
              <span className="w-6 h-0.5 bg-slate-700" />
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-slate-100 bg-white"
          >
            <div className="px-4 py-4 flex flex-col gap-4">

              <button onClick={() => handleNav('/catalog')} className="text-left text-slate-700">
                Курсы
              </button>

              <button onClick={() => handleNav('/knowledge-base')} className="text-left text-slate-700">
                База знаний
              </button>

              <button onClick={() => handleNav('/matcher')} className="text-left text-slate-700">
                Подбор курса
              </button>

              <div className="border-t pt-3 flex flex-col gap-3">
                {user?.isLoggedIn ? (
                  <>
                    <span className="text-slate-700">Привет, {user.name}!</span>
                    <button onClick={onLogout} className="text-left text-slate-500">
                      Выйти
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={onOpenAuth} className="text-left text-blue-500">
                      Войти
                    </button>

                    <button
                      onClick={() => {
                        setMobileOpen(false);
                        user ? navigate('/matcher') : onOpenAuth();
                      }}
                      className="text-left bg-blue-500 text-white px-4 py-2 rounded-xl"
                    >
                      Начать обучение
                    </button>
                  </>
                )}
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}