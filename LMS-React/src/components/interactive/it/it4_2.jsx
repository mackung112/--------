/**
 * it4_2.jsx — หน่วยที่ 4.2 สื่อกลางการเชื่อมต่อแบบใช้สาย (Wired Transmission Media)
 * ====================================================================
 * Vertical Stacking Page Architecture: 5 academic subtopics + 4 premium simulators + Quiz + Task
 * Immersive Full-Page Standard (4 Layers) — Fluid Open-Air Layout
 * NO sounds | NO dynamic Tailwind | Local State only
 * Symmetrical Center SVG Connection Standard
 * ✨ VISUAL OVERHAUL: Glassmorphism + Interactive Icons + Premium Typography
 */
import React, { useState } from 'react';
import {
  ShieldAlert, Info, Check, ArrowRight, RotateCcw,
  Cpu, Activity, Layers, Zap, Cable, Sliders,
  Network, Wifi, Shield, AlertTriangle, CheckCircle2
} from 'lucide-react';
import {
  AmbientBackdrop,
  SimulatorShell,
  QuizEngine,
} from '../shared';
import TeacherTask from '../../ui/TeacherTask';

/* ═══════════════════════════════════════════════════════════════════
   AMBIENT BACKDROP THEME — IT Unit 4.2 (Teal/Indigo/Emerald/Slate)
   ═══════════════════════════════════════════════════════════════════ */
