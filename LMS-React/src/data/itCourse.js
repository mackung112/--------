const itCourse = {
    id: "31910-0001",
    title: "ระบบปฏิบัติการ บำรุงรักษา และเครือข่ายคอมพิวเตอร์เบื้องต้น",
    description: "ศึกษาและปฏิบัติเกี่ยวกับองค์ประกอบคอมพิวเตอร์เชิงลึก การประกอบชิ้นส่วน การติดตั้งระบบปฏิบัติการ ไดรเวอร์ อุปกรณ์และสื่อกลางเครือข่าย การตั้งค่า IP Address ซับเน็ตติ้ง การบำรุงรักษาเชิงป้องกัน และทักษะวิเคราะห์แก้ปัญหาการทำงานของคอมพิวเตอร์และระบบเครือข่ายระดับสากล",
    icon: "💻",
    chapters: [
        {
            id: 1,
            title: "หน่วยที่ 1 พื้นฐานระบบคอมพิวเตอร์และเครือข่าย",
            lessons: [
                {
                    id: "1.1",
                    title: "1.1 องค์ประกอบของระบบคอมพิวเตอร์เชิงลึก",
                    mainTitle: "องค์ประกอบของระบบคอมพิวเตอร์เชิงลึก",
                    subTitle: "(Computer System Architecture & Components)",
                    description: "เจาะลึกความหมาย หน้าที่ และบทบาทของระบบคอมพิวเตอร์ ร่วมถึงการทำความเข้าใจฮาร์ดแวร์ ซอฟต์แวร์ บุคลากร ข้อมูล และอุตสาหกรรมยุคดิจิทัล 4.0",
                    content: "[it1_1]"
                },
                {
                    id: "1.2",
                    title: "1.2 ความรู้เบื้องต้นเกี่ยวกับระบบเครือข่ายคอมพิวเตอร์",
                    mainTitle: "ความรู้เบื้องต้นเกี่ยวกับระบบเครือข่ายคอมพิวเตอร์",
                    subTitle: "(Introduction to Computer Networks)",
                    description: "ความหมายและวัตถุประสงค์หลักของเครือข่าย องค์ประกอบ 5 ส่วนของการสื่อสารข้อมูล ประโยชน์การแชร์ทรัพยากร และต้นทุนความเสี่ยงในระบบ",
                    content: "[it1_2]"
                },
                {
                    id: "1.3",
                    title: "1.3 ประเภทและโครงสร้างของระบบเครือข่าย",
                    mainTitle: "ประเภทและโครงสร้างของระบบเครือข่าย",
                    subTitle: "(Types & Architectures of Networks)",
                    description: "จำแนกเครือข่ายตามระยะทาง (PAN, LAN, MAN, WAN) เปรียบเทียบสถาปัตยกรรมเครือข่ายแบบ Client-Server และ Peer-to-Peer รวมถึงเครือข่าย Intranet/Extranet/Internet",
                    content: "[it1_3]"
                },
                {
                    id: "1.4",
                    title: "1.4 รูปแบบการเชื่อมต่อเครือข่าย (Network Topology)",
                    mainTitle: "รูปแบบการเชื่อมต่อเครือข่าย (Network Topology)",
                    subTitle: "(Network Topologies)",
                    description: "เจาะลึก Topology แบบ Bus, Star, Ring, Mesh และ Hybrid วิเคราะห์ข้อดี ข้อเสีย และข้อจำกัดความเหมาะสมในการเชื่อมต่อติดตั้งจริงในองค์กร",
                    content: "[it1_4]"
                }
            ]
        },
        {
            id: 2,
            title: "หน่วยที่ 2 ฮาร์ดแวร์และการประกอบคอมพิวเตอร์",
            lessons: [
                {
                    id: "2.1",
                    title: "2.1 เจาะลึกอุปกรณ์และชิ้นส่วนคอมพิวเตอร์",
                    mainTitle: "เจาะลึกอุปกรณ์และชิ้นส่วนคอมพิวเตอร์",
                    subTitle: "(Hardware Components)",
                    description: "ทำความเข้าใจหน้าที่และสเปคของ CPU, Motherboard, RAM, Storage, PSU, GPU รวมถึงเคสคอมพิวเตอร์และชนิดจอภาพแบบละเอียด",
                    content: "[it2_1]"
                },
                {
                    id: "2.2",
                    title: "2.2 เครื่องมือและข้อควรระวังในการประกอบและซ่อมบำรุง",
                    mainTitle: "เครื่องมือและข้อควรระวังในการประกอบและซ่อมบำรุง",
                    subTitle: "(Assembly Tools & Safety)",
                    description: "เรียนรู้เครื่องมือช่างคอมพิวเตอร์ขั้นพื้นฐาน ความเป็นอันตรายของไฟฟ้าสถิต (ESD) วิธีการป้องกัน และข้อควรระวังด้านความปลอดภัยต่อตนเองและฮาร์ดแวร์",
                    content: "[it2_2]"
                },
                {
                    id: "2.3",
                    title: "2.3 ขั้นตอนการประกอบคอมพิวเตอร์อย่างเป็นระบบ",
                    mainTitle: "ขั้นตอนการประกอบคอมพิวเตอร์อย่างเป็นระบบ",
                    subTitle: "(Step-by-Step Computer Assembly)",
                    description: "เรียนรู้คู่มือประกอบคอมพิวเตอร์ทีละขั้นตอนอย่างเป็นระบบ ตั้งแต่การเตรียมเคส ติดตั้ง CPU, RAM, Storage, เมนบอร์ด เดินสายไฟ เลย์เอาต์แผงหน้าเคส และการจัดระเบียบสายสัญญาณ",
                    content: "[it2_3]"
                },
                {
                    id: "2.4",
                    title: "2.4 การตรวจสอบและทดสอบระบบเบื้องต้น",
                    mainTitle: "การตรวจสอบและทดสอบระบบเบื้องต้น",
                    subTitle: "(Initial Post-Assembly Testing)",
                    description: "กระบวนการ Power-On Self-Test (POST) การแปลเสียง Beep Code และไฟ LED สลักหน้าจอ ตรวจสุขภาพอุปกรณ์ใน UEFI/BIOS รวมถึงเปิดแรมความเร็วสูง XMP/EXPO",
                    content: "[it2_4]"
                }
            ]
        },
        {
            id: 3,
            title: "หน่วยที่ 3 ระบบปฏิบัติการและการติดตั้ง",
            lessons: [
                {
                    id: "3.1",
                    title: "3.1 สถาปัตยกรรมและหลักการทำงานของระบบปฏิบัติการ",
                    mainTitle: "สถาปัตยกรรมและหลักการทำงานของระบบปฏิบัติการ",
                    subTitle: "(OS Architecture & Concepts)",
                    description: "บทบาทหน้าที่ของ OS ส่วนประกอบ Kernel/Shell/UI ระบบการจัดการ 4 ด้าน สถาปัตยกรรม 32-bit vs 64-bit และเปรียบเทียบ OS ตระกูลต่างๆ",
                    content: "[it3_1]"
                },
                {
                    id: "3.2",
                    title: "3.2 การเตรียมการก่อนติดตั้งระบบปฏิบัติการ",
                    mainTitle: "การเตรียมการก่อนติดตั้งระบบปฏิบัติการ",
                    subTitle: "(Pre-installation Preparation)",
                    description: "วิเคราะห์ System Requirements การทำตัวติดตั้งบูต USB (Rufus) เรียนรู้ระบบไฟล์ FAT32/NTFS/exFAT ความแตกต่างของตารางพาร์ติชัน MBR/GPT และลิขสิทธิ์สิทธิ์ประเภทต่างๆ",
                    content: "[it3_2]"
                },
                {
                    id: "3.3",
                    title: "3.3 กระบวนการติดตั้งระบบปฏิบัติการและตั้งค่าพื้นฐาน",
                    mainTitle: "กระบวนการติดตั้งระบบปฏิบัติการและตั้งค่าพื้นฐาน",
                    subTitle: "(Operating System Installation)",
                    description: "ขั้นตอนปฏิบัติในการติดตั้ง Windows OS แบบ Clean Install การลบ แบ่ง และสร้างพาร์ติชัน การตั้งค่าเริ่มต้นช่วง OOBE ความแตกต่าง Local กับ Microsoft Account",
                    content: "[it3_3]"
                },
                {
                    id: "3.4",
                    title: "3.4 การจัดการไดรเวอร์และการอัปเดต",
                    mainTitle: "การจัดการไดรเวอร์และการอัปเดต",
                    subTitle: "(Device Drivers & System Update)",
                    description: "ความสำคัญและหน้าที่ของไดรเวอร์ วิธีตรวจสอบอุปกรณ์ที่ไม่มีไดรเวอร์ผ่าน Device Manager การติดตั้งไดรเวอร์และระบบความปลอดภัยผ่าน Windows Update",
                    content: "[it3_4]"
                }
            ]
        },
        {
            id: 4,
            title: "หน่วยที่ 4 อุปกรณ์และสื่อกลางในระบบเครือข่าย",
            lessons: [
                {
                    id: "4.1",
                    title: "4.1 อุปกรณ์เครือข่ายระดับฮาร์ดแวร์พื้นฐาน",
                    mainTitle: "อุปกรณ์เครือข่ายระดับฮาร์ดแวร์พื้นฐาน",
                    subTitle: "(Network Devices & Hardware)",
                    description: "เจาะลึก NIC, Hub, Repeater, Switch, Router, AP, Firewall, Modem หน้าที่และสเปคการนำใช้งานเบื้องต้น",
                    content: "[it4_1]"
                },
                {
                    id: "4.2",
                    title: "4.2 สื่อกลางการเชื่อมต่อแบบใช้สาย",
                    mainTitle: "สื่อกลางการเชื่อมต่อแบบใช้สาย",
                    subTitle: "(Wired Transmission Media)",
                    description: "ทฤษฎีสายคู่เกลียว UTP/STP, หมวดหมู่สาย UTP (Cat5e/6/6a), สาย Coaxial และสายใยแก้วนำแสง (Fiber Optic) ทั้ง Single-mode และ Multi-mode",
                    content: "[it4_2]"
                },
                {
                    id: "4.3",
                    title: "4.3 การเข้าหัวสายสัญญาณ UTP และการทดสอบ",
                    mainTitle: "การเข้าหัวสายสัญญาณ UTP และการทดสอบ",
                    subTitle: "(RJ-45 Crimping & Testing)",
                    description: "การจัดระเบียบเรียงสีตามมาตรฐาน EIA/TIA 568A และ 568B ขั้นตอนและทักษะปฏิบัติเข้าหัวแบบสายตรง (Straight-through), สายไขว้ (Crossover), Keystone Jack และ Patch Panel",
                    content: "[it4_3]"
                },
                {
                    id: "4.4",
                    title: "4.4 สื่อกลางการเชื่อมต่อแบบไร้สาย",
                    mainTitle: "สื่อกลางการเชื่อมต่อแบบไร้สาย",
                    subTitle: "(Wireless Transmission Media)",
                    description: "คลื่นวิทยุ ไมโครเวฟ อินฟราเรด มาตรฐาน IEEE 802.11 (Wi-Fi 4/5/6), เทคโนโลยี Bluetooth และระบบความปลอดภัยไร้สาย WEP/WPA/WPA2/WPA3",
                    content: "[it4_4]"
                }
            ]
        },
        {
            id: 5,
            title: "หน่วยที่ 5 การบำรุงรักษาและการใช้โปรแกรมอรรถประโยชน์",
            lessons: [
                {
                    id: "5.1",
                    title: "5.1 การใช้โปรแกรมอรรถประโยชน์สำหรับระบบและไฟล์",
                    mainTitle: "การใช้โปรแกรมอรรถประโยชน์สำหรับระบบและไฟล์",
                    subTitle: "(Utility Programs)",
                    description: "ความหมายซอฟต์แวร์ยูทิลิตี้ การจัดการบีบอัดไฟล์ (7-Zip) ล้างไฟล์ขยะระบบ (Disk Cleanup) การจัดระเบียบเศษไฟล์ข้อมูล (Defrag) และการกู้ระบบผ่าน sfc / chkdsk",
                    content: "[it5_1]"
                },
                {
                    id: "5.2",
                    title: "5.2 การรักษาความปลอดภัย การสำรอง และการกู้คืนข้อมูล",
                    mainTitle: "การรักษาความปลอดภัย การสำรอง และการกู้คืนข้อมูล",
                    subTitle: "(Data Security & Backup)",
                    description: "ภัยคุกคามไซเบอร์ สแกนกำจัดไวรัส (Windows Defender) กฎสำรองข้อมูล 3-2-1 การสร้าง Restore Point การใช้งานกู้คืนไฟล์ข้อมูล และลิขสิทธิ์สิทธิ์ พ.ร.บ.คอมพิวเตอร์",
                    content: "[it5_2]"
                },
                {
                    id: "5.3",
                    title: "5.3 การบำรุงรักษาฮาร์ดแวร์คอมพิวเตอร์เชิงป้องกัน",
                    mainTitle: "การบำรุงรักษาฮาร์ดแวร์คอมพิวเตอร์เชิงป้องกัน",
                    subTitle: "(Preventive Maintenance)",
                    description: "ขอบข่ายงานบำรุงรักษาเชิงป้องกันคอมพิวเตอร์สำนักงาน การทำความสะอาดภายนอกและเป่ากำจัดฝุ่นละอองภายใน การใช้ S.M.A.R.T ตรวจสอบดิสก์ และบำรุงรักษาเครื่องพิมพ์",
                    content: "[it5_3]"
                },
                {
                    id: "5.4",
                    title: "5.4 การเฝ้าระวังและวิเคราะห์ประสิทธิภาพระบบ",
                    mainTitle: "การเฝ้าระวังและวิเคราะห์ประสิทธิภาพระบบ",
                    subTitle: "(System & Network Monitoring)",
                    description: "การตรวจเช็คทรัพยากรผ่าน Task Manager / Resource Monitor ตรรกะโปรแกรมตรวจสอบ Advanced IP Scanner / Wireshark และการตรวจบันทึก Log Event Viewer",
                    content: "[it5_4]"
                }
            ]
        },
        {
            id: 6,
            title: "หน่วยที่ 6 การวิเคราะห์ สรุปปัญหา และจัดทำรายงาน",
            lessons: [
                {
                    id: "6.1",
                    title: "6.1 กระบวนการวิเคราะห์และแก้ไขปัญหาอย่างเป็นระบบ",
                    mainTitle: "กระบวนการวิเคราะห์และแก้ไขปัญหาอย่างเป็นระบบ",
                    subTitle: "(Systematic Troubleshooting Methodology)",
                    description: "ขั้นตอนการแก้ไขปัญหา 6 สเตปตามมาตรฐานสากล เทคนิคสัมภาษณ์ผู้ใช้ การแยกลักษณะปัญหา ความหมาย Error/Debug LED/Beep Code และการวิเคราะห์ Configuration Changes",
                    content: "[it6_1]"
                },
                {
                    id: "6.2",
                    title: "6.2 การวิเคราะห์และแก้ไขปัญหาระบบเครือข่าย",
                    mainTitle: "การวิเคราะห์และแก้ไขปัญหาระบบเครือข่าย",
                    subTitle: "(Network Troubleshooting)",
                    description: "แก้ไขปัญหาเครือข่ายเชิงกายภาพแลน การตรวจแก้ไข IP ชน การหลุดแจกไอพี APIPA ใช้ nslookup, netstat, arp ตรวจสอบเซิร์ฟเวอร์ และแก้ไขสิทธิ์ SMB",
                    content: "[it6_2]"
                },
                {
                    id: "6.3",
                    title: "6.3 การแก้ไขปัญหาอุปกรณ์ต่อพ่วงและการใช้แหล่งข้อมูลช่วยเหลือ",
                    mainTitle: "การแก้ไขปัญหาอุปกรณ์ต่อพ่วงและการใช้แหล่งข้อมูลช่วยเหลือ",
                    subTitle: "(Peripherals Troubleshooting)",
                    description: "แก้ปัญหา Print Spooler ค้าง การอ้างอิงและเปิด Service Manuals ค้นหา Support Forums ช่างเทคนิค และประยุกต์ใช้ AI วินิจฉัยจุดบกพร่องระบบอัตโนมัติ",
                    content: "[it6_3]"
                },
                {
                    id: "6.4",
                    title: "6.4 การจัดการเอกสาร การบันทึกประวัติ และจัดทำรายงาน",
                    mainTitle: "การจัดการเอกสาร การบันทึกประวัติ และจัดทำรายงาน",
                    subTitle: "(IT Maintenance Report & Inventory)",
                    description: "ลงทะเบียนประวัติซ่อมและคลังจัดเก็บ (Asset Logs) การทำใบงานแจ้งซ่อม IT Ticketing System การเขียนสรุปรายงาน RCA และจัดทำคู่มือสั้นพนักงาน (User Self-Help Guide)",
                    content: "[it6_4]"
                }
            ]
        }
    ]
};

export default itCourse;
