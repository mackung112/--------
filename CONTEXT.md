# 🌍 Project Context & Architecture (หน่วยความจำระยะยาว)

**เป้าหมาย:** เพื่อให้ AI เข้าใจสถาปัตยกรรมโปรเจกต์ โครงสร้างไฟล์ และประวัติการทำงาน โดยไม่ต้องให้ผู้ใช้ต้องอธิบายใหม่ทั้งหมด

---

## 🎯 1. ภาพรวมโปรเจกต์ (Project Overview)
- **ชื่อโปรเจกต์**: ห้องเรียนครูแม็ค | Mack's Classroom (LMS Platform)
- **เป้าหมายหลัก**: แพลตฟอร์ม E-Learning สำหรับเขียนโปรแกรมที่ **"เน้นการมีส่วนร่วม (Highly Interactive)"** 
- **Tech Stack**: React 19, Vite 8, Tailwind CSS 4, React Router 7, Lucide React
- **รายวิชาที่เปิดสอน**:
  1. 🐍 การเขียนโปรแกรมคอมพิวเตอร์เบื้องต้น (21910-1003) — 8 หน่วย, Python
  2. 🧩 การเขียนโปรแกรมเชิงวัตถุ (OOP) — 7 หน่วย, Python OOP
  3. 🗄️ ภาษาสอบถามข้อมูลเชิงโครงสร้างเบื้องต้น (21901-2001) — 6 หน่วย, SQL/MySQL

## 📂 2. โครงสร้างไฟล์ปัจจุบัน (Directory Tree)
```text
\Teach\
├── \Teach\LMS-React\
│   ├── \Teach\LMS-React\vite.config.js           # ตั้งค่า Vite + Tailwind v4 (ไม่มี tailwind.config.js)
│   ├── \Teach\LMS-React\src\
│   │   ├── \Teach\LMS-React\src\App.jsx              # ระบบ Routing หลัก
│   │   ├── \Teach\LMS-React\src\index.css            # Global CSS & Custom Animations
│   │   ├── \Teach\LMS-React\src\data.js              # ฐานข้อมูลวิชา Python (เชื่อม [MARKER] สู่ Component)
│   │   ├── \Teach\LMS-React\src\data\                # ฐานข้อมูลวิชา OOP และ SQL
│   │   └── \Teach\LMS-React\src\components\
│   │       ├── \Teach\LMS-React\src\components\interactive\     # ⭐ สื่อ Simulator ทั้งหมด (โหลดอัตโนมัติ)
│   │       └── \Teach\LMS-React\src\components\LessonViewer.jsx # ⭐ Engine เรนเดอร์เนื้อหาหลัก (ห้ามแก้)
│   └── \Teach\LMS-React\docs\
│       └── \Teach\LMS-React\docs\curriculum\          # เอกสารหลักสูตรรายวิชา (ตัวกำหนดหน้าเว็บ)
├── \Teach\DESIGN.md                # 💎 มาตรฐานการออกแบบ (UI/UX)
├── \Teach\SKILL.md                 # 🛠️ กฎการเขียนโค้ดทางเทคนิค
├── \Teach\CONTEXT.md               # 🌍 ภาพรวมและประวัติ (ไฟล์นี้)
├── \Teach\AGENTS.md                # 🤖 ศูนย์กลางปฏิบัติการ AI
└── \Teach\task.md                  # 🎯 แผนงานปัจจุบัน
```

## ⏳ 3. ประวัติการทำงานและสถาปัตยกรรม (History & Milestones)
- **Auto-Registry**: สถาปัตยกรรมนี้ใช้ `import.meta.glob` ใน `\Teach\LMS-React\src\components\LessonViewer.jsx` เพื่อดึง Component ในโฟลเดอร์ `\Teach\LMS-React\src\components\interactive\` มาแมปกับ `[MARKER]` ใน `\Teach\LMS-React\src\data.js` โดยอัตโนมัติ
- **UI Evolution**: โปรเจกต์นี้เคยใช้ Explorer Pattern ในอดีต แต่ปัจจุบัน **ได้ปรับมาใช้ "Immersive Full-Page Standard (Layer 1-4)"** ทั่วทั้งแพลตฟอร์ม เพื่อความสวยงามพรีเมียม
- **อัปเดตล่าสุด (พ.ค. 2026)**: 
  - ยกระดับบทเรียน Python 1.1 - 1.5 ด้วยระบบ Immersive Full-Page สำเร็จ
  - ยกเลิก Auto-scroll เพื่อให้ UI นิ่งและเสถียรที่สุด
  - ปรับสถาปัตยกรรมฐานข้อมูล (`src/data/`) เป็นแบบ Explicit Props แยก `mainTitle`, `subTitle`, `description` แทนการฝัง HTML ใน `content`

## 🧠 4. Continuous Training (การรับรู้ประวัติศาสตร์และการจัดการ)
- **บันทึกความเปลี่ยนแปลง**: ทุกครั้งที่คุณดำเนินการโครงสร้างใหญ่เสร็จสิ้น (เช่น ปรับปรุง Module หรือสถาปัตยกรรมใหม่) **ต้อง** นำมาบันทึกสรุปไว้ในหัวข้อที่ 3 เสมอ เพื่อให้ AI รุ่นต่อไปรับรู้
- **เรียนรู้จากอดีต**: สังเกตแนวทางการแก้ไขปัญหาที่ผ่านมา หากโครงสร้างไหนถูกโละทิ้งไปแล้ว (เช่น การเลื่อนจอ Auto-scroll) จงหลีกเลี่ยงการนำกลับมาใช้ใหม่