const IT4_2_BLOBS = [
  { color: 'bg-teal-300',    size: 'w-[500px] h-[500px]', position: '-top-24 -left-24',       opacity: 'opacity-25' },
  { color: 'bg-indigo-200',  size: 'w-[420px] h-[420px]', position: 'top-1/3 -right-24',      opacity: 'opacity-20' },
  { color: 'bg-emerald-300', size: 'w-[380px] h-[380px]', position: '-bottom-24 left-1/4',    opacity: 'opacity-20' },
  { color: 'bg-cyan-200',    size: 'w-80 h-80',            position: 'top-2/3 right-1/3',      opacity: 'opacity-15' },
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

/* ─── UTP / STP concept data ─────────────────────────────────────── */
const UTP_STP_CARDS = [
  {
    id: 'utp',
    badge: 'UTP (Unshielded Twisted Pair)',
    title: 'สายคู่ตีเกลียวแบบไม่มีเกราะหุ้ม',
    desc: 'สาย LAN ทั่วไปตามบ้านออฟฟิศ มีโครงสร้างพลาสติกหุ้มด้านนอกโดยตรง ไร้เกราะโลหะ/ฟอยล์ภายใน ยืดหยุ่นสูง โค้งงอง่าย ต้นทุนการติดตั้งต่ำ ทว่าเสี่ยงต่อการถูกแทรกแซงสัญญาณได้ง่ายในอุตสาหกรรม',
    icon: Cable,
    accent: 'teal',
    badgeBg: 'bg-teal-100',
    badgeText: 'text-teal-700',
    iconBg: 'bg-teal-50',
    iconColor: 'text-teal-600',
    hoverBorder: 'hover:border-teal-400/40',
  },
  {
    id: 'stp',
    badge: 'STP (Shielded Twisted Pair)',
    title: 'สายคู่ตีเกลียวแบบมีเกราะหุ้มโลหะ',
    desc: 'ยกระดับโดยเพิ่มชั้นฟอยล์อลูมิเนียมหุ้มแต่ละคู่สาย หรือมีลวดถักถักครอบคลุมขอบเขตภายนอก ป้องกันคลื่นสัญญาณวิทยุ (RFI) และสัญญาณเหนี่ยวนำแรงสูง เหมาะสมกับพื้นที่โรงงานหรือแผงเซิร์ฟเวอร์',
    icon: Shield,
    accent: 'indigo',
    badgeBg: 'bg-indigo-100',
    badgeText: 'text-indigo-700',
    iconBg: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
    hoverBorder: 'hover:border-indigo-400/40',
  },
];

/* ─── Category specs data ────────────────────────────────────────── */
const CAT_SPECS = [
  {
    cat: 'Cat 5e',
    freq: '100 MHz',
    speed: '1 Gbps',
    dist: '100 ม.',
    note: 'มาตรฐานประหยัดสำนักงานขนาดเล็ก',
    accent: 'emerald',
    badgeBg: 'bg-emerald-100', badgeText: 'text-emerald-700',
    iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600',
    hoverBorder: 'hover:border-emerald-400/40',
  },
  {
    cat: 'Cat 6',
    freq: '250 MHz',
    speed: '10 Gbps (≤55 ม.) / 1 Gbps (≤100 ม.)',
    dist: '55 / 100 ม.',
    note: 'เหมาะสำนักงานขนาดกลาง-ใหญ่',
    accent: 'teal',
    badgeBg: 'bg-teal-100', badgeText: 'text-teal-700',
    iconBg: 'bg-teal-50', iconColor: 'text-teal-600',
    hoverBorder: 'hover:border-teal-400/40',
  },
  {
    cat: 'Cat 6a',
    freq: '500 MHz',
    speed: '10 Gbps',
    dist: '100 ม.',
    note: 'Data Center และ Server Room ระดับสูง',
    accent: 'indigo',
    badgeBg: 'bg-indigo-100', badgeText: 'text-indigo-700',
    iconBg: 'bg-indigo-50', iconColor: 'text-indigo-600',
    hoverBorder: 'hover:border-indigo-400/40',
  },
];

/* ─── Attenuation challenge data ─────────────────────────────────── */
const ATTENUATION_CARDS = [
  {
    title: 'Attenuation (สัญญาณเสื่อมถอย)',
    desc: 'กระแสไฟฟ้าในสายทองแดงจะอ่อนกำลังลงเรื่อยๆ ตามความต้านทานไฟฟ้าของสาย ยิ่งลากสายยาวสัญญาณยิ่งจางหายและแรงดันไฟฟ้าตก',
    accent: 'rose',
    bg: 'bg-rose-50/40', border: 'border-rose-100/60', text: 'text-rose-700',
  },
  {
    title: 'Electromagnetic Interference & Crosstalk',
    desc: 'สายทองแดงแผ่สนามแม่เหล็กไปรบกวนคู่ข้างๆ (Crosstalk) หรือคลื่นวิทยุ/มอเตอร์พัดลมภายนอกแทรกสัญญาณ ทำให้บิตข้อมูลเพี้ยนชำรุด',
    accent: 'amber',
    bg: 'bg-amber-50/40', border: 'border-amber-100/60', text: 'text-amber-700',
  },
  {
    title: 'Modal Dispersion (แสงกระจายเหลื่อมเฟส)',
    desc: 'ในแกนสายใยแก้วขนาดกว้าง แสงสะท้อนไปหลายทางเดินทางถึงช้าเร็วไม่เท่ากัน ทำให้แสงที่กระพริบเบลอซ้อนกัน จำกัดระยะส่งของสาย Multi-mode',
    accent: 'cyan',
    bg: 'bg-cyan-50/40', border: 'border-cyan-100/60', text: 'text-cyan-700',
  },
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
            <span className="text-sm font-bold text-teal-600 tracking-wider uppercase">เกราะเหนี่ยวนำขจัดสัญญาณรบกวน</span>
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

            {/* Frosted callout for key physics principle */}
            <div className="bg-teal-50/60 backdrop-blur-md border border-teal-200/60 rounded-2xl p-4 border-l-[3px] border-l-teal-500 leading-relaxed">
              <p className="text-[15px] text-teal-800 flex items-start gap-2">
                <Info className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                <span>หลักการฟิสิกส์แม่เหล็กไฟฟ้า: เมื่อสนามแม่เหล็กสวนทางกัน แรงทั้งสองจะหักล้างกันจนเป็นศูนย์ — นี่คือความลับที่ทำให้สาย UTP ส่งข้อมูลได้อย่างมั่นคงแม้ไม่มีเกราะโลหะป้องกัน</span>
              </p>
            </div>

            <p>สายประเภทนี้จำแนกออกเป็น 2 เทคโนโลยีโครงสร้างความมั่นคงย่อย:</p>

            {/* Premium Glassmorphism Cards — UTP vs STP */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4 text-left">
              {UTP_STP_CARDS.map((card) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.id}
                    className={`bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-5 hover:-translate-y-1 hover:shadow-2xl ${card.hoverBorder} transition-all duration-300 cursor-pointer space-y-3 group`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-3 rounded-2xl ${card.iconBg} ${card.iconColor} transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-inner shrink-0`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <span className={`${card.badgeBg} ${card.badgeText} font-mono font-bold text-[13px] px-2 py-0.5 rounded-lg inline-block`}>
                          {card.badge}
                        </span>
                        <h6 className="font-bold text-zinc-900 text-[15.5px] leading-tight transition-colors group-hover:text-zinc-700">
                          {card.title}
                        </h6>
                      </div>
                    </div>
                    <p className="text-[14px] text-zinc-500 leading-relaxed font-sans pl-1">
                      {card.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive Simulator 1: UTP vs STP Crosstalk & Twist Rate Lab */}
          <CrosstalkEmiLab />
        </section>

        {/* ─── SUBTOPIC 4.2.2 ──────────────────────────────── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-teal-600 tracking-wider uppercase">ขีดจำกัดความเร็วและแบนด์วิดท์ความถี่</span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              หมวดหมู่ของสาย UTP (Category 5e, 6, 6a) ความเร็ว แบนด์วิดท์ และระยะทางสูงสุด
            </h3>
          </div>

          <div className="text-[16px] md:text-[17px] font-normal text-zinc-600 leading-relaxed space-y-4">
            <p>
              เนื่องจากแผงบอร์ดและอุปกรณ์เซิร์ฟเวอร์มีวิวัฒนาการในการโอนย้ายข้อมูลที่เร็วขึ้น สายทองแดง UTP
              จึงถูกกำหนดกลุ่มตามมาตรฐาน <strong>Category (Cat)</strong> เพื่อเป็นเกณฑ์ประเมินสมรรถนะในการรับส่งสัญญาณไฟฟ้าในความถี่ต่างๆ:
            </p>

            {/* Premium Category Cards — 3-column grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-4">
              {CAT_SPECS.map((spec) => (
                <div
                  key={spec.cat}
                  className={`bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-5 hover:-translate-y-1 hover:shadow-2xl ${spec.hoverBorder} transition-all duration-300 cursor-pointer group space-y-3`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-2xl ${spec.iconBg} ${spec.iconColor} transition-all duration-300 group-hover:scale-110 group-hover:animate-pulse shadow-inner`}>
                      <Cable className="w-5 h-5" />
                    </div>
                    <span className={`${spec.badgeBg} ${spec.badgeText} font-mono font-bold text-[13px] px-2 py-0.5 rounded-lg`}>
                      {spec.cat}
                    </span>
                  </div>
                  <div className="space-y-2 text-[14px]">
                    <div className="flex justify-between items-center border-b border-zinc-100 pb-1.5">
                      <span className="text-zinc-400 font-sans">แบนด์วิดท์:</span>
                      <span className="font-bold text-zinc-800 font-mono">{spec.freq}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-zinc-100 pb-1.5">
                      <span className="text-zinc-400 font-sans">ความเร็วสูงสุด:</span>
                      <span className="font-bold text-zinc-800 font-mono text-right text-[12.5px]">{spec.speed}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-400 font-sans">ระยะสูงสุด:</span>
                      <span className="font-bold text-zinc-800 font-mono">{spec.dist}</span>
                    </div>
                  </div>
                  <p className="text-[13px] text-zinc-500 leading-relaxed border-t border-zinc-100/80 pt-2.5">
                    {spec.note}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Simulator 2: Category speed and attenuation checker */}
          <CategorySpeedMeter />
        </section>

        {/* ─── SUBTOPIC 4.2.3 ─────────────────────────────────────────────── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-teal-600 tracking-wider uppercase">สถาปัตยกรรมนำคลื่นวิทยุความถี่</span>
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
              ชื่อ <strong className="bg-teal-50/60 border border-teal-200/50 text-teal-700 font-mono text-[15px] px-1.5 py-0.5 rounded">Co-Axial</strong> หมายถึงความสมมาตรที่มีศูนย์กลางแกนร่วมกัน
              โดยสายชนิดนี้มีโครงสร้าง 5 ชั้นเพื่อปกป้องสัญญาณหลักภายใน
            </p>
          </div>

          {/* Interactive Simulator 3: Coaxial Cable Peel Anatomy */}
          <CoaxialAnatomyPeeler />
        </section>

        {/* ─── SUBTOPIC 4.2.4 & 4.2.5 ─────────────────────────────────────── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-teal-600 tracking-wider uppercase">ความเร็วระดับแสงและข้อจำกัดทางทองแดง</span>
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
            <p>ทว่าสายทองแดงและสายใยแก้ว ต่างต้องรับมือข้อจำกัดธรรมชาติทางฟิสิกส์ที่ท้าทายต่างกัน:</p>

            {/* Premium Frosted Callout Panel — 3-column challenge grid */}
            <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-6 border-l-[3.5px] border-l-teal-500/80 mt-4 space-y-4 leading-normal">
              <h5 className="font-bold text-slate-800 flex items-center gap-2 text-[15.5px]">
                <Info className="w-5 h-5 text-teal-500" />
                ตารางความท้าทายทางฟิสิกส์ของสื่อกลางนำสัญญาณ
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {ATTENUATION_CARDS.map((card) => (
                  <div key={card.title} className={`${card.bg} p-4 rounded-xl border ${card.border} text-slate-600 space-y-1.5 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200`}>
                    <span className={`font-bold ${card.text} block text-[14px] leading-tight`}>{card.title}</span>
                    <p className="text-[13.5px] leading-relaxed">{card.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Simulator 4: Fiber Optic light reflection simulator */}
          <FiberOpticSimulator />
        </section>

        {/* ─── QUIZ ENGINE SECTION ────────────────────────────────────────── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-teal-600 tracking-wider uppercase">การประเมินผล</span>
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
  const [twistRate, setTwistRate] = useState(3);
  const [shielding, setShielding] = useState('UTP');
  const [logs, setLogs] = useState(['[READY] ป้อนไฟฟ้ากระแสสลับความถี่สูงสแตนด์บาย...']);

  const baseNoise = shielding === 'UTP' ? 85 : 15;
  const twistSaving = (twistRate - 1) * 16;
  const finalNoise = Math.max(2, baseNoise - twistSaving);

  const handleTestSignal = () => {
    setLogs(current => [
      `⚡ [SIGNAL TEST] กำลังตรวจตราสนามไฟฟ้า: Twist Rate Level=${twistRate} | Shield=${shielding}`,
      `📊 [MEASUREMENT] ระดับสัญญาณรบกวนแทรกซ้อน (NEXT Crosstalk): ${finalNoise} mV`,
      finalNoise > 50
        ? '❌ [ALERT] คลื่นรบกวนสูงมากในบัสทองแดง สัญญาณบิตบิดเบี้ยวล้มเหลว!'
        : finalNoise > 20
        ? '⚠️ [WARNING] คลื่นรบกวนปานกลาง ระมัดระวังความยาวสายบิดเบี้ยว'
        : '✅ [CLEAN SIGNAL] คลื่นรบกวนสงบนิ่ง! ตัดพลังเหนี่ยวนำ RFI/EMI ได้เรียบสนิท 100%',
      ...current
    ]);
  };

  const noiseColor = finalNoise > 50 ? 'text-rose-400' : finalNoise > 20 ? 'text-amber-400' : 'text-emerald-400';
  const strokeColor = finalNoise > 50 ? '#F43F5E' : finalNoise > 20 ? '#F59E0B' : '#10B981';

  return (
    <SimulatorShell
      icon={<Sliders className="w-6 h-6 text-teal-500" />}
      title="เครื่องจำลองโครงสร้างสายตีเกลียว & แล็บวิเคราะห์สัญญาณรบกวน (Crosstalk & EMI Lab)"
      accentBg="bg-teal-50"
      iconColor="text-teal-600"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch select-none text-left font-sans">

        {/* Left: Frosted Dark Glass Configurator */}
        <div className="bg-slate-900/90 backdrop-blur-xl rounded-2xl p-5 border border-white/10 flex flex-col justify-between shadow-2xl relative min-h-[420px] text-xs text-slate-200">
          <span className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold tracking-widest">CROSSTALK ANALYZER</span>

          <div className="space-y-5 pt-2">
            <div>
              <h6 className="text-[13px] font-bold text-white flex items-center gap-2">
                <span className="p-1.5 rounded-xl bg-teal-500/20 text-teal-400"><Sliders className="w-3.5 h-3.5" /></span>
                Physical Parameters
              </h6>
              <p className="text-[11px] text-slate-400 leading-relaxed mt-1">
                จำลองการตีเกลียวทองแดงและการใส่แผ่นเกราะโลหะถัก เพื่อทดสอบความแรงสัญญาณบิตชำรุดข้ามสาย
              </p>
            </div>

            {/* Twist Rate Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[11px] text-slate-400 font-bold">
                <span>อัตราความแน่นในการตีเกลียวสายคู่ (Twist Rate Density):</span>
                <span className="text-teal-400 font-mono">Level {twistRate}/5</span>
              </div>
              <input
                type="range" min="1" max="5" value={twistRate}
                onChange={(e) => setTwistRate(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-full appearance-none cursor-pointer accent-teal-500"
              />
              <div className="flex justify-between text-[9.5px] text-slate-500">
                <span>หลวม (เสี่ยงเหนี่ยวนำ)</span>
                <span>แน่นหนาพิเศษ (หักล้างคลื่น)</span>
              </div>
            </div>

            {/* Shielding Toggle */}
            <div className="space-y-2 pt-1">
              <span className="text-[11px] text-slate-400 font-bold block">เลือกโครงสร้างเปลือกเกราะป้องกัน (Cable Shield):</span>
              <div className="flex gap-2">
                {['UTP', 'STP'].map(type => (
                  <button
                    key={type}
                    onClick={() => setShielding(type)}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold cursor-pointer transition-all active:scale-98 ${
                      shielding === type
                        ? 'bg-teal-600 text-white shadow-lg shadow-teal-500/20'
                        : 'bg-slate-800/80 border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500'
                    }`}
                  >
                    {type === 'UTP' ? 'UTP (ไร้ฟอยล์)' : 'STP (มีฟอยล์)'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={handleTestSignal}
            className="w-full py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs rounded-xl cursor-pointer active:scale-98 shadow-lg shadow-teal-500/20 transition-all mt-4"
          >
            📡 กดยิงกระแสไฟทดสอบคลื่นรบกวน (Test Signal NEXT)
          </button>
        </div>

        {/* Right: Live Oscilloscope */}
        <div className="bg-slate-950/95 backdrop-blur-xl rounded-2xl p-6 border border-white/5 flex flex-col justify-between relative min-h-[420px] text-left font-mono shadow-2xl">
          <span className="text-[9px] font-mono text-slate-500 absolute top-3 left-4">LIVE OSCILLOSCOPE SIGNAL INTERFERENCE</span>

          <div className="my-auto space-y-5 pt-4">
            <div className="text-center">
              <span className="text-[11px] text-slate-400 block font-sans font-bold">ปริมาณกระแสไฟฟ้ารบกวนแทรกซ้อน (NEXT/EMI):</span>
              <div className={`text-4xl font-bold tracking-tight mt-1.5 ${noiseColor}`}>
                {finalNoise} <span className="text-xs text-slate-600">mV</span>
              </div>
              <div className={`text-[11px] mt-1 font-sans font-bold ${noiseColor}`}>
                {finalNoise > 50 ? 'สถานะ: พังทลาย (Lossy)' : finalNoise > 20 ? 'สถานะ: บิดเบือนเฟส' : 'สถานะ: บริสุทธิ์ (Safe)'}
              </div>
            </div>

            {/* Dynamic Oscilloscope SVG */}
            <div className="w-full bg-[#050a14] p-4 rounded-xl border border-slate-900/80 relative">
              <svg viewBox="0 0 320 80" className="w-full h-20 overflow-visible">
                <line x1="0" y1="40" x2="320" y2="40" stroke="#1e293b" strokeWidth="1" strokeDasharray="3,3" />
                <path
                  d={(() => {
                    let dStr = 'M 0 40';
                    for (let i = 1; i <= 40; i++) {
                      const x = i * 8;
                      const mult = finalNoise > 50 ? 25 : finalNoise > 20 ? 12 : 3;
                      const noiseAmp = (Math.sin(x * 0.4) + Math.cos(x * 0.7)) * mult;
                      dStr += ` L ${x} ${40 + noiseAmp}`;
                    }
                    return dStr;
                  })()}
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth="2"
                  className={finalNoise > 20 ? 'animate-pulse' : ''}
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Console output */}
            <div className="bg-[#080c14] p-3 rounded-xl border border-slate-900/60 text-[11px] max-h-[80px] overflow-y-auto min-h-[70px] leading-relaxed space-y-1">
              {logs.slice(0, 2).map((log, index) => (
                <div key={index} className="flex gap-1.5">
                  <span className="text-slate-700 select-none shrink-0">{'>'}</span>
                  <p className={log.startsWith('📊') ? 'text-cyan-400 font-bold' : log.includes('❌') ? 'text-rose-400' : log.includes('⚠️') ? 'text-amber-400' : 'text-slate-400'}>
                    {log}
                  </p>
                </div>
              ))}
            </div>
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
  const [cableLength, setCableLength] = useState(50);
  const [cat, setCat] = useState('Cat6');

  const catSpecs = {
    Cat5e: { maxSpeed: 1, maxDist: 100, freq: 100, attenConst: 0.22, label: 'Category 5e' },
    Cat6:  { maxSpeed: 10, maxDist: 55,  freq: 250, attenConst: 0.20, label: 'Category 6' },
    Cat6a: { maxSpeed: 10, maxDist: 100, freq: 500, attenConst: 0.18, label: 'Category 6a' },
  };

  const spec = catSpecs[cat];
  const attenuation = Math.round(cableLength * spec.attenConst * 10) / 10;

  let currentSpeed = 0;
  if (cat === 'Cat5e') currentSpeed = cableLength <= 100 ? 1 : 0.1;
  else if (cat === 'Cat6') currentSpeed = cableLength <= 55 ? 10 : cableLength <= 100 ? 1 : 0.1;
  else if (cat === 'Cat6a') currentSpeed = cableLength <= 100 ? 10 : 1;

  const speedColor = currentSpeed >= 10 ? 'text-emerald-400' : currentSpeed >= 1 ? 'text-amber-400' : 'text-rose-400';
  const attenGauge = attenuation < 15 ? 'bg-emerald-500' : attenuation < 25 ? 'bg-amber-400' : 'bg-rose-500';
  const attenStatus = attenuation < 15
    ? '✅ สัญญาณเสถียรเข้มข้น ไร้การต้านทานแรงดันไฟฟ้า'
    : attenuation < 25
    ? '⚠️ สัญญาณจางความถี่เริ่มบิดเบือน ระวังแพ็กเก็ตหลุดหาย'
    : '❌ สัญญาณเสื่อมถอยวิกฤต (High Attenuation) ความเร็วลดลงอัตโนมัติ';

  return (
    <SimulatorShell
      icon={<Cable className="w-6 h-6 text-teal-500 animate-pulse" />}
      title="เครื่องประเมินกำลังสัญญาณและความเร็วตามระยะสายทองแดง UTP"
      accentBg="bg-teal-50"
      iconColor="text-teal-600"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch select-none text-left font-sans">

        {/* Left: Frosted Dark Configurator */}
        <div className="bg-slate-900/90 backdrop-blur-xl rounded-2xl p-5 border border-white/10 flex flex-col justify-between shadow-2xl relative min-h-[380px] text-xs text-slate-200">
          <span className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold tracking-widest">UTP RANGE CALCULATOR</span>

          <div className="space-y-5 pt-2">
            <div>
              <h6 className="text-[13px] font-bold text-white flex items-center gap-2">
                <span className="p-1.5 rounded-xl bg-teal-500/20 text-teal-400"><Sliders className="w-3.5 h-3.5" /></span>
                Cable Specifications
              </h6>
              <p className="text-[11px] text-slate-400 leading-relaxed mt-1">
                ปรับสไลเดอร์ความยาวของพอร์ตการลาก และกดเปรียบเทียบมาตรฐานสาย LAN
              </p>
            </div>

            {/* Category Selection */}
            <div className="space-y-1.5">
              <span className="text-[11px] text-slate-400 font-bold block">เลือกประเภทสายแลน UTP:</span>
              <div className="flex flex-col gap-2">
                {[
                  { key: 'Cat5e', info: '100 MHz | 1 Gbps' },
                  { key: 'Cat6',  info: '250 MHz | 10 Gbps (55 ม.)' },
                  { key: 'Cat6a', info: '500 MHz | 10 Gbps (100 ม.)' },
                ].map(item => (
                  <button
                    key={item.key}
                    onClick={() => setCat(item.key)}
                    className={`p-2.5 rounded-xl text-left cursor-pointer transition-all border ${
                      cat === item.key
                        ? 'bg-teal-500/20 text-teal-300 border-teal-500/40 font-bold'
                        : 'bg-slate-800/60 border-slate-700/50 text-slate-400 hover:text-white hover:border-slate-500'
                    }`}
                  >
                    <span className="text-[12px] block font-bold">{catSpecs[item.key].label}</span>
                    <span className="text-[10px] font-normal text-slate-500 font-mono">{item.info}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Length Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[11px] text-slate-400 font-bold">
                <span>ปรับระยะความยาวลากสายสัญญาณ:</span>
                <span className="text-teal-400 font-mono">{cableLength} เมตร</span>
              </div>
              <input
                type="range" min="10" max="150" value={cableLength}
                onChange={(e) => setCableLength(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-full appearance-none cursor-pointer accent-teal-500"
              />
              <div className="flex justify-between text-[9.5px] text-slate-500">
                <span>10 ม.</span><span>100 ม. (พิกัด)</span><span>150 ม.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Live Dashboard */}
        <div className="bg-slate-950/95 backdrop-blur-xl rounded-2xl p-6 border border-white/5 flex flex-col justify-between relative min-h-[380px] font-sans text-xs text-slate-200 shadow-2xl">
          <span className="text-[9px] font-mono text-slate-500 absolute top-3 left-4">LIVE TRANSMISSION SPEED DIAL</span>

          <div className="my-auto space-y-6 text-center pt-4">
            <div className="space-y-1">
              <span className="text-[11px] text-slate-400 block font-bold">ความเร็วรับส่งข้อมูลที่ทำได้ (Achieved Speed):</span>
              <div className={`text-5xl font-bold tracking-tight font-mono ${speedColor}`}>
                {currentSpeed >= 1 ? `${currentSpeed} Gbps` : `${currentSpeed * 1000} Mbps`}
              </div>
              <span className="text-[10px] text-slate-500 block">แบนด์วิดท์ความถี่: {spec.freq} MHz</span>
            </div>

            <div className="space-y-2 max-w-xs mx-auto">
              <span className="text-[11px] text-slate-400 block font-bold">อัตราความสูญเสียกำลังสัญญาณ (Attenuation):</span>
              <div className="text-2xl font-bold text-pink-400 font-mono">-{attenuation} <span className="text-xs text-slate-500">dB</span></div>
              <div className="w-full bg-slate-800/80 h-2.5 rounded-full overflow-hidden border border-slate-700/50">
                <div className={`h-full transition-all duration-500 ${attenGauge} rounded-full`} style={{ width: `${Math.min(100, (attenuation / 30) * 100)}%` }} />
              </div>
              <span className="text-[10px] text-slate-400 block leading-tight pt-0.5">{attenStatus}</span>
            </div>
          </div>

          <div className="p-3 bg-slate-800/50 border border-slate-700/40 rounded-xl leading-normal text-slate-500 text-[11px]">
            💡 <strong className="text-slate-400">เทคนิคหน้างาน:</strong> หากช่างลากสายแลนเกิน 100 เมตร จำเป็นต้องวาง <span className="text-teal-400 font-mono text-[10px]">PoE Extender</span> หรือต่อผ่าน <span className="text-teal-400 font-mono text-[10px]">Repeater</span> เพื่อเรียกกระแสไฟฟ้าเลี้ยงสัญญาณใหม่
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
  { id: 0, label: 'Core', title: 'แกนนำทองแดงเดี่ยว (Solid Copper Conductor)', properties: 'Impedance 50/75 โอห์มสากล | ทองแดงบริสุทธิ์หนาแน่น', desc: 'เป็นแกนนำแกนหลักที่มีพื้นที่นำกระแสไฟฟ้ากระแสสลับความถี่สูง (AC Radio Frequency) เดินทางผ่านผิวขอบนอกของตัวนำ ขนาดความหนาเป็นสัดส่วนต่อค่าความต้านทานนำไฟฟ้าสูงสุด', fill: '#F97316', stroke: '#EA580C' },
  { id: 1, label: 'Insulator', title: 'ชั้นฉนวนไฟฟ้าพลาสติก (Dielectric Insulator)', properties: 'โฟมพลาสติกหนาแน่นสูงกันความชื้น | ป้องกันไฟฟ้าลัดวงจร', desc: 'ทำหน้าที่เป็นฉนวนหุ้มขวางกั้นแกนทองแดงออกจากชั้นชีลด์โลหะภายนอก เพื่อป้องกันไฟฟ้าลัดวงจร และทำหน้าที่เหนี่ยวนำป้องกันไฟฟ้าซึมออกมาสร้างความสูญเสียสัญญาณ', fill: '#E2E8F0', stroke: '#CBD5E1' },
  { id: 2, label: 'Foil', title: 'ชีลด์ฟอยล์อลูมิเนียม (Foil Shield)', properties: 'แผ่นฟลูออโรพลาสติกหุ้มขอบเขต | บล็อกคลื่นแม่เหล็กไฟฟ้า', desc: 'แผงฟอยล์บางที่พันรอบฉนวนเพื่อป้องกันสัญญาณแทรกซึมจากคลื่นสนามแม่เหล็กภายนอก โดยเฉพาะแผงความถี่วิทยุ RFI ในบริเวณห้องประกอบเครื่อง', fill: '#94A3B8', stroke: '#64748B' },
  { id: 3, label: 'Braid', title: 'ชีลด์ลวดโลหะถักหนา (Braided Shield / Copper Braid)', properties: 'ทองแดง/อลูมิเนียมถักเส้นตาข่าย | กราวด์ระบายไฟฟ้าส่วนเกิน', desc: 'ทำหน้าที่เป็นเกราะหุ้มทางกายภาพอีกชั้นในการระบายสัญญาณรบกวนความถี่ต่ำภายนอก และทำหน้าที่เป็นสายดิน (Ground) ในระบบรักษาความปลอดภัยแรงดันไฟฟ้าลัดวงจร', fill: '#475569', stroke: '#334155' },
  { id: 4, label: 'Jacket', title: 'ปลอกนอกพลาสติกหุ้มภายนอก (Plastic Outer Jacket)', properties: 'วัสดุ PVC / PE ยืดหยุ่นทนแดดฝน | ป้องกันความเสียหายฟิสิกส์', desc: 'เปลือกนอกสุดหุ้มสาย มีความหนาสูง ทนทานต่อการเหยียบทับ ดึงรั้ง รังสี UV แสงแดด และสภาวะความชื้นจากสิ่งแวดล้อมภายนอกอาคาร', fill: '#1e293b', stroke: '#0f172a' },
];

function CoaxialAnatomyPeeler() {
  const [activeLayer, setActiveLayer] = useState(4);
  const layer = COAXIAL_LAYERS[activeLayer];

  return (
    <SimulatorShell
      icon={<Layers className="w-6 h-6 text-teal-500 animate-bounce" style={{ animationDuration: '4s' }} />}
      title="เครื่องจำลองปอกผ่าซีกและเรียนรู้โครงสร้างสายโคแอกเชียล"
      accentBg="bg-teal-50"
      iconColor="text-teal-600"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch select-none text-left font-sans">

        {/* Left: Interactive SVG cross-section */}
        <div className="bg-slate-950/95 backdrop-blur-xl rounded-2xl p-6 border border-white/5 flex flex-col items-center justify-between relative min-h-[360px] shadow-2xl">
          <span className="text-[10px] font-mono text-slate-500 absolute top-3 left-4">COAXIAL PEEL-AWAY INTERACTIVE</span>

          <svg viewBox="0 0 350 200" className="w-full max-w-[320px] h-60 z-10 my-auto cursor-pointer">
            {/* Outer Jacket — Layer 4 */}
            <path d="M 10 30 L 120 30 L 120 170 L 10 170 Z" fill={COAXIAL_LAYERS[4].fill} stroke={activeLayer === 4 ? '#22D3EE' : '#334155'} strokeWidth={activeLayer === 4 ? '2.5' : '1'} onClick={() => setActiveLayer(4)} className="transition-all duration-200 hover:opacity-90" />
            <text x="65" y="105" fill="#E2E8F0" fontSize="9" fontWeight="bold" transform="rotate(-90 65 105)" onClick={() => setActiveLayer(4)}>Jacket (PVC)</text>

            {/* Braided Shield — Layer 3 */}
            <path d="M 120 40 L 200 40 L 200 160 L 120 160 Z" fill={COAXIAL_LAYERS[3].fill} stroke={activeLayer === 3 ? '#22D3EE' : '#334155'} strokeWidth={activeLayer === 3 ? '2.5' : '1'} onClick={() => setActiveLayer(3)} className="transition-all duration-200 hover:opacity-90" />
            <text x="160" y="105" fill="#E2E8F0" fontSize="9" fontWeight="bold" transform="rotate(-90 160 105)" onClick={() => setActiveLayer(3)}>Braid Shield</text>

            {/* Foil Shield — Layer 2 */}
            <path d="M 200 50 L 250 50 L 250 150 L 200 150 Z" fill={COAXIAL_LAYERS[2].fill} stroke={activeLayer === 2 ? '#22D3EE' : '#334155'} strokeWidth={activeLayer === 2 ? '2.5' : '1'} onClick={() => setActiveLayer(2)} className="transition-all duration-200 hover:opacity-90" />
            <text x="225" y="105" fill="#1E293B" fontSize="8" fontWeight="bold" transform="rotate(-90 225 105)" onClick={() => setActiveLayer(2)}>Foil</text>

            {/* Dielectric Insulator — Layer 1 */}
            <path d="M 250 60 L 290 60 L 290 140 L 250 140 Z" fill={COAXIAL_LAYERS[1].fill} stroke={activeLayer === 1 ? '#22D3EE' : '#334155'} strokeWidth={activeLayer === 1 ? '2.5' : '1'} onClick={() => setActiveLayer(1)} className="transition-all duration-200 hover:opacity-90" />
            <text x="270" y="105" fill="#1E293B" fontSize="8" fontWeight="bold" transform="rotate(-90 270 105)" onClick={() => setActiveLayer(1)}>Insulator</text>

            {/* Solid Copper Core — Layer 0 */}
            <path d="M 290 85 L 340 85 L 340 115 L 290 115 Z" fill={COAXIAL_LAYERS[0].fill} stroke={activeLayer === 0 ? '#22D3EE' : '#374151'} strokeWidth={activeLayer === 0 ? '2.5' : '1'} onClick={() => setActiveLayer(0)} className="transition-all duration-200 hover:opacity-90" />
            <text x="315" y="104" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle" onClick={() => setActiveLayer(0)}>Core</text>
          </svg>

          <p className="text-[10px] text-slate-500 font-sans text-center mt-2">คลิกจิ้มแถบสีของสายเพื่อแสดงรายละเอียดชั้นใน</p>

          {/* Layer selector buttons */}
          <div className="flex gap-1.5 w-full pt-2">
            {COAXIAL_LAYERS.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveLayer(item.id)}
                className={`flex-1 py-2 rounded-xl font-mono font-bold text-[11px] cursor-pointer active:scale-95 transition-all ${
                  activeLayer === item.id
                    ? 'bg-teal-600 text-white shadow-lg shadow-teal-500/20'
                    : 'bg-slate-800/60 border border-slate-700/40 text-slate-400 hover:text-white'
                }`}
              >
                L{item.id + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Layer Details Panel */}
        <div className="bg-slate-900/90 backdrop-blur-xl rounded-2xl p-5 border border-white/10 shadow-2xl relative min-h-[360px] text-xs text-slate-200 flex flex-col justify-between">
          <span className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold tracking-widest">PHYSICAL LAYER DECODING</span>

          <div className="space-y-4 pt-4">
            <span className="text-[11px] text-teal-400 font-bold uppercase tracking-wider font-mono block">
              SELECTED LAYER {layer.id + 1} OF 5
            </span>
            <h5 className="font-bold text-white text-[15px] leading-snug">{layer.title}</h5>
            <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/40">
              <span className="text-[10px] text-slate-400 block mb-1">คุณสมบัติทางเคมี:</span>
              <p className="text-[11px] text-slate-300 font-mono leading-relaxed">{layer.properties}</p>
            </div>
            <p className="text-slate-300 text-[13.5px] leading-relaxed pt-1 font-sans">
              {layer.desc}
            </p>
          </div>

          <div className="bg-slate-800/40 border border-slate-700/30 rounded-xl p-3 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: layer.fill, border: `2px solid ${layer.stroke}` }} />
              <span className="text-[11px] text-slate-400 font-mono">{layer.label} — ชั้นที่ {layer.id + 1}/5</span>
            </div>
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
  const [mode, setMode] = useState('single');
  const [inputPower, setInputPower] = useState('high');

  const powerMultiplier = inputPower === 'high' ? 1 : inputPower === 'medium' ? 0.6 : 0.25;

  const modeInfo = {
    single: { label: 'Single-mode (SMF)', core: '9 µm', src: 'เลเซอร์ (Laser)', dist: '100+ km', disp: 'ต่ำมาก (Zero)', speed: '100 Gbps - 1 Tbps', color: '#22D3EE' },
    multi:  { label: 'Multi-mode (MMF)', core: '50-62.5 µm', src: 'LED', dist: '≤ 500 m', disp: 'สูง (Modal Dispersion)', speed: '1 Gbps - 10 Gbps', color: '#10B981' },
  };

  const current = modeInfo[mode];

  return (
    <SimulatorShell
      icon={<Zap className="w-6 h-6 text-teal-500 animate-pulse" />}
      title="เครื่องจำลองทัศนศาสตร์แสงและโหมดนำสัญญาณใยแก้ว (Fiber Optic Propagation)"
      accentBg="bg-teal-50"
      iconColor="text-teal-600"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch select-none text-left font-sans">

        {/* Left: Frosted Dark Config */}
        <div className="bg-slate-900/90 backdrop-blur-xl rounded-2xl p-5 border border-white/10 flex flex-col justify-between shadow-2xl relative min-h-[350px] text-xs text-slate-200 lg:col-span-1">
          <span className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold tracking-widest">FIBER MODE CONTROLLER</span>

          <div className="space-y-5 pt-2">
            <div>
              <h6 className="text-[13px] font-bold text-white flex items-center gap-2">
                <span className="p-1.5 rounded-xl bg-teal-500/20 text-teal-400"><Sliders className="w-3.5 h-3.5" /></span>
                Propagation Parameters
              </h6>
              <p className="text-[11px] text-slate-400 leading-relaxed mt-1">
                สลับโหมดสายใยแก้วเพื่อสังเกตการสะท้อนกลับหมดของสัญญาณแสงบิต
              </p>
            </div>

            {/* Mode selection */}
            <div className="space-y-2">
              <span className="text-[11px] text-slate-400 font-bold block">เลือกประเภทสายโหมดแสงใยแก้ว:</span>
              {[
                { key: 'single', label: 'Single-mode Fiber (SMF)', info: 'แกนเล็ก 9 µm | เลเซอร์ตรง | ระยะ 100+ กม.' },
                { key: 'multi', label: 'Multi-mode Fiber (MMF)', info: 'แกนกว้าง 50-62.5 µm | LED | ระยะ ≤ 500 ม.' },
              ].map(item => (
                <button
                  key={item.key}
                  onClick={() => setMode(item.key)}
                  className={`w-full p-2.5 rounded-xl text-left cursor-pointer transition-all border ${
                    mode === item.key
                      ? 'bg-teal-500/20 text-teal-300 border-teal-500/40 font-bold'
                      : 'bg-slate-800/60 border-slate-700/50 text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="text-[12px] block">{item.label}</span>
                  <span className="text-[10px] font-normal text-slate-500">{item.info}</span>
                </button>
              ))}
            </div>

            {/* Light intensity */}
            <div className="space-y-2">
              <span className="text-[11px] text-slate-400 font-bold block">ความเข้มแสงบิตนำส่ง:</span>
              <div className="flex gap-2">
                {['high', 'medium', 'low'].map(p => (
                  <button
                    key={p}
                    onClick={() => setInputPower(p)}
                    className={`flex-1 py-2 rounded-xl text-[11px] font-mono font-bold cursor-pointer transition-all ${
                      inputPower === p
                        ? 'bg-teal-600 text-white shadow-lg shadow-teal-500/20'
                        : 'bg-slate-800/60 border border-slate-700/50 text-slate-400 hover:text-white'
                    }`}
                  >
                    {p.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Live Reflection Oscilloscope */}
        <div className="bg-slate-950/95 backdrop-blur-xl rounded-2xl p-6 border border-white/5 flex flex-col justify-between relative min-h-[350px] lg:col-span-2 text-left font-mono shadow-2xl">
          <span className="text-[9px] font-mono text-slate-500 absolute top-3 left-4">LIVE LIGHT REFLECTION OSCILLOSCOPE</span>

          <div className="my-auto space-y-5 pt-4">
            {/* Glass tube SVG */}
            <div className="w-full bg-[#030712] p-4 rounded-xl border border-slate-900/60 relative">
              <svg viewBox="0 0 350 100" className="w-full h-24 overflow-visible">
                {/* Cladding lines */}
                <line x1="0" y1="20" x2="350" y2="20" stroke="#0891B2" strokeWidth="2.5" strokeOpacity="0.8" />
                <line x1="0" y1="80" x2="350" y2="80" stroke="#0891B2" strokeWidth="2.5" strokeOpacity="0.8" />
                {/* Core fill */}
                <rect x="0" y="20" width="350" height="60" fill="#0891B2" fillOpacity="0.04" />

                {/* Light rays */}
                {mode === 'single' ? (
                  <line x1="0" y1="50" x2="350" y2="50" stroke="#22D3EE" strokeWidth={3.5 * powerMultiplier} className="animate-pulse" strokeLinecap="round" />
                ) : (
                  <>
                    <path d="M 0 50 L 58.3 20 L 175 80 L 291.6 20 L 350 50" fill="none" stroke="#22D3EE" strokeWidth={2 * powerMultiplier} strokeLinecap="round" />
                    <path d="M 0 50 L 87.5 80 L 262.5 20 L 350 50" fill="none" stroke="#EF4444" strokeWidth={1.5 * powerMultiplier} strokeLinecap="round" />
                    <path d="M 0 50 L 35 20 L 105 80 L 175 20 L 245 80 L 315 20 L 350 50" fill="none" stroke="#F59E0B" strokeWidth={1 * powerMultiplier} strokeLinecap="round" />
                  </>
                )}
                <text x="10" y="15" fill="#0891B2" fontSize="7" fontWeight="bold">CLADDING (สะท้อนคลื่นแสง)</text>
                <text x="10" y="93" fill="#0891B2" fontSize="7" fontWeight="bold">CLADDING (สะท้อนคลื่นแสง)</text>
                <text x="175" y="54" textAnchor="middle" fill="#94A3B8" fillOpacity="0.12" fontSize="14" fontWeight="bold">GLASS SILICA CORE</text>
              </svg>
            </div>

            {/* Spec grid */}
            <div className="grid grid-cols-3 gap-3 font-sans text-[11px]">
              {[
                { label: 'แหล่งกำเนิดแสง', value: current.src },
                { label: 'ขนาดแกน Core', value: current.core },
                { label: 'ระยะส่งสูงสุด', value: current.dist },
                { label: 'Modal Dispersion', value: current.disp },
                { label: 'ความเร็ว Data', value: current.speed },
                { label: 'โหมดที่เลือก', value: current.label },
              ].map(item => (
                <div key={item.label} className="bg-slate-800/50 border border-slate-700/30 rounded-xl p-2.5 space-y-0.5">
                  <span className="text-slate-500 block text-[9.5px]">{item.label}:</span>
                  <span className="font-bold text-white block text-[11px] leading-tight">{item.value}</span>
                </div>
              ))}
            </div>

            <div className="p-3 bg-slate-800/40 border border-slate-700/30 rounded-xl leading-normal text-slate-400 text-[11px] font-sans">
              💡 <strong className="text-slate-300">เฉลยพฤติกรรมสายใยแก้ว:</strong> ในสาย Multi-mode แสงสีต่างๆ เดินทางสะท้อนหลายมุมสลับฟันปลา ทำให้ระยะทางยาวคลื่นบิดเบี้ยวเหลื่อมเฟส (Dispersion) ต่างจาก Single-mode ที่ยิงเส้นตรงทะลุข้ามทวีป
            </div>
          </div>
        </div>
      </div>
    </SimulatorShell>
  );
}
