# 🛠️ AI Skill & Technical Standards (Master Prompt)

**เป้าหมาย:** ไฟล์นี้รวบรวม "กฎทางเทคนิค (Technical Rules)" และ "มาตรฐานโค้ด (Coding Standards)" ห้ามละเมิดเด็ดขาด

## 🚨 1. กฎเหล็กทางเทคนิค (Strictly Prohibited)
- **ห้ามใช้ Vanilla JS**: ต้องใช้ React State/Ref/Hooks เท่านั้น
- **ห้ามใช้ Tailwind แบบ Dynamic**: ให้ Hardcode string เต็มรูปแบบ (เช่น `text-indigo-600` ห้ามใช้ `${color}-600`) เพื่อรองรับ Tailwind v4
- **ห้ามแตะ Core Architecture**: ห้ามแก้ไข `\Teach\LMS-React\src\App.jsx`, `\Teach\LMS-React\src\components\LessonViewer.jsx`, `\Teach\LMS-React\vite.config.js` เว้นแต่จะมีระบุในคำสั่ง
- **ห้าม Card-in-Card**: ทุกหน้าต้องเป็นแบบไร้ขอบ (Seamless) ผสานไปกับฉากหลังตาม Immersive Full-Page Standard
- **State Management**: ห้ามใช้ Global State สำหรับ Simulator เด็ดขาด ให้ใช้ Local State (`useState`, `useEffect`) เสมอเพื่อความเป็นอิสระ

## 💻 2. มาตรฐานการเขียนโค้ด (Coding Standards)
- **Component Format**: 
  - ให้เขียนเป็น `export default function ComponentName() { ... }`
  - การตั้งชื่อไฟล์: `COURSE_UX_LX_Description.jsx` (PascalCase)
- **Interactive Component**: ทุกสื่อ Simulator ให้สร้างเก็บไว้ที่ `\Teach\LMS-React\src\components\interactive\` (ระบบจะโหลดและนำไปใช้งานอัตโนมัติผ่าน Auto-Registry)
- **ภาษาและเนื้อหา**: โค้ดตัวอย่างในวิชาต้องใช้ **Python** หรือ **MySQL** และคำอธิบายเนื้อหาต้องเป็น **ภาษาไทย** เสมอ
- **JSX Gotchas**: หากมีสัญลักษณ์ `>>>` ในโค้ด ให้ห่อด้วย `{">>>"}` เสมอ

## 🎮 3. แนวทาง Game-Based Learning & Interaction
- **Ultimate Gamification**: ห้ามทำเนื้อหาแบบ Flashcard นิ่งๆ หรือหน้าต่างพื้นฐาน ต้องเป็น "มินิเกม" หรือ "Simulator ขั้นสูง" ที่มีลูกเล่นแพรวพราวเสมอ
- **Flowcharts**: ใช้ SVG บริสุทธิ์ แทน Unicode หรือ CSS ให้วาดสวยงามระดับเดียวกับ draw.io
- **Micro-Interactions**: ปุ่มและการ์ดที่โต้ตอบได้ต้องใส่ `active:scale-98 transition-all` เสมอ
- **Controls**: ทุก Simulator ที่จำลองการทำงานต้องมีปุ่ม Play, Pause, และ Reset (ปุ่ม Reset ให้ใช้ไอคอน `RotateCcw` จาก `lucide-react`)

## 📚 4. หลักสูตรและการจัดการข้อมูล
- **โครงสร้างเนื้อหา**: อ้างอิงโฟลเดอร์ `\Teach\LMS-React\docs\curriculum\`
  - Unit = บทหลัก
  - ลำดับที่ 1 (เช่น 1.1) = จำนวนหน้าเว็บ (Lessons) 
  - ลำดับที่ 2 (เช่น 1.1.1) = หัวข้อบังคับที่ต้องมีในหน้านั้น
- **การเพิ่มเนื้อหาเข้าสู่ระบบ**: ให้นำชื่อไฟล์ Component ไปใส่ในรูปแบบ `[Marker]` ในไฟล์ `\Teach\LMS-React\src\data.js` หรือโฟลเดอร์ `\Teach\LMS-React\src\data\` เพื่อให้ระบบนำไปแสดงผล

## 🧠 5. Continuous Training (การอัปเดตนิสัยการเขียนโค้ด)
- **ปรับตัวตามผู้ใช้**: สังเกตและจดจำรูปแบบการเขียนโค้ดหรือตรรกะที่ผู้ใช้พึงพอใจ หากผู้ใช้สั่งให้หลีกเลี่ยงการเขียนแบบใด หรือให้แก้การทำงานซ้ำๆ ให้คุณถือเป็น "บรรทัดฐานใหม่ (New Standard)" และเขียนทับลงในหมวดหมู่นี้ได้ทันที เพื่อผลิตผลงานให้ตรงใจมากที่สุด
- **New UI Fix (27 May 2026)**: ทุกครั้งที่ใช้ `text-transparent bg-clip-text` กับข้อความภาษาอังกฤษ/ไทยขนาดใหญ่ **ต้องใส่คลาส `pb-2 leading-normal` เสมอ** เพื่อแก้บัก Tailwind ตัดหางตัวอักษร (Descender Clipping) ที่ทำให้หางตัว p, y, j ขาดหายไป

## ☁️ 6. Git & Cloud Sync (การเปลี่ยนเครื่องทำงาน)
- **Repository หลัก**: `https://github.com/mackung112/Teach.git`
- **คำสั่ง "ดึงข้อมูลล่าสุด"**: หากผู้ใช้พิมพ์คำสั่งนี้ ให้คุณใช้ Terminal รันคำสั่งบังคับดึงข้อมูลล่าสุดมาทับ Local ทันที เช่น `git fetch origin` ตามด้วย `git reset --hard origin/main` (หรือ master) เพื่อให้ผู้ใช้สามารถทำงานต่อจากเครื่องอื่นได้อย่างไร้รอยต่อ
