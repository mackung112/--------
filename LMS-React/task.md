# 🎯 Active Task (หน่วยความจำระยะสั้น & สถานะงาน)

> ⚠️ **สำหรับ AI**: ไฟล์นี้คือ "จุดศูนย์กลางการทำงาน (State Management)" ของคุณ คุณต้องยึดเป้าหมายในนี้เป็นหลัก **อัปเดตเช็คลิสต์ `[ ]` เป็น `[x]` ตลอดเวลาที่ทำงาน** และหากคุณกำลังจะหยุดทำงาน (หมด Token/เปลี่ยนเซสชัน) ให้สรุปงานส่งมอบที่ "ข้อ 3" เสมอ!

## 📌 1. เป้าหมายระยะสั้น (Current Objective)
- [x] ปรับปรุงระบบเพิ่มเนื้อหา (Auto-Registry) ให้ง่ายขึ้น ไม่ต้องยุ่งกับ `LessonViewer.jsx` อีกต่อไป
- [x] Migration Unit 2 DDL (SQL) เสร็จสมบูรณ์ (2.5-2.12)
- [x] ลบวิชาที่ยังไม่มีบทเรียนออกจาก `data.js` (10 วิชา → เหลือ 3 วิชา)
- [ ] เพิ่ม Component สื่อ Interactive สำหรับ Unit ถัดไป หรือตามที่ผู้ใช้ร้องขอ

## 🔄 2. แผนการทำงาน (Execution Steps)
*(⚠️ AI: ให้คุณวิเคราะห์งานที่ได้รับ และซอยย่อยลงมาเป็นเฟส แล้วจัดการไล่ทำไปเรื่อยๆ อย่างต่อเนื่อง ห้ามหยุดทำกลางคัน)*

- [x] **Phase 1: ปรับโครงสร้างโฟลเดอร์**
  - [x] ย้าย Component สื่อ Interactive ทั้งหมดไปที่ `src/components/interactive/`
- [x] **Phase 2: ปรับปรุง Component Engine**
  - [x] แก้ไข `LessonViewer.jsx` ให้โหลดโฟลเดอร์ `interactive/` อัตโนมัติ (Auto-Registry) ด้วย `import.meta.glob`
- [x] **Phase 3: ปรับปรุง Data**
  - [x] ลบ `_COMPONENT` ออกจากชื่อ Marker ใน `data.js` และ `oopCourse.js` ทั้งหมด
  - [x] อัปเดต Marker ให้เป็นชื่อไฟล์ตรงๆ เช่น `[ClassDefinitionDemo]`
- [x] **Phase 4: SQL DDL Migration (2.5-2.12)**
  - [x] SQLCreateTableDemo, SQLDefaultDemo, SQLAddColumnDemo, SQLModifyColumnDemo
  - [x] SQLRenameColumnDemo, SQLDropColumnDemo, SQLCascadeDemo, SQLDropTableDemo
  - [x] สร้าง `utils/SQLSyntaxEngine.js` (shared utility)
  - [x] เพิ่ม CSS Animations 6 ชุดใน `index.css`
  - [x] แก้ icon imports (PaperPlane→Send, Dumpster→Flame)
- [x] **Phase 5: Cleanup**
  - [x] ลบวิชาที่ chapters ว่างเปล่า 10 วิชาออกจาก `data.js`
  - [x] อัปเดต `CONTEXT.md`, `task.md`, `skill-web-lms.md`
- [x] **Phase 6: ทดสอบ**
  - [x] `npm run build` ผ่าน ✅
- [x] **Phase 7: Component Management**
  - [x] สร้าง `src/components/Storybook.jsx` สำหรับดูคลังสื่อทั้งหมด
  - [x] เพิ่ม Route `/library` และปุ่มเข้าชมที่หน้าแรก

## 📝 3. โน้ตส่งมอบงาน (AI Handoff Notes)
*(⚠️ AI: หากเซสชันถูกตัด, โควต้า Token ใกล้หมด, หรืองานติดขัดยังไม่เสร็จ ให้ทิ้งข้อความอธิบายปัญหาและแนวทางไว้ให้ AI ตัวต่อไปมาอ่านที่นี่)*

**อัปเดตระบบ [2026-05-15]**:
- Build ผ่านแล้ว ✅ ไม่มี error
- วิชาที่เปิดสอนตอนนี้มี 3 วิชา: Python (8 หน่วย), OOP (7 หน่วย), SQL (6 หน่วย)
- ระบบ Auto-Registry สมบูรณ์แล้ว! 
- **ใหม่**: เพิ่ม **Component Storybook** สามารถเข้าดูคลังสื่อ Interactive ทั้งหมดได้ที่ปุ่ม "คลังคอมโพเนนต์" ในหน้าแรก หรือ URL `/library` เพื่อใช้สำหรับตรวจสอบหน้าตาและ Marker ก่อนนำไปใช้งานในเนื้อหา
