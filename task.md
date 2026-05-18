# 🎯 Active Task (หน่วยความจำระยะสั้น & สถานะงาน)

> ⚠️ **สำหรับ AI (CRITICAL RULE)**: ไฟล์นี้คือ "จุดศูนย์กลางการทำงาน (Single Source of Truth)" ของคุณ **คุณต้องยึดเป้าหมายในนี้เป็นหลัก อัปเดตเช็คลิสต์ `[ ]` เป็น `[x]` ตลอดเวลาที่ทำงานลงในไฟล์ `d:\Teach\task.md` นี้เท่านั้น!** (ห้ามเขียนแยกไปที่ไฟล์อื่น เพื่อป้องกันปัญหาสถานะงานหายกรณีเซสชันหลุด/เครดิตหมด) และหากคุณกำลังจะหยุดทำงาน ให้สรุปงานส่งมอบที่ "ข้อ 3" เสมอ!

## 📌 1. เป้าหมายระยะสั้น (Current Objective)
- [x] ปรับปรุงระบบเพิ่มเนื้อหา (Auto-Registry) ให้ง่ายขึ้น ไม่ต้องยุ่งกับ `LessonViewer.jsx` อีกต่อไป
- [x] Migration Unit 2 DDL (SQL) เสร็จสมบูรณ์ (2.5-2.12)
- [x] ลบวิชาที่ยังไม่มีบทเรียนออกจาก `data.js` (10 วิชา → เหลือ 3 วิชา)
- [x] **อัปเดต SKILL.md**: บังคับใช้ Single Source of Task (task.md ในโปรเจกต์) เพื่อความต่อเนื่อง
- [x] **เป้าหมายใหม่**: อัปเกรด/Refactor สื่อ Interactive ทั้งหมดให้ตรงตามมาตรฐาน `DESIGN.md` และ `SKILL.md` (Explorer Pattern)
- [ ] ดำเนินการ **Phase 3: SQL (SQL21901)** ให้เป็นรูปแบบ Explorer Pattern ครบทุกหน่วย

**ความคืบหน้า Phase 3 (โดยประมาณ)**: Unit 1–2 ✅ | Unit 3 60% (L7–L10 ค้าง) | Unit 4 ✅ | Unit 5 ✅ | Unit 6 ✅

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
  - [x] SQL21901_U3_L6_UpdateSetDemo.jsx *(reference Explorer)*
  - [x] SQL21901_U3_L7_UpdateWhereDemo.jsx
  - [x] SQL21901_U3_L8_PreDeleteCheckDemo.jsx
  - [x] SQL21901_U3_L9_DeleteWhereDemo.jsx
  - [x] SQL21901_U3_L10_TransactionDemo.jsx
- [x] **Batch 11: SQL Unit 4 (DQL - Select, Join, Aggregate)** — 12/12 ✅
  - [x] SQL21901_U4_L1_SQLSelectBasicDemo.jsx — Explorer (SELECT */columns/WHERE)
  - [x] SQL21901_U4_L2_SQLDistinctDemo.jsx — Deep Simulator (DISTINCT/multi/COUNT)
  - [x] SQL21901_U4_L3_SQLOrderByDemo.jsx — Deep Simulator (ASC/DESC/multi-col)
  - [x] SQL21901_U4_L4_SQLComparisonDemo.jsx — Deep Simulator (=/>/BETWEEN)
  - [x] SQL21901_U4_L5_SQLLogicalDemo.jsx — Deep Simulator (AND/OR/NOT)
  - [x] SQL21901_U4_L6_SQLLikeDemo.jsx — Explorer (S%/%a%/____patterns)
  - [x] SQL21901_U4_L7_SQLInnerJoinDemo.jsx — Explorer (INNER JOIN + mini Venn)
  - [x] SQL21901_U4_L8_SQLOuterJoinDemo.jsx — Explorer (LEFT/RIGHT/compare)
  - [x] SQL21901_U4_L9_SQLGroupByDemo.jsx — Explorer (COUNT/SUM/AVG + bar chart)
  - [x] SQL21901_U4_L10_SQLHavingDemo.jsx — Deep Simulator (COUNT/SUM/WHERE→HAVING)
  - [x] SQL21901_U4_L11_SQLUnionDemo.jsx — Deep Simulator (UNION/UNION ALL/compare)
  - [x] SQL21901_U4_L12_SQLReportDesignDemo.jsx — Explorer (4-step report design)
