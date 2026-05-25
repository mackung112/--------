# LMS-React Frontend Design & System Architecture Standards (PipelinePro Style)

เอกสารนี้คือ "Source of Truth" และ "Strict Guidelines" สำหรับ AI Agent ในการพัฒนา เพื่อรักษาความสมบูรณ์ของสถาปัตยกรรมและมาตรฐาน UI/UX ของระบบ LMS-React ให้เป็นมาตรฐานเดียวกัน 100% โดยอิงตามระบบการออกแบบ **PipelinePro**

---

## 1. Project Context & Architecture

LMS-React คือระบบจัดการการเรียนรู้แบบ Single Page Application (SPA) ที่เน้นการทำ "In-browser Simulation" สำหรับวิชาสายโปรแกรมเมอร์ (PY21910, OOP21910, SQL21901) โดยนำโครงสร้างและการควบคุมส่วนต่อประสานผู้ใช้ที่มีความหนักแน่นและเป็นสัดส่วนของ **PipelinePro** มาประยุกต์ใช้เพื่อความเป็นมืออาชีพและจัดการข้อมูลที่หนาแน่นได้อย่างชัดเจน

- **Framework**: React 18+ (Functional Components & Hooks)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS (Strictly no external CSS - อ้างอิงตามค่าสเปกสีและ Typography ของ PipelinePro)
- **Icons**: lucide-react (size=20, strokeWidth=2)
- **State**: Local State focus for Simulators (ห้ามใช้ Global State สำหรับ Simulator รายชิ้น)
- **Directory Structure**:
    - `src/components/interactive/`: ที่อยู่ของ Simulator/Interactives ทั้งหมด
    - `src/data/`: ที่อยู่ของไฟล์หลักสูตร (oopCourse.js, sqlCourse.js)
    - `docs/`: ไฟล์ Markdown สำหรับเนื้อหาภาคทฤษฎี

---

## 2. PipelinePro Design Tokens

### 2.1 Color Palette (Strict Hex Codes & Tailwind Mappings)

| Token | Hex Code | Tailwind Usage | Description / Usage |
| :--- | :--- | :--- | :--- |
| **Primary** | `#4F46E5` | `indigo-600` | Actions หลัก, สถานะของ Pipeline ที่ใช้งานอยู่, ปุ่ม CTA สำคัญ |
| **Secondary** | `#06B6D4` | `cyan-500` | ไฮเปอร์ลิงก์, ไฮไลต์รอง, สัญลักษณ์แสดงมูลค่าหรือจุดเน้น |
| **Tertiary** | `#F97316` | `orange-500` | สัญลักษณ์แจ้งเตือนความเร่งด่วน, งานที่ใกล้ครบกำหนด, ลีดการเรียนรู้เร่งด่วน |
| **Background** | `#FAFAFA` | `[#FAFAFA]` | พื้นหลังหลักของแอปพลิเคชัน (App-level Canvas) |
| **Surface** | `#FFFFFF` | `white` | พื้นผิวของโมดูลาร์ เช่น การ์ด, หน้าต่างป็อปอัป (Modals), และแผงรายละเอียด |
| **Success** | `#22C55E` | `green-500` | แจ้งผลลัพธ์ผ่านด่านสำเร็จ, การกระทำเชิงบวก |
| **Warning** | `#F59E0B` | `amber-500` | การแจ้งเตือนที่ต้องการความระมัดระวัง |
| **Error** | `#EF4444` | `red-500` | ข้อผิดพลาด, การกระทำที่เป็นอันตรายหรือลบข้อมูล, การทดสอบ Simulator ล้มเหลว |
| **Info** | `#4F46E5` | `indigo-600` | ข้อมูลทั่วไปและการแนะแนวระบบ |

### 2.2 Typography Scale & Thai Rules

