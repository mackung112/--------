# LMS-React Project — Context File (บริบทโปรเจกต์ฉบับสมบูรณ์)

> 📌 **วัตถุประสงค์ของไฟล์นี้**: ให้ AI อ่านแล้วเข้าใจโปรเจกต์ทั้งหมดได้ทันที โดยไม่ต้องถามผู้ใช้คำถามใดๆ เพิ่มเติม
> สำหรับกฎเกณฑ์และวิธีทำงาน ให้อ่านไฟล์ `skill-web-lms.md` ในโฟลเดอร์เดียวกัน

---

## ภาพรวมโปรเจกต์

**CODE ACADEMY** คือเว็บไซต์ LMS (Learning Management System) ที่สร้างด้วย **React + Vite + Tailwind CSS v4** ออกแบบมาเพื่อ:

1. แสดงรายวิชาที่ผู้ใช้สามารถเข้าไปเรียนรู้ได้
2. แต่ละวิชามีหลายหน่วยการเรียนรู้ แต่ละหน่วยมีหลายบทเรียน
3. **ทุกบท** มีสื่อ Interactive (React Component) ฝังอยู่ในเนื้อหา ไม่ใช่แค่ข้อความ
4. ทุกหน่วยมีแบบทดสอบ (Quiz) ท้ายบท

---

## ประวัติความเป็นมา (Timeline)

1. **เริ่มต้น**: ผู้ใช้ให้ PDF แผนการสอนวิชา "การเขียนโปรแกรมคอมพิวเตอร์เบื้องต้น" แล้วให้ AI สร้างเว็บ LMS ขึ้นมา
2. **Vanilla JS → React**: เริ่มสร้างด้วย Vanilla JS แต่ภายหลังผู้ใช้ตัดสินใจรื้อทิ้งทั้งหมดแล้วเปลี่ยนเป็น React เพราะต้องการ Component-based architecture สำหรับสื่อ Interactive
3. **Interactive Media**: ผู้ใช้ต้องการให้ทุกบททุกเรื่องมีสื่อ Interactive เช่น Animation, Simulator, Step-by-step visualizer — ไม่ใช่แค่ข้อความเฉยๆ
4. **Seamless Design**: ผู้ใช้เน้นว่า Component ต้องกลมกลืนกับเนื้อหา ห้ามดูเป็น Card ซ้อน Card

---

## สถานะปัจจุบัน (Current State)

### วิชาที่มี: 1 วิชา
- **21910-1003 การเขียนโปรแกรมคอมพิวเตอร์เบื้องต้น** (8 หน่วย, ภาษา Python)
- ทุกหน่วยมี Interactive Component ครบถ้วนแล้ว

### Interactive Components ที่มี: 9 ตัว

| ไฟล์ | หน่วย | ลูกเล่น |
|---|---|---|
| `SDLC.jsx` | 2 | วงจร 6 ขั้นตอน กดเลือกได้ + เล่น Auto + AI สร้างสถานการณ์จำลอง |
| `AlgorithmFlowchart.jsx` | 2 | 3 แท็บ: สัญลักษณ์ผังงาน, จำลอง Flowchart ทีละขั้น, แปลง Pseudocode→Python ทีละบรรทัด |
| `LanguageLevels.jsx` | 1 | เลือกดู 3 ระดับภาษา + ตารางเปรียบเทียบแบบ Bar Chart |
| `PythonStructure.jsx` | 3 | 2 แท็บ: สำรวจชนิดข้อมูล (Shell จำลอง) + ทดลองรันโค้ดจริง |
| `ControlFlow.jsx` | 4 | 3 แท็บ: เครื่องคิดเลข Operators, สไลเดอร์ If-Else, จำลอง Loop ทีละรอบ |
| `MemoryVisualizer.jsx` | 5 | 3 สถานการณ์: Immutable, Mutable, Copy — เดินทีละขั้นดูหน่วยความจำ |
| `FunctionBuilder.jsx` | 6 | 4 ฟังก์ชันตัวอย่าง ปรับ Parameter กดรันดู Input→Process→Output |
| `ErrorHandling.jsx` | 7 | 3 Error: ValueError, ZeroDivision, IndexError — สลับดูล่ม vs ป้องกัน |
| `MiniPOS.jsx` | 8 | ร้านค้าจำลอง เพิ่มสินค้าลงตะกร้า + แสดง Python Code เทียบเท่า Real-time |

---

## วิธีเพิ่มวิชาใหม่จาก PDF (สำหรับ AI)

เมื่อผู้ใช้โยน PDF แผนการสอนมาให้ ให้ทำตามขั้นตอนนี้:

