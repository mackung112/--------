# 🎯 แผนงานและสถานะปัจจุบัน (Task Management - ค่าเริ่มต้น)

**เป้าหมาย:** สร้างเนื้อหาบทเรียนวิชาระบบปฏิบัติการ บำรุงรักษา และเครือข่ายคอมพิวเตอร์เบื้องต้น (และรายวิชาอื่นๆ) ให้สมบูรณ์แบบโดยเน้นสื่อการเรียนรู้เชิงโต้ตอบระดับพรีเมียม (Interactive Simulator) และปฏิบัติตามกฎเกณฑ์ใน "ค่าเริ่มต้น" (AGENTS.md, CONTEXT.md, DESIGN.md, SKILL.md, task.md) อย่างเคร่งครัด


---

## 📌 1. เป้าหมายปัจจุบัน (Active Objectives)
- [ ] พัฒนาบทเรียนหน่วยการเรียนรู้ย่อย **"หน่วยที่ 4.1 อุปกรณ์เครือข่ายระดับฮาร์ดแวร์พื้นฐาน (Network Devices)"** ในระบบ LMS-React

---

## 🔄 2. รายการงานที่กำลังดำเนินการและแผนงานถัดไป (Active Checklist)
- [ ] ค้นคว้ารายละเอียดสเปกหลักสูตรวิชาการของหน่วยที่ 4.1
- [ ] วางแผนพัฒนาเครื่องจำลอง/สื่อเชิงโต้ตอบสำหรับอุปกรณ์เครือข่าย (NIC MAC Address, Hub collision, Switch MAC Table learning, Router IP Routing)
- [ ] เขียนโค้ดคอมโพเนนต์ `it4_1.jsx` (หัวข้อย่อย + Simulators + Quiz)
- [ ] ทำการทดสอบบิลด์ระบบเพื่อตรวจสอบความสมบูรณ์และพร้อมใช้

---

## 📝 3. โน้ตส่งมอบงานและบันทึกประวัติ (Handoff Logs)
*(เมื่อแต่ละงาน in Active Checklist ด้านบนทำสำเร็จลุล่วงแล้ว ให้ย้ายเนื้อหามาเขียนสรุปผลไว้ตรงนี้ และนำงานนั้นออกจาก Active Checklist ทันที และถ้างานใหม่เข้ามา ให้แทนที่ประวัติงานเก่าด้วยงานใหม่) (เก็บข้อความนี้ไว้ในทุกๆ ครั้งที่มีการส่งมอบงาน)*

- **หน่วยที่ 3.4 การจัดการไดรเวอร์และการอัปเดต (it3_4.jsx)** [เสร็จสิ้น - 30/05/2026]
    - พัฒนาเนื้อหาครบทั้ง 5 หัวข้อย่อยทางวิชาการการจัดการไดรเวอร์ตามหลักสูตรสากลในรูปแบบไร้กรอบเปิดโปร่งโล่ง (Fluid Open-Air Layout) สวยงามระดับพรีเมียม
    - พัฒนา Driver Interpreter Flow Simulator จำลองผังวิชวลและการถอดรหัสระดับสัญญาณคำสั่ง USB, GPU assembly และ NIC frames ด้วย SVG (Absolute Center Connection)
    - พัฒนา Windows Device Manager Simulator และ Hardware Support Center & Driver Installer Simulator สองคอมโพเนนต์เชื่อมโยงสอดคล้องกัน ให้ผู้เรียนเข้าProperties แกะ Hardware IDs (VEN & DEV) ไปดาวน์โหลดตรงผ่าน Official Vendor Portal ติดตั้งไฟล์สำเร็จเพื่อคลายขีดจำกัดสัญลักษณ์ตกใจสีเหลือง ⚠️ ในตรรกะระบบ
    - พัฒนา Windows Update Center & Patch Simulator จำลองหน้าตรวจหาอุดช่องโหว่ความมั่นคง Cumulative Security patches (KB5034123) และไดรเวอร์ WHQL พร้อมคำสั่งบูตรีสตาร์ตระบบ
    - พัฒนา Driver Troubleshooting & Action Panel Simulator บอร์ดวินิจฉัยเยียวยาเครื่องผิดปกติ 3 เคสศึกษาผ่านฟังก์ชัน Roll Back Driver, Disable/Enable Device และ Uninstall Device
    - แนบ Quiz 5 ข้อและภารกิจ TeacherTask ท้ายหน่วย ผ่านการคอมไพล์ build Vite ราบรื่น 100%

