# LMS Platform — คู่มือสมบูรณ์สำหรับ AI (Skill File)

> ⚠️ **ไฟล์นี้คือ "สมอง" ของโปรเจกต์** — AI ต้องอ่านไฟล์นี้ทั้งหมดก่อนทำงานใดๆ ในโปรเจกต์นี้

---

## 1. ภาพรวมโปรเจกต์ (Project Overview)

**ชื่อโปรเจกต์**: CODE ACADEMY — LMS Platform  
**จุดประสงค์**: แพลตฟอร์มการเรียนรู้ (Learning Management System) ที่รองรับหลายวิชา เน้นความสวยงาม ใช้งานง่าย และมีสื่อ Interactive สูง  
**ตำแหน่งโปรเจกต์**: `d:/เรียนรู้/LMS-React`  
**วิธีรัน**: เปิด Terminal → `cd d:\เรียนรู้\LMS-React` → `npm run dev`

---

## 2. เทคโนโลยีหลัก (Tech Stack)

| เทคโนโลยี | เวอร์ชัน | หมายเหตุ |
|---|---|---|
| React | 19.x | Framework หลัก |
| Vite | 8.x | Build tool + Dev server |
| Tailwind CSS | 4.x | ใช้ผ่าน `@tailwindcss/vite` plugin (ไม่ใช้ PostCSS แบบเดิม) |
| React Router DOM | 7.x | จัดการ Routing แบบ SPA |
| Lucide React | 1.x | ไลบรารี Icon |

### การตั้งค่าสำคัญ
- **`vite.config.js`**: ใช้ `@tailwindcss/vite` เป็น Vite plugin (ไม่ใช้ `tailwind.config.js` หรือ `postcss.config.js`)
- **`index.css`**: เริ่มต้นด้วย `@import "tailwindcss";` (รูปแบบ Tailwind v4)
- **`package.json`**: มี `"type": "module"` ดังนั้นไฟล์ `.js` ทั้งหมดเป็น ES Module

---

## 3. โครงสร้างไฟล์ (File Structure)

```
LMS-React/
├── index.html               # HTML entry point
├── vite.config.js            # Vite + Tailwind v4 config
├── package.json              # Dependencies
├── src/
│   ├── main.jsx              # React entry point (render <App />)
│   ├── App.jsx               # ⭐ ไฟล์หลัก: Routing + HomeView + CourseView
│   ├── data.js               # ⭐ ข้อมูลวิชาเรียนทั้งหมด (ไฟล์ที่แก้บ่อยที่สุด)
│   ├── index.css             # Global CSS + Tailwind + lesson-content styles
│   └── components/
│       ├── LessonViewer.jsx  # ⭐ แสดงเนื้อหาบทเรียน + แทรก Interactive Component
│       ├── Quiz.jsx          # แบบทดสอบท้ายบท
│       ├── SDLC.jsx          # สื่อ Interactive: วงจร SDLC (หน่วย 2)
│       ├── AlgorithmFlowchart.jsx  # สื่อ: ผังงาน + Pseudocode (หน่วย 2)
│       ├── LanguageLevels.jsx      # สื่อ: ระดับภาษาคอมพิวเตอร์ (หน่วย 1)
│       ├── PythonStructure.jsx     # สื่อ: ชนิดข้อมูล Python (หน่วย 3)
│       ├── ControlFlow.jsx         # สื่อ: Operators, If-Else, Loops (หน่วย 4)
│       ├── MemoryVisualizer.jsx    # สื่อ: Mutable vs Immutable (หน่วย 5)
│       ├── FunctionBuilder.jsx     # สื่อ: ทดลองสร้างฟังก์ชัน (หน่วย 6)
│       ├── ErrorHandling.jsx       # สื่อ: Try-Except simulator (หน่วย 7)
│       └── MiniPOS.jsx             # สื่อ: ระบบแคชเชียร์จำลอง (หน่วย 8)
```

---

## 4. สถาปัตยกรรมหลัก (Architecture)

### 4.1 ระบบ Routing
```
/                                    → HomeView (แสดง Card ของทุกวิชา)
/course/:courseId                     → CourseView (Sidebar + เนื้อหาบทแรก)
/course/:courseId/lesson/:lessonId    → CourseView (Sidebar + เนื้อหาบทที่เลือก)
```
- `App.jsx` จัดการ Routing ทั้งหมด
- `HomeView` อ่านข้อมูลจาก `data.js` แล้วแสดง Card ของแต่ละวิชา
- `CourseView` มี Sidebar ด้านซ้ายแสดงรายการบทเรียน + เนื้อหาหลักด้านขวา