### 1. อ่าน PDF → ดึงเนื้อหา
- ดึงรหัสวิชา, ชื่อวิชา, คำอธิบายวิชา
- ดึงรายชื่อหน่วยการเรียนรู้ทั้งหมด
- ดึงเนื้อหาแต่ละหน่วย (ถ้ามี)
- ตัดข้อมูลผู้สอน ตารางเวลา การวัดผล ออก — เอาแต่เนื้อหาจริง

### 2. ออกแบบ Interactive Component แต่ละหน่วย
สำหรับแต่ละหน่วย ถามตัวเองว่า "เนื้อหานี้ทำเป็น Interactive แบบไหนได้?"
- มีขั้นตอน/วงจร? → **Step-by-step animator** (แบบ SDLC)
- มีการเปรียบเทียบ? → **Tab + Table** (แบบ LanguageLevels)
- มีโค้ดตัวอย่าง? → **Code runner simulator** (แบบ PythonStructure)
- มีการคำนวณ? → **Calculator/Slider** (แบบ ControlFlow)
- มี Input/Output? → **Function tester** (แบบ FunctionBuilder)
- มีกรณีศึกษาธุรกิจ? → **Working app simulator** (แบบ MiniPOS)

### 3. เขียนโค้ด
- เพิ่มข้อมูลวิชาใน `src/data.js` (เพิ่ม Object ใน Array `courses`)
- สร้างไฟล์ Component ใน `src/components/`
- ลงทะเบียนใน `LessonViewer.jsx` (import + COMPONENT_MAP + regex)

### 4. ทดสอบ
- `npm run dev` → เปิดเบราว์เซอร์ → ตรวจทุกบท

---

## แนวทางเมื่อเปลี่ยนเครื่อง (Machine Transfer)

```bash
# 1. Copy โฟลเดอร์ LMS-React ไปเครื่องใหม่ (ไม่ต้อง copy node_modules)
# 2. เปิด Terminal
cd [ตำแหน่งที่วาง]/LMS-React
npm install
npm run dev
```

ถ้า Tailwind ไม่ทำงาน ให้ตรวจ:
1. `vite.config.js` มี `import tailwindcss from '@tailwindcss/vite'` และใช้ใน plugins
2. `src/index.css` เริ่มต้นด้วย `@import "tailwindcss";`
3. ไม่มีไฟล์ `tailwind.config.js` หรือ `postcss.config.js` (ไม่ต้องมี เพราะใช้ Tailwind v4 + Vite plugin)

---

## Dependencies ที่ต้องมี

```json
{
  "dependencies": {
    "lucide-react": "^1.14.0",
    "react": "^19.x",
    "react-dom": "^19.x",
    "react-router-dom": "^7.x"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.x",
    "@vitejs/plugin-react": "^6.x",
    "tailwindcss": "^4.x",
    "vite": "^8.x"
  }
}
```

---

## ตัวอย่างการเพิ่มวิชาใหม่ (Template)

### data.js — เพิ่มวิชาใหม่
```javascript
// เพิ่มเข้าไปใน Array courses
{
    id: "21900-1003",
    title: "ออกแบบและจัดการฐานข้อมูล",
    description: "ศึกษาเกี่ยวกับหลักการออกแบบฐานข้อมูลเชิงสัมพันธ์ ...",
    icon: "🗄️",
    chapters: [
        {
            id: 1,
            title: "หน่วยที่ 1 ความรู้เบื้องต้นเกี่ยวกับฐานข้อมูล",
            lessons: [
                {
                    id: "1.1",
                    title: "ความหมายและประโยชน์ของฐานข้อมูล",
                    content: `<h2>ฐานข้อมูลคืออะไร?</h2>
                    <p>เนื้อหาอธิบาย...</p>
                    [DATABASE_INTRO_COMPONENT]
                    <div class="note">💡 เคล็ดลับ...</div>`
                }
            ],
            quiz: [{ question: "...", options: ["..."], answer: 0 }]
        }
    ]
}
```

### LessonViewer.jsx — เพิ่ม Component ใหม่
```javascript
// 1. เพิ่ม import
import DatabaseIntro from './DatabaseIntro';

// 2. เพิ่มใน COMPONENT_MAP
const COMPONENT_MAP = {
  // ... ที่มีอยู่แล้ว
  '[DATABASE_INTRO_COMPONENT]': DatabaseIntro,
};

// 3. เพิ่มชื่อใน Regex
const markerPattern = /(\[(?:SDLC|...|DATABASE_INTRO)_COMPONENT\])/;
```

### Component ใหม่ — Template
```jsx
import React, { useState } from 'react';

export default function DatabaseIntro() {
  // state, logic...
  
  return (
    <div className="w-full my-12">
      {/* ไม่มี bg, shadow, border ที่ wrapper ด้านนอก */}
      {/* เนื้อหา interactive ข้างใน */}
    </div>
  );
}
```