- **หน่วยที่ 3.3 กระบวนการติดตั้งระบบปฏิบัติการและตั้งค่าพื้นฐาน (it3_3.jsx)** [เสร็จสิ้น - 30/05/2026]
    - พัฒนาเนื้อหาครบทั้ง 5 หัวข้อย่อยทางวิชาการกระบวนการติดตั้งระบบปฏิบัติการตามหลักสูตรสากลในรูปแบบไร้กรอบเปิดโปร่งโล่ง (Fluid Open-Air Layout) สวยงามระดับพรีเมียม
    - พัฒนา Windows Installer Welcome Wizard Simulator จำลองการส่งคำสั่งบูตผ่านสื่อบันทึกข้อมูล เลือกรายละเอียดภาษา คีย์บอร์ด และดำเนินการติดตั้ง (Install Now)
    - พัฒนา Windows Setup Partition Manager Simulator จำลองการแบ่งพื้นที่ดิสก์ตรรกะ (System Reserved, Primary) การสั่งลบ (Delete) และฟอร์แมต (Format) ในรูปแบบตารางที่มีวิชวลแถบดิสก์สดสัดส่วนเรียลไทม์
    - พัฒนา Windows OOBE Setup Wizard Simulator จำลองสภาพแวดล้อม OOBE สไตล์ Windows 11 แผงกระจกแก้วสลับคลิกเลือก Region, Keyboard Layout และจำลองการหาคลื่นสัญญาณ Wi-Fi เพื่อซิงค์เชื่อมต่ออย่างลื่นไหล
    - พัฒนา Local vs Microsoft Account Portal Simulator จำลองการสร้างบัญชีท้องถิ่น (ต้องระบุคำถามความปลอดภัย) เทียบกับบัญชีกลุ่มเมฆไมโครซอฟท์ พร้อมตารางกริดเปรียบเทียบสิทธิประโยชน์อย่างชัดเจน
    - พัฒนา Privacy Toggles & Secure PIN Pad Simulator บอร์ดเปิด-ปิดความเป็นส่วนตัว 4 ด้านควบคู่กับแป้นตัวเลขเพื่อป้อนรหัส PIN 4 หลัก โดยมีระบบตรวจสอบความเสี่ยงรหัสเดาง่าย ( sequential/repeating) อย่างมั่นคง
    - แนบ Quiz 5 ข้อและภารกิจ TeacherTask ท้ายหน่วย ผ่านการคอมไพล์ build Vite ราบรื่น 100%

- **หน่วยที่ 3.2 การเตรียมการก่อนติดตั้งระบบปฏิบัติการ (it3_2.jsx)** [เสร็จสิ้น - 30/05/2026]
  - พัฒนาเนื้อหาครบทั้ง 6 หัวข้อย่อยทางวิชาการการเตรียมความพร้อมระบบปฏิบัติการตามหลักสูตรสากลในรูปแบบไร้กรอบเปิดโปร่งโล่ง (Fluid Open-Air Layout)
  - พัฒนา System Requirements Checker Simulator วิเคราะห์ความต้องการระบบขั้นต่ำในการติดตั้ง Windows 11, Windows 10 และ Ubuntu Server โดยเลือกประเมินสเปก CPU Cores, RAM, Disk Space, Secure Boot และโมดูล TPM 2.0
  - พัฒนา Rufus Bootable USB Creator Simulator จำลองซอฟต์แวร์ Rufus โหมดมืดที่ประสานตรรกะความเข้ากันได้แบบสมมาตรของการจัด Partition Scheme และ Target System (GPT -> UEFI, MBR -> BIOS) พร้อมลูปแอนิเมชันสร้างสื่อติดตั้งและแสดงพอร์ต Console Logs
  - พัฒนา File Copy Size Limitation Simulator แสดงความแตกต่างเชิงลึกของระบบไฟล์ FAT32, NTFS และ exFAT โดยสไลด์จำลองการเขียนข้อมูลเดี่ยวขนาดใหญ่และแสดงกล่องพ่นข้อผิดพลาดบักของ FAT32 เมื่อไฟล์เกิน 4GB
  - พัฒนา Partition Scheme & Capacity Limit Simulator เปรียบเทียบขีดจำกัดขนาดตาราง MBR (ล็อกพื้นที่สูงสุดที่ 2.2TB และปล่อยพื้นที่เกินเป็น Unallocated/Unusable Space) เทียบกับตาราง GPT ยุคใหม่ 64-bit ที่สามารถใช้งานพื้นที่จัดเก็บข้อมูลได้สมบูรณ์ 100%
  - จัดทำข้อมูลความแตกต่างลิขสิทธิ์ระดับอุตสาหกรรมในแผงกริดเปรียบเทียบ Retail, OEM และ Volume Licensing
  - แนบ Quiz 5 ข้อความรู้การเตรียมระบบติดตั้งผ่าน QuizEngine โครงสร้างใหม่แบบระนาบเดียว และจัดวางภารกิจออกแบบสเปก TeacherTask สำหรับเครือข่ายสำนักงาน โดยคอมไพล์ผ่านกระบวนการ build ราบรื่น 100%

- **หน่วยที่ 3.1 สถาปัตยกรรมและหลักการทำงานของระบบปฏิบัติการ (it3_1.jsx)** [เสร็จสิ้น - 30/05/2026]
  - พัฒนาเนื้อหาครบทั้ง 5 หัวข้อย่อยทางวิชาการระบบปฏิบัติการตามหลักสูตรสากลแบบเปิดโปร่งโล่ง (Fluid Open-Air Layout)
  - พัฒมนา OS Architectural Layer Bridge Simulator แสดงการไหลเวียนคำสั่ง System Calls จากผู้ใช้ผ่านเลเยอร์ OS ลงสู่ฮาร์ดแวร์จริงด้วยผัง SVG (Absolute Center Connection)
  - พัฒนา CLI Terminal vs GUI File Explorer Simulator ให้เห็นภาพกระบวนการแปลงรหัสคำสั่งพิมพ์ (ls, mkdir, rm) เป็น Kernel system calls และการควบคุมพื้นที่จัดเก็บควบคู่กัน
  - พัฒนา CPU Scheduler & Memory Swap Simulator แสดงกลไก Time-Slicing การคัดสรรสถานะคิวโปรเซส และการแก้ปัญหาแรมเต็มด้วยระบบ Paging Swapping ไปเก็บในหน่วยความจำเสมือน
  - พัฒนา OS Families Matrix & Bit-Space Address Boundaries เปรียบเทียบ Windows, macOS, Linux (Client vs Server) และแสดงความกว้าง Address Space 32-bit (4GB Limit) เทียบกับ 64-bit
  - แนบ Quiz 5 ข้อด้วย QuizEngine และภารกิจ TeacherTask ท้ายหน่วย ผ่านกระบวนการคอมไพล์ `npm run build` ผ่าน 100%

