# 🎯 Active Task (หน่วยความจำระยะสั้น & สถานะงาน)

> ⚠️ **สำหรับ AI (CRITICAL RULE)**: ไฟล์นี้คือ "จุดศูนย์กลางการทำงาน (Single Source of Truth)" ของคุณ **คุณต้องยึดเป้าหมายในนี้เป็นหลัก อัปเดตเช็คลิสต์ `[ ]` เป็น `[x]` ตลอดเวลาที่ทำงานลงในไฟล์ `d:\STD\---------1\task.md` นี้เท่านั้น!** (ห้ามเขียนแยกไปที่ไฟล์อื่น เพื่อป้องกันปัญหาสถานะงานหายกรณีเซสชันหลุด/เครดิตหมด) และหากคุณกำลังจะหยุดทำงาน ให้สรุปงานส่งมอบที่ "ข้อ 3" เสมอ!

## 📌 1. เป้าหมายระยะสั้น (Current Objective)
- [x] ปรับปรุงระบบเพิ่มเนื้อหา (Auto-Registry) ให้ง่ายขึ้น ไม่ต้องยุ่งกับ `LessonViewer.jsx` อีกต่อไป
- [x] Migration Unit 2 DDL (SQL) เสร็จสมบูรณ์ (2.5-2.12)
- [x] ลบวิชาที่ยังไม่มีบทเรียนออกจาก `data.js` (10 วิชา → เหลือ 3 วิชา)
- [x] **อัปเดต SKILL.md**: บังคับใช้ Single Source of Task (task.md ในโปรเจกต์) เพื่อความต่อเนื่อง
- [x] **เป้าหมายใหม่**: อัปเกรด/Refactor สื่อ Interactive ทั้งหมดให้ตรงตามมาตรฐาน `DESIGN.md` และ `SKILL.md` (Explorer Pattern)
- [ ] ดำเนินการ **Phase 3: SQL (SQL21901)** ให้เป็นรูปแบบ Explorer Pattern

## 🔄 2. แผนการทำงาน (Execution Steps)
*(⚠️ AI: ให้คุณวิเคราะห์งานที่ได้รับ และซอยย่อยลงมาเป็นเฟส แล้วจัดการไล่ทำไปเรื่อยๆ อย่างต่อเนื่อง ห้ามหยุดทำกลางคัน)*

### Phase 1: Python Basics (PY21910) - ✅ COMPLETED (100%)
*(ซ่อนรายการย่อยเพื่อความกระชับ ภารกิจสำเร็จลุล่วงแล้ว)*

### Phase 2: OOP (OOP21910) - ✅ COMPLETED (100%)
*(ซ่อนรายการย่อยเพื่อความกระชับ ภารกิจสำเร็จลุล่วงแล้ว)*

### Phase 3: SQL (SQL21901) - ⏳ IN PROGRESS
- [x] **Batch 8: SQL Unit 1 (Database Concepts & DDL Basics)**
  - [x] SQL21901_U1_L1_SQLDatabaseBasics.jsx
  - [x] SQL21901_U1_L2_SQLDatabaseTypes.jsx
  - [x] SQL21901_U1_L3_SQLDBMSSelector.jsx
  - [x] SQL21901_U1_L4_SQLWorkbenchIntro.jsx
  - [x] SQL21901_U1_L5_SQLDBDesignDemo.jsx
  - [x] SQL21901_U1_L6_SQLCreateDBDemo.jsx
  - [x] SQL21901_U1_L7_SQLShowDBDemo.jsx
  - [x] SQL21901_U1_L8_SQLAnalyzeBeforeEdit.jsx
  - [x] SQL21901_U1_L9_SQLBackupDemo.jsx
  - [x] SQL21901_U1_L10_SQLAlterDBDemo.jsx
  - [x] SQL21901_U1_L11_SQLDropImpactDemo.jsx
  - [x] SQL21901_U1_L12_SQLRiskManagement.jsx
  - [x] SQL21901_U1_L13_SQLDropDBDemo.jsx
- [x] **Batch 9: SQL Unit 2 (Table Structure & Constraints)**
  - [x] SQL21901_U2_L1_SQLTableStructure.jsx
  - [x] SQL21901_U2_L2_SQLDataTypesDemo.jsx
  - [x] SQL21901_U2_L3_SQLConstraintsDemo.jsx
  - [x] SQL21901_U2_L4_SQLForeignKeyDemo.jsx
  - [x] SQL21901_U2_L5_SQLCreateTableDemo.jsx
  - [x] SQL21901_U2_L6_SQLDefaultValueDemo.jsx
  - [x] SQL21901_U2_L7_SQLAddColumnDemo.jsx
  - [x] SQL21901_U2_L8_SQLModifyColumnDemo.jsx
  - [x] SQL21901_U2_L9_SQLRenameColumnDemo.jsx
  - [x] SQL21901_U2_L10_SQLDropColumnDemo.jsx
  - [x] SQL21901_U2_L11_SQLCascadeDemo.jsx
  - [x] SQL21901_U2_L12_SQLDropTableDemo.jsx