- **Font Family**: Outfit (สำหรับ Headlines / Display), Inter (สำหรับ Body / UI Elements), Source Code Pro (สำหรับ Code / Mono font), Noto Sans Thai (ภาษาไทยสำรอง)
- **Thai Rule**: บังคับใช้ `leading-relaxed` (line-height: 1.625) หรือ `leading-loose` สำหรับภาษาไทยทุกจุดเพื่อป้องกันสระและวรรณยุกต์ทับซ้อนกัน
- **Scale Definition**:
    - **Display**: Outfit `text-[52px] font-bold leading-[1.1] tracking-[-0.02em]` (ใช้สำหรับตัวเลขสถิติฮีโร่หรือแดชบอร์ดหลัก)
    - **Headline**: Outfit `text-[38px] font-bold leading-[1.2] tracking-[-0.015em] text-zinc-900` (ใช้สำหรับหัวข้อหน้าหลัก, ชื่อบอร์ดหลัก)
    - **Subhead**: Outfit `text-[26px] font-semibold leading-[1.3] tracking-[-0.01em] text-zinc-900` (ใช้สำหรับหัวข้อขั้นตอนย่อย, หัวข้อเซกชัน)
    - **Body Large**: Inter `text-[18px] font-normal leading-[1.6] text-zinc-600` (ใช้สำหรับบทนำ, สรุปเนื้อหาสำคัญ)
    - **Body**: Inter `text-[15px] font-normal leading-[1.6] text-zinc-600` (ข้อความเนื้อหาทั่วไป / ค่าเริ่มต้น)
    - **Body Small**: Inter `text-[14px] font-normal leading-[1.5] text-zinc-500` (เนื้อหาในการ์ด, ตาราง, คำอธิบายสั้น)
    - **Caption**: Inter `text-[12px] font-medium leading-[1.4] tracking-[0.01em] text-zinc-500` (บันทึกเวลา, ตัวเลขนับสถานะ, ป้ายกำกับเล็ก)
    - **Overline**: Inter `text-[11px] font-bold leading-[1.2] tracking-[0.09em] uppercase text-zinc-500` (ชื่อหมวดหมู่ย่อย, แท็กสถานะ ตัวพิมพ์ใหญ่ทั้งหมด)
    - **Code**: Source Code Pro `text-[14px] font-mono leading-[1.5] text-zinc-800` (ซอร์สโค้ดในโปรแกรมจำลอง, คีย์จำลอง, สูตรคำนวณ)

### 2.3 Spacing & Layout

- **Base Unit**: `4px`
- **Scale**: `0` (0px), `1` (4px), `2` (8px), `3` (12px), `4` (16px), `5` (20px), `6` (24px), `8` (32px), `10` (40px), `12` (48px), `16` (64px), `20` (80px)
- **Component Padding**:
    - Small: `8px` (p-2)
    - Medium: `12px` (p-3)
    - Large: `16px` (p-4)
- **Section Spacing**:
    - Mobile: `24px` (my-6 / py-6)
    - Tablet: `40px` (my-10 / py-10)
    - Desktop: `56px` (my-14 / py-14)
- **Layout (LMS-React Preserved)**:
    - **Margin Desktop**: 2rem (m-8)
    - **Margin Mobile**: 1rem (m-4)
    - **Gutter**: 1.5rem (gap-6)
    - **Container Max**: 1280px (`max-w-7xl`)

### 2.4 Border Radius (NEW)

- **None (`rounded-none`)**: `0px` — ตาราง, เซลล์ข้อมูล, ป้ายข้อมูลแบบอินไลน์
- **Small (`rounded-sm`)**: `4px` — แท็กขนาดเล็ก, สัญลักษณ์บอกสถานะ
- **Medium (`rounded-lg`)**: `8px` — การ์ดทั่วไป, ปุ่มกด, ช่องกรอกข้อมูล (Inputs), หน้าต่าง Popups
- **Large (`rounded-xl`)**: `12px` — แผงควบคุมหลัก (Feature panels), หน้าต่างแนะนำขั้นตอนเริ่มต้น (Onboarding dialogs)
- **XL (`rounded-3xl`)**: `20px` — การ์ดโปรโมชันพิเศษ, หน้าแจ้งสถานะว่างเปล่า (Empty states)
- **Full (`rounded-full`)**: `9999px` — รูปโปรไฟล์ (Avatars), ป้ายข้อมูลแบบทรงแคปซูล, จุดแสดงสถานะ

