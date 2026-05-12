const oopCourse = {
    id: "21910-1013",
    title: "การเขียนโปรแกรมเชิงวัตถุ",
    description: "ศึกษาหลักการเขียนโปรแกรมเชิงวัตถุ (OOP) คลาส วัตถุ การสืบทอด การออกแบบ GUI และการสร้างโปรเจกต์ธุรกิจ",
    icon: "📦",
    chapters: [
        {
            id: 1,
            title: "หน่วยที่ 1 การเตรียมเครื่องมือ",
            lessons: [
                { 
                    id: "1.1", 
                    title: "ติดตั้ง Python", 
                    content: `
                        <h2>การตั้งค่าสภาพแวดล้อม: ติดตั้ง Python</h2>
                        <p>หัวใจสำคัญของการเขียนโปรแกรมเชิงวัตถุในวิชานี้คือภาษา Python ซึ่งเป็นภาษาที่สนับสนุน OOP อย่างสมบูรณ์แบบ</p>
                        <div class="note">
                            💡 <strong>ขั้นตอนการติดตั้ง:</strong>
                            <ol>
                                <li>ไปที่เว็บไซต์ <a href="https://www.python.org/downloads/" target="_blank" class="text-blue-500 underline">python.org</a></li>
                                <li>ดาวน์โหลดเวอร์ชันล่าสุด (แนะนำ 3.10 ขึ้นไป)</li>
                                <li><strong>สำคัญมาก:</strong> ตอนติดตั้ง อย่าลืมติ๊กถูกที่ช่อง <code>Add Python to PATH</code></li>
                                <li>กด Install Now และรอจนเสร็จสิ้น</li>
                            </ol>
                        </div>
                    
                        [PythonInstallGuide]
                        ` 
                },
                { 
                    id: "1.2", 
                    title: "ติดตั้ง VS Code", 
                    content: `
                        <h2>โปรแกรมแก้ไขโค้ด: VS Code</h2>
                        <p>Visual Studio Code (VS Code) เป็นโปรแกรมยอดนิยมที่เบาและมีประสิทธิภาพสูงมาก</p>
                        <ul>
                            <li>ดาวน์โหลดฟรีจาก <a href="https://code.visualstudio.com/" target="_blank" class="text-blue-500 underline">code.visualstudio.com</a></li>
                            <li>รองรับส่วนเสริม (Extensions) มากมายที่ช่วยให้การเขียนโค้ดสบายขึ้น</li>
                        </ul>
                    
                        [VSCodeInstallGuide]
                        ` 
                },
                { 
                    id: "1.3", 
                    title: "ติดตั้ง Extension Python", 
                    content: `
                        <h2>เพิ่มพลังให้ VS Code ด้วย Extension</h2>
                        <p>เพื่อให้ VS Code เข้าใจภาษา Python และช่วยตรวจสอบโค้ดของเราได้ ต้องติดตั้งส่วนเสริมดังนี้:</p>
                        <div class="note">
                            💡 <strong>วิธีติดตั้ง:</strong>
                            <ol>
                                <li>เปิด VS Code ขึ้นมา</li>
                                <li>ไปที่เมนู Extensions (ไอคอนสี่เหลี่ยมต่อกัน ด้านซ้ายมือ) หรือกด <code>Ctrl+Shift+X</code></li>
                                <li>พิมพ์ค้นหาคำว่า <code>Python</code> (พัฒนาโดย Microsoft)</li>
                                <li>กดปุ่ม <strong>Install</strong></li>
                            </ol>
                        </div>
                    
                        [ExtensionInstallDemo]
                        ` 
                },
                { id: "1.4", title: "ตั้งค่า Python Interpreter", content: "<h2>การเลือกตัวแปลภาษา (Interpreter)</h2><p>เมื่อเราเปิดไฟล์ .py ใน VS Code เราต้องบอกโปรแกรมว่าเราจะใช้ Python ตัวไหนในการรัน โดยการกด <code>Ctrl+Shift+P</code> พิมพ์ <code>Python: Select Interpreter</code> แล้วเลือกเวอร์ชันที่เราเพิ่งติดตั้งไป</p>[InterpreterSetupDemo]" },
                { id: "1.5", title: "ใช้งาน Terminal ใน VS Code", content: "<h2>การรันคำสั่งผ่าน Terminal</h2><p>เราสามารถรันโปรแกรมผ่าน Terminal ในตัว VS Code ได้เลย โดยไม่ต้องเปิดหน้าต่าง Command Prompt แยกต่างหาก</p><p>วิธีเปิด: ไปที่เมนู <code>Terminal > New Terminal</code> หรือกด <code>Ctrl+\`</code> (ปุ่มสัญลักษณ์ตัวหนอน)</p>[PythonTerminalSimulator]" },
                { id: "1.6", title: "ติดตั้งไลบรารีด้วย pip", content: "<h2>การจัดการแพ็คเกจ (Package Management)</h2><p>ในอนาคตเราจะต้องใช้ไลบรารีเสริม (เช่น PyGame หรือ Requests) เราสามารถใช้คำสั่ง <code>pip install ชื่อไลบรารี</code> ใน Terminal เพื่อดาวน์โหลดและติดตั้งได้ทันที</p>[PipInstallDemo]" },
                { id: "1.7", title: "จัดการโฟลเดอร์โปรเจกต์", content: "<h2>โครงสร้างโฟลเดอร์ที่เป็นระเบียบ</h2><p>ในการทำงานโปรเจกต์ใหญ่ๆ ควรสร้างโฟลเดอร์แยกตามงานเสมอ เช่น <code>src/</code> สำหรับเก็บโค้ด, <code>assets/</code> สำหรับเก็บรูปภาพ เป็นต้น การจัดระเบียบแต่เนิ่นๆ จะทำให้หาไฟล์ได้ง่าย</p>[ProjectStructureDemo]" }
            ],
            quiz: []
        },
        {
            id: 2,
            title: "หน่วยที่ 2 คลาสและวัตถุ (Classes & Objects)",
            lessons: [
                { 
                    id: "2.1", 
                    title: "การเขียนคลาส (class)", 
                    content: `
                        <h2>จากแนวคิด สู่พิมพ์เขียว (Blueprint)</h2>
                        <p>ในการเขียนโปรแกรมเชิงวัตถุ เราจะมองทุกอย่างรอบตัวเป็น <strong>วัตถุ (Object)</strong> เช่น รถยนต์ 1 คัน, นักเรียน 1 คน แต่ก่อนที่เราจะสร้างวัตถุได้ เราต้องมี <strong>พิมพ์เขียว (Class)</strong> ก่อน</p>
                        <p>ลองนึกภาพ <code>Class</code> เหมือนพิมพ์เขียวสร้างบ้าน ส่วน <code>Object</code> คือบ้านที่สร้างเสร็จแล้วจริงๆ 1 หลัง</p>
                        [ClassDefinitionDemo]
                        <p>เรามาลองสร้างพิมพ์เขียวด้วยคำสั่ง <code>class</code> กัน:</p>
                        <pre><code class="language-python">class Student:
    # ภายในนี้คือส่วนกำหนดคุณสมบัติและพฤติกรรม
    pass</code></pre>
                    ` 
                },
                { 
                    id: "2.2", 
                    title: "กำหนดคุณสมบัติ (__init__)", 
                    content: `
                        <h2>กำหนดคุณสมบัติ (__init__)</h2>
                        <p>ลองนึกภาพเหมือนเราสั่งโรงงานผลิตรถยนต์ เมื่อรถ 1 คันถูกสร้างเสร็จ เราอยากให้มันมีสีและรุ่นติดตัวมาแต่แรกเลย เราจะใช้เมธอด <code>__init__</code></p>
                        <pre><code class="language-python">class Car:
    def __init__(self, color, model):
        self.color = color
        self.model = model</code></pre>
                        [ConstructorDemo]
                        ` 
                },
                { 
                    id: "2.3", 
                    title: "การใช้งาน self", 
                    content: `
                        <h2>การใช้งาน self</h2>
                        <p><code>self</code> เป็นพารามิเตอร์พิเศษที่ต้องมีเสมอในเมธอดของคลาส มันคือ <strong>ตัวแทนของ Object นั้นๆ</strong></p>
                        <pre><code class="language-python">class Robot:
    def __init__(self, name):
        self.name = name  # กำหนดชื่อให้หุ่นยนต์ตัวนี้</code></pre>
                        [SelfUsageDemo]
                        ` 
                },
                { 
                    id: "2.4", 
                    title: "การสร้างเมธอด (Methods)", 
                    content: `
                        <h2>การสร้างเมธอด (Methods)</h2>
                        <p>คลาสไม่ได้มีแค่คุณสมบัติ (ข้อมูล) แต่ยังสามารถทำพฤติกรรมต่างๆ ได้ด้วย เราเรียกพฤติกรรมนี้ว่า <strong>เมธอด (Methods)</strong></p>
                        <pre><code class="language-python">class BankAccount:
    def __init__(self, balance):
        self.balance = balance
        
    def deposit(self, amount):
        self.balance += amount</code></pre>
                        [MethodCreationDemo]
                        ` 
                },
                { 
                    id: "2.5", 
                    title: "การสร้างออบเจ็กต์ (Instantiation)", 
                    content: `
                        <h2>การสร้างออบเจ็กต์ (Instantiation)</h2>
                        <p>เมื่อเรามีพิมพ์เขียว (Class) แล้ว เราสามารถสร้างวัตถุจริงๆ ออกมาได้กี่อันก็ได้ เราเรียกกระบวนการนี้ว่า <strong>Instantiation</strong></p>
                        <pre><code class="language-python"># สร้าง Object บ้าน 2 หลัง
house1 = House("บ้านพี่มาร์ค", "แดง")
house2 = House("บ้านน้องแม็ค", "น้ำเงิน")</code></pre>
                        [InstantiationDemo]
                        ` 
                },
                { 
                    id: "2.6", 
                    title: "การซ่อนข้อมูล (_ และ __)", 
                    content: `
                        <h2>การห่อหุ้มข้อมูล (Encapsulation)</h2>
                        <p>ในโลกแห่งความเป็นจริง ข้อมูลบางอย่างเราไม่อยากให้คนนอกมาเปลี่ยนเล่นได้ง่ายๆ (เช่น ยอดเงินในบัญชี) ใน Python เราใช้ขีดล่างเพื่อซ่อนข้อมูล:</p>
                        <ul>
                            <li><code>_name</code> (ขีดเดียว): เป็นการบอกนักพัฒนาด้วยกันว่าตัวแปรนี้ "โปรดอย่าแก้จากภายนอกนะ" (แต่จริงๆ ยังเข้าถึงได้)</li>
                            <li><code>__money</code> (สองขีด): ซ่อนแบบจริงจัง (Name Mangling) ทำให้คนนอกเข้าถึงโดยตรงไม่ได้ หรือเข้าถึงยากขึ้น</li>
                        </ul>
                        [EncapsulationDemo]
                    ` 
                },
                { 
                    id: "2.7", 
                    title: "การใช้งาน @property", 
                    content: `
                        <h2>1. เวทมนตร์ของ @property (Pythonic Way)</h2>
                        <p>การเขียน <code>get_name()</code> และ <code>set_name()</code> แบบในภาษาอื่นอาจทำให้โค้ดดูรุงรัง Python จึงมี <strong>@property Decorator</strong> ที่ทำให้เราเรียกใช้งาน Method เหมือนเรียกตัวแปรปกติ</p>
                        <p class="text-python-blue font-semibold">"ใช้งานง่ายเหมือน Attribute ปกติ แต่ปลอดภัยเหมือนมี Getter/Setter ซ่อนอยู่ข้างหลัง"</p>
                        [PropertyDecoratorDemo]
                        ` 
                },
                { 
                    id: "2.8", 
                    title: "การเก็บวัตถุใน List", 
                    content: `
                        <h2>1. ทำไมต้องเก็บ Object ใน List?</h2>
                        <p>ในความเป็นจริง โปรแกรมของเรามักจะจัดการกับข้อมูลจำนวนมาก เช่น รายชื่อนักเรียน หรือรายการสินค้าในตะกร้า แทนที่เราจะสร้างตัวแปรแยกกันทีละตัว เราสามารถสร้าง <strong>Object</strong> แล้วนำไปต่อท้าย (Append) เก็บไว้ใน <strong>List</strong> ได้อย่างเป็นระเบียบ</p>
                        [ObjectListDemo]
                        ` 
                },
                { 
                    id: "2.9", 
                    title: "การสืบทอดคลาส (Inheritance)", 
                    content: `
                        <h2>1. การสืบทอดคลาส (Inheritance) คืออะไร?</h2>
                        <p>ในโลกแห่งความเป็นจริง ลูกสามารถสืบทอดสายเลือดจากพ่อแม่ได้ ในการเขียนโปรแกรมก็เช่นกัน!</p>
                        <p><strong>Inheritance</strong> คือการสร้างคลาสใหม่ (Child Class) โดยสืบทอดคุณสมบัติ (Attributes) และพฤติกรรม (Methods) มาจากคลาสที่มีอยู่แล้ว (Parent Class) ช่วยให้เราไม่ต้องเขียนโค้ดเดิมซ้ำๆ และสามารถเพิ่มเติมความสามารถเฉพาะตัวให้คลาสลูกได้</p>
                        [InheritanceRPGDemo]
                        ` 
                }
            ],
            quiz: [
                { question: "ข้อใดคือความหมายของ Class ใน OOP?", options: ["ออบเจ็กต์ที่ทำงานอยู่จริง", "พิมพ์เขียวหรือต้นแบบในการสร้างวัตถุ", "ฟังก์ชันพิเศษของภาษา", "ข้อผิดพลาดของโปรแกรม"], answer: 1 },
                { question: "เราใช้คำสั่งใดในการสร้างเมธอดที่จะถูกเรียกใช้งานอัตโนมัติเมื่อสร้างออบเจ็กต์ใหม่?", options: ["__start__", "__create__", "__init__", "constructor()"], answer: 2 },
                { question: "การซ่อนคุณสมบัติไม่ให้ถูกเรียกใช้จากภายนอกคลาสโดยตรง ใช้สัญลักษณ์ใดนำหน้า?", options: ["$$", "@", "__", "!"], answer: 2 }
            ],
            practical: [
                { 
                    id: "oop-p1", 
                    title: "สร้างคลาสสินค้า", 
                    question: "จงสร้างคลาสชื่อ Product ที่มีเมธอด __init__ รับพารามิเตอร์ name และ price โดยมีบรรทัด self.name = name",
                    expectedPattern: /class\s+Product\s*:[\s\S]*def\s+__init__\s*\(\s*self\s*,\s*name\s*,\s*price\s*\)\s*:[\s\S]*self\.name\s*=\s*name/, 
                    hint: "class Product:\n    def __init__(self, name, price):\n        self.name = name\n        self.price = price" 
                }
            ]
        },
        {
            id: 3,
            title: "หน่วยที่ 3 การออกแบบ GUI",
            lessons: [
                { id: "3.1", title: "พื้นฐานไลบรารี Tkinter", content: "<h2>สร้างหน้าต่างแรกด้วย Tkinter</h2><p>การเขียนโปรแกรมหน้าต่างกราฟิกใน Python ทำได้ง่ายๆ ผ่านไลบรารีมาตรฐานที่ชื่อ <code>tkinter</code></p><pre><code class=\"language-python\">import tkinter as tk\\n\\nroot = tk.Tk()\\nroot.mainloop()</code></pre>" },
                { id: "3.2", title: "การสร้างหน้าต่างหลัก", content: "<h2>Window Object</h2><p>ตัวแปร <code>root</code> คือ Object หน้าต่างหลักที่เราต้องสร้างขึ้นมาก่อนสิ่งอื่นใด และต้องปิดท้ายด้วย <code>root.mainloop()</code> เพื่อให้หน้าต่างค้างอยู่บนจอ</p>" },
                { id: "3.3", title: "ตั้งค่าขนาดและชื่อหน้าต่าง", content: "<h2>ปรับแต่งขนาดและชื่อ</h2><pre><code class=\"language-python\">root.title(\"โปรแกรมแรกของฉัน\")\\nroot.geometry(\"400x300\")  # กว้างxยาว</code></pre>" },
                { id: "3.4", title: "การสร้างป้ายชื่อ (Label)", content: "<h2>แสดงข้อความด้วย Label</h2><p>Widget แรกที่ใช้แสดงตัวอักษร</p><pre><code class=\"language-python\">label = tk.Label(root, text=\"สวัสดีชาวโลก\")\\nlabel.pack()</code></pre>" },
                { id: "3.5", title: "การสร้างช่องกรอก (Entry)", content: "<h2>รับข้อมูลด้วย Entry</h2><p>Widget สำหรับให้ผู้ใช้พิมพ์ข้อความลงไป 1 บรรทัด</p><pre><code class=\"language-python\">entry = tk.Entry(root)\\nentry.pack()</code></pre>" },
                { id: "3.6", title: "การสร้างปุ่มกด (Button)", content: "<h2>สร้างปุ่มด้วย Button</h2><p>ปุ่มสามารถตั้งค่าให้ทำงานร่วมกับฟังก์ชันได้เมื่อถูกคลิก (ผ่าน <code>command=ฟังก์ชัน</code>)</p><pre><code class=\"language-python\">btn = tk.Button(root, text=\"คลิกฉัน\")\\nbtn.pack()</code></pre>" },
                { id: "3.7", title: "การจัดวางแบบ Grid และ Pack", content: "<h2>Layout Manager</h2><p>ลองเล่นกับเครื่องมือจำลองการจัดวางดูสิ ว่า Pack กับ Grid ต่างกันอย่างไร</p>[TkinterPreviewer]" },
                { id: "3.8", title: "การสร้างกล่องเลือก (Combo)", content: "<h2>Combobox (Dropdown)</h2><p>ส่วนขยาย <code>ttk</code> (Themed Tkinter) ช่วยให้เราสร้าง Dropdown ได้สวยงามขึ้น</p><pre><code class=\"language-python\">from tkinter import ttk\\ncombo = ttk.Combobox(root, values=[\"A\", \"B\", \"C\"])\\ncombo.pack()</code></pre>" },
                { id: "3.9", title: "การปรับแต่งสีและฟอนต์", content: "<h2>Styling</h2><p>เราสามารถแต่งสีข้อความ (fg), สีพื้นหลัง (bg) และฟอนต์ได้ เช่น <code>font=(\"Arial\", 16)</code>, <code>bg=\"#FF0000\"</code></p>" }
            ],
            quiz: [
                { question: "ไลบรารีใดใน Python ที่ใช้สำหรับสร้างหน้าต่าง GUI ตามมาตรฐาน?", options: ["PyGame", "Django", "Tkinter", "Requests"], answer: 2 },
                { question: "เมธอดใดที่จำเป็นต้องมีไว้บรรทัดสุดท้ายเสมอ เพื่อให้หน้าต่างแสดงค้างไว้ได้?", options: ["show()", "start()", "run()", "mainloop()"], answer: 3 },
                { question: "Widget ใดใช้สำหรับรับข้อมูลที่เป็นข้อความ 1 บรรทัดจากผู้ใช้?", options: ["Label", "Entry", "Button", "Text"], answer: 1 }
            ],
            practical: [
                { 
                    id: "oop-p3-1", 
                    title: "ตั้งชื่อหน้าต่างและขนาด", 
                    question: "จาก root = tk.Tk() จงเขียนคำสั่งตั้งชื่อหน้าต่างว่า 'My App' และตั้งขนาดหน้าต่างเป็น 500x400 (ใช้ title และ geometry)",
                    expectedPattern: /root\.title\(\s*('My App'|"My App")\s*\)[\s\S]*root\.geometry\(\s*('500x400'|"500x400")\s*\)/, 
                    hint: "root.title('My App')\nroot.geometry('500x400')" 
                },
                { 
                    id: "oop-p3-2", 
                    title: "สร้างปุ่มด้วย Button", 
                    question: "จงสร้างปุ่มชื่อ my_btn ใส่ข้อความว่า 'OK' และแสดงผลด้วย my_btn.pack()",
                    expectedPattern: /my_btn\s*=\s*tk\.Button\(\s*root\s*,\s*text\s*=\s*('OK'|"OK")\s*\)[\s\S]*my_btn\.pack\(\)/, 
                    hint: "my_btn = tk.Button(root, text='OK')\nmy_btn.pack()" 
                }
            ]
        },
        {
            id: 4,
            title: "หน่วยที่ 4 การทดสอบโค้ด",
            lessons: [
                { id: "4.1", title: "ดักจับ Error (Try-Except)", content: "<h2>การจัดการข้อผิดพลาด</h2><p>โปรแกรมที่ดีต้องไม่ล่มเมื่อผู้ใช้กรอกข้อมูลผิดพลาด เราใช้บล็อก <code>try...except</code> เพื่อดักจับ Error</p>[TryExceptDemo]" },
                { id: "4.2", title: "ใช้ Debugger ใน VS Code", content: "<h2>การดีบักโปรแกรม</h2><p>VS Code มีเครื่องมือ Debugger ที่ให้เราหยุดการทำงานของโปรแกรมชั่วคราว (Breakpoint) และดูค่าตัวแปรได้ทีละบรรทัด</p>" },
                { id: "4.3", title: "การอ่าน Error ใน Terminal", content: "<h2>เข้าใจ Error Message</h2><p>เมื่อโปรแกรมเกิดข้อผิดพลาด Python จะพิมพ์ Traceback ออกมา ซึ่งจะบอกว่าเกิดบรรทัดไหน และเป็น Error ชนิดใด (เช่น ValueError, TypeError)</p>" },
                { id: "4.4", title: "การเขียน Unit Test", content: "<h2>ทดสอบระบบย่อย</h2><p>การเขียนโค้ดเพื่อทดสอบโค้ดอีกที (Automated Testing) ด้วยไลบรารี <code>unittest</code> ช่วยให้มั่นใจว่าฟังก์ชันทำงานถูกต้องเสมอ</p>" },
                { id: "4.5", title: "การแปลงชนิดข้อมูล (Casting)", content: "<h2>Type Casting ในระบบ</h2><p>ข้อมูลที่รับจาก Entry จะเป็นข้อความ (String) เสมอ เราต้องใช้ <code>int()</code> หรือ <code>float()</code> เพื่อนำไปคำนวณ</p>" },
                { id: "4.6", title: "การตรวจสอบข้อมูล (Validation)", content: "<h2>ตรวจสอบก่อนบันทึก</h2><p>ก่อนนำข้อมูลไปประมวลผล ต้องเช็คก่อนว่าผู้ใช้ไม่ได้ปล่อยช่องว่างไว้ หรือกรอกข้อมูลผิดประเภท</p>" },
                { id: "4.7", title: "การบันทึกไฟล์ JSON", content: "<h2>ทำงานร่วมกับ JSON</h2><p>ในโปรเจกต์ที่เราไม่มีฐานข้อมูล เราสามารถบันทึกข้อมูลของระบบให้อยู่ในรูปแบบไฟล์ .json ได้ง่ายๆ ด้วยไลบรารี <code>json</code></p>" },
                { id: "4.8", title: "การทดสอบตรรกะคำนวณ", content: "<h2>ทดสอบ Business Logic</h2><p>ทดลองรันโค้ดและส่งค่าที่ถูกต้อง, ค่าที่ผิดปกติ และค่าขอบเขต (Boundary Value) เพื่อดูว่าโปรแกรมทำงานรอดหรือไม่</p>" }
            ],
            quiz: [
                { question: "คำสั่งใดใช้สำหรับดักจับข้อผิดพลาดไม่ให้โปรแกรมพังปิดตัวเอง?", options: ["if...else", "try...except", "switch...case", "for...in"], answer: 1 },
                { question: "ข้อมูลที่รับมาจากช่องกรอก tk.Entry() จะเป็นชนิดข้อมูลแบบใดเสมอ?", options: ["Integer", "Float", "Boolean", "String"], answer: 3 }
            ],
            practical: [
                { 
                    id: "oop-p4-1", 
                    title: "แปลงเป็นตัวเลขดักจับ Error", 
                    question: "จงเขียนบล็อก try-except เพื่อรับค่า text เข้ามาแปลงเป็นตัวเลขเก็บใน num = int(text) ถ้าเกิด ValueError ให้ print ว่า 'Error'",
                    expectedPattern: /try\s*:[\s\S]*num\s*=\s*int\(\s*text\s*\)[\s\S]*except\s+ValueError\s*:[\s\S]*print\(\s*('Error'|"Error")\s*\)/, 
                    hint: "try:\n    num = int(text)\nexcept ValueError:\n    print('Error')" 
                }
            ]
        },
        {
            id: 5,
            title: "หน่วยที่ 5 โปรเจกต์ธุรกิจ",
            lessons: [
                { id: "5.1", title: "วิเคราะห์โจทย์ธุรกิจ", content: "<h2>Requirement Analysis</h2><p>เราจะพัฒนาระบบขายของหน้าร้าน (POS) โดยวิเคราะห์ก่อนว่าระบบต้องเก็บบันทึกอะไรบ้าง เช่น รหัสสินค้า ชื่อสินค้า ราคา และตะกร้าสินค้า</p>" },
                { id: "5.2", title: "เขียนแผนผังคลาส (UML)", content: "<h2>Class Diagram</h2><p>การเขียนแผนภาพคลาสเพื่อแสดงความสัมพันธ์ระหว่าง <code>Product</code> และ <code>Cart</code> ก่อนลงมือเขียนโค้ดจริง</p>[POSProjectUML]" },
                { id: "5.3", title: "การแยกไฟล์โมเดลข้อมูล", content: "<h2>แยกส่วนประกอบ (MVC)</h2><p>เราจะไม่เขียนโค้ดทั้งหมดลงในไฟล์เดียว แต่จะแยกไฟล์ <code>models.py</code> (สำหรับ Class) และ <code>main.py</code> (สำหรับ GUI) ออกจากกัน</p>" },
                { id: "5.4", title: "การเชื่อม GUI กับตรรกะ", content: "<h2>ผูก UI เข้ากับโค้ดหลัก</h2><p>สร้างฟังก์ชันให้เมื่อกดปุ่ม 'เพิ่มลงตะกร้า' ให้ระบบทำการสร้างออบเจ็กต์ Product และเก็บลงในออบเจ็กต์ Cart</p>" },
                { id: "5.5", title: "พัฒนาระบบขายของ (POS)", content: "<h2>สร้างระบบขายหน้าร้าน</h2><p>ประกอบร่าง GUI ด้วย Tkinter และนำ Data Model มาผูกเข้าด้วยกัน เพื่อแสดงราคารวมและรายการสินค้าแบบ Real-time</p>" },
                { id: "5.6", title: "การทดสอบระบบรวม (E2E)", content: "<h2>End-to-End Testing</h2><p>ทดลองเป็นผู้ใช้จริงโดยคลิกเลือกสินค้า ลบสินค้า และคำนวณเงินทอน เพื่อหาบั๊กในระบบ</p>" },
                { id: "5.7", title: "การเขียนคู่มือการใช้งาน", content: "<h2>User Manual</h2><p>เขียนวิธีใช้โปรแกรมแบบสั้นๆ ให้ผู้ที่นำโปรแกรมเราไปใช้สามารถทำความเข้าใจได้ง่าย</p>" },
                { id: "5.8", title: "การนำเสนอและสาธิตผลงาน", content: "<h2>Presentation</h2><p>ฝึกฝนการอธิบายโค้ด (Code Walkthrough) และการโชว์ผลลัพธ์ (Demo) ให้เพื่อนและอาจารย์ดู</p>" }
            ],
            quiz: [
                { question: "ทำไมเราจึงต้องเขียน Class Diagram (UML) ก่อนการเขียนโค้ดจริง?", options: ["เพื่อสร้างหน้าจอให้สวยงาม", "เพื่อให้รันโค้ดได้เร็วขึ้น", "เพื่อวางแผนและเห็นภาพรวมความสัมพันธ์ของคลาส", "เพื่อให้คอมพิวเตอร์แปลงเป็นโค้ดอัตโนมัติ"], answer: 2 },
                { question: "การแบ่งไฟล์แยกตามหน้าที่การทำงาน (เช่น โมเดลข้อมูล, หน้าจอ) เรียกสถาปัตยกรรมนี้ว่าอะไร?", options: ["OOP", "MVC", "API", "JSON"], answer: 1 }
            ],
            practical: []
        }
    ]
};

export default oopCourse;
