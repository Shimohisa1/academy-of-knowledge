import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { courses, questions } from '../data';
import type { Course } from '../types';

interface CourseMatcherPageProps {
  onOpenConsultation: () => void;
}

export function CourseMatcherPage({ onOpenConsultation }: CourseMatcherPageProps) {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [matchedCourses, setMatchedCourses] = useState<{ course: Course; match: number }[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('matcherAnswers');
    if (saved) {
      const parsed = JSON.parse(saved);
      setAnswers(parsed.answers);
      setCurrentStep(parsed.currentStep);
      if (parsed.showResults) {
        setShowResults(true);
        calculateMatches(parsed.answers);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('matcherAnswers', JSON.stringify({ answers, currentStep, showResults }));
  }, [answers, currentStep, showResults]);

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [questions[currentStep].id]: value });
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      calculateMatches(answers);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const calculateMatches = (currentAnswers: Record<number, string>) => {
    const results = courses.map(course => {
      let match = 50;

      const categoryAnswer = currentAnswers[1];
      if (categoryAnswer === 'it' && course.category === 'IT и программирование') match += 25;
      if (categoryAnswer === 'design' && course.category === 'Дизайн') match += 25;
      if (categoryAnswer === 'marketing' && course.category === 'Маркетинг') match += 25;
      if (categoryAnswer === 'management' && course.category === 'Управление') match += 20;
      if (categoryAnswer === 'construction' && course.category === 'Строительство') match += 25;

      const levelAnswer = currentAnswers[2];
      if (levelAnswer === 'beginner' && course.hours < 200) match += 10;
      if (levelAnswer === 'intermediate' && course.hours >= 200 && course.hours < 300) match += 10;
      if (levelAnswer === 'advanced' && course.hours >= 300) match += 10;

      const durationAnswer = currentAnswers[3];
      if (durationAnswer === 'short' && course.months <= 3) match += 10;
      if (durationAnswer === 'medium' && course.months > 3 && course.months <= 6) match += 10;
      if (durationAnswer === 'long' && course.months > 6) match += 10;

      const formatAnswer = currentAnswers[4];
      if (formatAnswer === 'online' && course.format === 'Полностью дистанционно') match += 5;
      if (formatAnswer === 'blended' && course.format === 'Очно-заочно') match += 5;

      const budgetAnswer = currentAnswers[5];
      if (budgetAnswer === 'low' && course.price <= 30000) match += 5;
      if (budgetAnswer === 'medium' && course.price > 30000 && course.price <= 50000) match += 5;
      if (budgetAnswer === 'high' && course.price > 50000) match += 5;

      return { course, match: Math.min(match, 99) };
    });

    const sorted = results.sort((a, b) => b.match - a.match).slice(0, 3);
    setMatchedCourses(sorted);
    setShowResults(true);
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResults(false);
    setMatchedCourses([]);
    localStorage.removeItem('matcherAnswers');
  };

  const progress = ((currentStep + 1) / questions.length) * 100;

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
            <h1 className="text-5xl font-serif text-blue-500 mb-12">Подбор программы обучения</h1>
            <h2 className="text-3xl font-serif text-slate-600 mb-2 text-left">Подходящие курсы для вас</h2>
            <p className="text-slate-600 text-left">
              Мы подобрали{' '}
              <span className="border-b-2 border-green-500 text-slate-700">{matchedCourses.length} программы</span>
              , соответствующие вашим критериям
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="space-y-6">
            {matchedCourses.map(({ course, match }, index) => (
              <motion.div key={course.id} initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 * index }}
                className="bg-white rounded-2xl p-6 border border-slate-100 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-serif text-slate-900">{course.title}</h3>
                    <p className="text-slate-500 mt-1">{course.format}</p>
                  </div>
                  <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full font-semibold text-sm">{match}% совпадение</span>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div><p className="text-slate-400 text-sm">Стоимость</p><p className="font-semibold text-slate-900">{course.price.toLocaleString()} ₽</p></div>
                  <div><p className="text-slate-400 text-sm">Длительность</p><p className="font-semibold text-slate-900">{course.months} месяцев</p></div>
                  <div><p className="text-slate-400 text-sm">Рассрочка</p><p className="font-semibold text-slate-900">{course.monthlyPrice.toLocaleString()} ₽/мес</p></div>
                </div>
                <div className="flex gap-4">
                  <motion.button className="flex-1 bg-[#3B82F6] hover:brightness-90 text-white py-3 rounded-xl font-medium"
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => navigate(`/course/${course.id}`)}>
                    Подробнее о курсе
                  </motion.button>
                  <motion.button className="bg-[#10B981] hover:brightness-90 text-white px-8 py-3 rounded-xl font-medium"
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    Записаться
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="mt-12 bg-[#3B82F633] rounded-2xl p-8 text-center"
          >
            <h3 className="text-2xl font-serif text-slate-900 mb-2">Нужна консультация?</h3>
            <p className="text-slate-600 mb-6">Наши специалисты помогут сделать окончательный выбор</p>
            <div className="flex justify-center gap-4">
              <motion.button className="bg-[#3B82F6] hover:brightness-90 text-white px-8 py-3 rounded-xl font-medium"
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={onOpenConsultation}>
                Записаться на консультацию
              </motion.button>
              <motion.button className="bg-white border-2 border-blue-500 text-blue-500 px-8 py-3 rounded-xl font-medium"
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => navigate('/catalog')}>
                Перейти к каталогу
              </motion.button>
            </div>
          </motion.div>

          <div className="text-center mt-8">
            <motion.button className="text-slate-500 hover:text-slate-700 font-medium"
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleRestart}>
              Начать заново
            </motion.button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-5xl font-serif text-blue-500 mb-4">Подбор программы обучения</h1>
          <p className="text-slate-600 text-lg">Ответьте на вопросы, и мы подберем курсы</p>
        </motion.div>

        <div className="mb-8">
          <div className="flex justify-between text-sm text-slate-500 mb-2">
            <span>Вопрос {currentStep + 1} из {questions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <motion.div className="h-full bg-blue-500" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.3 }} />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={currentStep} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl p-8 border border-slate-100 shadow-lg"
          >
            <h2 className="text-2xl font-serif text-slate-900 mb-6">{questions[currentStep].question}</h2>
            <div className="space-y-3">
              {questions[currentStep].options.map((option) => (
                <motion.button key={option.value}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${answers[questions[currentStep].id] === option.value ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50'}`}
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => handleAnswer(option.value)}>
                  {option.label}
                </motion.button>
              ))}
            </div>
            <div className="flex justify-between mt-8">
              <motion.button className={`px-6 py-3 rounded-xl font-medium ${currentStep === 0 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-slate-100'}`}
                onClick={handleBack} disabled={currentStep === 0} whileHover={currentStep > 0 ? { scale: 1.05 } : {}}>
                Назад
              </motion.button>
              <motion.button className={`px-8 py-3 rounded-xl font-medium ${answers[questions[currentStep].id] ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
                onClick={handleNext} disabled={!answers[questions[currentStep].id]} whileHover={answers[questions[currentStep].id] ? { scale: 1.05 } : {}}>
                {currentStep === questions.length - 1 ? 'Показать результаты' : 'Далее'}
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
