const pyCourse = {
    id: "21910-1003",
    title: "การเขียนโปรแกรมคอมพิวเตอร์เบื้องต้น",
    description: "ศึกษาและปฏิบัติเกี่ยวกับหลักการเขียนโปรแกรมคอมพิวเตอร์ การแก้ปัญหา การวิเคราะห์ปัญหา การกำหนดขั้นตอนการทำงาน (Algorithm) การเขียนรหัสเทียม (Pseudocode) และปฏิบัติการเขียนโปรแกรมด้วยภาษา Python",
    icon: "🐍",
    chapters: [
        {
            id: 1,
            title: "หน่วยที่ 1 หลักการเขียนโปรแกรมเบื้องต้น",
            lessons: [
                { 
                    id: "1.1", 
                    title: "1.1 แนะนำภาษาคอมพิวเตอร์และโปรแกรม", 
                    mainTitle: "แนะนำภาษาคอมพิวเตอร์และโปรแกรม",
                    description: "ครอบคลุมหัวข้อ: ความหมายและองค์ประกอบของภาษาคอมพิวเตอร์, ประวัติและวิวัฒนาการของภาษาคอมพิวเตอร์ | ทำความรู้จักกับภาษาคอมพิวเตอร์ โปรแกรมคืออะไร และทำไมเราถึงต้องเขียนโปรแกรมเพื่อสั่งงานคอมพิวเตอร์",
                    subTitle: "(Introduction to Programming)",
                    content: "[pyUnit1_1_ProgramMeaning]" 
                },
                { 
                    id: "1.2", 
                    title: "1.2 ระดับของภาษาคอมพิวเตอร์", 
                    mainTitle: "ระดับของภาษาคอมพิวเตอร์",
                    description: "ครอบคลุมหัวข้อ: ภาษาระดับต่ำ (Low-level Language), ภาษาระดับสูง (High-level Language) | เรียนรู้วิวัฒนาการและความแตกต่างระหว่างภาษาเครื่อง (Machine Language), ภาษาระดับต่ำ (Low-level), และภาษาระดับสูง (High-level)",
                    subTitle: "(Levels of Programming Languages)",
                    content: "[pyUnit1_2_LanguageLevels]" 
                },
                { 
                    id: "1.3", 
                    title: "1.3 Interpreter vs Compiler", 
                    mainTitle: "Interpreter vs Compiler",
                    subTitle: "(Interpreter vs Compiler)",
                    description: "ครอบคลุมหัวข้อ: หลักการทำงานและข้อดีข้อเสียของ Interpreter, หลักการทำงานและข้อดีข้อเสียของ Compiler | เปรียบเทียบการทำงานของตัวแปลภาษาแบบ Interpreter ที่แปลทีละบรรทัด และ Compiler ที่แปลรวดเดียวทั้งโปรแกรม",
                    content: "[pyUnit1_3_TranslatorCompare]" 
                },
                { 
                    id: "1.4", 
                    title: "1.4 จุดเด่นของภาษา Python", 
                    mainTitle: "จุดเด่นของภาษา Python",
                    description: "ครอบคลุมหัวข้อ: ลักษณะเด่นและไวยากรณ์พื้นฐาน, ตัวอย่างการประยุกต์ใช้งานในปัจจุบัน | ค้นหาคำตอบว่าทำไมภาษา Python ถึงได้รับความนิยมสูงสุดในปัจจุบัน และถูกนำไปใช้งานในด้านใดบ้าง",
                    subTitle: "(Features of Python)",
                    content: "[pyUnit1_4_PythonTimeline]" 
                },
                { 
                    id: "1.5", 
                    title: "1.5 การติดตั้ง Python และ IDE", 
                    mainTitle: "การติดตั้ง Python และ IDE",
                    subTitle: "(Python & IDE Setup)",
                    description: "ครอบคลุมหัวข้อ: การดาวน์โหลดและติดตั้งตัวแปรภาษา Python, การติดตั้งและใช้งาน IDE | ขั้นตอนการเตรียมเครื่องมือให้พร้อมก่อนเริ่มเขียนโปรแกรมจริง ด้วยการติดตั้ง Python และโปรแกรมเขียนโค้ด (IDE)",
                    content: "[pyUnit1_5_SetupGuide]" 
                }
            ]
        },
        {
            id: 2,
            title: "หน่วยที่ 2 ขั้นตอนการเขียนโปรแกรม",
            lessons: [
                {
                    id: "2.1",
                    title: "2.1 แนวคิดและอัลกอริทึม",
                    mainTitle: "แนวคิดและอัลกอริทึม",
                    subTitle: "(Concepts & Algorithms)",
                    description: "ครอบคลุมหัวข้อ: ความหมายของอัลกอริทึม, ขั้นตอนและกระบวนการแก้ปัญหา | อัลกอริทึม (Algorithm) หมายถึง <strong>ลำดับขั้นตอนที่ชัดเจนและแน่นอนในการแก้ปัญหา</strong> หรือทำงานอย่างใดอย่างหนึ่งให้สำเร็จ โดยมีจุดเริ่มต้น มีขั้นตอนที่จำกัด และมีจุดสิ้นสุดที่ชัดเจน ซึ่งเป็นพื้นฐานสำคัญที่สุดก่อนเริ่มเขียนโค้ดจริง",
                    content: `[pyUnit2_1_AlgorithmFlowchart]<div class="note">💡 <strong>สรุป</strong>: อัลกอริทึมคือหัวใจของการเขียนโปรแกรม ก่อนเขียนโค้ดสักบรรทัด ต้องคิดลำดับขั้นตอนให้ชัดก่อนเสมอ!</div>`
                },
                {
                    id: "2.2",
                    title: "2.2 วงจรการพัฒนาซอฟต์แวร์ (SDLC)",
                    mainTitle: "วงจรการพัฒนาซอฟต์แวร์",
                    subTitle: "(Software Development Life Cycle)",
                    description: "ครอบคลุมหัวข้อ: ความหมายและความสำคัญของ SDLC, ระยะต่างๆ ในวงจรการพัฒนาซอฟต์แวร์, ตัวอย่างการใช้งาน วงจรการพัฒนาซอฟต์แวร์ (SDLC) | การพัฒนาโปรแกรมที่ดีต้องมีกระบวนการที่เป็นระบบ ซึ่งเรียกว่า <strong>SDLC</strong> ประกอบด้วย 6 ขั้นตอนหลัก",
                    content: `[pyUnit2_2_SDLC]<div class="note">💡 SDLC = วิเคราะห์ → ออกแบบ → พัฒนา → ทดสอบ → ติดตั้ง → บำรุงรักษา</div>`
                },
                {
                    id: "2.3",
                    title: "2.3 สัญลักษณ์ผังงาน (Flowchart)",
                    mainTitle: "สัญลักษณ์ผังงาน",
                    subTitle: "(Flowchart Symbols)",
                    description: "ครอบคลุมหัวข้อ: สัญลักษณ์มาตรฐานสากล (ANSI), ความหมายและการนำสัญลักษณ์ไปใช้งาน | ผังงาน (Flowchart) ใช้สัญลักษณ์มาตรฐานตาม ISO 5807 เพื่อแสดงลำดับขั้นตอนการทำงาน กดที่สัญลักษณ์เพื่อเรียนรู้!",
                    content: `[pyUnit2_3_FlowchartSymbols]<div class="note">💡 การจำสัญลักษณ์: วงรี = เริ่ม/จบ, สี่เหลี่ยม = ประมวลผล, เพชร = ตัดสินใจ, ด้านขนาน = I/O</div>`
                },
                {
                    id: "2.4",
                    title: "2.4 ผังงานแบบเรียงลำดับ",
                    mainTitle: "ผังงานแบบเรียงลำดับ",
                    subTitle: "(Sequential Flowchart)",
                    description: "ครอบคลุมหัวข้อ: แนวคิดการทำงานแบบลำดับจากบนลงล่าง, ตัวอย่างการเขียนผังงานแบบเรียงลำดับ | โครงสร้างพื้นฐานที่สุด — คำสั่งทำงานจากบนลงล่าง ไม่มีเงื่อนไข ไม่มีการวนซ้ำ",
                    content: `[pyUnit2_4_SequenceFlowchart]<div class="note">💡 โปรแกรมคำนวณพื้นที่วงกลมคือตัวอย่างที่ดีของผังงานแบบ Sequence</div>`
                },
                {
                    id: "2.5",
                    title: "2.5 ผังงานแบบเลือกทำ",
                    mainTitle: "ผังงานแบบมีทางเลือก",
                    subTitle: "(Selection Flowchart)",
                    description: "ครอบคลุมหัวข้อ: แนวคิดการตัดสินใจและเงื่อนไข, ตัวอย่างการเขียนผังงานแบบเลือกทำ | ใช้เมื่อต้องตัดสินใจ — ผลลัพธ์จะแยกเป็น 2 ทาง (Yes/No) ตามเงื่อนไขที่กำหนด",
                    content: `[pyUnit2_5_SelectionFlowchart]<div class="note">💡 สัญลักษณ์เพชร (◇) คือหัวใจของผังงานแบบ Selection</div>`
                },
                {
                    id: "2.6",
                    title: "2.6 ผังงานแบบวนซ้ำ",
                    mainTitle: "ผังงานแบบวนซ้ำ",
                    subTitle: "(Iteration Flowchart)",
                    description: "ครอบคลุมหัวข้อ: แนวคิดการทำงานซ้ำตามเงื่อนไข, ตัวอย่างการเขียนผังงานแบบวนซ้ำ | ใช้เมื่อต้องทำงานซ้ำๆ จนกว่าเงื่อนไขจะเป็นเท็จ ลองจำลองการหาผลรวม 1 ถึง N",
                    content: `[pyUnit2_6_IterationFlowchart]<div class="note">💡 Loop ที่ดีต้องมี 3 อย่าง: ค่าเริ่มต้น, เงื่อนไขหยุด, และการเปลี่ยนค่า</div>`
                },
                {
                    id: "2.7",
                    title: "2.7 หลักการเขียนผังงานที่ดี",
                    mainTitle: "หลักการเขียนผังงานที่ดี",
                    subTitle: "(Flowchart Best Practices)",
                    description: "ครอบคลุมหัวข้อ: กฎเกณฑ์และข้อกำหนดในการเขียน, ข้อควรระวังและข้อผิดพลาดที่พบบ่อย | ผังงานที่ดีต้องอ่านง่าย ชัดเจน และเป็นมาตรฐาน ลองดูข้อเปรียบเทียบ",
                    content: `[pyUnit2_7_FlowchartBestPractice]<div class="note">💡 ผังงานที่ดี = START/STOP ชัดเจน + สัญลักษณ์ถูกต้อง + เส้นไม่ตัดกัน</div>`
                },
                {
                    id: "2.8",
                    title: "2.8 การเขียนรหัสเทียม (Pseudocode)",
                    mainTitle: "การเขียนรหัสเทียม",
                    subTitle: "(Writing Pseudocode)",
                    description: "ครอบคลุมหัวข้อ: ความหมายและประโยชน์ของรหัสเทียม, หลักการเขียนรหัสเทียมเบื้องต้น | รหัสเทียมคือการเขียนขั้นตอนวิธีด้วยภาษาที่คล้ายโค้ด แต่ไม่ผูกกับภาษาใดภาษาหนึ่ง เปรียบเทียบกับ Python จริงได้เลย",
                    content: `[pyUnit2_8_PseudocodeIntro]<div class="note">💡 ใช้คำกริยาที่เป็นกลาง เช่น READ, COMPUTE, PRINT แทนคำสั่งเฉพาะภาษา</div>`
                },
                {
                    id: "2.9",
                    title: "2.9 คำสั่งพื้นฐานในรหัสเทียม",
                    mainTitle: "คำสั่งพื้นฐานในรหัสเทียม",
                    subTitle: "(Basic Pseudocode Commands)",
                    description: "ครอบคลุมหัวข้อ: คำสั่งรับและแสดงผลข้อมูล (Input/Output), คำสั่งคำนวณและกำหนดค่า (Process) | คำหลักเป็นคำที่มีหน้าที่ชัดเจนในรหัสเทียม กดเพื่อดูรายละเอียดและตัวอย่าง",
                    content: `[pyUnit2_9_PseudocodeKeywords]<div class="note">💡 คำหลักช่วยให้รหัสเทียมเป็นมาตรฐาน อ่านเข้าใจตรงกันทุกคน</div>`
                },
                {
                    id: "2.10",
                    title: "2.10 รหัสเทียมแบบมีเงื่อนไข",
                    mainTitle: "รหัสเทียมแบบมีเงื่อนไข",
                    subTitle: "(Conditional Pseudocode)",
                    description: "ครอบคลุมหัวข้อ: รูปแบบคำสั่ง IF-THEN-ELSE, การเขียนเงื่อนไขซ้อนทับ (Nested IF) | เมื่อต้องตัดสินใจ ให้ใช้โครงสร้าง IF...THEN...ELSE ลองเปลี่ยนค่าเพื่อดูผล",
                    content: `[pyUnit2_10_PseudocodeCondition]<div class="note">💡 IF-THEN-ELSE ในรหัสเทียม ต้องปิดด้วย ENDIF เสมอ</div>`
                },
                {
                    id: "2.11",
                    title: "2.11 รหัสเทียมแบบวนซ้ำ",
                    mainTitle: "รหัสเทียมแบบวนซ้ำ",
                    subTitle: "(Looping Pseudocode)",
                    description: "ครอบคลุมหัวข้อ: รูปแบบคำสั่ง WHILE และ FOR, การกำหนดจุดสิ้นสุดการวนซ้ำ | ใช้ WHILE...DO เมื่อต้องทำงานซ้ำ ลองรันดูว่าแต่ละรอบเกิดอะไรขึ้น",
                    content: `[pyUnit2_11_PseudocodeLoop]<div class="note">💡 WHILE-DO ในรหัสเทียม ต้องปิดด้วย ENDWHILE เสมอ</div>`
                },
                {
                    id: "2.12",
                    title: "2.12 การจัดโครงสร้างรหัสเทียม",
                    mainTitle: "การจัดโครงสร้างรหัสเทียม",
                    subTitle: "(Pseudocode Structuring)",
                    description: "ครอบคลุมหัวข้อ: การย่อหน้า (Indentation) เพื่อความชัดเจน, การเขียนหมายเหตุ (Comment) ในรหัสเทียม | การย่อหน้า (Indentation) ช่วยแสดงโครงสร้างลำดับชั้นของรหัสเทียม ลองจัดให้ถูกต้อง!",
                    content: `[pyUnit2_12_PseudocodeFormat]<div class="note">💡 บรรทัดที่อยู่ภายใน IF หรือ WHILE ต้องย่อเข้าไป 1 ระดับเสมอ</div>`
                }
            ]
        },
        {
            id: 3,
            title: "หน่วยที่ 3 โครงสร้างพื้นฐานของภาษา Python",
            lessons: [
                {
                    id: "3.1",
                    title: "3.1 โครงสร้างโค้ด Python",
                    mainTitle: "ส่วนประกอบของโปรแกรม",
                    description: "ครอบคลุมหัวข้อ: รูปแบบคำสั่งและไวยากรณ์เบื้องต้น, การเว้นวรรคและย่อหน้า (Indentation) | มาดูกันว่าโปรแกรม Python หนึ่งโปรแกรมประกอบด้วยอะไรบ้าง และมีการแบ่งแยกประเภทข้อมูลเบื้องต้นอย่างไร",
                    subTitle: "(Python Code Structure)",
                    content: `[pyUnit3_1_PythonStructure]<div class="note">💡 โครงสร้างที่ดีช่วยให้โปรแกรมอ่านง่ายและจัดการง่ายขึ้น</div>`
                },
                {
                    id: "3.2",
                    title: "3.2 กฎการตั้งชื่อตัวแปร",
                    mainTitle: "กฎการตั้งชื่อตัวแปร",
                    description: "ครอบคลุมหัวข้อ: หลักเกณฑ์และข้อห้ามในการตั้งชื่อ, คำสงวน (Reserved words) ในภาษา Python | การตั้งชื่อตัวแปร in Python มีกฎและข้อควรระวัง ลองเรียนรู้และดูตัวอย่างที่ถูกต้อง",
                    subTitle: "(Variable Naming Rules)",
                    content: `[pyUnit3_2_NamingConvention]<div class="note">💡 กฎเหล็ก: ห้ามขึ้นต้นด้วยตัวเลข และห้ามใช้คำสงวน!</div>`
                },
                {
                    id: "3.3",
                    title: "3.3 ข้อมูลจำนวนเต็ม (Integer)",
                    mainTitle: "ชนิดข้อมูลจำนวนเต็ม",
                    subTitle: "(Integer Data Type)",
                    description: "ครอบคลุมหัวข้อ: ลักษณะของข้อมูลประเภทจำนวนเต็ม, การแปลงชนิดข้อมูลจำนวนเต็ม | ใช้เก็บตัวเลขที่ไม่มีทศนิยม เช่น 1, -5, 1000 ลองคำนวณพื้นฐานได้เลย",
                    content: `[pyUnit3_3_IntegerExplorer]<div class="note">💡 Python โชคดีตรงที่จำนวนเต็มไม่มีขีดจำกัดขนาด (Limit) เก็บเลขใหญ่แค่ไหนก็ได้ตราบที่ RAM พอ!</div>`
                },
                {
                    id: "3.4",
                    title: "3.4 ข้อมูลทศนิยม (Float)",
                    mainTitle: "ชนิดข้อมูลทศนิยม",
                    subTitle: "(Float Data Type)",
                    description: "ครอบคลุมหัวข้อ: ลักษณะของข้อมูลประเภททศนิยม, ความแม่นยำและการปัดเศษทศนิยม | ใช้เก็บตัวเลขที่มีจุดทศนิยม เช่น 3.14, -0.5 ลองทดสอบความแม่นยำของมันดู",
                    content: `[pyUnit3_4_FloatExplorer]<div class="note">💡 ระวัง: การคำนวณทศนิยมบางครั้งอาจเกิดความคลาดเคลื่อนเล็กน้อย (Floating Point Error)</div>`
                },
                {
                    id: "3.5",
                    title: "3.5 ข้อมูลข้อความ (String)",
                    mainTitle: "ชนิดข้อมูลข้อความ",
                    subTitle: "(String Data Type)",
                    description: "ครอบคลุมหัวข้อ: การประกาศตัวแปรและกำหนดค่าข้อความ, การเชื่อมต่อและการคัดลอกข้อความ | ใช้เก็บตัวอักษร ข้อความ ครอบด้วย \"\" หรือ '' ก็ได้ ลองใช้ Method ต่างๆ จัดการข้อความ",
                    content: `[pyUnit3_5_StringExplorer]<div class="note">💡 String ใน Python สามารถดึงข้อมูลตำแหน่ง (Index) ที่ต้องการได้ง่ายๆ</div>`
                },
                {
                    id: "3.6",
                    title: "3.6 ข้อมูลตรรกะ (Boolean)",
                    mainTitle: "ชนิดข้อมูลตรรกศาสตร์",
                    subTitle: "(Boolean Data Type)",
                    description: "ครอบคลุมหัวข้อ: ค่าความจริง (True) และเท็จ (False), การประเมินค่าทางตรรกศาสตร์เบื้องต้น | มีแค่ 2 ค่าคือ <code>True</code> (จริง) และ <code>False</code> (เท็จ) สำคัญมากสำหรับการเขียนเงื่อนไข",
                    content: `[pyUnit3_6_BooleanExplorer]<div class="note">💡 Boolean เป็นหัวใจของการตัดสินใจ (If-Else) ในโปรแกรม</div>`
                },
                {
                    id: "3.7",
                    title: "3.7 การนำเข้าโมดูล (import)",
                    mainTitle: "การใช้โมดูล",
                    subTitle: "(Importing Modules)",
                    description: "ครอบคลุมหัวข้อ: ความหมายและประโยชน์ของโมดูล, รูปแบบการเรียกใช้งาน (import / from...import) | Python มี \"เครื่องมือเสริม\" หรือโมดูลมาตรฐานมากมาย เราแค่ <code>import</code> เข้ามาก็ใช้ได้เลย",
                    content: `[pyUnit3_7_ImportModule]<div class="note">💡 ฟังก์ชัน <code>math.pi</code> หรือ <code>random.randint()</code> ก็มาจากโมดูลมาตรฐาน!</div>`
                },
                {
                    id: "3.8",
                    title: "3.8 การจัดสรรหน่วยความจำ",
                    mainTitle: "ตัวแปรถูกเก็บในหน่วยความจำอย่างไร?",
                    description: "ครอบคลุมหัวข้อ: หลักการเก็บข้อมูลในหน่วยความจำของตัวแปร, กระบวนการคืนพื้นที่หน่วยความจำ (Garbage Collection) | มาดูความแตกต่างระหว่างข้อมูลที่เปลี่ยนค่าได้ (Mutable) และเปลี่ยนไม่ได้ (Immutable)",
                    subTitle: "(Memory Allocation)",
                    content: `[pyUnit3_8_MemoryVisualizer]<div class="note">💡 <code>List</code> เป็น Mutable ส่วน <code>int</code> และ <code>String</code> เป็น Immutable</div>`
                }
            ]
        },
        {
            id: 4,
            title: "หน่วยที่ 4 การเขียนโค้ดและโครงสร้างควบคุม",
            lessons: [
                {
                    id: "4.1",
                    title: "4.1 การแสดงผลด้วย print()",
                    mainTitle: "การจัดรูปแบบแสดงผลด้วย print()",
                    description: "ครอบคลุมหัวข้อ: รูปแบบการใช้งานฟังก์ชัน print(), การจัดรูปแบบสตริง (String Formatting และ f-string) | ฟังก์ชัน <code>print()</code> ใช้เพื่อสั่งให้คอมพิวเตอร์แสดงข้อความหรือค่าของตัวแปรออกทางหน้าจอ โดยมีรูปแบบที่ทรงประสิทธิภาพที่สุดคือ f-string (Formatted String Literals)",
                    subTitle: "(Print Function)",
                    content: `[pyUnit4_3_PrintFormat]<div class="note">💡 f-string (มีตัว f นำหน้าเครื่องหมายคำพูด) คือวิธีแทรกตัวแปรลงในข้อความที่ง่ายและนิยมที่สุดในภาษา Python ปัจจุบัน</div>`
                },
                {
                    id: "4.2",
                    title: "4.2 การรับข้อมูลด้วย input()",
                    mainTitle: "การรับข้อมูลด้วยฟังก์ชัน input()",
                    description: "ครอบคลุมหัวข้อ: รูปแบบการใช้งานฟังก์ชัน input(), การแปลงชนิดข้อมูลที่รับเข้ามา (Type Casting) | การสื่อสารระหว่างมนุษย์กับคอมพิวเตอร์ผ่านฟังก์ชัน <code>input()</code> เพื่อหยุดรอให้ผู้ใช้พิมพ์ข้อมูลทางคีย์บอร์ดแล้วกด Enter เพื่อเก็บข้อมูลเข้าสู่ตัวแปร",
                    subTitle: "(Input Function)",
                    content: `[pyUnit4_2_InputDemo]<div class="note">💡 ข้อควรจำ: ข้อมูลที่ได้รับจาก <code>input()</code> จะมีชนิดข้อมูลเป็นข้อความ (String) เสมอ หากต้องการนำไปคำนวณจะต้องทำการแปลงชนิดข้อมูล (Type Casting) เช่น ครอบด้วย <code>int()</code> หรือ <code>float()</code> ก่อน</div>`
                },
                {
                    id: "4.3",
                    title: "4.3 ตัวดำเนินการคณิตศาสตร์",
                    mainTitle: "ตัวดำเนินการคณิตศาสตร์",
                    subTitle: "(Arithmetic Operators)",
                    description: "ครอบคลุมหัวข้อ: เครื่องหมายคณิตศาสตร์พื้นฐาน (+, -, *, /, //, %, **), ลำดับความสำคัญของเครื่องหมายทางคณิตศาสตร์ | การสั่งให้คอมพิวเตอร์คำนวณตัวเลข ใน Python มีเครื่องหมายพิเศษสำหรับการหารปัดเศษทิ้ง (//) และการหารเอาเศษ (Modulo %)",
                    content: `[pyUnit4_4_ArithmeticOps]<div class="note">💡 <code>//</code> คือการหารปัดเศษทิ้ง ส่วน <code>%</code> คือการหารเอาเศษ ซึ่งมีความสำคัญมากในการเขียนโปรแกรม เช่น ตรวจสอบเลขคู่/คี่ หรือแบ่งรอบการทำงาน</div>`
                },
                {
                    id: "4.4",
                    title: "4.4 ตัวดำเนินการกำหนดค่า",
                    mainTitle: "ตัวดำเนินการกำหนดค่า",
                    subTitle: "(Assignment Operators)",
                    description: "ครอบคลุมหัวข้อ: การใช้เครื่องหมายเท่ากับ (=), การกำหนดค่าแบบย่อ (+=, -=, *=, /=) | เครื่องหมาย <code>=</code> ในทางการเขียนโปรแกรม หมายถึง \"การนำค่าจากทางขวา ไปเก็บไว้ในตัวแปรทางซ้าย\" และยังมีตัวดำเนินการกำหนดค่าแบบย่อ (เช่น <code>+=</code>, <code>-=</code>)",
                    content: `[pyUnit4_5_AssignmentOps]<div class="note">💡 <code>x += 1</code> เป็นการเขียนย่อของ <code>x = x + 1</code> เพื่อความรวดเร็วและสะอาดตาของโค้ด</div>`
                },
                {
                    id: "4.5",
                    title: "4.5 ตัวดำเนินการเปรียบเทียบ",
                    mainTitle: "ตัวดำเนินการเปรียบเทียบ",
                    subTitle: "(Comparison Operators)",
                    description: "ครอบคลุมหัวข้อ: เครื่องหมายเปรียบเทียบ (==, !=, >, <, >=, <=), ผลลัพธ์จากการเปรียบเทียบ (Boolean) | ใช้สำหรับเปรียบเทียบค่าสองค่าเพื่อหาคำตอบว่าประโยคนั้นเป็นจริงหรือเท็จ ผลลัพธ์ที่ได้จะเป็นข้อมูลตรรกะ (Boolean) คือ True หรือ False เสมอ",
                    content: `[pyUnit4_6_ComparisonOps]<div class="note">💡 ข้อควรระวังสูงสุด: เครื่องหมาย <code>=</code> ใช้กำหนดค่าตัวแปร ส่วนเครื่องหมาย <code>==</code> ใช้สำหรับทดสอบว่าค่าเท่ากันหรือไม่</div>`
                },
                {
                    id: "4.6",
                    title: "4.6 ตัวดำเนินการทางตรรกะ",
                    mainTitle: "ตัวดำเนินการทางตรรกะ",
                    subTitle: "(Logical Operators)",
                    description: "ครอบคลุมหัวข้อ: การใช้งาน and, or, not, ลำดับการทำงานของตัวดำเนินการทางตรรกะ | ใช้เพื่อเชื่อมเงื่อนไขหลายข้อเข้าด้วยกัน ประกอบด้วย <code>and</code> (และ), <code>or</code> (หรือ) และ <code>not</code> (ไม่)",
                    content: `[pyUnit4_7_LogicalOps]<div class="note">💡 <code>and</code> เป็นจริงเมื่อเงื่อนไขทั้งหมดเป็นจริง / <code>or</code> เป็นจริงเพียงแค่มีเงื่อนไขใดเงื่อนไขหนึ่งเป็นจริง / <code>not</code> ใช้กลับค่าความจริง</div>`
                },
                {
                    id: "4.7",
                    title: "4.7 ตัวดำเนินการเอกลักษณ์ (Identity)",
                    mainTitle: "ตัวดำเนินการเอกลักษณ์",
                    subTitle: "(Identity Operators)",
                    description: "ครอบคลุมหัวข้อ: การใช้งาน is และ is not, ความแตกต่างระหว่าง is กับ == | ตัวดำเนินการ <code>is</code> และ <code>is not</code> ใช้สำหรับตรวจสอบว่าตัวแปรสองตัวอ้างอิงไปยังตำแหน่งหน่วยความจำเดียวกัน (Object เดียวกัน) หรือมีค่าเท่ากันแต่เป็นคนละอ็อบเจกต์",
                    content: `[pyUnit4_8_IdentityOps]<div class="note">💡 ตัวดำเนินการ <code>==</code> ใช้เปรียบเทียบว่า "ค่าเท่ากันหรือไม่" แต่ตัวดำเนินการ <code>is</code> ใช้ตรวจสอบว่า "เป็นอ็อบเจกต์เดียวกันในหน่วยความจำหรือไม่"</div>`
                },
                {
                    id: "4.8",
                    title: "4.8 ตัวดำเนินการสมาชิก (Membership)",
                    mainTitle: "ตัวดำเนินการสมาชิก",
                    subTitle: "(Membership Operators)",
                    description: "ครอบคลุมหัวข้อ: การใช้งาน in และ not in, การตรวจสอบสมาชิกในชุดข้อมูลหรือข้อความ | ใช้ตรวจว่ามีข้อมูลที่ระบุอยู่ภายในข้อมูลแบบชุด (เช่น List, String, หรือ Tuple) หรือไม่ ด้วยตัวดำเนินการ <code>in</code> และ <code>not in</code>",
                    content: `[pyUnit4_9_MembershipOps]<div class="note">💡 ทรงพลังมากในการค้นหาคำหรือตรวจสอบสถานะของสมาชิกในกลุ่มข้อมูลโดยไม่ต้องเขียนลูปไล่ตรวจเอง</div>`
                },
                {
                    id: "4.9",
                    title: "4.9 ตัวดำเนินการบิต (Bitwise)",
                    mainTitle: "ตัวดำเนินการบิต",
                    subTitle: "(Bitwise Operators)",
                    description: "ครอบคลุมหัวข้อ: เครื่องหมายระดับบิตเบื้องต้น (&, |, ^, ~), การเลื่อนบิต (Shift left, Shift right) | ตัวดำเนินการระดับบิตทำงานโดยตรงกับเลขฐานสองของข้อมูลที่เป็นจำนวนเต็ม มักใช้ในการทำงานระดับต่ำ ระบบเครือข่าย หรือฮาร์ดแวร์จำลอง",
                    content: `[pyUnit4_10_BitwiseOps]<div class="note">💡 เครื่องหมาย <code>&lt;&lt;</code> (เลื่อนบิตไปทางซ้าย 1 ตำแหน่ง) จะมีค่าเท่ากับการคูณด้วย 2 และ <code>&gt;&gt;</code> มีค่าเท่ากับการหารด้วย 2 ปัดเศษทิ้ง</div>`
                },
                {
                    id: "4.10",
                    title: "4.10 เงื่อนไข if",
                    mainTitle: "โครงสร้างเงื่อนไข if",
                    subTitle: "(If Statement)",
                    description: "ครอบคลุมหัวข้อ: โครงสร้างคำสั่ง if เชิงเดี่ยว, การเขียนบล็อกคำสั่งภายใต้เงื่อนไข if | ใช้ควบคุมทิศทางของโปรแกรมให้เลือกทำงานในบล็อกคำสั่งเมื่อเงื่อนไขที่กำหนดเป็นจริง (True)",
                    content: `[pyUnit4_11_IfStatement]<div class="note">💡 บรรทัดคำสั่งที่อยู่ภายใต้บล็อกของ <code>if</code> ต้องมีการย่อหน้า (Indentation) เสมอ เพื่อบอกขอบเขตการทำงาน</div>`
                },
                {
                    id: "4.11",
                    title: "4.11 เงื่อนไข elif",
                    mainTitle: "ทางเลือกหลายเงื่อนไขด้วย elif",
                    description: "ครอบคลุมหัวข้อ: โครงสร้างคำสั่ง elif สำหรับหลายเงื่อนไข, การจัดลำดับความสำคัญของเงื่อนไข | คำย่อมาจาก \"else if\" ใช้เมื่อมีทางเลือกหรือข้อกำหนดหลายเงื่อนไขที่ต้องทำการประเมินผลตามลำดับก่อนหลัง",
                    subTitle: "(Elif Statement)",
                    content: `[pyUnit4_12_ElifStatement]<div class="note">💡 Python จะตรวจสอบเงื่อนไขจากบนลงล่าง และจะรันเฉพาะบล็อกแรกที่มีเงื่อนไขเป็นจริง จากนั้นจะข้ามบล็อกที่เหลือทั้งหมด</div>`
                },
                {
                    id: "4.12",
                    title: "4.12 เงื่อนไข else",
                    mainTitle: "ทางเลือกสุดท้ายด้วย else",
                    description: "ครอบคลุมหัวข้อ: โครงสร้างคำสั่ง else, การจัดการเมื่อไม่ตรงเงื่อนไขใดเลย | บล็อกคำสั่งสุดท้ายที่จะทำงานก็ต่อเมื่อเงื่อนไขทั้งหมดก่อนหน้า (ทั้ง <code>if</code> และ <code>elif</code>) ประเมินค่าออกมาเป็นเท็จ (False) ทั้งหมด",
                    subTitle: "(Else Statement)",
                    content: `[pyUnit4_13_ElseStatement]<div class="note">💡 <code>else</code> ไม่จำเป็นต้องมีเงื่อนไขตามหลัง เพราะมันคือกองกำลังทางเลือกสุดท้ายที่รับงานทั้งหมดที่หลุดมาจากด้านบน</div>`
                },
                {
                    id: "4.13",
                    title: "4.13 ลูปทำงานซ้ำ while",
                    mainTitle: "การวนซ้ำด้วยโครงสร้าง while",
                    description: "ครอบคลุมหัวข้อ: โครงสร้างคำสั่ง while loop, การควบคุมลูปด้วย break และ continue | โปรแกรมจะวนซ้ำรันคำสั่งภายในบล็อกไปเรื่อยๆ ตราบใดที่เงื่อนไขควบคุมยังคงประเมินค่าออกมาเป็นจริง (True)",
                    subTitle: "(While Loop)",
                    content: `[pyUnit4_14_WhileLoop]<div class="note">💡 ระวังการเขียนเงื่อนไขควบคุมที่ไม่มีวันกลายเป็นเท็จ เพราะจะทำให้เกิด "ลูปไม่สิ้นสุด (Infinite Loop)" ซึ่งทำให้โปรแกรมค้างได้</div>`
                },
                {
                    id: "4.14",
                    title: "4.14 ลูปทำงานซ้ำ for",
                    mainTitle: "การวนซ้ำตามจำนวนสมาชิกด้วย for",
                    description: "ครอบคลุมหัวข้อ: โครงสร้างคำสั่ง for loop, การดึงข้อมูลจากลิสต์หรือชุดข้อมูลมาใช้งาน | โครงสร้างลูปที่ใช้สำหรับดึงค่าหรือทำงานซ้ำกับสมาชิกแต่ละตัวที่อยู่ในชุดข้อมูล (Iterable) เช่น ลิสต์ (List) หรือสายอักขระ (String)",
                    subTitle: "(For Loop)",
                    content: `[pyUnit4_15_ForLoop]<div class="note">💡 <code>for item in item_list:</code> เป็นรูปแบบการวนซ้ำข้อมูลที่ปลอดภัย อ่านง่าย และมีประสิทธิภาพสูงสุดในภาษา Python</div>`
                },
                {
                    id: "4.15",
                    title: "4.15 การใช้ range() ในลูป",
                    mainTitle: "การสร้างขอบเขตตัวเลขด้วยฟังก์ชัน range()",
                    description: "ครอบคลุมหัวข้อ: รูปแบบพารามิเตอร์ของฟังก์ชัน range(), การกำหนดจุดเริ่มต้น จุดสิ้นสุด และระยะก้าวเดิน (Step) | ฟังก์ชันคู่บุญของ <code>for</code> loop ที่ใช้สำหรับการสร้างลำดับตัวเลขตามขอบเขตที่ต้องการได้อย่างสะดวกและรวดเร็ว",
                    subTitle: "(Range Function)",
                    content: `[pyUnit4_16_RangeFunction]<div class="note">💡 ฟังก์ชัน <code>range(start, stop, step)</code> จะไม่นำค่าของ stop มารวมอยู่ในชุดตัวเลขผลลัพธ์เด็ดขาด</div>`
                }
            ]
        },
        {
            id: 5,
            title: "หน่วยที่ 5 การจัดการข้อมูลแบบชุด",
            lessons: [
                {
                    id: "5.1",
                    title: "5.1 การใช้งาน List",
                    mainTitle: "ชนิดข้อมูล List",
                    description: "ครอบคลุมหัวข้อ: การสร้างและเข้าถึงสมาชิกใน List, เมธอดสำหรับการจัดการ List (เช่น append, remove) | ใช้เก็บข้อมูลหลายๆ ตัวไว้ในตัวแปรเดียว สามารถเพิ่ม ลบ หรือแก้ไขข้อมูลได้อิสระ",
                    subTitle: "(List Operations)",
                    content: `[pyUnit5_1_ListExplorer]<div class="note">💡 List หุ้มด้วย <code>[]</code> และ Index เริ่มต้นที่ 0 เสมอ</div>`
                },
                {
                    id: "5.2",
                    title: "5.2 การใช้งาน Tuple และ Dictionary",
                    mainTitle: "Tuple และ Dictionary",
                    description: "ครอบคลุมหัวข้อ: คุณสมบัติและการใช้งาน Tuple, การจัดการคีย์ (Key) และค่า (Value) ใน Dictionary | Tuple เหมือน List แต่แก้ไขไม่ได้ ส่วน Dictionary เก็บข้อมูลแบบ Key-Value คู่กัน",
                    subTitle: "(Tuple and Dictionary)",
                    content: `[pyUnit5_2_TupleDictExplorer]<div class="note">💡 Tuple หุ้มด้วย <code>()</code> ส่วน Dictionary หุ้มด้วย <code>{}</code></div>`
                },
                {
                    id: "5.3",
                    title: "5.3 การใช้งาน Set และ String Slicing",
                    mainTitle: "Set และ String Slicing",
                    description: "ครอบคลุมหัวข้อ: คุณสมบัติและการดำเนินการของ Set (Union, Intersection), การตัดคำและการเข้าถึงข้อความย่อย (Slicing) | Set ใช้เก็บข้อมูลที่ไม่ซ้ำกัน ส่วน String Slicing ใช้ตัดบางส่วนของข้อความออกมา",
                    subTitle: "(Set and String Slicing)",
                    content: `[pyUnit5_3_SetStringExplorer]<div class="note">💡 <code>[0:5]</code> หมายถึงเอาตั้งแต่ Index 0 แต่ไม่ถึง Index 5</div>`
                }
            ]
        },
        {
            id: 6,
            title: "หน่วยที่ 6 ฟังก์ชัน (Function)",
            lessons: [
                {
                    id: "6.1",
                    title: "6.1 ฟังก์ชันสำเร็จรูป (Built-in)",
                    mainTitle: "ฟังก์ชันมาตรฐาน",
                    subTitle: "(Built-in Functions)",
                    description: "ครอบคลุมหัวข้อ: ความหมายและกลุ่มของฟังก์ชันสำเร็จรูป, ตัวอย่างฟังก์ชันที่ใช้งานบ่อย (เช่น len, type, max, min) | Python มีฟังก์ชันมากมายเตรียมไว้ให้ใช้ได้เลย โดยไม่ต้องสร้างเอง ลองค้นหาดู",
                    content: `[pyUnit6_1_BuiltinFunctions]<div class="note">💡 ฟังก์ชันอย่าง <code>len()</code>, <code>type()</code>, <code>print()</code> ล้วนเป็น Built-in Functions</div>`
                },
                {
                    id: "6.2",
                    title: "6.2 การสร้างฟังก์ชันและพารามิเตอร์",
                    mainTitle: "สร้างฟังก์ชันเอง",
                    subTitle: "(Functions & Parameters)",
                    description: "ครอบคลุมหัวข้อ: การประกาศฟังก์ชันด้วยคำสั่ง def, การรับและส่งผ่านค่าพารามิเตอร์ | เมื่อฟังก์ชันมาตรฐานไม่ตอบโจทย์ เราสามารถสร้างเองได้ด้วยคำสั่ง def",
                    content: `[pyUnit6_2_DefFunction]<div class="note">💡 การตั้ง Default Value ช่วยให้ฟังก์ชันยืดหยุ่นขึ้น เรียกโดยไม่ใส่ค่าก็ไม่ Error</div>`
                },
                {
                    id: "6.3",
                    title: "6.3 การคืนค่าและขอบเขตตัวแปร",
                    mainTitle: "การคืนค่า (Return) และขอบเขตตัวแปร",
                    subTitle: "(Return & Variable Scope)",
                    description: "ครอบคลุมหัวข้อ: การใช้งานคำสั่ง return, ความแตกต่างระหว่างตัวแปร Local และ Global | ทำความเข้าใจว่าฟังก์ชันส่งค่ากลับมายังไง และทำไมตัวแปรข้างในถึงไม่กระทบข้างนอก",
                    content: `[pyUnit6_3_ReturnScope]<div class="note">💡 ถ้าไม่สั่ง <code>return</code> ฟังก์ชันจะคืนค่า <code>None</code> ออกมาโดยอัตโนมัติ</div>`
                },
                {
                    id: "6.4",
                    title: "6.4 การทดสอบและใช้งานฟังก์ชัน",
                    mainTitle: "เครื่องมือสร้างฟังก์ชัน",
                    subTitle: "(Testing & Using Functions)",
                    description: "ครอบคลุมหัวข้อ: วิธีการเรียกใช้ฟังก์ชันในโปรแกรม, การแก้ไขข้อผิดพลาด (Debugging) ของฟังก์ชันเบื้องต้น | ทดลองสร้างฟังก์ชันรับพารามิเตอร์ และดูผลลัพธ์ที่เปลี่ยนไปตามการเรียกใช้งาน",
                    content: `[pyUnit6_4_FunctionBuilder]<div class="note">💡 ฟังก์ชันที่ดีต้องทำงานเดียวให้สำเร็จ (Single Responsibility)</div>`
                }
            ]
        },
        {
            id: 7,
            title: "หน่วยที่ 7 การออกแบบโปรแกรมอย่างง่าย",
            lessons: [
                {
                    id: "7.1",
                    title: "7.1 การออกแบบโปรแกรมธุรกิจ",
                    mainTitle: "ออกแบบอย่างไรให้ใช้งานได้จริง?",
                    description: "ครอบคลุมหัวข้อ: การวิเคราะห์ความต้องการของระบบ, การเขียนผังงานเพื่อแก้ปัญหาทางธุรกิจ | การเขียนโปรแกรมธุรกิจต้องคำนึงถึงความถูกต้อง ป้องกันข้อผิดพลาด และอ่านง่าย",
                    subTitle: "(Business Program Design)",
                    content: `[pyUnit7_1_BusinessDesign]<div class="note">💡 โปรแกรมที่ดีคือโปรแกรมที่คนอื่นมาอ่านโค้ดต่อแล้วเข้าใจได้ทันที</div>`
                },
                {
                    id: "7.2",
                    title: "7.2 เขียนโปรแกรมเงื่อนไขและลูป",
                    mainTitle: "ตรรกะทางธุรกิจ",
                    subTitle: "(Condition & Loop Practice)",
                    description: "ครอบคลุมหัวข้อ: การประยุกต์ใช้โครงสร้างเงื่อนไขในระบบงานจริง, การประยุกต์ใช้ลูปเพื่อจัดการข้อมูลจำนวนมาก | รวมพลัง If-Else และ Loop เพื่อสร้างระบบคำนวณส่วนลดและภาษี",
                    content: `[pyUnit7_2_BusinessLogic]<div class="note">💡 โค้ดส่วนคำนวณเงินควรแยกออกมาเป็นฟังก์ชันต่างหาก เพื่อให้ง่ายต่อการแก้ไข</div>`
                },
                {
                    id: "7.3",
                    title: "7.3 การจัดการข้อผิดพลาด (Try-Except)",
                    mainTitle: "ทำไมโปรแกรมถึงล่ม?",
                    description: "ครอบคลุมหัวข้อ: โครงสร้างและประโยชน์ของ Try-Except, การดักจับและแสดงผลข้อผิดพลาด (Exception Handling) | ป้องกันโปรแกรมแครชเมื่อผู้ใช้กรอกข้อมูลผิดประเภทด้วย Try-Except",
                    subTitle: "(Error Handling)",
                    content: `[pyUnit7_3_ErrorHandling]<div class="note">💡 <code>ValueError</code> มักเกิดเมื่อรับค่ามาเป็น string แต่พยายามแปลงเป็น int ไม่ได้</div>`
                },
                {
                    id: "7.4",
                    title: "7.4 การจัดการไฟล์ (File I/O)",
                    mainTitle: "อ่านและเขียนไฟล์",
                    description: "ครอบคลุมหัวข้อ: การเปิดและอ่านข้อมูลจากไฟล์ข้อความ, การเขียนและบันทึกข้อมูลลงไฟล์ข้อความ | ข้อมูลจะหายไปเมื่อปิดโปรแกรม ถ้าไม่บันทึกลงไฟล์! มาดูวิธีจัดการไฟล์กัน",
                    subTitle: "(File I/O)",
                    content: `[pyUnit7_4_FileHandler]<div class="note">💡 ใช้ <code>with open(...) as f:</code> เสมอ เพื่อให้ Python ปิดไฟล์ให้อัตโนมัติ</div>`
                }
            ]
        },
        {
            id: 8,
            title: "หน่วยที่ 8 การประยุกต์ใช้งาน",
            lessons: [
                {
                    id: "8.1",
                    title: "8.1 การทำคู่มือและเอกสารระบบ",
                    mainTitle: "เขียนคู่มือโปรแกรม",
                    description: "ครอบคลุมหัวข้อ: องค์ประกอบของคู่มือผู้ใช้ (User Manual), การเขียนเอกสารสำหรับผู้พัฒนาโปรแกรม | เอกสารประกอบมีความสำคัญไม่แพ้โค้ด ลองดูโครงสร้างที่ควรมีในเอกสาร",
                    subTitle: "(System Documentation)",
                    content: `[pyUnit8_1_DocGenerator]<div class="note">💡 ไฟล์ <code>README.md</code> คือหน้าตาของโปรเจกต์ที่เราควรเขียนให้ดี</div>`
                },
                {
                    id: "8.2",
                    title: "8.2 มินิโปรเจกต์: ระบบ Mini POS",
                    mainTitle: "กรณีศึกษา: ระบบแคชเชียร์เบื้องต้น",
                    description: "ครอบคลุมหัวข้อ: การออกแบบหน้าจอรับข้อมูลและคำนวณราคาสินค้า, การเขียนโค้ด การทดสอบ และสรุปผลโปรเจกต์ | นำความรู้ทั้งหมดมาสร้างโปรแกรมจำลองร้านค้า (Mini POS) ซึ่งรวมทุกแนวคิดที่เรียนมา",
                    subTitle: "(Mini Project: POS)",
                    content: `[pyUnit8_2_MiniPOS]<div class="note">💡 โครงงานนี้ผสาน Function, Loop, List/Tuple, และ If-Else เข้าด้วยกันอย่างสมบูรณ์!</div>`
                }
            ]
        }
    ]
};

export default pyCourse;