- [x] **Batch 12: SQL Unit 5 (DCL - Security & Control)** — 10/10 ✅
  - [x] SQL21901_U5_L1_SQLSecurityImportance.jsx
  - [x] SQL21901_U5_L2_SQLControlProcess.jsx
  - [x] SQL21901_U5_L3_SQLFirewallDemo.jsx
  - [x] SQL21901_U5_L4_SQLIAMDemo.jsx
  - [x] SQL21901_U5_L5_SQLAccessControlDemo.jsx
  - [x] SQL21901_U5_L6_SQLGrantDemo.jsx
  - [x] SQL21901_U5_L7_SQLRevokeDemo.jsx
  - [x] SQL21901_U5_L8_SQLAuditDemo.jsx
  - [x] SQL21901_U5_L9_SQLInjectionDemo.jsx
  - [x] SQL21901_U5_L10_SQLIntegrityDemo.jsx
- [x] **Batch 13: SQL Unit 6 (Advanced Functions & Dashboards)** — 12/12 ✅
  - [x] SQL21901_U6_L1_SQLFunctionIntro.jsx — terminal h-48 fix
  - [x] SQL21901_U6_L2_SQLFunctionTypes.jsx — terminal h-48 fix
  - [x] SQL21901_U6_L3_SQLSumDemo.jsx — terminal h-48 fix
  - [x] SQL21901_U6_L4_SQLAvgDemo.jsx — terminal h-48 fix
  - [x] SQL21901_U6_L5_SQLCountDemo.jsx — terminal h-48 fix
  - [x] SQL21901_U6_L6_SQLCaseDemo.jsx — terminal h-48 fix
  - [x] SQL21901_U6_L7_SQLConcatDemo.jsx — Deep Simulator (CONCAT/CONCAT_WS/IFNULL)
  - [x] SQL21901_U6_L8_SQLDateTimeDemo.jsx — Deep Simulator (NOW/YEAR/DATE_ADD)
  - [x] SQL21901_U6_L9_SQLCaseIfDemo.jsx — Deep Simulator (IF/CASE WHEN/IFNULL)
  - [x] SQL21901_U6_L10_SQLTrendAnalysis.jsx — Deep Simulator (Monthly/YoY/Running Total)
  - [x] SQL21901_U6_L11_SQLReportBuilder.jsx — Explorer Shell (Report Builder + Quiz + Terminal)
  - [x] SQL21901_U6_L12_SQLDashboardDemo.jsx — Deep Simulator (KPI/Top N/Category)✅

## 📝 3. โน้ตส่งมอบงาน (AI Handoff Notes)
*(⚠️ AI: หากเซสชันถูกตัด, โควต้า Token ใกล้หมด, หรืองานติดขัดยังไม่เสร็จ ให้ทิ้งข้อความอธิบายปัญหาและแนวทางไว้ให้ AI ตัวต่อไปมาอ่านที่นี่)*

**อัปเดตระบบ [2026-05-16]**:
- **Phase 1–2** เสร็จ 100%
- **Phase 3**: Batch 8–9 และ U3 L1–L6 เป็น Explorer Pattern แล้ว

**อัปเดตระบบ [2026-05-18]**:
- **Batch 12 (Unit 5 DCL) เสร็จสมบูรณ์**: L1–L10 refactor เป็น Explorer Pattern (simulator + VS Code terminal + quiz) — ไม่ใช้ `SQLSyntaxEngine` แล้ว
- **Batch 10 (Unit 3 DML) เสร็จสมบูรณ์**: L7 Refactored + L8, L9, L10 สร้างใหม่ทั้งหมด
- **Batch 13 (Unit 6 Functions) เสร็จสมบูรณ์**: rewrite ทั้ง 12 ไฟล์จาก SQLSyntaxEngine → Explorer Pattern
  - L1: Function Anatomy | L2: Aggregate vs Scalar | L3-L5: SUM/AVG/COUNT Simulator
  - L6: UPPER/LOWER | L7: CONCAT + Live Builder | L8: Date/Time 3 กลุ่ม
  - L9: CASE/IF/IFNULL | L10: Trend Analysis + Bar Chart | L11: Report Builder | L12: Dashboard
- **Batch 11 (Unit 4 DQL) เสร็จสมบูรณ์**: rewrite ทั้ง 12 ไฟล์ — L1 SELECT, L2 DISTINCT, L3 ORDER BY, L4 Comparison, L5 Logical, L6 LIKE, L7 INNER JOIN, L8 Outer JOIN, L9 GROUP BY, L10 HAVING, L11 UNION, L12 Report Design
- **ถัดไป**: SQL Unit 3 L7-L10 ยังค้างอยู่ (Batch 10 ข้อมูลเก่าระบุว่าเสร็จแล้ว — ต้อง verify)
- **กฎ refactor**: ห้าม `min-h-screen` + card แยก | ต้องมี terminal `h-48 bg-[#1e1e1e]` | ต้องมี minigame/simulator | Tailwind hardcode เท่านั้น
