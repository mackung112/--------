# 🌍 Project Context & Long-term Memory (บริบทและหน่วยความจำระยะยาว)

> 📌 **เป้าหมายของไฟล์นี้**: เป็น "สมองส่วนความจำถาวร" ของโปรเจกต์ เพื่อให้ AI ตัวใหม่เข้ามาอ่านแล้วเข้าใจ Architecture, โครงสร้างโค้ด, และเอกลักษณ์การออกแบบ (Design System) ได้ทันที โดยผู้ใช้ไม่ต้องเล่าใหม่ทั้งหมด

## 🎯 1. ภาพรวมและเป้าหมายโปรเจกต์ (Project Overview & Goals)
**ชื่อโปรเจกต์**: ห้องเรียนครูแม็ค | Mack's Classroom (LMS Platform)
**เป้าหมายหลัก**: แพลตฟอร์ม E-Learning สำหรับการเขียนโปรแกรม ที่ **"เน้นการมีส่วนร่วม (Highly Interactive)"** ทุกบทเรียนต้องมีสื่อที่กดเล่นได้ จำลองการทำงาน (Simulator) และรวม Game-Based Learning
**Tech Stack**: React 19, Vite 8, Tailwind CSS 4, React Router 7, Lucide React

## 🎨 2. Design System & UI/UX (ระบบการออกแบบที่ AI ต้องจดจำ)
เพื่อให้หน้าตาโปรเจกต์ไปในทิศทางเดียวกัน แม้จะเปลี่ยน AI กี่ตัวก็ตาม ทุกตัวต้องใช้กฎเหล่านี้:
- **โทนสีหลัก**: Indigo (สีหลัก `indigo-600`), Purple (สีรอง `purple-600`), Slate (พื้นหลังตัวอย่างโค้ด `slate-900`)
- **Gradients (การไล่สี)**: นิยมใช้ `bg-gradient-to-r from-indigo-600 to-purple-600`
- **ความโค้ง (Border Radius)**: ใช้ `rounded-2xl` หรือ `rounded-3xl` สำหรับกล่อง การ์ด หรือ Wrapper หลัก
- **เอฟเฟกต์ (Interactive Animations)**: ทุกปุ่ม/การ์ดที่โต้ตอบหรือคลิกได้ ต้องมี `hover:-translate-y-1` หรือ `hover:scale-105` พร้อม `transition-all duration-300` เสมอ
- **ความกลมกลืน (Seamless)**: สื่อ Interactive ต้องไม่มีขอบ (border) หรือเงา (shadow) ของตัวเองที่ดูแยกส่วนกับหน้าเว็บหลัก (`LessonViewer`)
- **Explorer Pattern**: ทุก Component ควรใช้แนว Explorer Pattern (ดูรายละเอียดใน `skill-web-lms.md` ข้อ 4-5): Header + 2-column Interactive + Live Console + Step Explanation + Gamification
- **SVG Flowcharts**: ใช้ SVG แทน Unicode/CSS สำหรับผังงาน คุณภาพเทียบ draw.io

## 📂 3. โครงสร้างไฟล์ปัจจุบัน (Directory Tree)
```text
LMS-React/
├── index.html               
├── vite.config.js           # ตั้งค่า Vite + Tailwind v4 (ไม่มี tailwind.config.js)
├── src/
│   ├── main.jsx             
│   ├── App.jsx              # ระบบ Routing (HomeView, CourseView)
│   ├── index.css            # Global CSS (@import "tailwindcss")
│   ├── data.js              # ⭐ [Database] เก็บเนื้อหา HTML + [MARKER]
│   └── components/
│       ├── LessonViewer.jsx # ⭐ Engine เรนเดอร์เนื้อหา + แปลง Marker เป็น Component
│       └── ...[Interactive Components]...
├── docs/
│   └── curriculum/          # 📄 [Curriculum] เอกสารสรุปเนื้อหารายวิชา (OOP, Intro Programming)
```

## ⏳ 4. ประวัติการทำงาน (History & Completed Milestones)
- [2026-05-XX] เซ็ตอัประบบ AI Handoff (skill.md, CONTEXT.md, task.md) สมบูรณ์
- [2026-05-XX] สร้างระบบ Component Marker สำหรับเชื่อมสื่อ Interactive สำเร็จ (`LessonViewer.jsx`)
- [2026-05-11] Rebrand เป็น "ห้องเรียนครูแม็ค" + ออกแบบหน้าแรกใหม่ (Hero, Stats, Features) + Sidebar แยก scroll
- [2026-05-11] เพิ่มปุ่ม Previous/Next lesson + เปลี่ยนชื่อวิชาเป็น "เขียนโปรแกรมด้วยภาษา Python"
- [2026-05-11] **Overhaul บทที่ 2 ทั้งหมด**: เขียนใหม่ 10 components (FlowchartSymbols, SequenceFlowchart, SelectionFlowchart, IterationFlowchart, FlowchartBestPractice, PseudocodeIntro, PseudocodeKeywords, PseudocodeCondition, PseudocodeLoop, PseudocodeFormat) ใช้ Explorer Pattern + SVG Flowcharts + Game-Based Learning
- [2026-05-11] เพิ่ม Explorer Pattern และ Game-Based Learning ใน skill-web-lms.md
- [2026-05-12] บันทึกโครงสร้างหลักสูตร (OOP และ การเขียนโปรแกรมเบื้องต้น) ลงใน `docs/curriculum/` เพื่อใช้เป็นฐานข้อมูลอ้างอิงถาวร

## 🤔 5. ตรรกะการออกแบบ (Why we built it this way)
- **ทำไมใช้ `data.js` เก็บ HTML + [MARKER]?**: เพื่อแยกข้อมูลเนื้อหาออกจากโค้ด UI เมื่อ `LessonViewer.jsx` อ่านเจอ `[MARKER]` จะแทนที่ด้วย React Component ทันที (วิธีนี้ scale การเพิ่มบทเรียนได้ง่ายสุด)
- **ทำไมใช้ Tailwind v4?**: เพื่อลดความซับซ้อนของ PostCSS ทำงานผ่าน Vite Plugin `@tailwindcss/vite` ตรงๆ

## 🚫 6. ขอบเขตที่ห้ามแก้ไข (Strictly DO NOT TOUCH)
ระบบที่เสถียรแล้ว ห้าม AI ไปรื้อโค้ดเด็ดขาด ยกเว้นมีคำสั่งชัดเจนใน `task.md`:
1. โครงสร้าง `App.jsx` (Routing, Layout ซ้ายขวา)
2. `LessonViewer.jsx` (อนุญาตเฉพาะอัปเดตบรรทัด Import และเพิ่ม `COMPONENT_MAP` เท่านั้น ห้ามแก้ Logic การเรนเดอร์)
3. `vite.config.js` และ `index.css`
