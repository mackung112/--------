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
                    description: "ครอบคลุมหัวข้อ: ภาษาระดับต่ำ, ภาษาระดับสูง, 4GL, 5GL | เรียนรู้วิวัฒนาการและความแตกต่างระหว่างภาษาเครื่อง (Machine Language) ไปจนถึงภาษาธรรมชาติ (Natural Language)",
                    subTitle: "(Levels of Programming Languages)",
                    content: "[pyUnit1_2_LanguageLevels]" 
                },
                { 
                    id: "1.3", 
                    title: "1.3 Interpreter vs Compiler", 
                    mainTitle: "Interpreter vs Compiler",
                    subTitle: "(Interpreter vs Compiler)",
                    description: "ครอบคลุมหัวข้อ: หลักการทำงานและข้อดีข้อเสียของ Interpreter และ Compiler | เปรียบเทียบการทำงานของตัวแปลภาษาแบบ Interpreter ที่แปลทีละบรรทัด และ Compiler ที่แปลรวดเดียวทั้งโปรแกรม",
                    content: "[pyUnit1_3_TranslatorCompare]" 
                },
                { 
                    id: "1.4", 
                    title: "1.4 จุดเด่นของภาษา Python", 
                    mainTitle: "จุดเด่นของภาษา Python",
                    description: "ครอบคลุมหัวข้อ: ลักษณะเด่น, ความสำคัญ, และการประยุกต์ใช้งาน | ค้นหาคำตอบว่าทำไมภาษา Python ถึงได้รับความนิยมสูงสุดในปัจจุบัน และถูกนำไปใช้งานในด้านใดบ้าง",
                    subTitle: "(Features of Python)",
                    content: "[pyUnit1_4_PythonFeatures]" 
                },
                { 
                    id: "1.5", 
                    title: "1.5 การติดตั้ง Python และ IDE", 
                    mainTitle: "การติดตั้ง Python และ IDE",
                    subTitle: "(Python & IDE Setup)",
                    description: "ครอบคลุมหัวข้อ: การดาวน์โหลดและติดตั้งตัวแปลภาษา Python, การติดตั้งและใช้งาน IDE | ขั้นตอนการเตรียมเครื่องมือให้พร้อมก่อนเริ่มเขียนโปรแกรมจริง ด้วยการติดตั้ง Python และโปรแกรมเขียนโค้ด (IDE)",
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
                    subTitle: "(Concept & Algorithm)",
                    description: "ครอบคลุมหัวข้อ: ความหมายของอัลกอริทึม ขั้นตอนและกระบวนการแก้ปัญหา และหลักการออกแบบอัลกอริทึม",
                    content: "[pyUnit2_1_AlgorithmConcept]" 
                },
                { 
                    id: "2.2", 
                    title: "2.2 วงจรการพัฒนาซอฟต์แวร์ (SDLC)", 
                    mainTitle: "วงจรการพัฒนาซอฟต์แวร์ (SDLC)",
                    subTitle: "(Software Development Life Cycle)",
                    description: "ครอบคลุมหัวข้อ: ความหมาย ความสำคัญ ระยะต่างๆ ในวงจรการพัฒนาซอฟต์แวร์ และตัวอย่างการใช้งาน",
                    content: "[pyUnit2_2_SDLC]" 
                },
                { 
                    id: "2.3", 
                    title: "2.3 การเขียนรหัสเทียม (Pseudocode)", 
                    mainTitle: "การเขียนรหัสเทียม (Pseudocode)",
                    subTitle: "(Introduction to Pseudocode)",
                    description: "ครอบคลุมหัวข้อ: ความหมาย ประโยชน์ หลักการเบื้องต้น และความสัมพันธ์ระหว่างรหัสเทียมกับผังงาน",
                    content: "[pyUnit2_3_PseudocodeIntro]" 
                },
                { 
                    id: "2.4", 
                    title: "2.4 คำสั่งพื้นฐานในรหัสเทียม", 
                    mainTitle: "คำสั่งพื้นฐานในรหัสเทียม",
                    subTitle: "(Basic Pseudocode Commands)",
                    description: "ครอบคลุมหัวข้อ: คำสั่งรับข้อมูล (INPUT) คำสั่งแสดงผล (PRINT) และคำสั่งคำนวณกำหนดค่า (PROCESS)",
                    content: "[pyUnit2_4_PseudoCommands]" 
                },
                { 
                    id: "2.5", 
                    title: "2.5 รหัสเทียมแบบมีเงื่อนไข", 
                    mainTitle: "รหัสเทียมแบบมีเงื่อนไข",
                    subTitle: "(Conditional Pseudocode)",
                    description: "ครอบคลุมหัวข้อ: เงื่อนไขแบบ IF, IF-ELSE, IF-ELIF-ELSE และการเขียนเงื่อนไขซ้อนทับ (NESTED IF)",
                    content: "[pyUnit2_5_PseudoCondition]" 
                },
                { 
                    id: "2.6", 
                    title: "2.6 รหัสเทียมแบบวนซ้ำ", 
                    mainTitle: "รหัสเทียมแบบวนซ้ำ",
                    subTitle: "(Looping Pseudocode)",
                    description: "ครอบคลุมหัวข้อ: การวนซ้ำแบบ WHILE LOOP, FOR LOOP และการกำหนดจุดสิ้นสุดการวนซ้ำ",
                    content: "[pyUnit2_6_PseudoLoop]" 
                },
                { 
                    id: "2.7", 
                    title: "2.7 การจัดโครงสร้างรหัสเทียม", 
                    mainTitle: "การจัดโครงสร้างรหัสเทียม",
                    subTitle: "(Pseudocode Structure)",
                    description: "ครอบคลุมหัวข้อ: การย่อหน้า (Indentation) เพื่อความชัดเจน และการเขียนหมายเหตุ (Comment)",
                    content: "[pyUnit2_7_PseudoStructure]" 
                },
                { 
                    id: "2.8", 
                    title: "2.8 สัญลักษณ์ผังงาน (Flowchart)", 
                    mainTitle: "สัญลักษณ์ผังงาน (Flowchart)",
                    subTitle: "(Flowchart Symbols)",
                    description: "ครอบคลุมหัวข้อ: สัญลักษณ์มาตรฐานสากล (ANSI) ความหมาย การนำไปใช้งาน และการใช้ draw.io",
                    content: "[pyUnit2_8_FlowchartSymbols]" 
                },
                { 
                    id: "2.9", 
                    title: "2.9 หลักการเขียนผังงานที่ดี", 
                    mainTitle: "หลักการเขียนผังงานที่ดี",
                    subTitle: "(Good Flowchart Practices)",
                    description: "ครอบคลุมหัวข้อ: กฎเกณฑ์ข้อกำหนดในการเขียน และข้อควรระวังข้อผิดพลาดที่พบบ่อย",
                    content: "[pyUnit2_9_FlowchartRules]" 
                },
                { 
                    id: "2.10", 
                    title: "2.10 ผังงานแบบเรียงลำดับ", 
                    mainTitle: "ผังงานแบบเรียงลำดับ",
                    subTitle: "(Sequential Flowchart)",
                    description: "ครอบคลุมหัวข้อ: แนวคิดการทำงานแบบลำดับจากบนลงล่าง และตัวอย่างการเขียนผังงานแบบเรียงลำดับ",
                    content: "[pyUnit2_10_FlowSeq]" 
                },
                { 
                    id: "2.11", 
                    title: "2.11 ผังงานแบบเลือกทำ", 
                    mainTitle: "ผังงานแบบเลือกทำ",
                    subTitle: "(Decision Flowchart)",
                    description: "ครอบคลุมหัวข้อ: แนวคิดการตัดสินใจ เงื่อนไขแบบ if, if-else, if-elif-else และ nested if",
                    content: "[pyUnit2_11_FlowCondition]" 
                },
                { 
                    id: "2.12", 
                    title: "2.12 ผังงานแบบวนซ้ำ", 
                    mainTitle: "ผังงานแบบวนซ้ำ",
                    subTitle: "(Looping Flowchart)",
                    description: "ครอบคลุมหัวข้อ: แนวคิดการทำงานซ้ำตามเงื่อนไข ตัวอย่างผังงานแบบ while และ for",
                    content: "[pyUnit2_12_FlowLoop]" 
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
                    mainTitle: "โครงสร้างโค้ด Python",
                    subTitle: "(Python Code Structure)",
                    description: "ครอบคลุมหัวข้อ: การ comment, รูปแบบคำสั่งและไวยากรณ์เบื้องต้น และการเว้นวรรคและย่อหน้า (Indentation)",
                    content: "[pyUnit3_1_PyStructure]" 
                },
                { 
                    id: "3.2", 
                    title: "3.2 กฎการตั้งชื่อตัวแปร", 
                    mainTitle: "กฎการตั้งชื่อตัวแปร",
                    subTitle: "(Variable Naming Rules)",
                    description: "ครอบคลุมหัวข้อ: หลักเกณฑ์และข้อห้ามในการตั้งชื่อ และคำสงวน (Reserved words) ในภาษา Python",
                    content: "[pyUnit3_2_NamingRules]" 
                },
                { 
                    id: "3.3", 
                    title: "3.3 ข้อมูลจำนวนเต็ม (Integer)", 
                    mainTitle: "ข้อมูลจำนวนเต็ม (Integer)",
                    subTitle: "(Integer Data Type)",
                    description: "ครอบคลุมหัวข้อ: ลักษณะของข้อมูลประเภทจำนวนเต็ม และการแปลงชนิดข้อมูลจำนวนเต็ม",
                    content: "[pyUnit3_3_Integer]" 
                },
                { 
                    id: "3.4", 
                    title: "3.4 ข้อมูลทศนิยม (Float)", 
                    mainTitle: "ข้อมูลทศนิยม (Float)",
                    subTitle: "(Float Data Type)",
                    description: "ครอบคลุมหัวข้อ: ลักษณะของข้อมูลประเภททศนิยม และความแม่นยำและการปัดเศษทศนิยม",
                    content: "[pyUnit3_4_Float]" 
                },
                { 
                    id: "3.5", 
                    title: "3.5 ข้อมูลข้อความ (String)", 
                    mainTitle: "ข้อมูลข้อความ (String)",
                    subTitle: "(String Data Type)",
                    description: "ครอบคลุมหัวข้อ: การประกาศตัวแปรและกำหนดค่าข้อความ และการเชื่อมต่อและการคัดลอกข้อความ",
                    content: "[pyUnit3_5_String]" 
                },
                { 
                    id: "3.6", 
                    title: "3.6 ข้อมูลตรรกะ (Boolean)", 
                    mainTitle: "ข้อมูลตรรกะ (Boolean)",
                    subTitle: "(Boolean Data Type)",
                    description: "ครอบคลุมหัวข้อ: ค่าความจริง (True) และเท็จ (False) และการประเมินค่าทางตรรกศาสตร์เบื้องต้น",
                    content: "[pyUnit3_6_Boolean]" 
                },
                { 
                    id: "3.7", 
                    title: "3.7 การนำเข้าโมดูล (import)", 
                    mainTitle: "การนำเข้าโมดูล (import)",
                    subTitle: "(Importing Modules)",
                    description: "ครอบคลุมหัวข้อ: ความหมายและประโยชน์ของโมดูล และรูปแบบการเรียกใช้งาน (import / from...import)",
                    content: "[pyUnit3_7_Import]" 
                },
                { 
                    id: "3.8", 
                    title: "3.8 การจัดสรรหน่วยความจำ", 
                    mainTitle: "การจัดสรรหน่วยความจำ",
                    subTitle: "(Memory Allocation)",
                    description: "ครอบคลุมหัวข้อ: หลักการเก็บข้อมูลในหน่วยความจำของตัวแปร และกระบวนการคืนพื้นที่หน่วยความจำ (Garbage Collection)",
                    content: "[pyUnit3_8_Memory]" 
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
                }
            ]
        }
    ]
};

export default pyCourse;
