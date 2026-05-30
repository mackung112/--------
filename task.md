# 🎯 แผนงานและสถานะปัจจุบัน (Task Management - ค่าเริ่มต้น)

**เป้าหมาย:** สร้างเนื้อหาบทเรียนวิชาระบบปฏิบัติการ บำรุงรักษา และเครือข่ายคอมพิวเตอร์เบื้องต้น (และรายวิชาอื่นๆ) ให้สมบูรณ์แบบโดยเน้นสื่อการเรียนรู้เชิงโต้ตอบระดับพรีเมียม (Interactive Simulator) และปฏิบัติตามกฎเกณฑ์ใน "ค่าเริ่มต้น" (AGENTS.md, CONTEXT.md, DESIGN.md, SKILL.md, task.md) อย่างเคร่งครัด


---

## 📌 1. เป้าหมายปัจจุบัน (Active Objectives)
- [ ] พัฒนาบทเรียนหน่วยการเรียนรู้ย่อย **"หน่วยที่ 5.2 โครงสร้างและการจัดสรร Internet Protocol (IPv4 Address Structure)"** ในระบบ LMS-React

---

## 🔄 2. รายการงานที่กำลังดำเนินการและแผนงานถัดไป (Active Checklist)
- [ ] พัฒนาคอมโพเนนต์ `it5_2.jsx` (ทฤษฎีวิชาการครบทั้ง 6 หัวข้อ + 4 Simulators + 5 Quiz + TeacherTask)
  - [ ] Simulator 1: เครื่องจำลองวิเคราะห์โครงสร้าง IPv4 (IPv4 Header & Bin-to-Dec Converter)
  - [ ] Simulator 2: แผงจำลองเปรียบเทียบประเภท Class-based IPv4 & Private IP Ranges
  - [ ] Simulator 3: เครื่องจำลองตรรกะระดับบิต ANDing (Subnet Mask & Network ID Calculator)
  - [ ] Simulator 4: แผนผังวิชวล Default Gateway Routing & การเปรียบเทียบ IPv4 vs IPv6
- [ ] ทำการทดสอบบิลด์ด้วย `npm run build` เพื่อยืนยันความถูกต้อง 100%

---

## 📝 3. โน้ตส่งมอบงานและบันทึกประวัติ (Handoff Logs)
*(เมื่อแต่ละงาน in Active Checklist ด้านบนทำสำเร็จลุล่วงแล้ว ให้ย้ายเนื้อหามาเขียนสรุปผลไว้ตรงนี้ และนำงานนั้นออกจาก Active Checklist ทันที และถ้างานใหม่เข้ามา ให้แทนที่ประวัติงานเก่าด้วยงานใหม่) (เก็บข้อความนี้ไว้ในทุกๆ ครั้งที่มีการส่งมอบงาน)*

