import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useParams, Link } from 'react-router-dom';
import { BookOpen, ChevronLeft, Menu, Moon, Sun, CheckCircle } from 'lucide-react';
import coursesData from './data';
import LessonViewer from './components/LessonViewer';
import SDLC from './components/SDLC';

function HomeView() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-8 max-w-7xl mx-auto">
      <header className="text-center mb-16 pt-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 tracking-tight">
          CODE ACADEMY
        </h1>
        <p className="text-xl text-gray-600">แพลตฟอร์มการเรียนรู้รูปแบบใหม่ ทันสมัย และเข้าใจง่าย</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {coursesData.map(course => (
          <div 
            key={course.id}
            onClick={() => navigate(`/course/${course.id}`)}
            className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 cursor-pointer transition-all duration-400 hover:-translate-y-2 hover:shadow-2xl hover:border-indigo-300 group"
          >
            <div className="text-5xl mb-6 transform transition-transform group-hover:scale-110">
              {course.icon}
            </div>
            <h3 className="text-2xl font-bold mb-3 text-indigo-950">{course.title}</h3>
            <p className="text-gray-600 line-clamp-3 leading-relaxed">{course.description}</p>
            
            <div className="mt-8 flex items-center text-indigo-600 font-semibold group-hover:text-purple-600">
              เริ่มเรียนเลย <ChevronLeft className="w-5 h-5 ml-1 rotate-180 transition-transform group-hover:translate-x-2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CourseView() {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const course = coursesData.find(c => c.id === courseId);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [completedLessons, setCompletedLessons] = useState({});

  if (!course) return <div className="p-8 text-center text-2xl font-bold">ไม่พบวิชาเรียนนี้</div>;

  const firstLessonId = course.chapters[0]?.lessons[0]?.id;
  const currentLessonId = lessonId || firstLessonId;
  
  let currentLesson = null;
  let currentChapter = null;
  course.chapters.forEach(ch => {
    const lesson = ch.lessons.find(l => l.id === currentLessonId);
    if (lesson) {
      currentLesson = lesson;
      currentChapter = ch;
    }
  });

  const markCompleted = () => {
    setCompletedLessons(prev => ({ ...prev, [currentLessonId]: true }));
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-80 bg-indigo-950 text-indigo-100 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 overflow-y-auto`}>
        <div className="p-6 border-b border-indigo-900/50 flex items-center justify-between sticky top-0 bg-indigo-950/90 backdrop-blur z-10">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">LMS Pro</h2>
            <p className="text-indigo-300 text-sm mt-1 truncate">{course.title}</p>
          </div>
          <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
            <ChevronLeft className="w-6 h-6 text-indigo-300" />
          </button>
        </div>
        
        <div className="py-4">
          {course.chapters.map(chapter => (
            <div key={chapter.id} className="mb-4">
              <div className="px-6 py-2 text-xs font-bold text-indigo-400 uppercase tracking-wider">
                {chapter.title}
              </div>
              <ul className="space-y-1">
                {chapter.lessons.map(lesson => {
                  const isActive = lesson.id === currentLessonId;
                  const isCompleted = completedLessons[lesson.id];
                  
                  return (
                    <li key={lesson.id}>
                      <button
                        onClick={() => {
                          navigate(`/course/${course.id}/lesson/${lesson.id}`);
                          if(window.innerWidth < 768) setSidebarOpen(false);
                        }}
                        className={`w-full text-left px-6 py-3 transition-colors flex items-center gap-3 ${
                          isActive 
                            ? 'bg-indigo-600 text-white font-semibold border-r-4 border-white' 
                            : 'hover:bg-indigo-900/50 text-indigo-200'
                        }`}
                      >
                        {isCompleted ? <CheckCircle className="w-4 h-4 text-green-400 shrink-0" /> : <div className="w-4 h-4 rounded-full border border-indigo-400 shrink-0" />}
                        <span className="truncate">{lesson.title}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <nav className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-8 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button className="md:hidden p-2 text-gray-600" onClick={() => setSidebarOpen(true)}>
              <Menu className="w-6 h-6" />
            </button>
            <button onClick={() => navigate('/')} className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-gray-600 hover:bg-gray-100 font-medium transition-colors">
              <ChevronLeft className="w-5 h-5" /> <span className="hidden sm:inline">กลับหน้ารวมวิชา</span>
            </button>
          </div>
          <div className="font-mont font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            CODE ACADEMY
          </div>
        </nav>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12">
          <div className="max-w-4xl mx-auto">
            {currentLesson ? (
              <LessonViewer 
                lesson={currentLesson} 
                chapter={currentChapter}
                onComplete={markCompleted}
              />
            ) : (
              <div className="text-center py-20 text-gray-500 text-xl">โปรดเลือกบทเรียนจากเมนูด้านซ้าย</div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/course/:courseId" element={<CourseView />} />
        <Route path="/course/:courseId/lesson/:lessonId" element={<CourseView />} />
      </Routes>
    </BrowserRouter>
  );
}
