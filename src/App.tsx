import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { Header, Footer } from './components/layout';
import { AuthModal, ConsultationModal } from './components/ui';
import {
  HomePage,
  CatalogPage,
  CourseDetailPage,
  KnowledgeBasePage,
  CourseMatcherPage,
  ArticlePage,
} from './pages';

import type { User } from './types';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header
          onOpenAuth={() => setIsAuthModalOpen(true)}
          user={user}
          onLogout={handleLogout}
        />

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

        <Footer />

        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onLogin={handleLogin}
        />
        <ConsultationModal
          isOpen={isConsultationModalOpen}
          onClose={() => setIsConsultationModalOpen(false)}
        />
      </div>
    </Router>
  );
}
