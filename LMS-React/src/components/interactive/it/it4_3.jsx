/**
 * it4_3.jsx — หน่วยที่ 4.3 การเข้าหัวสายสัญญาณ UTP และการทดสอบ (RJ-45 Crimping & Testing)
 * ====================================================================
 * Vertical Stacking Page Architecture: 6 academic subtopics + 4 premium simulators + Quiz + Task
 * Immersive Full-Page Standard (4 Layers) — Fluid Open-Air Layout
 * NO sounds | NO dynamic Tailwind | Local State only
 * Symmetrical Center SVG Connection Standard
 * ✨ VISUAL OVERHAUL: Glassmorphism + Interactive Icons + Premium Typography
 */
import React, { useState, useEffect, useRef } from 'react';
import {
  Info, Check, RotateCcw, Play, Terminal, RefreshCw,
  Cpu, Activity, Network, Sliders, Scissors, Hammer, CheckSquare
} from 'lucide-react';
import {
  AmbientBackdrop,
  SimulatorShell,
  QuizEngine,
} from '../shared';
import TeacherTask from '../../ui/TeacherTask';

/* ═══════════════════════════════════════════════════════════════════
   AMBIENT BACKDROP THEME — IT Unit 4.3 (Emerald/Cyan/Teal/Indigo)
   ═══════════════════════════════════════════════════════════════════ */
const IT4_3_BLOBS = [
  { color: 'bg-emerald-300', size: 'w-[450px] h-[450px]', position: '-top-20 -left-20',    opacity: 'opacity-30' },
  { color: 'bg-cyan-200',    size: 'w-[400px] h-[400px]', position: 'top-1/3 -right-20',   opacity: 'opacity-25' },
  { color: 'bg-teal-300',    size: 'w-96 h-96',           position: '-bottom-20 left-1/4', opacity: 'opacity-20' },
  { color: 'bg-indigo-200',  size: 'w-80 h-80',           position: 'top-2/3 right-1/3',   opacity: 'opacity-20' },
];

/* ═══════════════════════════════════════════════════════════════════
   DATA: QUIZ FOR UNIT 4.3
   ═══════════════════════════════════════════════════════════════════ */
const QUIZ_LEVELS = [
  {
    title: 'โจทย์ที่ 1: มาตรฐานการเรียงสี T568B',
    desc: 'การเรียงลำดับคู่สาย UTP ทั้ง 8 พิน ตามมาตรฐานสากล T568B ข้อใดแสดงลำดับพินที่ 1 ถึง พินที่ 3 ได้ถูกต้อง?',
    options: [
      { key: 'A', text: 'ขาวส้ม, ขาวเขียว, ส้ม', isCorrect: false },
      { key: 'B', text: 'ขาวส้ม, ส้ม, ขาวเขียว', isCorrect: true },
      { key: 'C', text: 'ขาวเขียว, เขียว, ขาวส้ม', isCorrect: false },
      { key: 'D', text: 'ขาวเขียว, ส้ม, ขาวส้ม', isCorrect: false }
    ],
    tip: 'มาตรฐาน T568B ลำดับคือ ขาวส้ม (1), ส้ม (2), ขาวเขียว (3), ฟ้า (4), ขาวฟ้า (5), เขียว (6), ขาวน้ำตาล (7), น้ำตาล (8)'
  },
  {
    title: 'โจทย์ที่ 2: วัตถุประสงค์ของการเชื่อมต่อแบบสายไขว้ (Crossover Cable)',
    desc: 'การเข้าหัว LAN แบบสายไขว้ (Crossover) ปลายข้างหนึ่งเป็น T568B และอีกข้างเป็น T568A นำไปใช้งานเพื่อวัตถุประสงค์ใด?',
    options: [
      { key: 'A', text: 'เชื่อมต่อคอมพิวเตอร์พนักงานเข้ากับอุปกรณ์รวมสัญญาณศูนย์กลางอย่าง Switch', isCorrect: false },
      { key: 'B', text: 'เชื่อมต่อระหว่างอุปกรณ์เน็ตเวิร์กประเภทเดียวกันโดยตรง (เช่น PC ไปหา PC หรือ Switch ไปหา Switch)', isCorrect: true },
      { key: 'C', text: 'เพิ่มพลังงานกระแสไฟฟ้าเลี้ยงสายแลน PoE ให้ลากยาวเกิน 150 เมตร', isCorrect: false },
      { key: 'D', text: 'ใช้กับสายใยแก้วนำแสง Single-mode เพื่อแปลงสัญญาณเลเซอร์', isCorrect: false }
    ],
    tip: 'สาย Crossover จะทำการไขว้คู่รับสัญญาณ (Rx) และส่งสัญญาณ (Tx) เข้าหาตำแหน่งกันโดยตรง ทำให้เครื่องชนิดเดียวกันคุยกันได้ไร้ตัวกลาง'
  },
  {
    title: 'โจทย์ที่ 3: การตรวจหาสถานะสายขาดในผ่าน LAN Cable Tester',
    desc: 'เมื่อทำการยิงพ่นสัญญาณเช็กสาย LAN ผ่านเครื่อง Cable Tester แล้วพบว่าไฟ LED เลข 5 ของกล่อง Master และ Remote ไม่ติดสว่างเลย แสดงว่าเกิดปัญหาใดในสาย UTP?',
    options: [
      { key: 'A', text: 'Reversed Pair (การเข้าพินสลับข้างกัน)', isCorrect: false },
      { key: 'B', text: 'Open Circuit (สายพิน 5 ขาดใน ชำรุดไม่เชื่อมต่อ)', isCorrect: true },
      { key: 'C', text: 'Short Circuit (กระแสไฟฟ้าไหลรั่วลัดวงจรข้ามพิน)', isCorrect: false },
      { key: 'D', text: 'Attenuation (สัญญาณอ่อนแรงตามธรรมชาติทองแดง)', isCorrect: false }
    ],
    tip: 'ไฟดับสนิทคืออาการ Open (สายขาดในหรือพินไม่กดสัมผัสหน้าทองแดงของตัวนำ)'
  },
  {
    title: 'โจทย์ที่ 4: การเลือกอุปกรณ์ Patch Panel ในห้องห้องแล็บเครื่องแม่ข่าย',
    desc: 'อุปกรณ์แผงกระจายสายสัญญาณ (Patch Panel) ที่หน้างานช่างติดตั้งไว้ในตู้แร็คทำหน้าที่สำคัญอย่างไรในการบำรุงรักษา?',
    options: [
      { key: 'A', text: 'ทำหน้าที่ขยายกำลังสัญญาณข้ามเครือข่ายทดแทนการใช้เราเตอร์', isCorrect: false },
      { key: 'B', text: 'ทำหน้าที่เป็นจุดรวมรวบขอบเขตสายแลนตัวเมียเข้าตู้ เพื่อความสะอาด ปลอดภัย เป็นระเบียบ และบำรุงรักษาเปลี่ยนสายพอร์ตได้ง่าย', isCorrect: true },
      { key: 'C', text: 'ทำหน้าที่มอดูเลตคลื่นส่งสัญญาณดิจิทัลเป็นคลื่นเสียง', isCorrect: false },
      { key: 'D', text: 'สกัดกั้นการแฮกข้อมูลข้าม Subnet เครือข่ายด้วยระบบไฟร์วอลล์', isCorrect: false }
    ],
    tip: 'Patch Panel คือศูนย์รวมจัดระเบียบสายตัวเมียด้านหลังตู้แร็ค ช่วยปกป้องสายจากการดึงขาดชำรุดทางกายภาพ'
  },
  {
    title: 'โจทย์ที่ 5: อาการเข้าหัว LAN ผิดพลาดแบบลัดวงจร (Short Circuit)',
    desc: 'หากช่างใช้เครื่องย้ำสายแลนกดสัมผัสไม่สนิท ส่งผลให้เข็มโลหะนำทองเหลืองของพินที่ 1 และพินที่ 2 ลื่นมากระแทกสัมผัสชนกันเอง อาการผิดพลาดนี้คือแบบใด?',
    options: [
      { key: 'A', text: 'Open Circuit (สายขาดใน)', isCorrect: false },
      { key: 'B', text: 'Short Circuit (การลัดวงจรระหว่างคู่พินนำกระแส)', isCorrect: true },
      { key: 'C', text: 'Unicast Data Flowing (การสื่อสารปกติ)', isCorrect: false },
      { key: 'D', text: 'Modal Dispersion (การกระเจิงของคลื่นวิทยุ)', isCorrect: false }
    ],
    tip: 'Short Circuit เกิดจากสายนำสัญญาณโลหะชนหรือแตะกันเอง ทำให้บิตข้อมูลพังทลายทันที'
  }
];

