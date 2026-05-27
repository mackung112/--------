# 🎯 แผนงานและสถานะปัจจุบัน (Task Management)

**เป้าหมาย:** ไฟล์นี้คือ "สมุดจดงาน" เพื่อให้ AI อัปเดตเช็คลิสต์ `[ ]` เป็น `[x]` ตลอดการทำงาน ห้าม AI ไปสร้างไฟล์จดงานที่อื่น และ **ต้องสรุปงานลงข้อ 3 ก่อนจบเซสชันทุกครั้ง**

---

## 📌 1. เป้าหมายระยะสั้น (Current Objective)
- จัดระเบียบและปรับโครงสร้างไฟล์ฐานข้อมูลหลัก ย้ายวิชา Python ออกไปเก็บแยกเป็นสัดส่วนในโฟลเดอร์ data/

## 🔄 2. แผนการทำงาน (Execution Steps)
- `[x]` Phase 1: สร้าง `StandardHeader.jsx` ให้เป็น Reusable Component กลาง
- `[x]` Phase 2: แก้ปัญหาพื้นหลัง Simulator ขัดกับ Header โดยใช้โหมด `transparent={true}` ผสานเข้ากับ `bg-[#f1f5f9]`
- `[x]` Phase 3: คืนค่าระบบสุ่มสี Gradient ให้ชื่อภาษาอังกฤษ (Subtitle) และเพิ่มขนาดอักษรตามคำขอ
- `[x]` Phase 4: แก้ไขบั๊กตัวอักษรโดนตัด (Clipping Mask) สำหรับ `bg-clip-text` โดยเพิ่ม `pb-2 leading-normal`
- `[x]` Phase 5: เพิ่ม `LessonViewer` และ `StandardHeader` ลงในระบบค้นหาและพรีวิวของ Component Storybook (`Storybook.jsx`)
- `[x]` Phase 6: จัดโครงสร้างข้อมูลใหม่ ย้ายข้อมูลบทเรียน Python ไปไว้ที่ `src/data/pyCourse.js` และตั้งค่า `src/data.js` เป็น Central Hub

## 📝 3. โน้ตส่งมอบงาน (AI Handoff Notes)
- **สถานะล่าสุด**: 
  - ทำการปรับปรุงโครงสร้างโฟลเดอร์ข้อมูล (Refactoring Courses Data) โดยย้ายข้อมูลบทเรียน Python ที่เคยยาวเหยียดใน `src/data.js` ไปสร้างเป็นไฟล์เฉพาะกิจของตนเองที่ [pyCourse.js](file:///d:/Teach/LMS-React/src/data/pyCourse.js) เพื่อให้สอดคล้องกับวิชา OOP (`oopCourse.js`) และวิชา SQL (`sqlCourse.js`)
  - ปรับปรุงให้ [data.js](file:///d:/Teach/LMS-React/src/data.js) ทำหน้าที่เป็น **Central Hub** (ศูนย์รวมหลักสูตร) ที่นำเข้าทั้ง 3 วิชาเข้าด้วยกันแล้วส่งออกในรูปแบบตัวแปร `courses` ซึ่งช่วยให้สถาปัตยกรรมของโปรเจกต์คลีน สวยงาม สะดวกต่อการพัฒนาต่อ และรักษาสภาพแวดล้อมระบบเดิมไว้ได้โดยไม่ต้องแก้ไขโค้ดการ import ในหน้าอื่น ๆ เลย!
  - อัปเดตความจำของโปรเจกต์และอัปเดตเช็คลิสต์ใน `task.md` เรียบร้อยครับ!
