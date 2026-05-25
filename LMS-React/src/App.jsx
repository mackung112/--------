import { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Menu, CheckCircle, BookOpen, Sparkles, GraduationCap, Code2, Users, Zap, ArrowRight, X, Package } from 'lucide-react';
import coursesData from './data';
import LessonViewer from './components/LessonViewer';
import Storybook from './components/Storybook';


function HomeView() {
  const navigate = useNavigate();
  const totalLessons = coursesData.reduce((sum, c) => sum + c.chapters.reduce((s, ch) => s + ch.lessons.length, 0), 0);
  const totalChapters = coursesData.reduce((sum, c) => sum + c.chapters.length, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-purple-600">ห้องเรียนครูแม็ค</span>
          </div>
          <a href="#courses" className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold text-sm hover:shadow-lg hover:shadow-indigo-200 hover:-translate-y-0.5 transition-all duration-300">
            <BookOpen className="w-4 h-4" /> เริ่มเรียน
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32">
        {/* Decorative blobs */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-10 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }} />

        <div className="relative max-w-5xl mx-auto px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold mb-8 animate-bounce" style={{ animationDuration: '3s' }}>
            <Sparkles className="w-4 h-4" />
            แพลตฟอร์มการเรียนรู้แบบ Interactive
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 via-purple-600 to-pink-500">
              ห้องเรียนครูแม็ค
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-4 leading-relaxed">
            เรียนรู้เทคโนโลยีและการเขียนโปรแกรมอย่างสนุกสนาน
          </p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
            ทุกบทเรียนเต็มไปด้วยสื่อ Interactive ที่กดเล่นได้ จำลองการทำงานจริง เข้าใจง่าย และทันสมัย
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#courses" className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-indigo-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              เริ่มเรียนเลย
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <button 
              onClick={() => navigate('/library')}
              className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-600 border border-slate-200 rounded-2xl font-bold text-lg hover:bg-slate-50 hover:border-indigo-200 hover:text-indigo-600 transition-all duration-300"
            >
              <Package className="w-5 h-5" />
              คลังคอมโพเนนต์
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white/50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: coursesData.length, label: 'รายวิชา', icon: BookOpen, color: 'text-indigo-600 bg-indigo-100' },
              { value: totalChapters, label: 'หน่วยเรียน', icon: Code2, color: 'text-purple-600 bg-purple-100' },
              { value: totalLessons, label: 'บทเรียน', icon: Zap, color: 'text-pink-600 bg-pink-100' },
              { value: '100%', label: 'Interactive', icon: Sparkles, color: 'text-amber-600 bg-amber-100' },
            ].map((stat, i) => (
              <div key={i} className="text-center p-6 rounded-2xl bg-white shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-3xl font-extrabold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600 font-medium mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Courses Grid */}
      <section id="courses" className="py-20 bg-gradient-to-b from-white to-indigo-50/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">รายวิชาทั้งหมด</h2>
            <p className="text-gray-600 text-lg">เลือกวิชาที่สนใจ แล้วเริ่มเรียนได้ทันที</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coursesData.map(course => {
              const lessonCount = course.chapters.reduce((s, ch) => s + ch.lessons.length, 0);
              return (
                <div
                  key={course.id}
                  onClick={() => navigate(`/course/${course.id}`)}
                  className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 cursor-pointer transition-all duration-400 hover:-translate-y-2 hover:shadow-xl hover:border-indigo-200 group relative overflow-hidden"
                >
                  {/* Gradient accent top */}
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="text-5xl mb-6 transform transition-transform group-hover:scale-110 group-hover:rotate-3 duration-300">
                    {course.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-indigo-950 group-hover:text-indigo-700 transition-colors">{course.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed mb-6">{course.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> {course.chapters.length} หน่วย</span>
                      <span className="flex items-center gap-1"><Code2 className="w-3.5 h-3.5" /> {lessonCount} บท</span>
                    </div>
                    <div className="flex items-center text-indigo-600 font-semibold text-sm group-hover:text-purple-600 transition-colors">
                      เรียน <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-indigo-950 text-indigo-300">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg text-white">ห้องเรียนครูแม็ค</span>
          </div>
          <p className="text-sm text-indigo-400">แพลตฟอร์มการเรียนรู้ด้านเทคโนโลยีและการเขียนโปรแกรม</p>
          <p className="text-xs text-indigo-500 mt-4">© 2026 Mack's Classroom. สร้างด้วย ❤️ เพื่อการศึกษา</p>
        </div>
      </footer>
    </div>
  );
}

function CourseView() {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const course = coursesData.find(c => c.id === courseId);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isDesktopSidebarOpen, setIsDesktopSidebarOpen] = useState(true);
  const [completedLessons, setCompletedLessons] = useState({});
  const mainRef = useRef(null);

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [lessonId]);

  if (!course) return <div className="p-8 text-center text-2xl font-bold">ไม่พบวิชาเรียนนี้</div>;

  const firstLessonId = course.chapters[0]?.lessons[0]?.id;
  const currentLessonId = lessonId || firstLessonId;

  let currentLesson = null;
  let currentChapter = null;
  course.chapters.forEach(ch => {
    const lesson = ch.lessons?.find(l => l?.id === currentLessonId);
    if (lesson) {
      currentLesson = lesson;
      currentChapter = ch;
    }
  });

  const allLessons = course.chapters.flatMap(ch => ch.lessons);
  const currentIndex = allLessons.findIndex(l => l?.id === currentLessonId);

  const markCompleted = () => {
    setCompletedLessons(prev => ({ ...prev, [currentLessonId]: true }));
  };

  const handlePrevLesson = () => {
    const prevLesson = allLessons[currentIndex - 1];
    if (prevLesson) {
      navigate(`/course/${course.id}/lesson/${prevLesson.id}`);
    }
  };

  const handleNextLesson = () => {
    const nextLesson = allLessons[currentIndex + 1];
    if (nextLesson) {
      navigate(`/course/${course.id}/lesson/${nextLesson.id}`);
    } else {
      navigate('/');
    }
  };

  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < allLessons.length - 1;

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
      {/* Top Navbar - Full Width */}
      <nav className="h-14 bg-white border-b border-gray-200/80 flex items-center justify-between px-4 md:px-6 shrink-0 z-40 relative shadow-sm">
        <div className="flex items-center gap-2 md:gap-3">
          <button className="md:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" onClick={() => setIsMobileSidebarOpen(true)}>
            <Menu className="w-5 h-5" />
          </button>
          <button className="hidden md:block p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" onClick={() => setIsDesktopSidebarOpen(!isDesktopSidebarOpen)}>
            <Menu className="w-5 h-5" />
          </button>
          
          <button onClick={() => navigate('/')} className="font-bold text-lg flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center shadow-sm">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-purple-600 hidden sm:block">
              ห้องเรียนครูแม็ค
            </span>
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/')} className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-gray-600 hover:bg-gray-100 text-sm font-medium transition-colors border border-gray-200 hover:border-gray-300">
            <ChevronLeft className="w-4 h-4" /> กลับหน้ารวมวิชา
          </button>
          <div className="text-xs text-gray-500 font-medium bg-gray-100 px-3 py-1.5 rounded-full">
            บทที่ {currentIndex + 1} จาก {allLessons.length}
          </div>
        </div>
      </nav>

      {/* Main Container below Navbar */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Mobile overlay */}
        {isMobileSidebarOpen && (
          <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => setIsMobileSidebarOpen(false)} />
        )}

        {/* Sidebar */}
        <aside className={`absolute md:relative inset-y-0 left-0 z-50 w-80 shrink-0 bg-indigo-950 text-indigo-100 transition-all duration-300 ease-in-out flex flex-col ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 ${isDesktopSidebarOpen ? 'md:ml-0' : 'md:-ml-80'}`}>
          <div className="p-5 border-b border-indigo-900/50 flex items-center justify-between shrink-0 bg-indigo-950">
            <div className="min-w-0">
              <h2 className="text-base font-bold text-white tracking-tight truncate">{course.title}</h2>
              <p className="text-indigo-400 text-xs mt-1">เนื้อหาบทเรียน</p>
            </div>
            <button className="md:hidden p-1.5 hover:bg-indigo-800 rounded-lg transition-colors" onClick={() => setIsMobileSidebarOpen(false)}>
              <X className="w-5 h-5 text-indigo-300" />
            </button>
          </div>

          {/* Sidebar scrollable content */}
          <div className="flex-1 overflow-y-auto py-4 no-scrollbar">
            {course.chapters.map(chapter => (
              <div key={chapter.id} className="mb-4">
                <div className="px-5 py-2 text-xs font-bold text-indigo-400 uppercase tracking-wider">
                  {chapter.title}
                </div>
                <ul className="space-y-0.5">
                  {chapter.lessons.map(lesson => {
                    const isActive = lesson.id === currentLessonId;
                    const isCompleted = completedLessons[lesson.id];

                    return (
                      <li key={lesson.id}>
                        <button
                          onClick={() => {
                            navigate(`/course/${course.id}/lesson/${lesson.id}`);
                            setIsMobileSidebarOpen(false);
                          }}
                          className={`w-full text-left px-5 py-2.5 transition-all flex items-center gap-3 text-sm ${
                            isActive
                              ? 'bg-indigo-600 text-white font-semibold border-r-4 border-white shadow-lg shadow-indigo-800/30'
                              : 'hover:bg-indigo-900/50 text-indigo-200'
                          }`}
                        >
                          {isCompleted ? <CheckCircle className="w-4 h-4 text-green-400 shrink-0" /> : <div className={`w-4 h-4 rounded-full border shrink-0 ${isActive ? 'border-white bg-white/20' : 'border-indigo-500'}`} />}
                          <span className="truncate">{lesson.title}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          {/* Sidebar footer */}
          <div className="p-4 border-t border-indigo-900/50 shrink-0">
            <div className="text-xs text-center text-indigo-400/50">
              © ห้องเรียนครูแม็ค
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main ref={mainRef} className="flex-1 overflow-y-auto relative z-0">
          <div className="w-full">
            {currentLesson ? (
              <LessonViewer
                lesson={currentLesson}
                chapter={currentChapter}
                onComplete={markCompleted}
                onNext={handleNextLesson}
                onPrev={handlePrevLesson}
                hasPrev={hasPrev}
                hasNext={hasNext}
              />
            ) : (
              <div className="text-center py-20 text-gray-600 text-xl">โปรดเลือกบทเรียนจากเมนูด้านซ้าย</div>
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
        <Route path="/library" element={<Storybook />} />
        <Route path="/course/:courseId" element={<CourseView />} />
        <Route path="/course/:courseId/lesson/:lessonId" element={<CourseView />} />
      </Routes>
    </BrowserRouter>
  );
}