/* ─── Wire Color Palette ──────────────────────────────────────────── */
const COLOR_PALETTES = [
  { id: 0, name: 'ขาวส้ม',   hex: '#FFFFFF', border: '#F97316', bgText: 'text-orange-600' },
  { id: 1, name: 'ส้ม',      hex: '#F97316', border: '#F97316', bgText: 'text-white' },
  { id: 2, name: 'ขาวเขียว', hex: '#FFFFFF', border: '#10B981', bgText: 'text-emerald-600' },
  { id: 3, name: 'ฟ้า',      hex: '#3B82F6', border: '#3B82F6', bgText: 'text-white' },
  { id: 4, name: 'ขาวฟ้า',   hex: '#FFFFFF', border: '#3B82F6', bgText: 'text-blue-600' },
  { id: 5, name: 'เขียว',    hex: '#10B981', border: '#10B981', bgText: 'text-white' },
  { id: 6, name: 'ขาวน้ำตาล',hex: '#FFFFFF', border: '#78350F', bgText: 'text-amber-800' },
  { id: 7, name: 'น้ำตาล',   hex: '#78350F', border: '#78350F', bgText: 'text-white' },
];
const STANDARDS = { T568B: [0, 1, 2, 3, 4, 5, 6, 7], T568A: [2, 5, 0, 3, 4, 1, 6, 7] };

/* ─── Cable error type cards data ────────────────────────────────── */
const ERROR_TYPE_CARDS = [
  {
    badge: '1. Open Circuit',
    title: 'อาการสายขาดใน',
    desc: 'เกิดจากช่างปอกสายกินเนื้อทองแดงขาด หรือกดย้ำหัวทองเหลืองลงไปไม่ลึกสัมผัสพลาสติก ส่งผลให้ไฟ LED ของพินที่ขาด ดับสนิททั้งฝั่ง Master และ Remote',
    accent: 'emerald',
    badgeBg: 'bg-emerald-100', badgeText: 'text-emerald-700',
    hoverBorder: 'hover:border-emerald-400/40',
  },
  {
    badge: '2. Short Circuit',
    title: 'การลัดวงจรข้ามพิน',
    desc: 'เกิดจากปลายโลหะทองเหลืองสัมผัสกันเอง หรือสายทองแดงชำรุดละลายชนกัน ส่งผลให้ไฟ LED พินที่แตะกัน สว่างโร่สลับช่องไม่เรียงแถวนาฬิกา',
    accent: 'indigo',
    badgeBg: 'bg-indigo-100', badgeText: 'text-indigo-700',
    hoverBorder: 'hover:border-indigo-400/40',
  },
  {
    badge: '3. Miswired / Reversed',
    title: 'การเรียงลำดับสีสลับคู่',
    desc: 'เกิดจากการเรียงบิตสีสลับพินที่ Side A หรือ Side B ส่งผลให้ไฟสแกนวิ่งไม่พร้อมเพรียงข้ามเครื่อง เช่น Master รันพิน 1 แต่ Remote เด้งไฟขึ้นพิน 3',
    accent: 'cyan',
    badgeBg: 'bg-cyan-100', badgeText: 'text-cyan-700',
    hoverBorder: 'hover:border-cyan-400/40',
  },
];

/* ─── Standard cards data ────────────────────────────────────────── */
const STANDARD_CARDS = [
  {
    badge: 'มาตรฐาน T568B (นิยมในองค์กรสากล)',
    title: 'เรียงลำดับสีคู่ส้มขึ้นต้น',
    pinList: '1.ขาวส้ม  2.ส้ม  3.ขาวเขียว  4.ฟ้า  5.ขาวฟ้า  6.เขียว  7.ขาวน้ำตาล  8.น้ำตาล',
    accent: 'emerald',
    badgeBg: 'bg-emerald-100', badgeText: 'text-emerald-700',
    hoverBorder: 'hover:border-emerald-400/40',
  },
  {
    badge: 'มาตรฐาน T568A (นิยมในภาครัฐ/อดีต)',
    title: 'เรียงลำดับสีคู่เขียวขึ้นต้น',
    pinList: '1.ขาวเขียว  2.เขียว  3.ขาวส้ม  4.ฟ้า  5.ขาวฟ้า  6.ส้ม  7.ขาวน้ำตาล  8.น้ำตาล',
    accent: 'cyan',
    badgeBg: 'bg-cyan-100', badgeText: 'text-cyan-700',
    hoverBorder: 'hover:border-cyan-400/40',
  },
];