- **หน่วยที่ 5.1 มาตรฐานและแบบจำลองการสื่อสารข้อมูล (it5_1.jsx)** [เสร็จสิ้น - 30/05/2026]
    - พัฒนาเนื้อหาครบทั้ง 5 หัวข้อย่อยทางวิชาการมาตรฐานและแบบจำลองการสื่อสารข้อมูลตามหลักสูตรสากลในรูปแบบไร้กรอบเปิดโปร่งโล่ง (Fluid Open-Air Layout) สวยงามและมีประสิทธิภาพสูงสุด
    - พัฒนา OSI 7-Layer Interactive Inspector Simulator แบบจำลองผ่าแกนวิเคราะห์ OSI 7 ชั้น พร้อมระบบยิงแพ็กเก็ตวิ่งสตรีมไหลขึ้นลงข้ามสายทางกายภาพ ฝั่งส่งทำการห่อหุ้ม (Encapsulate) และฝั่งรับแกะถอดหัว (Decapsulate) แสดง Log สดทางคอนโซล
    - พัฒนา OSI vs TCP/IP Mapping Tool Simulator เครื่องจำลองตรรกะเปรียบเทียบแบบเคียงข้างด้วยผังทางเชื่อมโยง SVG ชี้ตรงศูนย์กลาง (Absolute Center) ไฮไลท์การแมป Application Layer (OSI L7-5 ➔ TCP/IP Application), Transport (OSI L4 ➔ TCP/IP Transport), Internet (OSI L3 ➔ TCP/IP Internet) และ Network Access (OSI L2-1 ➔ TCP/IP Network Access)
    - พัฒนา Data Encapsulation & Decapsulation Lab ห้องปฏิบัติการทดสอบประกอบและแกะห่อซองบิต PDU ของฝั่งส่งและฝั่งรับทีละขั้น สังเกตขนาดและรูปทรงข้อมูลที่ขยายตัว (Data ➔ Segment ➔ Packet ➔ Frame ➔ Bits) พร้อมป้อนข้อความดิบสแกนตรวจสอบได้ไดนามิก
    - พัฒนา Protocol Port Router Board แผงไฟร์วอลล์และสวิตช์ควบคุมระบบกรองพอร์ต Well-known Ports สากล (HTTP 80, HTTPS 443, FTP 20/21, DNS 53, DHCP 67/68, SSH 22, Telnet 23) ผู้ใช้สแกนและตัดสินใจ Drop/Route/Redirect เพื่อขจัดอันตรายความมั่นคงและเสริม XP
    - แนบ Quiz 5 ข้อและภารกิจ TeacherTask ท้ายหน่วย ผ่านการคอมไพล์ build Vite ราบรื่น 100%

- **หน่วยที่ 4.4 สื่อกลางการเชื่อมต่อแบบไร้สาย (it4_4.jsx)** [เสร็จสิ้น - 30/05/2026]
    - พัฒนาเนื้อหาครบทั้ง 5 หัวข้อย่อยทางวิชาการสื่อกลางการเชื่อมต่อแบบไร้สายตามหลักสูตรสากลในรูปแบบไร้กรอบเปิดโปร่งโล่ง (Fluid Open-Air Layout) สวยงามและมีประสิทธิภาพสูงสุด
    - พัฒนา Wireless Spectrum Wave Inspector Simulator เครื่องจำลองวัดสเปกตรัมและคลื่นความถี่วิทยุไร้สาย แสดงผล Sine Wave ทัศนศาสตร์ฟิสิกส์คลื่นวิทยุ, ไมโครเวฟ, และอินฟราเรด สดแบบเรียลไทม์
    - พัฒนา IEEE 802.11 Standards Analyzer Simulator วิเคราะห์มาตรฐานแบนด์วิดท์ช่องสัญญาณ Wi-Fi 4 (n), Wi-Fi 5 (ac), และ Wi-Fi 6 (ax) แสดงความต่างของย่านความถี่ 2.4GHz และ 5GHz ความกว้างช่องสัญญาณ 20MHz ถึง 160MHz และความเสถียรในการใช้งาน
    - พัฒนา Personal Bluetooth Pairing Simulator จำลองเครื่องสแกนและจับคู่พอร์ตอุปกรณ์ WPAN ไร้สายส่วนบุคคล โดยจำลอง Phone ค้นหาและป้อน Passkey PIN 6 หลักเพื่อจำลองการเข้ารหัสและสถาปัตยกรรมบิตของ BT
    - พัฒนา Security Handshake & Antenna polarization Simulator แผงจำลองการแผ่คลื่นเราเตอร์ Omni-directional แบบสไลด์ปรับองศาเสาอากาศ (0 - 90 องศา) เพื่อสังเกต Radiation Pattern คู่ขนานไปกับแผงจำลองกุญแจตรวจสอบสิทธิ์ WPA 4-Way Handshake (ANonce, SNonce, MIC) ของ WPA2 และ WPA3
    - แนบ Quiz 5 ข้อและภารกิจ TeacherTask ท้ายหน่วย ผ่านการคอมไพล์ build Vite ราบรื่น 100%

