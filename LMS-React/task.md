# 🎯 Active Task (หน่วยความจำระยะสั้น & สถานะงาน)

> ⚠️ **สำหรับ AI**: ไฟล์นี้คือ "จุดศูนย์กลางการทำงาน (State Management)" ของคุณ คุณต้องยึดเป้าหมายในนี้เป็นหลัก **อัปเดตเช็คลิสต์ `[ ]` เป็น `[x]` ตลอดเวลาที่ทำงาน** และหากคุณกำลังจะหยุดทำงาน (หมด Token/เปลี่ยนเซสชัน) ให้สรุปงานส่งมอบที่ "ข้อ 3" เสมอ!

## 📌 1. เป้าหมายระยะสั้น (Current Objective)
- [x] ปรับปรุงระบบเพิ่มเนื้อหา (Auto-Registry) ให้ง่ายขึ้น ไม่ต้องยุ่งกับ `LessonViewer.jsx` อีกต่อไป
- [x] Migration Unit 2 DDL (SQL) เสร็จสมบูรณ์ (2.5-2.12)
- [x] ลบวิชาที่ยังไม่มีบทเรียนออกจาก `data.js` (10 วิชา → เหลือ 3 วิชา)
- [ ] **เป้าหมายใหม่**: อัปเกรด/Refactor สื่อ Interactive ทั้งหมดให้ตรงตามมาตรฐาน `DESIGN.md` และ `SKILL.md` (Explorer Pattern) โดยเริ่มจาก Phase 1: Python Unit 1

## 🔄 2. แผนการทำงาน (Execution Steps)
*(⚠️ AI: ให้คุณวิเคราะห์งานที่ได้รับ และซอยย่อยลงมาเป็นเฟส แล้วจัดการไล่ทำไปเรื่อยๆ อย่างต่อเนื่อง ห้ามหยุดทำกลางคัน)*

- `[ ]` **Phase 1: Python 21910-1003 (Unit 1)**
  - `[x]` `PY21910_U1_L1_ProgramMeaning.jsx`
  - `[x]` `PY21910_U1_L2_LanguageLevels.jsx`
  - `[x]` `PY21910_U1_L3_TranslatorCompare.jsx`
  - `[x]` `PY21910_U1_L4_PythonTimeline.jsx`
  - `[x]` `PY21910_U1_L5_SetupGuide.jsx`
  - `[x]` `PY21910_U1_L6_PythonicWay.jsx`
  - `[x]` `PY21910_U1_L7_IndentationDemo.jsx`

## 📝 3. โน้ตส่งมอบงาน (AI Handoff Notes)
*(⚠️ AI: หากเซสชันถูกตัด, โควต้า Token ใกล้หมด, หรืองานติดขัดยังไม่เสร็จ ให้ทิ้งข้อความอธิบายปัญหาและแนวทางไว้ให้ AI ตัวต่อไปมาอ่านที่นี่)*

**อัปเดตระบบ [2026-05-16]**:
- ดำเนินการ **Phase 1: Python Unit 1 (1.1 - 1.7)** เสร็จสมบูรณ์ ทั้ง 7 ไฟล์ถูก Refactor เป็น Explorer Pattern 
- ทดสอบ Build ผ่านเรียบร้อย ไร้ Syntax Error
- เป้าหมายถัดไป: นำเสนอให้ User ตรวจสอบผ่านหน้า Storybook หรือลุยงาน Phase ถัดไป (Python Unit 3) ต่อตามแผน `implementation_plan.md`
