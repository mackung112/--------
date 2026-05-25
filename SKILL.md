# 🤖 AI Skill & Master Prompt (ระบบปฏิบัติการหลักของ AI)

> ⚠️ **คำสั่งวิกฤต (Critical Command)**: ทันทีที่คุณถูกเรียกใช้งาน คุณ **ต้อง** อ่านไฟล์เหล่านี้ตามลำดับก่อนเริ่มงานเสมอ:
>
> 1. [DESIGN.md](file:///d:/STD/---------1/DESIGN.md) (เพื่อยึดถือมาตรฐาน UI/UX และระบบการออกแบบเป็น Source of Truth)
> 2. [CONTEXT.md](file:///d:/STD/---------1/CONTEXT.md) (เพื่อเข้าใจบริบท, โครงสร้างโค้ด และประวัติโปรเจกต์)
> 3. `task.md` (ที่ [d:\STD\---------1\task.md](file:///d:/STD/---------1/task.md) เท่านั้น เพื่อดูงานที่ค้างอยู่และเป้าหมายปัจจุบัน)
>
> **กฎเหล็ก**: ห้ามคิดเองในส่วนของ Design หากไม่มีใน DESIGN.md ให้ยึดตามมาตรฐานที่กำหนดไว้เท่านั้น!

## 🔄 ระบบ AI Handoff & Task Management (การส่งมอบงานและการจัดการงาน)

เพื่อให้โปรเจกต์นี้เดินหน้าได้โดยที่ผู้ใช้ไม่ต้องคอยสั่งการใหม่ และ AI ตัวต่อไปทำงานต่อได้ทันที:

1. **Single Source of Task**: ห้ามสร้างไฟล์ Task ใหม่ (เช่น `.md` ใน brain folder) ให้ใช้ [d:\STD\---------1\task.md](file:///d:/STD/---------1/task.md) เป็นที่เดียวในการบันทึกงาน
2. **ทำงานแบบ Self-Directed**: เมื่ออ่านเป้าหมายจาก `task.md` แล้ว ให้เริ่มทำงานทันทีโดยอิงจาก "Phase" ที่ระบุไว้
3. **การวางแผนงาน (Planning)**: หากมีงานใหม่เข้ามา ให้เขียนเพิ่มเข้าไปในแผนงานเดิมใน `task.md` (ห้ามลบแผนเก่าที่ยังไม่เสร็จ) เพื่อให้ AI ตัวอื่นเห็นภาพรวมทั้งหมด
4. **อัปเดตสถานะตลอดเวลา**: ทุกครั้งที่ทำแต่ละ Step ย่อยเสร็จ ต้องอัปเดต `[ ]` เป็น `[x]` ใน `task.md` ทันที
5. **🚨 กฎเหล็ก: บันทึกประวัติและสรุปงาน (MANDATORY)**: ก่อนจบเซสชัน ต้องบันทึกประวัติการเปลี่ยนแปลงใน `CONTEXT.md` และสรุปงานที่ทำเสร็จ/ค้างไว้ใน `task.md` (ส่วนที่ 3. โน้ตส่งมอบงาน) เสมอ

## 🛑 1. กฎข้อห้ามเด็ดขาด (STRICTLY PROHIBITED)

- **ห้ามใช้ Vanilla JS**: ต้องใช้ React State/Ref/Hooks เสมอ
- **ห้าม Component ซ้อนกรอบ (No Card-in-Card)**: สื่อ Interactive ต้องแนบเนียนไปกับบทเรียน (Seamless) ตามมาตรฐานใน [DESIGN.md](file:///d:/STD/---------1/DESIGN.md)
- **ห้ามแตะโครงสร้าง Architecture**: ห้ามแก้ไขระบบ Routing หรือไฟล์ Core เว้นแต่ระบุใน `task.md`
- **ห้ามลืมใส่ Interactive Component**: ทุกบทเรียนย่อย (Lesson) ต้องมีสื่อที่โต้ตอบได้อย่างน้อย 1 ตัว

## ✅ 2. พฤติกรรมที่ต้องทำเสมอ (MANDATORY ACTIONS)

- **ภาษาและเนื้อหา**: โค้ดตัวอย่างในวิชาต้องใช้ **Python** (สำหรับวิชาเขียนโปรแกรม) และ **MySQL** (สำหรับวิชาฐานข้อมูล) โดยคำอธิบายต้องเป็น **ภาษาไทย** เสมอ
- **Tailwind CSS v4 Rules**: ห้ามใช้ class แบบ dynamic ให้ hardcode string เต็มรูปแบบเสมอ
- **Ultimate Gamification Requirement**: สื่อ Interactive **ห้าม** ทำแค่ Flashcard พื้นๆ ต้องเป็น "มินิเกม" หรือ "เครื่องมือจำลอง (Deep Simulators)" ที่มีลูกเล่นแพรวพราว
- **Strict UI/UX Compliance**: ปฏิบัติตาม Design System ใน [DESIGN.md](file:///d:/STD/---------1/DESIGN.md) อย่างเคร่งครัด 100% (Colors, Typography, Spacing, Buttons, Inputs)

## 🛠️ 3. มาตรฐานการเขียนโค้ด (Coding Standards)

- **Component Format**: ต้องเขียนเป็น `export default function ComponentName() { ... }`
- **JSX Gotchas**: หากมี `>>>` ในโค้ด JSX ต้องห่อด้วย `{">>>"}`
- **Component Auto-Registry**: เมื่อสร้าง Component ใหม่ ให้บันทึกใน `src/components/interactive/` ระบบจะโหลดให้อัตโนมัติ สามารถเรียกใช้ใน `data.js` ด้วย `[ComponentName]`

## 🎮 4. รูปแบบการออกแบบ Component หลัก (Immersive Full-Page Pattern)

ทุก Interactive Component ใช้ตัวอย่าง Unit 4 เป็นต้นไป ให้ใช้รูปแบบ **"Immersive Full-Page Pattern"** (อ้างอิงจาก RAW DATA):

1. **Ambient Full-Page**: ใช้ `min-h-screen` และพื้นหลังฟุ้งๆ (blur) ไม่จำกัดความสูง
2. **Gradient Header**: ส่วนหัวแสดงเนื้อหาวิชาพร้อมสีตัวอักษรแบบ Gradient ที่เข้ากับ Theme ของบทเรียน
3. **Interactive Simulator**: กล่องจำลองที่ครอบด้วย `backdrop-blur` และขอบมนขนาดใหญ่ `rounded-[2.5rem]` ไม่บังคับ split ซ้าย-ขวาตายตัว
4. **Teacher Task (Instructor Task)**: มีกล่องแสดงใบงานผู้สอนพร้อมปุ่ม Copy เสมอที่ด้านล่างสุดของเนื้อหา
5. **Gamification Elements**: แทรกอย่างน้อย 1 อย่าง (Mini Quiz, Simulator โต้ตอบ, หรือเกมเล็กๆ)

## 🕹️ 5. แนวทาง Game-Based Learning

- **SVG Flowcharts**: ใช้ SVG สำหรับผังงาน แทน Unicode/CSS ให้ดูเหมือน draw.io
- **Animation**: ทุกการตอบสนองต้องใช้ `active:scale-95 transition-all` ตาม [DESIGN.md](file:///d:/STD/---------1/DESIGN.md)
- **Interactive Loops**: จำลองการทำงานทีละขั้น มีปุ่ม Play/Pause/Reset (Reset ใช้ `lucide/RotateCcw`)