- **หน่วยที่ 4.3 การเข้าหัวสายสัญญาณ UTP และการทดสอบ (it4_3.jsx)** [เสร็จสิ้น - 30/05/2026]
    - พัฒนาเนื้อหาครบทั้ง 6 หัวข้อย่อยทางวิชาการการเข้าหัวสายสัญญาณ UTP และการทดสอบตามหลักสูตรสากลในรูปแบบไร้กรอบเปิดโปร่งโล่ง (Fluid Open-Air Layout) สวยงามและมีประสิทธิภาพสูงสุด
    - พัฒนา RJ-45 Wire Color Arranger & Checker Simulator บอร์ดจัดเรียงลำดับสีสายไฟ UTP ทั้ง 8 เส้น โดยผู้ใช้สามารถสลับคู่สีของพินและทำการวัดความสอดคล้องตามมาตรฐาน T568A หรือ T568B พร้อมเฉลยลำดับบิตสีสากล Tx/Rx
    - พัฒนา Pinout Wire Matcher Simulator ผังวิชวลแสดงการเชื่อมต่อระหว่าง Side A และ Side B ด้วยเส้น SVG โยงพินอย่างเป็นสมมาตร สามารถเปรียบเทียบตรรกะของสายตรง (Straight-through: T568B ➔ T568B) และสายไขว้ (Crossover: T568B ➔ T568A สลับคู่ 1➔3, 2➔6)
    - พัฒนา Virtual Cable Tester Simulator จำลองเครื่องยิงไฟสแกนพิน LAN คู่ Master และ Remote พร้อมจำลองอาการชำรุด 3 กรณี: การทดสอบผ่านปกติ (Pass), สายพิน 5 ขาดใน (Open Circuit ดับทั้งฝั่งรับส่ง) และเข้าพินคู่ 1 และ 3 สลับพอร์ตกัน (Miswired/Short)
    - พัฒนา Keystone Jack & Punch-Down Lab Simulator ห้องปฏิบัติการจำลอง punch-down สายทองแดงลงเต้ารับพลาสติกตัวเมียทีละสเตป ตั้งแต่การปอกสายไฟ (Strip), การสอดสายคู่สีมาตรฐาน T568B, และกดย้ำด้วย Impact Tool เพื่อยึดและสับทองแดงส่วนเกินทิ้ง
    - แนบ Quiz 5 ข้อและภารกิจ TeacherTask ท้ายหน่วย ผ่านการคอมไพล์ build Vite ราบรื่น 100%

- **หน่วยที่ 4.2 สื่อกลางการเชื่อมต่อแบบใช้สาย (it4_2.jsx)** [เสร็จสิ้น - 30/05/2026]
    - พัฒนาเนื้อหาครบทั้ง 5 หัวข้อย่อยทางวิชาการสื่อกลางการเชื่อมต่อแบบใช้สายตามหลักสูตรสากลในรูปแบบไร้กรอบเปิดโปร่งโล่ง (Fluid Open-Air Layout) สวยงามและมีประสิทธิภาพสูงสุด
    - พัฒนา Twisted Pair Crosstalk & EMI Lab Simulator จำลองสายคู่ตีเกลียวทองแดง 4 คู่ โดยผู้ใช้สามารถปรับระดับ Twist Rate (1-5) และโครงสร้างชีลด์ (UTP vs STP) เพื่อวัดผลลัพธ์ระดับสัญญาณรบกวน (NEXT) และสัญญาณวิทยุ (EMI) ผ่านผังคลื่นไฟฟ้า Oscilloscope สดเรียลไทม์
    - พัฒนา Category Speed & Attenuation Range Meter Simulator จำลองเครื่องวิเคราะห์ระยะลากสายแลน UTP (10m - 150m) โดยคำนวณอัตราเสื่อมสัญญาณตามธรรมชาติไฟฟ้า (Attenuation dB) ควบคู่กับความเร็วแบนด์วิดท์สูงสุด (10 Gbps / 1 Gbps / 100 Mbps) ที่แปรเปลี่ยนตามสาย Cat 5e, Cat 6, และ Cat 6a
    - พัฒนา Coaxial Layer Peeler Anatomy Simulator แผงผ่าแกนปอกเปลือกสายส่งคลื่นสัญญาณวิทยุโคแอกเชียลขนาด 5 ชั้น ให้ผู้เรียนคลิกสัมผัสจิ้มผ่าดูรายละเอียด เคมี หน้าที่และบทบาทตัวนำทองแดงเดี่ยว แกน Insulator, ชีลด์ฟอยล์อลูมิเนียม, ทองแดงถักสกัด RFI และ Jacket หุ้มกายภาพภายนอก
    - พัฒนา Fiber Optic Propagation & Mode Simulator จำลองทัศนศาสตร์การเดินทางของแสงข้ามสายใยแก้วด้วยการสะท้อนกลับหมด (Total Internal Reflection) สังเกตความกว้างแกน Core และสลับโหมด Single-mode (แสงยิงตรงด้วยเลเซอร์, No Dispersion) เทียบกับ Multi-mode (แสงสะท้อนสลับฟันปลาหลายโหมด, Modal Dispersion)
    - แนบ Quiz 5 ข้อและภารกิจ TeacherTask ท้ายหน่วย ผ่านการคอมไพล์ build Vite ราบรื่น 100%

