# 🤖 AI Skill & Master Prompt (ระบบปฏิบัติการหลักของ AI)

> ⚠️ **คำสั่งวิกฤต (Critical Command)**: ทันทีที่คุณถูกเรียกใช้งาน คุณ **ต้อง** อ่านไฟล์เหล่านี้ตามลำดับก่อนเริ่มงานเสมอ:
> 1. [DESIGN.md](file:///d:/STD/---------1/DESIGN.md) (เพื่อยึดถือมาตรฐาน UI/UX และระบบการออกแบบเป็น Source of Truth)
> 2. [CONTEXT.md](file:///d:/STD/---------1/CONTEXT.md) (เพื่อเข้าใจบริบท, โครงสร้างโค้ด และประวัติโปรเจกต์)
> 3. `task.md` (เพื่อดูงานที่ค้างอยู่และเป้าหมายปัจจุบัน)
>
> **กฎเหล็ก**: ห้ามคิดเองในส่วนของ Design หากไม่มีใน DESIGN.md ให้ยึดตามมาตรฐานที่กำหนดไว้เท่านั้น!

## 🔄 ระบบ AI Handoff (การส่งมอบงานไร้รอยต่อ)
เพื่อให้โปรเจกต์นี้เดินหน้าได้โดยที่ผู้ใช้ไม่ต้องคอยสั่งการใหม่ คุณต้องปฏิบัติตามกฎต่อไปนี้อย่างเคร่งครัด:
1. **ทำงานแบบ Self-Directed (เป็นผู้นำ)**: เมื่ออ่านเป้าหมายจาก `task.md` แล้ว ให้เริ่มทำงานทันที
2. **แบ่งงานเป็นเฟสย่อยและทำให้จบ (Phase Execution)**: ซอยงานเป็น Step ใน `task.md` และทำงานต่อเนื่องจนกว่าจะเสร็จสมบูรณ์
3. **อัปเดตสถานะการทำงานตลอดเวลา (State Tracking)**: ทุกครั้งที่ทำแต่ละ Step ย่อยเสร็จ ต้องกลับไปอัปเดต `task.md` (เปลี่ยน `[ ]` เป็น `[x]`) เสมอ
4. **🚨 กฎเหล็ก: ต้องอัปเดต CONTEXT.md และ task.md ทุกครั้ง (MANDATORY)**: บันทึกประวัติใน `CONTEXT.md` และสรุปสถานะใน `task.md` ก่อนจบเซสชันทุกครั้ง

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

## 🎮 4. รูปแบบการออกแบบ Component หลัก (Explorer Pattern)
ทุก Interactive Component ควรใช้รูปแบบ **"Explorer Pattern"**:
1. **Header Section**: Badge แสดงประเภทเนื้อหา + ชื่อหัวข้อ + คำอธิบายที่ละเอียด
2. **Interactive Explorer**: ส่วนหลักที่ผู้เรียนกดเล่นได้ (Top 2-Column Split: ซ้าย=Visual, ขวา=Control/Explanation)
3. **Live Output/Console (VS Code Style)**: แสดงผลลัพธ์แบบ real-time วางเป็นแถบแนวนอนยาวเต็มความกว้างด้านล่างสุด (Full-width bottom panel) สีพื้นหลัง `bg-[#1e1e1e]` พร้อมระบบ Auto-scroll ภายในกล่อง
4. **Step Explanation**: อธิบายขั้นตอนการทำงานที่เปลี่ยนตามสถานะ
5. **Gamification Elements**: แทรกอย่างน้อย 1 อย่าง (Mini Quiz, Matching Game, Spot-the-Error ฯลฯ)

## 🕹️ 5. แนวทาง Game-Based Learning
- **SVG Flowcharts**: ใช้ SVG สำหรับผังงาน แทน Unicode/CSS ให้ดูเหมือน draw.io
- **Animation**: ทุกการตอบสนองต้องใช้ `active:scale-95 transition-all` ตาม [DESIGN.md](file:///d:/STD/---------1/DESIGN.md)
- **Interactive Loops**: จำลองการทำงานทีละขั้น มีปุ่ม Play/Pause/Reset (Reset ใช้ `lucide/RotateCcw`)