### 2.5 Elevation & Shadow (NEW)

ใช้เงาแบบแบ่งชั้นระดับเลเยอร์สไตล์ Material เพื่อสร้างระดับมิติที่ชัดเจน:
- **Subtle**: `shadow-[0_1px_2px_0_rgba(24,24,27,0.05)]` ( offset 1px, blur 2px, #18181B โปร่งแสง 5%)
- **Medium**: `shadow-[0_4px_6px_-1px_rgba(24,24,27,0.07),0_2px_4px_-2px_rgba(24,24,27,0.05)]` (ใช้กับการ์ดปกติ)
- **Large**: `shadow-[0_10px_15px_-3px_rgba(24,24,27,0.08),0_4px_6px_-4px_rgba(24,24,27,0.04)]` (ใช้เมื่อ hover บนการ์ด)
- **Overlay**: `shadow-[0_20px_25px_-5px_rgba(24,24,27,0.12),0_8px_10px_-6px_rgba(24,24,27,0.06)]` (หน้าต่างป็อปอัปแจ้งเตือน)
- **Drag**: `shadow-[0_12px_24px_-4px_rgba(79,70,229,0.15)]` (เงาสี Indigo สำหรับการลากวัตถุหรือจัดกลุ่ม Simulator)

---

## 3. Component Standards (PipelinePro Style)

### 3.1 Buttons

ปุ่มต้องมีขนาดและสไตล์ตามที่กำหนดอย่างเคร่งครัด:
- **Primary (Filled)**: `bg-[#4F46E5] text-white hover:bg-[#4338CA] active:bg-[#3730A3] active:scale-98 font-semibold text-sm rounded-[8px] px-[18px] py-2 transition-all`
- **Secondary (Outline)**: `bg-transparent text-[#4F46E5] border border-[#4F46E5] hover:bg-[#EEF2FF] active:scale-98 font-semibold text-sm rounded-[8px] px-[18px] py-2 transition-all`
- **Ghost**: `bg-transparent text-[#71717A] hover:bg-[#F4F4F5] hover:text-[#18181B] rounded-[8px] px-3 py-2 transition-all`
- **Destructive**: `bg-[#EF4444] text-white hover:bg-[#DC2626] active:scale-98 font-semibold text-sm rounded-[8px] px-[18px] py-2 transition-all`
- **Button Sizes & Heights**:
    - **Small**: ความสูง `32px` (h-8)
    - **Medium**: ความสูง `38px` (h-[38px]) *[เป็นค่าเริ่มต้น]*
    - **Large**: ความสูง `46px` (h-[46px])
- **Disabled State**: ค่าความโปร่งใสลดลงเหลือ 40% (`opacity-40`) และใช้เมาส์แบบห้ามกด (`cursor-not-allowed`)

### 3.2 Inputs & Forms

- **Text Input**:
    ```html
    <input class="w-full h-[38px] px-3 py-2 bg-white border border-[#E4E4E7] text-[#18181B] placeholder-[#A1A1AA] text-sm rounded-[8px] focus:outline-none focus:border-[#4F46E5] focus:ring-3 focus:ring-[#4F46E5]/12 disabled:bg-[#FAFAFA] disabled:opacity-50 transition-all" />
    ```
- **Label**: วางไว้เหนือช่องป้อนข้อมูลเสมอ ใช้ฟอนต์ Inter ขนาด 13px น้ำหนักหนาปานกลาง (500) และสีโทน `#3F3F46`
    - **Tailwind**: `block text-[13px] font-medium text-[#3F3F46] mb-1`
- **Helper text**: ขนาดตัวหนังสือ 12px สี `#71717A`
    - **Tailwind**: `text-xs text-[#71717A] mt-1`
- **Error border & message**: ขอบของช่องป้อนข้อมูลจะเปลี่ยนเป็น `#EF4444` และแสดงข้อความด้วยสีแดง `#EF4444` ขนาด 12px

### 3.3 Immersive Full-Page Pattern (Standard ใหม่อ้างอิงจาก RAW DATA)

ผสานความต้องการสถาปัตยกรรม LMS Simulator เข้ากับการออกแบบที่เน้นความดึงดูดและสวยงามเต็มหน้าจอ:
- **Page Layout**: `min-h-screen bg-[#f8fafc] font-sans text-slate-800 pb-24`
- **Ambient Background**: `fixed inset-0 overflow-hidden pointer-events-none z-0` พร้อมด้วยวงกลมที่มีสีสันฟุ้งๆ เช่น `bg-blue-100/60 blur-[100px]` ที่มุมต่างๆ
- **Hero Header**: `relative pt-16 pb-12 z-10` ใช้ข้อความ gradient `text-transparent bg-clip-text bg-gradient-to-r` และมีแถบด้านซ้าย `border-l-4` ในส่วนคำอธิบาย
- **Simulator Container**: `bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden relative`
- **Teacher Task Container**: กล่องกิจกรรมที่อยู่ล่างสุดเสมอ มี `absolute inset-0 bg-gradient-to-r opacity-40 group-hover:opacity-100` พร้อมปุ่มคัดลอก และข้อความใบงาน
- **Console Output**: ไม่บังคับให้เป็นแถบดำยาวเต็มด้านล่างสุด สามารถเป็น Terminal Simulator บล็อกเล็ก หรือแสดงผลในรูปแบบการ์ดที่สอดคล้องกับการจำลองนั้นๆ ได้

### 3.4 Chips (NEW)

- **Filter Chip (ตัวกรองข้อมูล)**: มุมมน 8px (`rounded-[8px]`), ขอบ 1px สี `#E4E4E7`, ฟอนต์ Inter 13px หนา 500, ความสูงรวม `30px`, ระยะเยื้องซ้ายขวา 10px.
    - **Default state**: `border-[#E4E4E7] bg-white text-zinc-700 hover:bg-[#F4F4F5]`
    - **Selected state**: `bg-[#4F46E5] text-white border-transparent`
- **Status Chip (ป้ายแสดงสถานะ)**:
    - **Won (สำเร็จ)**: พื้นหลัง `#F0FDF4`, ตัวอักษรสี `#16A34A`, ขอบสี `#BBF7D0`
    - **At Risk (คำเตือน)**: พื้นหลัง `#FFF7ED`, ตัวอักษรสี `#EA580C`, ขอบสี `#FED7AA`
    - **Lost (ล้มเหลว)**: พื้นหลัง `#FEF2F2`, ตัวอักษรสี `#DC2626`, ขอบสี `#FECACA`
    - **Tailwind**: `inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border`

### 3.5 Lists (NEW)

- **Default List Item**: ฟอนต์ Inter 14px, ความสูง `44px`, ระยะ padding ซ้ายขวา 12px และบนล่าง 10px, ใช้เส้นแบ่งขอบล่าง 1px สี `#F4F4F5`, ไอคอนขนาด `18px` มีระยะห่างจากตัวหนังสือ `10px`
    - **Normal Hover**: พื้นหลังเปลี่ยนเป็นสี `#FAFAFA`
    - **Selected State**: พื้นหลังเป็น `#EEF2FF`, ตัวอักษรสี `#4F46E5`, เพิ่มขอบซ้ายหนา 2px สี `#4F46E5` (`border-l-2 border-[#4F46E5]`)

### 3.6 Checkboxes (NEW)

- **Checkbox**: ขนาด 16px (`w-4 h-4`), เส้นขอบรอบด้านหนา 1.5px สี `#D4D4D8` และมุมโค้งมนขนาด 4px (`rounded-[4px]`)
    - **Checked State**: พื้นหลังแสดงสี `#4F46E5` พร้อมเครื่องหมายถูกสีขาว
    - **Indeterminate State (เลือกบางส่วน)**: พื้นหลังแสดงสี `#4F46E5` พร้อมเส้นแนวนอนสีขาว
    - **Disabled**: ความโปร่งใส 40%
    - **Label**: ฟอนต์ Inter ขนาด 14px และห่างจากช่องติ๊ก 8px (`pl-2`)

### 3.7 Radio Buttons (NEW)

- **Radio Button**: วงกลมด้านนอกขนาด 16px, เส้นขอบหนา 1.5px สี `#D4D4D8`
    - **Selected State**: เส้นขอบเปลี่ยนเป็นสี `#4F46E5` และจุดกลมตรงกลางขนาด 8px จะแสดงสี `#4F46E5`
    - **Disabled**: ความโปร่งใส 40%
    - **Label**: ฟอนต์ Inter ขนาด 14px และห่างจากวงกลม 8px (`pl-2`)

### 3.8 Tooltips (NEW)

- **Tooltip**: สีพื้นหลังเป็น `#18181B`, สีตัวอักษรเป็น `#FAFAFA`, มุมมน 6px (`rounded-[6px]`), ฟอนต์ Inter ขนาด 12px ความหนา 500. ระยะเยื้องด้านใน บนล่าง 6px และ ซ้ายขวา 10px. ความกว้างสูงสุดจำกัดที่ `240px`, หัวลูกศรชี้ขนาด 6px, มีการหน่วงเวลาเปิดใช้งาน (Delay) 300ms และวางตำแหน่งด้านบน (Top) เป็นค่าเริ่มต้น.

---

## 4. Coding Protocols & AI Guardrails

- **Naming Convention**: `COURSE_UX_LX_Description.jsx` (ใช้ PascalCase สำหรับชื่อไฟล์)
- **State Management**: เน้นการใช้งาน Local State (`useState`, `useEffect`) ในแต่ละ Simulator. ห้ามนำข้อมูลเข้าไปเก็บใน Global State โดยไม่จำเป็นอย่างเด็ดขาดเพื่อความเป็นอิสระและประสิทธิภาพสูงสุด
- **Accessibility**: ทุกองค์ประกอบของ UI ที่สามารถคลิกได้ต้องมีขอบเขตการสัมผัส (Min-height / Min-width) อย่างน้อย 44px และต้องรองรับการควบคุมผ่านคีย์บอร์ด (Tab Key Navigation) อย่างถูกต้องสมบูรณ์
- **Thai Optimization**: ตรวจสอบการแสดงผลและวรรณยุกต์ภาษาไทยไม่ให้เกิดปัญหาสระลอยหรือชนซ้อน โดยใช้งานร่วมกับระบบ Spacing และค่า Line-height (`leading-relaxed` / `leading-loose`) ที่กำหนดไว้เสมอ
- **Interaction**: เมื่อมีการตอบสนองหรือตอบกลับความเคลื่อนไหว ต้องใช้ `active:scale-98 transition-all` เสมอ (ปรับจากระบบเดิม 95 เป็น 98 ตามมาตรฐาน PipelinePro) และให้แสดงผล Success/Error แบบเรียลไทม์ผ่านการเปลี่ยนสีของขอบการ์ดหรือพื้นหลังอย่างรวดเร็วและนุ่มนวล

---

## 5. AI Agent Execution Rules

1. **Read First**: ก่อนเริ่มต้นงานใดๆ AI ต้องสละเวลาอ่านซอร์สโค้ดต้นแบบในโฟลเดอร์ `src/components/interactive/` อย่างน้อย 1 ไฟล์ เพื่อศึกษาการตั้งโครงสร้างและสไตล์การพัฒนา Logic Simulation ของแอปนี้
2. **Refactoring**: ห้ามเข้าไปแก้ไขหรือดัดแปลงโครงสร้างแกนกลางของไฟล์ `App.jsx` หรือ `LessonViewer.jsx` โดยเด็ดขาด เว้นแต่จะได้รับคำสั่งเฉพาะ
3. **Consistency**: ทุกโมเดลการเรียนรู้หรือ Simulator ใหม่ที่สร้างขึ้น จำเป็นต้องมีปุ่มย้อนกลับสถานะดั้งเดิม (Reset / รีเซ็ต) โดยใช้ไอคอน `RotateCcw` จาก `lucide-react` และแสดงผลข้อความแจ้งเตือนเมื่อทำภารกิจสำเร็จเป็นภาษาไทยที่สุภาพเสมอ
4. **Data Integration**: เมื่อเพิ่มจุดโต้ตอบจำลอง (Interactive) ใหม่เข้ามา จะต้องเชื่อมต่อ Mapping ในระบบโครงสร้างข้อมูลหลักที่โฟลเดอร์ `src/data/` เพื่อให้ระบบนำบทเรียนแสดงผลได้ถูกต้องและเป็นระบบ

---

## 6. PipelinePro Design Guidelines (Do's and Don'ts) (NEW)

- **Do** ใช้รหัสสีของแต่ละกลุ่มขั้นตอน (Pipeline Stage) เช่น Success/Warning/Error/Primary อย่างเป็นเอกภาพและสอดคล้องกันตลอดทั้งแอปพลิเคชัน (Kanban, Tables, Reports)
- **Do** แยกแยะการแสดงผลสถานะของการ์ดและขั้นตอนจำลองอย่างชัดเจน — ใช้แถบสีแนวด้านซ้ายมือของการ์ดเพื่อถอดรหัสประเภทหรือขั้นตอนได้อย่างชัดเจนตั้งแต่แรกเห็น
- **Do** ใช้สีส้มของ Tertiary แจ้งเตือนเมื่อข้อความล่าช้า, งานสะดุด หรือลีดเร่งด่วน ห้ามใช้สีแดงสำหรับการแจ้งเตือนที่ไม่จำเป็นเพราะอาจสร้างความตื่นตระหนกโดยไม่มีเหตุอันควร
- **Don't** ออกแบบแผงขั้นตอนเกิน 4 แถวพร้อมกันในหน้าจอเดียวโดยไม่มีระบบเลื่อนในแนวนอน (Horizontal Scroll) เพื่อป้องกันอาการหน้าจอบีบอัดเกินไป
- **Don't** แสดงมูลค่าทางบัญชีหรือคะแนนผลลัพธ์ตัวเลขลอยๆ โดยไม่มีการกำหนดเครื่องหมายขั้นจุลภาคและสัญลักษณ์หน่วยแบบสากลหรือท้องถิ่นรองรับ
- **Don't** ให้มีการตอบสนองความเคลื่อนไหวหรือการเลื่อนตำแหน่งของการ์ดลากเคลื่อนที่ช้าเกินกว่า `200ms` — ความลื่นไหลและรวดเร็วช่วยส่งเสริมความมั่นใจในการใช้งานของผู้ใช้
- **Do** ระบุและแสดงจำนวนงานพร้อมแต้มสะสมทั้งหมดไว้ที่หัวข้อหลักของแผงจำลองการเรียนรู้เสมอ
- **Don't** นำมุมมองสไตล์ตารางและบอร์ดมารวมกันในพอร์ตโฟลิโอเดียวกันบนหน้าจอเดียว — ควรเปิดตัวเลือกแถบสลับให้ผู้ใช้เลือกโหมดรับชมได้อย่างเป็นเอกเทศ
