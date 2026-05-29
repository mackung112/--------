# 💎 UI/UX Design System & Architecture (PipelinePro Style)

**เป้าหมาย:** ไฟล์นี้คือ "Source of Truth" ของระบบดีไซน์ ห้าม AI สร้าง UI, ใช้สี, หรือใช้เลย์เอาต์นอกเหนือจากที่กำหนดในนี้เด็ดขาด

---

## 🎨 1. Design Tokens (อ้างอิง PipelinePro)
- **Primary**: `#4F46E5` (`indigo-600`) - Actions หลัก, สถานะ Active, ปุ่ม CTA (💡 **Auto-Theme**: AI ต้องเปลี่ยนสี Primary และ Secondary อัตโนมัติให้เข้ากับรายวิชา เช่น วิชาวิทยาการข้อมูลอาจใช้สีฟ้า, OOP อาจใช้สีส้ม)
- **Secondary**: `#06B6D4` (`cyan-500`) - ลิงก์, จุดเน้น
- **Tertiary**: `#F97316` (`orange-500`) - แจ้งเตือนด่วน หรือความเร่งด่วน
- **Background**: `#FAFAFA` (`[#FAFAFA]`) - พื้นหลังของแพลตฟอร์ม
- **Surface**: `#FFFFFF` (`white`) - พื้นผิวของการ์ด, Modals
- **Success**: `#22C55E` (`green-500`) | **Warning**: `#F59E0B` (`amber-500`) | **Error**: `#EF4444` (`red-500`)

## ✍️ 2. Typography & Thai Rules
- **Font Family**: `Outfit` (Headlines), `Inter` (Body/UI Elements), `Source Code Pro` (Code), `Noto Sans Thai`
- **Thai Rule**: งานที่มีภาษาไทย **บังคับใช้** `leading-relaxed` (1.625) หรือ `leading-loose` เสมอ เพื่อป้องกันสระ/วรรณยุกต์ทับซ้อนกัน
- **สเกลตัวอักษร**: 
  - Headline: `text-[38px] font-bold text-zinc-900`
  - Subhead: `text-[26px] font-semibold text-zinc-900`
  - Body: `text-[15px] font-normal text-zinc-600`
  - Code: `text-[14px] font-mono text-zinc-800`

## 🧱 3. Component Standards
- **Buttons**:
  - Primary: `bg-[#4F46E5] text-white hover:bg-[#4338CA] active:scale-98 rounded-[8px] font-semibold transition-all`
  - Secondary: `border border-[#4F46E5] text-[#4F46E5] hover:bg-[#EEF2FF] active:scale-98 rounded-[8px] font-semibold`
  - ขนาด: h-8 (Small), h-[38px] (Medium - ค่าเริ่มต้น), h-[46px] (Large)
- **Inputs**: `h-[38px] border-[#E4E4E7] rounded-[8px] focus:border-[#4F46E5] focus:ring-3 focus:ring-[#4F46E5]/12`
- **Border Radius**: Small(4px), Medium(8px), Large(12px), XL(20px), Full(9999px)
- **Shadow/Elevation**: ใช้ Tailwind standard `shadow-sm`, `shadow-md`, `shadow-xl`, หรือ Custom Drag `shadow-[0_12px_24px_-4px_rgba(79,70,229,0.15)]`
- **Interaction**: เมื่อคลิกหรือโต้ตอบ ห้ามมีอาการหน่วงเกิน 200ms

## 🌌 4. Immersive Full-Page Standard (มาตรฐานเลย์เอาต์ระดับพรีเมียม)
ทุกบทเรียนแบบ Interactive/Simulator ต้องถูกสร้างแบบ "หน้าต่างไร้ขอบ (Seamless)" เรียงตัว 4 เลเยอร์ตามแนวดิ่ง (Vertical Stack) ดังนี้:

**1️⃣ Layer 1: Ambient Backdrop**
- พื้นหลังเรืองแสงฟุ้งข้ามขอบเฟรม สร้างมิติและบรรยากาศ (ปรับสีได้ตามธีม)
- ใช้ `<div className="fixed inset-0 overflow-hidden pointer-events-none z-0">...วงกลม blur-[120px]...</div>`