### 4.2 โครงสร้างข้อมูล (`data.js`)
```javascript
const courses = [
    {
        id: "รหัสวิชา",          // ใช้เป็น URL path
        title: "ชื่อวิชา",
        description: "คำอธิบาย",
        icon: "🐍",              // Emoji แสดงในหน้า Home
        chapters: [
            {
                id: 1,
                title: "หน่วยที่ 1 ...",
                lessons: [
                    {
                        id: "1.1",
                        title: "ชื่อบทเรียน",
                        content: `<h2>...</h2><p>...</p>
                        [COMPONENT_MARKER]
                        <p>...</p>`
                    }
                ],
                quiz: [
                    {
                        question: "คำถาม?",
                        options: ["ตัวเลือก 1", "ตัวเลือก 2", "ตัวเลือก 3", "ตัวเลือก 4"],
                        answer: 0  // index ของคำตอบที่ถูก (0-based)
                    }
                ]
            }
        ]
    }
];
export default courses;
```

### 4.3 ระบบ Component Marker (หัวใจของสื่อ Interactive)

เนื้อหาใน `data.js` เป็น HTML String ธรรมดา แต่สามารถฝัง **Marker** เพื่อให้ `LessonViewer.jsx` แทนที่ด้วย React Component จริงได้:

| Marker ใน data.js | Component ที่แสดง | คำอธิบาย |
|---|---|---|
| `[SDLC_COMPONENT]` | `SDLC.jsx` | วงจรการพัฒนาซอฟต์แวร์ |
| `[ALGORITHM_COMPONENT]` | `AlgorithmFlowchart.jsx` | ผังงาน + Pseudocode |
| `[LANGUAGE_LEVELS_COMPONENT]` | `LanguageLevels.jsx` | ระดับภาษาคอมพิวเตอร์ |
| `[PYTHON_STRUCTURE_COMPONENT]` | `PythonStructure.jsx` | ชนิดข้อมูล Python |
| `[CONTROL_FLOW_COMPONENT]` | `ControlFlow.jsx` | Operators + If-Else + Loops |
| `[MEMORY_COMPONENT]` | `MemoryVisualizer.jsx` | หน่วยความจำ Mutable/Immutable |
| `[FUNCTION_COMPONENT]` | `FunctionBuilder.jsx` | ฟังก์ชัน Python |
| `[ERROR_HANDLING_COMPONENT]` | `ErrorHandling.jsx` | Try-Except |
| `[MINI_POS_COMPONENT]` | `MiniPOS.jsx` | ระบบ POS จำลอง |

**วิธีทำงาน**: `LessonViewer.jsx` ใช้ Regex แยก content ออกเป็นส่วนๆ ตาม Marker แล้ว:
- ส่วนที่เป็น Marker → render เป็น React Component
- ส่วนที่เป็น HTML ปกติ → render ด้วย `dangerouslySetInnerHTML`

**การเพิ่ม Component ใหม่** ต้องทำ 3 จุด:
1. สร้างไฟล์ `.jsx` ใน `src/components/`
2. เพิ่ม import + entry ใน `COMPONENT_MAP` ของ `LessonViewer.jsx`
3. เพิ่ม Marker ชื่อใหม่ใน Regex pattern ของ `LessonViewer.jsx`

---

## 5. กฎเกณฑ์การพัฒนา (Development Rules)

### 5.1 กฎเหล็ก (ห้ามฝ่าฝืน)
1. **ห้ามใช้ Vanilla JS** (เช่น `document.getElementById`) — ใช้ React State/Ref เท่านั้น
2. **ตัวอย่างโค้ดในบทเรียนต้องเป็น Python** — ห้ามใช้ C, Java, หรือภาษาอื่น
3. **ห้ามซ้อนกรอบ (Card ซ้อน Card)** — Component ที่แทรกในเนื้อหาต้องกลมกลืนเป็นเนื้อเดียวกัน (Seamless) ห้ามมี background, shadow, หรือ border ของตัวเอง ถ้ามันจะอยู่ภายในกรอบของ `LessonViewer` อยู่แล้ว
4. **ทุกบทเรียนย่อย (Lesson) ต้องมีสื่อ Interactive อย่างน้อย 1 ตัว** — ย้ำว่า "ทุกเรื่องย่อย" (51 lessons ในแผนใหม่ ก็ต้องมี Interactive ครบทุกจุด)

