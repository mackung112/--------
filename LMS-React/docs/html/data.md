ปรับโค้ดหัวข้อดังนี้

<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>2.1 โครงสร้างตาราง - SQL Course</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@300;400;500;600;700&family=Fira+Code:wght@400;500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['"Noto Sans Thai"', 'sans-serif'],
                        mono: ['"Fira Code"', 'monospace'],
                    },
                    colors: {
                        mysql: {
                            blue: '#00758F',
                            orange: '#F29111',
                            dark: '#1e293b'
                        }
                    }
                }
            }
        }
    </script>
    <style>
        body {
            background-color: #f8fafc;
            color: #334155;
        }
        .pop-in {
            animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        @keyframes popIn {
            0% { transform: scale(0); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
        }
        .slide-in-right {
            animation: slideInRight 0.5s ease-out forwards;
        }
        @keyframes slideInRight {
            0% { transform: translateX(50px); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
        }
        
        /* Table Interactive Styles */
        .table-grid {
            display: grid;
            grid-template-columns: 80px repeat(4, 1fr);
            gap: 2px;
            background-color: #cbd5e1;
            border: 2px solid #94a3b8;
            border-radius: 8px;
            overflow: hidden;
        }
        .cell {
            background-color: white;
            padding: 12px 8px;
            text-align: center;
            transition: all 0.2s;
            cursor: pointer;
            position: relative;
        }
        .cell-header {
            background-color: #f1f5f9;
            font-weight: bold;
            color: #0f172a;
        }
        .cell-id {
            background-color: #e2e8f0;
            font-weight: bold;
            color: #64748b;
        }
        
        /* Hover Effects */
        .hover-col .cell:nth-child(5n+2) { background-color: rgba(56, 189, 248, 0.2); }
        .hover-col .cell-header:nth-child(5n+2) { background-color: rgba(56, 189, 248, 0.4); }
        
        .hover-row .cell[data-row="1"] { background-color: rgba(244, 63, 94, 0.2); }
        .hover-row .cell-id[data-row="1"] { background-color: rgba(244, 63, 94, 0.4); }

        .highlight-col { background-color: rgba(56, 189, 248, 0.3) !important; border-left: 2px solid #0ea5e9; border-right: 2px solid #0ea5e9;}
        .highlight-col-top { border-top: 2px solid #0ea5e9; }
        .highlight-col-bottom { border-bottom: 2px solid #0ea5e9; }

        .highlight-row { background-color: rgba(244, 63, 94, 0.2) !important; border-top: 2px solid #f43f5e; border-bottom: 2px solid #f43f5e; }
        .highlight-row-left { border-left: 2px solid #f43f5e; }
        .highlight-row-right { border-right: 2px solid #f43f5e; }

        .highlight-cell { background-color: rgba(234, 179, 8, 0.3) !important; border: 2px solid #eab308; z-index: 10; transform: scale(1.05); font-weight: bold;}

        /* Dropzone Styles for Quiz */
        .dropzone {
            min-height: 40px;
            border: 2px dashed #94a3b8;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #f8fafc;
            transition: all 0.2s;
        }
        .dropzone.active {
            border-color: #F29111;
            background-color: #fffbeb;
            box-shadow: 0 0 0 2px rgba(242, 145, 17, 0.2);
        }
        .dropzone.correct {
            border-color: #10b981;
            border-style: solid;
            background-color: #d1fae5;
            color: #065f46;
            font-weight: bold;
        }
        .draggable {
            cursor: grab;
            user-select: none;
        }
        .draggable:active {
            cursor: grabbing;
        }

        #toast {
            visibility: hidden;
            opacity: 0;
            transition: visibility 0s, opacity 0.3s linear;
        }
        #toast.show {
            visibility: visible;
            opacity: 1;
        }
    </style>

</head>
<body class="antialiased min-h-screen flex flex-col">

    <header class="bg-gradient-to-r from-mysql-blue to-cyan-900 text-white shadow-lg sticky top-0 z-50">
        <div class="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
            <div class="flex items-center gap-3">
                <i class="fa-solid fa-database text-mysql-orange text-3xl"></i>
                <div>
                    <h1 class="text-xl font-bold leading-tight">SQL Course (21901-2001)</h1>
                    <p class="text-sm text-cyan-200">Unit 2: งานจัดการตาราง (Table Management)</p>
                </div>
            </div>
            <div class="hidden sm:block">
                <span class="bg-white/20 px-3 py-1 rounded-full text-sm font-medium border border-white/30 backdrop-blur-sm">
                    บทที่ 2.1 โครงสร้างตาราง
                </span>
            </div>
        </div>
    </header>

    <main class="flex-grow max-w-5xl mx-auto px-4 py-8 w-full space-y-12">

        <section class="text-center space-y-4 max-w-3xl mx-auto">
            <h2 class="text-3xl md:text-4xl font-bold text-slate-800">1. โครงสร้างพื้นฐานของตาราง</h2>
            <p class="text-lg text-slate-600 leading-relaxed">
                ในฐานข้อมูลเชิงสัมพันธ์ (Relational Database) ข้อมูลจะถูกเก็บในรูปแบบของ <strong>"ตาราง" (Table)</strong> ซึ่งมีโครงสร้างคล้ายกับตารางใน Excel ประกอบไปด้วยแนวตั้งและแนวนอน มาทำความรู้จักคำศัพท์ที่ถูกต้องกันครับ
            </p>
        </section>

        <section class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div class="bg-slate-800 text-white p-4 border-b border-slate-700 flex justify-between items-center">
                <h3 class="font-bold text-cyan-400"><i class="fa-solid fa-table border border-cyan-400 p-1 rounded mr-2"></i>Interactive: Table Anatomy (ตารางพนักงาน)</h3>
            </div>

            <div class="p-6 md:p-8 flex flex-col lg:flex-row gap-8">

                <!-- Left: Table Display -->
                <div class="w-full lg:w-2/3 overflow-x-auto pb-4">
                    <div class="table-grid min-w-[500px]" id="interactiveTable">
                        <!-- Headers (Row 0) -->
                        <div class="cell cell-header rounded-tl-md text-xs text-slate-400 flex items-center justify-center">PK</div>
                        <div class="cell cell-header" data-col="1" data-type="column" data-name="emp_id">emp_id</div>
                        <div class="cell cell-header" data-col="2" data-type="column" data-name="first_name">first_name</div>
                        <div class="cell cell-header" data-col="3" data-type="column" data-name="department">department</div>
                        <div class="cell cell-header rounded-tr-md" data-col="4" data-type="column" data-name="salary">salary</div>

                        <!-- Row 1 -->
                        <div class="cell cell-id" data-row="1" data-type="row">1</div>
                        <div class="cell" data-row="1" data-col="1" data-type="cell">101</div>
                        <div class="cell" data-row="1" data-col="2" data-type="cell">Somchai</div>
                        <div class="cell" data-row="1" data-col="3" data-type="cell">IT</div>
                        <div class="cell" data-row="1" data-col="4" data-type="cell">35000</div>

                        <!-- Row 2 -->
                        <div class="cell cell-id" data-row="2" data-type="row">2</div>
                        <div class="cell" data-row="2" data-col="1" data-type="cell">102</div>
                        <div class="cell" data-row="2" data-col="2" data-type="cell">Suda</div>
                        <div class="cell" data-row="2" data-col="3" data-type="cell">HR</div>
                        <div class="cell" data-row="2" data-col="4" data-type="cell">28000</div>

                        <!-- Row 3 -->
                        <div class="cell cell-id rounded-bl-md" data-row="3" data-type="row">3</div>
                        <div class="cell" data-row="3" data-col="1" data-type="cell">103</div>
                        <div class="cell" data-row="3" data-col="2" data-type="cell">Mana</div>
                        <div class="cell" data-row="3" data-col="3" data-type="cell">Sales</div>
                        <div class="cell rounded-br-md" data-row="3" data-col="4" data-type="cell">42000</div>
                    </div>
                    <div class="text-center text-xs text-slate-400 mt-3 flex items-center justify-center gap-2">
                        <i class="fa-solid fa-hand-pointer animate-bounce"></i> ลองคลิกที่หัวคอลัมน์, ตัวเลขแถว หรือข้อมูลข้างในดูสิครับ
                    </div>
                </div>

                <!-- Right: Explanation Panel -->
                <div class="w-full lg:w-1/3 bg-slate-50 rounded-xl border border-slate-200 p-5 flex flex-col justify-center min-h-[250px]" id="infoPanel">
                    <div class="text-center text-slate-400 flex flex-col items-center">
                        <i class="fa-regular fa-square-caret-left text-4xl mb-3 opacity-50"></i>
                        <p>คลิกที่ส่วนต่างๆ ของตารางทางซ้าย<br>เพื่อดูคำศัพท์และคำอธิบาย</p>
                    </div>
                </div>

            </div>

            <!-- Pre-defined buttons to trigger highlights -->
            <div class="bg-slate-100 p-4 border-t border-slate-200 flex flex-wrap gap-3 justify-center">
                <span class="text-sm text-slate-500 flex items-center mr-2">ปุ่มลัดคำศัพท์:</span>
                <button class="btn-highlight bg-sky-100 hover:bg-sky-200 text-sky-700 border border-sky-300 px-4 py-2 rounded-lg text-sm font-semibold transition-colors" data-target="column">
                    <i class="fa-solid fa-arrows-up-down"></i> Column / Field (คอลัมน์)
                </button>
                <button class="btn-highlight bg-rose-100 hover:bg-rose-200 text-rose-700 border border-rose-300 px-4 py-2 rounded-lg text-sm font-semibold transition-colors" data-target="row">
                    <i class="fa-solid fa-arrows-left-right"></i> Row / Record (แถว)
                </button>
                <button class="btn-highlight bg-yellow-100 hover:bg-yellow-200 text-yellow-700 border border-yellow-300 px-4 py-2 rounded-lg text-sm font-semibold transition-colors" data-target="cell">
                    <i class="fa-solid fa-border-all"></i> Data / Value (ข้อมูล)
                </button>
            </div>
        </section>

        <section class="space-y-6">
            <h2 class="text-2xl font-bold text-slate-800 border-l-4 border-mysql-blue pl-4">2. สรุปคำศัพท์ที่ต้องจำ (Terminology)</h2>
            <p class="text-slate-600">ในโลกของฐานข้อมูล เรามักจะใช้คำศัพท์เฉพาะทางแทนคำทั่วไป เพื่อความชัดเจนในการสื่อสารครับ</p>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <!-- Column Card -->
                <div class="bg-white p-5 rounded-xl shadow-sm border border-slate-200 hover:border-sky-400 hover:shadow-md transition-all group">
                    <div class="w-12 h-12 bg-sky-100 text-sky-600 rounded-lg flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform">
                        <i class="fa-solid fa-table-columns"></i>
                    </div>
                    <h3 class="font-bold text-lg text-slate-800 mb-1">Column (คอลัมน์)</h3>
                    <p class="text-sm font-semibold text-sky-600 mb-3">เรียกอีกอย่างว่า: Field (ฟิลด์), Attribute</p>
                    <p class="text-sm text-slate-600">
                        คือ <strong>แนวตั้ง</strong> ของตาราง ใช้กำหนด "หัวข้อ" หรือ "ประเภทข้อมูล" ที่ต้องการเก็บ เช่น ชื่อพนักงาน, แผนก, เงินเดือน (ข้อมูลในคอลัมน์เดียวกันต้องเป็นชนิดเดียวกัน)
                    </p>
                </div>

                <!-- Row Card -->
                <div class="bg-white p-5 rounded-xl shadow-sm border border-slate-200 hover:border-rose-400 hover:shadow-md transition-all group">
                    <div class="w-12 h-12 bg-rose-100 text-rose-600 rounded-lg flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform">
                        <i class="fa-solid fa-list-ul"></i>
                    </div>
                    <h3 class="font-bold text-lg text-slate-800 mb-1">Row (แถว)</h3>
                    <p class="text-sm font-semibold text-rose-600 mb-3">เรียกอีกอย่างว่า: Record (เรคคอร์ด), Tuple</p>
                    <p class="text-sm text-slate-600">
                        คือ <strong>แนวนอน</strong> ของตาราง แสดงถึงข้อมูลของ "1 รายการ" หรือ "1 คน/สิ่งของ" แบบครบถ้วน เช่น ข้อมูลของพนักงานสมชายทั้งแถว (ประกอบด้วยหลายฟิลด์รวมกัน)
                    </p>
                </div>

                <!-- Table Card -->
                <div class="bg-white p-5 rounded-xl shadow-sm border border-slate-200 hover:border-emerald-400 hover:shadow-md transition-all group md:col-span-2 lg:col-span-1">
                    <div class="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform">
                        <i class="fa-solid fa-table"></i>
                    </div>
                    <h3 class="font-bold text-lg text-slate-800 mb-1">Table (ตาราง)</h3>
                    <p class="text-sm font-semibold text-emerald-600 mb-3">เรียกอีกอย่างว่า: Relation (รีเลชัน), Entity</p>
                    <p class="text-sm text-slate-600">
                        คือ <strong>ชุดของข้อมูล</strong> ที่จัดเก็บในรูปแบบแถวและคอลัมน์ ฐานข้อมูลหนึ่งๆ มักประกอบด้วยหลายตารางที่สัมพันธ์กัน (เช่น ตารางพนักงาน เชื่อมกับ ตารางแผนก)
                    </p>
                </div>
            </div>
        </section>

        <section class="space-y-6 bg-slate-800 p-6 md:p-8 rounded-2xl shadow-xl text-white">
            <div class="flex items-center gap-3 mb-2">
                <i class="fa-solid fa-gamepad text-mysql-orange text-2xl"></i>
                <h2 class="text-2xl font-bold">3. กิจกรรมตรวจสอบความเข้าใจ (Drag & Drop)</h2>
            </div>
            <p class="text-slate-300 text-sm mb-6">ลากป้ายคำศัพท์ด้านล่าง ไปวางในช่องว่างให้ตรงกับความหมายที่ถูกต้อง</p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

                <!-- Definition Sentences -->
                <div class="space-y-4">
                    <!-- Q1 -->
                    <div class="bg-slate-900/50 p-4 rounded-xl border border-slate-700 flex items-center gap-3">
                        <div class="w-8 h-8 rounded-full bg-slate-700 text-slate-300 flex items-center justify-center font-bold flex-shrink-0">1</div>
                        <div class="flex-grow">
                            <p class="text-sm leading-relaxed">
                                ข้อมูลใน <strong>แนวตั้ง</strong> ที่ระบุหัวข้อ เช่น 'ราคาสินค้า' เรียกว่า <br>
                                <span class="dropzone inline-flex w-32 h-10 mt-2 align-middle" data-answer="column"></span>
                            </p>
                        </div>
                    </div>

                    <!-- Q2 -->
                    <div class="bg-slate-900/50 p-4 rounded-xl border border-slate-700 flex items-center gap-3">
                        <div class="w-8 h-8 rounded-full bg-slate-700 text-slate-300 flex items-center justify-center font-bold flex-shrink-0">2</div>
                        <div class="flex-grow">
                            <p class="text-sm leading-relaxed">
                                ข้อมูลของลูกค้า 1 คนแบบครบถ้วนตั้งแต่ชื่อยันเบอร์โทร ที่เรียงใน <strong>แนวนอน</strong> เรียกว่า <br>
                                <span class="dropzone inline-flex w-32 h-10 mt-2 align-middle" data-answer="row"></span>
                            </p>
                        </div>
                    </div>

                    <!-- Q3 -->
                    <div class="bg-slate-900/50 p-4 rounded-xl border border-slate-700 flex items-center gap-3">
                        <div class="w-8 h-8 rounded-full bg-slate-700 text-slate-300 flex items-center justify-center font-bold flex-shrink-0">3</div>
                        <div class="flex-grow">
                            <p class="text-sm leading-relaxed">
                                คำศัพท์ทางเทคนิคที่โปรแกรมเมอร์มักใช้เรียกแทนคำว่า 'Column' คือคำว่า <br>
                                <span class="dropzone inline-flex w-32 h-10 mt-2 align-middle" data-answer="field"></span>
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Draggable Options -->
                <div class="bg-slate-700/30 p-6 rounded-xl border border-slate-600/50">
                    <h4 class="text-sm font-semibold text-slate-300 mb-4 text-center border-b border-slate-600 pb-2">คลังคำศัพท์ (ลากไปวาง)</h4>
                    <div class="flex flex-wrap gap-3 justify-center min-h-[150px] content-start" id="optionsContainer">
                        <div class="draggable bg-sky-600 hover:bg-sky-500 text-white px-4 py-2 rounded shadow-lg border border-sky-400 font-semibold text-sm" draggable="true" data-val="column">
                            <i class="fa-solid fa-arrows-up-down mr-1"></i> Column
                        </div>
                        <div class="draggable bg-rose-600 hover:bg-rose-500 text-white px-4 py-2 rounded shadow-lg border border-rose-400 font-semibold text-sm" draggable="true" data-val="row">
                            <i class="fa-solid fa-arrows-left-right mr-1"></i> Record
                        </div>
                        <div class="draggable bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded shadow-lg border border-emerald-400 font-semibold text-sm" draggable="true" data-val="field">
                            <i class="fa-solid fa-tag mr-1"></i> Field
                        </div>
                        <!-- Decoy -->
                        <div class="draggable bg-slate-600 hover:bg-slate-500 text-white px-4 py-2 rounded shadow-lg border border-slate-400 font-semibold text-sm" draggable="true" data-val="database">
                            <i class="fa-solid fa-database mr-1"></i> Database
                        </div>
                    </div>

                    <div class="mt-6 flex justify-between items-center">
                        <button id="resetDragBtn" class="text-slate-400 hover:text-white transition-colors underline text-xs">
                            <i class="fa-solid fa-rotate-right mr-1"></i> รีเซ็ต
                        </button>
                        <div id="quizSuccessMsg" class="hidden text-emerald-400 font-bold text-sm animate-pulse">
                            <i class="fa-solid fa-check-circle mr-1"></i> เก่งมาก! ตอบถูกทั้งหมด
                        </div>
                    </div>
                </div>

            </div>
        </section>

        <!-- Navigation to next unit -->
        <div class="flex justify-between items-center pt-8 border-t border-slate-200">
            <button class="text-slate-500 hover:text-mysql-blue transition-colors flex items-center gap-2">
                <i class="fa-solid fa-arrow-left"></i> Unit 1
            </button>
            <button class="bg-mysql-blue hover:bg-cyan-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-cyan-600/30 flex items-center gap-2" onclick="alert('ไปยังบทเรียน: 2.2 ประเภทข้อมูล (Data Types)')">
                ไปต่อ: 2.2 Data Types <i class="fa-solid fa-arrow-right"></i>
            </button>
        </div>

    </main>

    <footer class="bg-slate-900 text-slate-400 py-6 text-center text-sm mt-auto">
        <p>© 2026 SQL Course Interactive Learning | 21901-2001</p>
    </footer>

    <!-- Custom Toast Notification -->
    <div id="toast" class="fixed bottom-5 right-5 bg-slate-800 text-white px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-3 border-l-4 border-emerald-500">
        <i id="toastIcon" class="fa-solid fa-circle-check text-emerald-500 text-xl"></i>
        <div id="toastMsg" class="font-medium">ทำได้ยอดเยี่ยม!</div>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', () => {

            // --- Section 1: Interactive Table Logic ---
            const cells = document.querySelectorAll('.cell');
            const infoPanel = document.getElementById('infoPanel');
            const btnHighlights = document.querySelectorAll('.btn-highlight');

            // Content for info panel
            const infoData = {
                'column': {
                    title: 'Column / Field (คอลัมน์)',
                    icon: 'fa-arrows-up-down',
                    color: 'text-sky-500',
                    bg: 'bg-sky-100',
                    desc: 'ข้อมูลในแนวตั้ง หมายถึง <strong>ประเภทของข้อมูล</strong> 1 ชนิดที่อยู่ในตาราง เช่น คอลัมน์ "first_name" จะเก็บเฉพาะชื่อพนักงานเท่านั้น โปรแกรมเมอร์มักเรียกว่า "ฟิลด์" (Field)'
                },
                'row': {
                    title: 'Row / Record (แถว)',
                    icon: 'fa-arrows-left-right',
                    color: 'text-rose-500',
                    bg: 'bg-rose-100',
                    desc: 'ข้อมูลในแนวนอน หมายถึง <strong>ข้อมูล 1 รายการ</strong> ที่ประกอบไปด้วยฟิลด์ต่างๆ รวมกัน เช่น แถวที่ 2 คือข้อมูลของพนักงานชื่อ Suda แผนก HR เงินเดือน 28000 โปรแกรมเมอร์มักเรียกว่า "เรคคอร์ด" (Record)'
                },
                'cell': {
                    title: 'Data Value (ข้อมูล)',
                    icon: 'fa-border-all',
                    color: 'text-yellow-600',
                    bg: 'bg-yellow-100',
                    desc: 'จุดตัดระหว่างแถวและคอลัมน์ คือ <strong>เนื้อข้อมูลจริงๆ 1 ค่า</strong> (Single Value) เช่น คำว่า "IT" หรือตัวเลข "35000"'
                }
            };

            function updateInfoPanel(type, value = '') {
                const data = infoData[type];
                let extraInfo = '';
                if(value) extraInfo = `<div class="mt-4 p-2 bg-white rounded border border-slate-200 text-center text-sm font-mono shadow-sm">Selected: <strong>${value}</strong></div>`;

                infoPanel.innerHTML = `
                    <div class="pop-in flex flex-col h-full">
                        <div class="flex items-center gap-3 mb-3 border-b border-slate-200 pb-3">
                            <div class="w-10 h-10 rounded-full ${data.bg} ${data.color} flex items-center justify-center text-lg shadow-sm">
                                <i class="fa-solid ${data.icon}"></i>
                            </div>
                            <h4 class="font-bold text-lg text-slate-800">${data.title}</h4>
                        </div>
                        <p class="text-sm text-slate-600 leading-relaxed flex-grow">${data.desc}</p>
                        ${extraInfo}
                    </div>
                `;
            }

            function clearHighlights() {
                cells.forEach(c => {
                    c.classList.remove('highlight-col', 'highlight-col-top', 'highlight-col-bottom',
                                       'highlight-row', 'highlight-row-left', 'highlight-row-right',
                                       'highlight-cell');
                });
            }

            // Cell Click Event
            cells.forEach(cell => {
                cell.addEventListener('click', function() {
                    clearHighlights();
                    const type = this.getAttribute('data-type');

                    if (type === 'column') {
                        const colId = this.getAttribute('data-col');
                        const colName = this.getAttribute('data-name');

                        // Highlight all cells in this column
                        document.querySelectorAll(`.cell[data-col="${colId}"]`).forEach((c, index, array) => {
                            c.classList.add('highlight-col');
                            if(index === 0) c.classList.add('highlight-col-top');
                            if(index === array.length -1) c.classList.add('highlight-col-bottom');
                        });
                        updateInfoPanel('column', colName);
                    }
                    else if (type === 'row') {
                        const rowId = this.getAttribute('data-row');

                        // Highlight all cells in this row
                        document.querySelectorAll(`.cell[data-row="${rowId}"]`).forEach((c, index, array) => {
                            c.classList.add('highlight-row');
                            if(index === 0) c.classList.add('highlight-row-left');
                            if(index === array.length -1) c.classList.add('highlight-row-right');
                        });
                        updateInfoPanel('row', `Record ID: ${rowId}`);
                    }
                    else if (type === 'cell') {
                        this.classList.add('highlight-cell');
                        updateInfoPanel('cell', this.textContent);
                    }
                });
            });

            // Pre-defined buttons event
            btnHighlights.forEach(btn => {
                btn.addEventListener('click', function() {
                    const target = this.getAttribute('data-target');
                    clearHighlights();

                    if(target === 'column') {
                        const colId = "2"; // Simulate clicking 'first_name' col
                        document.querySelectorAll(`.cell[data-col="${colId}"]`).forEach((c, index, array) => {
                            c.classList.add('highlight-col');
                            if(index === 0) c.classList.add('highlight-col-top');
                            if(index === array.length -1) c.classList.add('highlight-col-bottom');
                        });
                        updateInfoPanel('column', 'first_name');
                    } else if (target === 'row') {
                        const rowId = "2"; // Simulate clicking row 2
                        document.querySelectorAll(`.cell[data-row="${rowId}"]`).forEach((c, index, array) => {
                            c.classList.add('highlight-row');
                            if(index === 0) c.classList.add('highlight-row-left');
                            if(index === array.length -1) c.classList.add('highlight-row-right');
                        });
                        updateInfoPanel('row', 'Record ID: 2');
                    } else if (target === 'cell') {
                        const targetCell = document.querySelector('.cell[data-row="3"][data-col="3"]'); // Mana's department
                        targetCell.classList.add('highlight-cell');
                        updateInfoPanel('cell', targetCell.textContent);
                    }
                });
            });


            // --- Section 3: Drag & Drop Quiz Logic ---
            const draggables = document.querySelectorAll('.draggable');
            const dropzones = document.querySelectorAll('.dropzone');
            const optionsContainer = document.getElementById('optionsContainer');
            const resetDragBtn = document.getElementById('resetDragBtn');
            const quizSuccessMsg = document.getElementById('quizSuccessMsg');
            let correctCount = 0;

            draggables.forEach(draggable => {
                draggable.addEventListener('dragstart', () => {
                    draggable.classList.add('dragging', 'opacity-50');
                });

                draggable.addEventListener('dragend', () => {
                    draggable.classList.remove('dragging', 'opacity-50');
                    checkWinCondition();
                });
            });

            dropzones.forEach(zone => {
                zone.addEventListener('dragover', e => {
                    e.preventDefault(); // Necessary to allow dropping
                    if(!zone.hasChildNodes()) {
                        zone.classList.add('active');
                    }
                });

                zone.addEventListener('dragleave', () => {
                    zone.classList.remove('active');
                });

                zone.addEventListener('drop', e => {
                    e.preventDefault();
                    zone.classList.remove('active');

                    const draggable = document.querySelector('.dragging');
                    if (!draggable) return;

                    // If dropzone already has an item, return it to container
                    if (zone.hasChildNodes()) {
                        const existingItem = zone.firstChild;
                        optionsContainer.appendChild(existingItem);
                        zone.classList.remove('correct');
                    }

                    // Check answer
                    const expectedAnswer = zone.getAttribute('data-answer');
                    const droppedVal = draggable.getAttribute('data-val');

                    zone.appendChild(draggable); // Append item to zone

                    // Style adjustments for dropped item
                    draggable.classList.remove('shadow-lg');
                    draggable.classList.add('shadow-sm', 'w-full', 'h-full', 'flex', 'items-center', 'justify-center', 'm-0', 'rounded-md');

                    if (expectedAnswer === droppedVal) {
                        zone.classList.add('correct');
                        showToast('ถูกต้องครับ!', 'success');
                    } else {
                        zone.classList.remove('correct');
                        // Optional: Kick it back immediately if wrong
                        // setTimeout(() => {
                        //     optionsContainer.appendChild(draggable);
                        //     showToast('อ๊ะ! ยังไม่ถูกนะ ลองใหม่ครับ', 'error');
                        //     resetDraggableStyle(draggable);
                        // }, 500);
                    }
                });
            });

            // Container to catch returned items
            optionsContainer.addEventListener('dragover', e => {
                e.preventDefault();
            });
            optionsContainer.addEventListener('drop', e => {
                e.preventDefault();
                const draggable = document.querySelector('.dragging');
                if (draggable) {
                    optionsContainer.appendChild(draggable);
                    resetDraggableStyle(draggable);

                    // remove correct class from the old zone
                    dropzones.forEach(z => {
                        if(!z.hasChildNodes()) z.classList.remove('correct');
                    });
                }
            });

            function resetDraggableStyle(el) {
                el.classList.remove('w-full', 'h-full', 'flex', 'items-center', 'justify-center', 'm-0', 'rounded-md', 'shadow-sm');
                el.classList.add('shadow-lg');
            }

            function checkWinCondition() {
                let currentCorrect = 0;
                dropzones.forEach(zone => {
                    if(zone.classList.contains('correct')) currentCorrect++;
                });

                if(currentCorrect === 3) {
                    quizSuccessMsg.classList.remove('hidden');
                } else {
                    quizSuccessMsg.classList.add('hidden');
                }
            }

            resetDragBtn.addEventListener('click', () => {
                draggables.forEach(draggable => {
                    optionsContainer.appendChild(draggable);
                    resetDraggableStyle(draggable);
                });
                dropzones.forEach(zone => {
                    zone.classList.remove('correct');
                });
                quizSuccessMsg.classList.add('hidden');
            });


            // --- Custom Toast Function ---
            const toast = document.getElementById('toast');
            const toastMsg = document.getElementById('toastMsg');
            const toastIcon = document.getElementById('toastIcon');
            let toastTimeout;

            function showToast(message, type) {
                clearTimeout(toastTimeout);

                toastMsg.textContent = message;
                toast.classList.remove('border-emerald-500', 'border-red-500', 'border-yellow-500');
                toastIcon.className = 'fa-solid text-xl ';

                if (type === 'success') {
                    toast.classList.add('border-emerald-500');
                    toastIcon.classList.add('fa-circle-check', 'text-emerald-500');
                } else if (type === 'error') {
                    toast.classList.add('border-red-500');
                    toastIcon.classList.add('fa-circle-xmark', 'text-red-500');
                } else {
                    toast.classList.add('border-yellow-500');
                    toastIcon.classList.add('fa-circle-exclamation', 'text-yellow-500');
                }

                toast.classList.add('show');

                toastTimeout = setTimeout(() => {
                    toast.classList.remove('show');
                }, 2000);
            }
        });
    </script>

</body>
</html>
-------------------------------------------------------------------------------------------------------------------------------------
2.2 ประเภทข้อมูล (Data Types)
<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>2.2 ประเภทข้อมูล (Data Types) - SQL Course</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@300;400;500;600;700&family=Fira+Code:wght@400;500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['"Noto Sans Thai"', 'sans-serif'],
                        mono: ['"Fira Code"', 'monospace'],
                    },
                    colors: {
                        mysql: {
                            blue: '#00758F',
                            orange: '#F29111',
                            dark: '#1e293b'
                        }
                    }
                }
            }
        }
    </script>
    <style>
        body {
            background-color: #f8fafc;
            color: #334155;
        }
        .pop-in {
            animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        @keyframes popIn {
            0% { transform: scale(0); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
        }
        
        /* Data Type Card Hover */
        .dtype-card {
            transition: all 0.3s ease;
        }
        .dtype-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
        }

        /* Interactive Demo Area */
        .demo-box {
            transition: all 0.3s ease;
            border: 2px solid transparent;
        }
        .demo-box.valid {
            border-color: #10b981;
            background-color: #f0fdf4;
        }
        .demo-box.invalid {
            border-color: #ef4444;
            background-color: #fef2f2;
            animation: shake 0.5s;
        }

        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            50% { transform: translateX(5px); }
            75% { transform: translateX(-5px); }
        }

        /* Match Game Styles */
        .match-item {
            cursor: pointer;
            transition: all 0.2s ease;
            user-select: none;
        }
        .match-item.selected {
            ring: 4px;
            transform: scale(1.05);
            z-index: 10;
        }
        .match-item.matched {
            opacity: 0.5;
            cursor: not-allowed;
            background-color: #e2e8f0;
            border-color: #cbd5e1;
            color: #94a3b8;
            transform: scale(0.95);
        }

        /* Connect Line Canvas */
        #lines-canvas {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        }

        #toast {
            visibility: hidden;
            opacity: 0;
            transition: visibility 0s, opacity 0.3s linear;
        }
        #toast.show {
            visibility: visible;
            opacity: 1;
        }
    </style>