export default function ComponentName() {
  return (
    <>
      {/* Layer 1: Ambient Backdrop & Theme Gradients */}
      <AmbientBackdrop blobs={IT4_3_BLOBS} />

      {/* Layer 3: Flexible Subtopics & Fluid Open-Air Layout */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16 relative z-10">

        {/* ─── SUBTOPIC 4.3.1 & 4.3.2 ─────────────────────────────────────── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-emerald-600 tracking-wider uppercase">พินสัมผัสทองเหลืองและมาตรฐานการเรียงลำดับสี</span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              โครงสร้างของหัวต่อ RJ-45 และมาตรฐานสากล T568A และ T568B
            </h3>
          </div>

          <div className="text-[16px] md:text-[17px] font-normal text-zinc-600 leading-relaxed space-y-4">
            <p>
              ในการต่อสาย LAN ทองแดงเข้ากับคอมพิวเตอร์ ชิ้นส่วนพลาสติกปลายสายที่ทำหน้าที่สวมต่อคือ
              <strong>หัวต่อ RJ-45 (Registered Jack 45)</strong> ซึ่งประกอบด้วยเข็มโลหะสัมผัสทองเหลือง 8 พิน (Pins)
              คอยกดย้ำแทงทะลุฉนวนพลาสติกเพื่อนำไฟฟ้ารับส่งข้อมูล
              การจัดลำดับสายสัญญาณไฟทั้ง 8 เส้นภายในจำเป็นต้องทำตามมาตรฐานสากลเพื่อการเชื่อมต่อที่เข้ากันได้ทั่วโลก
              ซึ่งกำหนดขึ้นโดยสมาคมอุตสาหกรรมโทรคมนาคมสากล <strong>TIA/EIA-568</strong>
            </p>
            <p>มาตรฐานดังกล่าวจำแนกออกเป็น 2 ลำดับการเรียงสีหลัก:</p>

            {/* Premium Glassmorphism Standard Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4 text-left">
              {STANDARD_CARDS.map((card) => (
                <div
                  key={card.badge}
                  className={`bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-5 hover:-translate-y-1 hover:shadow-2xl ${card.hoverBorder} transition-all duration-300 cursor-pointer space-y-3 group`}
                >
                  <span className={`${card.badgeBg} ${card.badgeText} font-mono font-bold text-[13px] px-2 py-0.5 rounded-lg inline-block`}>
                    {card.badge}
                  </span>
                  <h6 className="font-bold text-zinc-900 text-[15.5px] leading-tight group-hover:text-zinc-700 transition-colors">
                    {card.title}
                  </h6>
                  <p className="text-[13.5px] text-zinc-500 leading-relaxed font-mono">{card.pinList}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Simulator 1: RJ-45 Wire Color Arranger */}
          <Rj45WireArranger />
        </section>

        {/* ─── SUBTOPIC 4.3.3 & 4.3.4 ─────────────────────────────────────── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-emerald-600 tracking-wider uppercase">ตรรกะการสื่อสารสายตรงเทียบสายไขว้</span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              การเข้าหัวแบบสายตรง (Straight-through) และการเข้าหัวแบบสายไขว้ (Crossover)
            </h3>
          </div>

          <div className="text-[16px] md:text-[17px] font-normal text-zinc-600 leading-relaxed space-y-4">
            <p>ในการประกอบโครงร่างเครือข่าย ช่างไอทีระบบบำรุงรักษาต้องเลือกประเภทการประกอบสายสัญญาณให้เข้ากับตรรกะเชื่อมต่ออุปกรณ์ 2 รูปแบบหลัก:</p>

            <ul className="space-y-4 my-4 text-left">
              <li className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center p-1 rounded-full bg-emerald-100 text-emerald-600 shrink-0 mt-0.5">
                  <Check className="w-4 h-4" />
                </span>
                <div>
                  <strong>สายตรง (Straight-through Cable):</strong> ปลายทั้งสองฝั่งใช้มาตรฐานสีเดียวกันทั้งหมด (เช่น T568B ทั้ง Side A และ Side B) พินต่อเชื่อม 1➔1, 2➔2 เพื่อใช้ประสานงานส่งสัญญาณข้ามอุปกรณ์ต่างชนิดกัน (คอมพิวเตอร์ต่อพ่วงหา Switch หรือ Switch ต่อพ่วงหา Router)
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center p-1 rounded-full bg-emerald-100 text-emerald-600 shrink-0 mt-0.5">
                  <Check className="w-4 h-4" />
                </span>
                <div>
                  <strong>สายไขว้ (Crossover Cable):</strong> ปลายข้างหนึ่งเป็นมาตรฐาน T568B และอีกข้างจัดสลับเรียงเป็น T568A โดยระบบจะทำการสลับพินคู่ส่งรับสัญญาณ (Tx ไปหา Rx) ได้แก่ พิน 1 สลับกับ 3 และพิน 2 สลับกับ 6 วัตถุประสงค์เพื่อต่อเชื่อมพิกัดระหว่างอุปกรณ์ชนิดเดียวกันโดยตรง (เช่น PC ต่อหา PC หรือ Switch ต่อหา Switch)
                </div>
              </li>
            </ul>

            {/* Frosted Glass Callout — Auto-MDIX */}
            <div className="bg-emerald-50/60 backdrop-blur-md border border-emerald-200/60 rounded-2xl p-4 border-l-[3px] border-l-emerald-500 leading-relaxed">
              <p className="text-[15px] text-emerald-800 flex items-start gap-2">
                <Info className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong>เทคนิคหน้างาน Auto-MDIX:</strong> ในอุปกรณ์เครือข่ายสวิตช์/การ์ดแลนสมัยใหม่จะมีฟังก์ชันตรวจเช็คพินอัตโนมัติที่ชื่อว่า <strong>Auto-MDIX</strong> คอยสลับขั้วส่งรับระดับอิเล็กทรอนิกส์ในพอร์ต ทำให้ช่างสามารถหยิบใช้สายตรง (Straight) เชื่อมต่ออุปกรณ์ชนิดเดียวกันได้โดยที่ระบบไม่ล่ม
                </span>
              </p>
            </div>
          </div>

          {/* Interactive Simulator 2: Straight-through vs Crossover Pinout Map */}
          <PinoutWireMatcher />
        </section>

        {/* ─── SUBTOPIC 4.3.5 ─────────────────────────────────────────────── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-emerald-600 tracking-wider uppercase">การวินิจฉัยเยียวยาสายนำสัญญาณชำรุด</span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              การใช้เครื่องมือทดสอบสายสัญญาณ (Cable Tester) และการวิเคราะห์จุดสายขาด
            </h3>
          </div>

          <div className="text-[16px] md:text-[17px] font-normal text-zinc-600 leading-relaxed space-y-4">
            <p>
              หลังจากขั้นตอนเข้าหัวคีมย้ำ RJ-45 เสร็จสิ้น ช่างจำเป็นต้องตรวจสอบความมั่นคงปลอดภัยและความพร้อมใช้งานก่อนนำไปเสียบเข้าบอร์ดหลัก
              ผ่านอุปกรณ์ที่เรียกว่า <strong>LAN Cable Tester (เครื่องทดสอบสายสัญญาณ)</strong>
              ซึ่งประกอบด้วยเครื่องปล่อยสัญญาณ (Master) และกล่องรับสัญญานปลายทาง (Remote) ทำการยิงไฟ LED สแกนเรียงลำดับทีละพินจาก 1 ถึง 8
            </p>
            <p>ลักษณะความเสียหายสำคัญ 3 แบบที่เครื่องสามารถวัดวิเคราะห์และวินิจฉัยจุดพังทลายได้สำเร็จ:</p>

            {/* Premium Glassmorphism Error Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-4 text-left">
              {ERROR_TYPE_CARDS.map((card) => (
                <div
                  key={card.badge}
                  className={`bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-5 hover:-translate-y-1 hover:shadow-2xl ${card.hoverBorder} transition-all duration-300 cursor-pointer space-y-2.5 group`}
                >
                  <span className={`${card.badgeBg} ${card.badgeText} font-mono font-bold text-[13px] px-2 py-0.5 rounded-lg inline-block`}>
                    {card.badge}
                  </span>
                  <h6 className="font-bold text-zinc-900 text-[15px] leading-tight group-hover:text-zinc-700 transition-colors">
                    {card.title}
                  </h6>
                  <p className="text-[13.5px] text-zinc-500 leading-relaxed font-sans">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Simulator 3: Virtual 8-Pin Cable Tester */}
          <VirtualCableTester />
        </section>

        {/* ─── SUBTOPIC 4.3.6 ─────────────────────────────────────────────── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-emerald-600 tracking-wider uppercase">เต้ารับสัญญาณติดผนังและแผงกระจายสายกลาง</span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              การเข้าสาย UTP กับเต้ารับตัวเมีย (Keystone Jack) และแผง Patch Panel
            </h3>
          </div>

          <div className="text-[16px] md:text-[17px] font-normal text-zinc-600 leading-relaxed space-y-4">
            <p>
              ในขอบเขตการติดตั้งสายเดินระบบอาคารสากล สาย LAN จะไม่ลากพาดพื้นห้องโดยตรง ทว่าจะเดินผ่านฝ้าเพดานลงมาเก็บพิกัดปลายทางที่เต้ารับตัวเมียติดฝาผนัง
              <strong>(RJ-45 Keystone Jack)</strong> และรวมตัวกันด้านหลังของตู้แร็คเซิร์ฟเวอร์บนแผงกระจายสายสัญญาณ
              <strong>(Patch Panel)</strong>
            </p>
            <p>
              เครื่องมือและทักษะช่างที่สำคัญในขอบเขตนี้คือการสั่งการย้ำสายด้วยเครื่องมือ
              <strong>Impact Punch-down Tool (ตัวกระแทกสาย)</strong> เพื่อสลักลวดทองแดงลงล็อกพลาสติกแผงเชื่อมต่อ
              ช่วยยึดแน่น แบนด์วิดท์ไม่หลวม และลด Attenuation ได้มั่นคงสูง
            </p>
          </div>

          {/* Interactive Simulator 4: Keystone Punch-down Lab */}
          <KeystonePunchdownLab />
        </section>

        {/* ─── QUIZ ENGINE SECTION ────────────────────────────────────────── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-emerald-600 tracking-wider uppercase">การประเมินผล</span>
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
            title="ภารกิจวางขั้นตอนเข้าหัวและเขียนแผนวินิจฉัยเครือข่ายห้องแล็บที่ใช้งานล้มเหลว"
            taskText={`ให้นักเรียนสวมบทบาทเป็นช่างเทคนิคระบบบำรุงรักษาคอมพิวเตอร์ และจัดทำ "คู่มือการปฏิบัติงานเข้าหัวและบันทึกวิเคราะห์จุดชำรุดสายแลน" (Cabling Engineering & Diagnostics Report)
1. เขียนเรียงลำดับสีบิตทั้ง 8 พิน ตามมาตรฐาน T568B และ T568A ตั้งแต่พินที่ 1 ถึง 8 อย่างเป็นระเบียบชัดเจน
2. อธิบายกระบวนการวินิจฉัย (Troubleshooting Flow) เมื่อนำกล่อง Cable Tester ยิงสแกนสายแลนเส้นหนึ่งแล้วขึ้นอาการ: Master ไฟกะพริบเรียง 1-8 ครบถ้วน ทว่า Remote ไฟดับสนิทไม่ติดสว่างเลยที่พิน 2 และพิน 6 ระบุสาเหตุที่แท้จริงของการจัดเรียงสาย
3. วางขั้นตอนอย่างย่อ 4 สเตปในการนำเอาตัวย้ำกระแทก Impact Punch-down Tool ยึดสายแลน UTP เข้ากับเต้ารับติดผนังตัวเมีย (Keystone Jack) ให้มีความมั่นคงสูงและแบนด์วิดท์ไม่สูญเสีย`}
          />
        </div>

      </main>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   1. RJ-45 WIRE COLOR ARRANGER & CHECKER (Subtopics 4.3.1 & 4.3.2)
   ═══════════════════════════════════════════════════════════════════ */
function Rj45WireArranger() {
  const [standard, setStandard] = useState('T568B');
  const [wireOrder, setWireOrder] = useState([1, 0, 3, 2, 5, 4, 7, 6]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [feedback, setFeedback] = useState('กรุณาคลิกเลือกสายสองขั้วเพื่อกดสลับที่ (Swap) จัดเรียงลำดับสีให้สมบูรณ์');
  const [isMatch, setIsMatch] = useState(false);

  const handleWireClick = (idx) => {
    if (selectedIndex === null) {
      setSelectedIndex(idx);
    } else {
      const newOrder = [...wireOrder];
      const temp = newOrder[selectedIndex];
      newOrder[selectedIndex] = newOrder[idx];
      newOrder[idx] = temp;
      setWireOrder(newOrder);
      setSelectedIndex(null);
      setFeedback('กดสลับตำแหน่งสำเร็จ ตรวจสอบความถูกต้องถัดไป');
    }
  };

  const handleVerify = () => {
    const correctOrder = STANDARDS[standard];
    const match = wireOrder.every((val, idx) => val === correctOrder[idx]);
    setIsMatch(match);
    if (match) {
      setFeedback(`🎉 สุดยอด! จัดเรียงสีตามมาตรฐานสากล ${standard} สำเร็จ ถูกต้องครบถ้วนพิกัดบิตส่ง Tx/Rx`);
    } else {
      setFeedback(`❌ มีบางพินจัดเรียงผิดพลาด ตรวจทานรายละเอียดลำดับสีมาตรฐาน ${standard} ใหม่`);
    }
  };

  const handleApplyAnswer = () => {
    setWireOrder([...STANDARDS[standard]]);
    setIsMatch(true);
    setFeedback(`💡 เผยลำดับพินเฉลยสีสากลตามมาตรฐาน ${standard} เรียบร้อย`);
  };

  const handleReset = () => {
    setWireOrder([3, 1, 0, 4, 2, 7, 5, 6]);
    setSelectedIndex(null);
    setIsMatch(false);
    setFeedback('กรุณาคลิกเลือกสายสองขั้วเพื่อกดสลับที่ (Swap) จัดเรียงลำดับสีให้สมบูรณ์');
  };

  return (
    <SimulatorShell
      icon={<Cpu className="w-6 h-6 text-emerald-500" />}
      title="เครื่องจัดเรียงสีเข้าหัวแลนระดับพิน (RJ-45 Wire Color Arranger)"
      accentBg="bg-emerald-50"
      iconColor="text-emerald-600"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch select-none text-left font-sans">

        {/* Left Column: Frosted Dark Glass Configurator */}
        <div className="bg-slate-900/90 backdrop-blur-xl rounded-2xl p-5 border border-white/10 flex flex-col justify-between shadow-2xl relative min-h-[420px] text-xs text-slate-200">
          <span className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold tracking-widest">RJ-45 PINOUT BUILDER</span>

          <div className="space-y-4 pt-1">
            <div>
              <h6 className="text-[13px] font-bold text-white flex items-center gap-2">
                <span className="p-1.5 rounded-xl bg-emerald-500/20 text-emerald-400"><Sliders className="w-3.5 h-3.5" /></span>
                Standard & Color Slots
              </h6>
              <p className="text-[11px] text-slate-400 leading-normal mt-1">
                ปุ่มเลือกมาตรฐานสากล และกดสลับสีทองแดงให้ถูกต้องก่อนสอดเข้าหัวพลาสติก
              </p>
            </div>

            {/* Standard selector */}
            <div className="flex gap-2 bg-slate-950/80 p-1 rounded-xl border border-slate-800/50">
              {['T568B', 'T568A'].map(std => (
                <button
                  key={std}
                  onClick={() => { setStandard(std); handleReset(); }}
                  className={`w-full py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                    standard === std ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {std === 'T568B' ? 'มาตรฐาน T568B (ออฟฟิศ)' : 'มาตรฐาน T568A (ภาครัฐ)'}
                </button>
              ))}
            </div>

            {/* SVG RJ-45 visual plug */}
            <div className="w-full py-2 flex justify-center bg-slate-950/50 rounded-xl border border-slate-900/60 relative">
              <svg viewBox="0 0 240 120" className="w-56 h-28 overflow-visible">
                <rect x="30" y="20" width="180" height="80" rx="8" fill="#1E293B" fillOpacity="0.6" stroke="#475569" strokeWidth="2" />
                {wireOrder.map((colorId, idx) => {
                  const xCoord = 45 + idx * 20;
                  const c = COLOR_PALETTES[colorId];
                  return (
                    <g key={idx}>
                      <rect x={xCoord} y="15" width="10" height="12" fill="#F59E0B" rx="1.5" />
                      <rect
                        x={xCoord + 1} y="27" width="8" height="65"
                        fill={c.hex} stroke={selectedIndex === idx ? '#22D3EE' : c.border}
                        strokeWidth={selectedIndex === idx ? '2.5' : '1.5'} rx="1"
                        className="transition-all duration-300 cursor-pointer hover:opacity-80"
                        onClick={() => handleWireClick(idx)}
                      />
                      <text x={xCoord + 5} y="100" fill="#94A3B8" fontSize="7" textAnchor="middle" fontWeight="bold" fontFamily="mono">{idx + 1}</text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Wire chip buttons */}
            <div className="grid grid-cols-4 gap-1.5">
              {wireOrder.map((colorId, idx) => {
                const c = COLOR_PALETTES[colorId];
                const isSelected = selectedIndex === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleWireClick(idx)}
                    style={{ backgroundColor: c.hex, borderColor: isSelected ? '#22D3EE' : c.border }}
                    className={`p-2 border text-[10.5px] rounded-lg font-bold transition-all cursor-pointer active:scale-95 text-center ${c.bgText} ${
                      isSelected ? 'border-2 shadow-lg shadow-cyan-500/20' : ''
                    }`}
                  >
                    พิน {idx + 1}
                    <span className="block text-[8.5px] font-normal leading-none mt-0.5 opacity-90">{c.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-3 bg-slate-950/60 border border-slate-800/40 rounded-xl mt-3 leading-normal text-slate-400 text-[10px]">
            💡 <strong>ลำดับที่เรียงปัจจุบัน:</strong> {wireOrder.map(id => COLOR_PALETTES[id].name).join(', ')}
          </div>
        </div>

        {/* Right Column: Verify / Feedback */}
        <div className="flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <span className="text-[13px] font-bold text-slate-400 uppercase tracking-wider block">การเรียงพิกัดบิตส่ง Tx/Rx สหรัฐอเมริกา</span>
            <div className="text-slate-600 text-[14.5px] leading-relaxed font-sans space-y-3">
              <p>
                จัดเรียงลำดับสีโดยกดสลับตำแหน่งทีละคู่ โดยพินนำสัญญาณ <strong>1 และ 2 (ใช้สำหรับส่ง Tx)</strong>
                และพินที่ <strong>3 และ 6 (ใช้สำหรับรับ Rx)</strong> จำเป็นต้องตีคู่สีตามมาตรฐาน TIA/EIA
              </p>
              <p className="text-[13px] text-slate-400 leading-relaxed">
                คลิกสลับสายทีละ 2 ตำแหน่งในบล็อกซ้าย เพื่อให้ได้ลำดับสีที่ถูกต้อง แล้วกด <strong>Verify</strong> ตรวจสอบ
              </p>
            </div>

            {/* Frosted status callout */}
            <div className={`p-3.5 rounded-xl border flex gap-3 text-xs leading-normal backdrop-blur-md ${
              isMatch
                ? 'border-emerald-500/30 bg-emerald-50/60 text-emerald-700'
                : 'border-white/30 bg-white/40 text-slate-500'
            }`}>
              <Info className="w-5 h-5 shrink-0" />
              <p className="font-sans leading-relaxed">{feedback}</p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 pt-2">
            <button
              onClick={handleVerify}
              className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl cursor-pointer active:scale-98 shadow-lg shadow-emerald-500/20 transition-all"
            >
              🔍 ตรวจสอบสีการจัดวาง (VERIFY)
            </button>
            <button
              onClick={handleApplyAnswer}
              className="w-[38%] py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl cursor-pointer active:scale-98 border border-indigo-500/30 transition-all"
            >
              ดูเฉลยพิน
            </button>
            <button
              onClick={handleReset}
              className="p-2.5 bg-slate-800/80 border border-slate-700/50 text-slate-400 hover:text-white rounded-xl cursor-pointer active:scale-95 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </SimulatorShell>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   2. PINOUT WIRE MATCHER (Subtopic 4.3.3 & 4.3.4)
   ═══════════════════════════════════════════════════════════════════ */
function PinoutWireMatcher() {
  const [cableType, setCableType] = useState('straight');

  return (
    <SimulatorShell
      icon={<Network className="w-6 h-6 text-emerald-500 animate-pulse" />}
      title="เครื่องจำลองวิชวลพินส่ง-รับสายตรงเทียบสายไขว้ (Pinout Wire Matcher)"
      accentBg="bg-emerald-50"
      iconColor="text-emerald-600"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch select-none text-left font-sans">

        {/* Left: SVG Pinout visual  */}
        <div className="bg-slate-950/95 backdrop-blur-xl rounded-2xl p-6 border border-white/5 flex flex-col justify-between items-center relative min-h-[380px] lg:col-span-2 shadow-2xl">
          <span className="text-[10px] font-mono text-slate-500 absolute top-3 left-3">PINOUT TRANSMISSION PATHWAYS</span>

          <svg viewBox="0 0 350 260" className="w-full max-w-[320px] h-64 z-10 my-auto">
            {Array.from({ length: 8 }).map((_, idx) => {
              const pinNum = idx + 1;
              const yStart = 25 + idx * 28;
              let yEnd = yStart;
              if (cableType === 'crossover') {
                if (pinNum === 1) yEnd = 25 + 2 * 28;
                else if (pinNum === 2) yEnd = 25 + 5 * 28;
                else if (pinNum === 3) yEnd = 25 + 0 * 28;
                else if (pinNum === 6) yEnd = 25 + 1 * 28;
              }
              return (
                <path
                  key={idx}
                  d={`M 40 ${yStart} C 140 ${yStart}, 210 ${yEnd}, 310 ${yEnd}`}
                  fill="none"
                  stroke={cableType === 'crossover' && [1, 2, 3, 6].includes(pinNum) ? '#F59E0B' : '#10B981'}
                  strokeWidth="2.5"
                  className="transition-all duration-500"
                />
              );
            })}

            {Array.from({ length: 8 }).map((_, idx) => {
              const y = 25 + idx * 28;
              return (
                <g key={idx}>
                  <circle cx="40" cy={y} r="10" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
                  <text x="40" y={y + 3} fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="mono">{idx + 1}</text>
                </g>
              );
            })}

            {Array.from({ length: 8 }).map((_, idx) => {
              const y = 25 + idx * 28;
              return (
                <g key={idx}>
                  <circle cx="310" cy={y} r="10" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
                  <text x="310" y={y + 3} fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="mono">{idx + 1}</text>
                </g>
              );
            })}

            <text x="40" y="255" fill="#94A3B8" fontSize="8.5" fontWeight="bold" textAnchor="middle">Side A (T568B)</text>
            <text x="310" y="255" fill="#94A3B8" fontSize="8.5" fontWeight="bold" textAnchor="middle">
              {cableType === 'straight' ? 'Side B (T568B)' : 'Side B (T568A)'}
            </text>
          </svg>
        </div>

        {/* Right: Control panel */}
        <div className="flex flex-col justify-between space-y-4 lg:col-span-1">
          <div className="space-y-4">
            <span className="text-[12px] font-bold text-slate-400 uppercase tracking-wider block">สับเปลี่ยนการจำลองคู่เข็มส่งต่อ</span>
            <div className="flex flex-col gap-2.5">
              {[
                { key: 'straight', label: 'สายตรง (Straight-through)', info: 'ใช้ต่อ: คอมพิวเตอร์ ➔ Switch หรือ Switch ➔ Router (ต่างชนิดกัน)' },
                { key: 'crossover', label: 'สายไขว้ (Crossover Cable)', info: 'ใช้ต่อ: คอมพิวเตอร์ ➔ คอมพิวเตอร์ หรือ Switch ➔ Switch (ชนิดเดียวกัน)' },
              ].map(item => (
                <button
                  key={item.key}
                  onClick={() => setCableType(item.key)}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all font-bold active:scale-98 ${
                    cableType === item.key
                      ? item.key === 'straight'
                        ? 'border-emerald-500/40 bg-emerald-50/60 backdrop-blur-md text-emerald-900'
                        : 'border-amber-500/40 bg-amber-50/60 backdrop-blur-md text-amber-900'
                      : 'bg-white/60 backdrop-blur-sm border-white/40 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  {item.label}
                  <span className="block text-[9.5px] font-normal leading-normal text-slate-500 mt-1">{item.info}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Info callout */}
          <div className="p-4 rounded-xl border border-emerald-200/50 bg-emerald-50/50 backdrop-blur-md text-zinc-600 font-sans text-xs space-y-1.5">
            <h6 className="font-bold text-zinc-800 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-emerald-500" /> กลไกการสื่อสารบิต:
            </h6>
            <p className="text-[12px] leading-relaxed">
              ในสายไขว้ พิน <strong>1 (Tx+) ไขว้ไปหา 3 (Rx+)</strong> และพิน <strong>2 (Tx-) ไขว้ไปหา 6 (Rx-)</strong> เพื่อให้พอร์ตปล่อยกระแสเชื่อมเข้าสู่จุดรับสัญญาณปลายทางโดยไม่ต้องผ่านตัวถอดสัญญาณสลับพอร์ต
            </p>
          </div>
        </div>
      </div>
    </SimulatorShell>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   3. LAN CABLE TESTER SIMULATOR (Subtopic 4.3.5)
   ═══════════════════════════════════════════════════════════════════ */
function VirtualCableTester() {
  const [scenario, setScenario] = useState('pass');
  const [activePin, setActivePin] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState(['[READY] เครื่องวัดสัญญาณ LAN สแตนด์บาย...']);
  const loopTimer = useRef(null);

  const startTest = () => {
    if (isRunning) return;
    setIsRunning(true);
    setActivePin(null);
    setLogs([`[START] ดำเนินการยิงกระแสตรวจสอบชนิด: ${scenario.toUpperCase()} SCENARIO...`]);

    let currentPin = 0;
    if (loopTimer.current) clearInterval(loopTimer.current);

    loopTimer.current = setInterval(() => {
      currentPin += 1;
      if (currentPin <= 8) {
        setActivePin(currentPin);
        let masterOn = true;
        let remoteOn = true;
        let remoteTargetPin = currentPin;

        if (scenario === 'open') {
          if (currentPin === 5) { masterOn = false; remoteOn = false; }
        } else if (scenario === 'short') {
          if (currentPin === 1) remoteTargetPin = 3;
          else if (currentPin === 3) remoteTargetPin = 1;
        }

        const logLine = masterOn && remoteOn
          ? `พิน ${currentPin}: Master (🟢 ON) ➔ Remote พิน ${remoteTargetPin} (🟢 ON) [OK]`
          : masterOn && !remoteOn
          ? `พิน ${currentPin}: Master (🟢 ON) ➔ Remote พิน ${remoteTargetPin} (🔴 OFF) [ALERT - OPEN]`
          : `พิน ${currentPin}: Master (🔴 OFF) ➔ Remote พิน ${remoteTargetPin} (🔴 OFF) [ALERT - OPEN]`;

        setLogs(current => [...current, logLine]);
      } else {
        setActivePin(null);
        setIsRunning(false);
        setLogs(current => [
          ...current,
          scenario === 'pass'
            ? '✅ [TEST PASS] สัญญาณผ่านการรับสิทธิ์ครบถ้วนสมบูรณ์ 8 พิน พร้อมติดตั้ง'
            : scenario === 'open'
            ? '❌ [TEST FAILED] ตรวจพบอาการสายขาดใน (Open Circuit) ที่พิน 5 กรุณาตัดแต่งและเข้าหัวใหม่'
            : '❌ [TEST FAILED] ตรวจพบการเข้าพินสลับคู่สาย (Miswired/Short) ที่คู่ 1 และ 3'
        ]);
        clearInterval(loopTimer.current);
      }
    }, 800);
  };

  const handleReset = () => {
    if (loopTimer.current) clearInterval(loopTimer.current);
    setActivePin(null);
    setIsRunning(false);
    setLogs(['[READY] เครื่องวัดสัญญาณ LAN สแตนด์บาย...']);
  };

  useEffect(() => {
    return () => { if (loopTimer.current) clearInterval(loopTimer.current); };
  }, []);

  return (
    <SimulatorShell
      icon={<Activity className="w-6 h-6 text-emerald-500" />}
      title="เครื่องจำลองตรวจวิเคราะห์สายชำรุด (Virtual Cable Tester)"
      accentBg="bg-emerald-50"
      iconColor="text-emerald-600"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch select-none text-left font-sans">

        {/* Left: Frosted Dark LED Boxes */}
        <div className="bg-slate-950/95 backdrop-blur-xl rounded-2xl p-5 border border-white/5 flex flex-col justify-between items-center relative min-h-[350px] lg:col-span-2 shadow-2xl">
          <span className="text-[9px] font-mono text-slate-500 absolute top-3 left-3">Virtual Tester LED Indicators</span>

          <div className="my-auto w-full grid grid-cols-2 gap-8 text-center text-slate-200">
            {/* Master Unit */}
            <div className="bg-slate-900/80 rounded-2xl p-4 border border-slate-800/60 relative">
              <span className="text-[8px] font-mono text-emerald-400 absolute top-2 right-3">MASTER</span>
              <span className="text-xs font-bold block mb-3 border-b border-slate-800 pb-1 text-slate-400">TX GENERATOR</span>
              <div className="grid grid-cols-4 gap-y-2.5 gap-x-1.5 max-w-xs mx-auto">
                {Array.from({ length: 8 }).map((_, idx) => {
                  const pin = idx + 1;
                  const isActive = activePin === pin;
                  const isOff = scenario === 'open' && pin === 5 && isActive;
                  return (
                    <div key={idx} className="flex flex-col items-center">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[9px] transition-all duration-200 ${
                        isActive && !isOff
                          ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/40'
                          : 'bg-slate-800 text-slate-600'
                      }`}>{pin}</div>
                      <span className="text-[8px] text-slate-600 font-mono mt-0.5">LED</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Remote Unit */}
            <div className="bg-slate-900/80 rounded-2xl p-4 border border-slate-800/60 relative">
              <span className="text-[8px] font-mono text-cyan-400 absolute top-2 right-3">REMOTE</span>
              <span className="text-xs font-bold block mb-3 border-b border-slate-800 pb-1 text-slate-400">RX TERMINATION</span>
              <div className="grid grid-cols-4 gap-y-2.5 gap-x-1.5 max-w-xs mx-auto">
                {Array.from({ length: 8 }).map((_, idx) => {
                  const pin = idx + 1;
                  let isRemoteActive = false;
                  let isRemoteOff = false;
                  if (activePin !== null) {
                    if (scenario === 'pass') {
                      isRemoteActive = activePin === pin;
                    } else if (scenario === 'open') {
                      isRemoteActive = activePin === pin;
                      if (pin === 5) isRemoteOff = true;
                    } else if (scenario === 'short') {
                      if (activePin === 1 && pin === 3) isRemoteActive = true;
                      else if (activePin === 3 && pin === 1) isRemoteActive = true;
                      else if (activePin !== 1 && activePin !== 3) isRemoteActive = activePin === pin;
                    }
                  }
                  return (
                    <div key={idx} className="flex flex-col items-center">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[9px] transition-all duration-200 ${
                        isRemoteActive && !isRemoteOff
                          ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/40'
                          : 'bg-slate-800 text-slate-600'
                      }`}>{pin}</div>
                      <span className="text-[8px] text-slate-600 font-mono mt-0.5">LED</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="w-full flex gap-3 text-slate-500 text-[10px] font-mono justify-between items-center border-t border-slate-800/60 pt-3.5">
            <span>SCENARIO: <span className="font-bold text-cyan-400">{scenario.toUpperCase()}</span></span>
            <button onClick={handleReset} className="px-2.5 py-1 bg-slate-800/80 border border-slate-700/40 text-slate-400 hover:text-white rounded cursor-pointer active:scale-95 transition-all font-bold text-[9px]">RESET</button>
          </div>
        </div>

        {/* Right: Controls */}
        <div className="flex flex-col justify-between space-y-4 lg:col-span-1">
          <div className="space-y-4">
            <span className="text-[12px] font-bold text-slate-400 uppercase tracking-wider block">เลือกมาตรการอาการชำรุดของสาย UTP</span>
            <div className="flex flex-col gap-2.5">
              {[
                { key: 'pass',  label: '1. สายผ่านมาตรฐาน (PASS)',   info: 'เข็มไฟฟ้าสแกนเรียงตรงขนานกันสมบูรณ์' },
                { key: 'open',  label: '2. สายขาดในพิน 5 (OPEN)',    info: 'สายไฟฟ้าพิน 5 ขาด สลักทองเหลืองไม่สัมผัส' },
                { key: 'short', label: '3. สลับพิน 1 กับ 3 (MISWIRED)', info: 'เข้าลำดับสีผิดสลับพอร์ตฝั่ง Remote' },
              ].map(item => (
                <button
                  key={item.key}
                  onClick={() => { setScenario(item.key); handleReset(); }}
                  disabled={isRunning}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all font-bold active:scale-98 ${
                    scenario === item.key
                      ? 'border-emerald-500/40 bg-emerald-50/60 backdrop-blur-md text-emerald-900'
                      : 'bg-white/60 backdrop-blur-sm border-white/40 hover:border-slate-300 text-slate-700'
                  } disabled:opacity-50`}
                >
                  {item.label}
                  <span className="block text-[9.5px] font-normal leading-none text-slate-500 mt-1">{item.info}</span>
                </button>
              ))}
            </div>

            <button
              onClick={startTest}
              disabled={isRunning}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl cursor-pointer active:scale-98 shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-1.5 disabled:bg-slate-700 disabled:text-slate-400 transition-all"
            >
              <Play className="w-4 h-4" /> เริ่มวัดยิงสัญญาณไฟ (RUN TEST)
            </button>
          </div>
        </div>
      </div>

      {/* Log Console */}
      <div className="bg-slate-950/90 backdrop-blur-xl rounded-xl p-4 border border-slate-800/40 mt-5 text-left font-mono">
        <div className="text-slate-500 text-[10px] font-mono mb-2 uppercase tracking-wider flex justify-between items-center border-b border-slate-800/50 pb-1.5 font-sans">
          <span className="flex items-center gap-1.5"><Terminal className="w-3.5 h-3.5" /> Virtual Cable Analyzer Logs</span>
          {isRunning && <span className="text-cyan-400 flex items-center gap-1 text-[9px]"><RefreshCw className="w-2.5 h-2.5 animate-spin" /> SCANNING</span>}
        </div>
        <div className="space-y-1.5 min-h-[90px] max-h-[110px] overflow-y-auto leading-relaxed">
          {logs.map((log, index) => (
            <div key={index} className="flex gap-2 text-xs font-mono">
              <span className="text-slate-700 select-none">{'>>'}</span>
              <p className={
                log.includes('✅') || log.includes('[OK]') ? 'text-emerald-400 font-bold'
                  : log.includes('❌') || log.includes('ALERT') ? 'text-rose-400 font-bold'
                  : log.startsWith('[START]') ? 'text-cyan-300 font-bold'
                  : 'text-slate-400'
              }>{log}</p>
            </div>
          ))}
        </div>
      </div>
    </SimulatorShell>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   4. KEYSTONE JACK & PUNCH-DOWN SIMULATOR (Subtopic 4.3.6)
   ═══════════════════════════════════════════════════════════════════ */
function KeystonePunchdownLab() {
  const [step, setStep] = useState(0);
  const [logs, setLogs] = useState(['[READY] เต้ารับตัวเมียว่างเปล่า พร้อมสอดเข้าคู่สาย...']);

  const handleNextStep = () => {
    if (step === 0) {
      setStep(1);
      setLogs([
        '🔪 [STRIP OUTER] ทำการปอกเปลือกนอกพลาสติก PVC ของสายแลน UTP ออกยาวประมาณ 2.5 ซม. เรียบร้อย',
        '💡 เผยให้เห็นสายทองแดงคู่ตีเกลียว 4 คู่ภายใน พร้อมเคลียร์เศษเส้นใยฝอย'
      ]);
    } else if (step === 1) {
      setStep(2);
      setLogs(current => [
        '💡 [WIRE INSERTION] ทำการแยกคู่เกลียวสอดสายไฟทั้ง 8 ลงไปตามบล็อกร่องทองแดงเต้ารับ Keystone Jack',
        '💡 โดยจัดเรียงคู่สีตามตรรกะสเปกของค่ายมาตรฐาน T568B ด้านข้างเต้ารับเรียบร้อย',
        ...current
      ]);
    } else if (step === 2) {
      setStep(3);
      setLogs(current => [
        '🔨 [IMPACT PUNCH-DOWN] นำตัวกระแทกสายแลน (Impact Punch-down Tool) กดย้ำทองแดงลงบล็อกพลาสติกแน่นหนา',
        '🔨 ใบมีดสับปลายทองแดงส่วนเกินกระเด็นขาดเรียบสนิท บิตสัญญาณนาฬิกาไม่สูญเสียความถี่',
        '✅ [SUCCESS] เต้ารับ Keystone Jack ตัวเมียเข้าหัวมาตรฐานเสร็จสมบูรณ์ พร้อมครอบฝาและขันยึดผนังบล็อกห้องเรียน',
        ...current
      ]);
    }
  };

  const handleReset = () => {
    setStep(0);
    setLogs(['[READY] เต้ารับตัวเมียว่างเปล่า พร้อมสอดเข้าคู่สาย...']);
  };

  const STEP_ICONS = [
    <Scissors className="w-12 h-12 text-slate-400 animate-pulse mx-auto" key="s" />,
    <Sliders className="w-12 h-12 text-cyan-400 mx-auto" style={{ animation: 'bounce 2s infinite' }} key="sl" />,
    <Hammer className="w-12 h-12 text-amber-500 animate-pulse mx-auto" key="h" />,
    <CheckSquare className="w-12 h-12 text-emerald-400 mx-auto" key="c" />,
  ];
  const STEP_LABELS = [
    { title: 'ขั้นตอนที่ 1: ปอกเปลือกสาย LAN UTP', sub: 'ปอกปลอก PVC นอกสุดเพื่อให้เห็นสายไฟตีเกลียว 4 คู่' },
    { title: 'ขั้นตอนที่ 2: สอดสายไฟลงช่องร่องพลาสติก', sub: 'แยกสายไฟ 8 เส้นลงไปตามขั้วสีมาตรฐาน T568B ด้านข้างเต้ารับ' },
    { title: 'ขั้นตอนที่ 3: กระแทกยึดลวดและใบมีดตัด', sub: 'กดย้ำ Impact Punch-down Tool ให้พินทอง brass กดลึก และเลียปลายขาด' },
    { title: 'ขั้นตอนที่ 4: เต้ารับตัวเมียพร้อมใช้งาน!', sub: 'ครอบพลาสติกกันฝุ่น ขันเข้าบล็อกติดกำแพงเรียบร้อย 100%' },
  ];

  return (
    <SimulatorShell
      icon={<Scissors className="w-6 h-6 text-emerald-500" />}
      title="ห้องปฏิบัติการจำลองเข้าหัวตัวเมีย (Keystone Jack Punch-down)"
      accentBg="bg-emerald-50"
      iconColor="text-emerald-600"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch select-none text-left font-sans">

        {/* Left: Step display */}
        <div className="bg-slate-900/90 backdrop-blur-xl rounded-2xl p-5 border border-white/10 flex flex-col justify-between shadow-2xl relative min-h-[340px] text-xs text-slate-200">
          <span className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold tracking-widest">PUNCH-DOWN WORKFLOW</span>

          <div className="space-y-4 pt-2">
            <div>
              <h6 className="text-[13px] font-bold text-white flex items-center gap-2">
                <span className="p-1.5 rounded-xl bg-emerald-500/20 text-emerald-400"><Sliders className="w-3.5 h-3.5" /></span>
                Virtual Punch-down Process
              </h6>
              <p className="text-[11px] text-slate-400 leading-normal mt-1">
                จำลองทักษะการปฏิบัติเข้าหัวเต้ารับพิกัดตัวเมีย ด้วยตัวกระแทกสาย Impact Tool
              </p>
            </div>

            {/* Step visual */}
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/40 min-h-[140px] flex flex-col justify-center items-center gap-3">
              {STEP_ICONS[step]}
              <div className="text-center">
                <p className={`font-bold text-xs ${step === 3 ? 'text-emerald-400' : 'text-white'}`}>{STEP_LABELS[step].title}</p>
                <p className="text-[10px] text-slate-500 mt-1">{STEP_LABELS[step].sub}</p>
              </div>
            </div>

            {/* Step progress indicator */}
            <div className="flex gap-1.5 justify-center">
              {[0, 1, 2, 3].map(i => (
                <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${step >= i ? 'bg-emerald-500 w-8' : 'bg-slate-700 w-4'}`} />
              ))}
            </div>
          </div>

          <div className="flex gap-2 border-t border-slate-800/50 pt-3 mt-3">
            {step < 3 ? (
              <button
                onClick={handleNextStep}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl cursor-pointer active:scale-98 shadow-lg shadow-emerald-500/20 transition-all"
              >
                {step === 0 ? 'กดยิงปอกเปลือกสาย LAN (Strip)' :
                 step === 1 ? 'กดสอดสายลงบล็อกคู่สี (Insert)' :
                 'กดใช้ตัวกระแทกย้ำสาย (Punch-Down)'}
              </button>
            ) : (
              <button
                onClick={handleReset}
                className="w-full py-2.5 bg-slate-800/80 border border-slate-700/40 hover:bg-slate-700 text-slate-400 hover:text-white font-bold text-xs rounded-xl cursor-pointer active:scale-98 transition-all"
              >
                ประกอบเต้ารับใหม่ (RESET)
              </button>
            )}
          </div>
        </div>

        {/* Right: Log console */}
        <div className="bg-slate-950/95 backdrop-blur-xl rounded-2xl p-5 border border-white/5 shadow-2xl min-h-[340px] flex flex-col">
          <div className="text-slate-500 text-[10px] font-mono mb-2 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-800/50 pb-1.5 font-sans">
            <Terminal className="w-3.5 h-3.5" /> Keystone Punch-down Logs
          </div>
          <div className="space-y-1.5 min-h-[200px] overflow-y-auto leading-relaxed flex-1 mt-2">
            {logs.map((log, index) => (
              <div key={index} className="flex gap-2 text-xs font-mono">
                <span className="text-slate-700 select-none">{'>'}</span>
                <p className={
                  log.startsWith('✅') ? 'text-emerald-400 font-bold'
                    : log.startsWith('🔨') || log.startsWith('🔪') ? 'text-cyan-300 font-bold'
                    : 'text-slate-400'
                }>{log}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SimulatorShell>
  );
}