**2️⃣ Layer 2: Standardized Hero Header**
- ส่วนหัวพรีเมียมที่ประกอบด้วย: รหัสหัวข้อย่อยสีเด่น, ชื่อบทภาษาไทยตัวหนา, ส่วนขยายภาษาอังกฤษสไตล์ Gradient และกล่องคำอธิบายแนวคิดขอบหนาด้านซ้าย
- **ข้อกำหนดการจัดเลย์เอาต์แบบกระชับ (Compact Header Spacing Standard):** ห้ามทำระยะห่างของส่วนหัวบทเรียนเคว้งหรือกว้างเกินไป ให้ใช้ระยะห่างตามเกณฑ์มาตรฐานนี้เสมอ:
  - ขนาด Padding ของ Header: หากอยู่ในหน้าการ์ด (`isCard`) บังคับใช้ `p-6 md:p-8` หากอยู่ในหน้าแบบไร้ขอบ (`immersive`) บังคับใช้ `pt-8 pb-4 md:pt-10 md:pb-5`
  - ระยะห่างและคลาสของชื่อภาษาอังกฤษ (Subtitle): ให้ใช้ `mb-3` คู่กับ `pb-2 leading-normal` เพื่อช่วยกระชับพื้นที่ร่วมกับการป้องกันบัก Clipping ของตัวอักษรภาษาไทย/อังกฤษที่มีหางยาวอย่างปลอดภัย
  - เส้นแบ่งคั่นเนื้อหา: ให้ปรับระยะขอบของเส้นแบ่งคั่น `div` จากมาตรฐานเดิมเป็น `my-3` เพื่อความกระชับ
  - การ์ดขอบซ้ายและคำอธิบายสังเขป: ให้ใช้คลาส `border-l-[3px] border-teal-500/80 pl-3.5 py-0.5` และเปลี่ยนขนาดตัวอักษรเป็น `text-[15px] md:text-base text-slate-500` เนื่องจากเป็นเพียงส่วนอธิบายเนื้อหาภายในโดยสังเขปเท่านั้น
- **ข้อกำหนดเพิ่มเติม (New Standard):** ชื่อภาษาอังกฤษ (Subtitle) ต้องใช้ตัวอักษรขนาดใหญ่ (`text-3xl md:text-5xl`) และใช้ระบบสุ่มสีไล่ระดับ `text-transparent bg-clip-text bg-gradient-to-r` อย่างสวยงาม
- ⚠️ **CRITICAL BUG FIX สำหรับ `bg-clip-text`**: เมื่อใช้การไล่สีกับข้อความภาษาไทย/อังกฤษที่มีหางยาว (p, y, j, g) **ห้ามใช้ `!p-0`** และ **ต้องใส่คลาส `pb-2 leading-normal` เสมอ** เพื่อป้องกันไม่ให้หางของตัวอักษรโดนตัดขาด (Clipping Mask Issue)
- *อนุญาตให้ AI ปรับสี Accent / Gradient ให้เข้ากับธีมของวิชาได้อิสระ*

**3️⃣ Layer 3: Flexible Subtopics & Interactives**
- พื้นที่อิสระตรงกลางสำหรับ Simulator หรือมินิเกม
- **ข้อกำหนดเพิ่มเติม (Alignment Standard):** ต้องห่อหุ้มเนื้อหาทั้งหมดใน Layer 3 ด้วยแท็ก `<main>` ที่มีคลาสระยะขอบพื้นฐาน (Default Margin) คือ `max-w-7xl mx-auto px-6 lg:px-12 pt-10 space-y-8` (หรือ `space-y-16` ตามความเหมาะสม) เสมอ เพื่อให้เส้นขอบซ้าย-ขวา (Alignment) ตรงกับกล่องข้อความของ StandardHeader ด้านบนอย่างสมบูรณ์แบบ
- ต้องรักษาความหรูหราแบบ Genesis (Clean, ฟอนต์ Outfit/Inter, มีการเคลื่อนไหวตอบสนองนุ่มนวล)

**4️⃣ Layer 4: Standardized TeacherTask Footer**
- กล่องโจทย์หรือกิจกรรมท้ายบทเรียน ที่ออกแบบไว้สมบูรณ์แล้ว
- **กฎเหล็ก: ห้ามแก้ไขโค้ดการทำงานของกล่อง TeacherTask เดิมเด็ดขาด** (ให้รักษารูปแบบที่มี Gradient Border, ปุ่มคัดลอกโจทย์ และ Box โค้ดด้านล่างเอาไว้เสมอ)

## 🧠 5. Continuous Training (การเรียนรู้รสนิยมด้านความงาม)
- **จับทางดีไซน์**: ให้ AI สังเกตและจดจำรสนิยมของผู้ใช้ (เช่น ผู้ใช้อาจชอบความโปร่งใสแบบ Glassmorphism มากขึ้น หรือชอบสี Gradient โทนใดเป็นพิเศษ)
- หากผู้ใช้สั่งแก้ UI ให้เป็นไปในทิศทางเดียวกันหลายๆ ครั้ง ให้คุณเพิ่มกฎใหม่นั้นลงในหมวด `Design Tokens` หรือ `Component Standards` ของไฟล์นี้ทันที เพื่อให้ไม่ต้องถูกสั่งแก้ซ้ำอีก
