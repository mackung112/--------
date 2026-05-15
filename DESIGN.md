# LMS-React Frontend Design & System Architecture Standards (Academic Logic)

เอกสารนี้คือ "Source of Truth" และ "Strict Guidelines" สำหรับ AI Agent ในการพัฒนา เพื่อรักษาความสมบูรณ์ของสถาปัตยกรรมและมาตรฐาน UI/UX ของระบบ LMS-React ให้เป็นมาตรฐานเดียวกัน 100%

## 1. Project Context & Architecture

LMS-React คือระบบจัดการการเรียนรู้แบบ Single Page Application (SPA) ที่เน้นการทำ "In-browser Simulation" สำหรับวิชาสายโปรแกรมเมอร์ (PY21910, OOP21910, SQL21901) โดยไม่ต้องติดตั้งโปรแกรมเพิ่ม

- **Framework**: React 18+ (Functional Components & Hooks)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS (Strictly no external CSS)
- **Icons**: lucide-react (size=20, strokeWidth=2)
- **State**: Local State focus for Simulators (ห้ามใช้ Global State สำหรับ Simulator รายชิ้น)
- **Directory Structure**:
    - `src/components/interactive/`: ที่อยู่ของ Simulator/Interactives ทั้งหมด
    - `src/data/`: ที่อยู่ของไฟล์หลักสูตร (oopCourse.js, sqlCourse.js)
    - `docs/`: ไฟล์ Markdown สำหรับเนื้อหาภาคทฤษฎี

## 2. Academic Logic Design Tokens

### 2.1 Color Palette (Strict Hex Codes)

| Token | Hex Code | Tailwind Usage |
| :--- | :--- | :--- |
| Primary | #2563eb | blue-600 |
| Primary Container | #eff6ff | blue-50 |
| On-Primary Container | #1e40af | blue-800 |
| Surface | #f8fafc | slate-50 |
| Surface Dim | #f1f5f9 | slate-100 |
| Surface Bright | #ffffff | white |
| Outline | #e2e8f0 | slate-200 |
| Outline Variant | #cbd5e1 | slate-300 |
| Success | #059669 | emerald-600 |
| Error | #dc2626 | red-600 |
| Warning | #f59e0b | amber-500 |

### 2.2 Typography Scale & Thai Rules

- **Font Family**: Inter (EN), Noto Sans Thai (TH)
- **Thai Rule**: บังคับใช้ `leading-relaxed` (line-height: 1.625) หรือ `leading-loose` สำหรับภาษาไทยทุกจุดเพื่อป้องกันสระทับซ้อน
- **Scale Definition**:
    - **Display Large**: `font-display text-5xl font-bold tracking-tight`
    - **Headline Medium**: `font-display text-2xl font-bold text-slate-900`
    - **Headline Small**: `font-display text-xl font-semibold text-slate-900`
    - **Body Medium**: `font-base text-base leading-relaxed text-slate-600`
    - **Body Small**: `font-base text-sm leading-relaxed text-slate-500`
    - **Label Medium**: `font-base text-sm font-medium tracking-wide uppercase`

### 2.3 Spacing & Layout

- **Tokens**: xs: 0.25rem, sm: 0.5rem, md: 1rem, lg: 1.5rem, xl: 2rem, 2xl: 3rem
- **Layout**:
    - **Margin Desktop**: 2rem (m-8)
    - **Margin Mobile**: 1rem (m-4)
    - **Gutter**: 1.5rem (gap-6)
    - **Container Max**: 1280px

## 3. Component Standards (Academic Logic)

### 3.1 Buttons

- **Primary**: `bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md px-4 py-2 active:scale-95 transition-all`
- **Secondary**: `bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium rounded-md px-4 py-2 active:scale-95 transition-all`
- **Ghost**: `hover:bg-slate-100 text-slate-600 rounded-md px-3 py-2 transition-all`

### 3.2 Inputs & Forms

- **Field**: `w-full px-3 py-2 bg-white border border-slate-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`
- **Label**: `block text-sm font-medium text-slate-700 mb-1`
- **Error**: `text-sm text-red-600 mt-1`

### 3.3 Simulator & Cards

- **Simulator Container**: `bg-white border border-slate-200 rounded-lg shadow-sm p-4 overflow-hidden`
- **Simulator Header**: `flex justify-between items-center mb-4 border-b border-slate-100 pb-3`
- **Simulation Engine**: `min-h-[200px] flex flex-col gap-4 (Mapping input -> output, No eval())`

## 4. Coding Protocols & AI Guardrails

- **Naming Convention**: `COURSE_UX_LX_Description.jsx` (PascalCase สำหรับชื่อไฟล์)
- **State Management**: เน้น Local State (`useState`, `useEffect`) สำหรับ Simulator logic ห้ามใช้ Global State หากไม่จำเป็น
- **Accessibility**: Clickable elements ต้องมี Min-height 44px และรองรับการใช้ Tab key
- **Thai Optimization**: ตรวจสอบสระลอยและสระทับกันเสมอโดยใช้ระบบ Spacing และ Line-height ที่กำหนด
- **Interaction**: ทุกการตอบสนองต้องใช้ `active:scale-95 transition-all` และแสดงผล Success/Error แบบ Real-time บน borders/backgrounds

## 5. AI Agent Execution Rules

1. **Read First**: ก่อนเริ่มงาน AI ต้องอ่านโค้ดใน `src/components/interactive/` อย่างน้อย 1 ไฟล์เพื่อศึกษา Pattern การเขียน Logic Simulation
2. **Refactoring**: ห้ามเปลี่ยนโครงสร้างของ `App.jsx` หรือ `LessonViewer.jsx` เว้นแต่จะมีคำสั่งเฉพาะ
3. **Consistency**: ทุก Simulator ใหม่ต้องมีปุ่ม Reset (`lucide/RotateCcw`) และการแจ้งเตือนความสำเร็จเป็นภาษาไทยเสมอ
4. **Data Integration**: เมื่อเพิ่ม Interactive ใหม่ ต้องไปอัปเดต Mapping ใน `src/data/` ให้ถูกต้องตาม Schema ของรายวิชานั้นๆ
