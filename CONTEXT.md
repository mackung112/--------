# 🌍 Project Context & Long-term Memory (บริบทและหน่วยความจำระยะยาว)

> 📌 **เป้าหมายของไฟล์นี้**: เป็น "สมองส่วนความจำถาวร" ของโปรเจกต์ เพื่อให้ AI ตัวใหม่เข้ามาอ่านแล้วเข้าใจ Architecture, โครงสร้างโค้ด, และเอกลักษณ์การออกแบบ (Design System) ได้ทันที โดยผู้ใช้ไม่ต้องเล่าใหม่ทั้งหมด

## 🎯 1. ภาพรวมและเป้าหมายโปรเจกต์ (Project Overview & Goals)
**ชื่อโปรเจกต์**: ห้องเรียนครูแม็ค | Mack's Classroom (LMS Platform)
**เป้าหมายหลัก**: แพลตฟอร์ม E-Learning สำหรับการเขียนโปรแกรม ที่ **"เน้นการมีส่วนร่วม (Highly Interactive)"** ทุกบทเรียนต้องมีสื่อที่กดเล่นได้ จำลองการทำงาน (Simulator) และรวม Game-Based Learning
**Tech Stack**: React 19, Vite 8, Tailwind CSS 4, React Router 7, Lucide React
**รายวิชาที่เปิดสอน (Active Courses)**:
1. 🐍 **การเขียนโปรแกรมคอมพิวเตอร์เบื้องต้น** (21910-1003) — 8 หน่วย, Python
2. 🧩 **การเขียนโปรแกรมเชิงวัตถุ** (OOP) — 7 หน่วย, Python OOP
3. 🗄️ **ภาษาสอบถามข้อมูลเชิงโครงสร้างเบื้องต้น** (21901-2001) — 6 หน่วย, SQL/MySQL

