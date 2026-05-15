const sqlCourse = {
    id: "21901-2001",
    title: "ภาษาสอบถามข้อมูลเชิงโครงสร้างเบื้องต้น",
    description: "ศึกษาและปฏิบัติเกี่ยวกับภาษา SQL สำหรับจัดการฐานข้อมูล การสร้าง แก้ไข ลบ สอบถามข้อมูล และการควบคุมสิทธิ์ ด้วย MySQL และ MySQL Workbench",
    icon: "🗄️",
    chapters: [
        {
            id: 1,
            title: "หน่วยที่ 1 งานจัดการฐานข้อมูล",
            lessons: [
                { id: "1.1", title: "พื้นฐานฐานข้อมูล", content: "<h2>ฐานข้อมูลคืออะไร?</h2><p>ฐานข้อมูล (Database) คือระบบจัดเก็บข้อมูลอย่างเป็นระเบียบ สามารถค้นหา เพิ่ม แก้ไข และลบข้อมูลได้อย่างมีประสิทธิภาพ</p>[SQL21901_U1_L1_SQLDatabaseBasics]" },
                { id: "1.2", title: "ประเภทฐานข้อมูล", content: "<h2>ประเภทของฐานข้อมูล</h2><p>ฐานข้อมูลแบ่งออกเป็นหลายประเภท เช่น Relational, NoSQL, In-Memory เป็นต้น</p>[SQL21901_U1_L2_SQLDatabaseTypes]" },
                { id: "1.3", title: "การเลือก DBMS", content: "<h2>เลือก DBMS ที่เหมาะสม</h2><p>DBMS (Database Management System) แต่ละตัวมีจุดเด่นต่างกัน การเลือกให้เหมาะกับงานจึงสำคัญมาก</p>[SQL21901_U1_L3_SQLDBMSSelector]" },
                { id: "1.4", title: "แนะนำ MySQL และ MySQL Workbench", content: "<h2>เครื่องมือที่จะใช้ในวิชานี้</h2><p>MySQL เป็น RDBMS ยอดนิยมที่ใช้ภาษา SQL และ MySQL Workbench เป็นเครื่องมือ GUI สำหรับจัดการฐานข้อมูล</p>[SQL21901_U1_L4_SQLWorkbenchIntro]" },
                { id: "1.5", title: "การออกแบบฐานข้อมูล", content: "<h2>หลักการออกแบบฐานข้อมูล</h2><p>การออกแบบที่ดีเริ่มจากการวิเคราะห์ความต้องการ แล้วสร้าง ER Diagram เพื่อกำหนดโครงสร้าง</p>[SQL21901_U1_L5_SQLDBDesignDemo]" },
                { id: "1.6", title: "การสร้างฐานข้อมูล (CREATE DATABASE)", content: "<h2>คำสั่ง CREATE DATABASE</h2><p>คำสั่งแรกที่ต้องรู้คือการสร้างฐานข้อมูลใหม่ด้วย CREATE DATABASE</p>[SQL21901_U1_L6_SQLCreateDBDemo]" },
                { id: "1.7", title: "การตรวจสอบฐานข้อมูล (SHOW DATABASES)", content: "<h2>คำสั่ง SHOW DATABASES</h2><p>ใช้ดูรายชื่อฐานข้อมูลทั้งหมดที่มีในเซิร์ฟเวอร์</p>[SQL21901_U1_L7_SQLShowDBDemo]" },
                { id: "1.8", title: "การวิเคราะห์ก่อนแก้ไข", content: "<h2>Think Before You Act</h2><p>ก่อนแก้ไขฐานข้อมูลควรวิเคราะห์ผลกระทบที่อาจเกิดขึ้นก่อนเสมอ</p>[SQL21901_U1_L8_SQLAnalyzeBeforeEdit]" },
                { id: "1.9", title: "การสำรองข้อมูล (Backup)", content: "<h2>Backup ข้อมูล</h2><p>การสำรองข้อมูลเป็นขั้นตอนสำคัญที่ป้องกันการสูญหายของข้อมูล</p>[SQL21901_U1_L9_SQLBackupDemo]" },
                { id: "1.10", title: "การแก้ไขฐานข้อมูล", content: "<h2>ALTER DATABASE</h2><p>ใช้คำสั่ง ALTER DATABASE เพื่อแก้ไขคุณสมบัติของฐานข้อมูล เช่น Character Set</p>[SQL21901_U1_L10_SQLAlterDBDemo]" },
                { id: "1.11", title: "ผลกระทบจากการลบ", content: "<h2>ผลกระทบจากการลบฐานข้อมูล</h2><p>การลบฐานข้อมูลจะลบทุกอย่างที่อยู่ภายใน ตาราง ข้อมูล ทั้งหมดจะหายไป</p>[SQL21901_U1_L11_SQLDropImpactDemo]" },
                { id: "1.12", title: "การจัดการความเสี่ยง", content: "<h2>Risk Management</h2><p>การจัดการความเสี่ยงช่วยลดโอกาสเกิดปัญหาจากการดำเนินงานกับฐานข้อมูล</p>[SQL21901_U1_L12_SQLRiskManagement]" },
                { id: "1.13", title: "การลบฐานข้อมูล (DROP DATABASE)", content: "<h2>คำสั่ง DROP DATABASE</h2><p>ใช้ลบฐานข้อมูลออกจากเซิร์ฟเวอร์อย่างถาวร</p>[SQL21901_U1_L13_SQLDropDBDemo]" },
            ]
        },
        {
            id: 2,
            title: "หน่วยที่ 2 งานจัดการตาราง",
            lessons: [
                { id: "2.1", title: "โครงสร้างตาราง", content: "<h2>โครงสร้างของตาราง</h2><p>ตาราง (Table) ประกอบด้วย Row (แถว) และ Column (คอลัมน์) เป็นหน่วยจัดเก็บข้อมูลหลักในฐานข้อมูลเชิงสัมพันธ์</p>[SQL21901_U2_L1_SQLTableStructure]" },
                { id: "2.2", title: "ประเภทข้อมูล (Data Types)", content: "<h2>Data Types ใน MySQL</h2><p>แต่ละคอลัมน์ต้องกำหนดชนิดข้อมูล เช่น INT, VARCHAR, DATE, DECIMAL เป็นต้น</p>[SQL21901_U2_L2_SQLDataTypesDemo]" },
                { id: "2.3", title: "ข้อกำหนดตาราง (Constraints)", content: "<h2>Constraints คืออะไร?</h2><p>ข้อกำหนด (Constraints) ใช้ควบคุมคุณภาพข้อมูล เช่น PRIMARY KEY, NOT NULL, UNIQUE</p>[SQL21901_U2_L3_SQLConstraintsDemo]" },
                { id: "2.4", title: "ความสัมพันธ์ตาราง (FOREIGN KEY)", content: "<h2>FOREIGN KEY</h2><p>ใช้เชื่อมโยงข้อมูลระหว่างตาราง ทำให้ข้อมูลมีความสัมพันธ์กันอย่างถูกต้อง</p>[SQL21901_U2_L4_SQLForeignKeyDemo]" },
                { id: "2.5", title: "การสร้างตาราง (CREATE TABLE)", content: "<h2>คำสั่ง CREATE TABLE</h2><p>สร้างตารางใหม่พร้อมกำหนดคอลัมน์ ชนิดข้อมูล และ Constraints</p>[SQL21901_U2_L5_SQLCreateTableDemo]" },
                { id: "2.6", title: "การกำหนดข้อมูลเริ่มต้น", content: "<h2>DEFAULT และ AUTO_INCREMENT</h2><p>กำหนดค่าเริ่มต้นให้คอลัมน์เมื่อไม่ได้ระบุค่า</p>[SQL21901_U2_L6_SQLDefaultValueDemo]" },
                { id: "2.7", title: "การเพิ่มคอลัมน์ (ADD COLUMN)", content: "<h2>ALTER TABLE ... ADD COLUMN</h2><p>เพิ่มคอลัมน์ใหม่ให้กับตารางที่มีอยู่แล้ว</p>[SQL21901_U2_L7_SQLAddColumnDemo]" },
                { id: "2.8", title: "การแก้ไขคอลัมน์ (MODIFY COLUMN)", content: "<h2>ALTER TABLE ... MODIFY COLUMN</h2><p>แก้ไขชนิดข้อมูลหรือ Constraint ของคอลัมน์ที่มีอยู่</p>[SQL21901_U2_L8_SQLModifyColumnDemo]" },
                { id: "2.9", title: "การเปลี่ยนชื่อคอลัมน์ (RENAME)", content: "<h2>ALTER TABLE ... RENAME COLUMN</h2><p>เปลี่ยนชื่อคอลัมน์โดยไม่สูญเสียข้อมูล</p>[SQL21901_U2_L9_SQLRenameColumnDemo]" },
                { id: "2.10", title: "การลบคอลัมน์ (DROP COLUMN)", content: "<h2>ALTER TABLE ... DROP COLUMN</h2><p>ลบคอลัมน์ที่ไม่ต้องการออกจากตาราง</p>[SQL21901_U2_L10_SQLDropColumnDemo]" },
                { id: "2.11", title: "ผลกระทบการลบตาราง (CASCADE)", content: "<h2>CASCADE vs RESTRICT</h2><p>เมื่อลบตารางที่มี FOREIGN KEY เชื่อมโยง ต้องเข้าใจผลกระทบที่จะเกิดขึ้น</p>[SQL21901_U2_L11_SQLCascadeDemo]" },
                { id: "2.12", title: "การลบตาราง (DROP TABLE)", content: "<h2>คำสั่ง DROP TABLE</h2><p>ลบตารางออกจากฐานข้อมูลอย่างถาวร</p>[SQL21901_U2_L12_SQLDropTableDemo]" },
            ]
        },
        {
            id: 3,
            title: "หน่วยที่ 3 งานจัดการข้อมูล",
            lessons: [
                { id: "3.1", title: "การเพิ่มข้อมูลแถวเดียว", content: "[SQL21901_U3_L1_InsertSingleDemo]" },
                { id: "3.2", title: "การจัดการค่า NULL", content: "[SQL21901_U3_L2_NullHandlingDemo]" },
                { id: "3.3", title: "การเพิ่มข้อมูลหลายแถว", content: "[SQL21901_U3_L3_InsertMultiDemo]" },
                { id: "3.4", title: "การเพิ่มข้อมูลจาก Subquery", content: "[SQL21901_U3_L4_InsertSubqueryDemo]" },
                { id: "3.5", title: "การตรวจสอบก่อนแก้ไข", content: "[SQL21901_U3_L5_PreUpdateCheckDemo]" },
                { id: "3.6", title: "การแก้ไขข้อมูล (UPDATE SET)", content: "[SQL21901_U3_L6_UpdateSetDemo]" },
                { id: "3.7", title: "เงื่อนไขการแก้ไข (UPDATE WHERE)", content: "[SQL21901_U3_L7_UpdateWhereDemo]" },
                { id: "3.8", title: "การประเมินก่อนลบ", content: "[SQL21901_U3_L8_PreDeleteCheckDemo]" },
                { id: "3.9", title: "การลบข้อมูล (DELETE WHERE)", content: "[SQL21901_U3_L9_DeleteWhereDemo]" },
                { id: "3.10", title: "การใช้ Transaction", content: "[SQL21901_U3_L10_TransactionDemo]" },
            ]
        },
        {
            id: 4,
            title: "หน่วยที่ 4 งานสอบถามข้อมูล",
            lessons: [
                { id: "4.1", title: "พื้นฐานการดึงข้อมูล (SELECT)", content: "<h2>คำสั่ง SELECT</h2><p>คำสั่งที่ใช้บ่อยที่สุดในภาษา SQL สำหรับดึงข้อมูลจากตาราง</p>[SQL21901_U4_L1_SQLSelectBasicDemo]" },
                { id: "4.2", title: "การดึงข้อมูลไม่ซ้ำ (DISTINCT)", content: "<h2>SELECT DISTINCT</h2><p>ดึงเฉพาะค่าที่ไม่ซ้ำกันจากคอลัมน์ที่กำหนด</p>[SQL21901_U4_L2_SQLDistinctDemo]" },
                { id: "4.3", title: "การจัดเรียงข้อมูล (ORDER BY)", content: "<h2>ORDER BY</h2><p>จัดเรียงผลลัพธ์ตามคอลัมน์ที่ต้องการ ทั้งน้อยไปมากและมากไปน้อย</p>[SQL21901_U4_L3_SQLOrderByDemo]" },
                { id: "4.4", title: "ตัวดำเนินการเปรียบเทียบ", content: "<h2>Comparison Operators</h2><p>ใช้ =, <>, >, <, >=, <=, BETWEEN, IN เพื่อกรองข้อมูล</p>[SQL21901_U4_L4_SQLComparisonDemo]" },
                { id: "4.5", title: "ตรรกะเชื่อมเงื่อนไข", content: "<h2>AND, OR, NOT</h2><p>ใช้ตัวดำเนินการทางตรรกะเพื่อเชื่อมหลายเงื่อนไขเข้าด้วยกัน</p>[SQL21901_U4_L5_SQLLogicalDemo]" },
                { id: "4.6", title: "การค้นหารูปแบบ (LIKE)", content: "<h2>LIKE Pattern Matching</h2><p>ค้นหาข้อมูลด้วยรูปแบบ (Pattern) โดยใช้ % และ _</p>[SQL21901_U4_L6_SQLLikeDemo]" },
                { id: "4.7", title: "การเชื่อมตาราง (INNER JOIN)", content: "<h2>INNER JOIN</h2><p>เชื่อมข้อมูลจาก 2 ตารางเข้าด้วยกัน โดยเอาเฉพาะแถวที่ตรงกัน</p>[SQL21901_U4_L7_SQLInnerJoinDemo]" },
                { id: "4.8", title: "การเชื่อมตารางแบบอื่นๆ (OUTER JOIN)", content: "<h2>LEFT, RIGHT, FULL JOIN</h2><p>เชื่อมตารางโดยรวมแถวที่ไม่ตรงกันด้วย</p>[SQL21901_U4_L8_SQLOuterJoinDemo]" },
                { id: "4.9", title: "การจัดกลุ่มข้อมูล (GROUP BY)", content: "<h2>GROUP BY</h2><p>จัดกลุ่มข้อมูลตามคอลัมน์ที่กำหนด เพื่อใช้ร่วมกับ Aggregate Functions</p>[SQL21901_U4_L9_SQLGroupByDemo]" },
                { id: "4.10", title: "การกรองกลุ่ม (HAVING)", content: "<h2>HAVING</h2><p>กรองผลลัพธ์หลัง GROUP BY (ต่างจาก WHERE ที่กรองก่อน GROUP)</p>[SQL21901_U4_L10_SQLHavingDemo]" },
                { id: "4.11", title: "การรวมผลลัพธ์ (UNION)", content: "<h2>UNION / UNION ALL</h2><p>รวมผลลัพธ์จากหลาย SELECT เข้าด้วยกัน</p>[SQL21901_U4_L11_SQLUnionDemo]" },
                { id: "4.12", title: "การออกแบบรายงาน", content: "<h2>Report Design</h2><p>ออกแบบรายงานจากข้อมูลในฐานข้อมูลด้วย SQL</p>[SQL21901_U4_L12_SQLReportDesignDemo]" },
            ]
        },
        {
            id: 5,
            title: "หน่วยที่ 5 งานสอบถามข้อมูลและการควบคุม",
            lessons: [
                { id: "5.1", title: "ความสำคัญของการควบคุมข้อมูล", content: "<h2>ทำไมต้องควบคุมข้อมูล?</h2><p>ข้อมูลเป็นทรัพยากรที่มีค่า การควบคุมการเข้าถึงจึงจำเป็น</p>[SQL21901_U5_L1_SQLSecurityImportance]" },
                { id: "5.2", title: "กระบวนการควบคุมข้อมูล", content: "<h2>กระบวนการควบคุม</h2><p>ขั้นตอนการกำหนดนโยบาย การตรวจสอบ และการบังคับใช้</p>[SQL21901_U5_L2_SQLControlProcess]" },
                { id: "5.3", title: "การใช้ Firewalls", content: "<h2>Database Firewall</h2><p>ใช้ Firewall ป้องกันการเข้าถึงฐานข้อมูลจากภายนอก</p>[SQL21901_U5_L3_SQLFirewallDemo]" },
                { id: "5.4", title: "ระบบจัดการสิทธิ์ (IAM)", content: "<h2>Identity & Access Management</h2><p>ระบบจัดการตัวตนและสิทธิ์การเข้าถึง</p>[SQL21901_U5_L4_SQLIAMDemo]" },
                { id: "5.5", title: "การควบคุมการเข้าถึง", content: "<h2>Access Control</h2><p>กำหนดว่าใครเข้าถึงอะไรได้บ้างในฐานข้อมูล</p>[SQL21901_U5_L5_SQLAccessControlDemo]" },
                { id: "5.6", title: "การให้สิทธิ์ (GRANT)", content: "<h2>คำสั่ง GRANT</h2><p>ให้สิทธิ์ผู้ใช้ในการดำเนินงานต่างๆ กับฐานข้อมูล</p>[SQL21901_U5_L6_SQLGrantDemo]" },
                { id: "5.7", title: "การยกเลิกสิทธิ์ (REVOKE)", content: "<h2>คำสั่ง REVOKE</h2><p>ยกเลิกสิทธิ์ที่เคยให้ไว้กับผู้ใช้</p>[SQL21901_U5_L7_SQLRevokeDemo]" },
                { id: "5.8", title: "การตรวจสอบการใช้งาน (Auditing)", content: "<h2>Database Auditing</h2><p>ติดตามและบันทึกกิจกรรมทั้งหมดที่เกิดขึ้นกับฐานข้อมูล</p>[SQL21901_U5_L8_SQLAuditDemo]" },
                { id: "5.9", title: "การป้องกันโจรกรรมข้อมูล", content: "<h2>SQL Injection Prevention</h2><p>ป้องกันการโจมตีฐานข้อมูลด้วย SQL Injection</p>[SQL21901_U5_L9_SQLInjectionDemo]" },
                { id: "5.10", title: "การรักษาความถูกต้องของข้อมูล", content: "<h2>Data Integrity</h2><p>รักษาความถูกต้องและความสมบูรณ์ของข้อมูล</p>[SQL21901_U5_L10_SQLIntegrityDemo]" },
            ]
        },
        {
            id: 6,
            title: "หน่วยที่ 6 งานประยุกต์ใช้ฟังก์ชัน",
            lessons: [
                { id: "6.1", title: "หลักการของฟังก์ชัน", content: "<h2>ฟังก์ชันใน SQL</h2><p>ฟังก์ชัน (Function) ช่วยประมวลผลและแปลงข้อมูลให้ได้ผลลัพธ์ที่ต้องการ</p>[SQL21901_U6_L1_SQLFunctionIntro]" },
                { id: "6.2", title: "ประเภทฟังก์ชัน", content: "<h2>Aggregate vs Scalar</h2><p>ฟังก์ชันแบ่งเป็น 2 ประเภทหลัก: Aggregate (ทำงานกับหลายแถว) และ Scalar (ทำงานกับค่าเดียว)</p>[SQL21901_U6_L2_SQLFunctionTypes]" },
                { id: "6.3", title: "ผลรวม (SUM)", content: "<h2>ฟังก์ชัน SUM()</h2><p>คำนวณผลรวมของค่าในคอลัมน์ตัวเลข</p>[SQL21901_U6_L3_SQLSumDemo]" },
                { id: "6.4", title: "ค่าเฉลี่ย (AVG)", content: "<h2>ฟังก์ชัน AVG()</h2><p>คำนวณค่าเฉลี่ยของคอลัมน์ตัวเลข</p>[SQL21901_U6_L4_SQLAvgDemo]" },
                { id: "6.5", title: "การนับจำนวน (COUNT)", content: "<h2>ฟังก์ชัน COUNT()</h2><p>นับจำนวนแถวในตารางหรือจำนวนค่าที่ไม่เป็น NULL</p>[SQL21901_U6_L5_SQLCountDemo]" },
                { id: "6.6", title: "ตัวพิมพ์ใหญ่-เล็ก (UPPER, LOWER)", content: "<h2>UPPER() และ LOWER()</h2><p>แปลงข้อความเป็นตัวพิมพ์ใหญ่หรือตัวพิมพ์เล็ก</p>[SQL21901_U6_L6_SQLCaseDemo]" },
                { id: "6.7", title: "การเชื่อมข้อความ (CONCAT)", content: "<h2>ฟังก์ชัน CONCAT()</h2><p>เชื่อมข้อความหลายส่วนเข้าด้วยกัน</p>[SQL21901_U6_L7_SQLConcatDemo]" },
                { id: "6.8", title: "การจัดการวันที่และเวลา", content: "<h2>Date & Time Functions</h2><p>NOW(), CURDATE(), DATE_FORMAT() และฟังก์ชันจัดการวันที่อื่นๆ</p>[SQL21901_U6_L8_SQLDateTimeDemo]" },
                { id: "6.9", title: "ฟังก์ชันเงื่อนไข (CASE, IF)", content: "<h2>CASE WHEN และ IF()</h2><p>สร้างเงื่อนไขในคำสั่ง SQL เพื่อแสดงผลลัพธ์ตามเงื่อนไข</p>[SQL21901_U6_L9_SQLCaseIfDemo]" },
                { id: "6.10", title: "การวิเคราะห์แนวโน้ม", content: "<h2>Trend Analysis</h2><p>วิเคราะห์แนวโน้มข้อมูลด้วย SQL สำหรับรายงานธุรกิจ</p>[SQL21901_U6_L10_SQLTrendAnalysis]" },
                { id: "6.11", title: "การสร้างรายงาน", content: "<h2>Report Building</h2><p>สร้างรายงานสรุปข้อมูลด้วย SQL Query ที่ซับซ้อน</p>[SQL21901_U6_L11_SQLReportBuilder]" },
                { id: "6.12", title: "การสร้างแดชบอร์ด", content: "<h2>Dashboard Design</h2><p>ออกแบบแดชบอร์ดสรุปข้อมูลภาพรวมธุรกิจ</p>[SQL21901_U6_L12_SQLDashboardDemo]" },
            ]
        }
    ]
};

export default sqlCourse;