### 5.2 แนวทางการออกแบบ UI/UX (Design Guidelines)
- **Rounded corners**: ใช้ `rounded-2xl` ถึง `rounded-3xl` เป็นค่าเริ่มต้น
- **Gradients**: ใช้ `bg-gradient-to-r from-indigo-600 to-purple-600` เป็นธีมหลัก
- **Shadows**: ใช้ `shadow-lg` กับ `shadow-indigo-200` สำหรับ Card หลัก
- **Hover Effects**: ทุกปุ่มต้องมี `hover:-translate-y-1` หรือ `hover:scale-105`
- **Color Palette**: Indigo (หลัก), Purple (รอง), Slate (พื้นหลังโค้ด)
- **Font**: ใช้ `Noto Sans Thai` สำหรับภาษาไทย, `Montserrat` สำหรับหัวข้อภาษาอังกฤษ

### 5.3 Responsive Design
- Sidebar ซ่อนได้ในจอมือถือ (hamburger menu)
- ใช้ `md:` breakpoint เป็นหลักสำหรับ layout 2 column
- Grid ในหน้า Home ใช้ `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`

---

## 6. วิธีเพิ่มวิชาเรียนใหม่ (How to Add a New Course)

### ขั้นตอนที่ 1: วิเคราะห์ PDF แผนการสอน
- อ่าน PDF แผนการสอนที่ผู้ใช้ให้มา
- ดึงออกมาเฉพาะ: รหัสวิชา, ชื่อวิชา, คำอธิบาย, และ **รายชื่อหน่วย/บทเรียนทั้งหมด**
- ตัดส่วนที่เป็นแผนการสอน ข้อมูลอาจารย์ ตารางเวลา ออก เอาแต่เนื้อหาจริงๆ

### ขั้นตอนที่ 2: เขียนเนื้อหาใน `data.js`
- เพิ่ม Object ใหม่เข้าไปใน Array `courses` ของ `src/data.js`
- ใช้โครงสร้างตาม Section 4.2 ข้างบน
- เนื้อหาแต่ละบทต้อง:
  - มี `<h2>` สำหรับหัวข้อหลัก
  - มี `<p>` อธิบายอย่างละเอียด
  - มี `<h3>` สำหรับหัวข้อย่อย
  - มี `<ul>` หรือ `<ol>` สำหรับรายการ
  - มี `<div class="code-block">` สำหรับตัวอย่างโค้ด Python
  - มี `<div class="note">` สำหรับข้อสังเกต/เคล็ดลับ
  - มี `[MARKER]` อย่างน้อย 1 จุดเพื่อแทรกสื่อ Interactive

### ขั้นตอนที่ 3: สร้าง Interactive Component
- สำหรับแต่ละหน่วย/บท สร้างไฟล์ `.jsx` ใหม่ใน `src/components/`
- Component ต้อง:
  - `export default` เป็นฟังก์ชัน
  - ใช้ className `"w-full my-12"` สำหรับ wrapper ด้านนอกสุด (ไม่มี background, shadow, border)
  - มีลูกเล่น Interactive เช่น Tab, Slider, Step-by-step, Animation, Quiz ฝังในตัว
  - ใช้ Tailwind CSS สำหรับ styling
  - ใช้ Lucide React สำหรับ icons

### ขั้นตอนที่ 4: ลงทะเบียน Component ใน LessonViewer
- เปิด `src/components/LessonViewer.jsx`
- เพิ่ม `import` ที่ด้านบน
- เพิ่ม entry ใน `COMPONENT_MAP`
- เพิ่มชื่อ Marker ใน Regex pattern ที่บรรทัด `markerPattern`

### ขั้นตอนที่ 5: ทดสอบ
- รัน `npm run dev`
- เปิดเบราว์เซอร์ไปที่ URL ที่แสดง
- ตรวจสอบว่าทุกบทแสดงผลถูกต้อง ไม่มี Error

---

## 7. CSS Classes สำหรับเนื้อหาบทเรียน (Content Styling)

เนื้อหา HTML ใน `data.js` จะถูก render ภายใต้ `.lesson-content` ซึ่งมี CSS เฉพาะใน `index.css`:

