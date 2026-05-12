import { useState } from 'react';
import { 
  Box, 
  Settings, 
  Play, 
  Plus, 
  User, 
  Zap, 
  GraduationCap, 
  Coffee,
  Trash2
} from 'lucide-react';

export default function OOPClassSimulator() {
  const [objects, setObjects] = useState([]);
  const [tempName, setTempName] = useState('');
  const [tempAge, setTempAge] = useState('');

  const handleCreateObject = () => {
    if (!tempName.trim()) return;
    
    const newObject = {
      id: Date.now(),
      name: tempName,
      age: tempAge || 18,
      energy: 100,
      knowledge: 0
    };
    
    setObjects([...objects, newObject]);
    setTempName('');
    setTempAge('');
  };

  const handleAction = (id, action) => {
    setObjects(objects.map(obj => {
      if (obj.id === id) {
        if (action === 'study') {
          if (obj.energy >= 20) {
            return { ...obj, energy: obj.energy - 20, knowledge: obj.knowledge + 10 };
          }
        } else if (action === 'sleep') {
          return { ...obj, energy: Math.min(100, obj.energy + 40) };
        }
      }
      return obj;
    }));
  };

  const handleRemove = (id) => {
    setObjects(objects.filter(obj => obj.id !== id));
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200 my-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white flex items-center gap-4">
        <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
          <Box className="w-8 h-8 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">เครื่องจำลอง Class และ Object</h2>
          <p className="text-blue-100 mt-1">เห็นภาพชัดเจนว่า Class คือพิมพ์เขียว และ Object คือสิ่งที่สร้างออกมาจริงๆ</p>
        </div>
      </div>

      <div className="p-6 md:p-8 grid md:grid-cols-12 gap-8">
        
        {/* Left: The Class Blueprint */}
        <div className="md:col-span-5 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-300 p-6 flex flex-col">
          <div className="flex items-center gap-2 text-indigo-700 font-bold mb-4">
            <Settings className="w-5 h-5" />
            <h3>พิมพ์เขียว: Class Student</h3>
          </div>
          
          <div className="bg-slate-800 rounded-xl p-4 text-sm font-mono text-blue-300 overflow-hidden mb-6 shadow-inner">
            <div className="text-purple-400">class <span className="text-yellow-300">Student</span>:</div>
            <div className="ml-4 mt-2 text-purple-400">def <span className="text-blue-400">__init__</span>(self, name, age):</div>
            <div className="ml-8 text-slate-300">self.name = name</div>
            <div className="ml-8 text-slate-300">self.age = age</div>
            <div className="ml-8 text-slate-300">self.energy = 100</div>
            <div className="ml-8 text-slate-300">self.knowledge = 0</div>
            
            <div className="ml-4 mt-3 text-purple-400">def <span className="text-blue-400">study</span>(self):</div>
            <div className="ml-8 text-slate-300">self.energy -= 20</div>
            <div className="ml-8 text-slate-300">self.knowledge += 10</div>
            
            <div className="ml-4 mt-3 text-purple-400">def <span className="text-blue-400">sleep</span>(self):</div>
            <div className="ml-8 text-slate-300">self.energy += 40</div>
          </div>

          <div className="mt-auto bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <h4 className="font-bold text-slate-700 mb-3 text-sm">สร้าง Object ใหม่จากพิมพ์เขียวนี้</h4>
            <div className="flex flex-col gap-3">
              <input 
                type="text" 
                placeholder="ชื่อนักเรียน" 
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
              />
              <input 
                type="number" 
                placeholder="อายุ (ค่าเริ่มต้น 18)" 
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                value={tempAge}
                onChange={(e) => setTempAge(e.target.value)}
              />
              <button 
                onClick={handleCreateObject}
                disabled={!tempName.trim()}
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 disabled:bg-indigo-300 text-white py-2 rounded-lg font-bold shadow-md hover:bg-indigo-700 transition-colors"
              >
                <Plus className="w-4 h-4" /> สร้างออบเจ็กต์ (Instantiate)
              </button>
            </div>
          </div>
        </div>

        {/* Right: The Objects in Memory */}
        <div className="md:col-span-7 bg-indigo-50/50 rounded-2xl border border-indigo-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-indigo-900 flex items-center gap-2">
              <Box className="w-5 h-5 text-indigo-500" />
              Objects ในระบบ ({objects.length})
            </h3>
          </div>

          {objects.length === 0 ? (
            <div className="h-64 border-2 border-dashed border-indigo-200 rounded-xl flex flex-col items-center justify-center text-indigo-400 p-6 text-center bg-white/50">
              <User className="w-12 h-12 mb-3 opacity-50" />
              <p>ยังไม่มี Object ในระบบ<br/>ลองกรอกชื่อแล้วกดสร้างออบเจ็กต์ดูสิ!</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-2">
              {objects.map((obj) => (
                <div key={obj.id} className="bg-white rounded-xl shadow-sm border border-indigo-100 p-4 relative group hover:shadow-md transition-shadow">
                  <button 
                    onClick={() => handleRemove(obj.id)}
                    className="absolute top-2 right-2 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center border border-indigo-200 shrink-0">
                      <User className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-800">{obj.name}</div>
                      <div className="text-xs text-slate-500">Age: {obj.age} | Type: Student</div>
                    </div>
                  </div>

                  {/* State */}
                  <div className="space-y-2 mb-4">
                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="text-amber-600 flex items-center gap-1"><Zap className="w-3 h-3" /> Energy</span>
                        <span className="text-amber-700">{obj.energy}/100</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div className="bg-amber-500 h-2 transition-all duration-300" style={{ width: `${obj.energy}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="text-blue-600 flex items-center gap-1"><GraduationCap className="w-3 h-3" /> Knowledge</span>
                        <span className="text-blue-700">{obj.knowledge}</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div className="bg-blue-500 h-2 transition-all duration-300" style={{ width: `${Math.min(100, obj.knowledge)}%` }}></div>
                      </div>
                    </div>
                  </div>

                  {/* Methods */}
                  <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-100">
                    <button 
                      onClick={() => handleAction(obj.id, 'study')}
                      disabled={obj.energy < 20}
                      className="flex items-center justify-center gap-1 py-1.5 px-2 text-xs font-bold rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Play className="w-3 h-3" /> study()
                    </button>
                    <button 
                      onClick={() => handleAction(obj.id, 'sleep')}
                      disabled={obj.energy >= 100}
                      className="flex items-center justify-center gap-1 py-1.5 px-2 text-xs font-bold rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Coffee className="w-3 h-3" /> sleep()
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
      
      {/* Footer explanation */}
      <div className="bg-indigo-50 p-4 border-t border-indigo-100 text-sm text-indigo-800 text-center">
        <strong>ข้อสังเกต:</strong> ออบเจ็กต์แต่ละตัว (เช่น {objects.length > 0 ? objects[0].name : 'นาย ก'} และ นาย ข) ถูกสร้างจาก <strong>Class (พิมพ์เขียว)</strong> เดียวกัน แต่มีข้อมูล (State) เป็นอิสระแยกจากกันโดยสิ้นเชิง
      </div>
    </div>
  );
}
