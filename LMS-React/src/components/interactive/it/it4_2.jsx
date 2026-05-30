/**
 * it4_2.jsx — หน่วยที่ 4.2 สื่อกลางการเชื่อมต่อแบบใช้สาย (Wired Transmission Media)
 * ====================================================================
 * Vertical Stacking Page Architecture: 5 academic subtopics + 4 premium simulators + Quiz + Task
 * Immersive Full-Page Standard (4 Layers) — Fluid Open-Air Layout
 * NO sounds | NO dynamic Tailwind | Local State only
 * Symmetrical Center SVG Connection Standard
 */
import React, { useState, useEffect, useRef } from 'react';
import {
  ShieldAlert, Settings, ChevronRight, FileText, Key, Award, AlertCircle,
  Globe, Keyboard, ShieldCheck, Lock, Eye, EyeOff, Wifi, Download, Search, 
  RefreshCw, Terminal, Layers, ArrowRight, RotateCcw, Play, Pause, Plus, Trash2, 
  CheckCircle2, AlertTriangle, HelpCircle, Server, User, AppWindow, Database, Info, Check,
  Cpu, Activity, Radio, LockKeyhole, Network, Sliders, Settings2, Cable, Zap
} from 'lucide-react';
import {
  AmbientBackdrop,
  SimulatorShell,
  ConsoleScreen,
  OptionSelector,
  QuizEngine,
  ConceptCard,
  SectionBlock
} from '../shared';
import TeacherTask from '../../ui/TeacherTask';

/* ═══════════════════════════════════════════════════════════════════
   AMBIENT BACKDROP THEME — IT Unit 4.2 (Teal/Indigo/Emerald/Slate)
   ═══════════════════════════════════════════════════════════════════ */
const IT4_2_BLOBS = [
  { color: 'bg-teal-300',    size: 'w-[450px] h-[450px]', position: '-top-20 -left-20',       opacity: 'opacity-30' },
  { color: 'bg-indigo-200',  size: 'w-[400px] h-[400px]', position: 'top-1/3 -right-20',      opacity: 'opacity-25' },
  { color: 'bg-emerald-300', size: 'w-96 h-96', position: '-bottom-20 left-1/4',     opacity: 'opacity-20' },
  { color: 'bg-slate-300',   size: 'w-80 h-80', position: 'top-2/3 right-1/3',       opacity: 'opacity-20' },
];

/* ═══════════════════════════════════════════════════════════════════
   DATA: QUIZ FOR UNIT 4.2
   ═══════════════════════════════════════════════════════════════════ */
const QUIZ_LEVELS = [
  {
    title: 'โจทย์ที่ 1: หน้าที่หลักของการตีเกลียวคู่สายสัญญาณ UTP',
    desc: 'เพราะเหตุใดสาย UTP (Unshielded Twisted Pair) จึงต้องออกแบบให้สายทองแดงคู่ตีเกลียวเข้าหากันเป็นคู่ๆ?',
    options: [
      { key: 'A', text: 'เพื่อเพิ่มแรงดันไฟฟ้ากระแสตรงให้ไหลผ่านสายได้ไกลเกิน 500 เมตร', isCorrect: false },
      { key: 'B', text: 'เพื่อลดสัญญาณแม่เหล็กไฟฟ้าเหนี่ยวนำข้ามคู่สาย (Crosstalk) และตัดสัญญาณรบกวนภายนอก (EMI) ด้วยคุณสมบัติหักล้างทางฟิสิกส์', isCorrect: true },
      { key: 'C', text: 'เพื่อป้องกันหนูกัดแทะสายสัญญาณกายภาพภายในท่อร้อยสาย', isCorrect: false },
      { key: 'D', text: 'เพื่อแปลงขีดจำกัดสัญญาณจากดิจิทัลเป็นคลื่นความถี่วิทยุอนาล็อก', isCorrect: false }
    ],
    tip: 'การตีเกลียวสร้างสมมาตรเหนี่ยวนำกระแส ส่งผลให้สนามแม่เหล็กที่รบกวนหักล้างกันเองโดยธรรมชาติ'
  },
  {
    title: 'โจทย์ที่ 2: ข้อจำกัดความเร็วและระยะทางของสาย Category 6',
    desc: 'สายแลน UTP มาตรฐาน Category 6 (Cat 6) รองรับการแบนด์วิดท์ความเร็วสูงสุด 10 Gbps ที่ระยะทางเชื่อมโยงไม่เกินกี่เมตรตามข้อกำหนดสากล?',
    options: [
      { key: 'A', text: 'รองรับได้สูงสุด 150 เมตรโดยไม่มีสัญญาณเสื่อมถอย', isCorrect: false },
      { key: 'B', text: 'รองรับได้สูงสุด 55 เมตร (และลดระดับลงเหลือ 1 Gbps เมื่อลากยาวถึง 100 เมตร)', isCorrect: true },
      { key: 'C', text: 'รองรับได้สูงสุด 10 เมตรเท่านั้น เนื่องจากคลื่นความถี่จำกัด', isCorrect: false },
      { key: 'D', text: 'รองรับได้สูงสุด 100 เมตรคงที่ในทุกสถานการณ์โดยไม่มีตัวแปรระยะทาง', isCorrect: false }
    ],
    tip: 'Cat 6 รองรับ 10 Gbps ที่ระยะ 55 เมตร หากต้องการความเสถียรที่ 10 Gbps ยาวครบ 100 เมตร ต้องยกระดับเป็น Cat 6a'
  },
  {
    title: 'โจทย์ที่ 3: สถาปัตยกรรมชั้นชีลด์ของสายโคแอกเชียล',
    desc: 'ในแผงโครงสร้าง Peeler ผ่าซีกของสายโคแอกเชียล (Coaxial Cable) ส่วนแผงทองแดงถัก (Braided Shield) ทำหน้าที่สำคัญในระบบลักษณะใด?',
    options: [
      { key: 'A', text: 'ทำหน้าที่นำพาสัญญาณไฟฟ้ากระแสหลักวิ่งตรงจากเซิร์ฟเวอร์สู่ปลายทาง', isCorrect: false },
      { key: 'B', text: 'ทำหน้าที่เป็นกราวด์ไฟฟ้าและบล็อกสกัดกั้นสัญญาณรบกวนย่านความถี่วิทยุ (RFI) ไม่ให้รบกวนสัญญาณหลักในแกนทองแดง', isCorrect: true },
      { key: 'C', text: 'ทำหน้าที่ยึดเหนี่ยวตัวนำทองแดงให้โค้งงอโดยไม่ชำรุดเสียหาย', isCorrect: false },
      { key: 'D', text: 'ทำหน้าที่เป็นตัวแปลงสัญญาณอนาล็อกมอดูเลตให้เป็นบิตสตรีม 0 และ 1', isCorrect: false }
    ],
    tip: 'Braided Shield สกัดกั้นสัญญาณภายนอกและกวาดไฟฟ้าส่วนเกินลงดิน ป้องกันสัญญาณหลักแกนกลางชำรุด'
  },
  {
    title: 'โจทย์ที่ 4: การสูญเสียและอาการบิดเบือนของแสงในสายใยแก้วนำแสง',
    desc: 'ปรากฏการณ์ที่แสงเดินทางหลายมุมสะท้อนสลับฟันปลาในสายใยแก้วนำแสงแบบ Multi-mode ส่งผลให้สัญญาณแสงสเปรดแผ่ออกและชนเฟสบิดเบี้ยวเรียกว่าอะไร?',
    options: [
      { key: 'A', text: 'Attenuation (การเสื่อมของกำลังไฟฟ้า)', isCorrect: false },
      { key: 'B', text: 'Modal Dispersion (การกระจายตัวของโหมดแสง)', isCorrect: true },
      { key: 'C', text: 'Electrostatic Discharge (ไฟฟ้าสถิต)', isCorrect: false },
      { key: 'D', text: 'Total Internal Reflection (การหักเหแสงสะท้อนกลับหมด)', isCorrect: false }
    ],
    tip: 'Modal Dispersion เกิดเฉพาะในสาย Multi-mode เนื่องจากขนาดแกนกว้างทำให้แสงสะท้อนหลายมุมเดินทางถึงปลายทางไม่พร้อมกัน'
  },
  {
    title: 'โจทย์ที่ 5: ความแตกต่างของสาย Single-mode และ Multi-mode',
    desc: 'หากต้องการวางโครงข่ายสายใยแก้วข้ามจังหวัดระยะทางกว่า 80 กิโลเมตร ช่างเทคนิคควรเลือกใช้สายสัญญาณและแหล่งกำเนิดแสงประเภทใด?',
    options: [
      { key: 'A', text: 'สาย Multi-mode ควบคู่กับการใช้หลอดไฟ LED พลังงานต่ำ', isCorrect: false },
      { key: 'B', text: 'สาย Single-mode (แกนเล็ก 8-10 ไมครอน) ควบคู่กับแสงเลเซอร์ (Laser) ความยาวคลื่นสูง', isCorrect: true },
      { key: 'C', text: 'สายคู่ตีเกลียว STP มาตรฐาน Category 5e พร้อมกล่องรีพีตเตอร์', isCorrect: false },
      { key: 'D', text: 'สายโคแอกเชียลชีลด์ทองแดงถักหนา 75 โอห์ม', isCorrect: false }
    ],
    tip: 'Single-mode มีแกนเล็กมาก แสงเดินทางเป็นเส้นตรงลำเดียว ไร้อาการเสื่อมและบิดเบี้ยว เหมาะกับระยะทางไกลพิเศษ'
  }
];