</head>
<body class="antialiased min-h-screen flex flex-col relative">

    <header class="bg-gradient-to-r from-mysql-blue to-cyan-900 text-white shadow-lg sticky top-0 z-50">
        <div class="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
            <div class="flex items-center gap-3">
                <i class="fa-solid fa-database text-mysql-orange text-3xl"></i>
                <div>
                    <h1 class="text-xl font-bold leading-tight">SQL Course (21901-2001)</h1>
                    <p class="text-sm text-cyan-200">Unit 2: งานจัดการตาราง (Table Management)</p>
                </div>
            </div>
            <div class="hidden sm:block">
                <span class="bg-white/20 px-3 py-1 rounded-full text-sm font-medium border border-white/30 backdrop-blur-sm">
                    บทที่ 2.2 ประเภทข้อมูล (Data Types)
                </span>
            </div>
        </div>
    </header>

    <main class="flex-grow max-w-5xl mx-auto px-4 py-8 w-full space-y-12">

        <section class="text-center space-y-4 max-w-3xl mx-auto">
            <h2 class="text-3xl md:text-4xl font-bold text-slate-800">1. ทำไมต้องกำหนดประเภทข้อมูล?</h2>
            <p class="text-lg text-slate-600 leading-relaxed">
                ก่อนที่เราจะสร้างตาราง เราต้องบอกฐานข้อมูลว่า <strong>แต่ละคอลัมน์จะเก็บข้อมูลแบบไหน</strong> (เช่น ตัวเลข, ตัวอักษร, หรือวันที่) เพื่อให้ฐานข้อมูลจัดสรรพื้นที่เก็บข้อมูลได้อย่างมีประสิทธิภาพ และช่วยป้องกันไม่ให้เราใส่ข้อมูลผิดประเภท
            </p>
        </section>

        <section class="space-y-6">
            <h2 class="text-2xl font-bold text-slate-800 border-l-4 border-mysql-blue pl-4">2. ประเภทข้อมูลหลักที่ใช้บ่อยใน MySQL</h2>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <!-- Numeric Category -->
                <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden dtype-card">
                    <div class="bg-blue-100 px-4 py-3 border-b border-blue-200 flex items-center gap-2">
                        <i class="fa-solid fa-hashtag text-blue-600 text-xl"></i>
                        <h3 class="font-bold text-blue-800 text-lg">ตัวเลข (Numeric)</h3>
                    </div>
                    <div class="p-5 space-y-4">
                        <div>
                            <span class="inline-block bg-slate-800 text-white font-mono px-2 py-1 rounded text-sm mb-1 font-bold">INT</span>
                            <p class="text-sm text-slate-600">เลขจำนวนเต็ม (ไม่มีทศนิยม) เหมาะสำหรับ รหัส, จำนวนนับ, อายุ</p>
                            <p class="text-xs text-slate-400 mt-1"><i class="fa-solid fa-check text-green-500 mr-1"></i> 100, -5, 2026</p>
                        </div>
                        <div class="pt-3 border-t border-slate-100">
                            <span class="inline-block bg-slate-800 text-white font-mono px-2 py-1 rounded text-sm mb-1 font-bold">DECIMAL(M,D)</span>
                            <p class="text-sm text-slate-600">เลขทศนิยมที่ต้องการความแม่นยำสูง เหมาะสำหรับ จำนวนเงิน, ราคาสินค้า <br>(M=จำนวนหลักทั้งหมด, D=หลักทศนิยม)</p>
                            <p class="text-xs text-slate-400 mt-1"><i class="fa-solid fa-check text-green-500 mr-1"></i> DECIMAL(8,2) -> 123456.78</p>
                        </div>
                    </div>
                </div>

                <!-- String Category -->
                <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden dtype-card">
                    <div class="bg-orange-100 px-4 py-3 border-b border-orange-200 flex items-center gap-2">
                        <i class="fa-solid fa-font text-orange-600 text-xl"></i>
                        <h3 class="font-bold text-orange-800 text-lg">ตัวอักษร (String)</h3>
                    </div>
                    <div class="p-5 space-y-4">
                        <div>
                            <span class="inline-block bg-slate-800 text-white font-mono px-2 py-1 rounded text-sm mb-1 font-bold">VARCHAR(N)</span>
                            <p class="text-sm text-slate-600">ข้อความยาวไม่เกิน N ตัวอักษร (ปรับขนาดตามจริง) เหมาะสำหรับ ชื่อ, นามสกุล, อีเมล</p>
                            <p class="text-xs text-slate-400 mt-1"><i class="fa-solid fa-check text-green-500 mr-1"></i> 'Somchai', 'admin@example.com'</p>
                        </div>
                        <div class="pt-3 border-t border-slate-100">
                            <span class="inline-block bg-slate-800 text-white font-mono px-2 py-1 rounded text-sm mb-1 font-bold">CHAR(N)</span>
                            <p class="text-sm text-slate-600">ข้อความความยาว <strong>คงที่</strong> N ตัวอักษร เหมาะสำหรับ ข้อมูลที่ยาวเท่ากันเสมอ เช่น รหัส ปณ., เบอร์โทร</p>
                            <p class="text-xs text-slate-400 mt-1"><i class="fa-solid fa-check text-green-500 mr-1"></i> '10200', '0812345678'</p>
                        </div>
                    </div>
                </div>

                <!-- Date Category -->
                <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden dtype-card">
                    <div class="bg-emerald-100 px-4 py-3 border-b border-emerald-200 flex items-center gap-2">
                        <i class="fa-regular fa-calendar-days text-emerald-600 text-xl"></i>
                        <h3 class="font-bold text-emerald-800 text-lg">วันที่และเวลา (Date/Time)</h3>
                    </div>
                    <div class="p-5 space-y-4">
                        <div>
                            <span class="inline-block bg-slate-800 text-white font-mono px-2 py-1 rounded text-sm mb-1 font-bold">DATE</span>
                            <p class="text-sm text-slate-600">เก็บเฉพาะวันที่ รูปแบบ <code>YYYY-MM-DD</code> เหมาะสำหรับ วันเกิด, วันเริ่มงาน</p>
                            <p class="text-xs text-slate-400 mt-1"><i class="fa-solid fa-check text-green-500 mr-1"></i> '2026-12-31'</p>
                        </div>
                        <div class="pt-3 border-t border-slate-100">
                            <span class="inline-block bg-slate-800 text-white font-mono px-2 py-1 rounded text-sm mb-1 font-bold">DATETIME</span>
                            <p class="text-sm text-slate-600">เก็บทั้งวันที่และเวลา <code>YYYY-MM-DD HH:MM:SS</code> เหมาะสำหรับ วันเวลาที่สั่งซื้อ, เวลาที่เข้าสู่ระบบ</p>
                            <p class="text-xs text-slate-400 mt-1"><i class="fa-solid fa-check text-green-500 mr-1"></i> '2026-12-31 23:59:59'</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="bg-slate-100 rounded-2xl p-6 md:p-8 border border-slate-200">
            <div class="flex items-center gap-3 mb-6">
                <i class="fa-solid fa-vial-circle-check text-mysql-blue text-2xl"></i>
                <div>
                    <h2 class="text-2xl font-bold text-slate-800">3. เครื่องจำลองการตรวจสอบข้อมูล (Data Validator)</h2>
                    <p class="text-slate-600 text-sm">ลองพิมพ์ข้อมูลลงในช่องเพื่อดูว่า ฐานข้อมูลจะยอมรับข้อมูลนั้นเข้าสู่คอลัมน์ประเภทต่างๆ หรือไม่</p>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                <!-- INT Tester -->
                <div class="bg-white p-4 rounded-xl shadow-sm demo-box" id="box-int">
                    <label class="block font-bold text-slate-700 mb-1">อายุ <span class="text-xs font-mono bg-slate-200 text-slate-600 px-1 rounded">INT</span></label>
                    <input type="text" id="input-int" placeholder="ใส่ตัวเลขจำนวนเต็ม..." class="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-mysql-blue font-mono text-sm">
                    <div id="msg-int" class="text-xs mt-2 h-4 font-medium transition-colors"></div>
                </div>

                <!-- DECIMAL Tester -->
                <div class="bg-white p-4 rounded-xl shadow-sm demo-box" id="box-dec">
                    <label class="block font-bold text-slate-700 mb-1">ราคา <span class="text-xs font-mono bg-slate-200 text-slate-600 px-1 rounded">DECIMAL(5,2)</span></label>
                    <input type="text" id="input-dec" placeholder="เช่น 199.50" class="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-mysql-blue font-mono text-sm">
                    <div id="msg-dec" class="text-xs mt-2 h-4 font-medium transition-colors"></div>
                </div>

                <!-- VARCHAR Tester -->
                <div class="bg-white p-4 rounded-xl shadow-sm demo-box" id="box-var">
                    <label class="block font-bold text-slate-700 mb-1">ชื่อ <span class="text-xs font-mono bg-slate-200 text-slate-600 px-1 rounded">VARCHAR(10)</span></label>
                    <input type="text" id="input-var" placeholder="พิมพ์ข้อความ..." class="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-mysql-blue font-mono text-sm">
                    <div class="flex justify-between items-center mt-1">
                        <span id="char-count" class="text-xs text-slate-500 font-mono">0/10</span>
                    </div>
                    <div id="msg-var" class="text-xs mt-1 h-4 font-medium transition-colors"></div>
                </div>

                <!-- DATE Tester -->
                <div class="bg-white p-4 rounded-xl shadow-sm demo-box" id="box-date">
                    <label class="block font-bold text-slate-700 mb-1">วันเกิด <span class="text-xs font-mono bg-slate-200 text-slate-600 px-1 rounded">DATE</span></label>
                    <input type="text" id="input-date" placeholder="YYYY-MM-DD" class="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-mysql-blue font-mono text-sm">
                    <div id="msg-date" class="text-xs mt-2 h-4 font-medium transition-colors"></div>
                </div>

            </div>
        </section>

        <section class="bg-slate-800 rounded-2xl shadow-xl overflow-hidden relative" id="match-game-section">
            <!-- Canvas for drawing lines -->
            <canvas id="lines-canvas"></canvas>

            <div class="p-6 md:p-8 text-white relative z-10">
                <div class="flex justify-between items-end mb-6 border-b border-slate-700 pb-4">
                    <div>
                        <div class="flex items-center gap-3 mb-2">
                            <i class="fa-solid fa-puzzle-piece text-mysql-orange text-2xl"></i>
                            <h2 class="text-2xl font-bold">4. เกมจับคู่: เลือก Data Type ให้เหมาะสม</h2>
                        </div>
                        <p class="text-slate-300 text-sm">คลิกเลือก "ตัวอย่างข้อมูล" ทางซ้าย แล้วไปคลิกเลือก "ประเภทข้อมูล" ทางขวาที่คิดว่าถูกต้องที่สุด</p>
                    </div>
                    <div class="text-right">
                        <div class="text-xs text-slate-400 uppercase tracking-wider font-bold mb-1">คะแนน</div>
                        <div class="text-3xl font-bold text-emerald-400 font-mono" id="score-display">0/4</div>
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-8 md:gap-16 max-w-4xl mx-auto py-4">
                    <!-- Column 1: Scenarios (Data) -->
                    <div class="space-y-4" id="col-data">
                        <div class="text-center font-bold text-cyan-300 mb-4 border-b border-cyan-800 pb-2">ข้อมูลที่ต้องการเก็บ</div>

                        <div class="match-item bg-slate-700 hover:bg-slate-600 p-4 rounded-xl border-2 border-slate-600 shadow-md flex items-center justify-between" data-id="data-1" data-match="type-3">
                            <div>
                                <div class="font-bold">เบอร์โทรศัพท์มือถือ</div>
                                <div class="text-xs text-slate-400 font-mono mt-1">เช่น '0812345678' (ยาว 10 ตัวเสมอ)</div>
                            </div>
                            <i class="fa-solid fa-circle-dot text-slate-500 node-right"></i>
                        </div>

                        <div class="match-item bg-slate-700 hover:bg-slate-600 p-4 rounded-xl border-2 border-slate-600 shadow-md flex items-center justify-between" data-id="data-2" data-match="type-1">
                            <div>
                                <div class="font-bold">ราคาสินค้า</div>
                                <div class="text-xs text-slate-400 font-mono mt-1">เช่น 250.50 (มีทศนิยม)</div>
                            </div>
                            <i class="fa-solid fa-circle-dot text-slate-500 node-right"></i>
                        </div>

                        <div class="match-item bg-slate-700 hover:bg-slate-600 p-4 rounded-xl border-2 border-slate-600 shadow-md flex items-center justify-between" data-id="data-3" data-match="type-4">
                            <div>
                                <div class="font-bold">จำนวนสินค้าคงคลัง</div>
                                <div class="text-xs text-slate-400 font-mono mt-1">เช่น 1500 (จำนวนนับ)</div>
                            </div>
                            <i class="fa-solid fa-circle-dot text-slate-500 node-right"></i>
                        </div>

                        <div class="match-item bg-slate-700 hover:bg-slate-600 p-4 rounded-xl border-2 border-slate-600 shadow-md flex items-center justify-between" data-id="data-4" data-match="type-2">
                            <div>
                                <div class="font-bold">ชื่อ-นามสกุลลูกค้า</div>
                                <div class="text-xs text-slate-400 font-mono mt-1">ความยาวไม่แน่นอน</div>
                            </div>
                            <i class="fa-solid fa-circle-dot text-slate-500 node-right"></i>
                        </div>
                    </div>

                    <!-- Column 2: Data Types -->
                    <div class="space-y-4" id="col-types">
                        <div class="text-center font-bold text-orange-300 mb-4 border-b border-orange-800 pb-2">ประเภทข้อมูล (Data Type)</div>

                        <!-- Mixed order to prevent straight lines -->
                        <div class="match-item bg-slate-900 hover:bg-slate-800 p-4 rounded-xl border-2 border-slate-700 shadow-md flex items-center justify-start gap-3" data-id="type-1">
                            <i class="fa-solid fa-circle-dot text-slate-500 node-left"></i>
                            <div class="font-mono text-lg font-bold text-blue-300">DECIMAL</div>
                        </div>

                        <div class="match-item bg-slate-900 hover:bg-slate-800 p-4 rounded-xl border-2 border-slate-700 shadow-md flex items-center justify-start gap-3" data-id="type-2">
                            <i class="fa-solid fa-circle-dot text-slate-500 node-left"></i>
                            <div class="font-mono text-lg font-bold text-orange-300">VARCHAR</div>
                        </div>

                        <div class="match-item bg-slate-900 hover:bg-slate-800 p-4 rounded-xl border-2 border-slate-700 shadow-md flex items-center justify-start gap-3" data-id="type-3">
                            <i class="fa-solid fa-circle-dot text-slate-500 node-left"></i>
                            <div class="font-mono text-lg font-bold text-orange-300">CHAR</div>
                        </div>

                        <div class="match-item bg-slate-900 hover:bg-slate-800 p-4 rounded-xl border-2 border-slate-700 shadow-md flex items-center justify-start gap-3" data-id="type-4">
                            <i class="fa-solid fa-circle-dot text-slate-500 node-left"></i>
                            <div class="font-mono text-lg font-bold text-blue-300">INT</div>
                        </div>
                    </div>
                </div>

                <div class="mt-8 text-center hidden" id="game-complete-area">
                    <div class="inline-block bg-emerald-500/20 text-emerald-400 border border-emerald-500 px-6 py-3 rounded-xl font-bold pop-in">
                        <i class="fa-solid fa-party-horn mr-2"></i> ยอดเยี่ยม! คุณเข้าใจการเลือกประเภทข้อมูลเบื้องต้นแล้ว
                    </div>
                    <div class="mt-4">
                         <button id="reset-game-btn" class="text-sm text-slate-400 hover:text-white underline">เล่นใหม่อีกครั้ง</button>
                    </div>
                </div>
            </div>
        </section>

        <!-- Navigation -->
        <div class="flex justify-between items-center pt-8 border-t border-slate-200">
            <button class="text-slate-500 hover:text-mysql-blue transition-colors flex items-center gap-2" onclick="alert('ย้อนกลับไป: 2.1 โครงสร้างตาราง')">
                <i class="fa-solid fa-arrow-left"></i> 2.1 โครงสร้างตาราง
            </button>
            <button class="bg-mysql-blue hover:bg-cyan-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-cyan-600/30 flex items-center gap-2" onclick="alert('ไปยังบทเรียน: 2.3 การสร้างตาราง (CREATE TABLE)')">
                ไปต่อ: 2.3 สร้างตาราง <i class="fa-solid fa-arrow-right"></i>
            </button>
        </div>

    </main>

    <footer class="bg-slate-900 text-slate-400 py-6 text-center text-sm mt-auto">
        <p>© 2026 SQL Course Interactive Learning | 21901-2001</p>
    </footer>

    <!-- Custom Toast Notification -->
    <div id="toast" class="fixed bottom-5 right-5 bg-slate-800 text-white px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-3 border-l-4">
        <i id="toastIcon" class="fa-solid text-xl"></i>
        <div id="toastMsg" class="font-medium">Message</div>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', () => {

            // --- Toast Notification Logic ---
            const toast = document.getElementById('toast');
            const toastMsg = document.getElementById('toastMsg');
            const toastIcon = document.getElementById('toastIcon');
            let toastTimeout;

            function showToast(message, type) {
                clearTimeout(toastTimeout);
                toastMsg.textContent = message;

                // Reset classes
                toast.className = 'fixed bottom-5 right-5 bg-slate-800 text-white px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-3 border-l-4';
                toastIcon.className = 'fa-solid text-xl';

                if (type === 'success') {
                    toast.classList.add('border-emerald-500');
                    toastIcon.classList.add('fa-circle-check', 'text-emerald-500');
                } else if (type === 'error') {
                    toast.classList.add('border-red-500');
                    toastIcon.classList.add('fa-circle-xmark', 'text-red-500');
                }

                toast.classList.add('show');
                toastTimeout = setTimeout(() => { toast.classList.remove('show'); }, 2500);
            }

            // --- Section 3: Data Validator Logic ---
            const inputs = {
                int: document.getElementById('input-int'),
                dec: document.getElementById('input-dec'),
                var: document.getElementById('input-var'),
                date: document.getElementById('input-date')
            };
            const boxes = {
                int: document.getElementById('box-int'),
                dec: document.getElementById('box-dec'),
                var: document.getElementById('box-var'),
                date: document.getElementById('box-date')
            };
            const msgs = {
                int: document.getElementById('msg-int'),
                dec: document.getElementById('msg-dec'),
                var: document.getElementById('msg-var'),
                date: document.getElementById('msg-date')
            };

            function setStatus(type, isValid, message) {
                const box = boxes[type];
                const msg = msgs[type];

                box.classList.remove('valid', 'invalid');
                msg.classList.remove('text-green-600', 'text-red-600');

                if (isValid === null) {
                    msg.textContent = '';
                    return;
                }

                if (isValid) {
                    box.classList.add('valid');
                    msg.classList.add('text-green-600');
                    msg.innerHTML = `<i class="fa-solid fa-check mr-1"></i> ${message}`;
                } else {
                    box.classList.add('invalid');
                    msg.classList.add('text-red-600');
                    msg.innerHTML = `<i class="fa-solid fa-xmark mr-1"></i> ${message}`;

                    // Trigger animation reflow
                    box.style.animation = 'none';
                    box.offsetHeight; /* trigger reflow */
                    box.style.animation = null;
                }
            }

            // Validate INT
            inputs.int.addEventListener('input', (e) => {
                const val = e.target.value.trim();
                if(!val) return setStatus('int', null, '');

                // Allow only digits and optional leading minus
                if (/^-?\d+$/.test(val)) {
                    setStatus('int', true, 'รูปแบบ INT ถูกต้อง');
                } else {
                    setStatus('int', false, 'ต้องเป็นตัวเลขจำนวนเต็มเท่านั้น');
                }
            });

            // Validate DECIMAL(5,2) : max 999.99
            inputs.dec.addEventListener('input', (e) => {
                const val = e.target.value.trim();
                if(!val) return setStatus('dec', null, '');

                // Regex for max 3 digits before decimal, optional 2 digits after
                if (/^-?\d{1,3}(\.\d{1,2})?$/.test(val) && !isNaN(parseFloat(val))) {
                    setStatus('dec', true, 'รูปแบบ DECIMAL ถูกต้อง');
                } else {
                    setStatus('dec', false, 'ตัวเลขหรือทศนิยมเกินขอบเขต (Max: 999.99)');
                }
            });

            // Validate VARCHAR(10)
            const charCount = document.getElementById('char-count');
            inputs.var.addEventListener('input', (e) => {
                const val = e.target.value;
                const len = val.length;
                charCount.textContent = `${len}/10`;

                if(len === 0) return setStatus('var', null, '');

                if (len <= 10) {
                    charCount.classList.remove('text-red-500');
                    setStatus('var', true, 'ความยาวอยู่ในเกณฑ์');
                } else {
                    charCount.classList.add('text-red-500');
                    setStatus('var', false, 'ข้อมูลยาวเกิน 10 ตัวอักษร จะถูกตัดทิ้ง (Truncated)');
                }
            });

            // Validate DATE (YYYY-MM-DD)
            inputs.date.addEventListener('input', (e) => {
                const val = e.target.value.trim();
                if(!val) return setStatus('date', null, '');

                const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
                if (dateRegex.test(val)) {
                    // Basic logical check (e.g., Feb 30th will pass regex but fail Date parse, but good enough for demo)
                    const d = new Date(val);
                    if(!isNaN(d.getTime())) {
                         setStatus('date', true, 'รูปแบบ DATE ถูกต้อง');
                         return;
                    }
                }
                setStatus('date', false, 'ต้องอยู่ในรูปแบบ YYYY-MM-DD');
            });


            // --- Section 4: Match Game Logic with Canvas Lines ---
            let selectedData = null;
            let score = 0;
            const maxScore = 4;
            const connections = []; // Store correct connections to draw lines

            const matchItems = document.querySelectorAll('.match-item');
            const scoreDisplay = document.getElementById('score-display');
            const gameCompleteArea = document.getElementById('game-complete-area');
            const resetGameBtn = document.getElementById('reset-game-btn');

            // Canvas Setup
            const canvas = document.getElementById('lines-canvas');
            const ctx = canvas.getContext('2d');
            const section = document.getElementById('match-game-section');

            function resizeCanvas() {
                canvas.width = section.clientWidth;
                canvas.height = section.clientHeight;
                drawLines();
            }

            window.addEventListener('resize', resizeCanvas);
            // Initial sizing slightly delayed to ensure DOM is fully rendered
            setTimeout(resizeCanvas, 100);

            function getCenterCoords(element, isLeftNode) {
                const rect = element.getBoundingClientRect();
                const sectionRect = section.getBoundingClientRect();

                // Adjust based on whether it's the dot on the right of Data, or left of Type
                let xOffset = isLeftNode ? rect.width : 0;
                if(element.querySelector('.node-right')) {
                    const iconRect = element.querySelector('.node-right').getBoundingClientRect();
                    xOffset = iconRect.left - rect.left + (iconRect.width/2);
                } else if (element.querySelector('.node-left')) {
                    const iconRect = element.querySelector('.node-left').getBoundingClientRect();
                    xOffset = iconRect.left - rect.left + (iconRect.width/2);
                }

                return {
                    x: (rect.left - sectionRect.left) + xOffset,
                    y: (rect.top - sectionRect.top) + (rect.height / 2)
                };
            }

            function drawLines() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                connections.forEach(conn => {
                    const start = getCenterCoords(conn.dataEl, false);
                    const end = getCenterCoords(conn.typeEl, true);

                    ctx.beginPath();
                    ctx.moveTo(start.x, start.y);
                    // Draw a subtle curve
                    ctx.bezierCurveTo(
                        start.x + 50, start.y,
                        end.x - 50, end.y,
                        end.x, end.y
                    );
                    ctx.strokeStyle = '#10b981'; // Emerald 500
                    ctx.lineWidth = 3;
                    ctx.stroke();

                    // Draw dots at ends
                    ctx.beginPath();
                    ctx.arc(start.x, start.y, 5, 0, 2 * Math.PI);
                    ctx.fillStyle = '#10b981';
                    ctx.fill();

                    ctx.beginPath();
                    ctx.arc(end.x, end.y, 5, 0, 2 * Math.PI);
                    ctx.fillStyle = '#10b981';
                    ctx.fill();
                });
            }

            matchItems.forEach(item => {
                item.addEventListener('click', () => {
                    if (item.classList.contains('matched')) return;

                    const isData = item.hasAttribute('data-match');

                    // If clicking a Data item
                    if (isData) {
                        // Deselect previously selected data
                        if (selectedData) {
                            selectedData.classList.remove('selected', 'border-mysql-orange', 'bg-slate-600');
                            selectedData.classList.add('border-slate-600', 'bg-slate-700');
                        }

                        // Select new
                        selectedData = item;
                        selectedData.classList.remove('border-slate-600', 'bg-slate-700');
                        selectedData.classList.add('selected', 'border-mysql-orange', 'bg-slate-600');
                    }
                    // If clicking a Type item and a Data item is already selected
                    else if (!isData && selectedData) {
                        const targetTypeId = item.getAttribute('data-id');
                        const requiredTypeId = selectedData.getAttribute('data-match');

                        if (targetTypeId === requiredTypeId) {
                            // Correct Match!
                            showToast('จับคู่ถูกต้อง!', 'success');

                            // Visual updates
                            selectedData.classList.remove('selected', 'border-mysql-orange', 'bg-slate-600');
                            selectedData.classList.add('matched', 'border-emerald-500', 'bg-emerald-900/30');
                            selectedData.querySelector('i').classList.replace('text-slate-500', 'text-emerald-500');

                            item.classList.add('matched', 'border-emerald-500', 'bg-emerald-900/30');
                            item.querySelector('i').classList.replace('text-slate-500', 'text-emerald-500');

                            // Store connection for drawing
                            connections.push({ dataEl: selectedData, typeEl: item });
                            drawLines();

                            selectedData = null;
                            score++;
                            scoreDisplay.textContent = `${score}/${maxScore}`;

                            if (score === maxScore) {
                                setTimeout(() => {
                                    gameCompleteArea.classList.remove('hidden');
                                }, 500);
                            }
                        } else {
                            // Wrong Match
                            showToast('ยังไม่ใช่นะ ลองคิดดูใหม่ครับ', 'error');
                            // Shake animation on target
                            item.style.animation = 'shake 0.5s';
                            setTimeout(() => { item.style.animation = ''; }, 500);
                        }
                    } else if (!isData && !selectedData) {
                        showToast('กรุณาเลือกข้อมูลทางซ้ายมือก่อนครับ', 'error');
                    }
                });
            });

            // Reset Game Logic
            resetGameBtn.addEventListener('click', () => {
                score = 0;
                scoreDisplay.textContent = `${score}/${maxScore}`;
                selectedData = null;
                connections.length = 0;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                gameCompleteArea.classList.add('hidden');

                matchItems.forEach(item => {
                    item.classList.remove('matched', 'selected', 'border-emerald-500', 'bg-emerald-900/30', 'border-mysql-orange', 'bg-slate-600');

                    if(item.hasAttribute('data-match')) {
                        item.classList.add('border-slate-600', 'bg-slate-700');
                        item.querySelector('i').className = 'fa-solid fa-circle-dot text-slate-500 node-right';
                    } else {
                        item.classList.add('border-slate-700', 'bg-slate-900');
                        item.querySelector('i').className = 'fa-solid fa-circle-dot text-slate-500 node-left';
                    }
                });
            });

        });
    </script>

</body>
</html>
-----------------------------------------------------------------------------------------------------------------------------------
- 2.3 ข้อกำหนดตาราง (Constraints)
<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>2.3 ข้อกำหนดตาราง (Constraints) - SQL Course</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@300;400;500;600;700&family=Fira+Code:wght@400;500;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['"Noto Sans Thai"', 'sans-serif'],
                        mono: ['"Fira Code"', 'monospace'],
                    },
                    colors: {
                        mysql: {
                            blue: '#00758F',
                            orange: '#F29111',
                            dark: '#1e293b'
                        },
                        constraint: {
                            pk: '#F59E0B',      // Yellow
                            nn: '#EF4444',      // Red
                            uq: '#8B5CF6',      // Purple
                            def: '#10B981',     // Emerald
                            ai: '#3B82F6'       // Blue
                        }
                    }
                }
            }
        }
    </script>
    
    <style>
        body {
            background-color: #f8fafc;
            color: #334155;
        }
        
        /* Animations */
        .pop-in { animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        @keyframes popIn {
            0% { transform: scale(0); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20%, 60% { transform: translateX(-5px); }
            40%, 80% { transform: translateX(5px); }
        }
        .shake-anim { animation: shake 0.4s; }

        @keyframes pulse-border {
            0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
            70% { box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); }
            100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }
        .new-row-anim td {
            animation: pulse-border 1.5s;
            background-color: #ecfdf5;
        }

        /* Constraint Cards */
        .constraint-card {
            transition: all 0.3s ease;
        }
        .constraint-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
        }

        /* Live Table Styles */
        .live-table {
            border-collapse: separate;
            border-spacing: 0;
            width: 100%;
            font-size: 0.875rem;
        }
        .live-table th {
            background-color: #1e293b;
            color: #e2e8f0;
            padding: 0.75rem 1rem;
            text-align: left;
            font-family: "Fira Code", monospace;
            border-right: 1px solid #334155;
        }
        .live-table th:last-child { border-right: none; }

        .live-table td {
            padding: 0.75rem 1rem;
            border-bottom: 1px solid #e2e8f0;
            border-right: 1px solid #e2e8f0;
            background: white;
            transition: background-color 0.5s ease;
        }
        .live-table td:last-child { border-right: none; }
        .live-table tr:last-child td { border-bottom: none; }
        .live-table .null-value { color: #94a3b8; font-style: italic; }

        /* Drag & Drop Styles */
        .badge-draggable {
            cursor: grab;
            user-select: none;
            transition: transform 0.2s, box-shadow 0.2s;
        }
        .badge-draggable:active { cursor: grabbing; transform: scale(0.95); }
        .badge-draggable.dragging { opacity: 0.5; }

        .drop-zone {
            border: 2px dashed #cbd5e1;
            border-radius: 0.5rem;
            min-height: 46px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #f1f5f9;
            transition: all 0.2s;
        }
        .drop-zone.active {
            border-color: #3b82f6;
            background-color: #eff6ff;
        }
        .drop-zone.correct {
            border-color: #10b981;
            border-style: solid;
            background-color: #ecfdf5;
        }

        /* Toast */
        #toast {
            visibility: hidden;
            opacity: 0;
            transition: visibility 0s, opacity 0.3s linear;
        }
        #toast.show {
            visibility: visible;
            opacity: 1;
        }
    </style>

</head>

<body class="antialiased min-h-screen flex flex-col relative">

    <header class="bg-gradient-to-r from-mysql-blue to-cyan-900 text-white shadow-lg sticky top-0 z-50">
        <div class="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
            <div class="flex items-center gap-3">
                <i class="fa-solid fa-database text-mysql-orange text-3xl"></i>
                <div>
                    <h1 class="text-xl font-bold leading-tight">SQL Course (21901-2001)</h1>
                    <p class="text-sm text-cyan-200">Unit 2: งานจัดการตาราง (Table Management)</p>
                </div>
            </div>
            <div class="hidden sm:block">
                <span class="bg-white/20 px-3 py-1 rounded-full text-sm font-medium border border-white/30 backdrop-blur-sm">
                    บทที่ 2.3 ข้อกำหนดตาราง
                </span>
            </div>
        </div>
    </header>

    <main class="flex-grow max-w-5xl mx-auto px-4 py-8 w-full space-y-12">

        <!-- Introduction -->
        <section class="text-center space-y-4 max-w-3xl mx-auto">
            <h2 class="text-3xl md:text-4xl font-bold text-slate-800">1. กฎเกณฑ์ของตาราง (Table Constraints)</h2>
            <p class="text-lg text-slate-600 leading-relaxed">
                เปรียบเสมือน <strong>"ยามเฝ้าประตู"</strong> ของแต่ละคอลัมน์ ที่คอยตรวจสอบว่าข้อมูลที่จะถูกบันทึกเข้ามานั้น ถูกต้อง ครบถ้วน และไม่ซ้ำซ้อนตามกฎที่เราตั้งไว้หรือไม่ เพื่อป้องกันไม่ให้ตารางเต็มไปด้วยข้อมูลขยะ (Data Integrity)
            </p>
        </section>

        <!-- Constraint Types Grid -->
        <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 constraint-card border-t-4 border-t-constraint-nn">
                <div class="flex items-center gap-3 mb-3">
                    <div class="w-10 h-10 rounded-full bg-red-100 text-constraint-nn flex items-center justify-center text-xl">
                        <i class="fa-solid fa-ban"></i>
                    </div>
                    <h3 class="text-lg font-bold font-mono text-slate-800">NOT NULL</h3>
                </div>
                <p class="text-sm text-slate-600">บังคับว่าคอลัมน์นี้ <strong>"ห้ามเป็นค่าว่าง"</strong> ข้อมูลที่เข้ามาต้องมีค่าเสมอ (จำเป็นต้องกรอก)</p>
            </div>

            <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 constraint-card border-t-4 border-t-constraint-uq">
                <div class="flex items-center gap-3 mb-3">
                    <div class="w-10 h-10 rounded-full bg-purple-100 text-constraint-uq flex items-center justify-center text-xl">
                        <i class="fa-solid fa-fingerprint"></i>
                    </div>
                    <h3 class="text-lg font-bold font-mono text-slate-800">UNIQUE</h3>
                </div>
                <p class="text-sm text-slate-600">บังคับว่าข้อมูลในคอลัมน์นี้ <strong>"ห้ามซ้ำกันเลย"</strong> ในทุกๆ แถว (เช่น อีเมล, เลขบัตรปชช.)</p>
            </div>

            <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 constraint-card border-t-4 border-t-constraint-pk">
                <div class="flex items-center gap-3 mb-3">
                    <div class="w-10 h-10 rounded-full bg-yellow-100 text-constraint-pk flex items-center justify-center text-xl">
                        <i class="fa-solid fa-key"></i>
                    </div>
                    <h3 class="text-lg font-bold font-mono text-slate-800">PRIMARY KEY</h3>
                </div>
                <p class="text-sm text-slate-600">กุญแจหลัก ใช้ระบุตัวตนของแต่ละแถว <em>(เปรียบเหมือนการเอา UNIQUE + NOT NULL มารวมกัน)</em></p>
            </div>

            <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 constraint-card border-t-4 border-t-constraint-def">
                <div class="flex items-center gap-3 mb-3">
                    <div class="w-10 h-10 rounded-full bg-emerald-100 text-constraint-def flex items-center justify-center text-xl">
                        <i class="fa-solid fa-asterisk"></i>
                    </div>
                    <h3 class="text-lg font-bold font-mono text-slate-800">DEFAULT</h3>
                </div>
                <p class="text-sm text-slate-600">กำหนด <strong>"ค่าเริ่มต้น"</strong> ให้กับคอลัมน์ ในกรณีที่ตอนเพิ่มข้อมูลไม่ได้ระบุค่ามาให้</p>
            </div>

            <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 constraint-card border-t-4 border-t-constraint-ai lg:col-span-2">
                <div class="flex items-center gap-3 mb-3">
                    <div class="w-10 h-10 rounded-full bg-blue-100 text-constraint-ai flex items-center justify-center text-xl">
                        <i class="fa-solid fa-arrow-down-1-9"></i>
                    </div>
                    <h3 class="text-lg font-bold font-mono text-slate-800">AUTO_INCREMENT</h3>
                </div>
                <p class="text-sm text-slate-600">คุณสมบัติพิเศษ (ส่วนใหญ่ใช้ร่วมกับ PRIMARY KEY แบบตัวเลข) ทำให้ฐานข้อมูล <strong>เพิ่มตัวเลขขึ้นเองอัตโนมัติ</strong> ทีละ 1 เมื่อมีข้อมูลใหม่เข้ามา โดยที่เราไม่ต้องพิมพ์เอง</p>
            </div>

        </section>

        <!-- Interactive Simulator Section -->
        <section class="bg-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden text-white">
            <!-- Decorative BG -->
            <div class="absolute top-0 right-0 w-64 h-64 bg-mysql-blue/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>

            <div class="flex items-center gap-3 mb-6 relative z-10">
                <i class="fa-solid fa-shield-halved text-cyan-400 text-3xl"></i>
                <div>
                    <h2 class="text-2xl font-bold">2. Simulator: ทดสอบฝ่าด่าน Constraints</h2>
                    <p class="text-slate-300 text-sm mt-1">ตาราง <code>members</code> มีการตั้งกฎไว้ ลองเพิ่มข้อมูลเพื่อดูว่ายามจะยอมให้ผ่านหรือไม่!</p>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">

                <!-- Form Input -->
                <div class="lg:col-span-4 bg-white text-slate-800 rounded-2xl p-5 shadow-lg flex flex-col">
                    <h3 class="font-bold text-lg mb-4 border-b pb-2"><i class="fa-solid fa-plus-circle text-mysql-blue mr-2"></i>เพิ่มสมาชิกใหม่</h3>

                    <div class="space-y-4 flex-grow">
                        <!-- ID (Disabled) -->
                        <div>
                            <label class="flex justify-between items-center text-xs font-bold text-slate-500 mb-1">
                                <span>id</span>
                                <span class="bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded text-[10px] font-mono">PK, A_I</span>
                            </label>
                            <input type="text" value="อัตโนมัติ (Auto)" disabled class="w-full bg-slate-100 text-slate-400 px-3 py-2 rounded-lg text-sm italic cursor-not-allowed">
                        </div>

                        <!-- Username -->
                        <div>
                            <label class="flex justify-between items-center text-xs font-bold text-slate-700 mb-1">
                                <span>username</span>
                                <div class="flex gap-1">
                                    <span class="bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded text-[10px] font-mono">UNIQUE</span>
                                    <span class="bg-red-100 text-red-700 px-1.5 py-0.5 rounded text-[10px] font-mono">NOT NULL</span>
                                </div>
                            </label>
                            <input type="text" id="sim-user" placeholder="ระบุชื่อผู้ใช้..." class="w-full bg-white border border-slate-300 focus:border-mysql-blue focus:ring-2 focus:ring-mysql-blue/20 outline-none px-3 py-2 rounded-lg text-sm transition-all">
                        </div>

                        <!-- Role -->
                        <div>
                            <label class="flex justify-between items-center text-xs font-bold text-slate-700 mb-1">
                                <span>role</span>
                                <span class="bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded text-[10px] font-mono">DEFAULT 'member'</span>
                            </label>
                            <input type="text" id="sim-role" placeholder="ปล่อยว่างได้..." class="w-full bg-white border border-slate-300 focus:border-mysql-blue focus:ring-2 focus:ring-mysql-blue/20 outline-none px-3 py-2 rounded-lg text-sm transition-all">
                        </div>
                    </div>

                    <button id="sim-submit" class="w-full mt-6 bg-gradient-to-r from-mysql-blue to-cyan-600 hover:from-cyan-600 hover:to-cyan-500 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2">
                        <i class="fa-solid fa-paper-plane"></i> ยืนยันการเพิ่ม (INSERT)
                    </button>
                </div>

                <!-- Right Side: Table & Console -->
                <div class="lg:col-span-8 flex flex-col gap-4">

                    <!-- Console -->
                    <div class="bg-slate-900 rounded-xl overflow-hidden border border-slate-700 shadow-inner flex flex-col" id="console-box" style="height: 140px;">
                        <div class="bg-black/40 px-3 py-1.5 border-b border-slate-700/50 flex items-center justify-between">
                            <span class="text-xs text-slate-400 font-mono"><i class="fa-solid fa-terminal mr-2"></i>MySQL Response Log</span>
                            <button id="clear-console" class="text-xs text-slate-500 hover:text-slate-300 transition-colors">Clear</button>
                        </div>
                        <div class="p-3 font-mono text-xs overflow-y-auto flex-grow space-y-1.5" id="sim-console">
                            <div class="text-slate-500">Ready to execute INSERT commands...</div>
                        </div>
                    </div>

                    <!-- Live Table -->
                    <div class="bg-white rounded-xl overflow-hidden shadow-lg border border-slate-200">
                        <div class="bg-slate-100 px-4 py-2 border-b border-slate-200 flex justify-between items-center text-slate-700">
                            <h3 class="font-bold text-sm"><i class="fa-solid fa-table mr-2"></i>Table: members</h3>
                        </div>
                        <div class="overflow-x-auto">
                            <table class="live-table" id="members-table">
                                <thead>
                                    <tr>
                                        <th class="w-16">id <i class="fa-solid fa-key text-mysql-orange text-[10px]" title="PK"></i></th>
                                        <th>username <span class="text-[10px] font-normal text-red-300 ml-1">(NN, UQ)</span></th>
                                        <th>role <span class="text-[10px] font-normal text-emerald-300 ml-1">(DEF)</span></th>
                                    </tr>
                                </thead>
                                <tbody id="table-body">
                                    <!-- Seed Data -->
                                    <tr>
                                        <td class="font-bold text-slate-600">1</td>
                                        <td class="text-mysql-blue font-semibold">admin_za</td>
                                        <td>admin</td>
                                    </tr>
                                    <tr>
                                        <td class="font-bold text-slate-600">2</td>
                                        <td class="text-mysql-blue font-semibold">somchai</td>
                                        <td>member</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </section>

        <!-- Drag & Drop Activity -->
        <section class="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm">
            <div class="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                <i class="fa-solid fa-puzzle-piece text-mysql-orange text-3xl"></i>
                <div>
                    <h2 class="text-2xl font-bold text-slate-800">3. กิจกรรม: ประกอบร่างตาราง (Schema Builder)</h2>
                    <p class="text-slate-600 text-sm mt-1">ลากป้าย Constraint ด้านล่าง ไปวางในช่องว่างของแต่ละคอลัมน์ให้ถูกต้องตามความหมาย</p>
                </div>
            </div>

            <div class="flex flex-col md:flex-row gap-8 lg:gap-12">

                <!-- Toolbelts / Badges -->
                <div class="w-full md:w-1/3 bg-slate-50 p-5 rounded-xl border border-slate-200">
                    <h4 class="text-sm font-bold text-slate-500 mb-4 text-center">หยิบป้ายจากตรงนี้</h4>

                    <div class="flex flex-col gap-3" id="badge-container">
                        <!-- Badges -->
                        <div class="badge-draggable bg-yellow-100 text-yellow-800 border border-yellow-300 py-2 px-3 rounded-lg font-mono text-sm font-bold flex items-center shadow-sm" draggable="true" data-type="pk">
                            <i class="fa-solid fa-key mr-2"></i>PRIMARY KEY
                        </div>

                        <div class="badge-draggable bg-purple-100 text-purple-800 border border-purple-300 py-2 px-3 rounded-lg font-mono text-sm font-bold flex items-center shadow-sm" draggable="true" data-type="uq">
                            <i class="fa-solid fa-fingerprint mr-2"></i>UNIQUE
                        </div>

                        <div class="badge-draggable bg-red-100 text-red-800 border border-red-300 py-2 px-3 rounded-lg font-mono text-sm font-bold flex items-center shadow-sm" draggable="true" data-type="nn">
                            <i class="fa-solid fa-ban mr-2"></i>NOT NULL
                        </div>

                        <div class="badge-draggable bg-emerald-100 text-emerald-800 border border-emerald-300 py-2 px-3 rounded-lg font-mono text-sm font-bold flex items-center shadow-sm" draggable="true" data-type="def">
                            <i class="fa-solid fa-asterisk mr-2"></i>DEFAULT 0
                        </div>
                    </div>

                    <button id="reset-game" class="w-full mt-6 text-sm text-slate-500 hover:text-mysql-blue underline flex items-center justify-center gap-1">
                        <i class="fa-solid fa-rotate-right"></i> เริ่มเล่นใหม่
                    </button>
                </div>

                <!-- Table Schema to fill -->
                <div class="w-full md:w-2/3">
                    <div class="bg-slate-800 text-white rounded-t-xl px-4 py-3 font-mono text-sm border-b border-slate-700">
                        <span class="text-pink-400">CREATE TABLE</span> products (
                    </div>
                    <div class="bg-slate-900 text-slate-300 rounded-b-xl p-4 md:p-6 font-mono text-sm space-y-4 shadow-xl">

                        <!-- Row 1 -->
                        <div class="flex flex-col sm:flex-row sm:items-center gap-2 pb-4 border-b border-slate-700 border-dashed">
                            <div class="w-full sm:w-1/3 text-cyan-300 pl-4">product_id <span class="text-slate-500 ml-1">INT</span></div>
                            <div class="w-full sm:w-2/3 flex items-center gap-2">
                                <div class="drop-zone flex-grow" data-target="pk">
                                    <span class="text-xs text-slate-500">วาง Constraint ระบุตัวตน</span>
                                </div>
                            </div>
                        </div>

                        <!-- Row 2 -->
                        <div class="flex flex-col sm:flex-row sm:items-center gap-2 pb-4 border-b border-slate-700 border-dashed">
                            <div class="w-full sm:w-1/3 text-cyan-300 pl-4">barcode <span class="text-slate-500 ml-1">VARCHAR</span></div>
                            <div class="w-full sm:w-2/3 flex items-center gap-2">
                                <div class="drop-zone flex-grow" data-target="uq">
                                    <span class="text-xs text-slate-500">วาง Constraint ห้ามซ้ำ</span>
                                </div>
                            </div>
                        </div>

                        <!-- Row 3 -->
                        <div class="flex flex-col sm:flex-row sm:items-center gap-2 pb-4 border-b border-slate-700 border-dashed">
                            <div class="w-full sm:w-1/3 text-cyan-300 pl-4">name <span class="text-slate-500 ml-1">VARCHAR</span></div>
                            <div class="w-full sm:w-2/3 flex items-center gap-2">
                                <div class="drop-zone flex-grow" data-target="nn">
                                    <span class="text-xs text-slate-500">วาง Constraint ห้ามว่าง</span>
                                </div>
                            </div>
                        </div>

                        <!-- Row 4 -->
                        <div class="flex flex-col sm:flex-row sm:items-center gap-2 pb-2">
                            <div class="w-full sm:w-1/3 text-cyan-300 pl-4">view_count <span class="text-slate-500 ml-1">INT</span></div>
                            <div class="w-full sm:w-2/3 flex items-center gap-2">
                                <div class="drop-zone flex-grow" data-target="def">
                                    <span class="text-xs text-slate-500">วาง Constraint ค่าเริ่มต้น</span>
                                </div>
                            </div>
                        </div>

                        <div class="pt-2">);</div>

                    </div>

                    <!-- Success Message -->
                    <div id="game-success" class="mt-4 hidden bg-emerald-100 border border-emerald-300 text-emerald-800 px-4 py-3 rounded-xl pop-in flex items-center justify-center gap-2 font-bold">
                        <i class="fa-solid fa-party-horn"></i> ยอดเยี่ยม! คุณออกแบบตารางได้ถูกต้องสมบูรณ์
                    </div>
                </div>

            </div>
        </section>

        <!-- Navigation -->
        <div class="flex justify-between items-center pt-8 border-t border-slate-200">
            <button class="text-slate-500 hover:text-mysql-blue transition-colors flex items-center gap-2" onclick="alert('ย้อนกลับไป: 2.2 ประเภทข้อมูล')">
                <i class="fa-solid fa-arrow-left"></i> 2.2 ประเภทข้อมูล
            </button>
            <button class="bg-mysql-blue hover:bg-cyan-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-cyan-600/30 flex items-center gap-2" onclick="alert('ไปยังบทเรียน: 2.4 ความสัมพันธ์ตาราง (FOREIGN KEY)')">
                ไปต่อ: 2.4 Foreign Key <i class="fa-solid fa-arrow-right"></i>
            </button>
        </div>

    </main>

    <footer class="bg-slate-900 text-slate-400 py-6 text-center text-sm mt-auto">
        <p>© 2026 SQL Course Interactive Learning | 21901-2001</p>
    </footer>

    <!-- Custom Toast Notification -->
    <div id="toast" class="fixed bottom-5 right-5 bg-slate-800 text-white px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-3 border-l-4">
        <i id="toastIcon" class="fa-solid text-xl"></i>
        <div id="toastMsg" class="font-medium">Message</div>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', () => {

            // --- Toast Notification Logic ---
            const toast = document.getElementById('toast');
            const toastMsg = document.getElementById('toastMsg');
            const toastIcon = document.getElementById('toastIcon');
            let toastTimeout;

            function showToast(message, type) {
                clearTimeout(toastTimeout);
                toastMsg.textContent = message;

                toast.className = 'fixed bottom-5 right-5 bg-slate-800 text-white px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-3 border-l-4';
                toastIcon.className = 'fa-solid text-xl';

                if (type === 'success') {
                    toast.classList.add('border-emerald-500');
                    toastIcon.classList.add('fa-circle-check', 'text-emerald-500');
                } else if (type === 'error') {
                    toast.classList.add('border-red-500');
                    toastIcon.classList.add('fa-circle-xmark', 'text-red-500');
                }

                toast.classList.add('show');
                toastTimeout = setTimeout(() => { toast.classList.remove('show'); }, 2500);
            }

            // --- Section 2: Simulator Logic ---
            // Initial DB State
            let membersDB = [
                { id: 1, username: 'admin_za', role: 'admin' },
                { id: 2, username: 'somchai', role: 'member' }
            ];
            let nextId = 3; // Auto Increment simulation

            const userInp = document.getElementById('sim-user');
            const roleInp = document.getElementById('sim-role');
            const submitBtn = document.getElementById('sim-submit');
            const tableBody = document.getElementById('table-body');
            const consoleArea = document.getElementById('sim-console');
            const consoleBox = document.getElementById('console-box');
            const clearConsoleBtn = document.getElementById('clear-console');

            function logConsole(msg, type = 'info') {
                const div = document.createElement('div');
                let icon = '';
                let colorClass = 'text-slate-300';

                if(type === 'error') {
                    icon = '<i class="fa-solid fa-xmark text-rose-500 mr-1"></i>';
                    colorClass = 'text-rose-400';
                } else if (type === 'success') {
                    icon = '<i class="fa-solid fa-check text-emerald-500 mr-1"></i>';
                    colorClass = 'text-emerald-400';
                }

                div.innerHTML = `<span class="text-slate-500 mr-2">></span>${icon}<span class="${colorClass}">${msg}</span>`;
                consoleArea.appendChild(div);
                consoleBox.scrollTop = consoleBox.scrollHeight;
            }

            function renderTable(highlightId = null) {
                tableBody.innerHTML = '';
                membersDB.forEach(row => {
                    const tr = document.createElement('tr');
                    if (row.id === highlightId) tr.classList.add('new-row-anim');

                    tr.innerHTML = `
                        <td class="font-bold text-slate-600">${row.id}</td>
                        <td class="text-mysql-blue font-semibold">${row.username}</td>
                        <td>${row.role === null ? '<span class="null-value">NULL</span>' : row.role}</td>
                    `;
                    tableBody.appendChild(tr);
                });
            }

            submitBtn.addEventListener('click', () => {
                const usernameRaw = userInp.value;
                const username = usernameRaw.trim();
                const roleRaw = roleInp.value;
                const role = roleRaw.trim();

                // Generate pseudo SQL statement for display
                const sqlVal1 = username ? `'${username}'` : 'NULL';
                const sqlVal2 = role ? `'${role}'` : 'DEFAULT';
                logConsole(`INSERT INTO members (username, role) VALUES (${sqlVal1}, ${sqlVal2});`);

                // Validation 1: NOT NULL (username)
                if (username === '') {
                    logConsole(`ERROR 1048: Column 'username' cannot be null`, 'error');
                    submitBtn.classList.remove('shake-anim');
                    void submitBtn.offsetWidth; // trigger reflow
                    submitBtn.classList.add('shake-anim');
                    showToast('ผิดพลาด: username ห้ามเป็นค่าว่าง!', 'error');
                    return;
                }

                // Validation 2: UNIQUE (username)
                const isDuplicate = membersDB.some(m => m.username.toLowerCase() === username.toLowerCase());
                if (isDuplicate) {
                    logConsole(`ERROR 1062: Duplicate entry '${username}' for key 'username'`, 'error');
                    submitBtn.classList.remove('shake-anim');
                    void submitBtn.offsetWidth;
                    submitBtn.classList.add('shake-anim');
                    showToast('ผิดพลาด: username นี้มีคนใช้แล้ว!', 'error');
                    return;
                }

                // Validation 3 & 4: DEFAULT (role) and AUTO_INCREMENT (id)
                // If role is empty, use default
                const finalRole = role === '' ? 'member' : role;
                const newId = nextId++;

                // Success Insert
                membersDB.push({ id: newId, username: username, role: finalRole });

                logConsole(`Query OK, 1 row affected. (ID: ${newId})`, 'success');
                showToast('เพิ่มข้อมูลสำเร็จ!', 'success');

                // Reset inputs and render
                userInp.value = '';
                roleInp.value = '';
                renderTable(newId);
            });

            // Enter key support
            [userInp, roleInp].forEach(inp => {
                inp.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') submitBtn.click();
                });
            });

            clearConsoleBtn.addEventListener('click', () => {
                consoleArea.innerHTML = '<div class="text-slate-500">Console cleared.</div>';
            });


            // --- Section 3: Drag and Drop Game Logic ---
            const draggables = document.querySelectorAll('.badge-draggable');
            const dropZones = document.querySelectorAll('.drop-zone');
            const badgeContainer = document.getElementById('badge-container');
            const resetGameBtn = document.getElementById('reset-game');
            const gameSuccess = document.getElementById('game-success');
            let correctDrops = 0;
            const totalDrops = 4;

            // Store original HTML of badges for resetting
            const originalBadgesHTML = badgeContainer.innerHTML;

            draggables.forEach(draggable => {
                draggable.addEventListener('dragstart', () => {
                    draggable.classList.add('dragging');
                });

                draggable.addEventListener('dragend', () => {
                    draggable.classList.remove('dragging');
                });
            });

            dropZones.forEach(zone => {
                zone.addEventListener('dragover', e => {
                    e.preventDefault();
                    if (!zone.hasChildNodes() || zone.querySelector('.text-slate-500')) {
                        zone.classList.add('active');
                    }
                });

                zone.addEventListener('dragleave', () => {
                    zone.classList.remove('active');
                });

                zone.addEventListener('drop', e => {
                    e.preventDefault();
                    zone.classList.remove('active');

                    const draggable = document.querySelector('.dragging');
                    if (!draggable) return;

                    const expectedType = zone.getAttribute('data-target');
                    const droppedType = draggable.getAttribute('data-type');

                    if (expectedType === droppedType) {
                        // Correct match
                        zone.innerHTML = ''; // clear placeholder text
                        zone.appendChild(draggable);

                        // Style the dropped item
                        draggable.classList.remove('shadow-sm');
                        draggable.classList.add('w-full', 'h-full', 'm-0', 'justify-center', 'border-0', 'bg-transparent');
                        zone.classList.add('correct', 'p-0');

                        draggable.setAttribute('draggable', 'false'); // Lock it
                        draggable.style.cursor = 'default';

                        showToast('ถูกต้อง!', 'success');
                        correctDrops++;

                        if (correctDrops === totalDrops) {
                            setTimeout(() => {
                                gameSuccess.classList.remove('hidden');
                            }, 300);
                        }
                    } else {
                        // Wrong match
                        showToast('อ๊ะ! Constraint นี้ยังไม่เหมาะกับคอลัมน์นี้นะ', 'error');
                        zone.style.animation = 'shake 0.4s';
                        setTimeout(() => zone.style.animation = '', 400);
                    }
                });
            });

            resetGameBtn.addEventListener('click', () => {
                // Reset State
                correctDrops = 0;
                gameSuccess.classList.add('hidden');

                // Restore original badges
                badgeContainer.innerHTML = originalBadgesHTML;

                // Re-attach drag events to new badges
                document.querySelectorAll('.badge-draggable').forEach(draggable => {
                    draggable.addEventListener('dragstart', () => draggable.classList.add('dragging'));
                    draggable.addEventListener('dragend', () => draggable.classList.remove('dragging'));
                });

                // Clear drop zones
                dropZones.forEach(zone => {
                    zone.classList.remove('correct', 'p-0');
                    zone.innerHTML = '<span class="text-xs text-slate-500">วาง Constraint ตรงนี้</span>';
                });
            });

        });
    </script>