| Element/Class | ลักษณะ |
|---|---|
| `<h2>` | หัวข้อหลัก มี border-left สี indigo |
| `<h3>` | หัวข้อย่อย สี indigo-800 |
| `<p>` | ย่อหน้า ขนาด 1.125rem |
| `<ul>`, `<ol>` | รายการแบบ bullet/number |
| `.code-block` หรือ `<pre>` | กล่องโค้ดพื้นหลังดำ (slate-900) |
| `.note` | กล่องเคล็ดลับ พื้นหลัง blue-50 + border-left blue |
| `<code>` | inline code (พื้น slate-100 สี indigo-600) |

---

## 8. วิชาที่มีอยู่แล้ว (Existing Courses)

### วิชา: 21910-1003 การเขียนโปรแกรมคอมพิวเตอร์เบื้องต้น (Python)
> **สถานะปัจจุบัน**: กำลังปรับปรุงหลักสูตรใหม่ แบ่งเป็น 8 เฟส 8 หน่วย รวมทั้งหมด 51 บทเรียนย่อย (Lessons) โดยมีข้อบังคับว่า **ทุกบทเรียนย่อยต้องมีสื่อ Interactive Component ของตัวเอง**

| หน่วย | ชื่อหน่วย | จำนวน Lessons | ตัวอย่าง Interactive Components ที่มี/กำลังสร้าง |
|---|---|:---:|---|
| 1 | หลักการเขียนโปรแกรมเบื้องต้น | 7 | `ProgramMeaning.jsx`, `LanguageLevels.jsx`, `TranslatorCompare.jsx`, `PythonTimeline.jsx`, `SetupGuide.jsx`, `PythonicWay.jsx`, `IndentationDemo.jsx` |
| 2 | ขั้นตอนการเขียนโปรแกรม | 11 | `SDLC.jsx`, `AlgorithmFlowchart.jsx` และอื่นๆ ที่ต้องสร้างเพิ่มให้ครบ 11 ตัว |
| 3 | โครงสร้างพื้นฐานของภาษา Python | 6 | `PythonStructure.jsx` และอื่นๆ ที่ต้องสร้างเพิ่ม |
| 4 | การใช้กระบวนการเขียนโปรแกรม | 15 | `ControlFlow.jsx` และอื่นๆ ที่ต้องสร้างเพิ่ม |
| 5 | การจัดการข้อมูลแบบชุด | 3 | `MemoryVisualizer.jsx` และอื่นๆ ที่ต้องสร้างเพิ่ม |
| 6 | ฟังก์ชัน (Function) | 3 | `FunctionBuilder.jsx` และอื่นๆ ที่ต้องสร้างเพิ่ม |
| 7 | การออกแบบโปรแกรมฯ ธุรกิจ | 3 | `ErrorHandling.jsx` และอื่นๆ ที่ต้องสร้างเพิ่ม |
| 8 | การเขียนโปรแกรมฯ ธุรกิจ | 3 | `MiniPOS.jsx` และอื่นๆ ที่ต้องสร้างเพิ่ม |

---

## 9. ข้อควรระวัง (Gotchas & Pitfalls)

1. **Tailwind v4 ไม่ใช้ `tailwind.config.js`** — ถ้าเจอ Error เรื่อง PostCSS ให้ตรวจว่าใน `vite.config.js` ใช้ `@tailwindcss/vite` plugin
2. **`package.json` มี `"type": "module"`** — ไฟล์ `.js` ทั้งหมดเป็น ESM ถ้าต้องเขียน CommonJS ให้ใช้นามสกุล `.cjs`
3. **Template literals ใน `data.js`** — เนื้อหา HTML ใช้ backtick `` ` `` ดังนั้นถ้ามี backtick ในเนื้อหาต้อง escape ด้วย `\``
4. **ห้ามใช้ `>>>` ตรงๆ ใน JSX** — ต้อง wrap ด้วย `{">>>"}` เพราะ JSX จะเข้าใจว่าเป็น `>` operator
5. **Dynamic Tailwind classes** — Tailwind v4 ไม่ support class ที่สร้างแบบ dynamic (เช่น `` `bg-${color}-500` ``) ถ้าจำเป็นให้ hardcode ทุกค่าที่เป็นไปได้

---

## 10. คำสั่งด่วน (Quick Commands)

```bash
# ติดตั้ง dependencies (ครั้งแรก หรือเปลี่ยนเครื่อง)
cd d:\เรียนรู้\LMS-React
npm install

# รัน development server
npm run dev

# Build สำหรับ production
npm run build
```
