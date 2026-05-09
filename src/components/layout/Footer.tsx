import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/images/logo3.png" alt="Академия Знаний" className="w-8 h-8" />
              <span className="font-medium text-sm text-white">Академия <br /> Знаний</span>
            </div>
            <p className="text-slate-400 text-sm max-w-xs">Современная образовательная платформа с государственной аккредитацией. Получайте качественное образование 24/7 в удобном формате.</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Навигация</h3>
            <ul className="space-y-2 text-slate-400">
              <li><Link to="/catalog" className="hover:text-white transition-colors">Каталог курсов</Link></li>
              <li><Link to="/knowledge-base" className="hover:text-white transition-colors">База знаний</Link></li>
              <li><Link to="/matcher" className="hover:text-white transition-colors">Подбор программы</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Контакты</h3>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-center gap-2"><img src="/images/phone.png" alt="Телефон" className="w-4 h-4 shrink-0 object-contain" /> +7 (946) 123-45-67</li>
              <li className="flex items-center gap-2"><img src="/images/email.png" alt="Email" className="w-4 h-4 shrink-0 object-contain" /> AcademyofKnowledge@mail.ru</li>
              <li className="flex items-center gap-2"><img src="/images/location.png" alt="Адрес" className="w-4 h-4 shrink-0 object-contain" /> г. Самара, Московское шоссе, 125А</li>
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