- [x] **Batch 10: SQL Unit 3 (DML - Insert, Update, Delete)**
  - [x] SQL21901_U3_L1_InsertSingleDemo.jsx
  - [x] SQL21901_U3_L2_NullHandlingDemo.jsx
  - [x] SQL21901_U3_L3_InsertMultiDemo.jsx
  - [x] SQL21901_U3_L4_InsertSubqueryDemo.jsx
  - [x] SQL21901_U3_L5_PreUpdateCheckDemo.jsx
  - [x] SQL21901_U3_L6_UpdateSetDemo.jsx
  - `[ ]` SQL21901_U3_L7_UpdateWhereDemo.jsx
  - `[ ]` SQL21901_U3_L8_PreDeleteCheckDemo.jsx
  - `[ ]` SQL21901_U3_L9_DeleteWhereDemo.jsx
  - `[ ]` SQL21901_U3_L10_TransactionDemo.jsx
- `[ ]` **Batch 11: SQL Unit 4 (DQL - Select, Join, Aggregate)**
  - `[ ]` SQL21901_U4_L1_SQLSelectBasicDemo.jsx
  - `[ ]` SQL21901_U4_L2_SQLDistinctDemo.jsx
  - `[ ]` SQL21901_U4_L3_SQLOrderByDemo.jsx
  - `[ ]` SQL21901_U4_L4_SQLComparisonDemo.jsx
  - `[ ]` SQL21901_U4_L5_SQLLogicalDemo.jsx
  - `[ ]` SQL21901_U4_L6_SQLLikeDemo.jsx
  - `[ ]` SQL21901_U4_L7_SQLInnerJoinDemo.jsx
  - `[ ]` SQL21901_U4_L8_SQLOuterJoinDemo.jsx
  - `[ ]` SQL21901_U4_L9_SQLGroupByDemo.jsx
  - `[ ]` SQL21901_U4_L10_SQLHavingDemo.jsx
  - `[ ]` SQL21901_U4_L11_SQLUnionDemo.jsx
  - `[ ]` SQL21901_U4_L12_SQLReportDesignDemo.jsx
- `[ ]` **Batch 12: SQL Unit 5 (DCL - Security & Control)**
  - `[ ]` SQL21901_U5_L1_SQLSecurityImportance.jsx
  - `[ ]` SQL21901_U5_L2_SQLControlProcess.jsx
  - `[ ]` SQL21901_U5_L3_SQLFirewallDemo.jsx
  - `[ ]` SQL21901_U5_L4_SQLIAMDemo.jsx
  - `[ ]` SQL21901_U5_L5_SQLAccessControlDemo.jsx
  - `[ ]` SQL21901_U5_L6_SQLGrantDemo.jsx
  - `[ ]` SQL21901_U5_L7_SQLRevokeDemo.jsx
  - `[ ]` SQL21901_U5_L8_SQLAuditDemo.jsx
  - `[ ]` SQL21901_U5_L9_SQLInjectionDemo.jsx
  - `[ ]` SQL21901_U5_L10_SQLIntegrityDemo.jsx
- `[ ]` **Batch 13: SQL Unit 6 (Advanced Functions & Dashboards)**
  - `[ ]` SQL21901_U6_L1_SQLFunctionIntro.jsx
  - `[ ]` SQL21901_U6_L2_SQLFunctionTypes.jsx
  - `[ ]` SQL21901_U6_L3_SQLSumDemo.jsx
  - `[ ]` SQL21901_U6_L4_SQLAvgDemo.jsx
  - `[ ]` SQL21901_U6_L5_SQLCountDemo.jsx
  - `[ ]` SQL21901_U6_L6_SQLCaseDemo.jsx
  - `[ ]` SQL21901_U6_L7_SQLConcatDemo.jsx
  - `[ ]` SQL21901_U6_L8_SQLDateTimeDemo.jsx
  - `[ ]` SQL21901_U6_L9_SQLCaseIfDemo.jsx
  - `[ ]` SQL21901_U6_L10_SQLTrendAnalysis.jsx
  - `[ ]` SQL21901_U6_L11_SQLReportBuilder.jsx
  - `[ ]` SQL21901_U6_L12_SQLDashboardDemo.jsx

## 📝 3. โน้ตส่งมอบงาน (AI Handoff Notes)
*(⚠️ AI: หากเซสชันถูกตัด, โควต้า Token ใกล้หมด, หรืองานติดขัดยังไม่เสร็จ ให้ทิ้งข้อความอธิบายปัญหาและแนวทางไว้ให้ AI ตัวต่อไปมาอ่านที่นี่)*

**อัปเดตระบบ [2026-05-16]**:
- ดำเนินการ **Phase 1: Python Basic** และ **Phase 2: OOP** เสร็จสมบูรณ์ 100%
- ทำการรวมศูนย์ข้อมูล Task มาไว้ที่ `d:\STD\---------1\task.md` แล้ว
- **Phase 3 (SQL)**: ดำเนินการ Batch 10 ถึง L6 (Explorer Pattern) เสร็จเรียบร้อย
- **หมายเหตุ**: L7 และ L8 มีความพยายาม Refactor แล้วแต่ถูก Revert กลับเป็น Legacy Style (อาจเกิดจากปัญหาการบันทึกหรือความต้องการของผู้ใช้) AI ตัวต่อไปควรเริ่มตรวจสอบที่ L7 เป็นต้นไป
- **เป้าหมายถัดไป**: ดำเนินการ Batch 10 (L7-L10) และ Batch 11 เป็นต้นไป