- **หน่วยที่ 4.1 อุปกรณ์เครือข่ายระดับฮาร์ดแวร์พื้นฐาน (it4_1.jsx)** [เสร็จสิ้น - 30/05/2026]
    - พัฒนาเนื้อหาครบทั้ง 7 หัวข้อย่อยทางวิชาการอุปกรณ์เครือข่ายระดับฮาร์ดแวร์พื้นฐานตามหลักสูตรสากลในรูปแบบไร้กรอบเปิดโปร่งโล่ง (Fluid Open-Air Layout) สวยงามและมีประสิทธิภาพสูงสุด
    - พัฒนา MAC Frame Builder & OUI Decoder Simulator จำลองโครงสร้างและถอดรหัสบิตข้อมูล MAC Address ขนาด 48 บิต แสดงสัดส่วน OUI (24 บิตแรก) กับ NIC Specific (24 บิตหลัง) พร้อมการจับคู่ค่ายแบรนด์ผู้ผลิตระดับสากล และการสลักบิต Ethernet II Frame
    - พัฒนา Hub Broadcast & CSMA/CD Collision Simulator จำลองระบบบัสร่วมพอร์ตทางกายภาพ แสดงวิชวลการกระจายข้อมูล (Flooding/Broadcast) ไปทุกเครื่อง และจำลองสัญญาณชนกันในระดับบัสที่ต้องใช้โปรโตคอล CSMA/CD ในการสั่ง Jam Signal และสุ่มถอยเวลาพิมพ์ (Random Backoff)
    - พัฒนา Switch MAC Address Table Learning Lab Simulator จำลองตาราง Dynamic CAM Table เรียนรู้พอร์ตพิกัดและจดจำ MAC Address ปลายทาง แสดงกระบวนการส่งต่อข้อมูลแบบเจาะจงรายพอร์ต (Unicast) เพื่อขจัด Collision Domain ข้ามช่องสัญญาณ
    - พัฒนา Router Routing Table & NAT Gateway Simulator จำลองสะพานเชื่อมข้าม Subnet ด้วยไอพีแอดเดรส (Layer 3) แสดงวิชวลการตรวจสอบหัวโครงสร้าง IP Header (Source/Destination IP), การลดค่า TTL และการแปลงหมายเลข Private IP ➔ Public WAN IP (NAT Gateway)
    - พัฒนา Triple Integrated Network Lab (WAP Wifi Attenuation, Hardware Firewall rules ACL & Modem Modulation Wave) แผงควบคุมร่วม 3 มิติย่อย แสดงความแรงสัญญาณ WiFi เสื่อมถอยข้ามสิ่งกีดขวางชนิดวัสดุและย่านความถี่, ระบบตั้งสิทธิ์ตัวกรองข้อมูล Firewall ACL และกราฟคณิตศาสตร์ Sine Wave จำลองการแปลงสัญญาณอนาล็อก (Modulation ASK/FSK/PSK)
    - แนบ Quiz 5 ข้อและภารกิจ TeacherTask ท้ายหน่วย ผ่านการคอมไพล์ build Vite ราบรื่น 100%