## 🎨 2. Design System & UI/UX (อ้างอิง DESIGN.md)
ทุกการออกแบบ UI, โทนสี, Typography และ Interaction **ต้อง** ปฏิบัติตามข้อกำหนดใน [DESIGN.md](file:///d:/STD/---------1/DESIGN.md) อย่างเคร่งครัด 100% ห้ามคิดเองหรือใช้สีอื่นนอกเหนือจากที่กำหนดไว้

- **Source of Truth**: [DESIGN.md](file:///d:/STD/---------1/DESIGN.md) คือมาตรฐานสูงสุดของโปรเจกต์
- **Ultimate Gamification & Simulators**: การสร้างเนื้อหาต้องไม่ใช้แค่ Card Click ธรรมดา แต่ต้องสร้าง **Mini-games** หรือ **Deep Simulators** ขั้นสูง (เช่น เกมยิงเลเซอร์, เกมแข่งรถจำลอง Index, Drag & Drop State Machine) เพื่อให้ความ Interactive สูงเทียบเท่าวิชา OOP หรือมากกว่า
- **Explorer Pattern**: ทุก Component ควรใช้แนว Explorer Pattern (ดูรายละเอียดใน `SKILL.md` ข้อ 4-5): Header + 2-column Interactive + Live Console + Step Explanation + Gamification
- **SVG Flowcharts**: ใช้ SVG แทน Unicode/CSS สำหรับผังงาน คุณภาพเทียบ draw.io

## 📂 3. โครงสร้างไฟล์ปัจจุบัน (Directory Tree)
```text
LMS-React/
├── index.html               
├── vite.config.js           # ตั้งค่า Vite + Tailwind v4 (ไม่มี tailwind.config.js)
├── DESIGN.md               # 💎 มาตรฐานการออกแบบ (Strict Guidelines - Source of Truth)
├── SKILL.md                # 🤖 คู่มือปฏิบัติการ AI (Master Prompt - อ่านก่อนเสมอ)
├── CONTEXT.md               # ⭐ ภาพรวมโปรเจกต์ (สมองส่วนความจำ)
├── task.md                  # ⭐ สถานะงานปัจจุบัน (ต้องอัปเดตทุกครั้ง)
├── src/
│   ├── main.jsx             
│   ├── App.jsx              # ระบบ Routing (HomeView, CourseView)
│   ├── index.css            # Global CSS + Custom Animations
│   ├── data.js              # ⭐ [Database] วิชา Python (HTML + [MARKER])
│   ├── data/
│   │   ├── oopCourse.js     # ⭐ [Database] วิชา OOP
│   │   └── sqlCourse.js     # ⭐ [Database] วิชา SQL
│   └── components/
│       ├── interactive/         # ⭐ สื่อ Interactive ทั้งหมด (Auto-loaded)
│       │   └── utils/           # Shared utilities (SQLSyntaxEngine ฯลฯ)
│       ├── LessonViewer.jsx     # ⭐ Engine เรนเดอร์เนื้อหา + Auto-Registry
│       └── ...[UI Components]...
├── docs/
│   ├── curriculum/          # 📄 เอกสารสรุปเนื้อหารายวิชา
│   └── html/                # 📄 ต้นฉบับ HTML ก่อน Migration
```

## ⏳ 4. ประวัติการทำงาน (History & Completed Milestones)
- [2026-05-XX] เซ็ตอัประบบ AI Handoff (SKILL.md, CONTEXT.md, task.md) สมบูรณ์
- [2026-05-XX] สร้างระบบ Component Marker สำหรับเชื่อมสื่อ Interactive สำเร็จ (`LessonViewer.jsx`)
- [2026-05-11] Rebrand เป็น "ห้องเรียนครูแม็ค" + ออกแบบหน้าแรกใหม่ (Hero, Stats, Features) + Sidebar แยก scroll
- [2026-05-11] เพิ่มปุ่ม Previous/Next lesson + เปลี่ยนชื่อวิชาเป็น "เขียนโปรแกรมด้วยภาษา Python"
- [2026-05-11] **Overhaul บทที่ 2 ทั้งหมด**: เขียนใหม่ 10 components (FlowchartSymbols, SequenceFlowchart, SelectionFlowchart, IterationFlowchart, FlowchartBestPractice, PseudocodeIntro, PseudocodeKeywords, PseudocodeCondition, PseudocodeLoop, PseudocodeFormat) ใช้ Explorer Pattern + SVG Flowcharts + Game-Based Learning
- [2026-05-11] เพิ่ม Explorer Pattern และ Game-Based Learning ใน `SKILL.md`
- [2026-05-12] บันทึกโครงสร้างหลักสูตร (OOP และ การเขียนโปรแกรมเบื้องต้น) ลงใน `docs/curriculum/` เพื่อใช้เป็นฐานข้อมูลอ้างอิงถาวร
- [2026-05-12] ปรับปรุงระบบ **Auto-Registry** ให้ `LessonViewer.jsx` โหลดสื่อ Interactive อัตโนมัติจากโฟลเดอร์ `interactive/` ทำให้ผู้สร้างเนื้อหาไม่ต้องเขียน Import เองอีกต่อไป
- [2026-05-14] สร้างรายวิชา **ภาษาสอบถามข้อมูลเชิงโครงสร้างเบื้องต้น (SQL / 21901-2001)** เสร็จสมบูรณ์ (6 หน่วย, 66 บทเรียน, 66 Interactive Components) พร้อมปรับให้ `SKILL.md` รองรับการเขียน MySQL
- [2026-05-15] **Migration Unit 2 (DDL) เสร็จสมบูรณ์**: สร้าง Interactive Components 8 ตัว (2.5-2.12) + สร้าง `utils/SQLSyntaxEngine.js` + เพิ่ม CSS Animations 6 ชุดใน `index.css`
- [2026-05-15] **ลบวิชาที่ยังไม่มีบทเรียน** ออก 10 วิชาจาก `data.js` เหลือ 3 วิชาที่มีเนื้อหาจริง (Python, OOP, SQL)
- [2026-05-15] **จัดระเบียบใหม่ (Refactor Guidelines)**: สร้าง `DESIGN.md` เป็น Source of Truth และเปลี่ยนชื่อ skill-web-lms.md เป็น `SKILL.md`
- [2026-05-15] **Component Storybook**: สร้างระบบ Component Library (`/library`) เพื่อใช้ดูและทดสอบสื่อ Interactive ทั้งหมด 174 ตัวในโปรเจกต์
- [2026-05-16] **Grand Refactoring (Python Unit 1)**: อัปเกรดไฟล์สื่อ Interactive 7 ไฟล์ของวิชาเขียนโปรแกรมเบื้องต้น ให้เป็น Explorer Pattern แบบเต็มรูปแบบตาม `DESIGN.md`
- [2026-05-16] **UI/UX Enhancement (VS Code Style)**: ปรับปรุงโครงสร้าง Component เป็น VS Code Layout โดยจัดให้ Terminal/Console เป็นแถบยาวเต็มความกว้างอยู่ด้านล่างสุด พร้อมระบบ Auto-Scroll เฉพาะในกล่อง
- [2026-05-18] **SQL Unit 5 (DCL) Explorer Refactor**: อัปเกรด `SQL21901_U5_L1` ถึง `L10` จาก SQLSyntaxEngine เป็น Deep Simulator ตาม Explorer Pattern (CIA Triad, Pipeline, Firewall, IAM/RBAC, GRANT/REVOKE, Audit Logs, SQL Injection Lab, Integrity FK)
- [2026-05-18] **SQL Unit 6 (Functions & Dashboard) Explorer Refactor** *(by antigravity)*: อัปเกรดทั้ง 12 ไฟล์ของ Unit 6 ให้เป็น Explorer Pattern ครบ — L1-L6 แก้ terminal h-48, L7 CONCAT/CONCAT_WS/IFNULL Simulator, L8 DateTime (NOW/YEAR/DATE_ADD), L9 CASE/IF/IFNULL Grade Classifier, L10 Trend Analysis + Bar Chart (Monthly/YoY/Running Total), L11 Report Builder Studio ครอบ Explorer Shell + Quiz + Terminal, L12 Dashboard (KPI Cards/Top N/Category Breakdown)
- [2026-05-18] **SQL Unit 4 (DQL) Explorer Refactor** *(by antigravity)*: อัปเกรดทั้ง 12 ไฟล์ของ Unit 4 ให้เป็น Explorer Pattern ครบ — L1 SELECT */columns/WHERE, L2 DISTINCT/multi-col/COUNT, L3 ORDER BY ASC/DESC/multi, L4 Comparison =/>/BETWEEN, L5 Logical AND/OR/NOT, L6 LIKE S%/%a%/____, L7 INNER JOIN + mini Venn, L8 LEFT/RIGHT JOIN, L9 GROUP BY COUNT/SUM/AVG + bar chart, L10 HAVING COUNT/SUM/WHERE→HAVING pipeline, L11 UNION/UNION ALL, L12 Report Design 4-step flow
- [2026-05-25] **Design Pivot**: ปรับเปลี่ยนทิศทางการออกแบบระบบจาก Explorer Pattern สู่ **Immersive Full-Page Pattern** ตามตัวอย่างใน `RAW DATA` (เริ่มใช้ตั้งแต่ Python Unit 4 เป็นต้นไป)

## 🤔 5. ตรรกะการออกแบบ (Why we built it this way)
- **ทำไมใช้ `data.js` เก็บ HTML + [MARKER]?**: เพื่อแยกข้อมูลเนื้อหาออกจากโค้ด UI เมื่อ `LessonViewer.jsx` อ่านเจอ `[MARKER]` จะทำการจับคู่กับไฟล์ใน `interactive/` ที่ชื่อตรงกันและเรนเดอร์แทนที่ทันที (ระบบ Auto-Registry ผ่าน Vite `import.meta.glob`)
- **ทำไมใช้ Tailwind v4?**: เพื่อลดความซับซ้อนของ PostCSS ทำงานผ่าน Vite Plugin `@tailwindcss/vite` ตรงๆ

## 🚫 6. ขอบเขตที่ห้ามแก้ไข (Strictly DO NOT TOUCH)
ระบบที่เสถียรแล้ว ห้าม AI ไปรื้อโค้ดเด็ดขาด ยกเว้นมีคำสั่งชัดเจนใน `task.md`:
1. โครงสร้าง `App.jsx` (Routing, Layout ซ้ายขวา)
2. `LessonViewer.jsx` (ระบบเสถียรแล้วและทำงานแบบ Auto-Registry ห้ามไปเพิ่ม Import หรือแก้ Logic เด็ดขาด)
3. `vite.config.js` และ `index.css`