export default function ComponentName() {
  return (
    <>
      {/* Layer 1: Ambient Backdrop & Theme Gradients */}
      <AmbientBackdrop blobs={IT4_2_BLOBS} />

      {/* Layer 3: Flexible Subtopics & Fluid Open-Air Layout */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16 relative z-10">
        
        {/* ─── SUBTOPIC 4.2.1 ─────────────────────────────────────────────── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-teal-605 tracking-wider uppercase">เกราะเหนี่ยวนำขจัดสัญญาณรบกวน</span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              สายสัญญาณคู่ตีเกลียว (Twisted Pair: UTP และ STP) คุณลักษณะ โครงสร้างภายใน และการป้องกัน
            </h3>
          </div>
          
          <div className="text-[16px] md:text-[17px] font-normal text-zinc-600 leading-relaxed space-y-4">
            <p>
              ในวิศวกรรมเครือข่ายท้องถิ่น (LAN) <strong>สายคู่ตีเกลียว (Twisted Pair)</strong> คือสื่อกลางชนิดใช้สายทองแดงที่ได้รับความนิยมสูงที่สุด 
              ประกอบด้วยสายทองแดงหุ้มฉนวน 8 เส้น ตีเกลียวเข้าหากันเป็นคู่ๆ จำนวน 4 คู่ (ส้ม, เขียว, ฟ้า, น้ำตาล) 
              เหตุผลที่ต้องตีเกลียวเนื่องจากกฎทางฟิสิกส์แม่เหล็กไฟฟ้า: เมื่อกระแสไฟฟ้าวิ่งสวนทางกันในสนามคู่เกลียว 
              <strong>สนามแม่เหล็กไฟฟ้าภายนอกและสัญญาณรบกวนจะหักล้างกันเองโดยธรรมชาติ</strong> ช่วยตัดเสียงรบกวนข้ามคู่สาย 
              (Crosstalk) และสกัดสัญญาณแทรกแซงภายนอก (EMI)
            </p>
            <p>
              สายประเภทนี้จำแนกออกเป็น 2 เทคโนโลยีโครงสร้างความมั่นคงย่อย:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4 text-left">
              <div className="bg-gradient-to-br from-teal-50/60 to-white p-5 rounded-2xl border border-teal-100 shadow-sm space-y-2">
                <span className="p-2 rounded-xl bg-teal-100 text-teal-700 font-mono font-bold text-xs inline-block">UTP (Unshielded Twisted Pair)</span>
                <h6 className="font-bold text-teal-950 text-[15px]">สายคู่ตีเกลียวแบบไม่มีเกราะหุ้ม</h6>
                <p className="text-xs text-zinc-500 leading-relaxed font-sans">
                  สาย LAN ทั่วไปตามบ้านออฟฟิศ มีโครงสร้างพลาสติกหุ้มด้านนอกโดยตรง ไร้เกราะโลหะ/ฟอยล์ภายใน ยืดหยุ่นสูง โค้งงอง่าย ต้นทุนการติดตั้งต่ำ ทว่าเสี่ยงต่อการถูกแทรกแซงสัญญาณได้ง่ายในอุตสาหกรรม
                </p>
              </div>
              <div className="bg-gradient-to-br from-indigo-50/60 to-white p-5 rounded-2xl border border-indigo-100 shadow-sm space-y-2">
                <span className="p-2 rounded-xl bg-indigo-100 text-indigo-700 font-mono font-bold text-xs inline-block">STP (Shielded Twisted Pair)</span>
                <h6 className="font-bold text-indigo-950 text-[15px]">สายคู่ตีเกลียวแบบมีเกราะหุ้มโลหะ</h6>
                <p className="text-xs text-zinc-500 leading-relaxed font-sans">
                  ยกระดับโดยเพิ่มชั้นฟอยล์อลูมิเนียมหุ้มแต่ละคู่สาย หรือมีลวดถักถักครอบคลุมขอบเขตภายนอก ป้องกันคลื่นสัญญาณวิทยุ (RFI) และสัญญาณเหนี่ยวนำแรงสูง เหมาะสมกับพื้นที่โรงงานหรือแผงเซิร์ฟเวอร์
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Simulator 1: UTP vs STP Crosstalk & Twist Rate Lab */}
          <CrosstalkEmiLab />
        </section>

        {/* ─── SUBTOPIC 4.1.2 (Correct 4.2.2) ──────────────────────────────── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-teal-605 tracking-wider uppercase">ขีดจำกัดความเร็วและแบนด์วิดท์ความถี่</span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              หมวดหมู่ของสาย UTP (Category 5e, 6, 6a) ความเร็ว แบนด์วิดท์ และระยะทางสูงสุด
            </h3>
          </div>

          <div className="text-[16px] md:text-[17px] font-normal text-zinc-600 leading-relaxed space-y-4">
            <p>
              เนื่องจากแผงบอร์ดและอุปกรณ์เซิร์ฟเวอร์มีวิวัฒนาการในการโอนย้ายข้อมูลที่เร็วขึ้น สายทองแดง UTP 
              จึงถูกกำหนดกลุ่มตามมาตรฐาน **Category (Cat)** เพื่อเป็นเกณฑ์ประเมินสมรรถนะในการรับส่งสัญญาณไฟฟ้าในความถี่ต่างๆ:
            </p>

            <ul className="space-y-4 my-4 text-left">
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center p-1 rounded-full bg-teal-100 text-teal-600 mr-3 shrink-0 mt-0.5"><Check className="w-4 h-4" /></span>
                <div>
                  <strong>Category 5e (Cat 5e):</strong> รองรับแบนด์วิดท์ความถี่สูงสุด 100 MHz และความเร็วสูงสุดที่ 1 Gbps (Gigabit Ethernet) ที่ระยะการลากพอร์ตสูงสุด 100 เมตร เป็นมาตรฐานประหยัดขวัญใจสำนักงานขนาดเล็กในอดีต
                </div>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center p-1 rounded-full bg-teal-100 text-teal-600 mr-3 shrink-0 mt-0.5"><Check className="w-4 h-4" /></span>
                <div>
                  <strong>Category 6 (Cat 6):</strong> ขยายแบนด์วิดท์ความถี่ขึ้นเป็น 250 MHz รองรับความเร็ว 10 Gbps ได้ ทว่าจำกัดระยะสายลากสั้นๆ ไม่เกิน 55 เมตรเพื่อเลี่ยงสัญญาณชนกัน และหากมีระยะลากเกินจะตัดขีดความเร็วลดลงเหลือ 1 Gbps คงที่ที่ 100 เมตร
                </div>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center p-1 rounded-full bg-teal-100 text-teal-600 mr-3 shrink-0 mt-0.5"><Check className="w-4 h-4" /></span>
                <div>
                  <strong>Category 6a (Cat 6a):</strong> พัฒนาการสูงสุดรองรับแบนด์วิดท์ความถี่ 500 MHz เพิ่มความหนาของปลอกและตีเกลียวแน่นพิเศษ ช่วยรองรับความเร็วระดับ 10 Gbps ยาวเหยียดทะลุพิกัด 100 เมตรเต็มโดยปราศจากสัญญาณเสื่อมถอย
                </div>
              </li>
            </ul>
          </div>

          {/* Interactive Simulator 2: Category speed and attenuation checker */}
          <CategorySpeedMeter />
        </section>

        {/* ─── SUBTOPIC 4.2.3 ─────────────────────────────────────────────── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-teal-605 tracking-wider uppercase">สถาปัตยกรรมนำคลื่นวิทยุความถี่</span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              โครงสร้างและคุณสมบัติทางเคมี/ฟิสิกส์ของสายโคแอกเชียล (Coaxial Cable)
            </h3>
          </div>

          <div className="text-[16px] md:text-[17px] font-normal text-zinc-600 leading-relaxed space-y-4">
            <p>
              แม้ว่าคอมพิวเตอร์สำนักงานจะยึดครองด้วยสายคู่ตีเกลียว ทว่าในระบบส่งสัญญาณโทรทัศน์กล้องวงจรปิด สายเคเบิลค่ายบริการเน็ตเวิร์กภายนอก 
              หรือเสาอากาศวิทยุความถี่สูง จำเป็นต้องใช้ <strong>สายโคแอกเชียล (Coaxial Cable)</strong> 
              เนื่องจากคุณสมบัติทางโครงสร้างของมันสามารถรักษาสมรรถนะความเข้มสัญญาณได้ดีเยี่ยม แม้จะเหนี่ยวนำกระแสความเร็วคลื่นอนาล็อกความถี่สูงมาก
            </p>
            <p>
              ชื่อ **Co-Axial** หมายถึงความสมมาตรที่มีศูนย์กลางแกนร่วมกัน โดยสายชนิดนี้มีโครงสร้าง 5 ชั้นเพื่อปกป้องสัญญาณหลักภายใน
            </p>
          </div>

          {/* Interactive Simulator 3: Coaxial Cable Peel Anatomy */}
          <CoaxialAnatomyPeeler />
        </section>

        {/* ─── SUBTOPIC 4.2.4 & 4.2.5 ─────────────────────────────────────── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-teal-605 tracking-wider uppercase">ความเร็วระดับแสงและข้อจำกัดทางทองแดง</span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              สายใยแก้วนำแสง (Fiber Optic) ข้อจำกัด Attenuation และสัญญาณสะท้อน Dispersion
            </h3>
          </div>

          <div className="text-[16px] md:text-[17px] font-normal text-zinc-600 leading-relaxed space-y-4">
            <p>
              จุดยอดของสื่อกลางส่งข้อมูลในปัจจุบันคือ <strong>สายใยแก้วนำแสง (Fiber Optic Cable)</strong> 
              ที่เปลี่ยนโครงสร้างการนำกระแสไฟฟ้ากระแสสลับระดับต่ำ เป็นสัญญาณแสงกระพริบถอดรหัสบิต (0 และ 1) วิ่งผ่านแกนแก้วซิลิกาบริสุทธิ์ 
              <strong>(Core)</strong> โดยสะท้อนหักเหภายในแก้วหุ้มที่เรียกว่า <strong>Cladding</strong> ด้วยหลักฟิสิกส์ 
              <strong>การสะท้อนกลับหมด (Total Internal Reflection)</strong> ส่งผลให้มีขีดความเร็วสูงระดับเทราไบต์ และไม่ได้รับผลกระทบจากไฟรั่ว ฟ้าผ่า หรือ EMI
            </p>
            <p>
              ทว่าสายทองแดงและสายใยแก้ว ต่างต้องรับมือข้อจำกัดธรรมชาติทางฟิสิกส์ที่ท้าทายต่างกัน:
            </p>

            <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-6 border-l-[3.5px] border-l-teal-500/80 mt-4 space-y-3 leading-normal">
              <h5 className="font-bold text-slate-800 flex items-center gap-2">
                <Info className="w-5 h-5 text-teal-500" /> ตารางความท้าทายทางฟิสิกส์ของสื่อกลางนำสัญญาณ
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[14px]">
                <div className="bg-rose-50/40 p-4 rounded-xl border border-rose-100/60 text-slate-600">
                  <span className="font-bold text-rose-700 block mb-1">1. Attenuation (สัญญาณเสื่อมถอย)</span>
                  กระแสไฟฟ้าในสายทองแดงจะอ่อนกำลังลงเรื่อยๆ ตามความต้านทานไฟฟ้าของสาย ยิ่งลากสายยาวสัญญาณยิ่งจางหายและแรงดันไฟฟ้าตก
                </div>
                <div className="bg-amber-50/40 p-4 rounded-xl border border-amber-100/60 text-slate-600">
                  <span className="font-bold text-amber-700 block mb-1">2. Electromagnetic Interference & Crosstalk</span>
                  สายทองแดงแผ่สนามแม่เหล็กไปรบกวนคู่ข้างๆ (Crosstalk) หรือคลื่นวิทยุ/มอเตอร์พัดลมภายนอกแทรกสัญญาณ ทำให้บิตข้อมูลเพี้ยนชำรุด
                </div>
                <div className="bg-cyan-50/40 p-4 rounded-xl border border-cyan-100/60 text-slate-600">
                  <span className="font-bold text-cyan-700 block mb-1">3. Modal Dispersion (แสงกระจายเหลื่อมเฟส)</span>
                  ในแกนสายใยแก้วขนาดกว้าง แสงสะท้อนไปหลายทางเดินทางถึงช้าเร็วไม่เท่ากัน ทำให้แสงที่กระพริบเบลอซ้อนกัน จำกัดระยะส่งของสาย Multi-mode
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Simulator 4: Fiber Optic light reflection simulator */}
          <FiberOpticSimulator />
        </section>

        {/* ─── QUIZ ENGINE SECTION ────────────────────────────────────────── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-teal-605 tracking-wider uppercase">การประเมินผล</span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              แบบทดสอบวัดความรู้บทเรียนย่อย
            </h3>
          </div>

          <div className="max-w-4xl mx-auto">
            <QuizEngine levels={QUIZ_LEVELS} />
          </div>
        </section>

        {/* Layer 4: Standardized TeacherTask Footer */}
        <div className="pt-6">
          <TeacherTask
            title="ภารกิจวิเคราะห์และเลือกติดตั้งโครงสร้างสายนำสัญญาณสำหรับบริษัทข้ามชาติและโรงงาน"
            taskText={`ให้นักเรียนสวมบทบาทเป็นสถาปนิกโครงสร้างไอที (Network Infrastructure Architect) และส่งเอกสาร "แบบฟอร์มวิเคราะห์และประเมินงบประมาณการเลือกสายสัญญาณ" (Network Cabling Architectural Review)
1. วิเคราะห์และเลือกประเภทของสายแลนคู่ตีเกลียว (UTP vs STP) และกลุ่มสาย (Cat 5e, 6, 6a) สำหรับติดตั้งในอาคารคลังสินค้าอัจฉริยะที่มีแผงระบบขับเคลื่อนมอเตอร์ไฟฟ้ากำลังสูง 380V พร้อมระบุเหตุผลทางวิชาการขจัดปัญหาสัญญาณรบกวน (EMI)
2. วางมาตรการขจัดปัญหาการเสื่อมของกำลังกระแสไฟฟ้าตามระยะลากสาย (Attenuation) ในกรณีที่จำเป็นต้องเชื่อมโยงจุดประสานงานฝ่ายจัดซื้อนอกอาคารที่ลากสาย LAN ทองแดงยาวกว่า 135 เมตร
3. เขียนรายงานวิเคราะห์เปรียบเทียบการเลือกสายใยแก้วนำแสง Single-mode (คู่กับเลเซอร์) เทียบกับ Multi-mode (คู่กับ LED) ในสถาปัตยกรรมเน็ตเวิร์กเชื่อมระหว่างตึกสำนักงานใหญ่ออฟฟิศหลัก ระยะความยาวสาย 400 เมตร`}
          />
        </div>

      </main>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   1. CROSSTALK & EMI INTERFERENCE LAB (Subtopic 4.2.1 & 4.2.5)
   ═══════════════════════════════════════════════════════════════════ */
function CrosstalkEmiLab() {
  const [twistRate, setTwistRate] = useState(3); // 1 to 5
  const [shielding, setShielding] = useState('UTP'); // UTP | STP
  const [logs, setLogs] = useState(['[READY] ป้อนไฟฟ้ากระแสสลับความถี่สูงสแตนด์บาย...']);

  const baseNoise = shielding === 'UTP' ? 85 : 15;
  const twistSaving = (twistRate - 1) * 16;
  const finalNoise = Math.max(2, baseNoise - twistSaving);

  const handleTestSignal = () => {
    setLogs(current => [
      `⚡ [SIGNAL TEST] กำลังตรวจตราสนามไฟฟ้า: Twist Rate Level=${twistRate} | Shield Shield=${shielding}`,
      `📊 [MEASUREMENT INDEX] ระดับสัญญาณรบกวนแทรกซ้อน (NEXT Crosstalk): ${finalNoise} mV (ความหนาแน่นไฟฟ้ารบกวน)`,
      finalNoise > 50 
        ? '❌ [ALERT] คลื่นรบกวนสูงมากในบัสทองแดง สายคู่ตีเกลียวชิดกันเกิดเหนี่ยวนำคลื่นสนามแม่เหล็ก สัญญาณบิตบิดเบี้ยวล้มเหลว!'
        : finalNoise > 20
        ? '⚠️ [WARNING] คลื่นรบกวนปานกลาง ระมัดระวังความยาวสายบิดเบี้ยวหรือลดความเร็วประมวลผล'
        : '✅ [CLEAN SIGNAL] คลื่นรบกวนสงบนิ่ง! อัตราตีเกลียวและชิลด์ตัดพลังเหนี่ยวนำ RFI/EMI ได้เรียบสนิท 100%',
      ...current
    ]);
  };

  return (
    <SimulatorShell
      icon={<Sliders className="w-6 h-6 text-teal-500" />}
      title="เครื่องจำลองโครงสร้างสายตีเกลียว & แล็บวิเคราะห์สัญญาณรบกวน (Crosstalk & EMI Lab)"
      accentBg="bg-teal-50"
      iconColor="text-teal-600"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch select-none text-left font-sans">
        
        {/* Left Column Configurator Panel */}
        <div className="bg-[#0f172a] rounded-2xl p-5 border border-slate-800 flex flex-col justify-between shadow-2xl relative min-h-[400px] text-xs text-slate-200">
          <span className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold">CROSSTALK ANALYZER</span>
          
          <div className="space-y-4">
            <div>
              <h6 className="text-[13px] font-bold text-white flex items-center gap-1.5"><Sliders className="w-4 h-4 text-teal-400" /> Physical Parameters</h6>
              <p className="text-[10px] text-slate-400 leading-normal">
                จำลองการตีเกลียวทองแดงและการใส่แผ่นเกราะโลหะถัก เพื่อทดสอบความแรงสัญญาณบิตชำรุดข้ามสาย
              </p>
            </div>

            {/* Twist Rate Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold">
                <span>1. อัตราความแน่นในการตีเกลียวสายคู่ (Twist Rate Density):</span>
                <span className="text-teal-400 font-mono">Level {twistRate}/5</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={twistRate}
                onChange={(e) => setTwistRate(parseInt(e.target.value))}
                className="w-full h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-teal-500"
              />
              <div className="flex justify-between text-[8.5px] text-slate-500">
                <span>หลวม (เสี่ยงเหนี่ยวนำ)</span>
                <span>แน่นหนาพิเศษ (หักล้างคลื่นแม่เหล็ก)</span>
              </div>
            </div>

            {/* Shielding Toggle */}
            <div className="space-y-1.5 pt-2">
              <span className="text-[10px] text-slate-400 font-bold block">2. เลือกโครงสร้างเปลือกเกราะป้องกัน (Cable Shield Structure):</span>
              <div className="flex gap-2.5">
                <button
                  onClick={() => setShielding('UTP')}
                  className={`py-1.5 px-3 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                    shielding === 'UTP'
                      ? 'bg-teal-600 text-white'
                      : 'bg-slate-900 border border-slate-800 text-slate-450 hover:text-white'
                  }`}
                >
                  UTP (ไม่มีเกราะโลยะไร้ฟอยล์)
                </button>
                <button
                  onClick={() => setShielding('STP')}
                  className={`py-1.5 px-3 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                    shielding === 'STP'
                      ? 'bg-teal-600 text-white'
                      : 'bg-slate-900 border border-slate-800 text-slate-450 hover:text-white'
                  }`}
                >
                  STP (มีฟอยล์พันรอบแยกคู่สาย)
                </button>
              </div>
            </div>
          </div>

          {/* Test buttons */}
          <div className="pt-6 flex gap-2">
            <button
              onClick={handleTestSignal}
              className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl cursor-pointer active:scale-98 shadow-md"
            >
              📡 กดยิงกระแสไฟทดสอบคลื่นรบกวน (Test Signal NEXT)
            </button>
          </div>
        </div>

        {/* Right Column oscilloscope wave rendering */}
        <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 flex flex-col justify-between relative min-h-[400px] text-left font-mono">
          <span className="text-[9px] font-mono text-slate-500 absolute top-3 left-3">LIVE OSCILLOSCOPE SIGNAL INTERFERENCE</span>
          
          <div className="my-auto space-y-4 pt-4">
            <div className="text-center">
              <span className="text-xs text-slate-400 block font-sans font-bold">ปริมาณกระแสไฟฟ้ารบกวนแทรกซ้อน (NEXT/EMI):</span>
              <div className={`text-3xl font-bold tracking-tight mt-1 ${
                finalNoise > 50 ? 'text-rose-400' : finalNoise > 20 ? 'text-amber-400' : 'text-emerald-400'
              }`}>
                {finalNoise} <span className="text-xs text-slate-600">mV (ความหนาแน่น)</span>
              </div>
            </div>

            {/* Dynamic Oscilloscope SVG path wave */}
            <div className="w-full bg-[#090d16] p-4 rounded-xl border border-slate-900 relative">
              <svg viewBox="0 0 320 80" className="w-full h-20 overflow-visible">
                {/* Center line reference */}
                <line x1="0" y1="40" x2="320" y2="40" stroke="#1e293b" strokeWidth="1.2" strokeDasharray="3,3" />

                {/* Draw dynamic interference sine wave */}
                <path
                  d={(() => {
                    let dStr = 'M 0 40';
                    const stepSize = 8;
                    const steps = 320 / stepSize;
                    for (let i = 1; i <= steps; i++) {
                      const x = i * stepSize;
                      // Jaggedness and amplitude is dependent on finalNoise
                      const mult = finalNoise > 50 ? 25 : finalNoise > 20 ? 12 : 3;
                      const noiseAmp = (Math.sin(x * 0.4) + Math.cos(x * 0.7)) * mult;
                      dStr += ` L ${x} ${40 + noiseAmp}`;
                    }
                    return dStr;
                  })()}
                  fill="none"
                  stroke={finalNoise > 50 ? '#F43F5E' : finalNoise > 20 ? '#F59E0B' : '#10B981'}
                  strokeWidth="2"
                  className={finalNoise > 20 ? 'animate-pulse' : ''}
                />
              </svg>
            </div>

            <div className="flex justify-between text-[8px] text-slate-600 font-sans font-bold">
              <span>-100 mV Limits</span>
              <span>สถานะสัญญาณคลื่นไฟฟ้า: {finalNoise > 50 ? 'พังทลาย (Lossy)' : finalNoise > 20 ? 'บิดเบือนเฟส' : 'บริสุทธิ์ (Safe)'}</span>
              <span>+100 mV Limits</span>
            </div>
          </div>

          {/* Quick console log */}
          <div className="bg-[#0c101a] p-3 rounded-lg border border-slate-900 text-[10.5px] max-h-[80px] overflow-y-auto min-h-[70px] leading-relaxed">
            {logs.slice(0, 2).map((log, index) => (
              <div key={index} className="flex gap-1">
                <span className="text-slate-700 select-none">&gt;</span>
                <p className={log.startsWith('📊') ? 'text-cyan-400 font-bold' : log.includes('❌') ? 'text-rose-400' : 'text-slate-400'}>{log}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </SimulatorShell>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   2. CATEGORY SPEED & ATTENUATION METER SIMULATOR (Subtopic 4.2.2)
   ═══════════════════════════════════════════════════════════════════ */
function CategorySpeedMeter() {
  const [cableLength, setCableLength] = useState(50); // meters
  const [cat, setCat] = useState('Cat6'); // Cat5e | Cat6 | Cat6a

  const catSpecs = {
    Cat5e: { maxSpeed: 1, maxDist: 100, freq: 100, attenConst: 0.22 },
    Cat6: { maxSpeed: 10, maxDist: 55, freq: 250, attenConst: 0.20 },
    Cat6a: { maxSpeed: 10, maxDist: 100, freq: 500, attenConst: 0.18 }
  };

  const spec = catSpecs[cat];

  // Dynamic values calculation
  const attenuation = Math.round(cableLength * spec.attenConst * 10) / 10;

  // Determine achievable speed
  let currentSpeed = 0;
  if (cat === 'Cat5e') {
    currentSpeed = cableLength <= 100 ? 1 : 0.1; // Drops to 100Mbps after 100m due to loss
  } else if (cat === 'Cat6') {
    currentSpeed = cableLength <= 55 ? 10 : cableLength <= 100 ? 1 : 0.1;
  } else if (cat === 'Cat6a') {
    currentSpeed = cableLength <= 100 ? 10 : 1;
  }

  return (
    <SimulatorShell
      icon={<Cable className="w-6 h-6 text-teal-500 animate-pulse" />}
      title="เครื่องประเมินกำลังสัญญาณและความเร็วตามระยะสายทองแดง UTP"
      accentBg="bg-teal-50"
      iconColor="text-teal-600"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch select-none text-left font-sans">
        
        {/* Left Interactive selection panel */}
        <div className="bg-[#0f172a] rounded-2xl p-5 border border-slate-800 flex flex-col justify-between shadow-2xl relative min-h-[380px] text-xs text-slate-200">
          <span className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold">UTP RANGE CALCULATOR</span>
          
          <div className="space-y-5">
            <div>
              <h6 className="text-[13px] font-bold text-white flex items-center gap-1.5"><Sliders className="w-4 h-4 text-teal-400" /> Cable Specifications</h6>
              <p className="text-[10px] text-slate-400 leading-normal">
                ปรับสไลเดอร์ความยาวของพอร์ตการลาก และกดเปรียบเทียบมาตรฐานสาย LAN
              </p>
            </div>

            {/* Category selection */}
            <div className="space-y-1.5">
              <span className="text-[10px] text-slate-400 font-bold block">1. เลือกประเภทสายแลน UTP (Category Standards):</span>
              <div className="flex flex-col gap-2">
                {[
                  { key: 'Cat5e', label: 'Category 5e (Cat 5e)', info: 'แบนด์วิดท์ความถี่ 100 MHz | โอนย้ายสากล 1 Gbps' },
                  { key: 'Cat6', label: 'Category 6 (Cat 6)', info: 'แบนด์วิดท์ความถี่ 250 MHz | โอนย้าย 10 Gbps (จำกัดเมตร)' },
                  { key: 'Cat6a', label: 'Category 6a (Cat 6a)', info: 'แบนด์วิดท์ความถี่ 500 MHz | โอนย้าย 10 Gbps ครบ 100 เมตร' }
                ].map(item => (
                  <button
                    key={item.key}
                    onClick={() => setCat(item.key)}
                    className={`p-2.5 rounded-lg text-left cursor-pointer transition-all border ${
                      cat === item.key
                        ? 'bg-teal-500/20 text-teal-300 border-teal-500/40 font-bold'
                        : 'bg-slate-900 border-slate-850 text-slate-450 hover:text-white'
                    }`}
                  >
                    <span className="text-xs block">{item.label}</span>
                    <span className="text-[8.5px] font-normal text-slate-500 leading-none">{item.info}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Length slider */}
            <div className="space-y-2 pt-1.5">
              <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold">
                <span>2. ปรับระยะความยาวลากสายสัญญาณ (Cable Length):</span>
                <span className="text-teal-400 font-mono">{cableLength} เมตร</span>
              </div>
              <input
                type="range"
                min="10"
                max="150"
                value={cableLength}
                onChange={(e) => setCableLength(parseInt(e.target.value))}
                className="w-full h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-teal-500"
              />
              <div className="flex justify-between text-[8.5px] text-slate-500">
                <span>10 เมตร (ขยายกำลังดี)</span>
                <span>100 เมตร (ขีดจำกัดทองแดงสากล)</span>
                <span>150 เมตร (เสี่ยงบิดเบี้ยวสูง)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Dashboard visualization panel */}
        <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 flex flex-col justify-between relative min-h-[380px] font-sans text-xs text-slate-200">
          <span className="text-[9px] font-mono text-slate-500 absolute top-3 left-3">LIVE TRANSMISSION SPEED DIAL</span>
          
          <div className="my-auto space-y-6 text-center">
            {/* Achieved Speed Dial */}
            <div className="space-y-1">
              <span className="text-xs text-slate-400 block font-bold">ความเร็วรับส่งข้อมูลที่ทำได้ (Achieved Speed):</span>
              <div className="text-4.5xl font-bold tracking-tight text-teal-400 font-mono">
                {currentSpeed >= 1 ? `${currentSpeed} Gbps` : `${currentSpeed * 1000} Mbps`}
              </div>
              <span className="text-[10px] text-slate-500 block">แบนด์วิดท์ความถี่ของช่องสัญญาณ: {spec.freq} MHz</span>
            </div>

            {/* Loss / Attenuation Index */}
            <div className="space-y-2 max-w-xs mx-auto">
              <span className="text-[11px] text-slate-400 block font-bold">อัตราความสูญเสียกำลังสัญญาณ (Attenuation loss):</span>
              <div className="text-2xl font-bold text-pink-400 font-mono">-{attenuation} <span className="text-xs text-slate-500">dB</span></div>
              
              {/* Gauge indicator bar */}
              <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-850">
                <div className={`h-full transition-all duration-300 ${
                  attenuation < 15 ? 'bg-emerald-500' : attenuation < 25 ? 'bg-amber-400' : 'bg-rose-500'
                }`} style={{ width: `${Math.min(100, (attenuation / 30) * 100)}%` }} />
              </div>
              
              <span className="text-[9.5px] text-slate-400 block leading-tight pt-1">
                {attenuation < 15 ? '✅ สัญญาณเสถียรเข้มข้น ไร้ความต้านทานแรงดันไฟฟ้า' :
                 attenuation < 25 ? '⚠️ สัญญาณจางความถี่เริ่มบิดเบือน ระวังแพ็กเก็ตชำรุดหลุดหาย' :
                 '❌ สัญญาณเสื่อมถอยวิกฤต (High Attenuation) ไฟฟ้าตกรถความเร็วอัตโนมัติ'}
              </span>
            </div>
          </div>

          <div className="p-3 bg-slate-900 border border-slate-850 rounded-xl leading-normal text-slate-500 text-[10.5px]">
            💡 <strong>เทคนิคหน้างานช่าง:</strong> หากช่างลากสายแลนเกิน 100 เมตรตามพิกัดกายภาพทองแดง ระบบสวิตช์จะไม่สามารถส่งไฟเลี้ยงเหนี่ยวนำสัญญาณนาฬิกาได้สำเร็จ จำเป็นต้องวาง **PoE Extender** หรือต่อผ่านเกราะ **Repeater** เพื่อเรียกกระแสไฟ
          </div>
        </div>

      </div>
    </SimulatorShell>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   3. COAXIAL CABLE LAYER PEELER SIMULATOR (Subtopic 4.2.3)
   ═══════════════════════════════════════════════════════════════════ */
const COAXIAL_LAYERS = [
  {
    id: 0,
    title: 'แกนนำทองแดงเดี่ยว (Solid Copper Conductor)',
    properties: 'Impedance 50 / 75 โอห์มสากล | ทองแดงบริสุทธิ์หนาแน่น',
    desc: 'เป็นแกนนำแกนหลักที่มีพื้นที่นำกระแสไฟฟ้ากระแสสลับความถี่สูง (AC Radio Frequency) เดินทางผ่านผิวขอบนอกของตัวนำ โดยขนาดความหนาเป็นสัดส่วนต่อค่าความต้านทานนำไฟฟ้าสูงสุด'
  },
  {
    id: 1,
    title: 'ชั้นฉนวนไฟฟ้าพลาสติก (Dielectric Insulator)',
    properties: 'โฟมพลาสติกหนาแน่นสูงกันความชื้น | ป้องกันไฟฟ้าลัดวงจร',
    desc: 'ทำหน้าที่เป็นฉนวนหุ้มขวางกั้นแกนทองแดงออกจากชั้นชีลด์โลหะภายนอก เพื่อป้องกันไฟฟ้าลัดวงจร และทำหน้าที่เหนี่ยวนำป้องกันไฟฟ้าซึมออกมาสร้างความสูญเสียสัญญาณ'
  },
  {
    id: 2,
    title: 'ชีลด์ฟอยล์อลูมิเนียม (Foil Shield)',
    properties: 'แผ่นฟลูออโรพลาสติกหุ้มขอบเขต | บล็อกคลื่นแม่เหล็กไฟฟ้า',
    desc: 'แผงฟอยล์บางที่พันรอบฉนวนเพื่อป้องกันสัญญาณแทรกซึมจากคลื่นสนามแม่เหล็กภายนอก โดยเฉพาะแผงความถี่วิทยุ RFI ในบริเวณห้องประกอบเครื่อง'
  },
  {
    id: 3,
    title: 'ชีลด์ลวดโลหะถักหนา (Braided Shield / Copper Braid)',
    properties: 'ทองแดง/อลูมิเนียมถักเส้นตาข่าย | กราวด์ระบายไฟฟ้าส่วนเกิน',
    desc: 'ทำหน้าที่เป็นเกราะหุ้มทางกายภาพอีกชั้นในการระบายสัญญาณรบกวนความถี่ต่ำภายนอก และทำหน้าที่เป็นสายดิน (Ground) ในระบบรักษาความปลอดภัยแรงดันไฟฟ้าลัดวงจร'
  },
  {
    id: 4,
    title: 'ปลอกนอกพลาสติกหุ้มภายนอก (Plastic Outer Jacket)',
    properties: 'วัสดุ PVC / PE ยืดหยุ่นทนแดดฝน | ป้องกันความเสียหายฟิสิกส์',
    desc: 'เปลือกนอกสุดหุ้มสาย มีความหนาสูง ทนทานต่อการเหยียบทับ ดึงรั้ง รังสี UV แสงแดด และสภาวะความชื้นจากสิ่งแวดล้อมภายนอกอาคาร'
  }
];

function CoaxialAnatomyPeeler() {
  const [activeLayer, setActiveLayer] = useState(0);

  const layer = COAXIAL_LAYERS[activeLayer];

  return (
    <SimulatorShell
      icon={<Layers className="w-6 h-6 text-teal-500 animate-bounce" style={{ animationDuration: '4s' }} />}
      title="เครื่องจำลองปอกผ่าซีกและเรียนรู้โครงสร้างสายโคแอกเชียล"
      accentBg="bg-teal-50"
      iconColor="text-teal-600"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch select-none text-left font-sans">
        
        {/* Left Column SVG interactive layout representing coaxial peeling */}
        <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 flex flex-col justify-between items-center relative min-h-[360px]">
          <span className="text-[10px] font-mono text-slate-500 absolute top-3 left-3">COAXIAL PEEL-AWAY INTERACTIVE DISPLAY</span>
          
          <svg viewBox="0 0 350 200" className="w-full max-w-[320px] h-60 z-10 my-auto cursor-pointer">
            {/* Draw layered peeling tubes from left to right */}
            {/* Outer Jacket - Layer 4 */}
            <path d="M 10 30 L 120 30 L 120 170 L 10 170 Z" fill="#1e293b" stroke={activeLayer === 4 ? '#22D3EE' : '#334155'} strokeWidth={activeLayer === 4 ? "2" : "1"} onClick={() => setActiveLayer(4)} />
            <text x="65" y="105" fill="#E2E8F0" fontSize="9" fontWeight="bold" transform="rotate(-90 65 105)" onClick={() => setActiveLayer(4)}>Jacket (PVC)</text>

            {/* Braided Shield - Layer 3 */}
            <path d="M 120 40 L 200 40 L 200 160 L 120 160 Z" fill="#475569" stroke={activeLayer === 3 ? '#22D3EE' : '#334155'} strokeWidth={activeLayer === 3 ? "2" : "1"} onClick={() => setActiveLayer(3)} />
            <text x="160" y="105" fill="#E2E8F0" fontSize="9" fontWeight="bold" transform="rotate(-90 160 105)" onClick={() => setActiveLayer(3)}>Braid Shield</text>

            {/* Foil Shield - Layer 2 */}
            <path d="M 200 50 L 250 50 L 250 150 L 200 150 Z" fill="#94A3B8" stroke={activeLayer === 2 ? '#22D3EE' : '#334155'} strokeWidth={activeLayer === 2 ? "2" : "1"} onClick={() => setActiveLayer(2)} />
            <text x="225" y="105" fill="#1E293B" fontSize="8" fontWeight="bold" transform="rotate(-90 225 105)" onClick={() => setActiveLayer(2)}>Foil</text>

            {/* Dielectric Insulator - Layer 1 */}
            <path d="M 250 60 L 290 60 L 290 140 L 250 140 Z" fill="#E2E8F0" stroke={activeLayer === 1 ? '#22D3EE' : '#334155'} strokeWidth={activeLayer === 1 ? "2" : "1"} onClick={() => setActiveLayer(1)} />
            <text x="270" y="105" fill="#1E293B" fontSize="8" fontWeight="bold" transform="rotate(-90 270 105)" onClick={() => setActiveLayer(1)}>Insulator</text>

            {/* Solid Copper Conductor - Layer 0 */}
            <path d="M 290 85 L 340 85 L 340 115 L 290 115 Z" fill="#F97316" stroke={activeLayer === 0 ? '#22D3EE' : '#374151'} strokeWidth={activeLayer === 0 ? "2" : "1"} onClick={() => setActiveLayer(0)} />
            <text x="315" y="104" fill="#FFFFFF" fontSize="8" fontWeight="bold" onClick={() => setActiveLayer(0)}>Core</text>
          </svg>

          <div className="text-[10px] text-slate-500 font-sans leading-tight text-center">
            * คลิกจิ้มเลือกแถบสีของสายเพื่อปอกผ่าแสดงทฤษฎีและรายละเอียดเคมีของชิ้นส่วนชั้นใน
          </div>
        </div>

        {/* Right Details Description display Panel */}
        <div className="flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <span className="text-[12px] font-bold text-slate-400 uppercase tracking-wider block">รายละเอียดทางโครงสร้างชั้นสายสัญญาณ</span>
            
            <div className="bg-[#0f172a] rounded-2xl p-5 border border-slate-800 flex flex-col justify-between shadow-2xl relative min-h-[220px] text-xs text-slate-200">
              <span className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold">PHYSICAL LAYER DECODING</span>
              
              <div className="space-y-3">
                <span className="text-[10px] text-teal-400 font-bold uppercase tracking-wider font-mono">SELECTED LAYER {layer.id + 1} OF 5</span>
                <h5 className="font-bold text-white text-base leading-tight">{layer.title}</h5>
                <p className="text-[10px] text-slate-400 font-mono">คุณสมบัติเคมี: {layer.properties}</p>
                <p className="text-slate-350 text-[13.5px] leading-relaxed pt-1.5 font-sans">
                  {layer.desc}
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            {COAXIAL_LAYERS.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveLayer(item.id)}
                className={`w-full py-2.5 rounded-xl text-center font-mono font-bold text-xs cursor-pointer active:scale-95 transition-all ${
                  activeLayer === item.id 
                    ? 'bg-teal-600 text-white shadow-md' 
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                L{item.id + 1}
              </button>
            ))}
          </div>
        </div>

      </div>
    </SimulatorShell>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   4. FIBER OPTIC PROPAGATION & MODE SIMULATOR (Subtopic 4.2.4)
   ═══════════════════════════════════════════════════════════════════ */
function FiberOpticSimulator() {
  const [mode, setMode] = useState('single'); // single | multi
  const [inputPower, setInputPower] = useState('high'); // high | medium | low

  const powerMultiplier = inputPower === 'high' ? 1 : inputPower === 'medium' ? 0.6 : 0.25;

  return (
    <SimulatorShell
      icon={<Zap className="w-6 h-6 text-teal-500 animate-pulse" />}
      title="เครื่องจำลองทัศนศาสตร์แสงและโหมดนำสัญญาณใยแก้ว (Fiber Optic Propagation)"
      accentBg="bg-teal-50"
      iconColor="text-teal-600"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch select-none text-left font-sans">
        
        {/* Left Column Configurator Panel */}
        <div className="bg-[#0f172a] rounded-2xl p-5 border border-slate-800 flex flex-col justify-between shadow-2xl relative min-h-[350px] text-xs text-slate-200 lg:col-span-1">
          <span className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold">FIBER MODE CONTROLLER</span>
          
          <div className="space-y-5">
            <div>
              <h6 className="text-[13px] font-bold text-white flex items-center gap-1.5"><Sliders className="w-4 h-4 text-teal-400" /> Propagation Parameters</h6>
              <p className="text-[10px] text-slate-400 leading-normal">
                สลับโหมดสายใยแก้วนำแสงเพื่อสังเกตการสะท้อนกลับหมดของสัญญาณแสงบิต
              </p>
            </div>

            {/* Mode selection toggle */}
            <div className="space-y-1.5">
              <span className="text-[10px] text-slate-400 font-bold block">1. เลือกประเภทสายโหมดแสงใยแก้ว (Propagation Mode):</span>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setMode('single')}
                  className={`p-2.5 rounded-lg text-left cursor-pointer transition-all border ${
                    mode === 'single'
                      ? 'bg-teal-500/20 text-teal-300 border-teal-500/40 font-bold'
                      : 'bg-slate-900 border-slate-850 text-slate-450 hover:text-white'
                  }`}
                >
                  <span className="text-xs block">Single-mode Fiber (SMF)</span>
                  <span className="text-[8.5px] font-normal text-slate-500 leading-none">แกนเล็ก 9 ไมครอน | แสงเลเซอร์ตรง | ระยะทางไกล 100 กม.</span>
                </button>
                <button
                  onClick={() => setMode('multi')}
                  className={`p-2.5 rounded-lg text-left cursor-pointer transition-all border ${
                    mode === 'multi'
                      ? 'bg-teal-500/20 text-teal-300 border-teal-500/40 font-bold'
                      : 'bg-slate-900 border-slate-850 text-slate-450 hover:text-white'
                  }`}
                >
                  <span className="text-xs block">Multi-mode Fiber (MMF)</span>
                  <span className="text-[8.5px] font-normal text-slate-500 leading-none">แกนกว้าง 50-62.5 ไมครอน | แสงสะท้อนหลายมุม | ระยะสั้น 500 ม.</span>
                </button>
              </div>
            </div>

            {/* Light intensity control */}
            <div className="space-y-1.5">
              <span className="text-[10px] text-slate-400 font-bold block">2. ปรับความเข้มแสงบิตนำส่ง (Light Intensity):</span>
              <div className="flex gap-2.5">
                {['high', 'medium', 'low'].map(p => (
                  <button
                    key={p}
                    onClick={() => setInputPower(p)}
                    className={`w-full py-1.5 rounded-lg text-xs font-mono font-bold cursor-pointer transition-all ${
                      inputPower === p
                        ? 'bg-teal-600 text-white'
                        : 'bg-slate-900 border border-slate-850 text-slate-450 hover:text-white'
                    }`}
                  >
                    {p.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Symmetrical SVG optical tube & reflection simulation graph */}
        <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 flex flex-col justify-between relative min-h-[350px] lg:col-span-2 text-left font-mono">
          <span className="text-[9px] font-mono text-slate-500 absolute top-3 left-3">LIVE LIGHT REFLECTION OSCILLOSCOPE</span>
          
          <div className="my-auto space-y-5 pt-4">
            {/* Visual Glass Tube with Symmetrical Boundaries */}
            <div className="w-full bg-[#030712] p-4 rounded-xl border border-slate-900 relative">
              <svg viewBox="0 0 350 100" className="w-full h-24 overflow-visible">
                {/* Cladding top & bottom boundaries */}
                <line x1="0" y1="20" x2="350" y2="20" stroke="#0891B2" strokeWidth="2.5" strokeOpacity="0.8" />
                <line x1="0" y1="80" x2="350" y2="80" stroke="#0891B2" strokeWidth="2.5" strokeOpacity="0.8" />
                
                {/* Glass core translucent filling */}
                <rect x="0" y="20" width="350" height="60" fill="#0891B2" fillOpacity="0.04" />
                
                {/* Light Ray path mapping */}
                {mode === 'single' ? (
                  // Single mode: Thin Core perfectly straight line
                  <line x1="0" y1="50" x2="350" y2="50" stroke="#22D3EE" strokeWidth={3.5 * powerMultiplier} className="animate-pulse" />
                ) : (
                  // Multi mode: Wide Core reflecting angles (Zig-Zag paths)
                  <>
                    {/* Ray 1 (Cyan) */}
                    <path d="M 0 50 L 58.3 20 L 175 80 L 291.6 20 L 350 50" fill="none" stroke="#22D3EE" strokeWidth={2 * powerMultiplier} />
                    {/* Ray 2 (Red) */}
                    <path d="M 0 50 L 87.5 80 L 262.5 20 L 350 50" fill="none" stroke="#EF4444" strokeWidth={1.5 * powerMultiplier} />
                    {/* Ray 3 (Yellow) */}
                    <path d="M 0 50 L 35 20 L 105 80 L 175 20 L 245 80 L 315 20 L 350 50" fill="none" stroke="#F59E0B" strokeWidth={1 * powerMultiplier} />
                  </>
                )}

                {/* Oscilloscope core labels */}
                <text x="10" y="15" fill="#0891B2" fontSize="7" fontWeight="bold">CLADDING (สะท้อนคลื่นแสง)</text>
                <text x="10" y="93" fill="#0891B2" fontSize="7" fontWeight="bold">CLADDING (สะท้อนคลื่นแสง)</text>
                <text x="175" y="54" textAnchor="middle" fill="#94A3B8" fillOpacity="0.15" fontSize="16" fontWeight="bold">GLASS SILICA CORE</text>
              </svg>
            </div>

            <div className="flex justify-between text-[8px] text-slate-650 font-sans font-bold">
              <span>แหล่งกำเนิด: {mode === 'single' ? 'แสงเลเซอร์ (Laser)' : 'หลอด LED พลังงานปานกลาง'}</span>
              <span>อาการบิดเบือนโหมด (Dispersion): {mode === 'single' ? 'ต่ำมาก (Zero)' : 'สูง (Modal Dispersion)'}</span>
              <span>ความเร็วเฉลี่ย: {mode === 'single' ? '100 Gbps - 1 Tbps' : '1 Gbps - 10 Gbps'}</span>
            </div>
          </div>

          <div className="p-3 bg-slate-900 border border-slate-850 rounded-xl leading-normal text-slate-500 text-[10.5px] font-sans">
            💡 <strong>เฉลยพฤติกรรมสายใยแก้ว:</strong> ในสาย **Multi-mode** แสงสีต่างๆ เดินทางสะท้อนหลายมุมสลับฟันปลา ทำให้ระยะทางยาวคลื่นบิดเบี้ยวเหลื่อมเฟส (Dispersion) ชื่นมมุดข้อมูล จึงลากสายได้ไม่เกิน 500 เมตร ต่างจาก **Single-mode** ที่ยิงเส้นตรงทะลุข้ามทวีป
          </div>
        </div>

      </div>
    </SimulatorShell>
  );
}
