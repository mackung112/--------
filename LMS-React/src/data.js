import oopCourse from './data/oopCourse.js';

const courses = [
    {
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
                        title: "ความหมายของโปรแกรมและภาษาคอมพิวเตอร์",
                        content: `<h2>การเขียนโปรแกรมคอมพิวเตอร์คืออะไร?</h2>
                        <p>การเขียนโปรแกรมคอมพิวเตอร์ (Computer Programming) หมายถึง การนำชุดคำสั่งที่คอมพิวเตอร์สามารถเข้าใจได้มาเรียงต่อกันเป็นลำดับขั้นตอน เพื่อสั่งให้คอมพิวเตอร์ทำงานตามที่เราต้องการ โดยอาศัย <strong>ซอฟต์แวร์ (Software)</strong> เป็นตัวขับเคลื่อน</p>
                        [ProgramMeaning]
                        <div class="note">ข้อดีของการเรียนเขียนโปรแกรมคือ ทำให้เราสามารถเปลี่ยนจาก "ผู้ใช้งานซอฟต์แวร์" มาเป็น "ผู้สร้างซอฟต์แวร์" ได้</div>`
                    },
                    {
                        id: "1.2",
                        title: "ระดับของภาษาคอมพิวเตอร์",
                        content: `<h2>ภาษาคอมพิวเตอร์มีกี่ระดับ?</h2>
                        <p>ภาษาคอมพิวเตอร์พัฒนาจากอดีตที่เข้าใจยาก มาสู่ปัจจุบันที่เขียนคล้ายภาษาอังกฤษมากขึ้น ลองสำรวจระดับของภาษาแบบโต้ตอบได้ด้านล่างนี้:</p>
                        [LanguageLevels]
                        <div class="note">💡 <strong>สรุป</strong>: ภาษา Python ที่เราจะเรียน จัดอยู่ใน "ภาษาระดับสูง" ซึ่งอ่านง่ายที่สุด แต่ต้องผ่านตัวแปลภาษาก่อนเครื่องจึงจะเข้าใจได้</div>`
                    },
                    {
                        id: "1.3",
                        title: "ตัวแปลภาษาแบบ Interpreter และ Compiler",
                        content: `<h2>เมื่อคอมพิวเตอร์ไม่เข้าใจภาษาคน</h2>
                        <p>ในเมื่อคอมพิวเตอร์รู้จักแต่เลข 0 และ 1 (ภาษาเครื่อง) แต่เราเขียนโปรแกรมด้วยตัวอักษรภาษาอังกฤษ (ภาษาระดับสูง) เราจึงต้องมี <strong>ตัวแปลภาษา (Translator)</strong> ซึ่งมี 2 แบบหลักๆ คือ Interpreter และ Compiler</p>
                        [TranslatorCompare]
                        <div class="note">💡 <strong>ข้อควรจำ</strong>: Python ใช้ตัวแปลภาษาแบบ <strong>Interpreter</strong> ทำให้รันทีละบรรทัดได้เลย เหมาะกับการทดลองเขียนโค้ดมาก</div>`
                    },
                    {
                        id: "1.4",
                        title: "วิวัฒนาการและจุดเด่นของภาษา Python",
                        content: `<h2>ทำไมต้อง Python?</h2>
                        <p>Python ถูกสร้างขึ้นมาตั้งแต่ปี 1991 โดย <strong>Guido van Rossum</strong> และได้กลายมาเป็นภาษาที่ได้รับความนิยมสูงสุดระดับโลก ลองสำรวจเส้นทางและจุดแข็งของภาษานี้ดู</p>
                        [PythonTimeline]
                        <div class="note">💡 แม้จะชื่อเหมือนงูใหญ่ แต่แท้จริงแล้วชื่อ Python ได้แรงบันดาลใจมาจากคณะตลกสัญชาติอังกฤษที่ชื่อว่า "Monty Python's Flying Circus" 🐍</div>`
                    },
                    {
                        id: "1.5",
                        title: "การติดตั้ง Python Interpreter และเครื่องมือพัฒนา (IDE)",
                        content: `<h2>เตรียมเครื่องมือให้พร้อม!</h2>
                        <p>การจะเขียนโปรแกรมได้ เราต้องมีเครื่องมือ 2 อย่าง: <br/>1. <strong>Python Interpreter</strong> (ตัวแปลภาษา) <br/>2. <strong>IDE หรือ Code Editor</strong> (โปรแกรมสำหรับพิมพ์โค้ด)</p>
                        [SetupGuide]
                        <div class="note">💡 <strong>เตือนความจำ</strong>: สำหรับชาว Windows อย่าลืมติ๊ก <code>Add Python to PATH</code> ตอนติดตั้งเด็ดขาด ไม่งั้นจะรันคำสั่ง python ผ่าน Terminal ไม่ได้!</div>`
                    },
                    {
                        id: "1.6",
                        title: "หลักการเขียนโปรแกรมที่สะอาด (Pythonic Way)",
                        content: `<h2>ไม่ใช่แค่เขียนให้ทำงานได้ แต่ต้องเขียนให้สวย</h2>
                        <p><strong>Pythonic Way</strong> คือแนวคิดในการเขียนโค้ด Python ให้สั้น กระชับ อ่านง่าย และใช้ฟีเจอร์ของภาษาอย่างเต็มประสิทธิภาพ ลองเปรียบเทียบโค้ด 2 ฝั่งนี้ดู</p>
                        [PythonicWay]
                        <div class="note">💡 ปรัชญาของ Python กล่าวไว้ว่า <strong>"Readability counts"</strong> (ความอ่านง่ายคือสิ่งสำคัญ) โค้ดที่ดีต้องอ่านเข้าใจเหมือนอ่านหนังสือภาษาอังกฤษ</div>`
                    },
                    {
                        id: "1.7",
                        title: "โครงสร้างการจัดย่อหน้า (Indentation) และบรรทัดคำสั่ง",
                        content: `<h2>ไม่ต้องมีปีกกา แต่ต้องย่อหน้าให้ตรง!</h2>
                        <p>จุดเด่นที่ชัดเจนที่สุดของ Python เมื่อเทียบกับภาษา C หรือ Java คือ <strong>การไม่ใช้วงเล็บปีกกา <code>{}</code> เพื่อครอบบล็อกคำสั่ง</strong> แต่จะบังคับใช้ <strong>การย่อหน้า (Indentation)</strong> ด้วยช่องว่าง (Space) หรือ Tab แทน</p>
                        [IndentationDemo]
                        <div class="note">💡 <strong>กฎเหล็ก</strong>: มาตรฐานคือการกด Spacebar 4 ครั้ง (หรือ 1 Tab) ต่อ 1 ระดับการย่อหน้า และต้องใช้ให้เหมือนกันทั้งไฟล์ ห้ามปน Tab กับ Space เด็ดขาด!</div>`
                    }
                ],
                quiz: [
                    {
                        question: "ข้อใดคือลักษณะของตัวแปลภาษาแบบ Interpreter ที่ Python ใช้งาน?",
                        options: ["แปลทีเดียวทั้งไฟล์เป็นไฟล์ .exe", "แปลและทำงานทีละบรรทัดจากบนลงล่าง", "ไม่ต้องใช้ตัวแปลภาษาเพราะคอมพิวเตอร์เข้าใจ Python อยู่แล้ว", "แปลเป็นภาษา Assembly ก่อนแล้วค่อยรัน"],
                        answer: 1
                    },
                    {
                        question: "Python ใช้สิ่งใดในการจัดกลุ่มบล็อกคำสั่ง (Block of Code)?",
                        options: ["วงเล็บปีกกา { }", "เครื่องหมายเซมิโคลอน ;", "คำสั่ง BEGIN และ END", "การจัดย่อหน้า (Indentation)"],
                        answer: 3
                    },
                    {
                        question: "ข้อใดคือประโยชน์หลักของการเขียนโค้ดแบบ 'Pythonic Way'?",
                        options: ["ทำให้โค้ดทำงานเร็วขึ้น 10 เท่า", "ทำให้สามารถใช้ได้กับระบบปฏิบัติการทุกชนิด", "ทำให้โค้ดสั้น กระชับ และอ่านเข้าใจง่าย", "ป้องกันไม่ให้คนอื่นขโมยโค้ดไปใช้"],
                        answer: 2
                    }
                ]
            },
            {
                id: 2,
                title: "หน่วยที่ 2 ขั้นตอนการเขียนโปรแกรม",
                lessons: [
                    { id: "2.1", title: "ความหมายของอัลกอริทึม (Algorithm)", content: `<h2>อัลกอริทึมคืออะไร?</h2><p>อัลกอริทึม (Algorithm) หมายถึง <strong>ลำดับขั้นตอนที่ชัดเจนและแน่นอนในการแก้ปัญหา</strong> หรือทำงานอย่างใดอย่างหนึ่งให้สำเร็จ โดยมีจุดเริ่มต้น มีขั้นตอนที่จำกัด และมีจุดสิ้นสุดที่ชัดเจน ซึ่งเป็นพื้นฐานสำคัญที่สุดก่อนเริ่มเขียนโค้ดจริง</p>[AlgorithmFlowchart]<div class="note">💡 <strong>สรุป</strong>: อัลกอริทึมคือหัวใจของการเขียนโปรแกรม ก่อนเขียนโค้ดสักบรรทัด ต้องคิดลำดับขั้นตอนให้ชัดก่อนเสมอ!</div>` },
                    { id: "2.2", title: "วงจรการพัฒนาระบบ (Systems Development Life Cycle: SDLC)", content: `<h2>วงจรการพัฒนาซอฟต์แวร์ (SDLC)</h2><p>การพัฒนาโปรแกรมที่ดีต้องมีกระบวนการที่เป็นระบบ ซึ่งเรียกว่า <strong>SDLC</strong> ประกอบด้วย 6 ขั้นตอนหลัก</p>[SDLC]<div class="note">💡 SDLC = วิเคราะห์ → ออกแบบ → พัฒนา → ทดสอบ → ติดตั้ง → บำรุงรักษา</div>` },
                    { id: "2.3", title: "สัญลักษณ์มาตรฐานของผังงาน (Flowchart Symbols)", content: `<h2>สัญลักษณ์ผังงาน</h2><p>ผังงาน (Flowchart) ใช้สัญลักษณ์มาตรฐานตาม ISO 5807 เพื่อแสดงลำดับขั้นตอนการทำงาน กดที่สัญลักษณ์เพื่อเรียนรู้!</p>[FlowchartSymbols]<div class="note">💡 การจำสัญลักษณ์: วงรี = เริ่ม/จบ, สี่เหลี่ยม = ประมวลผล, เพชร = ตัดสินใจ, ด้านขนาน = I/O</div>` },
                    { id: "2.4", title: "การออกแบบผังงานแบบเรียงลำดับ (Sequence Flowchart)", content: `<h2>ผังงานแบบเรียงลำดับ</h2><p>โครงสร้างพื้นฐานที่สุด — คำสั่งทำงานจากบนลงล่าง ไม่มีเงื่อนไข ไม่มีการวนซ้ำ</p>[SequenceFlowchart]<div class="note">💡 โปรแกรมคำนวณพื้นที่วงกลมคือตัวอย่างที่ดีของผังงานแบบ Sequence</div>` },
                    { id: "2.5", title: "การออกแบบผังงานแบบมีทางเลือก (Selection Flowchart)", content: `<h2>ผังงานแบบมีทางเลือก</h2><p>ใช้เมื่อต้องตัดสินใจ — ผลลัพธ์จะแยกเป็น 2 ทาง (Yes/No) ตามเงื่อนไขที่กำหนด</p>[SelectionFlowchart]<div class="note">💡 สัญลักษณ์เพชร (◇) คือหัวใจของผังงานแบบ Selection</div>` },
                    { id: "2.6", title: "การออกแบบผังงานแบบวนซ้ำ (Iteration Flowchart)", content: `<h2>ผังงานแบบวนซ้ำ</h2><p>ใช้เมื่อต้องทำงานซ้ำๆ จนกว่าเงื่อนไขจะเป็นเท็จ ลองจำลองการหาผลรวม 1 ถึง N</p>[IterationFlowchart]<div class="note">💡 Loop ที่ดีต้องมี 3 อย่าง: ค่าเริ่มต้น, เงื่อนไขหยุด, และการเปลี่ยนค่า</div>` },
                    { id: "2.7", title: "คุณลักษณะและข้อจำกัดของผังงานที่ดี", content: `<h2>ผังงานที่ดีเป็นอย่างไร?</h2><p>ผังงานที่ดีต้องอ่านง่าย ชัดเจน และเป็นมาตรฐาน ลองดูข้อเปรียบเทียบ</p>[FlowchartBestPractice]<div class="note">💡 ผังงานที่ดี = START/STOP ชัดเจน + สัญลักษณ์ถูกต้อง + เส้นไม่ตัดกัน</div>` },
                    { id: "2.8", title: "หลักการเขียนรหัสเทียม (Pseudocode) และการใช้คำกริยาที่เป็นกลาง", content: `<h2>รหัสเทียม (Pseudocode) คืออะไร?</h2><p>รหัสเทียมคือการเขียนขั้นตอนวิธีด้วยภาษาที่คล้ายโค้ด แต่ไม่ผูกกับภาษาใดภาษาหนึ่ง เปรียบเทียบกับ Python จริงได้เลย</p>[PseudocodeIntro]<div class="note">💡 ใช้คำกริยาที่เป็นกลาง เช่น READ, COMPUTE, PRINT แทนคำสั่งเฉพาะภาษา</div>` },
                    { id: "2.9", title: "การใช้คำหลัก START, READ, COMPUTE, PRINT ในรหัสเทียม", content: `<h2>คำหลัก (Keywords) ของรหัสเทียม</h2><p>คำหลักเป็นคำที่มีหน้าที่ชัดเจนในรหัสเทียม กดเพื่อดูรายละเอียดและตัวอย่าง</p>[PseudocodeKeywords]<div class="note">💡 คำหลักช่วยให้รหัสเทียมเป็นมาตรฐาน อ่านเข้าใจตรงกันทุกคน</div>` },
                    { id: "2.10", title: "การเขียนรหัสเทียมสำหรับเงื่อนไข (IF...THEN...ELSE)", content: `<h2>เงื่อนไขในรหัสเทียม</h2><p>เมื่อต้องตัดสินใจ ให้ใช้โครงสร้าง IF...THEN...ELSE ลองเปลี่ยนค่าเพื่อดูผล</p>[PseudocodeCondition]<div class="note">💡 IF-THEN-ELSE ในรหัสเทียม ต้องปิดด้วย ENDIF เสมอ</div>` },
                    { id: "2.11", title: "การเขียนรหัสเทียมสำหรับการวนซ้ำ (WHILE...DO)", content: `<h2>การวนซ้ำในรหัสเทียม</h2><p>ใช้ WHILE...DO เมื่อต้องทำงานซ้ำ ลองรันดูว่าแต่ละรอบเกิดอะไรขึ้น</p>[PseudocodeLoop]<div class="note">💡 WHILE-DO ในรหัสเทียม ต้องปิดด้วย ENDWHILE เสมอ</div>` },
                    { id: "2.12", title: "การจัดย่อหน้าและความเป็นระเบียบของรหัสเทียม", content: `<h2>จัดย่อหน้ารหัสเทียมให้ถูกต้อง</h2><p>การย่อหน้า (Indentation) ช่วยแสดงโครงสร้างลำดับชั้นของรหัสเทียม ลองจัดให้ถูกต้อง!</p>[PseudocodeFormat]<div class="note">💡 บรรทัดที่อยู่ภายใน IF หรือ WHILE ต้องย่อเข้าไป 1 ระดับเสมอ</div>` },
                ],
                quiz: [
                    { question: "ข้อใดคือความหมายของ อัลกอริทึม (Algorithm)?", options: ["ภาษาคอมพิวเตอร์ชนิดหนึ่ง", "ลำดับขั้นตอนในการแก้ปัญหา", "โปรแกรมสำหรับค้นหาข้อมูล", "เครื่องมือหาบั๊ก"], answer: 1 },
                    { question: "สัญลักษณ์รูปสี่เหลี่ยมขนมเปียกปูน (◇) ในผังงานใช้แสดงอะไร?", options: ["การประมวลผล", "การรับ/แสดงผล", "การตัดสินใจ", "จุดเริ่มต้น"], answer: 2 },
                    { question: "คำหลักใดในรหัสเทียมใช้สำหรับแสดงผลข้อมูล?", options: ["READ", "COMPUTE", "PRINT", "SET"], answer: 2 },
                ],
                practical: [
                    { question: "จากรหัสเทียม 'READ age' จงเขียนคำสั่งรับค่าใน Python แล้วเก็บลงตัวแปร age (ไม่ต้องแปลงชนิดข้อมูล)", expectedPattern: /age\s*=\s*input\(\s*\)/, hint: "ใช้ฟังก์ชัน input()" },
                    { question: "จากผังงานสัญลักษณ์ตัดสินใจ 'age >= 18' จงเขียนเงื่อนไข if ในภาษา Python", expectedPattern: /if\s+age\s*>=\s*18\s*:/, hint: "อย่าลืมเครื่องหมาย : ท้ายเงื่อนไข" },
                    { question: "จงเขียนโครงสร้างวนซ้ำ while ที่เงื่อนไขเป็นจริงเสมอ (Infinite loop)", expectedPattern: /while\s+True\s*:/, hint: "ใช้ while True:" }
                ]
            },
            {
                id: 3,
                title: "หน่วยที่ 3 โครงสร้างพื้นฐานของภาษา Python",
                lessons: [
                    { id: "3.1", title: "โครงสร้างของภาษา Python", content: `<h2>ส่วนประกอบของโปรแกรม</h2><p>มาดูกันว่าโปรแกรม Python หนึ่งโปรแกรมประกอบด้วยอะไรบ้าง และมีการแบ่งแยกประเภทข้อมูลเบื้องต้นอย่างไร</p>[PythonStructure]<div class="note">💡 โครงสร้างที่ดีช่วยให้โปรแกรมอ่านง่ายและจัดการง่ายขึ้น</div>` },
                    { id: "3.2", title: "กฎการตั้งชื่อตัวแปร (Naming Convention)", content: `<h2>กฎการตั้งชื่อตัวแปร</h2><p>การตั้งชื่อตัวแปรใน Python มีกฎและข้อควรระวัง ลองเรียนรู้และดูตัวอย่างที่ถูกต้อง</p>[NamingConvention]<div class="note">💡 กฎเหล็ก: ห้ามขึ้นต้นด้วยตัวเลข และห้ามใช้คำสงวน!</div>` },
                    { id: "3.3", title: "ข้อมูลประเภทตัวเลขจำนวนเต็ม (Integer)", content: `<h2>ชนิดข้อมูลจำนวนเต็ม (Integer หรือ int)</h2><p>ใช้เก็บตัวเลขที่ไม่มีทศนิยม เช่น 1, -5, 1000 ลองคำนวณพื้นฐานได้เลย</p>[IntegerExplorer]<div class="note">💡 Python โชคดีตรงที่จำนวนเต็มไม่มีขีดจำกัดขนาด (Limit) เก็บเลขใหญ่แค่ไหนก็ได้ตราบที่ RAM พอ!</div>` },
                    { id: "3.4", title: "ข้อมูลประเภทตัวเลขทศนิยม (Float)", content: `<h2>ชนิดข้อมูลทศนิยม (Float)</h2><p>ใช้เก็บตัวเลขที่มีจุดทศนิยม เช่น 3.14, -0.5 ลองทดสอบความแม่นยำของมันดู</p>[FloatExplorer]<div class="note">💡 ระวัง: การคำนวณทศนิยมบางครั้งอาจเกิดความคลาดเคลื่อนเล็กน้อย (Floating Point Error)</div>` },
                    { id: "3.5", title: "ข้อมูลประเภทข้อความ (String)", content: `<h2>ชนิดข้อมูลข้อความ (String หรือ str)</h2><p>ใช้เก็บตัวอักษร ข้อความ ครอบด้วย "" หรือ '' ก็ได้ ลองใช้ Method ต่างๆ จัดการข้อความ</p>[StringExplorer]<div class="note">💡 String ใน Python สามารถดึงข้อมูลตำแหน่ง (Index) ที่ต้องการได้ง่ายๆ</div>` },
                    { id: "3.6", title: "ข้อมูลประเภทตรรกศาสตร์ (Boolean)", content: `<h2>ชนิดข้อมูลตรรกศาสตร์ (Boolean หรือ bool)</h2><p>มีแค่ 2 ค่าคือ <code>True</code> (จริง) และ <code>False</code> (เท็จ) สำคัญมากสำหรับการเขียนเงื่อนไข</p>[BooleanExplorer]<div class="note">💡 Boolean เป็นหัวใจของการตัดสินใจ (If-Else) ในโปรแกรม</div>` },
                    { id: "3.7", title: "การนำเข้าโมดูลมาตรฐานด้วยคำสั่ง <code>import</code>", content: `<h2>การใช้โมดูล (Modules)</h2><p>Python มี "เครื่องมือเสริม" หรือโมดูลมาตรฐานมากมาย เราแค่ <code>import</code> เข้ามาก็ใช้ได้เลย</p>[ImportModule]<div class="note">💡 ฟังก์ชัน <code>math.pi</code> หรือ <code>random.randint()</code> ก็มาจากโมดูลมาตรฐาน!</div>` },
                ,
                    { id: "3.8", title: "การจัดการหน่วยความจำ (Memory Management)", content: `<h2>ตัวแปรถูกเก็บในหน่วยความจำอย่างไร?</h2><p>มาดูความแตกต่างระหว่างข้อมูลที่เปลี่ยนค่าได้ (Mutable) และเปลี่ยนไม่ได้ (Immutable)</p>[MemoryVisualizer]<div class="note">💡 <code>List</code> เป็น Mutable ส่วน <code>int</code> และ <code>String</code> เป็น Immutable</div>` }
                ],
                practical: [
                    { question: "สร้างตัวแปรชื่อ age และกำหนดค่าเป็น 18", expectedPattern: /age\s*=\s*18/, hint: "ใช้เครื่องหมาย = กำหนดค่า" },
                    { question: "สร้างตัวแปรชื่อ name และกำหนดค่าเป็นข้อความ John", expectedPattern: /name\s*=\s*(\'|\")John(\'|\")/, hint: "อย่าลืมใส่เครื่องหมายคำพูด (Quotes) ครอบข้อความ" },
                    { question: "แปลงตัวแปร age ที่เป็นตัวเลข ให้เป็นข้อความ (String) ด้วยฟังก์ชัน str() แล้วเก็บในตัวแปร age_str", expectedPattern: /age_str\s*=\s*str\(age\)/, hint: "ใช้ str(age)" }
                ],
                quiz: [
                    { question: "ข้อใดตั้งชื่อตัวแปรใน Python ได้ถูกต้อง?", options: ["1student_name", "student-name", "student_name", "student name"], answer: 2 },
                    { question: "ชนิดข้อมูล Boolean มีค่าอะไรได้บ้าง?", options: ["0 และ 1", "True และ False", "Yes และ No", "On และ Off"], answer: 1 },
                    { question: "คำสั่งใดใช้สำหรับนำเข้าโมดูลเสริมเข้ามาใช้งาน?", options: ["include", "require", "import", "using"], answer: 2 },
                ]
            },
            {
                id: 4,
                title: "หน่วยที่ 4 การใช้กระบวนการเขียนโปรแกรม",
                lessons: [
                    { id: "4.1", title: "ภาพรวมการควบคุมทิศทางโปรแกรม", content: `<h2>จำลองการทำงานของ Control Flow</h2><p>รวบรวมเครื่องมือสำหรับควบคุมทิศทางโปรแกรม ไม่ว่าจะเป็น Operator, เงื่อนไข หรือการวนซ้ำ</p>[ControlFlow]<div class="note">💡 โปรแกรมจะเก่งขึ้นก็ต่อเมื่อมีการตัดสินใจ (If) และทำงานซ้ำได้ (Loop)</div>` },
                    { id: "4.2", title: "การรับข้อมูลด้วยคำสั่ง <code>input()</code>", content: `<h2>รับข้อมูลจากผู้ใช้</h2><p>โปรแกรมที่ดีต้องตอบสนองกับผู้ใช้ได้ ลองใช้ <code>input()</code> เพื่อรับข้อความ</p>[InputDemo]<div class="note">💡 ค่าที่ได้จาก input() จะเป็นข้อความ (String) เสมอ!</div>` },
                    { id: "4.3", title: "การแสดงผลและการจัดรูปแบบข้อความด้วยคำสั่ง <code>print()</code>", content: `<h2>จัดรูปแบบการแสดงผล</h2><p><code>print()</code> ทำอะไรได้มากกว่าแค่แสดงข้อความ ลองดูพารามิเตอร์ต่างๆ</p>[PrintFormat]<div class="note">💡 f-string (มีตัว f นำหน้า "") คือวิธีจัดฟอร์แมตที่ง่ายและนิยมที่สุดในปัจจุบัน</div>` },
                    { id: "4.4", title: "ตัวดำเนินการทางคณิตศาสตร์ (Arithmetic Operators)", content: `<h2>คำนวณตัวเลข</h2><p>บวก ลบ คูณ หาร และอื่นๆ ลองเปลี่ยนค่าเพื่อดูผล</p>[ArithmeticOps]<div class="note">💡 <code>//</code> <code>//</code> คือหารปัดเศษทิ้ง ส่วน <code>%</code> คือการหารเอาเศษ</div>` },
                    { id: "4.5", title: "ตัวดำเนินการกำหนดค่า (Assignment Operators)", content: `<h2>กำหนดและอัปเดตค่า</h2><p>วิธีเขียนแบบย่อเมื่อต้องคำนวณและเก็บค่าลงตัวแปรเดิม</p>[AssignmentOps]<div class="note">💡 <code>x += 1</code> มีค่าเท่ากับ <code>x = x + 1</code></div>` },
                    { id: "4.6", title: "ตัวดำเนินการเปรียบเทียบ (Comparison Operators)", content: `<h2>การเปรียบเทียบ</h2><p>ใช้สำหรับตรวจสอบเงื่อนไข ผลลัพธ์จะเป็น True หรือ False เสมอ</p>[ComparisonOps]<div class="note">💡 ระวัง! <code>=</code> คือการกำหนดค่า ส่วน <code>==</code> คือการเปรียบเทียบ</div>` },
                    { id: "4.7", title: "ตัวดำเนินการทางตรรกศาสตร์ (Logical Operators)", content: `<h2>เชื่อมเงื่อนไข (<code>and</code>, <code>or</code>, <code>not</code>)</h2><p>ใช้เมื่อต้องการตรวจสอบหลายเงื่อนไขพร้อมกัน</p>[LogicalOps]<div class="note">💡 <code>and</code> ต้องจริงทั้งคู่ / <code>or</code> จริงแค่ตัวเดียวก็พอ</div>` },
                    { id: "4.8", title: "ตัวดำเนินการระบุเอกลักษณ์ (Identity Operators)", content: `<h2>ตรวจสอบตัวตน (<code>is</code>, <code>is not</code>)</h2><p>ใช้ตรวจว่าตัวแปรชี้ไปที่วัตถุ (Object) เดียวกันในหน่วยความจำหรือไม่</p>[IdentityOps]<div class="note">💡 <code>==</code> ตรวจสอบ "ค่า", <code>is</code> ตรวจสอบ "ที่อยู่หน่วยความจำ"</div>` },
                    { id: "4.9", title: "ตัวดำเนินการความเป็นสมาชิก (Membership Operators)", content: `<h2>ตรวจสอบการเป็นสมาชิก (<code>in</code>, <code>not in</code>)</h2><p>ค้นหาว่ามีค่านั้นอยู่ใน List หรือ String หรือไม่</p>[MembershipOps]<div class="note">💡 ใช้ <code>in</code> เพื่อหาข้อความย่อย (Substring) ได้อย่างรวดเร็ว</div>` },
                    { id: "4.10", title: "ตัวดำเนินการระดับบิต (Bitwise Operators)", content: `<h2>จัดการข้อมูลระดับบิต</h2><p>ทำงานกับเลขฐาน 2 โดยตรง (มักใช้ในระบบเครือข่ายหรือ IoT)</p>[BitwiseOps]<div class="note">💡 การเลื่อนบิตไปทางซ้าย (<code>&lt;&lt;</code>) เท่ากับการคูณด้วย 2</div>` },
                    { id: "4.11", title: "การใช้งานเงื่อนไข <code>if</code>", content: `<h2>เงื่อนไข <code>if</code></h2><p>ถ้าเงื่อนไขเป็นจริง ให้ทำงานตามคำสั่งที่ระบุ ลองปรับอุณหภูมิเพื่อดูผล</p>[IfStatement]<div class="note">💡 บรรทัดใต้ if ต้องเว้นวรรค (Indentation) เสมอ</div>` },
                    { id: "4.12", title: "การใช้งานเงื่อนไข <code>elif</code>", content: `<h2>ทางเลือกหลายทาง (elif)</h2><p>ใช้เมื่อมีหลายเงื่อนไขที่ต้องตรวจสอบตามลำดับ เช่น การตัดเกรด</p>[ElifStatement]<div class="note">💡 Python จะทำคำสั่งใน elif บล็อกแรกที่เป็นจริงเท่านั้น</div>` },
                    { id: "4.13", title: "การใช้งานเงื่อนไข else", content: `<h2>ทางเลือกสุดท้าย (else)</h2><p>ถ้าไม่มีเงื่อนไขใดเป็นจริงเลย โปรแกรมจะเข้าสู่บล็อก <code>else</code></p>[ElseStatement]<div class="note">💡 บล็อก <code>else</code> ไม่ต้องใส่เงื่อนไขต่อท้าย</div>` },
                    { id: "4.14", title: "การทำงานซ้ำด้วย while loop", content: `<h2>วนซ้ำแบบมีเงื่อนไข (while)</h2><p>ทำงานไปเรื่อยๆ จนกว่าเงื่อนไขจะกลายเป็นเท็จ</p>[WhileLoop]<div class="note">💡 อย่าลืมอัปเดตเงื่อนไข (เช่น <code>count += 1</code>) ไม่งั้นโปรแกรมจะวนลูปไม่รู้จบ (Infinite Loop)!</div>` },
                    { id: "4.15", title: "การทำงานซ้ำด้วย for loop", content: `<h2>วนซ้ำตามจำนวนข้อมูล (for)</h2><p>ใช้เพื่อดึงข้อมูลทีละตัวออกจากโครงสร้างข้อมูล เช่น <code>List</code></p>[ForLoop]<div class="note">💡 <code>for item in list:</code> เป็นวิธีอ่านข้อมูลที่สะอาดและอ่านง่ายที่สุดใน Python</div>` },
                    { id: "4.16", title: "การใช้งานฟังก์ชัน <code>range()</code> ร่วมกับลูป", content: `<h2>สร้างช่วงตัวเลขด้วย range()</h2><p>ฟังก์ชันคู่บุญของ for loop สำหรับจัดการตัวเลข</p>[RangeFunction]<div class="note">💡 <code>range(start, stop, step)</code> ไม่รวมค่า stop เสมอ!</div>` },
                ],
                practical: [
                    { question: "เขียนคำสั่ง if เพื่อตรวจสอบว่า x > 10 ถ้าใช่ให้ print(\'Pass\')", expectedPattern: /if\s+x\s*>\s*10\s*:\s*print\((\'|\")Pass(\'|\")\)/, hint: "ระวังการจัดย่อหน้า และเครื่องหมาย : ท้ายเงื่อนไข" },
                    { question: "เขียนคำสั่ง for loop เพื่อวนค่า i ใน range(5)", expectedPattern: /for\s+i\s+in\s+range\(5\)\s*:/, hint: "ใช้ for i in range(5):" },
                    { question: "คำนวณ 5 ยกกำลัง 2 และเก็บผลลัพธ์ในตัวแปร result", expectedPattern: /result\s*=\s*5\s*\*\*\s*2/, hint: "ใช้เครื่องหมาย ** สำหรับยกกำลัง" }
                ],
                quiz: [
                    { question: "เครื่องหมายใดใน Python ใช้สำหรับหาเศษจากการหาร (Modulo)?", options: ["//", "/", "%", "**"], answer: 2 },
                    { question: "ตัวดำเนินการตรรกศาสตร์ใด ต้องเป็น True ทั้งคู่ จึงจะได้ผลลัพธ์เป็น True?", options: ["and", "or", "not", "is"], answer: 0 },
                    { question: "ถ้ามีเงื่อนไขให้ตรวจสอบมากกว่า 2 ทางเลือก ควรใช้โครงสร้างแบบใด?", options: ["if - else", "if - elif - else", "while - do", "for - in"], answer: 1 },
                ]
            },
            {
                id: 5,
                title: "หน่วยที่ 5 การจัดการข้อมูลแบบชุด",
                lessons: [
                    { id: "5.1", title: "การใช้งาน List (การเพิ่ม ลบ และแก้ไขข้อมูล)", content: `<h2>ชนิดข้อมูล List</h2><p>ใช้เก็บข้อมูลหลายๆ ตัวไว้ในตัวแปรเดียว สามารถเพิ่ม ลบ หรือแก้ไขข้อมูลได้อิสระ</p>[ListExplorer]<div class="note">💡 List หุ้มด้วย <code>[]</code> และ Index เริ่มต้นที่ 0 เสมอ</div>` },
                    { id: "5.2", title: "การใช้งาน Tuple และ Dictionary (Key-Value Pairs)", content: `<h2>Tuple และ Dictionary</h2><p>Tuple เหมือน List แต่แก้ไขไม่ได้ ส่วน Dictionary เก็บข้อมูลแบบ Key-Value คู่กัน</p>[TupleDictExplorer]<div class="note">💡 Tuple หุ้มด้วย <code>()</code> ส่วน Dictionary หุ้มด้วย <code>{}</code></div>` },
                    { id: "5.3", title: "การใช้งาน Set และการจัดการข้อความ (String Manipulation/Slicing)", content: `<h2>Set และ String Slicing</h2><p>Set ใช้เก็บข้อมูลที่ไม่ซ้ำกัน ส่วน String Slicing ใช้ตัดบางส่วนของข้อความออกมา</p>[SetStringExplorer]<div class="note">💡 <code>[0:5]</code> หมายถึงเอาตั้งแต่ Index 0 แต่ไม่ถึง Index 5</div>` },
                ],
                quiz: [
                    { question: "ชนิดข้อมูลใดใน Python ที่ไม่สามารถแก้ไขข้อมูลภายในได้ (Immutable)?", options: ["List", "Dictionary", "Tuple", "Set"], answer: 2 },
                    { question: "ชนิดข้อมูลใดที่เก็บข้อมูลแบบ Key-Value?", options: ["List", "Dictionary", "Tuple", "Set"], answer: 1 },
                ],
                practical: [
                    { question: "สร้าง List ชื่อ students เก็บข้อความ 'A', 'B', 'C'", expectedPattern: /students\s*=\s*\[\s*('A'|"A")\s*,\s*('B'|"B")\s*,\s*('C'|"C")\s*\]/, hint: "ใช้ [] ครอบรายการและคั่นด้วยลูกน้ำ" },
                    { question: "เพิ่มข้อความ 'D' ต่อท้าย List students", expectedPattern: /students\.append\(\s*('D'|"D")\s*\)/, hint: "ใช้ method append()" },
                    { question: "ลบข้อมูลตำแหน่งแรก (Index 0) ออกจาก List students", expectedPattern: /students\.pop\(\s*0\s*\)/, hint: "ใช้ method pop(0)" }
                ]
            },
            {
                id: 6,
                title: "หน่วยที่ 6 ฟังก์ชัน (Function)",
                lessons: [
                    { id: "6.1", title: "การเรียกใช้งานฟังก์ชันมาตรฐาน (Built-in Functions)", content: `<h2>ฟังก์ชันมาตรฐาน (Built-in)</h2><p>Python มีฟังก์ชันมากมายเตรียมไว้ให้ใช้ได้เลย โดยไม่ต้องสร้างเอง ลองค้นหาดู</p>[BuiltinFunctions]<div class="note">💡 ฟังก์ชันอย่าง <code>len()</code>, <code>type()</code>, <code>print()</code> ล้วนเป็น Built-in Functions</div>` },
                    { id: "6.2", title: "การสร้างฟังก์ชันใช้งานเองด้วยคำสั่ง def และการส่งค่าพารามิเตอร์", content: `<h2>สร้างฟังก์ชันเอง (Custom Function)</h2><p>เมื่อฟังก์ชันมาตรฐานไม่ตอบโจทย์ เราสามารถสร้างเองได้ด้วยคำสั่ง def</p>[DefFunction]<div class="note">💡 การตั้ง Default Value ช่วยให้ฟังก์ชันยืดหยุ่นขึ้น เรียกโดยไม่ใส่ค่าก็ไม่ Error</div>` },
                    { id: "6.3", title: "การคืนค่าจากฟังก์ชัน (return) และขอบเขตตัวแปร (Local vs Global)", content: `<h2>การคืนค่า (Return) และขอบเขตตัวแปร (Scope)</h2><p>ทำความเข้าใจว่าฟังก์ชันส่งค่ากลับมายังไง และทำไมตัวแปรข้างในถึงไม่กระทบข้างนอก</p>[ReturnScope]<div class="note">💡 ถ้าไม่สั่ง <code>return</code> ฟังก์ชันจะคืนค่า <code>None</code> ออกมาโดยอัตโนมัติ</div>` },

                    { id: "6.4", title: "ทดลองสร้างฟังก์ชันและทดสอบผลลัพธ์", content: `<h2>เครื่องมือสร้างฟังก์ชัน (Function Builder)</h2><p>ทดลองสร้างฟังก์ชันรับพารามิเตอร์ และดูผลลัพธ์ที่เปลี่ยนไปตามการเรียกใช้งาน</p>[FunctionBuilder]<div class="note">💡 ฟังก์ชันที่ดีต้องทำงานเดียวให้สำเร็จ (Single Responsibility)</div>` }
                ],
                practical: [
                    { question: "เขียนโครงสร้างฟังก์ชันชื่อ say_hello แบบไม่มีพารามิเตอร์ และใช้คำสั่ง pass ไว้ข้างใน", expectedPattern: /def\s+say_hello\(\)\s*:\s*pass/, hint: "def say_hello():\n    pass" },
                    { question: "เขียนฟังก์ชัน add(a, b) ที่ return ค่า a + b", expectedPattern: /def\s+add\(a\s*,\s*b\)\s*:\s*return\s+a\s*\+\s*b/, hint: "def add(a, b):\n    return a + b" }
                ],
                quiz: [
                    { question: "คำสั่งใดใช้สำหรับสร้างฟังก์ชันใหม่ใน Python?", options: ["function", "def", "create", "func"], answer: 1 },
                    { question: "หากต้องการส่งผลลัพธ์ออกจากฟังก์ชัน ต้องใช้คำสั่งใด?", options: ["print", "output", "send", "return"], answer: 3 },
                ]
            },
            {
                id: 7,
                title: "หน่วยที่ 7 การออกแบบโปรแกรมอย่างง่าย",
                lessons: [
                    { id: "7.1", title: "หลักการออกแบบโปรแกรมทางธุรกิจ", content: `<h2>ออกแบบอย่างไรให้ใช้งานได้จริง?</h2><p>การเขียนโปรแกรมธุรกิจต้องคำนึงถึงความถูกต้อง ป้องกันข้อผิดพลาด และอ่านง่าย</p>[BusinessDesign]<div class="note">💡 โปรแกรมที่ดีคือโปรแกรมที่คนอื่นมาอ่านโค้ดต่อแล้วเข้าใจได้ทันที</div>` },
                    { id: "7.2", title: "การเขียนโปรแกรมธุรกิจ (มีเงื่อนไขและวนซ้ำ)", content: `<h2>ตรรกะทางธุรกิจ (Business Logic)</h2><p>รวมพลัง If-Else และ Loop เพื่อสร้างระบบคำนวณส่วนลดและภาษี</p>[BusinessLogic]<div class="note">💡 โค้ดส่วนคำนวณเงินควรแยกออกมาเป็นฟังก์ชันต่างหาก เพื่อให้ง่ายต่อการแก้ไข</div>` },
                    { id: "7.3", title: "การจัดการข้อผิดพลาด (Error Handling)", content: `<h2>ทำไมโปรแกรมถึงล่ม?</h2><p>ป้องกันโปรแกรมแครชเมื่อผู้ใช้กรอกข้อมูลผิดประเภทด้วย Try-Except</p>[ErrorHandling]<div class="note">💡 <code>ValueError</code> มักเกิดเมื่อรับค่ามาเป็น string แต่พยายามแปลงเป็น int ไม่ได้</div>` },
                    { id: "7.4", title: "การทำงานกับไฟล์ (File Handling)", content: `<h2>อ่านและเขียนไฟล์</h2><p>ข้อมูลจะหายไปเมื่อปิดโปรแกรม ถ้าไม่บันทึกลงไฟล์! มาดูวิธีจัดการไฟล์กัน</p>[FileHandler]<div class="note">💡 ใช้ <code>with open(...) as f:</code> เสมอ เพื่อให้ Python ปิดไฟล์ให้อัตโนมัติ</div>` },
                ],
                quiz: [
                    { question: "คำสั่งใดใน Python ที่ใช้สำหรับดักจับข้อผิดพลาด?", options: ["if-else", "for-while", "try-except", "catch-error"], answer: 2 },
                    { question: "Mode ใดในการเปิดไฟล์ที่ใช้สำหรับ 'เขียนต่อท้าย' ข้อมูลเดิม?", options: ["r", "w", "a", "x"], answer: 2 },
                ],
                practical: [
                    { question: "เขียนโครงสร้าง try-except พื้นฐาน โดยให้ print('Error') เมื่อเกิดข้อผิดพลาดในบล็อก except", expectedPattern: /try\s*:[\s\S]*except\s*:[\s\S]*print\(\s*('Error'|"Error")\s*\)/, hint: "try:\n   ...\nexcept:\n   print('Error')" },
                    { question: "เขียนคำสั่งเปิดไฟล์ 'data.txt' ในโหมดอ่าน ('r') แล้วเก็บลงตัวแปร f", expectedPattern: /f\s*=\s*open\(\s*('data.txt'|"data.txt")\s*,\s*('r'|"r")\s*\)/, hint: "f = open('data.txt', 'r')" }
                ]
            },
            {
                id: 8,
                title: "หน่วยที่ 8 การประยุกต์ใช้งาน",
                lessons: [
                    { id: "8.1", title: "การจัดทำเอกสารประกอบโปรแกรม", content: `<h2>เขียนคู่มือโปรแกรม</h2><p>เอกสารประกอบมีความสำคัญไม่แพ้โค้ด ลองดูโครงสร้างที่ควรมีในเอกสาร</p>[DocGenerator]<div class="note">💡 ไฟล์ <code>README.md</code> คือหน้าตาของโปรเจกต์ที่เราควรเขียนให้ดี</div>` },
                    { id: "8.2", title: "โครงงานเขียนโปรแกรมอย่างง่าย (ระบบ Mini POS)", content: `<h2>กรณีศึกษา: ระบบแคชเชียร์เบื้องต้น</h2><p>นำความรู้ทั้งหมดมาสร้างโปรแกรมจำลองร้านค้า (Mini POS) ซึ่งรวมทุกแนวคิดที่เรียนมา</p>[MiniPOS]<div class="note">💡 โครงงานนี้ผสาน Function, Loop, List/Tuple, และ If-Else เข้าด้วยกันอย่างสมบูรณ์!</div>` },
                ],
                quiz: [
                    { question: "ส่วนใดของเอกสารประกอบโปรแกรมที่อธิบายวิธีรันโปรแกรม?", options: ["จุดประสงค์", "วิธีติดตั้ง/ใช้งาน", "คำอธิบายโค้ด", "ผู้จัดทำ"], answer: 1 },
                    { question: "จากระบบ Mini POS ฟังก์ชันใดเหมาะสำหรับใช้หา 'ราคารวมทั้งหมด' มากที่สุด?", options: ["len()", "max()", "sum()", "count()"], answer: 2 },
                ],
                practical: [
                    { question: "เปิดไฟล์ history.txt โหมดต่อท้าย ('a') เพื่อบันทึกคำว่า 'Order 1'", expectedPattern: /open\(\s*('history.txt'|"history.txt")\s*,\s*('a'|"a")\s*\)/, hint: "f = open('history.txt', 'a')" }
                ]
            }
        ]
    },
    {
        id: "21910-1001",
        title: "ระบบปฏิบัติการเบื้องต้น",
        description: "เรียนรู้การทำงานของระบบปฏิบัติการ Windows, Linux และ macOS การจัดการไฟล์และการใช้งานโปรแกรมยูทิลิตี้พื้นฐาน",
        icon: "💻",
        chapters: []
    },
    {
        id: "21910-1002",
        title: "คอมพิวเตอร์และการบำรุงรักษา",
        description: "ศึกษาอุปกรณ์ฮาร์ดแวร์ การประกอบเครื่องคอมพิวเตอร์ การติดตั้งโปรแกรม และการดูแลรักษาระบบเบื้องต้น",
        icon: "🔧",
        chapters: []
    },
    {
        id: "21910-1004",
        title: "การสร้างเว็บไซต์เบื้องต้น",
        description: "เรียนรู้โครงสร้าง HTML5, CSS3 เบื้องต้น สำหรับการออกแบบและจัดหน้าเว็บไซต์แบบ Responsive",
        icon: "🌐",
        chapters: []
    },
    {
        id: "21910-1005",
        title: "คณิตศาสตร์คอมพิวเตอร์",
        description: "ศึกษาระบบเลขฐาน การแปลงเลขฐาน ตรรกศาสตร์ พีชคณิตบูลีน ที่จำเป็นสำหรับระบบคอมพิวเตอร์",
        icon: "🔢",
        chapters: []
    },
    {
        id: "21910-1006",
        title: "เครือข่ายคอมพิวเตอร์เบื้องต้น",
        description: "เรียนรู้สถาปัตยกรรมเครือข่าย โปรโตคอล TCP/IP อุปกรณ์เครือข่าย และการติดตั้งระบบ LAN เบื้องต้น",
        icon: "🖧",
        chapters: []
    },
    {
        id: "21910-1007",
        title: "กราฟิกดีไซน์และการแต่งภาพ",
        description: "การใช้โปรแกรมตกแต่งภาพ หลักการออกแบบ ทฤษฎีสี และการสร้างสรรค์ผลงานกราฟิกเบื้องต้น",
        icon: "🎨",
        chapters: []
    },
    {
        id: "21910-1008",
        title: "การวิเคราะห์และออกแบบเชิงวัตถุ",
        description: "ศึกษาหลักการวิเคราะห์ระบบและออกแบบระบบงานเชิงวัตถุ (Object-Oriented Analysis and Design) ด้วย UML",
        icon: "📊",
        chapters: []
    },
    {
        id: "21910-1009",
        title: "การออกแบบส่วนติดต่อผู้ใช้ขั้นสูง",
        description: "ศึกษาและออกแบบ UI/UX ที่ตอบสนองต่อผู้ใช้งานอย่างมีประสิทธิภาพ รวมถึงการออกแบบการโต้ตอบที่ซับซ้อน",
        icon: "🎨",
        chapters: []
    },
    {
        id: "21910-1010",
        title: "หลักการคิดเชิงออกแบบและนวัตกรรมธุรกิจดิจิทัล",
        description: "เรียนรู้กระบวนการ Design Thinking เพื่อค้นหาปัญหา พัฒนาไอเดีย และสร้างสรรค์นวัตกรรมธุรกิจยุคดิจิทัล",
        icon: "💡",
        chapters: []
    },
    {
        id: "21910-1011",
        title: "การสอบถามข้อมูลเชิงโครงสร้างเบื้องต้น",
        description: "ศึกษาการใช้ภาษา SQL เพื่อดึงข้อมูล กรองข้อมูล เชื่อมโยงตาราง และประมวลผลข้อมูลในฐานข้อมูลเชิงสัมพันธ์",
        icon: "🗄️",
        chapters: []
    },
    {
        id: "21910-1012",
        title: "โครงงานด้านเทคโนโลยีธุรกิจดิจิทัล",
        description: "นำความรู้ทั้งหมดมาประยุกต์ใช้ในการพัฒนาโครงงานด้านเทคโนโลยี เพื่อแก้ปัญหาในธุรกิจจริง",
        icon: "🚀",
        chapters: []
    },
    oopCourse
];

export default courses;