</body>
</html>
-----------------------------------------------------------------------------------------------------------------------------------
- 2.4 ความสัมพันธ์ตาราง (FOREIGN KEY)
<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>2.4 ความสัมพันธ์ตาราง (FOREIGN KEY) - SQL Course</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@300;400;500;600;700&family=Fira+Code:wght@400;500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['"Noto Sans Thai"', 'sans-serif'],
                        mono: ['"Fira Code"', 'monospace'],
                    },
                    colors: {
                        mysql: {
                            blue: '#00758F',
                            orange: '#F29111',
                            dark: '#1e293b'
                        }
                    }
                }
            }
        }
    </script>
    
    <style>
        body {
            background-color: #f8fafc;
            color: #334155;
        }
        
        /* Animations */
        .pop-in { animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        @keyframes popIn {
            0% { transform: scale(0); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            50% { transform: translateX(5px); }
            75% { transform: translateX(-5px); }
        }

        /* Interactive Table Styles */
        .db-table {
            border-collapse: separate;
            border-spacing: 0;
            width: 100%;
            border: 1px solid #e2e8f0;
            border-radius: 0.75rem;
            overflow: hidden;
        }
        .db-table th {
            background-color: #f1f5f9;
            font-family: "Fira Code", monospace;
            font-size: 0.875rem;
            color: #475569;
            padding: 0.75rem 1rem;
            text-align: left;
            border-bottom: 2px solid #cbd5e1;
        }
        .db-table td {
            padding: 0.75rem 1rem;
            border-bottom: 1px solid #f1f5f9;
            transition: all 0.2s ease;
        }
        .db-table tr:last-child td { border-bottom: none; }

        .clickable-row { cursor: pointer; }
        .clickable-row:hover td { background-color: #f8fafc; }

        /* Highlight States */
        .highlight-dept-1 td { background-color: #e0f2fe !important; } /* Sky */
        .highlight-dept-2 td { background-color: #fce7f3 !important; } /* Pink */
        .highlight-dept-3 td { background-color: #dcfce7 !important; } /* Green */

        .key-icon { transition: transform 0.2s; }
        .clickable-row:hover .key-icon { transform: scale(1.2) rotate(-15deg); }

        /* Schema Connect Game Styles */
        .schema-box {
            background: white;
            border: 2px solid #cbd5e1;
            border-radius: 12px;
            padding: 1rem;
            width: 100%;
            max-width: 280px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            position: relative;
            z-index: 10;
        }
        .schema-col {
            padding: 0.5rem;
            border: 1px solid #e2e8f0;
            margin-bottom: 0.25rem;
            border-radius: 6px;
            font-family: monospace;
            font-size: 0.875rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #f8fafc;
        }
        .schema-col.pk { border-left: 4px solid #F29111; }

        .drag-node {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: #cbd5e1;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: grab;
            transition: all 0.2s;
        }
        .drag-node:hover { background: #94a3b8; transform: scale(1.1); }
        .drag-node:active { cursor: grabbing; }

        .drop-target {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            border: 2px dashed #94a3b8;
            transition: all 0.2s;
        }
        .drop-target.active {
            border-color: #F29111;
            background-color: #fef3c7;
            transform: scale(1.2);
        }
        .drop-target.success {
            border-color: #10b981;
            border-style: solid;
            background-color: #d1fae5;
            color: #10b981;
        }

        /* Connecting Lines Canvas */
        #schema-canvas {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        }

        /* Toast */
        #toast {
            visibility: hidden;
            opacity: 0;
            transition: visibility 0s, opacity 0.3s linear;
        }
        #toast.show {
            visibility: visible;
            opacity: 1;
        }
    </style>

</head>
<body class="antialiased min-h-screen flex flex-col relative">

    <header class="bg-gradient-to-r from-mysql-blue to-cyan-900 text-white shadow-lg sticky top-0 z-50">
        <div class="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
            <div class="flex items-center gap-3">
                <i class="fa-solid fa-database text-mysql-orange text-3xl"></i>
                <div>
                    <h1 class="text-xl font-bold leading-tight">SQL Course (21901-2001)</h1>
                    <p class="text-sm text-cyan-200">Unit 2: งานจัดการตาราง (Table Management)</p>
                </div>
            </div>
            <div class="hidden sm:block">
                <span class="bg-white/20 px-3 py-1 rounded-full text-sm font-medium border border-white/30 backdrop-blur-sm">
                    บทที่ 2.4 ความสัมพันธ์ตาราง
                </span>
            </div>
        </div>
    </header>

    <main class="flex-grow max-w-5xl mx-auto px-4 py-8 w-full space-y-12">

        <section class="text-center space-y-4 max-w-3xl mx-auto">
            <h2 class="text-3xl md:text-4xl font-bold text-slate-800">1. การเชื่อมโยงตาราง (Table Relationships)</h2>
            <p class="text-lg text-slate-600 leading-relaxed">
                ในฐานข้อมูลเชิงสัมพันธ์ที่ดี เราจะไม่เก็บข้อมูลทุกอย่างไว้ในตารางเดียว (เพื่อลดความซ้ำซ้อน) แต่เราจะแยกตารางออกเป็นส่วนๆ และใช้ <strong>กุญแจหลัก (PK)</strong> และ <strong>กุญแจรอง (FK)</strong> ในการเชื่อมโยงข้อมูลเข้าด้วยกัน
            </p>
        </section>

        <!-- Concept Cards -->
        <section class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-mysql-orange transition-colors">
                <div class="flex items-center gap-4 mb-4">
                    <div class="w-12 h-12 rounded-full bg-orange-100 text-mysql-orange flex items-center justify-center text-2xl">
                        <i class="fa-solid fa-key"></i>
                    </div>
                    <div>
                        <h3 class="text-xl font-bold text-slate-800">Primary Key (PK)</h3>
                        <p class="text-sm text-slate-500 font-mono">กุญแจหลัก</p>
                    </div>
                </div>
                <ul class="space-y-2 text-slate-600 text-sm">
                    <li><i class="fa-solid fa-check text-green-500 mr-2"></i>ใช้ระบุตัวตนของข้อมูลในตารางนั้นๆ (รหัสประจำตัว)</li>
                    <li><i class="fa-solid fa-check text-green-500 mr-2"></i>ข้อมูลในคอลัมน์นี้ <strong>ห้ามซ้ำกัน</strong> (Unique)</li>
                    <li><i class="fa-solid fa-check text-green-500 mr-2"></i>ข้อมูล <strong>ห้ามเป็นค่าว่าง</strong> (Not Null)</li>
                </ul>
            </div>

            <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-mysql-blue transition-colors">
                <div class="flex items-center gap-4 mb-4">
                    <div class="w-12 h-12 rounded-full bg-cyan-100 text-mysql-blue flex items-center justify-center text-2xl">
                        <i class="fa-solid fa-link"></i>
                    </div>
                    <div>
                        <h3 class="text-xl font-bold text-slate-800">Foreign Key (FK)</h3>
                        <p class="text-sm text-slate-500 font-mono">กุญแจรอง / คีย์ต่างประเทศ</p>
                    </div>
                </div>
                <ul class="space-y-2 text-slate-600 text-sm">
                    <li><i class="fa-solid fa-check text-green-500 mr-2"></i>ใช้เชื่อมโยง (อ้างอิง) ไปยัง PK ของอีกตารางหนึ่ง</li>
                    <li><i class="fa-solid fa-check text-green-500 mr-2"></i>ข้อมูล <strong>ซ้ำกันได้</strong> (เช่น พนักงานหลายคนอยู่แผนกเดียวกัน)</li>
                    <li><i class="fa-solid fa-check text-green-500 mr-2"></i>ค่าที่ใส่ <strong>ต้องมีอยู่จริง</strong> ในตารางที่มันอ้างอิงถึง</li>
                </ul>
            </div>
        </section>

        <section class="bg-slate-800 rounded-2xl p-6 md:p-8 shadow-xl text-white">
            <div class="flex items-center gap-3 mb-6">
                <i class="fa-solid fa-diagram-project text-cyan-400 text-2xl"></i>
                <div>
                    <h2 class="text-2xl font-bold">2. Interactive: ภาพจำลองความสัมพันธ์ 1-to-Many</h2>
                    <p class="text-slate-300 text-sm mt-1">ลองคลิกที่ <strong>ชื่อแผนก (ตารางซ้าย)</strong> หรือ <strong>พนักงาน (ตารางขวา)</strong> เพื่อดูการเชื่อมโยงข้อมูล</p>
                </div>
            </div>

            <div class="flex flex-col lg:flex-row gap-8">
                <!-- Parent Table -->
                <div class="w-full lg:w-5/12 bg-white rounded-xl overflow-hidden text-slate-800">
                    <div class="bg-slate-200 px-4 py-2 border-b border-slate-300 flex justify-between items-center">
                        <h3 class="font-bold flex items-center gap-2"><i class="fa-solid fa-table"></i> departments (ตารางหลัก)</h3>
                    </div>
                    <table class="db-table" id="table-dept">
                        <thead>
                            <tr>
                                <th><i class="fa-solid fa-key text-mysql-orange mr-1" title="Primary Key"></i>dept_id</th>
                                <th>dept_name</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="clickable-row transition-colors" data-dept="1">
                                <td class="font-bold">1</td>
                                <td>ฝ่ายไอที (IT)</td>
                            </tr>
                            <tr class="clickable-row transition-colors" data-dept="2">
                                <td class="font-bold">2</td>
                                <td>ฝ่ายบุคคล (HR)</td>
                            </tr>
                            <tr class="clickable-row transition-colors" data-dept="3">
                                <td class="font-bold">3</td>
                                <td>ฝ่ายขาย (Sales)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Link Visualizer (Hidden on small screens) -->
                <div class="hidden lg:flex w-2/12 items-center justify-center flex-col text-slate-400">
                    <div class="text-center mb-2 font-mono text-sm bg-slate-700 px-3 py-1 rounded-full text-slate-300">REFERENCES</div>
                    <div class="flex items-center w-full">
                        <div class="w-2 h-2 rounded-full bg-mysql-orange"></div>
                        <div class="h-1 flex-grow bg-gradient-to-r from-mysql-orange to-mysql-blue"></div>
                        <i class="fa-solid fa-chevron-right text-mysql-blue"></i>
                    </div>
                    <div class="text-center mt-2 text-xs font-bold text-mysql-orange">1 : Many</div>
                </div>

                <!-- Child Table -->
                <div class="w-full lg:w-5/12 bg-white rounded-xl overflow-hidden text-slate-800">
                    <div class="bg-slate-200 px-4 py-2 border-b border-slate-300 flex justify-between items-center">
                        <h3 class="font-bold flex items-center gap-2"><i class="fa-solid fa-table"></i> employees (ตารางลูก)</h3>
                    </div>
                    <table class="db-table" id="table-emp">
                        <thead>
                            <tr>
                                <th>emp_id</th>
                                <th>name</th>
                                <th><i class="fa-solid fa-link text-mysql-blue mr-1" title="Foreign Key"></i>dept_id</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="clickable-row transition-colors" data-dept="1">
                                <td>101</td>
                                <td>สมชาย</td>
                                <td class="font-bold text-cyan-700">1</td>
                            </tr>
                            <tr class="clickable-row transition-colors" data-dept="2">
                                <td>102</td>
                                <td>สุดา</td>
                                <td class="font-bold text-pink-700">2</td>
                            </tr>
                            <tr class="clickable-row transition-colors" data-dept="1">
                                <td>103</td>
                                <td>มานะ</td>
                                <td class="font-bold text-cyan-700">1</td>
                            </tr>
                            <tr class="clickable-row transition-colors" data-dept="3">
                                <td>104</td>
                                <td>ปิติ</td>
                                <td class="font-bold text-green-700">3</td>
                            </tr>
                            <tr class="clickable-row transition-colors" data-dept="2">
                                <td>105</td>
                                <td>ชูใจ</td>
                                <td class="font-bold text-pink-700">2</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="mt-6 bg-slate-700/50 p-4 rounded-lg border border-slate-600">
                <p class="text-sm">
                    <strong>ข้อสังเกต:</strong> คอลัมน์ <code>dept_id</code> ในตาราง employees ทำหน้าที่เป็น <strong>Foreign Key</strong> ชี้ไปยัง <code>dept_id</code> ของตาราง departments ทำให้เรารู้ว่าพนักงานแต่ละคนอยู่แผนกอะไร โดยไม่ต้องพิมพ์ชื่อแผนกซ้ำๆ
                </p>
            </div>
        </section>

        <section class="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm">
            <div class="flex items-center gap-3 mb-6">
                <i class="fa-solid fa-shield-halved text-rose-500 text-2xl"></i>
                <div>
                    <h2 class="text-2xl font-bold text-slate-800">3. กฎความสมบูรณ์อ้างอิง (Referential Integrity)</h2>
                    <p class="text-slate-600 text-sm">เมื่อมีการทำ Foreign Key ฐานข้อมูลจะป้องกันไม่ให้เราใส่ข้อมูลที่ไม่มีอยู่จริงในตารางหลัก</p>
                </div>
            </div>

            <div class="bg-slate-50 p-6 rounded-xl border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                    <h4 class="font-bold text-slate-700 mb-4"><i class="fa-solid fa-user-plus mr-2"></i>เครื่องจำลองเพิ่มพนักงานใหม่</h4>
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-semibold text-slate-600 mb-1">ชื่อพนักงาน</label>
                            <input type="text" id="sim-name" value="วีระ" class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-mysql-blue outline-none" readonly>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-slate-600 mb-1">รหัสแผนก (dept_id) <span class="text-xs text-slate-400 font-normal">*มีแผนก 1, 2, 3</span></label>
                            <input type="number" id="sim-dept" placeholder="ลองใส่ตัวเลข..." class="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-mysql-blue outline-none font-mono">
                        </div>
                        <button id="sim-btn" class="w-full bg-mysql-blue hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                            <i class="fa-solid fa-database mr-2"></i> INSERT INTO employees
                        </button>
                    </div>
                </div>

                <div class="bg-slate-900 rounded-xl p-5 h-full flex flex-col relative overflow-hidden" id="sim-console-box">
                    <div class="absolute top-0 left-0 w-full h-8 bg-slate-800 flex items-center px-4">
                        <div class="flex gap-1.5">
                            <div class="w-3 h-3 rounded-full bg-red-500"></div>
                            <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div class="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div class="mx-auto text-xs font-mono text-slate-400">MySQL Console</div>
                    </div>
                    <div class="mt-8 flex-grow font-mono text-sm space-y-2" id="sim-console">
                        <div class="text-slate-400">> รอคำสั่ง...</div>
                    </div>
                </div>
            </div>
        </section>

        <section class="bg-slate-100 rounded-2xl p-6 md:p-8 border border-slate-200 relative overflow-hidden" id="schema-section">
            <canvas id="schema-canvas"></canvas>

            <div class="relative z-10">
                <div class="flex items-center gap-3 mb-2 border-b border-slate-300 pb-4">
                    <i class="fa-solid fa-puzzle-piece text-mysql-orange text-2xl"></i>
                    <div>
                        <h2 class="text-2xl font-bold text-slate-800">4. กิจกรรม: สร้างความสัมพันธ์ (Schema Builder)</h2>
                        <p class="text-slate-600 text-sm">ลากจุดเชื่อมต่อจาก <strong>Foreign Key</strong> ของตารางนักเรียน ไปวางที่ <strong>Primary Key</strong> ของตารางสาขาวิชา</p>
                    </div>
                </div>

                <div class="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-32 py-10">

                    <!-- Parent Table Schema -->
                    <div class="schema-box" id="box-major">
                        <div class="bg-slate-800 text-white font-bold px-3 py-2 -mx-4 -mt-4 mb-3 rounded-t-lg text-center">
                            majors (สาขาวิชา)
                        </div>
                        <div class="schema-col pk">
                            <span><i class="fa-solid fa-key text-mysql-orange mr-1"></i>major_id</span>
                            <span class="text-xs text-slate-400">INT</span>
                            <!-- Drop Target -->
                            <div class="drop-target" id="target-pk" title="วางที่นี่"></div>
                        </div>
                        <div class="schema-col">
                            <span>major_name</span>
                            <span class="text-xs text-slate-400">VARCHAR</span>
                        </div>
                    </div>

                    <!-- Child Table Schema -->
                    <div class="schema-box" id="box-student">
                        <div class="bg-slate-800 text-white font-bold px-3 py-2 -mx-4 -mt-4 mb-3 rounded-t-lg text-center">
                            students (นักเรียน)
                        </div>
                        <div class="schema-col pk">
                            <span><i class="fa-solid fa-key text-mysql-orange mr-1"></i>student_id</span>
                            <span class="text-xs text-slate-400">INT</span>
                        </div>
                        <div class="schema-col">
                            <span>first_name</span>
                            <span class="text-xs text-slate-400">VARCHAR</span>
                        </div>
                        <div class="schema-col border-2 border-dashed border-mysql-blue">
                            <!-- Drag Source -->
                            <div class="drag-node" id="drag-fk" draggable="true" title="ลากเพื่อเชื่อมโยง">
                                <i class="fa-solid fa-link text-xs text-white"></i>
                            </div>
                            <span><i class="fa-solid fa-link text-mysql-blue ml-2 mr-1"></i>major_id</span>
                            <span class="text-xs text-slate-400">INT</span>
                        </div>
                    </div>

                </div>

                <div class="text-center mt-4 hidden" id="schema-success">
                    <div class="inline-block bg-emerald-100 text-emerald-700 px-6 py-3 rounded-full font-bold pop-in border border-emerald-300">
                        <i class="fa-solid fa-check-circle mr-2"></i> ยอดเยี่ยม! สร้าง Foreign Key สำเร็จ
                    </div>
                </div>
            </div>
        </section>

        <div class="flex justify-between items-center pt-8 border-t border-slate-200">
            <button class="text-slate-500 hover:text-mysql-blue transition-colors flex items-center gap-2" onclick="alert('ย้อนกลับไป: 2.3 สร้างตาราง (CREATE TABLE)')">
                <i class="fa-solid fa-arrow-left"></i> 2.3 สร้างตาราง
            </button>
            <button class="bg-mysql-blue hover:bg-cyan-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-cyan-600/30 flex items-center gap-2" onclick="alert('ไปยังบทเรียน: 2.5 การจัดการข้อมูลเบื้องต้น')">
                ไปต่อ: 2.5 จัดการข้อมูล <i class="fa-solid fa-arrow-right"></i>
            </button>
        </div>

    </main>

    <footer class="bg-slate-900 text-slate-400 py-6 text-center text-sm mt-auto">
        <p>© 2026 SQL Course Interactive Learning | 21901-2001</p>
    </footer>

    <!-- Custom Toast Notification -->
    <div id="toast" class="fixed bottom-5 right-5 bg-slate-800 text-white px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-3 border-l-4">
        <i id="toastIcon" class="fa-solid text-xl"></i>
        <div id="toastMsg" class="font-medium">Message</div>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', () => {

            // --- Toast Notification Logic ---
            const toast = document.getElementById('toast');
            const toastMsg = document.getElementById('toastMsg');
            const toastIcon = document.getElementById('toastIcon');
            let toastTimeout;

            function showToast(message, type) {
                clearTimeout(toastTimeout);
                toastMsg.textContent = message;

                toast.className = 'fixed bottom-5 right-5 bg-slate-800 text-white px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-3 border-l-4';
                toastIcon.className = 'fa-solid text-xl';

                if (type === 'success') {
                    toast.classList.add('border-emerald-500');
                    toastIcon.classList.add('fa-circle-check', 'text-emerald-500');
                } else if (type === 'error') {
                    toast.classList.add('border-red-500');
                    toastIcon.classList.add('fa-circle-xmark', 'text-red-500');
                } else if (type === 'info') {
                    toast.classList.add('border-cyan-500');
                    toastIcon.classList.add('fa-circle-info', 'text-cyan-500');
                }

                toast.classList.add('show');
                toastTimeout = setTimeout(() => { toast.classList.remove('show'); }, 2500);
            }

            // --- Section 2: Interactive Table Mapping ---
            const tableDeptRows = document.querySelectorAll('#table-dept tbody tr');
            const tableEmpRows = document.querySelectorAll('#table-emp tbody tr');

            function clearHighlights() {
                tableDeptRows.forEach(row => row.className = 'clickable-row transition-colors');
                tableEmpRows.forEach(row => row.className = 'clickable-row transition-colors');
            }

            function highlightRelation(deptId) {
                clearHighlights();
                if(!deptId) return;

                const highlightClass = `highlight-dept-${deptId}`;

                // Highlight parent
                document.querySelector(`#table-dept tr[data-dept="${deptId}"]`).classList.add(highlightClass);

                // Highlight children
                tableEmpRows.forEach(row => {
                    if(row.getAttribute('data-dept') === deptId) {
                        row.classList.add(highlightClass);
                    }
                });
            }

            // Add click listeners to both tables
            const allRows = [...tableDeptRows, ...tableEmpRows];
            allRows.forEach(row => {
                row.addEventListener('click', function() {
                    const deptId = this.getAttribute('data-dept');

                    // Toggle off if clicking the already highlighted one
                    if(this.classList.contains(`highlight-dept-${deptId}`)) {
                        clearHighlights();
                    } else {
                        highlightRelation(deptId);

                        let deptName = "";
                        if(deptId === "1") deptName = "ไอที";
                        if(deptId === "2") deptName = "บุคคล";
                        if(deptId === "3") deptName = "ขาย";

                        showToast(`แสดงความสัมพันธ์ของแผนก: ${deptName}`, 'info');
                    }
                });
            });


            // --- Section 3: Referential Integrity Simulator ---
            const simDeptInput = document.getElementById('sim-dept');
            const simBtn = document.getElementById('sim-btn');
            const simConsole = document.getElementById('sim-console');
            const consoleBox = document.getElementById('sim-console-box');

            function addConsoleLog(htmlContent) {
                const div = document.createElement('div');
                div.innerHTML = htmlContent;
                simConsole.appendChild(div);
                consoleBox.scrollTop = consoleBox.scrollHeight; // auto scroll
            }

            simBtn.addEventListener('click', () => {
                const deptVal = simDeptInput.value.trim();
                const sqlCommand = `<span class="text-cyan-300">INSERT INTO</span> employees (name, dept_id) <span class="text-cyan-300">VALUES</span> ('วีระ', ${deptVal || 'NULL'});`;

                addConsoleLog(`<div><span class="text-slate-400">></span> ${sqlCommand}</div>`);

                if (!deptVal) {
                    addConsoleLog(`<div class="text-rose-400 mt-1 pl-4"><i class="fa-solid fa-xmark mr-1"></i> Error: Column 'dept_id' cannot be null (ถ้ากำหนด Not Null) หรือ syntax error</div>`);
                    consoleBox.style.animation = 'shake 0.5s';
                    setTimeout(() => consoleBox.style.animation = '', 500);
                    return;
                }

                const validDepts = ["1", "2", "3"];
                if (validDepts.includes(deptVal)) {
                    // Success
                    addConsoleLog(`<div class="text-emerald-400 mt-1 pl-4"><i class="fa-solid fa-check mr-1"></i> Query OK, 1 row affected. (เพิ่มข้อมูลสำเร็จ เพราะ dept_id = ${deptVal} มีอยู่ในตาราง departments)</div>`);
                    showToast('เพิ่มข้อมูลสำเร็จ!', 'success');
                    simDeptInput.value = '';
                } else {
                    // Foreign Key Error
                    addConsoleLog(`<div class="text-rose-400 mt-1 pl-4 leading-tight"><i class="fa-solid fa-triangle-exclamation mr-1"></i> ERROR 1452: Cannot add or update a child row: a <strong>foreign key constraint fails</strong>.<br><span class="text-slate-400 text-xs">(ปฏิเสธการเพิ่มข้อมูล: เพราะรหัสแผนก ${deptVal} ไม่มีอยู่ในตารางหลัก)</span></div>`);
                    consoleBox.style.animation = 'shake 0.5s';
                    setTimeout(() => consoleBox.style.animation = '', 500);
                    showToast('Error: ละเมิดกฎ Foreign Key!', 'error');
                }
            });

            // Enter key to submit
            simDeptInput.addEventListener('keypress', function (e) {
                if (e.key === 'Enter') simBtn.click();
            });


            // --- Section 4: Schema Drag and Drop & Canvas ---
            const dragNode = document.getElementById('drag-fk');
            const dropTarget = document.getElementById('target-pk');
            const schemaCanvas = document.getElementById('schema-canvas');
            const ctx = schemaCanvas.getContext('2d');
            const schemaSection = document.getElementById('schema-section');
            const successMsg = document.getElementById('schema-success');

            let isConnected = false;

            // Resize canvas to fit section
            function resizeCanvas() {
                schemaCanvas.width = schemaSection.clientWidth;
                schemaCanvas.height = schemaSection.clientHeight;
                if(isConnected) drawConnectionLine();
            }
            window.addEventListener('resize', resizeCanvas);
            setTimeout(resizeCanvas, 100); // init

            function getElementCenterCoords(el) {
                const rect = el.getBoundingClientRect();
                const sectionRect = schemaSection.getBoundingClientRect();
                return {
                    x: (rect.left - sectionRect.left) + (rect.width / 2),
                    y: (rect.top - sectionRect.top) + (rect.height / 2)
                };
            }

            function drawConnectionLine() {
                ctx.clearRect(0, 0, schemaCanvas.width, schemaCanvas.height);

                const start = getElementCenterCoords(dragNode);
                const end = getElementCenterCoords(dropTarget);

                ctx.beginPath();
                ctx.moveTo(start.x, start.y);

                // Draw orthogonal-like line for DB schema feel
                const midX = (start.x + end.x) / 2;
                ctx.lineTo(midX, start.y);
                ctx.lineTo(midX, end.y);
                ctx.lineTo(end.x, end.y);

                ctx.strokeStyle = '#10b981'; // Emerald 500
                ctx.lineWidth = 3;
                ctx.lineJoin = 'round';
                ctx.stroke();

                // Draw end points (Crow's foot logic could go here, but dots are simpler)
                ctx.beginPath();
                ctx.arc(start.x, start.y, 4, 0, 2 * Math.PI);
                ctx.fillStyle = '#10b981';
                ctx.fill();

                ctx.beginPath();
                ctx.arc(end.x, end.y, 4, 0, 2 * Math.PI);
                ctx.fillStyle = '#10b981';
                ctx.fill();
            }

            // Drag Events
            dragNode.addEventListener('dragstart', (e) => {
                if(isConnected) e.preventDefault(); // Don't drag if already connected
                dragNode.style.opacity = '0.5';
            });

            dragNode.addEventListener('dragend', () => {
                dragNode.style.opacity = '1';
                dropTarget.classList.remove('active');
            });

            dropTarget.addEventListener('dragover', (e) => {
                e.preventDefault(); // Allow drop
                if(!isConnected) dropTarget.classList.add('active');
            });

            dropTarget.addEventListener('dragleave', () => {
                dropTarget.classList.remove('active');
            });

            dropTarget.addEventListener('drop', (e) => {
                e.preventDefault();
                if(isConnected) return;

                isConnected = true;
                dropTarget.classList.remove('active');
                dropTarget.classList.add('success');
                dropTarget.innerHTML = '<i class="fa-solid fa-link"></i>';

                dragNode.style.background = '#10b981';
                dragNode.innerHTML = '<i class="fa-solid fa-check text-white text-xs"></i>';
                dragNode.setAttribute('draggable', 'false');
                dragNode.style.cursor = 'default';

                drawConnectionLine();
                successMsg.classList.remove('hidden');
                showToast('เชื่อมโยง Foreign Key สำเร็จ', 'success');
            });

        });
    </script>

</body>
</html>
-----------------------------------------------------------------------------------------------------------------------------------
- 2.5 การสร้างตาราง (CREATE TABLE)
<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>2.5 การสร้างตาราง (CREATE TABLE) - SQL Course</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@300;400;500;600;700&family=Fira+Code:wght@400;500;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['"Noto Sans Thai"', 'sans-serif'],
                        mono: ['"Fira Code"', 'monospace'],
                    },
                    colors: {
                        mysql: {
                            blue: '#00758F',
                            orange: '#F29111',
                            dark: '#1e293b'
                        },
                        code: {
                            keyword: '#c678dd',
                            string: '#98c379',
                            number: '#d19a66',
                            type: '#e5c07b',
                            variable: '#e06c75',
                            comment: '#5c6370'
                        }
                    }
                }
            }
        }
    </script>
    
    <style>
        body {
            background-color: #f8fafc;
            color: #334155;
        }
        
        /* Animations */
        .pop-in { animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        @keyframes popIn {
            0% { transform: scale(0); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
        }

        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20%, 60% { transform: translateX(-5px); }
            40%, 80% { transform: translateX(5px); }
        }
        .shake-anim { animation: shake 0.4s; }

        @keyframes slideDown {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .column-row { animation: slideDown 0.3s ease-out forwards; }

        /* Custom Checkbox styles for the builder */
        .custom-checkbox input:checked + div {
            background-color: #00758F;
            border-color: #00758F;
            color: white;
        }

        /* Code Editor Theme */
        .code-editor {
            background-color: #282c34;
            color: #abb2bf;
            font-family: 'Fira Code', monospace;
            tab-size: 4;
        }
        .syntax-keyword { color: #c678dd; font-weight: bold; }
        .syntax-type { color: #e5c07b; }
        .syntax-identifier { color: #e06c75; }
        .syntax-punctuation { color: #abb2bf; }
        .syntax-number { color: #d19a66; }

        /* Generated Schema Table */
        .schema-table th { background-color: #f1f5f9; color: #475569; border-bottom: 2px solid #cbd5e1; }
        .schema-table td { border-bottom: 1px solid #e2e8f0; }

        /* Toast */
        #toast {
            visibility: hidden;
            opacity: 0;
            transition: visibility 0s, opacity 0.3s linear;
        }
        #toast.show { visibility: visible; opacity: 1; }
    </style>

</head>

<body class="antialiased min-h-screen flex flex-col relative">

    <header class="bg-gradient-to-r from-mysql-blue to-cyan-900 text-white shadow-lg sticky top-0 z-50">
        <div class="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
            <div class="flex items-center gap-3">
                <i class="fa-solid fa-database text-mysql-orange text-3xl"></i>
                <div>
                    <h1 class="text-xl font-bold leading-tight">SQL Course (21901-2001)</h1>
                    <p class="text-sm text-cyan-200">Unit 2: งานจัดการตาราง (Table Management)</p>
                </div>
            </div>
            <div class="hidden sm:block">
                <span class="bg-white/20 px-3 py-1 rounded-full text-sm font-medium border border-white/30 backdrop-blur-sm">
                    บทที่ 2.5 การสร้างตาราง
                </span>
            </div>
        </div>
    </header>

    <main class="flex-grow max-w-6xl mx-auto px-4 py-8 w-full space-y-12">

        <section class="text-center space-y-4 max-w-3xl mx-auto">
            <h2 class="text-3xl md:text-4xl font-bold text-slate-800">1. คำสั่ง CREATE TABLE</h2>
            <p class="text-lg text-slate-600 leading-relaxed">
                นำความรู้เรื่อง <strong>Data Types</strong> และ <strong>Constraints</strong> มารวมกัน เพื่อเขียนคำสั่งสำหรับสร้างตารางใหม่ลงในฐานข้อมูล โดยมีโครงสร้างคำสั่งพื้นฐานดังนี้
            </p>
        </section>

        <section class="bg-slate-800 rounded-3xl p-6 md:p-8 shadow-xl text-white relative overflow-hidden">
            <div class="absolute -right-20 -top-20 opacity-10">
                <i class="fa-solid fa-code text-9xl"></i>
            </div>

            <h3 class="text-xl font-bold mb-6 flex items-center gap-2 relative z-10 text-cyan-300">
                <i class="fa-solid fa-wand-magic-sparkles"></i> โครงสร้างไวยากรณ์ (Syntax)
            </h3>

            <div class="code-editor p-6 rounded-xl text-sm md:text-base leading-relaxed shadow-inner border border-slate-700 overflow-x-auto relative z-10">

<pre><code><span class="syntax-keyword">CREATE TABLE</span> <span class="syntax-identifier">table_name</span> <span class="syntax-punctuation">(</span>
    <span class="syntax-identifier">column1_name</span> <span class="syntax-type">data_type</span> <span class="syntax-keyword">constraints</span><span class="syntax-punctuation">,</span>
    <span class="syntax-identifier">column2_name</span> <span class="syntax-type">data_type</span> <span class="syntax-keyword">constraints</span><span class="syntax-punctuation">,</span>
    <span class="syntax-keyword">PRIMARY KEY</span> <span class="syntax-punctuation">(</span><span class="syntax-identifier">column1_name</span><span class="syntax-punctuation">)</span>
<span class="syntax-punctuation">);</span></code></pre>

            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 relative z-10">
                <div class="bg-slate-700/50 p-4 rounded-lg border border-slate-600">
                    <span class="text-code-keyword font-mono font-bold text-sm">CREATE TABLE</span>
                    <p class="text-sm text-slate-300 mt-1">คำสั่งหลักสำหรับสร้างตารางใหม่ ตามด้วยชื่อตารางที่เราต้องการตั้ง</p>
                </div>
                <div class="bg-slate-700/50 p-4 rounded-lg border border-slate-600">
                    <span class="text-code-identifier font-mono font-bold text-sm">column_name</span> + <span class="text-code-type font-mono font-bold text-sm">data_type</span>
                    <p class="text-sm text-slate-300 mt-1">กำหนดชื่อคอลัมน์ และประเภทข้อมูล (เช่น INT, VARCHAR)</p>
                </div>
                <div class="bg-slate-700/50 p-4 rounded-lg border border-slate-600">
                    <span class="text-code-keyword font-mono font-bold text-sm">constraints</span>
                    <p class="text-sm text-slate-300 mt-1">กฎเกณฑ์เพิ่มเติม (เช่น NOT NULL, UNIQUE, AUTO_INCREMENT)</p>
                </div>
            </div>
        </section>

        <section class="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm relative z-10">
            <div class="flex items-center gap-3 mb-8 border-b border-slate-100 pb-4">
                <i class="fa-solid fa-hammer text-mysql-orange text-3xl"></i>
                <div>
                    <h2 class="text-2xl font-bold text-slate-800">2. Interactive: SQL Table Builder</h2>
                    <p class="text-slate-600 text-sm mt-1">ลองออกแบบตารางของคุณเอง ระบบจะแปลเป็นคำสั่ง SQL ให้โดยอัตโนมัติ</p>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">

                <!-- Left: Form Builder -->
                <div class="lg:col-span-7 flex flex-col gap-6">

                    <!-- Table Name Input -->
                    <div class="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                        <label class="block text-sm font-bold text-slate-700 mb-2">ชื่อตาราง (Table Name) <span class="text-red-500">*</span></label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                <i class="fa-solid fa-table"></i>
                            </div>
                            <input type="text" id="tableNameInput" value="employees" class="w-full pl-10 pr-4 py-2 border border-slate-300 focus:border-mysql-blue focus:ring-2 focus:ring-mysql-blue/20 rounded-xl outline-none font-mono text-sm transition-all" placeholder="เช่น users, products">
                        </div>
                    </div>

                    <!-- Columns Container -->
                    <div class="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex-grow">
                        <div class="flex justify-between items-center mb-4">
                            <label class="block text-sm font-bold text-slate-700">คอลัมน์ (Columns)</label>
                            <button id="addColumnBtn" class="text-xs bg-mysql-blue hover:bg-cyan-700 text-white px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 shadow-sm">
                                <i class="fa-solid fa-plus"></i> เพิ่มคอลัมน์
                            </button>
                        </div>

                        <!-- Dynamic Columns List -->
                        <div id="columnsContainer" class="space-y-3 max-h-[400px] overflow-y-auto pr-2 pb-2">
                            <!-- Columns will be injected here by JS -->
                        </div>
                    </div>
                </div>

                <!-- Right: Code Preview & Execute -->
                <div class="lg:col-span-5 flex flex-col gap-4">

                    <div class="bg-[#282c34] rounded-2xl overflow-hidden shadow-xl flex flex-col h-full border border-slate-800">
                        <!-- Mac OS style header -->
                        <div class="bg-[#21252b] px-4 py-3 flex items-center gap-2 border-b border-black/20">
                            <div class="flex gap-1.5">
                                <div class="w-3 h-3 rounded-full bg-red-500"></div>
                                <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                                <div class="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <span class="ml-2 text-xs font-mono text-slate-400">Generated_SQL.sql</span>
                            <button id="copyCodeBtn" class="ml-auto text-slate-400 hover:text-white transition-colors" title="Copy Code">
                                <i class="fa-regular fa-copy"></i>
                            </button>
                        </div>

                        <!-- Streaming Code Area -->
                        <div class="p-5 font-mono text-sm overflow-x-auto flex-grow code-editor" id="sqlPreviewArea">
                            <!-- Code injected via JS -->
                        </div>

                        <!-- Execute Button -->
                        <div class="p-4 bg-[#21252b] border-t border-black/20">
                            <button id="executeBtn" class="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg hover:shadow-emerald-500/30 flex items-center justify-center gap-2 active:scale-95">
                                <i class="fa-solid fa-play"></i> จำลองการรันคำสั่ง (Execute)
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </section>

        <section id="resultSection" class="hidden">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- MySQL Console -->
                <div class="bg-black text-green-400 p-5 rounded-2xl font-mono text-sm shadow-xl border border-slate-800 relative">
                    <div class="absolute top-2 right-4 text-slate-600 text-xs"><i class="fa-solid fa-terminal"></i> Terminal</div>
                    <div id="consoleOutput" class="space-y-1">
                        <!-- Log injected here -->
                    </div>
                </div>

                <!-- Visual Schema Representation -->
                <div class="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                    <h4 class="font-bold text-slate-800 mb-3 border-b pb-2"><i class="fa-solid fa-table text-mysql-blue mr-2"></i>ผลลัพธ์: ตารางที่ถูกสร้างขึ้น (Schema)</h4>
                    <div class="overflow-x-auto">
                        <table class="w-full text-sm text-left schema-table" id="visualTable">
                            <thead>
                                <!-- Headers injected here -->
                            </thead>
                            <tbody>
                                <tr>
                                    <td colspan="100%" class="py-4 text-center text-slate-400 italic bg-slate-50">Empty set (ยังไม่มีข้อมูล)</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>

        <!-- Navigation -->
        <div class="flex justify-between items-center pt-8 border-t border-slate-200">
            <button class="text-slate-500 hover:text-mysql-blue transition-colors flex items-center gap-2" onclick="alert('ย้อนกลับไป: 2.4 ความสัมพันธ์ตาราง (FOREIGN KEY)')">
                <i class="fa-solid fa-arrow-left"></i> 2.4 Foreign Key
            </button>
            <button class="bg-mysql-blue hover:bg-cyan-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-cyan-600/30 flex items-center gap-2" onclick="alert('จบหน่วยที่ 2 เตรียมเข้าสู่หน่วยที่ 3: การจัดการข้อมูล (INSERT, UPDATE, DELETE)')">
                จบหน่วยที่ 2 <i class="fa-solid fa-flag-checkered"></i>
            </button>
        </div>

    </main>

    <footer class="bg-slate-900 text-slate-400 py-6 text-center text-sm mt-auto">
        <p>© 2026 SQL Course Interactive Learning | 21901-2001</p>
    </footer>

    <!-- Custom Toast Notification -->
    <div id="toast" class="fixed bottom-5 right-5 bg-slate-800 text-white px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-3 border-l-4">
        <i id="toastIcon" class="fa-solid text-xl"></i>
        <div id="toastMsg" class="font-medium">Message</div>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', () => {

            // --- Toast Notification ---
            const toast = document.getElementById('toast');
            const toastMsg = document.getElementById('toastMsg');
            const toastIcon = document.getElementById('toastIcon');
            let toastTimeout;

            function showToast(message, type) {
                clearTimeout(toastTimeout);
                toastMsg.textContent = message;
                toast.className = 'fixed bottom-5 right-5 bg-slate-800 text-white px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-3 border-l-4';
                toastIcon.className = 'fa-solid text-xl';

                if (type === 'success') {
                    toast.classList.add('border-emerald-500');
                    toastIcon.classList.add('fa-circle-check', 'text-emerald-500');
                } else if (type === 'error') {
                    toast.classList.add('border-red-500');
                    toastIcon.classList.add('fa-circle-xmark', 'text-red-500');
                } else {
                    toast.classList.add('border-blue-500');
                    toastIcon.classList.add('fa-circle-info', 'text-blue-500');
                }

                toast.classList.add('show');
                toastTimeout = setTimeout(() => { toast.classList.remove('show'); }, 2500);
            }

            // --- State Management ---
            let tableName = 'employees';
            let columns = [
                { id: Date.now(), name: 'emp_id', type: 'INT', pk: true, ai: true, nn: false, uq: false },
                { id: Date.now() + 1, name: 'first_name', type: 'VARCHAR(50)', pk: false, ai: false, nn: true, uq: false },
                { id: Date.now() + 2, name: 'email', type: 'VARCHAR(100)', pk: false, ai: false, nn: false, uq: true }
            ];

            const availableTypes = ['INT', 'VARCHAR(50)', 'VARCHAR(100)', 'VARCHAR(255)', 'TEXT', 'DATE', 'DATETIME', 'DECIMAL(10,2)', 'BOOLEAN'];

            // DOM Elements
            const tableNameInput = document.getElementById('tableNameInput');
            const columnsContainer = document.getElementById('columnsContainer');
            const addColumnBtn = document.getElementById('addColumnBtn');
            const sqlPreviewArea = document.getElementById('sqlPreviewArea');
            const executeBtn = document.getElementById('executeBtn');
            const copyCodeBtn = document.getElementById('copyCodeBtn');
            const resultSection = document.getElementById('resultSection');
            const consoleOutput = document.getElementById('consoleOutput');
            const visualTableHead = document.querySelector('#visualTable thead');

            // --- STREAMING_CHUNK: Rendering the UI based on state... ---

            function renderColumns() {
                columnsContainer.innerHTML = '';

                if (columns.length === 0) {
                    columnsContainer.innerHTML = '<div class="text-center text-sm text-slate-400 py-4 italic border-2 border-dashed rounded-lg border-slate-200">ยังไม่มีคอลัมน์ กรุณากดปุ่ม "เพิ่มคอลัมน์"</div>';
                }

                columns.forEach((col, index) => {
                    const row = document.createElement('div');
                    row.className = 'column-row bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-3 items-start sm:items-center relative group';

                    // Name Input
                    const nameHTML = `
                        <div class="w-full sm:w-1/3">
                            <input type="text" value="${col.name}" data-id="${col.id}" class="col-name-input w-full px-3 py-1.5 border border-slate-300 rounded-lg text-sm font-mono focus:border-mysql-blue focus:ring-1 focus:ring-mysql-blue outline-none" placeholder="column_name">
                        </div>
                    `;

                    // Type Dropdown
                    let typeOptions = availableTypes.map(t => `<option value="${t}" ${col.type === t ? 'selected' : ''}>${t}</option>`).join('');
                    const typeHTML = `
                        <div class="w-full sm:w-1/4">
                            <select data-id="${col.id}" class="col-type-select w-full px-3 py-1.5 border border-slate-300 rounded-lg text-sm font-mono bg-slate-50 focus:border-mysql-blue outline-none">
                                ${typeOptions}
                            </select>
                        </div>
                    `;

                    // Constraints Checkboxes (Custom styled)
                    const constraintsHTML = `
                        <div class="w-full sm:w-auto flex flex-wrap gap-2">
                            <label class="custom-checkbox cursor-pointer">
                                <input type="checkbox" class="hidden col-pk-cb" data-id="${col.id}" ${col.pk ? 'checked' : ''}>
                                <div class="px-2 py-1 rounded text-[10px] font-bold border transition-colors ${col.pk ? 'bg-mysql-blue border-mysql-blue text-white' : 'bg-slate-50 border-slate-300 text-slate-500 hover:bg-slate-100'}" title="Primary Key">PK</div>
                            </label>
                            <label class="custom-checkbox cursor-pointer ${col.type.includes('INT') ? '' : 'opacity-50 pointer-events-none'}">
                                <input type="checkbox" class="hidden col-ai-cb" data-id="${col.id}" ${col.ai ? 'checked' : ''} ${col.type.includes('INT') ? '' : 'disabled'}>
                                <div class="px-2 py-1 rounded text-[10px] font-bold border transition-colors ${col.ai ? 'bg-mysql-blue border-mysql-blue text-white' : 'bg-slate-50 border-slate-300 text-slate-500 hover:bg-slate-100'}" title="Auto Increment">A_I</div>
                            </label>
                            <label class="custom-checkbox cursor-pointer">
                                <input type="checkbox" class="hidden col-nn-cb" data-id="${col.id}" ${col.nn ? 'checked' : ''}>
                                <div class="px-2 py-1 rounded text-[10px] font-bold border transition-colors ${col.nn ? 'bg-mysql-blue border-mysql-blue text-white' : 'bg-slate-50 border-slate-300 text-slate-500 hover:bg-slate-100'}" title="Not Null">NN</div>
                            </label>
                            <label class="custom-checkbox cursor-pointer">
                                <input type="checkbox" class="hidden col-uq-cb" data-id="${col.id}" ${col.uq ? 'checked' : ''}>
                                <div class="px-2 py-1 rounded text-[10px] font-bold border transition-colors ${col.uq ? 'bg-mysql-blue border-mysql-blue text-white' : 'bg-slate-50 border-slate-300 text-slate-500 hover:bg-slate-100'}" title="Unique">UQ</div>
                            </label>
                        </div>
                    `;

                    // Delete Button
                    const deleteHTML = `
                        <button class="delete-col-btn ml-auto text-slate-300 hover:text-red-500 transition-colors px-2" data-id="${col.id}" title="ลบคอลัมน์">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    `;

                    row.innerHTML = nameHTML + typeHTML + constraintsHTML + deleteHTML;
                    columnsContainer.appendChild(row);
                });

                attachColumnListeners();
                updateSQLPreview();
            }

            // --- STREAMING_CHUNK: Implementing the SQL Code Generator logic... ---

            function generateSQL() {
                const safeTableName = tableName || 'table_name';
                let sql = `<span class="syntax-keyword">CREATE TABLE</span> <span class="syntax-identifier">${safeTableName}</span> <span class="syntax-punctuation">(</span>\n`;

                let primaryKeys = [];

                columns.forEach((col, index) => {
                    const isLast = (index === columns.length - 1) && primaryKeys.length === 0;
                    const safeColName = col.name || 'column_name';

                    let line = `    <span class="syntax-identifier">${safeColName}</span> <span class="syntax-type">${col.type}</span>`;

                    if (col.nn && !col.pk) line += ` <span class="syntax-keyword">NOT NULL</span>`; // PK implies NN usually, so hide it to look cleaner
                    if (col.uq) line += ` <span class="syntax-keyword">UNIQUE</span>`;
                    if (col.ai && col.type.includes('INT')) line += ` <span class="syntax-keyword">AUTO_INCREMENT</span>`;

                    if (col.pk) {
                        primaryKeys.push(safeColName);
                        // Inline PK if it's the only one is fine, but table-level PK is safer for multi-col
                        // For simplicity in teaching, we'll do table-level PK at the end.
                    }

                    line += `<span class="syntax-punctuation">${isLast ? '' : ','}</span>\n`;
                    sql += line;
                });

                if (primaryKeys.length > 0) {
                    sql += `    <span class="syntax-keyword">PRIMARY KEY</span> <span class="syntax-punctuation">(</span><span class="syntax-identifier">${primaryKeys.join(', ')}</span><span class="syntax-punctuation">)</span>\n`;
                }

                sql += `<span class="syntax-punctuation">);</span>`;
                return sql;
            }

            function getRawSQL() {
                // Returns plain text SQL for copying
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = generateSQL();
                return tempDiv.innerText;
            }

            function updateSQLPreview() {
                sqlPreviewArea.innerHTML = `<pre><code>${generateSQL()}</code></pre>`;
            }

            // --- STREAMING_CHUNK: Handling UI interactions... ---

            function attachColumnListeners() {
                // Name Input
                document.querySelectorAll('.col-name-input').forEach(input => {
                    input.addEventListener('input', (e) => {
                        const id = parseInt(e.target.dataset.id);
                        const col = columns.find(c => c.id === id);
                        col.name = e.target.value.replace(/[^a-zA-Z0-9_]/g, ''); // Basic sanitize
                        updateSQLPreview();
                    });
                });

                // Type Select
                document.querySelectorAll('.col-type-select').forEach(select => {
                    select.addEventListener('change', (e) => {
                        const id = parseInt(e.target.dataset.id);
                        const col = columns.find(c => c.id === id);
                        col.type = e.target.value;
                        // Auto-disable A_I if not INT
                        if (!col.type.includes('INT')) {
                            col.ai = false;
                        }
                        renderColumns(); // Re-render to update AI checkbox state
                    });
                });

                // Checkboxes
                const cbs = [
                    { cls: '.col-pk-cb', prop: 'pk' },
                    { cls: '.col-ai-cb', prop: 'ai' },
                    { cls: '.col-nn-cb', prop: 'nn' },
                    { cls: '.col-uq-cb', prop: 'uq' }
                ];

                cbs.forEach(cbInfo => {
                    document.querySelectorAll(cbInfo.cls).forEach(cb => {
                        cb.addEventListener('change', (e) => {
                            const id = parseInt(e.target.dataset.id);
                            const col = columns.find(c => c.id === id);
                            col[cbInfo.prop] = e.target.checked;
                            updateSQLPreview();
                        });
                    });
                });

                // Delete Btn
                document.querySelectorAll('.delete-col-btn').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const id = parseInt(e.currentTarget.dataset.id);
                        columns = columns.filter(c => c.id !== id);
                        renderColumns();
                    });
                });
            }

            // Table Name Event
            tableNameInput.addEventListener('input', (e) => {
                tableName = e.target.value.replace(/[^a-zA-Z0-9_]/g, '');
                updateSQLPreview();
            });

            // Add Column Event
            addColumnBtn.addEventListener('click', () => {
                const newId = Date.now();
                columns.push({
                    id: newId,
                    name: `col_${columns.length + 1}`,
                    type: 'VARCHAR(50)',
                    pk: false, ai: false, nn: false, uq: false
                });
                renderColumns();

                // Scroll to bottom
                setTimeout(() => {
                    columnsContainer.scrollTop = columnsContainer.scrollHeight;
                }, 50);
            });

            // Copy Code Event
            copyCodeBtn.addEventListener('click', () => {
                const text = getRawSQL();
                navigator.clipboard.writeText(text).then(() => {
                    showToast('คัดลอกโค้ด SQL แล้ว', 'success');
                    copyCodeBtn.innerHTML = '<i class="fa-solid fa-check text-emerald-500"></i>';
                    setTimeout(() => { copyCodeBtn.innerHTML = '<i class="fa-regular fa-copy"></i>'; }, 2000);
                }).catch(err => {
                    // Fallback for iframe restrictions
                    const textArea = document.createElement("textarea");
                    textArea.value = text;
                    document.body.appendChild(textArea);
                    textArea.select();
                    try {
                        document.execCommand('copy');
                        showToast('คัดลอกโค้ด SQL แล้ว', 'success');
                    } catch (err) {
                        showToast('ไม่สามารถคัดลอกได้', 'error');
                    }
                    document.body.removeChild(textArea);
                });
            });

            // --- STREAMING_CHUNK: Execution Simulation Logic ---

            executeBtn.addEventListener('click', () => {
                // Validation
                if (!tableName) {
                    showToast('กรุณากำหนดชื่อตาราง', 'error');
                    tableNameInput.focus();
                    return;
                }

                if (columns.length === 0) {
                    showToast('ตารางต้องมีอย่างน้อย 1 คอลัมน์', 'error');
                    return;
                }

                const emptyNameCol = columns.find(c => c.name.trim() === '');
                if (emptyNameCol) {
                    showToast('ชื่อคอลัมน์ห้ามเป็นค่าว่าง', 'error');
                    return;
                }

                // UI Feedback
                executeBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> กำลังประมวลผล...';
                executeBtn.disabled = true;

                setTimeout(() => {
                    executeBtn.innerHTML = '<i class="fa-solid fa-play"></i> จำลองการรันคำสั่ง (Execute)';
                    executeBtn.disabled = false;

                    // Show Result Section
                    resultSection.classList.remove('hidden');
                    resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

                    // Print to Console
                    consoleOutput.innerHTML = `
                        <div class="text-slate-400">mysql> ${getRawSQL().split('\n').join('<br>    ')}</div>
                        <div class="mt-2 text-emerald-400 font-bold">Query OK, 0 rows affected (0.02 sec)</div>
                        <div class="mt-1 text-slate-400">mysql> DESCRIBE ${tableName};</div>
                    `;

                    // Render Visual Table Head
                    let theadHTML = '<tr>';
                    columns.forEach(col => {
                        let icons = '';
                        if(col.pk) icons += '<i class="fa-solid fa-key text-mysql-orange ml-1" title="Primary Key"></i>';
                        if(col.ai) icons += '<i class="fa-solid fa-arrow-down-1-9 text-blue-500 ml-1" title="Auto Increment"></i>';

                        let reqs = [];
                        if(col.nn) reqs.push('NN');
                        if(col.uq) reqs.push('UQ');
                        let reqsStr = reqs.length > 0 ? `<div class="text-[10px] text-slate-400 font-normal mt-0.5">(${reqs.join(',')})</div>` : '';

                        theadHTML += `
                            <th class="px-4 py-3 font-mono">
                                <div class="flex items-center">
                                    <span class="text-slate-700 font-bold">${col.name}</span>
                                    ${icons}
                                </div>
                                <div class="text-xs text-mysql-blue font-normal mt-0.5">${col.type}</div>
                                ${reqsStr}
                            </th>
                        `;
                    });
                    theadHTML += '</tr>';
                    visualTableHead.innerHTML = theadHTML;

                    showToast(`สร้างตาราง ${tableName} สำเร็จ!`, 'success');

                }, 800);
            });

            // Initial Render
            renderColumns();

        });
    </script>

</body>
</html>
-----------------------------------------------------------------------------------------------------------------------------------
- 2.6 การกำหนดข้อมูลเริ่มต้น
<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>2.6 การกำหนดข้อมูลเริ่มต้น (DEFAULT) - SQL Course</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@300;400;500;600;700&family=Fira+Code:wght@400;500;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['"Noto Sans Thai"', 'sans-serif'],
                        mono: ['"Fira Code"', 'monospace'],
                    },
                    colors: {
                        mysql: {
                            blue: '#00758F',
                            orange: '#F29111',
                            dark: '#1e293b'
                        },
                        code: {
                            keyword: '#c678dd',
                            string: '#98c379',
                            number: '#d19a66',
                            type: '#e5c07b',
                            identifier: '#61afef',
                            comment: '#5c6370'
                        }
                    }
                }
            }
        }
    </script>
    
    <style>
        body {
            background-color: #f8fafc;
            color: #334155;
        }
        
        /* Animations */
        .pop-in { animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        @keyframes popIn {
            0% { transform: scale(0); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
        }

        @keyframes highlightRow {
            0% { background-color: rgba(16, 185, 129, 0.2); transform: scale(1.02); }
            100% { background-color: transparent; transform: scale(1); }
        }
        .new-row { animation: highlightRow 1.5s ease-out forwards; }

        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
        .float-anim { animation: float 3s ease-in-out infinite; }

        /* Code Editor Theme */
        .code-editor {
            background-color: #282c34;
            color: #abb2bf;
            font-family: 'Fira Code', monospace;
            tab-size: 4;
        }

        /* Database Table */
        .db-table { border-collapse: separate; border-spacing: 0; width: 100%; }
        .db-table th { background-color: #1e293b; color: #f1f5f9; padding: 12px 16px; font-size: 14px; border-bottom: 2px solid #0f172a; }
        .db-table td { padding: 12px 16px; border-bottom: 1px solid #e2e8f0; font-family: 'Fira Code', monospace; font-size: 14px; background: white;}
        .db-table tr:last-child td { border-bottom: none; }
        .auto-gen-text { color: #10b981; font-weight: bold; } /* Emerald */
        .null-text { color: #94a3b8; font-style: italic; }

        /* Custom Toggle Switch */
        .toggle-checkbox:checked { right: 0; border-color: #10b981; }
        .toggle-checkbox:checked + .toggle-label { background-color: #10b981; }

        /* Toast */
        #toast { visibility: hidden; opacity: 0; transition: visibility 0s, opacity 0.3s linear; }
        #toast.show { visibility: visible; opacity: 1; }
    </style>

</head>

<body class="antialiased min-h-screen flex flex-col relative">

    <header class="bg-gradient-to-r from-mysql-blue to-cyan-900 text-white shadow-lg sticky top-0 z-50">
        <div class="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
            <div class="flex items-center gap-3">
                <i class="fa-solid fa-database text-mysql-orange text-3xl"></i>
                <div>
                    <h1 class="text-xl font-bold leading-tight">SQL Course (21901-2001)</h1>
                    <p class="text-sm text-cyan-200">Unit 2: งานจัดการตาราง (Table Management)</p>
                </div>
            </div>
            <div class="hidden sm:block">
                <span class="bg-white/20 px-3 py-1 rounded-full text-sm font-medium border border-white/30 backdrop-blur-sm">
                    บทที่ 2.6 การกำหนดข้อมูลเริ่มต้น
                </span>
            </div>
        </div>
    </header>

    <main class="flex-grow max-w-5xl mx-auto px-4 py-8 w-full space-y-12">

        <section class="text-center space-y-4 max-w-3xl mx-auto">
            <h2 class="text-3xl md:text-4xl font-bold text-slate-800">1. การกำหนดข้อมูลเริ่มต้นอัตโนมัติ</h2>
            <p class="text-lg text-slate-600 leading-relaxed">
                ในการออกแบบตารางที่ดี เราสามารถลดภาระการป้อนข้อมูลได้ โดยสั่งให้ฐานข้อมูล <strong>"เติมข้อมูลให้เอง"</strong> ในคอลัมน์ที่เราไม่ได้ระบุค่ามาให้ ผ่านการใช้ <code>DEFAULT</code> และ <code>AUTO_INCREMENT</code>
            </p>
        </section>

        <section class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- AUTO_INCREMENT Card -->
            <div class="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 relative overflow-hidden group hover:shadow-md transition-shadow">
                <div class="absolute -right-6 -top-6 text-slate-100 group-hover:text-blue-50 transition-colors z-0">
                    <i class="fa-solid fa-arrow-down-1-9 text-9xl"></i>
                </div>
                <div class="relative z-10">
                    <div class="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-2xl mb-4 shadow-inner">
                        <i class="fa-solid fa-plus"></i>
                    </div>
                    <h3 class="text-xl font-bold text-slate-800 mb-2 font-mono">AUTO_INCREMENT</h3>
                    <p class="text-sm text-slate-600 mb-4">ใช้กับคอลัมน์ตัวเลข (มักเป็น Primary Key) เพื่อให้ระบบรันเลขรหัสถัดไปให้เอง โดยที่เราไม่ต้องจำว่ารหัสล่าสุดคือเลขอะไร</p>
                    <div class="bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm font-mono text-slate-600">
                        <span class="text-code-keyword">id</span> <span class="text-code-type">INT</span> <span class="text-code-keyword">AUTO_INCREMENT</span>
                    </div>
                </div>
            </div>

            <!-- DEFAULT Card -->
            <div class="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 relative overflow-hidden group hover:shadow-md transition-shadow">
                <div class="absolute -right-6 -top-6 text-slate-100 group-hover:text-emerald-50 transition-colors z-0">
                    <i class="fa-solid fa-wand-magic-sparkles text-9xl"></i>
                </div>
                <div class="relative z-10">
                    <div class="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center text-2xl mb-4 shadow-inner">
                        <i class="fa-solid fa-asterisk"></i>
                    </div>
                    <h3 class="text-xl font-bold text-slate-800 mb-2 font-mono">DEFAULT 'value'</h3>
                    <p class="text-sm text-slate-600 mb-4">หากผู้ใช้ไม่กรอกข้อมูลในคอลัมน์นี้ ระบบจะยัด "ค่าเริ่มต้น" ที่เราตั้งไว้ให้ทันที เช่น ตั้งสถานะเริ่มต้นเป็น 'รอดำเนินการ'</p>
                    <div class="bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm font-mono text-slate-600">
                        <span class="text-code-keyword">status</span> <span class="text-code-type">VARCHAR(20)</span> <span class="text-code-keyword">DEFAULT</span> <span class="text-code-string">'pending'</span>
                    </div>
                </div>
            </div>
        </section>

        <section class="bg-slate-800 rounded-3xl p-6 md:p-8 shadow-xl text-white">
            <h3 class="text-xl font-bold mb-4 flex items-center gap-2 text-cyan-300">
                <i class="fa-solid fa-code"></i> โครงสร้างการสร้างตารางคำสั่งซื้อ (Orders)
            </h3>
            <p class="text-sm text-slate-300 mb-6">ตัวอย่างนี้มีการใช้ <code>CURRENT_TIMESTAMP</code> ซึ่งเป็นฟังก์ชันพิเศษของ SQL ที่ดึงวันและเวลาปัจจุบันของเซิร์ฟเวอร์มาใส่ให้โดยอัตโนมัติ</p>

            <div class="code-editor p-5 rounded-xl text-sm leading-relaxed shadow-inner border border-slate-700 overflow-x-auto">

<pre><code><span class="syntax-keyword">CREATE TABLE</span> <span class="syntax-identifier">orders</span> <span class="syntax-punctuation">(</span>
    <span class="syntax-identifier">order_id</span> <span class="syntax-type">INT</span> <span class="syntax-keyword">PRIMARY KEY AUTO_INCREMENT</span><span class="syntax-punctuation">,</span>
    <span class="syntax-identifier">customer_name</span> <span class="syntax-type">VARCHAR(100)</span> <span class="syntax-keyword">NOT NULL</span><span class="syntax-punctuation">,</span>
    <span class="syntax-identifier">status</span> <span class="syntax-type">VARCHAR(20)</span> <span class="syntax-keyword">DEFAULT</span> <span class="syntax-string">'pending'</span><span class="syntax-punctuation">,</span> <span class="syntax-comment">-- ค่าเริ่มต้นคือ pending</span>
    <span class="syntax-identifier">order_date</span> <span class="syntax-type">DATETIME</span> <span class="syntax-keyword">DEFAULT CURRENT_TIMESTAMP</span> <span class="syntax-comment">-- ยัดเวลาปัจจุบันให้อัตโนมัติ</span>
<span class="syntax-punctuation">);</span>

<span class="syntax-comment">-- กำหนดให้ AUTO_INCREMENT เริ่มรันเลขที่ 1001 (แทนที่จะเริ่มที่ 1)</span>
<span class="syntax-keyword">ALTER TABLE</span> <span class="syntax-identifier">orders</span> <span class="syntax-keyword">AUTO_INCREMENT</span> <span class="syntax-punctuation">=</span> <span class="syntax-number">1001</span><span class="syntax-punctuation">;</span></code></pre>

            </div>
        </section>

        <section class="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm">
            <div class="flex items-center gap-3 mb-8 border-b border-slate-100 pb-4">
                <i class="fa-solid fa-cart-arrow-down text-mysql-orange text-3xl"></i>
                <div>
                    <h2 class="text-2xl font-bold text-slate-800">2. Interactive: Order System Simulator</h2>
                    <p class="text-slate-600 text-sm mt-1">ทดลองจำลองการเพิ่มข้อมูลคำสั่งซื้อ โดยกรอกแค่ชื่อลูกค้า แล้วดูความฉลาดของฐานข้อมูล</p>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">

                <!-- Left: Control Panel -->
                <div class="lg:col-span-4 space-y-6">

                    <div class="bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-inner">
                        <h4 class="font-bold text-slate-700 mb-4 border-b pb-2"><i class="fa-solid fa-keyboard mr-2"></i>ฟอร์มรับคำสั่งซื้อ</h4>

                        <div class="space-y-4">
                            <!-- Customer Name -->
                            <div>
                                <label class="block text-sm font-semibold text-slate-600 mb-1">ชื่อลูกค้า (customer_name) <span class="text-red-500">*</span></label>
                                <input type="text" id="custNameInput" class="w-full px-4 py-2 border border-slate-300 focus:border-mysql-blue focus:ring-2 focus:ring-mysql-blue/20 rounded-xl outline-none text-sm transition-all" placeholder="เช่น สมชาย ใจดี">
                            </div>

                            <!-- Override Default Toggle -->
                            <div class="bg-white p-3 rounded-xl border border-slate-200">
                                <label class="flex items-center cursor-pointer justify-between">
                                    <div class="text-sm font-semibold text-slate-600">ระบุสถานะเองหรือไม่?</div>
                                    <div class="relative">
                                        <input type="checkbox" id="overrideStatusToggle" class="sr-only">
                                        <div class="block bg-slate-200 w-10 h-6 rounded-full transition-colors toggle-bg"></div>
                                        <div class="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform"></div>
                                    </div>
                                </label>

                                <div id="statusSelectContainer" class="mt-3 hidden pop-in">
                                    <select id="statusSelect" class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:border-mysql-blue">
                                        <option value="paid">paid (จ่ายเงินแล้ว)</option>
                                        <option value="shipped">shipped (จัดส่งแล้ว)</option>
                                    </select>
                                </div>
                                <div id="statusHelpText" class="mt-2 text-xs text-slate-400 italic">
                                    * หากไม่ระบุ ฐานข้อมูลจะใช้ค่า DEFAULT ('pending')
                                </div>
                            </div>

                            <button id="insertBtn" class="w-full bg-gradient-to-r from-mysql-blue to-cyan-600 hover:from-cyan-600 hover:to-cyan-500 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center gap-2 mt-4">
                                <i class="fa-solid fa-paper-plane"></i> เพิ่มข้อมูล (INSERT)
                            </button>
                        </div>
                    </div>

                    <!-- Mini Console -->
                    <div class="bg-slate-900 rounded-xl p-4 shadow-xl border border-slate-800">
                        <div class="text-xs font-mono text-slate-400 mb-2 border-b border-slate-700 pb-1">SQL Executed:</div>
                        <div id="sqlCommandText" class="text-sm font-mono text-emerald-400 break-words min-h-[40px]">
                            <span class="text-slate-500 italic">-- รอการสั่งรัน...</span>
                        </div>
                    </div>

                </div>

                <!-- Right: Database Table Viewer -->
                <div class="lg:col-span-8 flex flex-col">
                    <div class="bg-white border border-slate-300 rounded-xl overflow-hidden shadow-lg flex-grow flex flex-col">

                        <div class="bg-slate-100 px-4 py-3 border-b border-slate-300 flex justify-between items-center">
                            <div class="font-bold text-slate-700 flex items-center gap-2">
                                <i class="fa-solid fa-table"></i> ตาราง orders
                            </div>
                            <div class="text-xs text-slate-500 font-mono">AUTO_INCREMENT = <span id="nextAiLabel" class="text-mysql-blue font-bold">1001</span></div>
                        </div>

                        <div class="overflow-x-auto flex-grow relative">
                            <table class="db-table" id="ordersTable">
                                <thead>
                                    <tr>
                                        <th>order_id <i class="fa-solid fa-key text-mysql-orange text-xs" title="PK"></i></th>
                                        <th>customer_name</th>
                                        <th>status <span class="text-[10px] text-emerald-400 font-normal ml-1 border border-emerald-400/50 px-1 rounded">DEF</span></th>
                                        <th>order_date <span class="text-[10px] text-emerald-400 font-normal ml-1 border border-emerald-400/50 px-1 rounded">DEF</span></th>
                                    </tr>
                                </thead>
                                <tbody id="tableBody">
                                    <!-- Rows injected by JS -->
                                </tbody>
                            </table>

                            <div id="emptyState" class="absolute inset-0 flex flex-col items-center justify-center bg-slate-50/80 backdrop-blur-sm z-10">
                                <i class="fa-regular fa-folder-open text-5xl text-slate-300 mb-3 float-anim"></i>
                                <p class="text-slate-500 font-medium">ตารางยังว่างเปล่า</p>
                                <p class="text-sm text-slate-400">ลองเพิ่มคำสั่งซื้อทางด้านซ้ายดูสิ!</p>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </section>

        <div class="flex justify-between items-center pt-8 border-t border-slate-200">
            <button class="text-slate-500 hover:text-mysql-blue transition-colors flex items-center gap-2" onclick="alert('ย้อนกลับไป: 2.5 การสร้างตาราง')">
                <i class="fa-solid fa-arrow-left"></i> 2.5 สร้างตาราง
            </button>
            <button class="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-emerald-600/30 flex items-center gap-2" onclick="alert('ยินดีด้วย! คุณเรียนจบหน่วยที่ 2 (การจัดการตาราง DDL) แล้ว \nพร้อมเข้าสู่หน่วยที่ 3: การจัดการข้อมูล (DML) ต่อไป')">
                จบบทเรียนหน่วยที่ 2 <i class="fa-solid fa-flag-checkered"></i>
            </button>
        </div>

    </main>

    <footer class="bg-slate-900 text-slate-400 py-6 text-center text-sm mt-auto">
        <p>© 2026 SQL Course Interactive Learning | 21901-2001</p>
    </footer>

    <!-- Custom Toast Notification -->
    <div id="toast" class="fixed bottom-5 right-5 bg-slate-800 text-white px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-3 border-l-4">
        <i id="toastIcon" class="fa-solid text-xl"></i>
        <div id="toastMsg" class="font-medium">Message</div>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', () => {

            // --- Toast Logic ---
            const toast = document.getElementById('toast');
            const toastMsg = document.getElementById('toastMsg');
            const toastIcon = document.getElementById('toastIcon');
            let toastTimeout;

            function showToast(message, type) {
                clearTimeout(toastTimeout);
                toastMsg.textContent = message;
                toast.className = 'fixed bottom-5 right-5 bg-slate-800 text-white px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-3 border-l-4';
                toastIcon.className = 'fa-solid text-xl';

                if (type === 'success') {
                    toast.classList.add('border-emerald-500');
                    toastIcon.classList.add('fa-circle-check', 'text-emerald-500');
                } else if (type === 'error') {
                    toast.classList.add('border-rose-500');
                    toastIcon.classList.add('fa-circle-xmark', 'text-rose-500');
                }

                toast.classList.add('show');
                toastTimeout = setTimeout(() => { toast.classList.remove('show'); }, 2500);
            }

            // --- Simulator State ---
            let autoIncrementId = 1001;
            let ordersData = [];

            // --- DOM Elements ---
            const custNameInput = document.getElementById('custNameInput');
            const overrideStatusToggle = document.getElementById('overrideStatusToggle');
            const statusSelectContainer = document.getElementById('statusSelectContainer');
            const statusHelpText = document.getElementById('statusHelpText');
            const statusSelect = document.getElementById('statusSelect');
            const insertBtn = document.getElementById('insertBtn');
            const sqlCommandText = document.getElementById('sqlCommandText');
            const tableBody = document.getElementById('tableBody');
            const emptyState = document.getElementById('emptyState');
            const nextAiLabel = document.getElementById('nextAiLabel');
            const dot = document.querySelector('.dot');
            const toggleBg = document.querySelector('.toggle-bg');

            // --- Toggle Animation & Logic ---
            overrideStatusToggle.addEventListener('change', (e) => {
                if (e.target.checked) {
                    dot.style.transform = 'translateX(100%)';
                    toggleBg.classList.replace('bg-slate-200', 'bg-emerald-500');
                    statusSelectContainer.classList.remove('hidden');
                    statusHelpText.classList.add('hidden');
                } else {
                    dot.style.transform = 'translateX(0)';
                    toggleBg.classList.replace('bg-emerald-500', 'bg-slate-200');
                    statusSelectContainer.classList.add('hidden');
                    statusHelpText.classList.remove('hidden');
                }
            });

            // --- Helper: Format Date for MySQL DATETIME ---
            function getMySQLDateTime() {
                const now = new Date();
                const pad = (n) => n.toString().padStart(2, '0');
                return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
            }

            // --- Insert Logic ---
            insertBtn.addEventListener('click', () => {
                const custName = custNameInput.value.trim();

                if (!custName) {
                    showToast('กรุณากรอกชื่อลูกค้าก่อนครับ', 'error');
                    custNameInput.focus();
                    return;
                }

                // Gather data
                const isStatusOverridden = overrideStatusToggle.checked;
                const statusValue = isStatusOverridden ? statusSelect.value : 'pending';
                const currentId = autoIncrementId;
                const currentTime = getMySQLDateTime();

                // Add to state
                const newOrder = {
                    id: currentId,
                    customer: custName,
                    status: statusValue,
                    date: currentTime,
                    isDefaultStatus: !isStatusOverridden
                };

                ordersData.push(newOrder);

                // Update Auto Increment
                autoIncrementId++;
                nextAiLabel.textContent = autoIncrementId;

                // Build SQL Query String for display
                let sqlStr = '';
                if (isStatusOverridden) {
                    sqlStr = `INSERT INTO orders (customer_name, status) VALUES ('${custName}', '${statusValue}');`;
                } else {
                    sqlStr = `INSERT INTO orders (customer_name) VALUES ('${custName}');`;
                }

                sqlCommandText.innerHTML = `> ${sqlStr}`;

                // Render Table
                renderTable(currentId);

                // Clear input
                custNameInput.value = '';
                custNameInput.focus();

                showToast('เพิ่มข้อมูลสำเร็จ!', 'success');
            });

            // Handle Enter key
            custNameInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    insertBtn.click();
                }
            });

            // --- Render Table Logic ---
            function renderTable(highlightId = null) {
                if (ordersData.length > 0) {
                    emptyState.classList.add('hidden');
                }

                tableBody.innerHTML = '';

                ordersData.forEach(order => {
                    const tr = document.createElement('tr');

                    // Add animation class if it's the newly added row
                    if (order.id === highlightId) {
                        tr.classList.add('new-row');
                    }

                    // Format Status Cell (Highlight if it used DEFAULT)
                    let statusHtml = `<td>${order.status}</td>`;
                    if (order.isDefaultStatus) {
                        statusHtml = `<td class="auto-gen-text" title="Generated by DEFAULT constraint">${order.status} <i class="fa-solid fa-wand-magic-sparkles text-[10px] ml-1 opacity-50"></i></td>`;
                    }

                    tr.innerHTML = `
                        <td class="font-bold text-slate-600 auto-gen-text" title="Generated by AUTO_INCREMENT">${order.id} <i class="fa-solid fa-robot text-[10px] ml-1 opacity-50"></i></td>
                        <td class="text-mysql-blue font-semibold">${order.customer}</td>
                        ${statusHtml}
                        <td class="auto-gen-text" title="Generated by DEFAULT CURRENT_TIMESTAMP">${order.date} <i class="fa-solid fa-clock text-[10px] ml-1 opacity-50"></i></td>
                    `;

                    tableBody.prepend(tr); // Add to top so newest is visible first
                });
            }

        });
    </script>

</body>
</html>
-----------------------------------------------------------------------------------------------------------------------------------
- 2.7 การเพิ่มคอลัมน์ (ADD COLUMN)
<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>2.7 การเพิ่มคอลัมน์ (ADD COLUMN) - SQL Course</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@300;400;500;600;700&family=Fira+Code:wght@400;500;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['"Noto Sans Thai"', 'sans-serif'],
                        mono: ['"Fira Code"', 'monospace'],
                    },
                    colors: {
                        mysql: {
                            blue: '#00758F',
                            orange: '#F29111',
                            dark: '#1e293b'
                        },
                        code: {
                            keyword: '#c678dd',
                            string: '#98c379',
                            number: '#d19a66',
                            type: '#e5c07b',
                            identifier: '#61afef',
                            comment: '#5c6370'
                        }
                    }
                }
            }
        }
    </script>
    
    <style>
        body {
            background-color: #f8fafc;
            color: #334155;
        }
        
        /* Animations */
        .pop-in { animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        @keyframes popIn {
            0% { transform: scale(0); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
        }

        @keyframes highlightCol {
            0% { background-color: rgba(16, 185, 129, 0.3); color: #047857; font-weight: bold; }
            100% { background-color: transparent; }
        }
        .new-col-anim { animation: highlightCol 2s ease-out forwards; }
        .new-col-header { animation: highlightCol 2s ease-out forwards; border-bottom: 3px solid #10b981 !important; }

        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
        }
        .float-anim { animation: float 3s ease-in-out infinite; }

        /* Code Editor Theme */
        .code-editor {
            background-color: #282c34;
            color: #abb2bf;
            font-family: 'Fira Code', monospace;
            tab-size: 4;
        }
        .syntax-keyword { color: #c678dd; font-weight: bold; }
        .syntax-type { color: #e5c07b; }
        .syntax-identifier { color: #e06c75; }
        .syntax-punctuation { color: #abb2bf; }
        .syntax-string { color: #98c379; }

        /* Database Table */
        .db-table { border-collapse: separate; border-spacing: 0; width: 100%; border: 1px solid #cbd5e1; border-radius: 0.5rem; overflow: hidden; }
        .db-table th { background-color: #1e293b; color: #f1f5f9; padding: 12px 16px; font-size: 14px; border-bottom: 2px solid #0f172a; border-right: 1px solid #334155; white-space: nowrap; transition: all 0.3s;}
        .db-table th:last-child { border-right: none; }
        .db-table td { padding: 12px 16px; border-bottom: 1px solid #e2e8f0; border-right: 1px solid #e2e8f0; font-family: 'Fira Code', monospace; font-size: 14px; background: white; white-space: nowrap; transition: background-color 0.5s;}
        .db-table td:last-child { border-right: none; }
        .db-table tr:last-child td { border-bottom: none; }
        .null-text { color: #94a3b8; font-style: italic; }

        /* Toast */
        #toast { visibility: hidden; opacity: 0; transition: visibility 0s, opacity 0.3s linear; }
        #toast.show { visibility: visible; opacity: 1; }
    </style>

</head>

<body class="antialiased min-h-screen flex flex-col relative">

    <header class="bg-gradient-to-r from-mysql-blue to-cyan-900 text-white shadow-lg sticky top-0 z-50">
        <div class="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
            <div class="flex items-center gap-3">
                <i class="fa-solid fa-database text-mysql-orange text-3xl"></i>
                <div>
                    <h1 class="text-xl font-bold leading-tight">SQL Course (21901-2001)</h1>
                    <p class="text-sm text-cyan-200">Unit 2: งานจัดการตาราง (Table Management)</p>
                </div>
            </div>
            <div class="hidden sm:block">
                <span class="bg-white/20 px-3 py-1 rounded-full text-sm font-medium border border-white/30 backdrop-blur-sm">
                    บทที่ 2.7 การเพิ่มคอลัมน์
                </span>
            </div>
        </div>
    </header>

    <main class="flex-grow max-w-5xl mx-auto px-4 py-8 w-full space-y-12">

        <section class="text-center space-y-4 max-w-3xl mx-auto">
            <h2 class="text-3xl md:text-4xl font-bold text-slate-800">1. แก้ไขโครงสร้างด้วย ALTER TABLE</h2>
            <p class="text-lg text-slate-600 leading-relaxed">
                บางครั้งหลังจากที่เราสร้างตาราง (CREATE TABLE) ไปแล้ว และมีข้อมูลอยู่ข้างใน เกิดเปลี่ยนใจอยาก <strong>"เพิ่มคอลัมน์ใหม่"</strong> เข้าไป เราจะไม่ลบทารางทิ้ง แต่เราจะใช้คำสั่ง <code>ALTER TABLE</code> เพื่อปรับปรุงโครงสร้างแทนครับ
            </p>
        </section>

        <section class="bg-slate-800 rounded-3xl p-6 md:p-8 shadow-xl text-white relative overflow-hidden">
            <div class="absolute -right-10 -top-10 text-slate-700/50 z-0">
                <i class="fa-solid fa-wrench text-9xl"></i>
            </div>

            <h3 class="text-xl font-bold mb-4 flex items-center gap-2 relative z-10 text-cyan-300">
                <i class="fa-solid fa-code"></i> โครงสร้างไวยากรณ์ (Syntax)
            </h3>
            <p class="text-sm text-slate-300 mb-6 relative z-10">เราสามารถระบุตำแหน่งของคอลัมน์ใหม่ได้ด้วยคำสั่งเสริม <code>AFTER</code> หรือ <code>FIRST</code></p>

            <div class="code-editor p-5 rounded-xl text-sm leading-relaxed shadow-inner border border-slate-700 overflow-x-auto relative z-10">

<pre><code><span class="syntax-comment">-- แบบปกติ (คอลัมน์ใหม่จะไปต่อท้ายสุดของตาราง)</span>
<span class="syntax-keyword">ALTER TABLE</span> <span class="syntax-identifier">table_name</span> 
<span class="syntax-keyword">ADD COLUMN</span> <span class="syntax-identifier">new_column_name</span> <span class="syntax-type">datatype</span><span class="syntax-punctuation">;</span>

<span class="syntax-comment">-- แบบระบุตำแหน่ง (แทรกคอลัมน์ไว้หลังคอลัมน์ที่กำหนด)</span>
<span class="syntax-keyword">ALTER TABLE</span> <span class="syntax-identifier">table_name</span> 
<span class="syntax-keyword">ADD COLUMN</span> <span class="syntax-identifier">new_column_name</span> <span class="syntax-type">datatype</span> <span class="syntax-keyword">AFTER</span> <span class="syntax-identifier">existing_column</span><span class="syntax-punctuation">;</span></code></pre>

            </div>
        </section>

        <section class="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm relative z-10">
            <div class="flex items-center gap-3 mb-8 border-b border-slate-100 pb-4">
                <i class="fa-solid fa-table-columns text-mysql-orange text-3xl"></i>
                <div>
                    <h2 class="text-2xl font-bold text-slate-800">2. Interactive: Alter Table Simulator</h2>
                    <p class="text-slate-600 text-sm mt-1">ทดลองเพิ่มคอลัมน์ใหม่เข้าไปในตาราง <code>employees</code> สังเกตดูว่าเกิดอะไรขึ้นกับข้อมูลเดิม!</p>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">

                <!-- Left: Control Panel -->
                <div class="lg:col-span-4 space-y-6">

                    <div class="bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-inner">
                        <h4 class="font-bold text-slate-700 mb-4 border-b pb-2"><i class="fa-solid fa-plus-square mr-2 text-emerald-500"></i>กำหนดคอลัมน์ใหม่</h4>

                        <div class="space-y-4">
                            <!-- Column Name -->
                            <div>
                                <label class="block text-sm font-semibold text-slate-600 mb-1">ชื่อคอลัมน์ (Column Name)</label>
                                <input type="text" id="colNameInput" class="w-full px-4 py-2 border border-slate-300 focus:border-mysql-blue focus:ring-2 focus:ring-mysql-blue/20 rounded-xl outline-none font-mono text-sm transition-all" placeholder="เช่น email, salary, phone">
                            </div>

                            <!-- Data Type -->
                            <div>
                                <label class="block text-sm font-semibold text-slate-600 mb-1">ประเภทข้อมูล (Data Type)</label>
                                <select id="colTypeSelect" class="w-full px-4 py-2 border border-slate-300 rounded-xl text-sm font-mono outline-none focus:border-mysql-blue focus:ring-2 focus:ring-mysql-blue/20 bg-white">
                                    <option value="VARCHAR(100)">VARCHAR(100)</option>
                                    <option value="INT">INT</option>
                                    <option value="DECIMAL(10,2)">DECIMAL(10,2)</option>
                                    <option value="DATE">DATE</option>
                                </select>
                            </div>

                            <!-- Position -->
                            <div class="p-3 bg-white border border-slate-200 rounded-xl">
                                <label class="block text-sm font-semibold text-slate-600 mb-2 border-b pb-1">ตำแหน่ง (Position)</label>
                                <div class="space-y-2 text-sm">
                                    <label class="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" name="colPosition" value="LAST" checked class="text-mysql-blue focus:ring-mysql-blue">
                                        <span>ต่อท้ายสุด (Default)</span>
                                    </label>
                                    <label class="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" name="colPosition" value="FIRST" class="text-mysql-blue focus:ring-mysql-blue">
                                        <span class="font-mono text-xs bg-slate-100 px-1 rounded">FIRST</span>
                                    </label>
                                    <label class="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" name="colPosition" value="AFTER" class="text-mysql-blue focus:ring-mysql-blue">
                                        <span class="font-mono text-xs bg-slate-100 px-1 rounded">AFTER</span>
                                        <select id="afterColSelect" class="border border-slate-300 rounded px-1 py-0.5 text-xs font-mono outline-none disabled:opacity-50" disabled>
                                            <!-- Injected by JS -->
                                        </select>
                                    </label>
                                </div>
                            </div>

                            <button id="executeBtn" class="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 mt-4">
                                <i class="fa-solid fa-play"></i> รันคำสั่ง (Execute)
                            </button>
                        </div>
                    </div>

                    <!-- Live SQL Preview -->
                    <div class="bg-[#282c34] rounded-xl p-4 shadow-xl border border-slate-800">
                        <div class="text-xs font-mono text-slate-400 mb-2 border-b border-slate-700 pb-1">SQL Preview:</div>
                        <div id="sqlPreviewText" class="text-sm font-mono text-cyan-300 break-words min-h-[40px]">
                            <!-- Injected by JS -->
                        </div>
                    </div>

                </div>

                <!-- Right: Database Table Viewer -->
                <div class="lg:col-span-8 flex flex-col gap-4">

                    <div class="bg-white border border-slate-300 rounded-xl overflow-hidden shadow-sm flex flex-col">
                        <div class="bg-slate-100 px-4 py-3 border-b border-slate-300 flex justify-between items-center">
                            <div class="font-bold text-slate-700 flex items-center gap-2">
                                <i class="fa-solid fa-table"></i> ตาราง employees
                            </div>
                            <div class="text-xs text-slate-500 bg-white px-2 py-1 rounded border border-slate-200 shadow-inner">
                                Rows: <span id="rowCountLabel" class="font-bold text-slate-700">3</span>
                            </div>
                        </div>

                        <div class="overflow-x-auto p-4 bg-slate-50 relative min-h-[250px]">
                            <table class="db-table" id="empTable">
                                <thead id="tableHead">
                                    <!-- Injected by JS -->
                                </thead>
                                <tbody id="tableBody">
                                    <!-- Injected by JS -->
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="bg-blue-50 border border-blue-200 p-4 rounded-xl text-sm text-blue-800 flex items-start gap-3">
                        <i class="fa-solid fa-lightbulb text-xl mt-0.5 text-blue-500 float-anim"></i>
                        <div>
                            <strong>รู้หรือไม่?</strong> เมื่อเราใช้คำสั่ง <code>ADD COLUMN</code> กับตารางที่มีข้อมูลอยู่แล้ว ข้อมูลในแถวเดิมทั้งหมดจะถูกกำหนดให้เป็นค่า <span class="font-mono bg-blue-100 px-1 rounded text-slate-500 italic">NULL</span> (ค่าว่าง) โดยอัตโนมัติ (ยกเว้นแต่เราจะกำหนด <code>DEFAULT</code> ไว้ด้วย)
                        </div>
                    </div>

                </div>

            </div>
        </section>

        <div class="flex justify-between items-center pt-8 border-t border-slate-200">
            <button class="text-slate-500 hover:text-mysql-blue transition-colors flex items-center gap-2" onclick="alert('ย้อนกลับไป: 2.6 การกำหนดข้อมูลเริ่มต้น')">
                <i class="fa-solid fa-arrow-left"></i> 2.6 ข้อมูลเริ่มต้น
            </button>
            <button class="bg-mysql-blue hover:bg-cyan-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-cyan-600/30 flex items-center gap-2" onclick="alert('ไปยังบทเรียน: 2.8 การแก้ไขและลบคอลัมน์')">
                ไปต่อ: 2.8 MODIFY & DROP <i class="fa-solid fa-arrow-right"></i>
            </button>
        </div>

    </main>

    <!-- Footer -->
    <footer class="bg-slate-900 text-slate-400 py-6 text-center text-sm mt-auto">
        <p>© 2026 SQL Course Interactive Learning | 21901-2001</p>
    </footer>

    <!-- Custom Toast Notification -->
    <div id="toast" class="fixed bottom-5 right-5 bg-slate-800 text-white px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-3 border-l-4">
        <i id="toastIcon" class="fa-solid text-xl"></i>
        <div id="toastMsg" class="font-medium">Message</div>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', () => {

            // --- Toast Logic ---
            const toast = document.getElementById('toast');
            const toastMsg = document.getElementById('toastMsg');
            const toastIcon = document.getElementById('toastIcon');
            let toastTimeout;

            function showToast(message, type) {
                clearTimeout(toastTimeout);
                toastMsg.textContent = message;
                toast.className = 'fixed bottom-5 right-5 bg-slate-800 text-white px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-3 border-l-4';
                toastIcon.className = 'fa-solid text-xl';

                if (type === 'success') {
                    toast.classList.add('border-emerald-500');
                    toastIcon.classList.add('fa-circle-check', 'text-emerald-500');
                } else if (type === 'error') {
                    toast.classList.add('border-rose-500');
                    toastIcon.classList.add('fa-circle-xmark', 'text-rose-500');
                }

                toast.classList.add('show');
                toastTimeout = setTimeout(() => { toast.classList.remove('show'); }, 2500);
            }

            // --- State Management ---
            // Initial columns
            let columns = [
                { id: 'c1', name: 'emp_id', type: 'INT', isPK: true },
                { id: 'c2', name: 'first_name', type: 'VARCHAR(50)', isPK: false }
            ];

            // Initial Data (Seed)
            let tableData = [
                { emp_id: 101, first_name: 'สมชาย' },
                { emp_id: 102, first_name: 'สุดา' },
                { emp_id: 103, first_name: 'มานะ' }
            ];

            let highlightedColName = null; // To trigger animation on render

            // --- DOM Elements ---
            const colNameInput = document.getElementById('colNameInput');
            const colTypeSelect = document.getElementById('colTypeSelect');
            const positionRadios = document.getElementsByName('colPosition');
            const afterColSelect = document.getElementById('afterColSelect');
            const executeBtn = document.getElementById('executeBtn');
            const sqlPreviewText = document.getElementById('sqlPreviewText');
            const tableHead = document.getElementById('tableHead');
            const tableBody = document.getElementById('tableBody');

            // --- STREAMING_CHUNK:UI Update Functions... ---

            // 1. Render After Dropdown
            function updateAfterDropdown() {
                afterColSelect.innerHTML = '';
                columns.forEach(col => {
                    const opt = document.createElement('option');
                    opt.value = col.name;
                    opt.textContent = col.name;
                    afterColSelect.appendChild(opt);
                });

                // Set default to last item
                if (columns.length > 0) {
                    afterColSelect.value = columns[columns.length - 1].name;
                }
            }

            // 2. Handle Radio Buttons for Position
            function handlePositionChange() {
                let selectedVal = 'LAST';
                positionRadios.forEach(r => { if(r.checked) selectedVal = r.value; });

                if (selectedVal === 'AFTER') {
                    afterColSelect.disabled = false;
                } else {
                    afterColSelect.disabled = true;
                }
                updateSqlPreview();
            }

            positionRadios.forEach(r => r.addEventListener('change', handlePositionChange));
            afterColSelect.addEventListener('change', updateSqlPreview);

            // 3. Render the Live Table
            function renderTable() {
                // Header
                let thHtml = '<tr>';
                columns.forEach(col => {
                    const animClass = (col.name === highlightedColName) ? 'new-col-header' : '';
                    const pkIcon = col.isPK ? '<i class="fa-solid fa-key text-mysql-orange text-[10px] ml-1" title="PK"></i>' : '';
                    thHtml += `<th class="${animClass}">${col.name} <span class="text-[10px] text-slate-400 font-normal ml-1">${col.type}</span>${pkIcon}</th>`;
                });
                thHtml += '</tr>';
                tableHead.innerHTML = thHtml;

                // Body
                let tbHtml = '';
                tableData.forEach(row => {
                    tbHtml += '<tr>';
                    columns.forEach(col => {
                        const cellVal = row[col.name];
                        const animClass = (col.name === highlightedColName) ? 'new-col-anim' : '';

                        if (cellVal === undefined || cellVal === null) {
                            tbHtml += `<td class="${animClass}"><span class="null-text">NULL</span></td>`;
                        } else {
                            // Style PK differently just for visual
                            const fontStyle = col.isPK ? 'font-bold text-slate-600' : 'text-mysql-blue';
                            tbHtml += `<td class="${animClass} ${fontStyle}">${cellVal}</td>`;
                        }
                    });
                    tbHtml += '</tr>';
                });
                tableBody.innerHTML = tbHtml;
            }

            // 4. Update SQL Preview String
            function updateSqlPreview() {
                const rawName = colNameInput.value.trim() || 'new_column';
                const safeName = rawName.replace(/[^a-zA-Z0-9_]/g, ''); // Simple sanitize for display
                const type = colTypeSelect.value;

                let selectedPos = 'LAST';
                positionRadios.forEach(r => { if(r.checked) selectedPos = r.value; });

                let sql = `ALTER TABLE employees\nADD COLUMN ${safeName} ${type}`;

                if (selectedPos === 'FIRST') {
                    sql += ' FIRST;';
                } else if (selectedPos === 'AFTER') {
                    sql += ` AFTER ${afterColSelect.value};`;
                } else {
                    sql += ';';
                }

                // Simple syntax highlighting
                const highlighted = sql
                    .replace(/ALTER TABLE/g, '<span class="syntax-keyword">ALTER TABLE</span>')
                    .replace(/ADD COLUMN/g, '<span class="syntax-keyword">ADD COLUMN</span>')
                    .replace(/FIRST/g, '<span class="syntax-keyword">FIRST</span>')
                    .replace(/AFTER/g, '<span class="syntax-keyword">AFTER</span>')
                    .replace(/INT|VARCHAR\(\d+\)|DECIMAL\(\d+,\d+\)|DATE/g, '<span class="syntax-type">$&</span>')
                    .replace(/employees/g, '<span class="syntax-identifier">employees</span>');

                sqlPreviewText.innerHTML = highlighted.replace(/\n/g, '<br>');
            }

            // --- STREAMING_CHUNK:Execution Logic... ---

            // Inputs change listeners for live preview
            colNameInput.addEventListener('input', updateSqlPreview);
            colTypeSelect.addEventListener('change', updateSqlPreview);

            // Execute Button Click
            executeBtn.addEventListener('click', () => {
                const rawName = colNameInput.value.trim();

                // Validation
                if (!rawName) {
                    showToast('กรุณากรอกชื่อคอลัมน์', 'error');
                    colNameInput.focus();
                    return;
                }

                // Sanitize name (basic letters, numbers, underscore)
                const safeName = rawName.replace(/[^a-zA-Z0-9_]/g, '');
                if (safeName !== rawName || safeName === '') {
                    showToast('ชื่อคอลัมน์ควรใช้ภาษาอังกฤษ ตัวเลข และ _ เท่านั้น', 'error');
                    return;
                }

                // Check for duplicates
                if (columns.some(c => c.name.toLowerCase() === safeName.toLowerCase())) {
                    showToast(`คอลัมน์ '${safeName}' มีอยู่แล้ว!`, 'error');
                    return;
                }

                // Determine insertion index
                let selectedPos = 'LAST';
                positionRadios.forEach(r => { if(r.checked) selectedPos = r.value; });

                let insertIndex = columns.length; // Default LAST

                if (selectedPos === 'FIRST') {
                    insertIndex = 0;
                } else if (selectedPos === 'AFTER') {
                    const afterName = afterColSelect.value;
                    const foundIndex = columns.findIndex(c => c.name === afterName);
                    if (foundIndex !== -1) {
                        insertIndex = foundIndex + 1;
                    }
                }

                // Create new column object
                const newColObj = {
                    id: 'c_' + Date.now(),
                    name: safeName,
                    type: colTypeSelect.value,
                    isPK: false
                };

                // Insert into columns array
                columns.splice(insertIndex, 0, newColObj);

                // Note: We DO NOT add data to `tableData`.
                // The render function handles undefined properties by showing NULL.
                // This perfectly mimics database behavior!

                // Trigger UI Updates
                highlightedColName = safeName;
                renderTable();
                updateAfterDropdown();

                // Reset Form
                colNameInput.value = '';
                positionRadios[0].checked = true; // reset to LAST
                handlePositionChange();

                showToast(`เพิ่มคอลัมน์ ${safeName} สำเร็จ!`, 'success');

                // Clear highlight flag after animation completes
                setTimeout(() => {
                    highlightedColName = null;
                }, 2000);
            });

            // Allow Enter key to submit
            colNameInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    executeBtn.click();
                }
            });

            // --- Initialization ---
            updateAfterDropdown();
            handlePositionChange(); // triggers updateSqlPreview
            renderTable();

        });
    </script>

</body>
</html>
-----------------------------------------------------------------------------------------------------------------------------------
- 2.8 การแก้ไขคอลัมน์ (MODIFY COLUMN)
<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>2.8 การแก้ไขคอลัมน์ (MODIFY COLUMN) - SQL Course</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@300;400;500;600;700&family=Fira+Code:wght@400;500;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['"Noto Sans Thai"', 'sans-serif'],
                        mono: ['"Fira Code"', 'monospace'],
                    },
                    colors: {
                        mysql: {
                            blue: '#00758F',
                            orange: '#F29111',
                            dark: '#1e293b'
                        },
                        code: {
                            keyword: '#c678dd',
                            string: '#98c379',
                            number: '#d19a66',
                            type: '#e5c07b',
                            identifier: '#61afef',
                            comment: '#5c6370',
                            error: '#f43f5e'
                        }
                    }
                }
            }
        }
    </script>
    
    <style>
        body {
            background-color: #f8fafc;
            color: #334155;
        }
        
        /* Animations */
        .pop-in { animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        @keyframes popIn {
            0% { transform: scale(0); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
        }

        @keyframes highlightColModify {
            0% { background-color: rgba(245, 158, 11, 0.3); color: #b45309; font-weight: bold; }
            100% { background-color: transparent; }
        }
        .modify-col-anim { animation: highlightColModify 2s ease-out forwards; }
        .modify-col-header { animation: highlightColModify 2s ease-out forwards; border-bottom: 3px solid #f59e0b !important; }

        @keyframes shakeError {
            0%, 100% { transform: translateX(0); }
            20%, 60% { transform: translateX(-5px); }
            40%, 80% { transform: translateX(5px); }
        }
        .shake-error { animation: shakeError 0.5s ease-in-out; border-color: #f43f5e !important; box-shadow: 0 0 0 2px rgba(244, 63, 94, 0.2) !important; }

        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
        }
        .float-anim { animation: float 3s ease-in-out infinite; }

        /* Code Editor Theme */
        .code-editor {
            background-color: #282c34;
            color: #abb2bf;
            font-family: 'Fira Code', monospace;
            tab-size: 4;
        }

        /* Database Table */
        .db-table { border-collapse: separate; border-spacing: 0; width: 100%; border: 1px solid #cbd5e1; border-radius: 0.5rem; overflow: hidden; }
        .db-table th { background-color: #1e293b; color: #f1f5f9; padding: 12px 16px; font-size: 14px; border-bottom: 2px solid #0f172a; border-right: 1px solid #334155; white-space: nowrap; transition: all 0.5s ease;}
        .db-table th:last-child { border-right: none; }
        .db-table td { padding: 12px 16px; border-bottom: 1px solid #e2e8f0; border-right: 1px solid #e2e8f0; font-family: 'Fira Code', monospace; font-size: 14px; background: white; white-space: nowrap; transition: background-color 0.5s ease, color 0.5s ease;}
        .db-table td:last-child { border-right: none; }
        .db-table tr:last-child td { border-bottom: none; }
        .null-text { color: #94a3b8; font-style: italic; }

        .type-badge { font-size: 10px; padding: 2px 6px; border-radius: 4px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); margin-left: 6px; font-weight: normal;}

        /* Custom Toggle Switch */
        .toggle-checkbox:checked { right: 0; border-color: #10b981; }
        .toggle-checkbox:checked + .toggle-label { background-color: #10b981; }

        /* Toast */
        #toast { visibility: hidden; opacity: 0; transition: visibility 0s, opacity 0.3s linear; }
        #toast.show { visibility: visible; opacity: 1; }
    </style>

</head>

<body class="antialiased min-h-screen flex flex-col relative">

    <header class="bg-gradient-to-r from-mysql-blue to-cyan-900 text-white shadow-lg sticky top-0 z-50">
        <div class="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
            <div class="flex items-center gap-3">
                <i class="fa-solid fa-database text-mysql-orange text-3xl"></i>
                <div>
                    <h1 class="text-xl font-bold leading-tight">SQL Course (21901-2001)</h1>
                    <p class="text-sm text-cyan-200">Unit 2: งานจัดการตาราง (Table Management)</p>
                </div>
            </div>
            <div class="hidden sm:block">
                <span class="bg-white/20 px-3 py-1 rounded-full text-sm font-medium border border-white/30 backdrop-blur-sm">
                    บทที่ 2.8 การแก้ไขคอลัมน์
                </span>
            </div>
        </div>
    </header>

    <main class="flex-grow max-w-5xl mx-auto px-4 py-8 w-full space-y-12">

        <section class="text-center space-y-4 max-w-3xl mx-auto">
            <h2 class="text-3xl md:text-4xl font-bold text-slate-800">1. การแก้ไขคุณสมบัติคอลัมน์ (MODIFY)</h2>
            <p class="text-lg text-slate-600 leading-relaxed">
                ในกรณีที่เราสร้างคอลัมน์ไปแล้ว แต่ต้องการ <strong>"เปลี่ยนประเภทข้อมูล"</strong> (เช่น จากขนาดเล็กเป็นขนาดใหญ่) หรือ <strong>"เพิ่ม/ลด กฎข้อบังคับ"</strong> (เช่น เพิ่ม NOT NULL) เราจะใช้คำสั่ง <code>ALTER TABLE ... MODIFY COLUMN</code> ครับ
            </p>
        </section>

        <section class="bg-slate-800 rounded-3xl p-6 md:p-8 shadow-xl text-white relative overflow-hidden">
            <div class="absolute -right-6 -top-6 text-slate-700/50 z-0">
                <i class="fa-solid fa-pen-to-square text-9xl"></i>
            </div>

            <h3 class="text-xl font-bold mb-4 flex items-center gap-2 relative z-10 text-cyan-300">
                <i class="fa-solid fa-code"></i> โครงสร้างไวยากรณ์ (Syntax)
            </h3>

            <div class="code-editor p-5 rounded-xl text-sm leading-relaxed shadow-inner border border-slate-700 overflow-x-auto relative z-10">

<pre><code><span class="syntax-comment">-- โครงสร้างพื้นฐาน</span>
<span class="syntax-keyword">ALTER TABLE</span> <span class="syntax-identifier">table_name</span> 
<span class="syntax-keyword">MODIFY COLUMN</span> <span class="syntax-identifier">column_name</span> <span class="syntax-type">new_datatype</span> <span class="syntax-keyword">[new_constraints]</span><span class="syntax-punctuation">;</span>

<span class="syntax-comment">-- ตัวอย่าง: ขยายขนาด VARCHAR จากเดิมอาจจะแค่ 50 เป็น 150</span>
<span class="syntax-keyword">ALTER TABLE</span> <span class="syntax-identifier">products</span> <span class="syntax-keyword">MODIFY COLUMN</span> <span class="syntax-identifier">prod_name</span> <span class="syntax-type">VARCHAR(150)</span><span class="syntax-punctuation">;</span>

<span class="syntax-comment">-- ตัวอย่าง: บังคับให้คอลัมน์เดิม ห้ามเป็นค่าว่าง (NOT NULL)</span>
<span class="syntax-keyword">ALTER TABLE</span> <span class="syntax-identifier">products</span> <span class="syntax-keyword">MODIFY COLUMN</span> <span class="syntax-identifier">price</span> <span class="syntax-type">DECIMAL(10,2)</span> <span class="syntax-keyword">NOT NULL</span><span class="syntax-punctuation">;</span></code></pre>

            </div>

            <div class="mt-5 bg-amber-500/10 border border-amber-500/30 p-4 rounded-xl flex gap-3 relative z-10">
                <i class="fa-solid fa-triangle-exclamation text-amber-500 text-xl mt-0.5"></i>
                <div class="text-sm text-amber-200">
                    <strong class="text-amber-400">ข้อควรระวัง!</strong> หากตารางมีข้อมูลอยู่แล้ว การลดขนาดข้อมูล (เช่น จาก VARCHAR(100) เหลือ VARCHAR(10)) อาจทำให้ข้อมูลสูญหาย (Data Truncation) หรือการสั่ง NOT NULL กับคอลัมน์ที่มีค่าว่างอยู่แล้ว จะทำให้เกิด <strong>Error</strong> ได้ครับ
                </div>
            </div>
        </section>

        <section class="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm relative z-10">
            <div class="flex items-center gap-3 mb-8 border-b border-slate-100 pb-4">
                <i class="fa-solid fa-wand-magic-sparkles text-mysql-orange text-3xl"></i>
                <div>
                    <h2 class="text-2xl font-bold text-slate-800">2. Interactive: MODIFY Column Simulator</h2>
                    <p class="text-slate-600 text-sm mt-1">ตาราง <code>products</code> ด้านล่างมีข้อมูลอยู่แล้ว ลองปรับแก้คุณสมบัติของคอลัมน์ต่างๆ เพื่อดูว่าฐานข้อมูลจะยอมหรือไม่!</p>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">

                <!-- Left: Control Panel -->
                <div class="lg:col-span-4 space-y-6">

                    <div class="bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-inner">
                        <h4 class="font-bold text-slate-700 mb-4 border-b pb-2"><i class="fa-solid fa-sliders mr-2 text-amber-500"></i>ตั้งค่าการแก้ไข</h4>

                        <div class="space-y-4">
                            <!-- Select Column -->
                            <div>
                                <label class="block text-sm font-semibold text-slate-600 mb-1">เลือกคอลัมน์ที่ต้องการแก้</label>
                                <select id="colSelect" class="w-full px-4 py-2 border border-slate-300 rounded-xl text-sm font-mono outline-none focus:border-mysql-blue focus:ring-2 focus:ring-mysql-blue/20 bg-white">
                                    <!-- Injected by JS -->
                                </select>
                            </div>

                            <!-- Current Info Box -->
                            <div class="bg-slate-100 p-3 rounded-lg border border-slate-200 text-xs font-mono text-slate-500 flex justify-between items-center" id="currentInfoBox">
                                <span>เดิม: <span id="currentTypeLbl" class="text-slate-700 font-bold">VARCHAR(50)</span></span>
                                <span id="currentNnLbl" class="text-slate-700 font-bold"></span>
                            </div>

                            <hr class="border-slate-200">

                            <!-- New Data Type -->
                            <div>
                                <label class="block text-sm font-semibold text-slate-600 mb-1">เปลี่ยนเป็น (New Data Type)</label>
                                <select id="newTypeSelect" class="w-full px-4 py-2 border border-slate-300 rounded-xl text-sm font-mono outline-none focus:border-mysql-blue focus:ring-2 focus:ring-mysql-blue/20 bg-white">
                                    <option value="INT">INT</option>
                                    <option value="VARCHAR(10)">VARCHAR(10)</option>
                                    <option value="VARCHAR(50)">VARCHAR(50)</option>
                                    <option value="VARCHAR(255)">VARCHAR(255)</option>
                                    <option value="DECIMAL(10,2)">DECIMAL(10,2)</option>
                                </select>
                            </div>

                            <!-- Constraint Toggle -->
                            <div class="bg-white p-3 rounded-xl border border-slate-200 flex justify-between items-center">
                                <label class="text-sm font-semibold text-slate-600">ห้ามเป็นค่าว่าง (NOT NULL)</label>
                                <div class="relative cursor-pointer" id="nnToggleContainer">
                                    <input type="checkbox" id="nnToggle" class="sr-only">
                                    <div class="block bg-slate-200 w-10 h-6 rounded-full transition-colors toggle-bg border border-slate-300"></div>
                                    <div class="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform shadow-sm"></div>
                                </div>
                            </div>

                            <button id="executeBtn" class="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 mt-4">
                                <i class="fa-solid fa-play"></i> สั่งทำงาน (Execute)
                            </button>
                        </div>
                    </div>

                    <!-- Live SQL Preview -->
                    <div class="bg-[#282c34] rounded-xl p-4 shadow-xl border border-slate-800" id="previewBox">
                        <div class="text-xs font-mono text-slate-400 mb-2 border-b border-slate-700 pb-1 flex justify-between">
                            <span>SQL Preview:</span>
                        </div>
                        <div id="sqlPreviewText" class="text-sm font-mono text-cyan-300 break-words min-h-[40px]">
                            <!-- Injected by JS -->
                        </div>
                        <div id="errorPreviewText" class="hidden text-sm font-mono text-rose-400 break-words mt-3 pt-3 border-t border-slate-700 border-dashed">
                            <!-- Error injected here -->
                        </div>
                    </div>

                </div>

                <!-- Right: Database Table Viewer -->
                <div class="lg:col-span-8 flex flex-col gap-4">

                    <div class="bg-white border border-slate-300 rounded-xl overflow-hidden shadow-sm flex flex-col h-full">
                        <div class="bg-slate-100 px-4 py-3 border-b border-slate-300 flex justify-between items-center">
                            <div class="font-bold text-slate-700 flex items-center gap-2">
                                <i class="fa-solid fa-box-open"></i> ตาราง products
                            </div>
                        </div>

                        <div class="overflow-x-auto p-4 bg-slate-50 relative flex-grow">
                            <table class="db-table" id="productTable">
                                <thead id="tableHead">
                                    <!-- Injected by JS -->
                                </thead>
                                <tbody id="tableBody">
                                    <!-- Injected by JS -->
                                </tbody>
                            </table>

                            <!-- Tips overlay -->
                            <div class="absolute bottom-4 right-4 bg-blue-50 border border-blue-200 p-3 rounded-lg text-xs text-blue-800 flex items-start gap-2 shadow-sm max-w-xs opacity-80 hover:opacity-100 transition-opacity">
                                <i class="fa-solid fa-circle-info text-blue-500 mt-0.5"></i>
                                <div>
                                    ลองลดขนาด <strong>description</strong> เป็น VARCHAR(10) หรือตั้ง <strong>category</strong> ให้เป็น NOT NULL ดูสิครับ
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </section>

        <div class="flex justify-between items-center pt-8 border-t border-slate-200">
            <button class="text-slate-500 hover:text-mysql-blue transition-colors flex items-center gap-2" onclick="alert('ย้อนกลับไป: 2.7 การเพิ่มคอลัมน์')">
                <i class="fa-solid fa-arrow-left"></i> 2.7 เพิ่มคอลัมน์
            </button>
            <button class="bg-mysql-blue hover:bg-cyan-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-cyan-600/30 flex items-center gap-2" onclick="alert('ไปยังบทเรียน: 2.9 การลบคอลัมน์และตาราง (DROP)')">
                ไปต่อ: 2.9 DROP <i class="fa-solid fa-arrow-right"></i>
            </button>
        </div>

    </main>

    <!-- Custom Toast Notification -->
    <div id="toast" class="fixed bottom-5 right-5 bg-slate-800 text-white px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-3 border-l-4">
        <i id="toastIcon" class="fa-solid text-xl"></i>
        <div id="toastMsg" class="font-medium">Message</div>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', () => {

            // --- Toast Logic ---
            const toast = document.getElementById('toast');
            const toastMsg = document.getElementById('toastMsg');
            const toastIcon = document.getElementById('toastIcon');
            let toastTimeout;

            function showToast(message, type) {
                clearTimeout(toastTimeout);
                toastMsg.textContent = message;
                toast.className = 'fixed bottom-5 right-5 bg-slate-800 text-white px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-3 border-l-4';
                toastIcon.className = 'fa-solid text-xl';

                if (type === 'success') {
                    toast.classList.add('border-emerald-500');
                    toastIcon.classList.add('fa-circle-check', 'text-emerald-500');
                } else if (type === 'error') {
                    toast.classList.add('border-rose-500');
                    toastIcon.classList.add('fa-circle-xmark', 'text-rose-500');
                }

                toast.classList.add('show');
                toastTimeout = setTimeout(() => { toast.classList.remove('show'); }, 3000);
            }

            // --- STREAMING_CHUNK:State Management... ---
            // Table Schema State
            let columns = [
                { name: 'prod_id', type: 'INT', notNull: true, isPK: true },
                { name: 'prod_name', type: 'VARCHAR(50)', notNull: true, isPK: false },
                { name: 'category', type: 'VARCHAR(50)', notNull: false, isPK: false },
                { name: 'description', type: 'VARCHAR(255)', notNull: false, isPK: false }
            ];

            // Table Data State
            let tableData = [
                { prod_id: 1, prod_name: 'Gaming Mouse', category: 'Accessories', description: 'Wireless RGB Mouse' },
                { prod_id: 2, prod_name: 'Mechanical Keyboard', category: null, description: 'Blue Switch 104 Keys' }, // Null category to test NOT NULL
                { prod_id: 3, prod_name: 'Monitor 24"', category: 'Display', description: '144Hz IPS Panel' }
            ];

            let highlightedColName = null;

            // DOM Elements
            const colSelect = document.getElementById('colSelect');
            const newTypeSelect = document.getElementById('newTypeSelect');
            const nnToggle = document.getElementById('nnToggle');
            const nnToggleContainer = document.getElementById('nnToggleContainer');
            const toggleDot = document.querySelector('.dot');
            const toggleBg = document.querySelector('.toggle-bg');
            const executeBtn = document.getElementById('executeBtn');
            const sqlPreviewText = document.getElementById('sqlPreviewText');
            const errorPreviewText = document.getElementById('errorPreviewText');
            const previewBox = document.getElementById('previewBox');

            const currentTypeLbl = document.getElementById('currentTypeLbl');
            const currentNnLbl = document.getElementById('currentNnLbl');

            const tableHead = document.getElementById('tableHead');
            const tableBody = document.getElementById('tableBody');

            // --- STREAMING_CHUNK:UI Functions... ---

            function renderTable() {
                // Render Header
                let thHtml = '<tr>';
                columns.forEach(col => {
                    const animClass = (col.name === highlightedColName) ? 'modify-col-header' : '';
                    const pkIcon = col.isPK ? '<i class="fa-solid fa-key text-mysql-orange ml-1" title="PK"></i>' : '';
                    const reqStr = col.notNull ? '<span class="text-rose-400 font-normal ml-1" title="NOT NULL">NN</span>' : '';

                    thHtml += `<th class="${animClass}">
                        ${col.name} ${pkIcon}
                        <span class="type-badge">${col.type}</span>
                        <span class="text-[10px]">${reqStr}</span>
                    </th>`;
                });
                thHtml += '</tr>';
                tableHead.innerHTML = thHtml;

                // Render Body
                let tbHtml = '';
                tableData.forEach(row => {
                    tbHtml += '<tr>';
                    columns.forEach(col => {
                        const cellVal = row[col.name];
                        const animClass = (col.name === highlightedColName) ? 'modify-col-anim' : '';

                        if (cellVal === null || cellVal === undefined) {
                            tbHtml += `<td class="${animClass}"><span class="null-text">NULL</span></td>`;
                        } else {
                            const fontStyle = col.isPK ? 'font-bold text-slate-600' : 'text-mysql-blue';
                            tbHtml += `<td class="${animClass} ${fontStyle}">${cellVal}</td>`;
                        }
                    });
                    tbHtml += '</tr>';
                });
                tableBody.innerHTML = tbHtml;
            }

            function updateColSelectDropdown() {
                colSelect.innerHTML = '';
                columns.forEach(col => {
                    // Prevent modifying PK for simplicity in this lesson
                    if(!col.isPK) {
                        const opt = document.createElement('option');
                        opt.value = col.name;
                        opt.textContent = col.name;
                        colSelect.appendChild(opt);
                    }
                });
            }

            function loadCurrentColInfo() {
                const selectedColName = colSelect.value;
                const col = columns.find(c => c.name === selectedColName);

                if (col) {
                    currentTypeLbl.textContent = col.type;
                    currentNnLbl.innerHTML = col.notNull ? '<span class="text-rose-500">NOT NULL</span>' : '<span class="text-slate-400">NULL (อนุญาตค่าว่าง)</span>';

                    // Set form to current values
                    newTypeSelect.value = col.type;
                    // If type is not in dropdown (fallback), select first
                    if(newTypeSelect.selectedIndex === -1) newTypeSelect.selectedIndex = 1;

                    setToggle(col.notNull);
                }
                updateSqlPreview();
            }

            // --- Toggle Logic ---
            function setToggle(isChecked) {
                nnToggle.checked = isChecked;
                if (isChecked) {
                    toggleDot.style.transform = 'translateX(100%)';
                    toggleBg.style.backgroundColor = '#10b981'; // emerald
                    toggleBg.style.borderColor = '#10b981';
                } else {
                    toggleDot.style.transform = 'translateX(0)';
                    toggleBg.style.backgroundColor = '#e2e8f0'; // slate-200
                    toggleBg.style.borderColor = '#cbd5e1';
                }
            }

            nnToggleContainer.addEventListener('click', (e) => {
                e.preventDefault();
                setToggle(!nnToggle.checked);
                updateSqlPreview();
            });

            // --- STREAMING_CHUNK:Preview & Validation Logic... ---

            function updateSqlPreview() {
                errorPreviewText.classList.add('hidden');
                previewBox.classList.remove('shake-error');

                const colName = colSelect.value;
                const newType = newTypeSelect.value;
                const isNotNull = nnToggle.checked;

                let sql = `ALTER TABLE products\nMODIFY COLUMN ${colName} ${newType}`;
                if (isNotNull) {
                    sql += ' NOT NULL;';
                } else {
                    sql += ';';
                }

                // Highlighting
                const highlighted = sql
                    .replace(/ALTER TABLE/g, '<span class="syntax-keyword">ALTER TABLE</span>')
                    .replace(/MODIFY COLUMN/g, '<span class="syntax-keyword">MODIFY COLUMN</span>')
                    .replace(/NOT NULL/g, '<span class="syntax-keyword">NOT NULL</span>')
                    .replace(/INT|VARCHAR\(\d+\)|DECIMAL\(\d+,\d+\)/g, '<span class="syntax-type">$&</span>')
                    .replace(/products/g, '<span class="syntax-identifier">products</span>');

                sqlPreviewText.innerHTML = highlighted.replace(/\n/g, '<br>');
            }

            // Listeners for updates
            colSelect.addEventListener('change', loadCurrentColInfo);
            newTypeSelect.addEventListener('change', updateSqlPreview);

            function extractVarcharLen(typeStr) {
                const match = typeStr.match(/VARCHAR\((\d+)\)/);
                return match ? parseInt(match[1]) : 0;
            }

            // Execute Logic
            executeBtn.addEventListener('click', () => {
                const colName = colSelect.value;
                const newType = newTypeSelect.value;
                const isNotNull = nnToggle.checked;

                const colObj = columns.find(c => c.name === colName);

                // 1. Validation: Data Truncation (e.g. VARCHAR(255) -> VARCHAR(10))
                if (newType.startsWith('VARCHAR') && colObj.type.startsWith('VARCHAR')) {
                    const newLen = extractVarcharLen(newType);

                    // Check actual data lengths
                    for (let row of tableData) {
                        const val = row[colName];
                        if (val && typeof val === 'string' && val.length > newLen) {
                            showError(`Data Truncation: ข้อมูล "${val}" (ยาว ${val.length} ตัวอักษร) จะถูกตัดทิ้ง เพราะคอลัมน์ใหม่รับได้แค่ ${newLen} ตัวอักษร`);
                            return;
                        }
                    }
                }

                // Type mismatch validation (simple simulation)
                if (newType === 'INT') {
                    for (let row of tableData) {
                        const val = row[colName];
                        if (val !== null && isNaN(parseInt(val))) {
                            showError(`Type Mismatch: ไม่สามารถเปลี่ยนข้อความ "${val}" ให้เป็นตัวเลข (INT) ได้`);
                            return;
                        }
                    }
                }

                // 2. Validation: NOT NULL constraint violation
                if (isNotNull) {
                    for (let row of tableData) {
                        if (row[colName] === null) {
                            showError(`Constraint Violation: มีข้อมูลที่เป็นค่าว่าง (NULL) อยู่ในแถวรหัส ${row.prod_id} จึงไม่สามารถตั้งค่า NOT NULL ได้`);
                            return;
                        }
                    }
                }

                // Success: Update Schema
                colObj.type = newType;
                colObj.notNull = isNotNull;

                // Trigger UI
                highlightedColName = colName;
                renderTable();
                loadCurrentColInfo(); // update left panel text

                showToast(`แก้ไขคอลัมน์ ${colName} สำเร็จ!`, 'success');

                setTimeout(() => {
                    highlightedColName = null;
                }, 2000);
            });

            function showError(msg) {
                previewBox.classList.add('shake-error');
                errorPreviewText.innerHTML = `<i class="fa-solid fa-triangle-exclamation mr-1"></i> ${msg}`;
                errorPreviewText.classList.remove('hidden');
                showToast('เกิดข้อผิดพลาดจากฐานข้อมูล', 'error');

                setTimeout(() => {
                    previewBox.classList.remove('shake-error');
                }, 500);
            }

            // --- Initialize ---
            updateColSelectDropdown();
            loadCurrentColInfo();
            renderTable();
        });
    </script>

</body>
</html>
-----------------------------------------------------------------------------------------------------------------------------------
- 2.9 การเปลี่ยนชื่อคอลัมน์ (RENAME)
<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>2.9 การเปลี่ยนชื่อคอลัมน์ (RENAME COLUMN) - SQL Course</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@300;400;500;600;700&family=Fira+Code:wght@400;500;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['"Noto Sans Thai"', 'sans-serif'],
                        mono: ['"Fira Code"', 'monospace'],
                    },
                    colors: {
                        mysql: {
                            blue: '#00758F',
                            orange: '#F29111',
                            dark: '#1e293b'
                        },
                        code: {
                            keyword: '#c678dd',
                            string: '#98c379',
                            number: '#d19a66',
                            type: '#e5c07b',
                            identifier: '#61afef',
                            comment: '#5c6370',
                            error: '#f43f5e'
                        }
                    }
                }
            }
        }
    </script>
    
    <style>
        body {
            background-color: #f8fafc;
            color: #334155;
        }
        
        /* Animations */
        .pop-in { animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        @keyframes popIn {
            0% { transform: scale(0); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
        }

        @keyframes highlightRename {
            0% { background-color: rgba(56, 189, 248, 0.4); color: #0369a1; transform: scale(1.05); }
            50% { background-color: rgba(56, 189, 248, 0.2); transform: scale(1.02); }
            100% { background-color: transparent; transform: scale(1); }
        }
        .rename-anim-header { animation: highlightRename 1.5s ease-out forwards; border-bottom: 3px solid #38bdf8 !important; }

        @keyframes shakeError {
            0%, 100% { transform: translateX(0); }
            20%, 60% { transform: translateX(-5px); }
            40%, 80% { transform: translateX(5px); }
        }
        .shake-error { animation: shakeError 0.4s ease-in-out; border-color: #f43f5e !important; box-shadow: 0 0 0 2px rgba(244, 63, 94, 0.2) !important; }

        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
        }
        .float-anim { animation: float 3s ease-in-out infinite; }

        /* Code Editor Theme */
        .code-editor {
            background-color: #282c34;
            color: #abb2bf;
            font-family: 'Fira Code', monospace;
            tab-size: 4;
        }

        /* Database Table */
        .db-table { border-collapse: separate; border-spacing: 0; width: 100%; border: 1px solid #cbd5e1; border-radius: 0.5rem; overflow: hidden; }
        .db-table th { background-color: #1e293b; color: #f1f5f9; padding: 12px 16px; font-size: 14px; border-bottom: 2px solid #0f172a; border-right: 1px solid #334155; white-space: nowrap; transition: all 0.3s ease;}
        .db-table th:last-child { border-right: none; }
        .db-table td { padding: 12px 16px; border-bottom: 1px solid #e2e8f0; border-right: 1px solid #e2e8f0; font-family: 'Fira Code', monospace; font-size: 14px; background: white; white-space: nowrap; color: #475569;}
        .db-table td:last-child { border-right: none; }
        .db-table tr:last-child td { border-bottom: none; }

        .type-badge { font-size: 10px; padding: 2px 6px; border-radius: 4px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); margin-left: 6px; font-weight: normal; color: #cbd5e1;}
        .old-name-strike { text-decoration: line-through; opacity: 0.5; font-size: 0.8em; margin-right: 8px; }

        /* Toast */
        #toast { visibility: hidden; opacity: 0; transition: visibility 0s, opacity 0.3s linear; }
        #toast.show { visibility: visible; opacity: 1; }
    </style>

</head>

<body class="antialiased min-h-screen flex flex-col relative">

    <header class="bg-gradient-to-r from-mysql-blue to-cyan-900 text-white shadow-lg sticky top-0 z-50">
        <div class="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
            <div class="flex items-center gap-3">
                <i class="fa-solid fa-database text-mysql-orange text-3xl"></i>
                <div>
                    <h1 class="text-xl font-bold leading-tight">SQL Course (21901-2001)</h1>
                    <p class="text-sm text-cyan-200">Unit 2: งานจัดการตาราง (Table Management)</p>
                </div>
            </div>
            <div class="hidden sm:block">
                <span class="bg-white/20 px-3 py-1 rounded-full text-sm font-medium border border-white/30 backdrop-blur-sm">
                    บทที่ 2.9 การเปลี่ยนชื่อคอลัมน์
                </span>
            </div>
        </div>
    </header>

    <main class="flex-grow max-w-5xl mx-auto px-4 py-8 w-full space-y-12">

        <section class="text-center space-y-4 max-w-3xl mx-auto">
            <h2 class="text-3xl md:text-4xl font-bold text-slate-800">1. การเปลี่ยนชื่อคอลัมน์ (RENAME)</h2>
            <p class="text-lg text-slate-600 leading-relaxed">
                บางครั้งเราอาจจะตั้งชื่อคอลัมน์ผิด พิมพ์ตกหล่น หรือชื่อเดิมไม่สื่อความหมาย เราสามารถใช้คำสั่ง <code>ALTER TABLE</code> ร่วมกับ <code>RENAME COLUMN</code> เพื่อเปลี่ยน <strong>เฉพาะชื่อ</strong> ได้โดยไม่กระทบกับข้อมูลและประเภทข้อมูลเดิมครับ
            </p>
        </section>

        <section class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="md:col-span-2 bg-slate-800 rounded-3xl p-6 md:p-8 shadow-xl text-white relative overflow-hidden h-full">
                <div class="absolute -right-6 -top-6 text-slate-700/50 z-0">
                    <i class="fa-solid fa-tag text-9xl"></i>
                </div>

                <h3 class="text-xl font-bold mb-4 flex items-center gap-2 relative z-10 text-cyan-300">
                    <i class="fa-solid fa-code"></i> โครงสร้างไวยากรณ์ (Syntax)
                </h3>

                <div class="code-editor p-5 rounded-xl text-sm leading-relaxed shadow-inner border border-slate-700 overflow-x-auto relative z-10">

<pre><code><span class="syntax-keyword">ALTER TABLE</span> <span class="syntax-identifier">table_name</span> 
<span class="syntax-keyword">RENAME COLUMN</span> <span class="syntax-identifier">old_column_name</span> <span class="syntax-keyword">TO</span> <span class="syntax-identifier">new_column_name</span><span class="syntax-punctuation">;</span>

<span class="syntax-comment">-- ตัวอย่าง: เปลี่ยนชื่อคอลัมน์จาก tel เป็น phone_number</span>
<span class="syntax-keyword">ALTER TABLE</span> <span class="syntax-identifier">customers</span> 
<span class="syntax-keyword">RENAME COLUMN</span> <span class="syntax-identifier">tel</span> <span class="syntax-keyword">TO</span> <span class="syntax-identifier">phone_number</span><span class="syntax-punctuation">;</span></code></pre>

                </div>
            </div>

            <div class="bg-blue-50 border border-blue-200 rounded-3xl p-6 shadow-sm flex flex-col justify-center h-full">
                <h4 class="font-bold text-blue-800 mb-3 flex items-center gap-2">
                    <i class="fa-solid fa-lightbulb text-mysql-orange text-xl"></i> เกร็ดความรู้
                </h4>
                <p class="text-sm text-slate-600 leading-relaxed">
                    ใน MySQL เวอร์ชันเก่า (ก่อน 8.0) เรามักจะใช้คำสั่ง <code>CHANGE</code> ซึ่ง <strong>บังคับให้เราต้องพิมพ์ Data Type ซ้ำอีกรอบ</strong> ถึงแม้เราแค่อยากจะเปลี่ยนแค่ชื่อก็ตาม:<br><br>
                    <span class="font-mono text-xs bg-white px-2 py-1 rounded border border-blue-100 block">ALTER TABLE t CHANGE old new INT;</span><br>
                    แต่ปัจจุบัน <code>RENAME COLUMN</code> นั้นสะดวกและปลอดภัยกว่ามากครับ!
                </p>
            </div>
        </section>

        <section class="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm relative z-10">
            <div class="flex items-center gap-3 mb-8 border-b border-slate-100 pb-4">
                <i class="fa-solid fa-eraser text-mysql-orange text-3xl"></i>
                <div>
                    <h2 class="text-2xl font-bold text-slate-800">2. Interactive: Rename Simulator</h2>
                    <p class="text-slate-600 text-sm mt-1">ตาราง <code>customers</code> ด้านล่างมีคอลัมน์ที่ชื่ออ่านยากจัง ลองแก้ให้มันดูเป็นมืออาชีพขึ้นหน่อยครับ!</p>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">

                <!-- Left: Control Panel -->
                <div class="lg:col-span-4 space-y-6">

                    <div class="bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-inner">
                        <h4 class="font-bold text-slate-700 mb-4 border-b pb-2"><i class="fa-solid fa-pen-nib mr-2 text-sky-500"></i>กำหนดชื่อใหม่</h4>

                        <div class="space-y-4">
                            <!-- Select Column -->
                            <div>
                                <label class="block text-sm font-semibold text-slate-600 mb-1">เลือกคอลัมน์ที่ต้องการเปลี่ยนชื่อ</label>
                                <select id="colSelect" class="w-full px-4 py-2 border border-slate-300 rounded-xl text-sm font-mono outline-none focus:border-mysql-blue focus:ring-2 focus:ring-mysql-blue/20 bg-white">
                                    <!-- Injected by JS -->
                                </select>
                            </div>

                            <div class="flex justify-center text-slate-400">
                                <i class="fa-solid fa-arrow-down"></i>
                            </div>

                            <!-- New Column Name -->
                            <div>
                                <label class="block text-sm font-semibold text-slate-600 mb-1">ชื่อใหม่ (New Name) <span class="text-red-500">*</span></label>
                                <input type="text" id="newNameInput" class="w-full px-4 py-2 border border-slate-300 focus:border-mysql-blue focus:ring-2 focus:ring-mysql-blue/20 rounded-xl outline-none font-mono text-sm transition-all" placeholder="พิมพ์ชื่อคอลัมน์ใหม่ที่นี่...">
                                <p id="nameHint" class="text-xs text-slate-400 mt-1 hidden">ใช้ภาษาอังกฤษ ตัวเลข หรือ _ เท่านั้น</p>
                            </div>

                            <button id="executeBtn" class="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 mt-4">
                                <i class="fa-solid fa-play"></i> รันคำสั่ง (Execute)
                            </button>
                        </div>
                    </div>

                    <!-- Live SQL Preview -->
                    <div class="bg-[#282c34] rounded-xl p-4 shadow-xl border border-slate-800" id="previewBox">
                        <div class="text-xs font-mono text-slate-400 mb-2 border-b border-slate-700 pb-1">SQL Preview:</div>
                        <div id="sqlPreviewText" class="text-sm font-mono text-cyan-300 break-words min-h-[40px]">
                            <!-- Injected by JS -->
                        </div>
                    </div>

                </div>

                <!-- Right: Database Table Viewer -->
                <div class="lg:col-span-8 flex flex-col gap-4">

                    <div class="bg-white border border-slate-300 rounded-xl overflow-hidden shadow-sm flex flex-col h-full">
                        <div class="bg-slate-100 px-4 py-3 border-b border-slate-300 flex justify-between items-center">
                            <div class="font-bold text-slate-700 flex items-center gap-2">
                                <i class="fa-solid fa-users"></i> ตาราง customers
                            </div>
                        </div>

                        <div class="overflow-x-auto p-4 bg-slate-50 relative flex-grow min-h-[200px]">
                            <table class="db-table" id="custTable">
                                <thead id="tableHead">
                                    <!-- Injected by JS -->
                                </thead>
                                <tbody id="tableBody">
                                    <!-- Injected by JS -->
                                </tbody>
                            </table>

                            <!-- Initial Helper Tip -->
                            <div id="helperTip" class="absolute top-20 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white px-4 py-2 rounded-lg shadow-xl text-sm flex items-center gap-2 animate-bounce opacity-90 z-20">
                                <i class="fa-solid fa-arrow-up"></i>
                                ลองเปลี่ยน <strong>nm</strong> เป็น <strong>name</strong> ดูสิ!
                            </div>
                        </div>
                    </div>

                    <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm text-slate-600">
                        <strong>บันทึกประวัติการแก้ไข:</strong>
                        <ul id="historyList" class="mt-2 space-y-1 text-xs font-mono text-slate-500 list-disc list-inside pl-4">
                            <li class="italic opacity-50">ยังไม่มีการแก้ไข...</li>
                        </ul>
                    </div>

                </div>

            </div>
        </section>

        <div class="flex justify-between items-center pt-8 border-t border-slate-200">
            <button class="text-slate-500 hover:text-mysql-blue transition-colors flex items-center gap-2" onclick="alert('ย้อนกลับไป: 2.8 การแก้ไขคอลัมน์ (MODIFY)')">
                <i class="fa-solid fa-arrow-left"></i> 2.8 MODIFY
            </button>
            <button class="bg-mysql-blue hover:bg-cyan-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-cyan-600/30 flex items-center gap-2" onclick="alert('ยินดีด้วย! คุณเรียนจบเนื้อหาส่วนการจัดการคอลัมน์แล้ว \nไปเรียนต่อ: 2.10 การลบตารางและคอลัมน์ (DROP)')">
                ไปต่อ: 2.10 DROP <i class="fa-solid fa-arrow-right"></i>
            </button>
        </div>

    </main>

    <!-- Custom Toast Notification -->
    <div id="toast" class="fixed bottom-5 right-5 bg-slate-800 text-white px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-3 border-l-4">
        <i id="toastIcon" class="fa-solid text-xl"></i>
        <div id="toastMsg" class="font-medium">Message</div>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', () => {

            // --- Toast Logic ---
            const toast = document.getElementById('toast');
            const toastMsg = document.getElementById('toastMsg');
            const toastIcon = document.getElementById('toastIcon');
            let toastTimeout;

            function showToast(message, type) {
                clearTimeout(toastTimeout);
                toastMsg.textContent = message;
                toast.className = 'fixed bottom-5 right-5 bg-slate-800 text-white px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-3 border-l-4';
                toastIcon.className = 'fa-solid text-xl';

                if (type === 'success') {
                    toast.classList.add('border-sky-500');
                    toastIcon.classList.add('fa-circle-check', 'text-sky-500');
                } else if (type === 'error') {
                    toast.classList.add('border-rose-500');
                    toastIcon.classList.add('fa-circle-xmark', 'text-rose-500');
                }

                toast.classList.add('show');
                toastTimeout = setTimeout(() => { toast.classList.remove('show'); }, 2500);
            }

            // --- State Management ---
            let columns = [
                { id: 'c1', name: 'c_id', type: 'INT', isPK: true },
                { id: 'c2', name: 'nm', type: 'VARCHAR(100)', isPK: false },
                { id: 'c3', name: 'tel', type: 'VARCHAR(20)', isPK: false },
                { id: 'c4', name: 'addr', type: 'TEXT', isPK: false }
            ];

            let tableData = [
                { c_id: 1, nm: 'สมชาย ใจดี', tel: '081-234-5678', addr: 'กรุงเทพฯ' },
                { c_id: 2, nm: 'สุดา มานะ', tel: '089-876-5432', addr: 'เชียงใหม่' },
                { c_id: 3, nm: 'ปิติ ดีใจ', tel: '082-333-4444', addr: 'ขอนแก่น' }
            ];

            let historyLog = [];
            let animatingColId = null;

            // --- DOM Elements ---
            const colSelect = document.getElementById('colSelect');
            const newNameInput = document.getElementById('newNameInput');
            const executeBtn = document.getElementById('executeBtn');
            const sqlPreviewText = document.getElementById('sqlPreviewText');
            const previewBox = document.getElementById('previewBox');
            const tableHead = document.getElementById('tableHead');
            const tableBody = document.getElementById('tableBody');
            const historyList = document.getElementById('historyList');
            const helperTip = document.getElementById('helperTip');
            const nameHint = document.getElementById('nameHint');

            // --- STREAMING_CHUNK:UI Update Functions... ---

            function renderTable() {
                // Header
                let thHtml = '<tr>';
                columns.forEach(col => {
                    const isAnimating = (col.id === animatingColId);
                    const animClass = isAnimating ? 'rename-anim-header' : '';
                    const pkIcon = col.isPK ? '<i class="fa-solid fa-key text-mysql-orange ml-1" title="PK"></i>' : '';

                    // Show old name if animating
                    let displayContent = col.name;
                    if (isAnimating && col.oldName) {
                        displayContent = `<span class="old-name-strike">${col.oldName}</span>${col.name}`;
                    }

                    thHtml += `<th class="${animClass}">
                        ${displayContent} ${pkIcon}
                        <div class="type-badge inline-block">${col.type}</div>
                    </th>`;
                });
                thHtml += '</tr>';
                tableHead.innerHTML = thHtml;

                // Body (Data doesn't change on RENAME, but we need to map to new keys)
                let tbHtml = '';
                tableData.forEach(row => {
                    tbHtml += '<tr>';
                    columns.forEach(col => {
                        // We use the original object keys, or updated ones if we update the data array.
                        // Actually, to make it simple, we just map by index or keep data keys consistent.
                        // Let's dynamically map using the column ID.

                        // To handle data mapping simply: we'll store data based on the col.id internally
                        // Let's refactor tableData slightly for robustness:
                        const val = row[col.id];
                        const fontStyle = col.isPK ? 'font-bold text-slate-500' : '';
                        tbHtml += `<td class="${fontStyle}">${val}</td>`;
                    });
                    tbHtml += '</tr>';
                });
                tableBody.innerHTML = tbHtml;
            }

            // Map initial data to ID-based for easier renaming
            let mappedTableData = tableData.map(row => {
                return {
                    'c1': row.c_id,
                    'c2': row.nm,
                    'c3': row.tel,
                    'c4': row.addr
                };
            });
            tableData = mappedTableData; // Replace with ID-based

            function updateDropdown() {
                const currentVal = colSelect.value;
                colSelect.innerHTML = '';
                columns.forEach(col => {
                    const opt = document.createElement('option');
                    opt.value = col.id;
                    opt.textContent = col.name;
                    colSelect.appendChild(opt);
                });

                // Try to keep selection if it still exists
                if (currentVal && columns.find(c => c.id === currentVal)) {
                    colSelect.value = currentVal;
                } else {
                    newNameInput.value = ''; // clear if selected item is gone/changed
                }
                updateSqlPreview();
            }

            function updateHistory() {
                if (historyLog.length === 0) return;
                historyList.innerHTML = '';
                // Show latest first
                [...historyLog].reverse().forEach(log => {
                    historyList.innerHTML += `<li>เปลี่ยน <span class="text-rose-400 line-through">${log.old}</span> เป็น <span class="text-sky-500 font-bold">${log.new}</span></li>`;
                });
            }

            function updateSqlPreview() {
                const colId = colSelect.value;
                if (!colId) return;

                const colObj = columns.find(c => c.id === colId);
                const oldName = colObj.name;
                const rawNewName = newNameInput.value.trim();
                const newName = rawNewName || 'new_column_name';

                let sql = `ALTER TABLE customers\nRENAME COLUMN ${oldName} TO ${newName};`;

                // Highlighting
                const highlighted = sql
                    .replace(/ALTER TABLE/g, '<span class="syntax-keyword">ALTER TABLE</span>')
                    .replace(/RENAME COLUMN/g, '<span class="syntax-keyword">RENAME COLUMN</span>')
                    .replace(/TO/g, '<span class="syntax-keyword">TO</span>')
                    .replace(/customers/g, '<span class="syntax-identifier">customers</span>');

                sqlPreviewText.innerHTML = highlighted.replace(/\n/g, '<br>');
            }

            // --- STREAMING_CHUNK:Execution & Validation Logic... ---

            // Inputs change listeners
            colSelect.addEventListener('change', () => {
                newNameInput.value = '';
                nameHint.classList.add('hidden');
                updateSqlPreview();
            });

            newNameInput.addEventListener('input', (e) => {
                // Show hint if invalid chars typed
                if (/[^a-zA-Z0-9_]/.test(e.target.value)) {
                    nameHint.classList.remove('hidden');
                    nameHint.classList.add('text-rose-500');
                } else {
                    nameHint.classList.add('hidden');
                }
                updateSqlPreview();
            });

            executeBtn.addEventListener('click', () => {
                const colId = colSelect.value;
                const rawNewName = newNameInput.value.trim();
                const colObj = columns.find(c => c.id === colId);

                // 1. Validation: Empty
                if (!rawNewName) {
                    showError('กรุณากำหนดชื่อคอลัมน์ใหม่ครับ');
                    newNameInput.focus();
                    return;
                }

                // 2. Validation: Sanitize (English, numbers, underscore only)
                const safeName = rawNewName.replace(/[^a-zA-Z0-9_]/g, '');
                if (safeName !== rawNewName) {
                    showError('ใช้ได้แค่ภาษาอังกฤษ ตัวเลข และเครื่องหมาย _ (Underscore) เท่านั้นครับ');
                    return;
                }

                // 3. Validation: Same name
                if (safeName.toLowerCase() === colObj.name.toLowerCase()) {
                    showError('ชื่อใหม่เหมือนกับชื่อเดิมเลยครับ');
                    return;
                }

                // 4. Validation: Duplicate name
                if (columns.some(c => c.name.toLowerCase() === safeName.toLowerCase())) {
                    showError(`ชื่อคอลัมน์ '${safeName}' มีอยู่แล้วในตารางนี้ครับ`);
                    return;
                }

                // Success! Execute rename
                const oldName = colObj.name;

                // Update State
                colObj.oldName = oldName; // Store temporarily for animation
                colObj.name = safeName;
                animatingColId = colObj.id;

                historyLog.push({ old: oldName, new: safeName });

                // UI Updates
                if (helperTip) helperTip.remove(); // Remove tip on first success
                newNameInput.value = '';

                renderTable();
                updateDropdown();
                updateHistory();

                showToast(`เปลี่ยนชื่อคอลัมน์เป็น ${safeName} สำเร็จ!`, 'success');

                // Clean up animation flag
                setTimeout(() => {
                    colObj.oldName = null;
                    animatingColId = null;
                    renderTable(); // Re-render to remove strike-through old name
                }, 1500);
            });

            function showError(msg) {
                previewBox.classList.add('shake-error');
                showToast(msg, 'error');

                setTimeout(() => {
                    previewBox.classList.remove('shake-error');
                }, 400);
            }

            // Allow Enter key
            newNameInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    executeBtn.click();
                }
            });

            // --- Initialize ---
            renderTable();
            updateDropdown();

        });
    </script>

</body>
</html>
-----------------------------------------------------------------------------------------------------------------------------------
- 2.10 การลบคอลัมน์ (DROP COLUMN)
<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>2.10 การลบคอลัมน์ (DROP COLUMN) - SQL Course</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@300;400;500;600;700&family=Fira+Code:wght@400;500;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['"Noto Sans Thai"', 'sans-serif'],
                        mono: ['"Fira Code"', 'monospace'],
                    },
                    colors: {
                        mysql: {
                            blue: '#00758F',
                            orange: '#F29111',
                            dark: '#1e293b'
                        },
                        code: {
                            keyword: '#c678dd',
                            string: '#98c379',
                            number: '#d19a66',
                            type: '#e5c07b',
                            identifier: '#e06c75',
                            comment: '#5c6370',
                            error: '#f43f5e'
                        }
                    }
                }
            }
        }
    </script>
    
    <style>
        body {
            background-color: #f8fafc;
            color: #334155;
        }
        
        /* Animations */
        .pop-in { animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        @keyframes popIn {
            0% { transform: scale(0.9); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
        }

        @keyframes shakeDanger {
            0%, 100% { transform: translateX(0); }
            20%, 60% { transform: translateX(-5px); }
            40%, 80% { transform: translateX(5px); }
        }
        .shake-danger { animation: shakeDanger 0.4s ease-in-out; }

        @keyframes shrinkAndFade {
            0% { background-color: rgba(244, 63, 94, 0.3); color: #be123c; transform: scale(1); opacity: 1; }
            50% { background-color: rgba(244, 63, 94, 0.8); color: transparent; transform: scale(0.95); opacity: 0.8; }
            100% { width: 0; padding: 0; opacity: 0; transform: scale(0); border: none; font-size: 0; }
        }
        .drop-anim-col { animation: shrinkAndFade 0.8s forwards ease-in; overflow: hidden; white-space: nowrap; }

        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
        }
        .float-anim { animation: float 3s ease-in-out infinite; }

        /* Code Editor Theme */
        .code-editor {
            background-color: #282c34;
            color: #abb2bf;
            font-family: 'Fira Code', monospace;
            tab-size: 4;
        }

        /* Database Table */
        .db-table { border-collapse: separate; border-spacing: 0; width: 100%; border: 1px solid #cbd5e1; border-radius: 0.5rem; overflow: hidden; }
        .db-table th { background-color: #1e293b; color: #f1f5f9; padding: 12px 16px; font-size: 14px; border-bottom: 2px solid #0f172a; border-right: 1px solid #334155; white-space: nowrap; transition: background-color 0.3s ease;}
        .db-table th:last-child { border-right: none; }
        .db-table td { padding: 12px 16px; border-bottom: 1px solid #e2e8f0; border-right: 1px solid #e2e8f0; font-family: 'Fira Code', monospace; font-size: 14px; background: white; white-space: nowrap; color: #475569; transition: background-color 0.3s ease;}
        .db-table td:last-child { border-right: none; }
        .db-table tr:last-child td { border-bottom: none; }

        .type-badge { font-size: 10px; padding: 2px 6px; border-radius: 4px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); margin-left: 6px; font-weight: normal; color: #cbd5e1;}

        /* Modal Overlay */
        #confirmModal, #navModal { visibility: hidden; opacity: 0; transition: all 0.2s ease; }
        #confirmModal.show, #navModal.show { visibility: visible; opacity: 1; }

        /* Toast */
        #toast { visibility: hidden; opacity: 0; transition: visibility 0s, opacity 0.3s linear; }
        #toast.show { visibility: visible; opacity: 1; }
    </style>

</head>

<body class="antialiased min-h-screen flex flex-col relative">

    <header class="bg-gradient-to-r from-mysql-blue to-cyan-900 text-white shadow-lg sticky top-0 z-40">
        <div class="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
            <div class="flex items-center gap-3">
                <i class="fa-solid fa-database text-mysql-orange text-3xl"></i>
                <div>
                    <h1 class="text-xl font-bold leading-tight">SQL Course (21901-2001)</h1>
                    <p class="text-sm text-cyan-200">Unit 2: งานจัดการตาราง (Table Management)</p>
                </div>
            </div>
            <div class="hidden sm:block">
                <span class="bg-white/20 px-3 py-1 rounded-full text-sm font-medium border border-white/30 backdrop-blur-sm">
                    บทที่ 2.10 การลบคอลัมน์
                </span>
            </div>
        </div>
    </header>

    <main class="flex-grow max-w-5xl mx-auto px-4 py-8 w-full space-y-12">

        <section class="text-center space-y-4 max-w-3xl mx-auto">
            <h2 class="text-3xl md:text-4xl font-bold text-slate-800">1. การลบคอลัมน์และตาราง (DROP)</h2>
            <p class="text-lg text-slate-600 leading-relaxed">
                คำสั่ง <strong class="text-rose-600">DROP</strong> คือคำสั่งที่อันตรายที่สุดในกลุ่ม DDL เพราะมันคือการ <strong>"ลบทิ้งอย่างถาวร"</strong> หากเราใช้ <code>DROP COLUMN</code> คอลัมน์นั้นพร้อมกับข้อมูลทั้งหมดที่อยู่ข้างในจะหายไปทันที และไม่สามารถกู้คืนได้ (ยกเว้นจะมี Backup)
            </p>
        </section>

        <section class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="md:col-span-2 bg-slate-800 rounded-3xl p-6 md:p-8 shadow-xl text-white relative overflow-hidden h-full">
                <div class="absolute -right-6 -top-6 text-slate-700/50 z-0">
                    <i class="fa-solid fa-trash-can text-9xl"></i>
                </div>

                <h3 class="text-xl font-bold mb-4 flex items-center gap-2 relative z-10 text-rose-400">
                    <i class="fa-solid fa-code"></i> โครงสร้างไวยากรณ์ (Syntax)
                </h3>

                <div class="code-editor p-5 rounded-xl text-sm leading-relaxed shadow-inner border border-slate-700 overflow-x-auto relative z-10">

<pre><code><span class="syntax-comment">-- การลบคอลัมน์ (ลบแค่โครงสร้างบางส่วน)</span>
<span class="syntax-keyword">ALTER TABLE</span> <span class="syntax-identifier">table_name</span> 
<span class="syntax-keyword">DROP COLUMN</span> <span class="syntax-identifier">column_name</span><span class="syntax-punctuation">;</span>

<span class="syntax-comment">-- ตัวอย่าง: ลบคอลัมน์ 'fax_number' ทิ้งไป</span>
<span class="syntax-keyword">ALTER TABLE</span> <span class="syntax-identifier">companies</span> <span class="syntax-keyword">DROP COLUMN</span> <span class="syntax-identifier">fax_number</span><span class="syntax-punctuation">;</span>

<span class="syntax-comment">-- ----------------------------------------</span>
<span class="syntax-comment">-- [อันตรายขั้นสุด] การลบทิ้งทั้งตาราง!</span>
<span class="syntax-keyword">DROP TABLE</span> <span class="syntax-identifier">table_name</span><span class="syntax-punctuation">;</span></code></pre>

                </div>
            </div>

            <div class="bg-rose-50 border border-rose-200 rounded-3xl p-6 shadow-sm flex flex-col justify-center h-full">
                <h4 class="font-bold text-rose-800 mb-3 flex items-center gap-2">
                    <i class="fa-solid fa-triangle-exclamation text-rose-500 text-xl"></i> คำเตือนจาก DBA
                </h4>
                <p class="text-sm text-slate-600 leading-relaxed">
                    ในโลกการทำงานจริง โปรแกรมเมอร์มักจะไม่ค่อยใช้คำสั่ง DROP เพื่อลบข้อมูลโดยตรง แต่มักจะเพิ่มคอลัมน์เช่น <code>is_active</code> หรือ <code>deleted_at</code> เพื่อซ่อนข้อมูลแทน (Soft Delete) เพราะข้อมูลทุกอย่างมีค่าและอาจต้องใช้ตรวจสอบย้อนหลังครับ
                </p>
            </div>
        </section>

        <section class="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm relative z-10">
            <div class="flex items-center gap-3 mb-8 border-b border-slate-100 pb-4">
                <i class="fa-solid fa-bomb text-rose-500 text-3xl"></i>
                <div>
                    <h2 class="text-2xl font-bold text-slate-800">2. Interactive: DROP Simulator</h2>
                    <p class="text-slate-600 text-sm mt-1">ตาราง <code>members</code> ด้านล่างมีคอลัมน์ที่ไม่จำเป็นและกินพื้นที่อยู่ ลองเลือกคอลัมน์แล้วสั่งลบทิ้งดูครับ!</p>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">

                <!-- Left: Control Panel -->
                <div class="lg:col-span-4 space-y-6">

                    <div class="bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-inner">
                        <h4 class="font-bold text-slate-700 mb-4 border-b pb-2"><i class="fa-solid fa-scissors mr-2 text-rose-500"></i>เลือกลบคอลัมน์</h4>

                        <div class="space-y-4">
                            <!-- Select Column -->
                            <div>
                                <label class="block text-sm font-semibold text-slate-600 mb-1">เลือกคอลัมน์ที่ต้องการลบ <span class="text-red-500">*</span></label>
                                <select id="colSelect" class="w-full px-4 py-2 border border-slate-300 rounded-xl text-sm font-mono outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 bg-white">
                                    <!-- Injected by JS -->
                                </select>
                            </div>

                            <button id="prepareDropBtn" class="w-full bg-gradient-to-r from-rose-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-md hover:shadow-rose-500/30 active:scale-95 flex items-center justify-center gap-2 mt-4">
                                <i class="fa-solid fa-trash-can"></i> สั่งทำงาน (Execute)
                            </button>
                        </div>
                    </div>

                    <!-- Live SQL Preview -->
                    <div class="bg-[#282c34] rounded-xl p-4 shadow-xl border border-slate-800" id="previewBox">
                        <div class="text-xs font-mono text-slate-400 mb-2 border-b border-slate-700 pb-1">SQL Preview:</div>
                        <div id="sqlPreviewText" class="text-sm font-mono text-rose-300 break-words min-h-[40px]">
                            <!-- Injected by JS -->
                        </div>
                    </div>

                </div>

                <!-- Right: Database Table Viewer -->
                <div class="lg:col-span-8 flex flex-col gap-4">

                    <div class="bg-white border border-slate-300 rounded-xl overflow-hidden shadow-sm flex flex-col h-full">
                        <div class="bg-slate-100 px-4 py-3 border-b border-slate-300 flex justify-between items-center">
                            <div class="font-bold text-slate-700 flex items-center gap-2">
                                <i class="fa-solid fa-users"></i> ตาราง members
                            </div>
                        </div>

                        <div class="overflow-x-auto p-4 bg-slate-50 relative flex-grow min-h-[220px]">
                            <table class="db-table" id="memberTable">
                                <thead id="tableHead">
                                    <!-- Injected by JS -->
                                </thead>
                                <tbody id="tableBody">
                                    <!-- Injected by JS -->
                                </tbody>
                            </table>

                            <!-- Initial Helper Tip -->
                            <div id="helperTip" class="absolute top-24 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white px-4 py-2 rounded-lg shadow-xl text-sm flex items-center gap-2 animate-bounce opacity-90 z-20">
                                <i class="fa-solid fa-arrow-up"></i>
                                ลบคอลัมน์ <strong>fax_number</strong> กับ <strong>line_id</strong> ทิ้งไปเลย! ไม่มีใครใช้แล้ว
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </section>

        <div class="flex justify-between items-center pt-8 border-t border-slate-200">
            <button class="text-slate-500 hover:text-mysql-blue transition-colors flex items-center gap-2" onclick="showNavModal('2.9 RENAME')">
                <i class="fa-solid fa-arrow-left"></i> 2.9 RENAME
            </button>
            <button class="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-emerald-600/30 flex items-center gap-2" onclick="showNavModal('จบหน่วยที่ 2')">
                จบบทเรียนหน่วยที่ 2 (DDL) <i class="fa-solid fa-flag-checkered"></i>
            </button>
        </div>

    </main>


    <!-- Confirm Drop Modal -->
    <div id="confirmModal" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm">
        <div class="bg-white rounded-3xl p-6 md:p-8 max-w-sm w-full mx-4 shadow-2xl pop-in text-center border-t-8 border-rose-500">
            <div class="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4 text-rose-500 text-4xl">
                <i class="fa-solid fa-triangle-exclamation"></i>
            </div>
            <h3 class="text-2xl font-bold text-slate-800 mb-2">คำเตือน!</h3>
            <p class="text-slate-600 mb-6">
                คุณกำลังจะลบคอลัมน์ <br>
                <strong id="confirmColName" class="text-rose-600 text-lg font-mono bg-rose-50 px-2 py-1 rounded border border-rose-200 block mt-2"></strong>
                <br><span class="text-sm">ข้อมูลที่อยู่ในคอลัมน์นี้ของทุกๆ แถวจะหายไปอย่างถาวร ยืนยันหรือไม่?</span>
            </p>
            <div class="flex gap-3">
                <button id="cancelDropBtn" class="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 px-4 rounded-xl transition-colors">
                    ยกเลิก (Cancel)
                </button>
                <button id="confirmDropBtn" class="flex-1 bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-lg shadow-rose-500/30">
                    ยืนยันลบ (DROP)
                </button>
            </div>
        </div>
    </div>

    <!-- Navigation Message Modal (replaces alert) -->
    <div id="navModal" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm">
        <div class="bg-white rounded-3xl p-6 md:p-8 max-w-sm w-full mx-4 shadow-2xl pop-in text-center border-t-8 border-mysql-blue">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-mysql-blue text-3xl">
                <i class="fa-solid fa-map-location-dot"></i>
            </div>
            <h3 class="text-xl font-bold text-slate-800 mb-2">นำทางไปยังบทเรียน</h3>
            <p class="text-slate-600 mb-6" id="navModalText">
                ระบบจำลองการเปลี่ยนหน้าไปยัง: ...
            </p>
            <button onclick="document.getElementById('navModal').classList.remove('show')" class="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 px-4 rounded-xl transition-colors">
                ตกลง (OK)
            </button>
        </div>
    </div>

    <!-- Custom Toast Notification -->
    <div id="toast" class="fixed bottom-5 right-5 bg-slate-800 text-white px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-3 border-l-4">
        <i id="toastIcon" class="fa-solid text-xl"></i>
        <div id="toastMsg" class="font-medium">Message</div>
    </div>

    <script>

        // --- Custom Nav Function (replaces alert) ---
        function showNavModal(destination) {
            const modal = document.getElementById('navModal');
            const text = document.getElementById('navModalText');

            if(destination === 'จบหน่วยที่ 2') {
                text.innerHTML = 'ยอดเยี่ยมมากครับ! คุณเรียนจบเนื้อหา <strong>Unit 2: งานจัดการตาราง (DDL)</strong> ครบถ้วนแล้ว<br><br>พร้อมแล้วไปลุยต่อที่ <strong>Unit 3: งานจัดการข้อมูล (DML)</strong> กันเลยครับ!';
            } else {
                text.innerHTML = `กำลังนำคุณกลับไปยังบทเรียน:<br><strong>${destination}</strong>`;
            }

            modal.classList.add('show');
        }

        document.addEventListener('DOMContentLoaded', () => {

            // --- Toast Logic ---
            const toast = document.getElementById('toast');
            const toastMsg = document.getElementById('toastMsg');
            const toastIcon = document.getElementById('toastIcon');
            let toastTimeout;

            function showToast(message, type) {
                clearTimeout(toastTimeout);
                toastMsg.innerHTML = message; // Use innerHTML to allow styling
                toast.className = 'fixed bottom-5 right-5 bg-slate-800 text-white px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-3 border-l-4';
                toastIcon.className = 'fa-solid text-xl';

                if (type === 'success') {
                    toast.classList.add('border-emerald-500');
                    toastIcon.classList.add('fa-circle-check', 'text-emerald-500');
                } else if (type === 'error') {
                    toast.classList.add('border-rose-500');
                    toastIcon.classList.add('fa-triangle-exclamation', 'text-rose-500');
                }

                toast.classList.add('show');
                toastTimeout = setTimeout(() => { toast.classList.remove('show'); }, 3000);
            }

            // --- State Management ---
            let columns = [
                { id: 'c1', name: 'mem_id', type: 'INT', isPK: true, removable: false },
                { id: 'c2', name: 'username', type: 'VARCHAR(50)', isPK: false, removable: false },
                { id: 'c3', name: 'fax_number', type: 'VARCHAR(20)', isPK: false, removable: true },
                { id: 'c4', name: 'line_id', type: 'VARCHAR(50)', isPK: false, removable: true },
                { id: 'c5', name: 'blood_type', type: 'VARCHAR(5)', isPK: false, removable: true },
                { id: 'c6', name: 'created_at', type: 'DATETIME', isPK: false, removable: false }
            ];

            let tableData = [
                { c1: 1, c2: 'admin_01', c3: '02-111-2222', c4: '@admin01', c5: 'AB', c6: '2025-01-10' },
                { c1: 2, c2: 'johndoe', c3: '-', c4: 'john.d', c5: 'O', c6: '2025-02-15' },
                { c1: 3, c2: 'somying', c3: '053-999-888', c4: 'ying_zaa', c5: 'B', c6: '2025-03-20' }
            ];

            let animatingColId = null;

            // --- DOM Elements ---
            const colSelect = document.getElementById('colSelect');
            const prepareDropBtn = document.getElementById('prepareDropBtn');
            const sqlPreviewText = document.getElementById('sqlPreviewText');
            const previewBox = document.getElementById('previewBox');
            const tableHead = document.getElementById('tableHead');
            const tableBody = document.getElementById('tableBody');
            const helperTip = document.getElementById('helperTip');

            // Modal Elements
            const confirmModal = document.getElementById('confirmModal');
            const confirmColName = document.getElementById('confirmColName');
            const cancelDropBtn = document.getElementById('cancelDropBtn');
            const confirmDropBtn = document.getElementById('confirmDropBtn');

            // --- STREAMING_CHUNK: JavaScript Rendering and Logic... ---

            function renderTable() {
                // Determine if we are animating a drop
                const isDropping = animatingColId !== null;

                // Render Header
                let thHtml = '<tr>';
                columns.forEach(col => {
                    const animClass = (col.id === animatingColId) ? 'drop-anim-col' : '';
                    const pkIcon = col.isPK ? '<i class="fa-solid fa-key text-mysql-orange ml-1" title="PK"></i>' : '';

                    thHtml += `<th class="${animClass}" data-col-id="${col.id}">
                        ${col.name} ${pkIcon}
                        <div class="type-badge inline-block">${col.type}</div>
                    </th>`;
                });
                thHtml += '</tr>';
                tableHead.innerHTML = thHtml;

                // Render Body
                let tbHtml = '';
                tableData.forEach(row => {
                    tbHtml += '<tr>';
                    columns.forEach(col => {
                        const val = row[col.id] !== undefined ? row[col.id] : '';
                        const fontStyle = col.isPK ? 'font-bold text-slate-500' : '';
                        const animClass = (col.id === animatingColId) ? 'drop-anim-col' : '';

                        tbHtml += `<td class="${fontStyle} ${animClass}" data-col-id="${col.id}">${val}</td>`;
                    });
                    tbHtml += '</tr>';
                });
                tableBody.innerHTML = tbHtml;
            }

            function updateDropdown() {
                colSelect.innerHTML = '';
                let hasRemovable = false;

                columns.forEach(col => {
                    if (col.removable) {
                        const opt = document.createElement('option');
                        opt.value = col.id;
                        opt.textContent = col.name;
                        colSelect.appendChild(opt);
                        hasRemovable = true;
                    }
                });

                if (!hasRemovable) {
                    const opt = document.createElement('option');
                    opt.value = "";
                    opt.textContent = "-- ไม่มีคอลัมน์ให้ลบแล้ว --";
                    colSelect.appendChild(opt);
                    colSelect.disabled = true;
                    prepareDropBtn.disabled = true;
                    prepareDropBtn.classList.replace('from-rose-500', 'from-slate-400');
                    prepareDropBtn.classList.replace('to-red-600', 'to-slate-500');
                    sqlPreviewText.innerHTML = '<span class="text-slate-500 italic">-- No columns available to drop --</span>';
                } else {
                    updateSqlPreview();
                }
            }

            function updateSqlPreview() {
                const colId = colSelect.value;
                if (!colId) return;

                const colObj = columns.find(c => c.id === colId);
                const colName = colObj.name;

                let sql = `ALTER TABLE members\nDROP COLUMN ${colName};`;

                // Highlighting
                const highlighted = sql
                    .replace(/ALTER TABLE/g, '<span class="syntax-keyword">ALTER TABLE</span>')
                    .replace(/DROP COLUMN/g, '<span class="syntax-keyword text-rose-400">DROP COLUMN</span>')
                    .replace(/members/g, '<span class="syntax-identifier">members</span>');

                sqlPreviewText.innerHTML = highlighted.replace(/\n/g, '<br>');
            }

            // --- Event Listeners ---

            colSelect.addEventListener('change', updateSqlPreview);

            // Step 1: Prepare Drop (Show Modal)
            prepareDropBtn.addEventListener('click', () => {
                const colId = colSelect.value;
                if (!colId) return;

                const colObj = columns.find(c => c.id === colId);

                confirmColName.textContent = colObj.name;
                confirmModal.classList.add('show');
            });

            // Step 2: Cancel Drop
            cancelDropBtn.addEventListener('click', () => {
                confirmModal.classList.remove('show');
            });

            // Step 3: Confirm Drop (Execute)
            confirmDropBtn.addEventListener('click', () => {
                confirmModal.classList.remove('show');

                const colId = colSelect.value;
                const colObj = columns.find(c => c.id === colId);
                const colName = colObj.name;

                if (helperTip) helperTip.remove(); // Remove tip

                // 1. Trigger Animation Flag
                animatingColId = colId;
                renderTable(); // Re-render with animation classes

                // 2. Wait for animation to finish, then actually remove data
                setTimeout(() => {
                    // Remove from columns array
                    columns = columns.filter(c => c.id !== colId);

                    // Note: In a real DB, data is deleted. In JS memory, we can just let it be orphaned
                    // or delete it. Deleting it to be thorough.
                    tableData.forEach(row => {
                        delete row[colId];
                    });

                    // Clear animation flag and Re-render cleanly
                    animatingColId = null;
                    renderTable();
                    updateDropdown();

                    showToast(`ลบคอลัมน์ <span class="font-mono bg-white/20 px-1 rounded">${colName}</span> ถาวรแล้ว!`, 'success');
                }, 800); // Matches the 0.8s CSS animation
            });

            // --- Initialize ---
            renderTable();
            updateDropdown();

        });
    </script>

</body>
</html>
-----------------------------------------------------------------------------------------------------------------------------------
- 2.11 ผลกระทบการลบตาราง (CASCADE)
<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>2.11 ผลกระทบการลบ (CASCADE) - SQL Course</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@300;400;500;600;700&family=Fira+Code:wght@400;500;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['"Noto Sans Thai"', 'sans-serif'],
                        mono: ['"Fira Code"', 'monospace'],
                    },
                    colors: {
                        mysql: {
                            blue: '#00758F',
                            orange: '#F29111',
                            dark: '#1e293b'
                        },
                        code: {
                            keyword: '#c678dd',
                            string: '#98c379',
                            number: '#d19a66',
                            type: '#e5c07b',
                            identifier: '#e06c75',
                            comment: '#5c6370',
                            error: '#f43f5e'
                        }
                    }
                }
            }
        }
    </script>
    
    <style>
        body {
            background-color: #f8fafc;
            color: #334155;
        }
        
        .pop-in { animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        @keyframes popIn {
            0% { transform: scale(0.9); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
        }

        @keyframes shakeDanger {
            0%, 100% { transform: translateX(0); }
            20%, 60% { transform: translateX(-6px) rotate(-1deg); }
            40%, 80% { transform: translateX(6px) rotate(1deg); }
        }
        .shake-danger { animation: shakeDanger 0.5s ease-in-out; border-color: #f43f5e !important; box-shadow: 0 0 0 3px rgba(244, 63, 94, 0.2) !important;}

        @keyframes dissolve {
            0% { transform: scale(1); opacity: 1; filter: blur(0px); background-color: rgba(168, 85, 247, 0.5); }
            50% { transform: scale(0.95); opacity: 0.8; filter: blur(2px); background-color: rgba(168, 85, 247, 0.8); color: white; }
            100% { transform: scale(0.8) translateY(10px); opacity: 0; filter: blur(5px); display: none; }
        }
        .dissolve-anim { animation: dissolve 0.8s forwards ease-in; pointer-events: none; }

        @keyframes flashWarning {
            0%, 100% { background-color: white; }
            50% { background-color: #fee2e2; }
        }
        .flash-warning { animation: flashWarning 1s ease-in-out infinite; }

        /* Code Editor Theme */
        .code-editor {
            background-color: #282c34;
            color: #abb2bf;
            font-family: 'Fira Code', monospace;
            tab-size: 4;
        }

        /* Database Table */
        .db-table { border-collapse: separate; border-spacing: 0; width: 100%; border: 1px solid #cbd5e1; border-radius: 0.5rem; overflow: hidden; }
        .db-table th { background-color: #1e293b; color: #f1f5f9; padding: 10px 16px; font-size: 14px; border-bottom: 2px solid #0f172a; border-right: 1px solid #334155; white-space: nowrap; }
        .db-table th:last-child { border-right: none; }
        .db-table td { padding: 10px 16px; border-bottom: 1px solid #e2e8f0; border-right: 1px solid #e2e8f0; font-family: 'Fira Code', monospace; font-size: 14px; background: white; white-space: nowrap; color: #475569; transition: all 0.3s ease;}
        .db-table td:last-child { border-right: none; }
        .db-table tr:last-child td { border-bottom: none; }

        .fk-link { position: relative; }
        .fk-link::after { content: '\f0c1'; font-family: 'Font Awesome 6 Free'; font-weight: 900; position: absolute; right: 8px; color: #0ea5e9; opacity: 0.5; font-size: 10px;}

        /* Modal Overlay */
        #navModal { visibility: hidden; opacity: 0; transition: all 0.2s ease; }
        #navModal.show { visibility: visible; opacity: 1; }

        /* Toast */
        #toast { visibility: hidden; opacity: 0; transition: visibility 0s, opacity 0.3s linear; }
        #toast.show { visibility: visible; opacity: 1; transform: translateY(0); }
    </style>

</head>

<body class="antialiased min-h-screen flex flex-col relative">

    <header class="bg-gradient-to-r from-mysql-blue to-cyan-900 text-white shadow-lg sticky top-0 z-40">
        <div class="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
            <div class="flex items-center gap-3">
                <i class="fa-solid fa-database text-mysql-orange text-3xl"></i>
                <div>
                    <h1 class="text-xl font-bold leading-tight">SQL Course (21901-2001)</h1>
                    <p class="text-sm text-cyan-200">Unit 2: งานจัดการตาราง (Table Management)</p>
                </div>
            </div>
            <div class="hidden sm:block">
                <span class="bg-white/20 px-3 py-1 rounded-full text-sm font-medium border border-white/30 backdrop-blur-sm">
                    บทที่ 2.11 ผลกระทบการลบ (CASCADE)
                </span>
            </div>
        </div>
    </header>

    <main class="flex-grow max-w-5xl mx-auto px-4 py-8 w-full space-y-12">

        <section class="text-center space-y-4 max-w-3xl mx-auto">
            <h2 class="text-3xl md:text-4xl font-bold text-slate-800">1. เกิดอะไรขึ้นเมื่อเราลบตารางหลัก?</h2>
            <p class="text-lg text-slate-600 leading-relaxed">
                จำได้ไหมครับว่า <strong>Foreign Key</strong> ทำหน้าที่เชื่อมโยงตารางลูกเข้ากับตารางหลัก ปัญหาคือ... <br>
                <span class="text-rose-600 font-semibold">"จะเกิดอะไรขึ้น ถ้าเราเผลอไปลบข้อมูลแผนก (ตารางหลัก) ที่มีพนักงาน (ตารางลูก) สังกัดอยู่?"</span><br>
                ระบบฐานข้อมูลจะจัดการปัญหานี้ผ่านกฎ 2 แบบ คือ <code>RESTRICT</code> และ <code>CASCADE</code>
            </p>
        </section>

        <section class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- RESTRICT Card -->
            <div class="bg-white rounded-3xl p-6 md:p-8 shadow-sm border-2 border-slate-200 hover:border-slate-400 transition-colors relative overflow-hidden group">
                <div class="absolute -right-4 -top-4 text-slate-100 group-hover:text-slate-200 transition-colors z-0">
                    <i class="fa-solid fa-shield-halved text-9xl"></i>
                </div>
                <div class="relative z-10">
                    <div class="w-12 h-12 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center text-2xl mb-4 shadow-inner">
                        <i class="fa-solid fa-hand"></i>
                    </div>
                    <h3 class="text-xl font-bold text-slate-800 mb-2 font-mono">ON DELETE RESTRICT</h3>
                    <p class="text-sm text-slate-600 mb-4 h-16">
                        <strong>(ค่าเริ่มต้น)</strong> ฐานข้อมูลจะทำหน้าที่เป็นยามป้องกัน <span class="text-rose-600 font-bold">"ห้ามลบเด็ดขาด"</span> หากตารางหลักยังมีข้อมูลลูกๆ อ้างอิงถึงอยู่ (ป้องกันลูกกำพร้า)
                    </p>
                </div>
            </div>

            <!-- CASCADE Card -->
            <div class="bg-white rounded-3xl p-6 md:p-8 shadow-sm border-2 border-purple-200 hover:border-purple-400 transition-colors relative overflow-hidden group">
                <div class="absolute -right-4 -top-4 text-purple-50 group-hover:text-purple-100 transition-colors z-0">
                    <i class="fa-solid fa-meteor text-9xl"></i>
                </div>
                <div class="relative z-10">
                    <div class="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center text-2xl mb-4 shadow-inner">
                        <i class="fa-solid fa-burst"></i>
                    </div>
                    <h3 class="text-xl font-bold text-slate-800 mb-2 font-mono">ON DELETE CASCADE</h3>
                    <p class="text-sm text-slate-600 mb-4 h-16">
                        <strong>(เอฟเฟกต์โดมิโน)</strong> หากเราลบข้อมูลตารางหลัก ฐานข้อมูลจะ <span class="text-purple-600 font-bold">"ลบข้อมูลในตารางลูกทั้งหมดที่เกี่ยวข้องตามไปด้วยทันที"</span> (ลบถอนรากถอนโคน)
                    </p>
                </div>
            </div>
        </section>

        <section class="bg-slate-800 rounded-3xl p-6 md:p-8 shadow-xl text-white relative overflow-hidden">
            <h3 class="text-xl font-bold mb-4 flex items-center gap-2 relative z-10 text-cyan-300">
                <i class="fa-solid fa-code"></i> โครงสร้างไวยากรณ์ (Syntax) ตอนสร้างตารางลูก
            </h3>

            <div class="code-editor p-5 rounded-xl text-sm leading-relaxed shadow-inner border border-slate-700 overflow-x-auto relative z-10">

<pre><code><span class="syntax-keyword">CREATE TABLE</span> <span class="syntax-identifier">employees</span> <span class="syntax-punctuation">(</span>
    <span class="syntax-identifier">emp_id</span> <span class="syntax-type">INT PRIMARY KEY</span><span class="syntax-punctuation">,</span>
    <span class="syntax-identifier">name</span> <span class="syntax-type">VARCHAR(50)</span><span class="syntax-punctuation">,</span>
    <span class="syntax-identifier">dept_id</span> <span class="syntax-type">INT</span><span class="syntax-punctuation">,</span>
    <span class="syntax-keyword">FOREIGN KEY</span> <span class="syntax-punctuation">(</span><span class="syntax-identifier">dept_id</span><span class="syntax-punctuation">)</span> <span class="syntax-keyword">REFERENCES</span> <span class="syntax-identifier">departments</span><span class="syntax-punctuation">(</span><span class="syntax-identifier">id</span><span class="syntax-punctuation">)</span>
    <span class="syntax-keyword text-purple-400">ON DELETE CASCADE</span> <span class="syntax-comment">-- &lt; เพิ่มคำสั่งนี้ต่อท้าย FK</span>
<span class="syntax-punctuation">);</span></code></pre>

            </div>

            <div class="mt-4 text-sm text-slate-400 bg-slate-900/50 p-3 rounded-lg border border-slate-700">
                <i class="fa-solid fa-circle-info text-sky-400 mr-1"></i> เกร็ดความรู้: นอกจากการลบตารางด้วย <code>DROP TABLE</code> จะไม่สามารถทำได้ถ้าติด Foreign Key แล้ว การลบข้อมูล (Row) ก็ใช้กฎเดียวกันครับ
            </div>
        </section>

        <section class="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm relative z-10">
            <div class="flex items-center gap-3 mb-8 border-b border-slate-100 pb-4">
                <i class="fa-solid fa-cubes-stacked text-mysql-orange text-3xl"></i>
                <div>
                    <h2 class="text-2xl font-bold text-slate-800">2. Interactive: Domino Effect Simulator</h2>
                    <p class="text-slate-600 text-sm mt-1">ทดลองลบ <strong>แผนก IT (dept_id = 1)</strong> ในโหมดต่างๆ เพื่อดูว่าตารางพนักงาน (ลูก) จะมีปฏิกิริยาอย่างไร</p>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">

                <!-- Left: Control Panel -->
                <div class="lg:col-span-4 space-y-6">

                    <div class="bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-inner" id="controlPanel">
                        <h4 class="font-bold text-slate-700 mb-4 border-b pb-2"><i class="fa-solid fa-sliders mr-2 text-sky-500"></i>ตั้งค่า Foreign Key</h4>

                        <div class="space-y-4">
                            <!-- Mode Selection -->
                            <div class="space-y-2">
                                <label class="flex items-center p-3 border rounded-xl cursor-pointer transition-all bg-white border-slate-300 hover:border-sky-500" id="modeRestrictLabel">
                                    <input type="radio" name="fkMode" value="RESTRICT" checked class="text-sky-500 focus:ring-sky-500 mr-3 w-4 h-4">
                                    <div>
                                        <div class="font-bold text-slate-700 font-mono text-sm">ON DELETE RESTRICT</div>
                                        <div class="text-xs text-slate-500">ห้ามลบถ้ามีลูกอ้างอิงอยู่ (ปลอดภัย)</div>
                                    </div>
                                </label>

                                <label class="flex items-center p-3 border rounded-xl cursor-pointer transition-all bg-white border-slate-300 hover:border-purple-500" id="modeCascadeLabel">
                                    <input type="radio" name="fkMode" value="CASCADE" class="text-purple-500 focus:ring-purple-500 mr-3 w-4 h-4">
                                    <div>
                                        <div class="font-bold text-slate-700 font-mono text-sm">ON DELETE CASCADE</div>
                                        <div class="text-xs text-slate-500">ลบแผนกปุ๊บ พนักงานหายปั๊บ! (โดมิโน)</div>
                                    </div>
                                </label>
                            </div>

                            <button id="deleteBtn" class="w-full bg-gradient-to-r from-rose-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-md hover:shadow-rose-500/30 active:scale-95 flex items-center justify-center gap-2 mt-6">
                                <i class="fa-solid fa-trash-can"></i> สั่งลบแผนก IT (dept_id=1)
                            </button>

                            <button id="resetBtn" class="w-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-2 px-4 rounded-xl transition-all flex items-center justify-center gap-2 mt-2">
                                <i class="fa-solid fa-rotate-right"></i> รีเซ็ตข้อมูลใหม่
                            </button>
                        </div>
                    </div>

                    <!-- Mini Console -->
                    <div class="bg-[#282c34] rounded-xl p-4 shadow-xl border border-slate-800">
                        <div class="text-xs font-mono text-slate-400 mb-2 border-b border-slate-700 pb-1">MySQL Response:</div>
                        <div id="consoleText" class="text-sm font-mono text-emerald-400 break-words min-h-[60px]">
                            <span class="text-slate-500 italic">> รอคำสั่ง...</span>
                        </div>
                    </div>

                </div>

                <!-- Right: Visual Tables -->
                <div class="lg:col-span-8 flex flex-col gap-6">

                    <!-- Parent Table -->
                    <div class="bg-white border border-slate-300 rounded-xl overflow-hidden shadow-sm">
                        <div class="bg-slate-100 px-4 py-2 border-b border-slate-300 flex justify-between items-center">
                            <div class="font-bold text-slate-700 flex items-center gap-2 text-sm">
                                <i class="fa-solid fa-building text-mysql-orange"></i> departments (Parent Table)
                            </div>
                        </div>
                        <div class="overflow-x-auto p-3 bg-slate-50">
                            <table class="db-table" id="parentTable">
                                <thead>
                                    <tr>
                                        <th class="w-24">id <i class="fa-solid fa-key text-mysql-orange ml-1"></i></th>
                                        <th>dept_name</th>
                                    </tr>
                                </thead>
                                <tbody id="parentTbody">
                                    <!-- Rendered by JS -->
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Connection Line visualizer (CSS pure) -->
                    <div class="flex justify-center -my-3 z-20 relative h-6">
                        <div class="w-1 bg-slate-300 h-full absolute"></div>
                        <div class="absolute bg-white border-2 border-slate-300 rounded-full px-2 py-0.5 text-[10px] font-bold text-slate-500 top-1/2 transform -translate-y-1/2">
                            <i class="fa-solid fa-link text-mysql-blue"></i> FOREIGN KEY
                        </div>
                    </div>

                    <!-- Child Table -->
                    <div class="bg-white border border-slate-300 rounded-xl overflow-hidden shadow-sm">
                        <div class="bg-slate-100 px-4 py-2 border-b border-slate-300 flex justify-between items-center">
                            <div class="font-bold text-slate-700 flex items-center gap-2 text-sm">
                                <i class="fa-solid fa-users text-mysql-blue"></i> employees (Child Table)
                            </div>
                        </div>
                        <div class="overflow-x-auto p-3 bg-slate-50 relative min-h-[200px]">
                            <table class="db-table" id="childTable">
                                <thead>
                                    <tr>
                                        <th class="w-24">emp_id</th>
                                        <th>name</th>
                                        <th class="w-24">dept_id <i class="fa-solid fa-link text-mysql-blue ml-1"></i></th>
                                    </tr>
                                </thead>
                                <tbody id="childTbody">
                                    <!-- Rendered by JS -->
                                </tbody>
                            </table>

                            <!-- Initial Helper Tip -->
                            <div id="helperTip" class="absolute top-20 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white px-4 py-2 rounded-lg shadow-xl text-xs flex items-center gap-2 animate-bounce opacity-90 z-20 pointer-events-none">
                                <span>พนักงานสมชาย และ มานะ สังกัดอยู่ <strong>แผนก 1 (IT)</strong></span>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </section>

        <!-- Navigation Message Modal (replaces alert) -->
        <div id="navModal" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm">
            <div class="bg-white rounded-3xl p-6 md:p-8 max-w-sm w-full mx-4 shadow-2xl pop-in text-center border-t-8 border-emerald-500">
                <div class="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-500 text-3xl">
                    <i class="fa-solid fa-flag-checkered"></i>
                </div>
                <h3 class="text-xl font-bold text-slate-800 mb-2">นำทางไปยังบทเรียน</h3>
                <p class="text-slate-600 mb-6" id="navModalText">
                    ...
                </p>
                <button onclick="document.getElementById('navModal').classList.remove('show')" class="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 px-4 rounded-xl transition-colors">
                    ตกลง (OK)
                </button>
            </div>
        </div>

        <div class="flex justify-between items-center pt-8 border-t border-slate-200">
            <button class="text-slate-500 hover:text-mysql-blue transition-colors flex items-center gap-2" onclick="showNavModal('กลับไปยัง 2.10 DROP COLUMN')">
                <i class="fa-solid fa-arrow-left"></i> 2.10 DROP COLUMN
            </button>
            <button class="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-emerald-600/30 flex items-center gap-2" onclick="showNavModal('ยอดเยี่ยมมากครับ! คุณเรียนจบเนื้อหา <strong>Unit 2: งานจัดการตาราง (DDL)</strong> ครบถ้วนแล้ว<br><br>พร้อมแล้วไปลุยต่อที่ <strong>Unit 3: งานจัดการข้อมูล (DML)</strong> กันเลยครับ!')">
                จบบทเรียนหน่วยที่ 2 <i class="fa-solid fa-flag-checkered"></i>
            </button>
        </div>

    </main>

    <!-- Custom Toast Notification -->
    <div id="toast" class="fixed bottom-5 right-5 bg-slate-800 text-white px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-3 border-l-4 translate-y-20">
        <i id="toastIcon" class="fa-solid text-xl"></i>
        <div id="toastMsg" class="font-medium text-sm">Message</div>
    </div>

    <script>
        function showNavModal(msg) {
            document.getElementById('navModalText').innerHTML = msg;
            document.getElementById('navModal').classList.add('show');
        }

        document.addEventListener('DOMContentLoaded', () => {

            // --- Toast Logic ---
            const toast = document.getElementById('toast');
            const toastMsg = document.getElementById('toastMsg');
            const toastIcon = document.getElementById('toastIcon');
            let toastTimeout;

            function showToast(message, type) {
                clearTimeout(toastTimeout);
                toastMsg.innerHTML = message;
                toast.className = 'fixed bottom-5 right-5 bg-slate-800 text-white px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-3 border-l-4 translate-y-0 transition-transform duration-300';
                toastIcon.className = 'fa-solid text-xl';

                if (type === 'success') {
                    toast.classList.add('border-purple-500');
                    toastIcon.classList.add('fa-burst', 'text-purple-500');
                } else if (type === 'error') {
                    toast.classList.add('border-rose-500');
                    toastIcon.classList.add('fa-shield-halved', 'text-rose-500');
                } else {
                    toast.classList.add('border-sky-500');
                    toastIcon.classList.add('fa-rotate-right', 'text-sky-500');
                }

                toast.classList.add('show');
                toastTimeout = setTimeout(() => { toast.classList.remove('show'); toast.classList.add('translate-y-20'); }, 3500);
            }

            // --- State Management ---
            const initialParents = [
                { id: 1, name: 'IT' },
                { id: 2, name: 'HR' }
            ];

            const initialChildren = [
                { id: 101, name: 'สมชาย (Somchai)', dept_id: 1 },
                { id: 102, name: 'สุดา (Suda)', dept_id: 2 },
                { id: 103, name: 'มานะ (Mana)', dept_id: 1 }
            ];

            let parents = JSON.parse(JSON.stringify(initialParents));
            let children = JSON.parse(JSON.stringify(initialChildren));

            // DOM
            const parentTbody = document.getElementById('parentTbody');
            const childTbody = document.getElementById('childTbody');
            const deleteBtn = document.getElementById('deleteBtn');
            const resetBtn = document.getElementById('resetBtn');
            const consoleText = document.getElementById('consoleText');
            const controlPanel = document.getElementById('controlPanel');
            const helperTip = document.getElementById('helperTip');

            const radioRestrict = document.querySelector('input[value="RESTRICT"]');
            const radioCascade = document.querySelector('input[value="CASCADE"]');
            const labelRestrict = document.getElementById('modeRestrictLabel');
            const labelCascade = document.getElementById('modeCascadeLabel');

            // --- UI Radio Styling ---
            function updateRadioStyles() {
                if (radioRestrict.checked) {
                    labelRestrict.classList.add('border-sky-500', 'bg-sky-50');
                    labelCascade.classList.remove('border-purple-500', 'bg-purple-50');
                } else {
                    labelCascade.classList.add('border-purple-500', 'bg-purple-50');
                    labelRestrict.classList.remove('border-sky-500', 'bg-sky-50');
                }
            }

            radioRestrict.addEventListener('change', updateRadioStyles);
            radioCascade.addEventListener('change', updateRadioStyles);
            updateRadioStyles(); // init

            // --- Render Functions ---
            function renderTables() {
                // Parent
                parentTbody.innerHTML = '';
                parents.forEach(p => {
                    const row = document.createElement('tr');
                    row.id = `parent-row-${p.id}`;
                    const targetClass = p.id === 1 ? 'font-bold text-rose-500' : 'font-bold text-slate-600';
                    row.innerHTML = `
                        <td class="${targetClass}">${p.id}</td>
                        <td class="${p.id === 1 ? 'bg-rose-50' : ''}">${p.name}</td>
                    `;
                    parentTbody.appendChild(row);
                });

                if (parents.length === 0) {
                     parentTbody.innerHTML = `<tr><td colspan="2" class="text-center italic text-slate-400">Empty set</td></tr>`;
                }

                // Child
                childTbody.innerHTML = '';
                children.forEach(c => {
                    const row = document.createElement('tr');
                    row.id = `child-row-${c.id}`;
                    // Highlight the FK that points to IT (1)
                    const fkClass = c.dept_id === 1 ? 'font-bold text-rose-500 bg-rose-50 fk-link' : 'font-bold text-cyan-600 fk-link';
                    row.innerHTML = `
                        <td class="text-slate-500">${c.id}</td>
                        <td>${c.name}</td>
                        <td class="${fkClass}" data-dept="${c.dept_id}">${c.dept_id}</td>
                    `;
                    childTbody.appendChild(row);
                });

                if (children.length === 0) {
                     childTbody.innerHTML = `<tr><td colspan="3" class="text-center italic text-slate-400">Empty set</td></tr>`;
                }
            }

            function logConsole(html, isError = false) {
                consoleText.innerHTML = `> DELETE FROM departments WHERE id = 1;<br>`;
                consoleText.innerHTML += `<div class="mt-2 ${isError ? 'text-rose-400' : 'text-purple-400'}">${html}</div>`;
            }

            // --- Delete Action ---
            deleteBtn.addEventListener('click', () => {
                if (helperTip) helperTip.style.display = 'none';

                const targetDeptId = 1; // IT
                const hasTarget = parents.some(p => p.id === targetDeptId);

                if (!hasTarget) {
                    consoleText.innerHTML = `<span class="text-slate-500">> DELETE FROM departments WHERE id = 1;<br>Query OK, 0 rows affected.</span>`;
                    return;
                }

                // Check dependencies in Child
                const dependentChildren = children.filter(c => c.dept_id === targetDeptId);
                const mode = radioRestrict.checked ? 'RESTRICT' : 'CASCADE';

                if (mode === 'RESTRICT') {
                    if (dependentChildren.length > 0) {
                        // Action: BLOCK! Error Animation
                        controlPanel.classList.add('shake-danger');
                        setTimeout(() => controlPanel.classList.remove('shake-danger'), 500);

                        // Flash dependent rows to show WHY it failed
                        dependentChildren.forEach(c => {
                            const el = document.getElementById(`child-row-${c.id}`);
                            if(el) {
                                el.classList.add('flash-warning');
                                setTimeout(() => el.classList.remove('flash-warning'), 1000);
                            }
                        });

                        logConsole(`ERROR 1451 (23000): Cannot delete or update a parent row: a foreign key constraint fails.`, true);
                        showToast(`ลบไม่ได้! ติดกฏ RESTRICT เนื่องจากยังมีพนักงานแผนก 1 อยู่`, 'error');
                    } else {
                        // Note: Normally it would delete, but in this demo we ensure there are always children initially.
                    }
                } else if (mode === 'CASCADE') {
                    // Action: DESTROY ALL! Domino Animation

                    deleteBtn.disabled = true; // prevent double click

                    // 1. Animate Child rows dissolving
                    dependentChildren.forEach(c => {
                        const el = document.getElementById(`child-row-${c.id}`);
                        if(el) el.classList.add('dissolve-anim');
                    });

                    // 2. Animate Parent row dissolving slightly after
                    setTimeout(() => {
                        const pEl = document.getElementById(`parent-row-${targetDeptId}`);
                        if(pEl) pEl.classList.add('dissolve-anim');
                    }, 400);

                    // 3. Update actual data state and re-render after animation completes
                    setTimeout(() => {
                        // Remove from data
                        children = children.filter(c => c.dept_id !== targetDeptId);
                        parents = parents.filter(p => p.id !== targetDeptId);

                        renderTables();
                        logConsole(`Query OK, 1 row affected.<br><span class="text-slate-400 text-xs">(And ${dependentChildren.length} child rows deleted via CASCADE)</span>`, false);
                        showToast(`เอฟเฟกต์โดมิโน! ข้อมูลแม่และลูกถูกลบทิ้งทั้งหมด`, 'success');

                        deleteBtn.disabled = false;
                    }, 1200); // Wait for dissolve-anim to finish
                }
            });

            // --- Reset Action ---
            resetBtn.addEventListener('click', () => {
                parents = JSON.parse(JSON.stringify(initialParents));
                children = JSON.parse(JSON.stringify(initialChildren));
                renderTables();
                consoleText.innerHTML = `<span class="text-slate-500 italic">> Database Reset Complete...</span>`;
                showToast('รีเซ็ตข้อมูลกลับเป็นค่าเริ่มต้น', 'info');
                if (helperTip) helperTip.style.display = 'flex';
            });

            // Init
            renderTables();
        });
    </script>

</body>
</html>
-----------------------------------------------------------------------------------------------------------------------------------
- 2.12 การลบตาราง (DROP TABLE)
<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>2.12 การลบตาราง (DROP TABLE) - SQL Course</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@300;400;500;600;700&family=Fira+Code:wght@400;500;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['"Noto Sans Thai"', 'sans-serif'],
                        mono: ['"Fira Code"', 'monospace'],
                    },
                    colors: {
                        mysql: {
                            blue: '#00758F',
                            orange: '#F29111',
                            dark: '#1e293b'
                        },
                        code: {
                            keyword: '#c678dd',
                            string: '#98c379',
                            number: '#d19a66',
                            type: '#e5c07b',
                            identifier: '#e06c75',
                            comment: '#5c6370',
                            error: '#f43f5e'
                        }
                    }
                }
            }
        }
    </script>
    
    <style>
        body {
            background-color: #f8fafc;
            color: #334155;
        }
        
        .pop-in { animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        @keyframes popIn {
            0% { transform: scale(0.9); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
        }

        @keyframes shakeDanger {
            0%, 100% { transform: translateX(0); }
            20%, 60% { transform: translateX(-6px) rotate(-2deg); }
            40%, 80% { transform: translateX(6px) rotate(2deg); }
        }
        .shake-danger { animation: shakeDanger 0.5s ease-in-out; border-color: #f43f5e !important; box-shadow: 0 0 0 3px rgba(244, 63, 94, 0.3) !important;}

        @keyframes explodeTable {
            0% { transform: scale(1); opacity: 1; filter: brightness(1) sepia(0); }
            20% { transform: scale(1.1); filter: brightness(1.5) sepia(1) hue-rotate(-50deg) saturate(5); }
            50% { transform: scale(0.9) rotate(5deg); opacity: 0.8; filter: blur(2px) brightness(2) sepia(1) hue-rotate(-50deg) saturate(10); background-color: #ef4444; }
            100% { transform: scale(0) translateY(50px); opacity: 0; filter: blur(10px); display: none; }
        }
        .explode-anim { animation: explodeTable 1s forwards cubic-bezier(0.55, 0.085, 0.68, 0.53); pointer-events: none; }

        .table-card { transition: all 0.3s ease; }
        .table-card:hover { transform: translateY(-4px); box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1); }
        .table-card.selected { border-color: #f43f5e; box-shadow: 0 0 0 4px rgba(244, 63, 94, 0.2); }

        /* Code Editor Theme */
        .code-editor { background-color: #282c34; color: #abb2bf; font-family: 'Fira Code', monospace; tab-size: 4; }

        /* Modal Overlay */
        #confirmModal, #navModal { visibility: hidden; opacity: 0; transition: all 0.2s ease; }
        #confirmModal.show, #navModal.show { visibility: visible; opacity: 1; }

        /* Toast */
        #toast { visibility: hidden; opacity: 0; transition: visibility 0s, opacity 0.3s linear; transform: translateY(20px); }
        #toast.show { visibility: visible; opacity: 1; transform: translateY(0); }

        /* Connection Line */
        .fk-connection {
            position: absolute;
            border-left: 2px dashed #94a3b8;
            border-bottom: 2px dashed #94a3b8;
            width: 30px;
            height: 60px;
            left: 50%;
            top: 100%;
            transform: translateX(-50%);
            z-index: 0;
        }
    </style>

</head>

<body class="antialiased min-h-screen flex flex-col relative">

    <header class="bg-gradient-to-r from-mysql-blue to-cyan-900 text-white shadow-lg sticky top-0 z-40">
        <div class="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
            <div class="flex items-center gap-3">
                <i class="fa-solid fa-database text-mysql-orange text-3xl"></i>
                <div>
                    <h1 class="text-xl font-bold leading-tight">SQL Course (21901-2001)</h1>
                    <p class="text-sm text-cyan-200">Unit 2: งานจัดการตาราง (Table Management)</p>
                </div>
            </div>
            <div class="hidden sm:block">
                <span class="bg-rose-500/80 px-3 py-1 rounded-full text-sm font-medium border border-rose-300/30 backdrop-blur-sm shadow-inner">
                    บทที่ 2.12 การลบตาราง (DROP TABLE)
                </span>
            </div>
        </div>
    </header>

    <main class="flex-grow max-w-5xl mx-auto px-4 py-8 w-full space-y-12">

        <section class="text-center space-y-4 max-w-3xl mx-auto">
            <h2 class="text-3xl md:text-4xl font-bold text-slate-800">1. ทำลายทิ้งอย่างถาวรด้วย DROP TABLE</h2>
            <p class="text-lg text-slate-600 leading-relaxed">
                ในบรรดาคำสั่ง DDL ทั้งหมด <code>DROP TABLE</code> คือคำสั่งที่ต้องใช้ด้วยความระมัดระวังที่สุด เพราะมันจะทำการ <strong>ลบโครงสร้างตาราง พร้อมกับข้อมูลทุกแถวที่อยู่ข้างในทิ้งไปอย่างถาวร</strong> และไม่สามารถกด Undo กลับมาได้ครับ!
            </p>
        </section>

        <section class="bg-slate-800 rounded-3xl p-6 md:p-8 shadow-xl text-white relative overflow-hidden">
            <div class="absolute -right-10 -bottom-10 text-slate-700/40 z-0 transform rotate-12">
                <i class="fa-solid fa-dumpster-fire text-9xl" style="font-size: 15rem;"></i>
            </div>

            <h3 class="text-xl font-bold mb-4 flex items-center gap-2 relative z-10 text-rose-400">
                <i class="fa-solid fa-code"></i> โครงสร้างไวยากรณ์ (Syntax)
            </h3>

            <div class="code-editor p-5 rounded-xl text-sm leading-relaxed shadow-inner border border-slate-700 overflow-x-auto relative z-10 mb-6">

<pre><code><span class="syntax-comment">-- ลบตารางปกติ (ถ้าพิมพ์ชื่อตารางผิด หรือตารางไม่มีอยู่จริง จะเกิด Error)</span>
<span class="syntax-keyword">DROP TABLE</span> <span class="syntax-identifier">table_name</span><span class="syntax-punctuation">;</span>

<span class="syntax-comment">-- ลบแบบปลอดภัย (ตรวจสอบก่อนว่ามีตารางนี้อยู่จริงไหม ค่อยลบ จะไม่เกิด Error)</span>
<span class="syntax-keyword">DROP TABLE IF EXISTS</span> <span class="syntax-identifier">table_name</span><span class="syntax-punctuation">;</span></code></pre>

            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                <div class="bg-slate-900/60 border border-slate-700 p-4 rounded-xl">
                    <h4 class="font-bold text-sky-400 mb-2"><i class="fa-solid fa-eraser mr-2"></i>TRUNCATE vs DROP</h4>
                    <p class="text-sm text-slate-300">
                        ถ้าอยากลบแค่ "ข้อมูลข้างใน" ให้เกลี้ยง แต่ยังคงโครงสร้างตาราง (คอลัมน์ต่างๆ) เอาไว้ให้ใช้คำสั่ง <code class="text-sky-300">TRUNCATE TABLE</code> แทนครับ
                    </p>
                </div>
                <div class="bg-rose-900/30 border border-rose-800/50 p-4 rounded-xl">
                    <h4 class="font-bold text-rose-400 mb-2"><i class="fa-solid fa-shield-halved mr-2"></i>ข้อควรระวัง (Foreign Key)</h4>
                    <p class="text-sm text-slate-300">
                        คุณ <strong>ไม่สามารถ</strong> สั่งลบตารางหลัก (Parent Table) ได้ หากยังมีตารางลูก (Child Table) อ้างอิง Foreign Key ถึงตารางนี้อยู่ (ต้องลบลูกก่อน ค่อยลบแม่)
                    </p>
                </div>
            </div>
        </section>

        <section class="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm relative z-10">
            <div class="flex items-center gap-3 mb-8 border-b border-slate-100 pb-4">
                <i class="fa-solid fa-bomb text-rose-500 text-3xl"></i>
                <div>
                    <h2 class="text-2xl font-bold text-slate-800">2. Interactive: The Demolition Zone</h2>
                    <p class="text-slate-600 text-sm mt-1">ฐานข้อมูล <code>company_db</code> มี 3 ตาราง ลองเลือกลบตารางที่ไม่จำเป็นทิ้งดูครับ สังเกตปฏิกิริยาของระบบให้ดี!</p>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">

                <!-- Left: Control Panel -->
                <div class="lg:col-span-5 space-y-6">

                    <div class="bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-inner" id="controlPanel">
                        <h4 class="font-bold text-slate-700 mb-4 border-b pb-2"><i class="fa-solid fa-terminal mr-2 text-slate-500"></i>คำสั่งดำเนินการ</h4>

                        <div class="space-y-5">
                            <!-- Select Table -->
                            <div>
                                <label class="block text-sm font-semibold text-slate-600 mb-2">1. เลือกตารางเป้าหมาย</label>
                                <select id="tableSelect" class="w-full px-4 py-3 border border-slate-300 rounded-xl text-sm font-mono outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 bg-white cursor-pointer shadow-sm">
                                    <option value="" disabled selected>-- เลือกตารางที่จะลบ --</option>
                                    <option value="temp_logs">temp_logs (ข้อมูลชั่วคราว)</option>
                                    <option value="employees">employees (พนักงาน - ตารางลูก)</option>
                                    <option value="departments">departments (แผนก - ตารางแม่)</option>
                                </select>
                            </div>

                            <!-- IF EXISTS Toggle -->
                            <div class="bg-white p-3 rounded-xl border border-slate-200 flex justify-between items-center cursor-pointer hover:border-slate-300 transition-colors" id="ifExistsToggleWrapper">
                                <div>
                                    <div class="text-sm font-bold font-mono text-slate-700">IF EXISTS</div>
                                    <div class="text-xs text-slate-500">ใส่เพื่อป้องกัน Error หากตารางไม่มีอยู่จริง</div>
                                </div>
                                <div class="relative">
                                    <input type="checkbox" id="ifExistsToggle" class="sr-only">
                                    <div class="block bg-slate-200 w-10 h-6 rounded-full transition-colors toggle-bg border border-slate-300"></div>
                                    <div class="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform shadow-sm"></div>
                                </div>
                            </div>

                            <button id="prepareDropBtn" class="w-full bg-gradient-to-r from-rose-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-4 px-4 rounded-xl transition-all shadow-md hover:shadow-rose-500/30 active:scale-95 flex items-center justify-center gap-2 mt-2 opacity-50 cursor-not-allowed" disabled>
                                <i class="fa-solid fa-dumpster-fire text-lg"></i> สั่งทำลายตาราง!
                            </button>
                        </div>
                    </div>

                    <!-- Live SQL Preview -->
                    <div class="bg-[#282c34] rounded-xl p-4 shadow-xl border border-slate-800" id="previewBox">
                        <div class="text-xs font-mono text-slate-400 mb-2 border-b border-slate-700 pb-1">MySQL Console:</div>
                        <div id="sqlPreviewText" class="text-sm font-mono text-cyan-300 break-words min-h-[20px]">
                            <span class="text-slate-500 italic">> SELECT * FROM information_schema.tables;</span>
                        </div>
                    </div>

                </div>

                <!-- Right: Visual Database Schema -->
                <div class="lg:col-span-7 bg-slate-100 border border-slate-200 rounded-2xl p-6 shadow-inner relative flex flex-col items-center justify-center min-h-[400px]" id="schemaCanvas">

                    <div class="absolute top-4 left-4 font-bold text-slate-400 text-sm flex items-center gap-2">
                        <i class="fa-solid fa-server"></i> Database: company_db
                    </div>

                    <div class="w-full max-w-md relative mt-4">

                        <!-- Table: temp_logs (Independent) -->
                        <div class="table-card bg-white p-4 rounded-xl border-2 border-slate-300 shadow-sm flex items-center justify-between mb-8" id="tbl-temp_logs">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500 text-xl border border-slate-200">
                                    <i class="fa-solid fa-file-lines"></i>
                                </div>
                                <div>
                                    <h4 class="font-bold text-slate-800 font-mono">temp_logs</h4>
                                    <p class="text-xs text-slate-500">12,450 rows | <span class="text-emerald-500">Safe to drop</span></p>
                                </div>
                            </div>
                            <span class="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded font-bold">Independent</span>
                        </div>

                        <!-- Table: departments (Parent) -->
                        <div class="table-card bg-white p-4 rounded-xl border-2 border-slate-300 shadow-sm flex items-center justify-between relative z-10" id="tbl-departments">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 bg-mysql-orange/10 rounded-lg flex items-center justify-center text-mysql-orange text-xl border border-mysql-orange/20">
                                    <i class="fa-solid fa-building"></i>
                                </div>
                                <div>
                                    <h4 class="font-bold text-slate-800 font-mono">departments <i class="fa-solid fa-key text-mysql-orange text-[10px] ml-1"></i></h4>
                                    <p class="text-xs text-slate-500">5 rows | Parent Table</p>
                                </div>
                            </div>
                            <span class="text-xs bg-rose-100 text-rose-600 px-2 py-1 rounded font-bold" id="deptBadge">Referenced</span>
                        </div>

                        <!-- Foreign Key Connection Line -->
                        <div id="fkLine" class="absolute left-1/2 w-0.5 bg-slate-400 z-0 border-l-2 border-dashed border-sky-400" style="height: 40px; top: 180px; transform: translateX(-50%);">
                            <div class="absolute top-1/2 left-2 text-[10px] font-bold text-sky-500 bg-slate-100 px-1 py-0.5 rounded border border-sky-200 transform -translate-y-1/2 whitespace-nowrap">
                                <i class="fa-solid fa-link"></i> FOREIGN KEY
                            </div>
                        </div>

                        <!-- Table: employees (Child) -->
                        <div class="table-card bg-white p-4 rounded-xl border-2 border-slate-300 shadow-sm flex items-center justify-between relative z-10" style="margin-top: 40px;" id="tbl-employees">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 bg-mysql-blue/10 rounded-lg flex items-center justify-center text-mysql-blue text-xl border border-mysql-blue/20">
                                    <i class="fa-solid fa-users"></i>
                                </div>
                                <div>
                                    <h4 class="font-bold text-slate-800 font-mono">employees</h4>
                                    <p class="text-xs text-slate-500">142 rows | Child Table</p>
                                </div>
                            </div>
                            <span class="text-xs bg-sky-100 text-sky-600 px-2 py-1 rounded font-bold">Has FK</span>
                        </div>

                    </div>

                    <!-- Empty State (Hidden initially) -->
                    <div id="emptyDatabase" class="hidden absolute inset-0 flex-col items-center justify-center text-slate-400">
                        <i class="fa-solid fa-wind text-6xl mb-4 opacity-50"></i>
                        <h3 class="text-xl font-bold">Database is Empty</h3>
                        <p class="text-sm">คุณลบตารางทิ้งไปหมดแล้ว!</p>
                        <button onclick="location.reload()" class="mt-4 bg-slate-200 hover:bg-slate-300 text-slate-700 px-4 py-2 rounded-lg text-sm font-bold transition-colors">
                            <i class="fa-solid fa-rotate-right mr-1"></i> รีเซ็ตหน้าเว็บ
                        </button>
                    </div>

                </div>

            </div>
        </section>


        <!-- Confirm Drop Modal -->
        <div id="confirmModal" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm">
            <div class="bg-white rounded-3xl p-6 md:p-8 max-w-sm w-full mx-4 shadow-2xl pop-in text-center border-t-8 border-rose-600">
                <div class="w-24 h-24 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-5 text-rose-600 text-5xl relative">
                    <i class="fa-solid fa-triangle-exclamation absolute animate-ping opacity-20"></i>
                    <i class="fa-solid fa-triangle-exclamation relative z-10"></i>
                </div>
                <h3 class="text-2xl font-bold text-slate-900 mb-2">คุณแน่ใจหรือไม่?</h3>
                <p class="text-slate-600 mb-6 leading-relaxed">
                    คำสั่งนี้จะทำลายตาราง <br>
                    <strong id="confirmTableName" class="text-rose-600 font-mono text-xl bg-rose-50 px-3 py-1 rounded-lg border border-rose-200 inline-block mt-2 mb-1 shadow-sm"></strong><br>
                    <span class="text-sm font-bold text-rose-500">ข้อมูลทั้งหมดจะสูญหายอย่างถาวร!</span>
                </p>
                <div class="flex gap-3">
                    <button id="cancelDropBtn" class="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 px-4 rounded-xl transition-colors">
                        ยกเลิก
                    </button>
                    <button id="confirmDropBtn" class="flex-[1.5] bg-gradient-to-r from-rose-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg shadow-rose-500/40 transform hover:scale-105">
                        <i class="fa-solid fa-skull-crossbones mr-1"></i> ยืนยันทำลาย!
                    </button>
                </div>
            </div>
        </div>

        <!-- Navigation Message Modal -->
        <div id="navModal" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm">
            <div class="bg-white rounded-3xl p-6 md:p-8 max-w-sm w-full mx-4 shadow-2xl pop-in text-center border-t-8 border-emerald-500">
                <div class="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-500 text-4xl">
                    <i class="fa-solid fa-graduation-cap"></i>
                </div>
                <h3 class="text-xl font-bold text-slate-800 mb-2">ยินดีด้วยครับ!</h3>
                <p class="text-slate-600 mb-6" id="navModalText">
                    คุณเรียนจบเนื้อหา <strong>Unit 2: งานจัดการตาราง (DDL)</strong> ครบถ้วนแล้ว!<br><br>พร้อมแล้วไปลุยต่อที่ <strong>Unit 3: งานจัดการข้อมูล (DML)</strong> กันเลยครับ!
                </p>
                <button onclick="document.getElementById('navModal').classList.remove('show')" class="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 px-4 rounded-xl transition-colors">
                    ตกลง (OK)
                </button>
            </div>
        </div>

        <div class="flex justify-between items-center pt-8 border-t border-slate-200">
            <button class="text-slate-500 hover:text-mysql-blue transition-colors flex items-center gap-2" onclick="location.href='#'" title="กลับไป 2.11 CASCADE">
                <i class="fa-solid fa-arrow-left"></i> 2.11 CASCADE
            </button>
            <button class="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-emerald-500/30 flex items-center gap-2 transform hover:-translate-y-1" onclick="document.getElementById('navModal').classList.add('show')">
                จบบทเรียนหน่วยที่ 2 (DDL) <i class="fa-solid fa-flag-checkered"></i>
            </button>
        </div>

    </main>

    <!-- Custom Toast Notification -->
    <div id="toast" class="fixed bottom-5 right-5 bg-slate-800 text-white px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-3 border-l-4">
        <i id="toastIcon" class="fa-solid text-xl"></i>
        <div id="toastMsg" class="font-medium text-sm">Message</div>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', () => {

            // --- Toast Logic ---
            const toast = document.getElementById('toast');
            const toastMsg = document.getElementById('toastMsg');
            const toastIcon = document.getElementById('toastIcon');
            let toastTimeout;

            function showToast(message, type) {
                clearTimeout(toastTimeout);
                toastMsg.innerHTML = message;
                toast.className = 'fixed bottom-5 right-5 bg-slate-800 text-white px-6 py-4 rounded-xl shadow-2xl z-50 flex items-center gap-3 border-l-4 transition-transform duration-300';
                toastIcon.className = 'fa-solid text-xl';

                if (type === 'success') {
                    toast.classList.add('border-emerald-500');
                    toastIcon.classList.add('fa-circle-check', 'text-emerald-500');
                } else if (type === 'error') {
                    toast.classList.add('border-rose-500');
                    toastIcon.classList.add('fa-shield-halved', 'text-rose-500');
                } else {
                    toast.classList.add('border-sky-500');
                    toastIcon.classList.add('fa-info-circle', 'text-sky-500');
                }

                toast.classList.add('show');
                toastTimeout = setTimeout(() => { toast.classList.remove('show'); }, 4000);
            }

            // --- State Management ---
            let tablesState = {
                'temp_logs': { exists: true, isParent: false, isChild: false },
                'employees': { exists: true, isParent: false, isChild: true }, // Depends on departments
                'departments': { exists: true, isParent: true, isChild: false } // Parent of employees
            };

            // DOM Elements
            const tableSelect = document.getElementById('tableSelect');
            const ifExistsToggle = document.getElementById('ifExistsToggle');
            const ifExistsToggleWrapper = document.getElementById('ifExistsToggleWrapper');
            const toggleDot = document.querySelector('.dot');
            const toggleBg = document.querySelector('.toggle-bg');
            const prepareDropBtn = document.getElementById('prepareDropBtn');
            const sqlPreviewText = document.getElementById('sqlPreviewText');
            const controlPanel = document.getElementById('controlPanel');

            const confirmModal = document.getElementById('confirmModal');
            const confirmTableName = document.getElementById('confirmTableName');
            const cancelDropBtn = document.getElementById('cancelDropBtn');
            const confirmDropBtn = document.getElementById('confirmDropBtn');

            // --- UI Interaction Logic ---

            // IF EXISTS Toggle
            ifExistsToggleWrapper.addEventListener('click', () => {
                ifExistsToggle.checked = !ifExistsToggle.checked;
                if (ifExistsToggle.checked) {
                    toggleDot.style.transform = 'translateX(100%)';
                    toggleBg.classList.replace('bg-slate-200', 'bg-sky-500');
                    toggleBg.classList.replace('border-slate-300', 'border-sky-600');
                } else {
                    toggleDot.style.transform = 'translateX(0)';
                    toggleBg.classList.replace('bg-sky-500', 'bg-slate-200');
                    toggleBg.classList.replace('border-sky-600', 'border-slate-300');
                }
                updateSqlPreview();
            });

            // Table Selection
            tableSelect.addEventListener('change', () => {
                const selected = tableSelect.value;

                // Highlight corresponding card
                document.querySelectorAll('.table-card').forEach(card => card.classList.remove('selected'));
                const card = document.getElementById(`tbl-${selected}`);
                if(card) {
                    card.classList.add('selected');
                }

                // Enable button
                prepareDropBtn.disabled = false;
                prepareDropBtn.classList.remove('opacity-50', 'cursor-not-allowed');

                updateSqlPreview();
            });

            function updateSqlPreview() {
                const tbl = tableSelect.value;
                if(!tbl) return;

                let sql = `<span class="syntax-keyword">DROP TABLE</span> `;
                if (ifExistsToggle.checked) {
                    sql += `<span class="syntax-keyword">IF EXISTS</span> `;
                }
                sql += `<span class="syntax-identifier">${tbl}</span><span class="syntax-punctuation">;</span>`;

                sqlPreviewText.innerHTML = `> ${sql}`;
            }

            function logConsole(msg, isError=false) {
                const color = isError ? 'text-rose-400' : 'text-emerald-400';
                const html = `<div class="mt-2 ${color} border-t border-slate-700 border-dashed pt-2">${msg}</div>`;
                sqlPreviewText.innerHTML += html;
            }

            // --- Execution Logic ---

            prepareDropBtn.addEventListener('click', () => {
                const tbl = tableSelect.value;
                if(!tbl) return;

                // Check if table actually exists in our state (simulating IF EXISTS logic)
                if (!tablesState[tbl].exists) {
                    if (ifExistsToggle.checked) {
                        // Safe: Just a warning, no error
                        updateSqlPreview();
                        logConsole(`Query OK, 0 rows affected, 1 warning.<br><span class="text-amber-400 text-xs">Warning: Unknown table 'company_db.${tbl}'</span>`, false);
                        showToast(`ข้ามการทำงาน: ตาราง ${tbl} ไม่มีอยู่แล้ว (รอด Error เพราะใส่ IF EXISTS)`, 'info');
                    } else {
                        // Unsafe: Error!
                        controlPanel.classList.add('shake-danger');
                        setTimeout(() => controlPanel.classList.remove('shake-danger'), 500);
                        updateSqlPreview();
                        logConsole(`ERROR 1051 (42S02): Unknown table 'company_db.${tbl}'`, true);
                        showToast(`ERROR! พยายามลบตารางที่ไม่มีอยู่จริง (ลืมใส่ IF EXISTS)`, 'error');
                    }
                    return;
                }

                // Proceed to confirmation modal
                confirmTableName.textContent = tbl;
                confirmModal.classList.add('show');
            });

            cancelDropBtn.addEventListener('click', () => {
                confirmModal.classList.remove('show');
            });

            confirmDropBtn.addEventListener('click', () => {
                confirmModal.classList.remove('show');
                const tbl = tableSelect.value;

                updateSqlPreview(); // Print the command

                // Rule Check: Cannot drop Parent if Child exists
                if (tbl === 'departments' && tablesState['employees'].exists) {
                    // ERROR!
                    controlPanel.classList.add('shake-danger');
                    setTimeout(() => controlPanel.classList.remove('shake-danger'), 500);

                    // Shake the parent and child cards to show dependency
                    document.getElementById('tbl-departments').style.animation = 'shakeDanger 0.5s';
                    document.getElementById('tbl-employees').style.animation = 'shakeDanger 0.5s';
                    setTimeout(() => {
                        document.getElementById('tbl-departments').style.animation = '';
                        document.getElementById('tbl-employees').style.animation = '';
                    }, 500);

                    logConsole(`ERROR 3730 (HY000): Cannot drop table '${tbl}' referenced by a foreign key constraint 'fk_emp_dept' on table 'employees'.`, true);
                    showToast(`ลบไม่ได้! ตาราง departments ถูกอ้างอิงอยู่โดยตาราง employees (ติด Foreign Key)`, 'error');
                    return;
                }

                // SUCCESS: Proceed with drop

                // 1. Play Explosion Animation
                const card = document.getElementById(`tbl-${tbl}`);
                if(card) {
                    card.classList.add('explode-anim');
                }

                // Hide FK line if either parent or child is dropped
                if (tbl === 'departments' || tbl === 'employees') {
                    const fkLine = document.getElementById('fkLine');
                    if(fkLine) fkLine.style.display = 'none';

                    // If employees dropped, departments is no longer referenced
                    if (tbl === 'employees') {
                        const badge = document.getElementById('deptBadge');
                        if(badge) {
                            badge.className = "text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded font-bold transition-all";
                            badge.textContent = "Safe to drop";
                        }
                    }
                }

                // 2. Update State
                tablesState[tbl].exists = false;

                // 3. Log Success
                setTimeout(() => {
                    logConsole(`Query OK, 0 rows affected.`, false);
                    showToast(`ทำลายตาราง ${tbl} ถาวรแล้ว!`, 'success');

                    // Check if all dropped
                    if(!tablesState['temp_logs'].exists && !tablesState['employees'].exists && !tablesState['departments'].exists) {
                        document.getElementById('emptyDatabase').classList.remove('hidden');
                        document.getElementById('emptyDatabase').classList.add('flex');
                    }

                    // Optional: remove option from dropdown to force user to see the "IF EXISTS" error feature if they try to drop again by manipulating DOM, but for standard flow we leave it so they CAN try to drop it again and test "IF EXISTS"

                }, 800); // Wait for explosion animation
            });

        });
    </script>

</body>
</html>
-----
ปรับไฟล์ที่เก็บให้สามารถรู้ได้ว่าเป็นของวิชาไหน บทที่เท่าไร่ หัวเรื่องใด ตอนนี้มีแต่ชื่อไฟล์ ตามแก้ไม่ถูก

components
