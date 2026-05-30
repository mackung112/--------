/**
 * it4_4.jsx — หน่วยที่ 4.4 สื่อกลางการเชื่อมต่อแบบไร้สาย (Wireless Transmission Media)
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
  Cpu, Activity, Radio, LockKeyhole, Network, Sliders, Settings2, ShieldCheck as SecureIcon, Scan
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
   AMBIENT BACKDROP THEME — IT Unit 4.4 (Teal/Indigo/Violet/Slate)
   ═══════════════════════════════════════════════════════════════════ */
const IT4_4_BLOBS = [
  { color: 'bg-indigo-300',  size: 'w-[450px] h-[450px]', position: '-top-20 -left-20',       opacity: 'opacity-30' },
  { color: 'bg-violet-200',  size: 'w-[400px] h-[400px]', position: 'top-1/3 -right-20',      opacity: 'opacity-25' },
  { color: 'bg-teal-300',    size: 'w-96 h-96', position: '-bottom-20 left-1/4',     opacity: 'opacity-20' },
  { color: 'bg-slate-350',   size: 'w-80 h-80', position: 'top-2/3 right-1/3',       opacity: 'opacity-20' },
];

/* ═══════════════════════════════════════════════════════════════════
   DATA: QUIZ FOR UNIT 4.4
   ═══════════════════════════════════════════════════════════════════ */
const QUIZ_LEVELS = [
  {
    title: 'โจทย์ที่ 1: คุณสมบัติฟิสิกส์คลื่นไมโครเวฟ',
    desc: 'ในการสื่อสารไร้สาย ข้อใดระบุลักษณะทางฟิสิกส์และการนำไปใช้งานของคลื่นไมโครเวฟ (Microwave) ได้อย่างถูกต้อง?',
    options: [
      { key: 'A', text: 'มีความถี่ต่ำมาก สะท้อนชั้นบรรยากาศไอโอโนสเฟียร์ และนำไปใช้กับวิทยุแร่โบราณ', isCorrect: false },
      { key: 'B', text: 'เดินทางเป็นเส้นตรงระดับสายตา (Line-of-Sight) ไม่เลี้ยวเบนอ้อมสิ่งกีดขวาง นำไปใช้กับสัญญาณดาวเทียมและคลื่นเซลลูลาร์ 5G', isCorrect: true },
      { key: 'C', text: 'ไม่สามารถส่งสัญญาณพ้นวัตถุทึบแสงได้เลย จึงใช้เฉพาะในรีโมททีวีระยะ 5 เมตร', isCorrect: false },
      { key: 'D', text: 'เป็นคลื่นเสียงที่ต้องอาศัยตัวกลางของแข็งในการเหนี่ยวนำข้ามสายสัญญาณ', isCorrect: false }
    ],
    tip: 'คลื่นไมโครเวฟเป็นคลื่นความถี่สูงมาก เดินทางเป็นเส้นตรงระดับสายตา (LOS) จึงนำมาใช้กับการส่งสัญญาณข้ามดาวเทียมและโมดูล 5G'
  },
  {
    title: 'โจทย์ที่ 2: มาตรฐาน Wi-Fi 6 และฟีเจอร์เด่น',
    desc: 'มาตรฐานเครือข่ายไร้สาย IEEE 802.11ax หรือ Wi-Fi 6 ได้นำเข้าเทคโนโลยีสำคัญใดเพื่อแก้ไขปัญหาสัญญาณชนกันเมื่อเชื่อมต่อพนักงานจำนวนมากพร้อมกัน?',
    options: [
      { key: 'A', text: 'FAT32 Partition Table', isCorrect: false },
      { key: 'B', text: 'OFDMA (Orthogonal Frequency Division Multiple Access) และ MU-MIMO สองทิศทาง ช่วยแชร์แบ่งช่องย่อยส่งพร้อมกันไร้ดีเลย์', isCorrect: true },
      { key: 'C', text: 'การปิดย่านความถี่ 5GHz และหันมาพึ่งพาความถี่วิทยุ AM/FM', isCorrect: false },
      { key: 'D', text: 'ระบบมอดูเลตสัญญาณ ASK และดีโมดูเลตด้วยสายโคแอกเชียล', isCorrect: false }
    ],
    tip: 'Wi-Fi 6 ปฏิวัติโดยใช้ OFDMA เพื่อแบ่งพอร์ตช่องสัญญาณย่อย คล้ายกับส่งรถขนส่งหลายคันพร้อมกันในถนนเส้นเดียว ลดคิวหน่วงชำรุด'
  },
  {
    title: 'โจทย์ที่ 3: ขอบข่ายสเปกของเทคโนโลยี Bluetooth',
    desc: 'เทคโนโลยี Bluetooth ในฐานะระบบเครือข่ายไร้สายส่วนบุคคล (WPAN) มีขอบเขตการครอบคลุมรัศมีทางกายภาพและวัตถุประสงค์ใช้งานหลักในลักษณะใด?',
    options: [
      { key: 'A', text: 'ลากสัญญาณไกลข้ามทวีปด้วยแสงเลเซอร์ความเข้มข้นสูง', isCorrect: false },
      { key: 'B', text: 'ครอบคลุมระยะสั้นไม่เกิน 10 เมตร ใช้แบนด์วิดท์ต่ำเชื่อมต่ออุปกรณ์รอบตัว เช่น หูฟัง ลำโพง สมาร์ทวอทช์ อย่างปลอดภัยประหยัดไฟ', isCorrect: true },
      { key: 'C', text: 'ใช้บล็อกการแฮกเกอร์ข้าม LAN ขีดจำกัดขอบเขตในตู้แร็ค', isCorrect: false },
      { key: 'D', text: 'ยึดเหนี่ยวสายสัญญาณ UTP เข้าเต้ารับ Keystone Jack', isCorrect: false }
    ],
    tip: 'Bluetooth (IEEE 802.15.1) มุ่งเน้นเชื่อมต่ออุปกรณ์พกพาส่วนบุคคลในระยะประชิด (PAN) แบนด์วิดท์พอเหมาะ ประหยัดพลังงานเป็นเลิศ'
  },
  {
    title: 'โจทย์ที่ 4: การเข้ารหัสลับแบบ WPA3 เพื่อความมั่นคงสูงสุด',
    desc: 'ระบบความปลอดภัยและเข้ารหัสลับไร้สายยุคปัจจุบัน WPA3 พัฒนาจุดเด่นเหนือ WPA2 อย่างไรเพื่อป้องกันผู้ประสงค์ร้ายแอบดักจับรหัสผ่านเครือข่ายบริษัท?',
    options: [
      { key: 'A', text: 'บังคับให้ผู้ใช้ทุกคนต่อสายแลนทองแดง STP เพื่อกรองกระแส', isCorrect: false },
      { key: 'B', text: 'นำเข้ากลไกตรวจสอบสิทธิ์ SAE (Simultaneous Authentication of Equals) ป้องกันการถูกแฮกรหัสแบบออฟไลน์ดักเดารอบพอร์ต', isCorrect: true },
      { key: 'C', text: 'ยกเลิกระบบรหัสผ่านและหันไปแปลงสัญญาณด้วย ASK Sine Wave', isCorrect: false },
      { key: 'D', text: 'การจำกัดแบนด์วิดท์ช่องสัญญาณให้เหลือเพียง 20 MHz ถาวร', isCorrect: false }
    ],
    tip: 'WPA3 นำระบบ SAE เข้ามาหักล้างการเดารหัสแบบออฟไลน์ (Offline Dictionary Attacks) แม้ผู้ใช้จะตั้งรหัสผ่านง่ายกว่ามาตรฐานก็ตาม'
  },
  {
    title: 'โจทย์ที่ 5: การปรับองศาของเสาอากาศ WAP (Antenna Polarization)',
    desc: 'เพื่อประสิทธิภาพการกระจายคลื่นคลุมพื้นที่สูงสุดตามแนวนอน ช่างเทคนิคไอทีควรจัดระเบียบและปรับองศาเสาอากาศรอบทิศทางของอุปกรณ์เราเตอร์ WAP ในลักษณะใด?',
    options: [
      { key: 'A', text: 'พับเก็บเสาแนบระนาบไปกับกล่องเราเตอร์ถาวร', isCorrect: false },
      { key: 'B', text: 'ตั้งเสาอากาศขึ้นตรงทำมุม 90 องศากับพื้นโลก (Vertical Polarization) เพื่อแผ่คลื่นแม่เหล็กออกในระนาบแนวนอนรอบวง', isCorrect: true },
      { key: 'C', text: 'ชี้เสาอากาศเฉียงขนานไปกับกำแพงแผงปูนคอนกรีตหนา', isCorrect: false },
      { key: 'D', text: 'หันเสาสัญญาณชนเข้าหากล่องไฟร์วอลล์ฮาร์ดแวร์โดยตรง', isCorrect: false }
    ],
    tip: 'เสาอากาศแบบรอบทิศทาง (Omnidirectional) จะแผ่คลื่นออกในแนวตั้งฉากกับตัวเสา การตั้งเสาชี้ฟ้าแนวตั้งจะทำคลื่นแผ่กว้างตามแนวระนาบราบขอบเขตออฟฟิศ'
  }
];

export default function ComponentName() {
  return (
    <>
      {/* Layer 1: Ambient Backdrop & Theme Gradients */}
      <AmbientBackdrop blobs={IT4_4_BLOBS} />

      {/* Layer 3: Flexible Subtopics & Fluid Open-Air Layout */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16 relative z-10">
        
        {/* ─── SUBTOPIC 4.4.1 ─────────────────────────────────────────────── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">ช่วงความยาวคลื่นแม่เหล็กไฟฟ้าฟิสิกส์</span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              คุณสมบัติทางฟิสิกส์ของคลื่นวิทยุ คลื่นไมโครเวฟ และอินฟราเรด
            </h3>
          </div>
          
          <div className="text-[16px] md:text-[17px] font-normal text-zinc-600 leading-relaxed space-y-4">
            <p>
              ในโลกทัศนศาสตร์ฟิสิกส์และระบบเครือข่ายไร้สาย <strong>สื่อกลางส่งข้อมูลแบบไร้สาย (Wireless Transmission Media)</strong> 
              ทำงานเหนี่ยวนำสัญญาณผ่านชั้นบรรยากาศโดยอาศัย <strong>คลื่นแม่เหล็กไฟฟ้า (Electromagnetic Waves)</strong> 
              ซึ่งจำแนกกลุ่มความยาวคลื่นและขีดสมรรถนะการนำส่งข้อมูลแตกต่างกันตามช่วงความถี่สากล 3 ช่วงสำคัญ:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-4 text-left">
              <div className="bg-gradient-to-br from-indigo-50/60 to-white p-5 rounded-2xl border border-indigo-100 shadow-sm space-y-2">
                <span className="p-2 rounded-xl bg-indigo-100 text-indigo-700 font-mono font-bold text-xs inline-block">คลื่นวิทยุ (Radio Waves)</span>
                <h6 className="font-bold text-indigo-950 text-[14.5px]">ความถี่ 3 kHz - 300 MHz</h6>
                <p className="text-xs text-zinc-550 leading-relaxed font-sans">
                  ความยาวคลื่นค่อนข้างยาว สามารถแผ่เลี้ยวเบนอ้อมผ่านสิ่งกีดขวางกำแพงได้ดี สะท้อนชั้นบรรยากาศส่งได้ระยะไกลมาก เหมาะสมกับสัญญาณวิทยุและเครือข่ายไร้สายย่านประหยัดความเร็ว
                </p>
              </div>
              <div className="bg-gradient-to-br from-violet-50/60 to-white p-5 rounded-2xl border border-violet-100 shadow-sm space-y-2">
                <span className="p-2 rounded-xl bg-violet-100 text-violet-700 font-mono font-bold text-xs inline-block">คลื่นไมโครเวฟ (Microwaves)</span>
                <h6 className="font-bold text-violet-950 text-[14.5px]">ความถี่ 300 MHz - 300 GHz</h6>
                <p className="text-xs text-zinc-555 leading-relaxed font-sans font-mono">
                  ความถี่สูงมาก เดินทางเป็นเส้นตรงระดับสายตา (Line-of-Sight) ไม่เลี้ยวเบนอ้อมตึก ถูกบดบังด้วยฝน/สิ่งกีดขวางทึบได้ ทว่ามีขีดความเร็วแบนด์วิดท์ส่งข้อมูลสูง จึงใช้กับ Wi-Fi, 5G และดาวเทียม
                </p>
              </div>
              <div className="bg-gradient-to-br from-teal-50/60 to-white p-5 rounded-2xl border border-teal-100 shadow-sm space-y-2">
                <span className="p-2 rounded-xl bg-teal-100 text-teal-700 font-mono font-bold text-xs inline-block">คลื่นอินฟราเรด (Infrared)</span>
                <h6 className="font-bold text-teal-950 text-[14.5px]">ความถี่ 300 GHz - 400 THz</h6>
                <p className="text-xs text-zinc-555 leading-relaxed font-sans font-mono">
                  ความถี่สูงจัดความยาวคลื่นสั้นมาก ไม่สามารถทะลุกำแพงทึบแสงได้เลยแม้แต่ชั้นเดียว มีความเสถียรไร้สัญญาณรบกวนข้ามห้อง เหมาะสมกับรีโมทโทรทัศน์ หรือช่องยิงสัญญาณระยะประชิดสั้นๆ
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Simulator 1: Wireless Wave Spectrum Analyzer */}
          <SpectrumInspector />
        </section>

        {/* ─── SUBTOPIC 4.4.2 ─────────────────────────────────────────────── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">วิวัฒนาการแบนด์วิดท์เครือข่ายสากล</span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              มาตรฐานเครือข่ายไร้สาย IEEE 802.11 (Wi-Fi 4, 5, 6) ย่านความถี่ 2.4GHz และ 5GHz
            </h3>
          </div>

          <div className="text-[16px] md:text-[17px] font-normal text-zinc-600 leading-relaxed space-y-4">
            <p>
              เพื่อความเข้ากันได้ของอุปกรณ์ WAP และแผงการ์ดแลนไร้สายทั่วโลก องค์กร IEEE 
              จึงกำหนดอนุกรมมาตรฐาน <strong>IEEE 802.11 (Wi-Fi)</strong> เพื่อควบคุมกลไกการรับส่งข้อมูลผ่านอากาศ 
              โดยมีการสลับใช้ช่องย่านความถี่หลัก 2 ด้านคือ <strong>2.4 GHz</strong> (ช่องสัญญาณน้อย ทับซ้อนง่าย ทะลุดี) 
              และ <strong>5 GHz</strong> (ช่องสัญญาณกว้าง ไม่ชนกัน ทะลุแย่)
            </p>
            <p>
              ตารางเปรียบเทียบวิวัฒนาการความแรงแบนด์วิดท์ช่องสัญญาณ:
            </p>
            
            <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-6 border-l-[3.5px] border-l-indigo-500/80 mt-4 space-y-3 leading-normal text-slate-500 text-sm">
              <h5 className="font-bold text-slate-800 flex items-center gap-2">
                <Info className="w-5 h-5 text-indigo-500" /> วิวัฒนาการย่านและเทคนิคมาตรฐาน Wi-Fi
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-700 block mb-1">Wi-Fi 4 (802.11n) - ยุคริเริ่ม MIMO</span>
                  รองรับย่าน 2.4GHz และ 5GHz ความกว้างช่อง 20/40MHz ความเร็วสูงสุด 600 Mbps เริ่มใช้เสาอากาศหลายต้นรับส่งพร้อมกัน
                </div>
                <div className="bg-indigo-50/45 p-3.5 rounded-xl border border-indigo-200/50">
                  <span className="font-bold text-indigo-700 block mb-1">Wi-Fi 5 (802.11ac) - ยุคความเร็วสูง</span>
                  เน้นย่าน 5GHz โดยเฉพาะ ความกว้างช่องกว้างขึ้นสูงสุด 160MHz ความเร็ว 6.9 Gbps ใช้เทคโนโลยีส่งหาหลายอุปกรณ์พร้อมกัน (MU-MIMO)
                </div>
                <div className="bg-violet-50/45 p-3.5 rounded-xl border border-violet-200/50">
                  <span className="font-bold text-violet-700 block mb-1">Wi-Fi 6 (802.11ax) - ยุคอัจฉริยะแออัด</span>
                  ย้อนรองรับทั้งสองย่าน ความเร็ว 9.6 Gbps นำเทคนิค OFDMA เข้ามาแบ่งพอร์ตย่อยสตรีมข้อมูลพร้อมเพรียง ลดหน่วงเวลารับส่งสูงสุด
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Simulator 2: Wi-Fi Standard Overlapping Channel Analyzer */}
          <WifiStandardsAnalyzer />
        </section>

        {/* ─── SUBTOPIC 4.4.3 ─────────────────────────────────────────────── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">การสื่อสารส่วนบุคคลระยะประชิด</span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              มาตรฐานและขอบข่ายเทคโนโลยีการเชื่อมต่อ Bluetooth เครือข่ายส่วนบุคคล (WPAN)
            </h3>
          </div>

          <div className="text-[16px] md:text-[17px] font-normal text-zinc-600 leading-relaxed space-y-4">
            <p>
              ในขอบเขตการแชร์ข้อมูลรอบตัวกับอุปกรณ์ต่อพ่วง ช่างไอทีจำเป็นต้องเรียนรู้มาตรฐาน 
              <strong>Bluetooth (IEEE 802.15.1)</strong> ซึ่งเป็นสื่อกลางไร้สายสำหรับเครือข่ายพื้นที่ส่วนบุคคล 
              <strong>(Personal Area Network - PAN)</strong> มุ่งเน้นรัศมีระยะสั้นไม่เกิน 10 เมตร โดยใช้พลังงานไฟฟ้าระดับต่ำมาก 
              ช่วยแผ่คลื่นเชื่อมต่อหูฟัง คีย์บอร์ดไร้สาย หรือสมาร์ทวอทช์เข้ากับเครื่องพีซีหลักได้อย่างไร้สายปลอดภัย
            </p>
            <p>
              ความปลอดภัยของ Bluetooth อาศัยกระบวนการจับคู่คู่สัญญาณ <strong>(Pairing Process)</strong> 
              โดยตัวรับและส่งจะสร้างรหัสตรวจสอบสิทธิ์แบบสุ่มชั่วคราว (Passkey Authentication PIN) 
              ช่วยปิดกั้นและป้องกันการลอบดักจราจรข้อมูลบิตนาฬิกา
            </p>
          </div>

          {/* Interactive Simulator 3: Personal Bluetooth Pairing Simulator */}
          <BluetoothPairingSimulator />
        </section>

        {/* ─── SUBTOPIC 4.4.4 & 4.4.5 ─────────────────────────────────────── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">กลไกความปลอดภัยและองศาการแผ่คลื่น</span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              มาตรฐานความปลอดภัย WEP/WPA2/WPA3 และการจัดทิศทางเสาสัญญาณเราเตอร์
            </h3>
          </div>

          <div className="text-[16px] md:text-[17px] font-normal text-zinc-600 leading-relaxed space-y-4">
            <p>
              เนื่องจากสื่อไร้สายเดินทางผ่านอากาศแบบเปิดประโล่ง อุตสาหกรรมคอมพิวเตอร์จึงกำหนดเกณฑ์เข้ารหัสลับเพื่อป้องกันข้อมูลรั่วไหล 
              และปรับทิศทางทางกายภาพเพื่อขจัดจุดบอดอับสัญญาณ:
            </p>
            <ul className="space-y-3.5 my-4 text-left">
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center p-1 rounded-full bg-indigo-100 text-indigo-600 mr-3 shrink-0 mt-0.5"><Check className="w-4 h-4" /></span>
                <div>
                  <strong>มาตรฐานความปลอดภัยเข้ารหัสไร้สาย:</strong> 
                  เริ่มจาก **WEP** (ช่องโหว่โบราณ ถอดรหัสใน 3 นาที) พัฒนาสู่ **WPA2** (เข้ารหัสหนาแน่นด้วย AES-CCMP) และ **WPA3** มาตรฐานสากลสูงสุดในปัจจุบัน ที่ใช้การตรวจสอบสิทธิ์แบบ **SAE** ป้องกันการดักฟังรหัสผ่านแบบออฟไลน์ดักเดารอบพอร์ตหมดจด 100%
                </div>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center p-1 rounded-full bg-indigo-100 text-indigo-600 mr-3 shrink-0 mt-0.5"><Check className="w-4 h-4" /></span>
                <div>
                  <strong>การจัดทิศทางเสาอากาศเราเตอร์ (Antenna Polarization):</strong> 
                  เสาอากาศเราเตอร์กระจายคลื่นในลักษณะแนวตั้งฉากกับแกนเสา (Omnidirectional) การจัดองศาเสาอากาศชี้ตรงชี้ฟ้า 90 องศา จะแผ่คลื่นความเข้มคลุมเป็นระนาบวงแนวนอนรอบอาคาร และหากแผงเสาของเครื่องผู้รับและผู้ส่งมีขั้วโพลาไรซ์ตรงแนวแกนเดียวกัน สัญญาณจะเข้มและขจัด Attenuation ได้ดีที่สุด
                </div>
              </li>
            </ul>
          </div>

          {/* Interactive Simulator 4: WPA 4-way Handshake & Polarization Lab */}
          <WpaHandshakePolarization />
        </section>

        {/* ─── QUIZ ENGINE SECTION ────────────────────────────────────────── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">การประเมินผล</span>
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
            title="ภารกิจออกแบบและวินิจฉัยโครงสร้าง Wi-Fi ออฟฟิศขอบเขตสูงและวางนโยบายความมั่นคงไร้สาย"
            taskText={`ให้นักเรียนสวมบทบาทเป็นสถาปนิกวิศวกรเน็ตเวิร์กไร้สาย (Wireless Network Engineer) และจัดทำเอกสาร "รายงานแผนผังบูรณาการความเสถียรและระบบความมั่นคงไร้สาย" (Wireless Security & Site Survey Design Report)
1. วิเคราะห์และเลือกมาตรฐานความปลอดภัยและการเข้ารหัส (WPA2 vs WPA3) สำหรับอาคารสำนักงานการเงิน พร้อมอธิบายกลไก SAE ในการป้องกันการโจมตีแบบเดารหัสออฟไลน์ (Offline Dictionary Attacks)
2. วางโครงผังเสาอากาศและองศาการชี้พิกัดเราเตอร์ WAP ในกรณีออฟฟิศเป็นอาคารระนาบแนวนอน 2 ชั้น โดยอธิบายหลักการข้ามโพลาไรเซชัน (Polarization Mismatch) เพื่อให้คอมพิวเตอร์พนักงานได้รับสัญญาณแรงสุด
3. เขียนตารางวิเคราะห์เปรียบเทียบมาตรฐานความถี่ 2.4 GHz และ 5 GHz ในแง่มุมของอัตราความเสถียรในการทะลุผ่านกำแพงปูนสิ่งกีดขวาง (Signal Attenuation) และความกว้างช่องสัญญาณทับซ้อน (Channel Overlapping)`}
          />
        </div>

      </main>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   1. WIRELESS SPECTRUM WAVE INSPECTOR (Subtopic 4.4.1)
   ═══════════════════════════════════════════════════════════════════ */
const SPECTRUM_DATA = {
  radio: {
    title: 'คลื่นวิทยุ (Radio Waves)',
    frequency: '3 kHz - 300 MHz',
    wavelength: '1 mm - 100 km',
    use: 'Wi-Fi, Bluetooth, AM/FM Radio, หูฟังไร้สาย',
    desc: 'มีความยาวคลื่นสูงสุดในสเปคตรัมไร้สาย สามารถไหลเลี้ยวเบนอ้อมสิ่งกีดขวางขอบกำแพงได้ดี สะท้อนชั้นบรรยากาศเพื่อขยายระยะทางได้กว้าง ทว่ามีความหนาแน่นแบนด์วิดท์ต่ำสุด',
    waveColor: '#22D3EE',
    frequencyMultiplier: 1.2
  },
  microwave: {
    title: 'คลื่นไมโครเวฟ (Microwaves)',
    frequency: '300 MHz - 300 GHz',
    wavelength: '1 mm - 1 m',
    use: 'สัญญาณดาวเทียม, LTE/5G Cellular, เรดาร์ตรวจฝน',
    desc: 'เดินทางเป็นเส้นตรงระดับสายตา (Line-of-Sight) ไม่เลี้ยวเบน ถูกกั้นด้วยสิ่งกีดขวางทึบ/แผงปูน/เม็ดฝนได้ง่าย ทว่ามีความเร็วแบนด์วิดท์สูงมาก จึงนิยมใช้กับ Wi-Fi และเครือข่ายดาวเทียม',
    waveColor: '#A78BFA',
    frequencyMultiplier: 3.5
  },
  infrared: {
    title: 'คลื่นอินฟราเรด (Infrared)',
    frequency: '300 GHz - 400 THz',
    wavelength: '750 nm - 1 mm',
    use: 'รีโมทคอนโทรลทีวี, กล้องส่องตรวจความร้อน',
    desc: 'ความยาวคลื่นสั้นจัดระดับนาโนเมตร ไม่สามารถทะลุกำแพงทึบแสงหรือสิ่งกีดขวางใดๆ ได้เลย ปราศจากปัญหาสัญญาณรบกวนข้ามห้องหรือข้ามช่องสัญญาณ เหมาะสมกับระยะประชิดสั้นๆ',
    waveColor: '#F59E0B',
    frequencyMultiplier: 8
  }
};

function SpectrumInspector() {
  const [selectedSpectrum, setSelectedSpectrum] = useState('radio');

  const spec = SPECTRUM_DATA[selectedSpectrum];

  return (
    <SimulatorShell
      icon={<Sliders className="w-6 h-6 text-indigo-500" />}
      title="เครื่องวัดสเปกตรัมและจำลองคลื่นความถี่วิทยุไร้สาย"
      accentBg="bg-indigo-50"
      iconColor="text-indigo-600"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch select-none text-left font-sans">
        
        {/* Left Option selector column */}
        <div className="bg-[#0f172a] rounded-2xl p-5 border border-slate-800 flex flex-col justify-between shadow-2xl relative min-h-[300px] text-xs text-slate-200 lg:col-span-1">
          <span className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold">WAVE CONFIGURATOR</span>
          
          <div className="space-y-4">
            <div>
              <h6 className="text-[13px] font-bold text-white flex items-center gap-1.5"><Sliders className="w-4 h-4 text-indigo-400" /> Wave Spectrum Modes</h6>
              <p className="text-[10px] text-slate-400 leading-normal">
                กดเลือกย่านความถี่ทางฟิสิกส์ไร้สาย เพื่อตรวจเช็คอาการและวิชวลของความยาวคลื่น
              </p>
            </div>

            <div className="flex flex-col gap-2.5">
              {Object.keys(SPECTRUM_DATA).map(key => {
                const item = SPECTRUM_DATA[key];
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedSpectrum(key)}
                    className={`p-2.5 rounded-lg text-left cursor-pointer transition-all border ${
                      selectedSpectrum === key
                        ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40 font-bold'
                        : 'bg-slate-900 border-slate-850 text-slate-450 hover:text-white'
                    }`}
                  >
                    {item.title}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Animated Oscilloscope and Details panel */}
        <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 flex flex-col justify-between relative min-h-[300px] lg:col-span-2 text-left font-mono text-xs text-slate-200">
          <span className="text-[9px] font-mono text-slate-500 absolute top-3 left-3">LIVE SINE WAVE FREQUENCY OSCILLOSCOPE</span>
          
          <div className="my-auto space-y-4 pt-4">
            {/* Animated Wave SVG Graph */}
            <div className="w-full bg-[#090d16] p-4 rounded-xl border border-slate-900 relative">
              <svg viewBox="0 0 350 80" className="w-full h-20 overflow-visible">
                {/* Center line reference */}
                <line x1="0" y1="40" x2="350" y2="40" stroke="#1e293b" strokeWidth="1" strokeDasharray="2,2" />

                {/* Dynamic wavelength path based on spectrum mode */}
                <path
                  d={(() => {
                    let pathD = 'M 0 40';
                    const stepSize = 4;
                    const steps = 350 / stepSize;
                    for (let i = 1; i <= steps; i++) {
                      const x = i * stepSize;
                      const noise = Math.sin(x * 0.1 * spec.frequencyMultiplier) * 22;
                      pathD += ` L ${x} ${40 + noise}`;
                    }
                    return pathD;
                  })()}
                  fill="none"
                  stroke={spec.waveColor}
                  strokeWidth="2.2"
                  className="animate-pulse"
                />
              </svg>
            </div>

            {/* Spec details grid */}
            <div className="grid grid-cols-2 gap-4 bg-slate-900 p-3 rounded-xl border border-slate-850 font-sans text-[10.5px]">
              <div>
                <span className="text-slate-500 block">ช่วงความถี่ (Frequency):</span>
                <span className="font-bold text-white block mt-0.5">{spec.frequency}</span>
              </div>
              <div>
                <span className="text-slate-500 block">ช่วงความยาวคลื่น (Wavelength):</span>
                <span className="font-bold text-white block mt-0.5">{spec.wavelength}</span>
              </div>
              <div className="col-span-2 border-t border-slate-850 pt-2">
                <span className="text-slate-500 block">การประยุกต์ใช้งาน (Real-world use):</span>
                <span className="font-bold text-indigo-300 block mt-0.5">{spec.use}</span>
              </div>
            </div>
          </div>

          <div className="text-[10px] leading-relaxed text-slate-400 font-sans border-t border-slate-900 pt-3">
            💡 <strong>คุณสมบัติฟิสิกส์:</strong> {spec.desc}
          </div>
        </div>

      </div>
    </SimulatorShell>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   2. IEEE 802.11 Wi-Fi STANDARDS & CHANNEL ANALYZER (Subtopic 4.4.2)
   ═══════════════════════════════════════════════════════════════════ */
const WIFI_SPECS = {
  wifi4: {
    title: 'Wi-Fi 4 (IEEE 802.11n)',
    band: '2.4 GHz & 5 GHz',
    channelWidth: '20 / 40 MHz',
    speed: '600 Mbps',
    tech: 'MIMO (เสารับส่งหลายชุด)',
    desc: 'มาตรฐานปฏิวัติยุคริเริ่ม พัฒนาความเสถียรด้วยเทคนิคเสาหลายต้น ส่งสัญญาณสะท้อนผนังข้ามพิกัดช่วยเพิ่มอัตราความเสถียรสูงสุด'
  },
  wifi5: {
    title: 'Wi-Fi 5 (IEEE 802.11ac)',
    band: '5 GHz เท่านั้น',
    channelWidth: '20 / 40 / 80 / 160 MHz',
    speed: '6.9 Gbps',
    tech: 'MU-MIMO (Downlink เท่านั้น)',
    desc: 'ขยับยกระดับความเร็วมาพึ่งพาย่าน 5GHz ที่มีคลื่นแบนด์วิดท์กว้างและสะอาดไร้การชนกัน เสถียรสูง เหมาะสำหรับดาวน์โหลดสตรีมเกมความเข้มข้นสูง'
  },
  wifi6: {
    title: 'Wi-Fi 6 (IEEE 802.11ax)',
    band: '2.4 GHz & 5 GHz',
    channelWidth: '20 / 40 / 80 / 160 MHz',
    speed: '9.6 Gbps',
    tech: 'MU-MIMO (สองทิศทาง) & OFDMA',
    desc: 'นำเข้าเทคนิค OFDMA เพื่อแบ่งช่องแบนด์วิดท์ย่อย ช่วยยิงส่งข้อมูลหาผู้ใช้หลายร้อยเครื่องได้พร้อมกันในคิวเดียว เหมาะสมกับออฟฟิศขนาดใหญ่คนแออัด'
  }
};

function WifiStandardsAnalyzer() {
  const [wifiMode, setWifiMode] = useState('wifi6');
  const [frequencyBand, setFrequencyBand] = useState('5GHz');

  const spec = WIFI_SPECS[wifiMode];

  return (
    <SimulatorShell
      icon={<Wifi className="w-6 h-6 text-indigo-500 animate-pulse" />}
      title="เครื่องจำลองวิเคราะห์มาตรฐาน Wi-Fi และแผงแบนด์วิดท์ช่องสัญญาณ"
      accentBg="bg-indigo-50"
      iconColor="text-indigo-600"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch select-none text-left font-sans">
        
        {/* Left Column interactive standard controllers */}
        <div className="bg-[#0f172a] rounded-2xl p-5 border border-slate-800 flex flex-col justify-between shadow-2xl relative min-h-[380px] text-xs text-slate-200 lg:col-span-1">
          <span className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold">WIFI STANDARDS DECK</span>
          
          <div className="space-y-4">
            <div>
              <h6 className="text-[13px] font-bold text-white flex items-center gap-1.5"><Sliders className="w-4 h-4 text-indigo-400" /> Standards & Frequencies</h6>
              <p className="text-[10px] text-slate-400 leading-normal">
                ปุ่มเปรียบเทียบมาตรฐาน IEEE และย่านคลื่นความถี่วิทยุหลัก
              </p>
            </div>

            {/* Standard buttons */}
            <div className="space-y-1.5">
              <span className="text-[10px] text-slate-400 font-bold block">1. เลือกมาตรฐานเทคโนโลยี (IEEE Standards):</span>
              <div className="flex flex-col gap-2">
                {Object.keys(WIFI_SPECS).map(key => (
                  <button
                    key={key}
                    onClick={() => setWifiMode(key)}
                    className={`py-2 px-3 rounded-lg text-left cursor-pointer transition-all border ${
                      wifiMode === key
                        ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40 font-bold'
                        : 'bg-slate-900 border-slate-850 text-slate-450 hover:text-white'
                    }`}
                  >
                    {WIFI_SPECS[key].title}
                  </button>
                ))}
              </div>
            </div>

            {/* Frequency selection toggle */}
            <div className="space-y-1.5 pt-2">
              <span className="text-[10px] text-slate-400 font-bold block">2. เลือกย่านความถี่วิทยุ (WiFi Frequency Band):</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setFrequencyBand('2.4GHz')}
                  className={`w-full py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                    frequencyBand === '2.4GHz'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-slate-900 border border-slate-850 text-slate-450 hover:text-white'
                  }`}
                >
                  2.4 GHz
                </button>
                <button
                  onClick={() => setFrequencyBand('5GHz')}
                  className={`w-full py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                    frequencyBand === '5GHz'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-slate-900 border border-slate-850 text-slate-450 hover:text-white'
                  }`}
                >
                  5 GHz
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Dashboard performance indicator */}
        <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 flex flex-col justify-between relative min-h-[380px] font-sans text-xs text-slate-200 lg:col-span-2">
          <span className="text-[9px] font-mono text-slate-500 absolute top-3 left-3">LIVE THROUGHPUT SPEEDOMETER</span>
          
          <div className="my-auto space-y-6 text-center">
            {/* Achieved speed gauge */}
            <div className="space-y-1.5">
              <span className="text-xs text-slate-400 block font-bold">อัตราการส่งข้อมูลความเร็วทางทฤษฎีสูงสุด (Max Speed):</span>
              <div className="text-4.5xl font-bold tracking-tight text-indigo-400 font-mono">
                {spec.speed}
              </div>
              <span className="text-[10px] text-slate-500 block">เทคนิคการรับส่ง: {spec.tech}</span>
            </div>

            {/* Channels visual representations grid */}
            <div className="space-y-2 max-w-sm mx-auto text-left">
              <span className="text-[9.5px] text-slate-400 block font-bold font-mono">LIVE CHANNEL WIDTH SPECTRUM VISUAL:</span>
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-850 space-y-3">
                <div className="flex justify-between items-center text-[9px] text-slate-500">
                  <span>ความกว้างช่อง (Channel Width): {spec.channelWidth}</span>
                  <span>สถานะย่าน: {frequencyBand}</span>
                </div>
                
                {/* Visual channels blocking */}
                {frequencyBand === '2.4GHz' ? (
                  // 2.4GHz overlapping visual
                  <div className="space-y-1">
                    <div className="h-4 bg-rose-500/20 border border-rose-500/40 rounded flex items-center justify-center text-[7.5px] text-rose-300 font-bold">
                      ⚠️ ช่อง 1 - ทับซ้อน (Overlapped)
                    </div>
                    <div className="h-4 bg-rose-500/20 border border-rose-500/40 rounded flex items-center justify-center text-[7.5px] text-rose-300 font-bold">
                      ⚠️ ช่อง 6 - ทับซ้อน (Overlapped)
                    </div>
                  </div>
                ) : (
                  // 5GHz non-overlapping visual
                  <div className="space-y-1">
                    <div className="h-4 bg-emerald-500/20 border border-emerald-500/40 rounded flex items-center justify-center text-[7.5px] text-emerald-300 font-bold">
                      💎 ช่อง 36 (Clean & Wide)
                    </div>
                    <div className="h-4 bg-emerald-500/20 border border-emerald-500/40 rounded flex items-center justify-center text-[7.5px] text-emerald-300 font-bold">
                      💎 ช่อง 44 (Clean & Wide)
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="p-3 bg-slate-900 border border-slate-850 rounded-xl leading-normal text-slate-500 text-[10px]">
            💡 <strong>เฉลยคุณลักษณะย่านความถี่:</strong> ย่าน **2.4 GHz** มีช่องที่สัญญาณไม่ชนกันเลยเพียง 3 ช่อง (1, 6, 11) ทำให้เสี่ยงต่อจราจรอุปกรณ์ชนกันพังทลายง่าย ต่างจากย่าน **5 GHz** ที่มีช่องสะอาดกว้างขวาง ปราศจากสัญญาณรบกวนข้ามพอร์ต
          </div>
        </div>

      </div>
    </SimulatorShell>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   3. WPAN BLUETOOTH PAIRING SIMULATOR (Subtopic 4.4.3)
   ═══════════════════════════════════════════════════════════════════ */
function BluetoothPairingSimulator() {
  const [pairState, setPairState] = useState('idle'); // idle | scanning | discovered | pairing | verifying | connected
  const [device, setDevice] = useState(null); // headphone | watch
  const [pinInput, setPinInput] = useState('');
  const [generatedPin] = useState('583912');
  const [logs, setLogs] = useState(['[READY] บลูทูธเครื่องส่ง Standby...']);

  const handleStartScan = () => {
    setPairState('scanning');
    setLogs(['[SCANNING] เปิดระบบดักสัญญาณคลื่นความถี่วิทยุ 2.4GHz ระยะรัศมี 10 เมตร...']);
    
    setTimeout(() => {
      setPairState('discovered');
      setLogs(current => [
        ...current,
        '🔍 [DISCOVERED] ค้นพบอุปกรณ์เน็ตเวิร์กส่วนบุคคล (WPAN) พร้อมต่อเชื่อมจำนวน 2 รายการ!'
      ]);
    }, 1800);
  };

  const handleSelectDevice = (dev) => {
    setDevice(dev);
    setPairState('pairing');
    setLogs(current => [
      ...current,
      `[PAIRING] สั่งงานขอประคองสัญญาณความมั่นคงไปหาอุปกรณ์: ${dev.toUpperCase()}`,
      `🔐 [PASSKEY CHALLENGE] บังคับสลับเลขความปลอดภัยพิน 6 หลักเพื่อการตรวจสอบ: ${generatedPin}`
    ]);
  };

  const handleVerifyPin = () => {
    setPairState('verifying');
    setLogs(current => [...current, '[VERIFYING] ดำเนินการเช็คโครงสร้าง Passkey PIN...']);

    setTimeout(() => {
      if (pinInput === generatedPin) {
        setPairState('connected');
        setLogs(current => [
          ...current,
          `🎉 [CONNECTED] เชื่อมโยงอุปกรณ์ ${device.toUpperCase()} ข้ามระบบไร้สายสำเร็จเรียบร้อย!`,
          '📊 [STATE] สิทธิ์เชื่อมต่อสลักบัญชี SAM ของอุปกรณ์รอบตัว (PAN) ถูกต้องมั่นคงปลอดภัยสูงสุด'
        ]);
      } else {
        setPairState('pairing');
        setPinInput('');
        setLogs(current => [
          ...current,
          '❌ [REJECTED] รหัสผ่านพินล้มเหลวไม่สอดคล้องกัน กรุณาตรวจและป้อนรหัส 6 หลักใหม่อีกครั้ง'
        ]);
      }
    }, 1200);
  };

  const handleReset = () => {
    setPairState('idle');
    setDevice(null);
    setPinInput('');
    setLogs(['[READY] บลูทูธเครื่องส่ง Standby...']);
  };

  return (
    <SimulatorShell
      icon={<SecureIcon className="w-6 h-6 text-indigo-500 animate-bounce" style={{ animationDuration: '5s' }} />}
      title="เครื่องจำลองจับคู่อุปกรณ์เครือข่ายส่วนบุคคล (Personal Bluetooth Pairing)"
      accentBg="bg-indigo-50"
      iconColor="text-indigo-600"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch select-none text-left font-sans">
        
        {/* Left Column Smartphone screen replica */}
        <div className="bg-slate-950 rounded-2xl p-5 border border-slate-800 flex flex-col justify-between items-center relative min-h-[360px] lg:col-span-1 text-xs text-slate-200">
          <span className="text-[8px] font-mono text-slate-500 absolute top-2 right-4 font-bold">SMARTPHONE SIMULATOR</span>
          
          <div className="w-full my-auto space-y-4">
            {/* Screen Content Dashboard */}
            <div className="bg-[#090d16] p-4 rounded-xl border border-slate-900 min-h-[220px] flex flex-col justify-between">
              
              {/* Bluetooth Top Bar */}
              <div className="flex justify-between items-center border-b border-slate-900 pb-2 text-[9px] text-slate-500 font-mono">
                <span>SETTINGS ➔ BLUETOOTH</span>
                <span className="text-cyan-400 font-bold flex items-center gap-1"><Scan className="w-3 h-3 animate-spin" /> SCAN ACTIVE</span>
              </div>

              {/* Central screen visual state */}
              <div className="py-4 space-y-3 shrink-0">
                {pairState === 'idle' && (
                  <div className="text-center py-6 space-y-2">
                    <Radio className="w-10 h-10 text-slate-700 mx-auto" />
                    <button
                      onClick={handleStartScan}
                      className="py-1.5 px-3 bg-indigo-650 hover:bg-indigo-755 text-white font-bold text-[10.5px] rounded-lg cursor-pointer active:scale-95"
                    >
                      เริ่มค้นหาอุปกรณ์ (Scan)
                    </button>
                  </div>
                )}

                {pairState === 'scanning' && (
                  <div className="text-center py-6 space-y-3">
                    <Scan className="w-10 h-10 text-cyan-400 animate-spin mx-auto" />
                    <p className="text-[10px] text-slate-400 animate-pulse">กำลังสแกนหาคลื่น WPAN...</p>
                  </div>
                )}

                {pairState === 'discovered' && (
                  <div className="space-y-2">
                    <p className="text-[9.5px] text-slate-500 block mb-1">เลือกอุปกรณ์เพื่อจับคู่ (Pair):</p>
                    <button
                      onClick={() => handleSelectDevice('Headphones (BT 5.0)')}
                      className="w-full p-2.5 bg-slate-900 hover:bg-slate-850 rounded-lg text-left text-[11px] font-bold text-white flex justify-between cursor-pointer border border-slate-800"
                    >
                      <span>🎧 หูฟัง Headphones</span>
                      <span className="text-cyan-400 font-mono text-[9px]">BT 5.0</span>
                    </button>
                    <button
                      onClick={() => handleSelectDevice('Smartwatch (BT LE)')}
                      className="w-full p-2.5 bg-slate-900 hover:bg-slate-850 rounded-lg text-left text-[11px] font-bold text-white flex justify-between cursor-pointer border border-slate-800"
                    >
                      <span>⌚ สมาร์ทวอทช์ Smartwatch</span>
                      <span className="text-emerald-400 font-mono text-[9px]">BT LE</span>
                    </button>
                  </div>
                )}

                {pairState === 'pairing' && (
                  <div className="space-y-3">
                    <div className="text-center">
                      <p className="text-[10.5px] text-slate-400 block font-bold mb-1">ป้อนรหัสจับคู่ Passkey:</p>
                      <p className="text-lg font-bold text-amber-400 tracking-widest">{generatedPin}</p>
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        maxLength={6}
                        value={pinInput}
                        onChange={(e) => setPinInput(e.target.value.replace(/\D/g, ''))}
                        className="w-full pl-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-center text-xs font-mono font-bold tracking-widest text-sky-400 focus:outline-none"
                      />
                      <button
                        onClick={handleVerifyPin}
                        className="px-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded text-xs cursor-pointer active:scale-95"
                      >
                        OK
                      </button>
                    </div>
                  </div>
                )}

                {pairState === 'verifying' && (
                  <div className="text-center py-6 space-y-2 animate-pulse">
                    <Lock className="w-8 h-8 text-indigo-400 animate-spin mx-auto" />
                    <p className="text-[9.5px] text-slate-500 font-mono">AUTHENTICATING...</p>
                  </div>
                )}

                {pairState === 'connected' && (
                  <div className="text-center py-4 space-y-3">
                    <CheckSquare className="w-10 h-10 text-emerald-450 mx-auto" />
                    <div>
                      <p className="font-bold text-emerald-400 text-xs">จับคู่สำเร็จเรียบร้อย!</p>
                      <p className="text-[8.5px] text-slate-500 mt-0.5">เชื่อมสายส่ง BT PAN Active</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Status bar */}
              <div className="text-[8px] text-slate-650 font-bold border-t border-slate-900 pt-2 flex justify-between">
                <span>WPAN STATUS: {pairState.toUpperCase()}</span>
                <span className="text-cyan-500">{device ? 'CONNECTED' : 'DISCONNECTED'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center logs list column */}
        <div className="flex flex-col justify-between lg:col-span-1">
          <div className="bg-slate-950 rounded-xl p-4 border border-slate-900 min-h-[300px] flex flex-col justify-between text-left font-mono">
            <div className="text-slate-500 text-[10px] font-mono mb-2 uppercase tracking-wider flex justify-between items-center border-b border-slate-900 pb-1.5 font-sans">
              <span className="flex items-center gap-1.5"><Terminal className="w-3.5 h-3.5" /> Bluetooth Pair trace logs</span>
            </div>

            <div className="space-y-1.5 min-h-[220px] max-h-[220px] overflow-y-auto leading-relaxed">
              {logs.map((log, index) => (
                <div key={index} className="flex gap-2 text-[11px] font-mono">
                  <span className="text-slate-700 select-none">&gt;</span>
                  <p className={`${
                    log.includes('🎉') || log.includes('✅')
                      ? 'text-emerald-400 font-bold' 
                      : log.startsWith('🔐') || log.startsWith('⏱️')
                      ? 'text-amber-300 font-bold' 
                      : log.startsWith('❌')
                      ? 'text-rose-450 font-bold'
                      : 'text-slate-400'
                  }`}>
                    {log}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Info Details column */}
        <div className="flex flex-col justify-between lg:col-span-1 text-left font-sans text-xs text-slate-600">
          <div className="space-y-4">
            <span className="text-[12px] font-bold text-slate-400 uppercase tracking-wider block">ความมั่นคงในรัศมีส่วนบุคคล</span>
            <div className="leading-relaxed space-y-3.5 text-sm">
              <p>
                ในงานช่างไอที เครือข่าย **Bluetooth WPAN** มีขีดความสามารถเฉพาะตัว:
              </p>

              <div className="space-y-2.5">
                <div className="bg-white/60 p-3 rounded-xl border border-slate-200 shadow-sm flex items-start gap-2.5">
                  <span className="p-1 rounded bg-indigo-50 text-indigo-600 shrink-0"><ShieldCheck className="w-4 h-4" /></span>
                  <p className="text-xs text-slate-500 leading-normal">
                    <strong>BT 5.0 (ความปลอดภัยข้ามพอร์ต):</strong> อัปเกรดแบนด์วิดท์ความเร็วโอนย้ายสูงขึ้น 2 เท่า และรัศมีสปีดกว้างขึ้น 4 เท่าเมื่อเทียบกับ BT 4.2
                  </p>
                </div>
                <div className="bg-white/60 p-3 rounded-xl border border-slate-200 shadow-sm flex items-start gap-2.5">
                  <span className="p-1 rounded bg-indigo-50 text-indigo-600 shrink-0"><Lock className="w-4 h-4" /></span>
                  <p className="text-xs text-slate-500 leading-normal">
                    <strong>Passkey PIN (การป้องกันดักฟิชชิ่ง):</strong> การแลกเปลี่ยนรหัสตัวเลขเฉพาะระหว่างคู่สายช่วยบล็อกไม่ให้อุปกรณ์แปลกปลอมแอบฝังตัว Telemetry ขโมยบิตข้อมูลคีย์บอร์ด
                  </p>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="w-full mt-4 py-2.5 bg-slate-900 border border-slate-800 hover:text-white font-bold rounded-lg text-xs cursor-pointer active:scale-95 transition-all text-center"
          >
            รีเซ็ตบอร์ดจำลองจับคู่ (CLEAR)
          </button>
        </div>

      </div>
    </SimulatorShell>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   4. WPA HANDSHAKE & ANTENNA POLARIZATION LAB (Subtopics 4.4.4 & 4.4.5)
   ═══════════════════════════════════════════════════════════════════ */
function WpaHandshakePolarization() {
  const [selectedSubTab, setSelectedSubTab] = useState('handshake');

  // WPA 4-way Handshake state
  const [handshakeStep, setHandshakeStep] = useState(0); // 0 to 4
  const [handshakeLogs, setHandshakeLogs] = useState(['[READY] พร้อมเริ่มการทวนเข็มตรวจสอบสิทธิ์เข้ารหัส...']);

  const startHandshake = () => {
    if (handshakeStep !== 0) return;
    setHandshakeStep(1);
    setHandshakeLogs([
      '[MESSAGE 1] WAP ปล่อยสัญญาณ ANonce (หมายเลขสุ่มความปลอดภัยจาก AP) ข้ามอากาศวิ่งหาเครื่อง PC พนักงาน...'
    ]);

    setTimeout(() => {
      setHandshakeStep(2);
      setHandshakeLogs(current => [
        ...current,
        '[MESSAGE 2] PC พนักงานสร้าง SNonce (หมายเลขสุ่มฝั่งผู้ใช้) และคำนวณรหัสลับส่งกลับพร้อมค่า MIC (Message Integrity Code) กลับไปยัง WAP...'
      ]);
    }, 1800);

    setTimeout(() => {
      setHandshakeStep(3);
      setHandshakeLogs(current => [
        ...current,
        '[MESSAGE 3] WAP ตรวจสอบค่า MIC ถูกต้อง ทำการประกอบส่งต่อคีย์สำหรับถอดรหัสกลุ่มข้อมูล GTK (Group Temporal Key) ส่งต่อหา PC...'
      ]);
    }, 3600);

    setTimeout(() => {
      setHandshakeStep(4);
      setHandshakeLogs(current => [
        ...current,
        '[MESSAGE 4] PC พนักงานยืนยันรับคีย์สำเร็จ ส่ง ACK ยืนยัน WPA 4-Way Handshake สมบูรณ์! ✅ [เข้ารหัสเข้ารวมสำเร็จ]',
        '💡 [WPA3 SAE SECURITY] การส่งกุญแจตรวจสอบสิทธิ์ครั้งนี้ได้รับการปกป้องจากระบบ SAE ปราศจากการถอดรหัสผ่านออฟไลน์ดักเดา 100%'
      ]);
    }, 5400);
  };

  const resetHandshake = () => {
    setHandshakeStep(0);
    setHandshakeLogs(['[READY] พร้อมเริ่มการทวนเข็มตรวจสอบสิทธิ์เข้ารหัส...']);
  };

  // Antenna Polarization state
  const [antennaAngle, setAntennaAngle] = useState(0); // 0 to 90
  const clientPolarization = 0; // Vertical Client antenna
  const polarizationLoss = Math.abs(antennaAngle - clientPolarization);
  const signalBar = Math.max(10, 95 - polarizationLoss);

  return (
    <SimulatorShell
      icon={<Sliders className="w-6 h-6 text-indigo-500 animate-pulse" />}
      title="แผงแล็บความปลอดภัย WPA Handshake & ทิศทางเสาสัญญาณเราเตอร์"
      accentBg="bg-indigo-50"
      iconColor="text-indigo-600"
    >
      <div className="space-y-6 select-none font-sans text-left">
        
        {/* Navigation sub-tabs */}
        <div className="flex border-b border-slate-200">
          <button
            onClick={() => setSelectedSubTab('handshake')}
            className={`py-2 px-5 font-bold text-xs cursor-pointer border-b-2 transition-all ${
              selectedSubTab === 'handshake'
                ? 'border-indigo-500 text-indigo-600 bg-indigo-50/30'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            🔐 WPA 4-Way Handshake
          </button>
          <button
            onClick={() => setSelectedSubTab('polarization')}
            className={`py-2 px-5 font-bold text-xs cursor-pointer border-b-2 transition-all ${
              selectedSubTab === 'polarization'
                ? 'border-indigo-500 text-indigo-600 bg-indigo-50/30'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            📡 Antenna Polarization
          </button>
        </div>

        {/* 1. WPA HANDSHAKE TAB */}
        {selectedSubTab === 'handshake' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {/* Symmetrical SVG handshake diagram */}
            <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 flex flex-col justify-between items-center relative min-h-[360px] lg:col-span-2">
              <span className="text-[10px] font-mono text-slate-500 absolute top-3 left-3">WPA 4-WAY HANDSHAKE PROTOCOL TRANSIT</span>
              
              <svg viewBox="0 0 350 220" className="w-full max-w-[320px] h-60 z-10 my-auto">
                {/* Coordinates:
                   Client PC: x=50, y=110
                   WAP Router: x=300, y=110
                   Absolute Center x=175
                */}

                {/* Main Symmetrical Wires path */}
                <line x1="60" y1="110" x2="290" y2="110" stroke="#334155" strokeWidth="2" strokeDasharray="3,3" />

                {/* Glowing handshake packet movements */}
                {handshakeStep === 1 && (
                  <circle cx="175" cy="110" r="6" fill="#A78BFA">
                    <animate attributeName="cx" from="290" to="60" dur="1.5s" repeatCount="indefinite" />
                  </circle>
                )}
                {handshakeStep === 2 && (
                  <circle cx="175" cy="110" r="6" fill="#F59E0B">
                    <animate attributeName="cx" from="60" to="290" dur="1.5s" repeatCount="indefinite" />
                  </circle>
                )}
                {handshakeStep === 3 && (
                  <circle cx="175" cy="110" r="6" fill="#A78BFA">
                    <animate attributeName="cx" from="290" to="60" dur="1.5s" repeatCount="indefinite" />
                  </circle>
                )}
                {handshakeStep === 4 && (
                  <circle cx="175" cy="110" r="6" fill="#10B981" className="animate-ping" />
                )}

                {/* Nodes */}
                {/* Client PC */}
                <rect x="25" y="90" width="50" height="40" rx="6" fill="#0F172A" stroke="#475569" strokeWidth="1.5" />
                <text x="50" y="114" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="bold">PC Client</text>

                {/* WAP Router */}
                <circle cx="300" cy="110" r="22" fill="#0F172A" stroke="#0891B2" strokeWidth="2" />
                <text x="300" y="113" textAnchor="middle" fill="#FFFFFF" fontSize="8.5" fontWeight="bold">WAP (AP)</text>
              </svg>
            </div>

            {/* Controls & logger */}
            <div className="flex flex-col justify-between lg:col-span-1">
              <div className="bg-slate-950 rounded-xl p-4 border border-slate-900 min-h-[220px] flex flex-col justify-between font-mono">
                <div className="text-slate-500 text-[10px] font-mono mb-2 uppercase tracking-wider flex justify-between items-center border-b border-slate-900 pb-1.5 font-sans">
                  <span className="flex items-center gap-1.5"><Terminal className="w-3.5 h-3.5" /> 4-Way Handshake Analyzer</span>
                  {handshakeStep > 0 && handshakeStep < 4 && (
                    <span className="text-cyan-400 flex items-center gap-1 text-[8.5px]"><RefreshCw className="w-2.5 h-2.5 animate-spin" /> KEY IN TRANSIT</span>
                  )}
                </div>

                <div className="space-y-1.5 min-h-[160px] max-h-[160px] overflow-y-auto leading-relaxed">
                  {handshakeLogs.map((log, index) => (
                    <div key={index} className="flex gap-2 text-[10.5px] font-mono">
                      <span className="text-slate-700 select-none">&gt;</span>
                      <p className={`${
                        log.includes('✅') || log.includes('สำเร็จ')
                          ? 'text-emerald-400 font-bold' 
                          : log.startsWith('💡') 
                          ? 'text-cyan-300'
                          : 'text-slate-400'
                      }`}>
                        {log}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 mt-3">
                {handshakeStep === 0 ? (
                  <button
                    onClick={startHandshake}
                    className="w-full py-2.5 bg-indigo-650 hover:bg-indigo-755 text-white font-bold text-xs rounded-xl cursor-pointer active:scale-98 shadow-md"
                  >
                    เริ่มแลกคีย์ตรวจสอบสิทธิ์ (Verify key)
                  </button>
                ) : (
                  <button
                    onClick={resetHandshake}
                    className="w-full py-2.5 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white font-bold text-xs rounded-xl cursor-pointer active:scale-98 transition-all"
                  >
                    รีเซ็ตสเตป (RESET)
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 2. ANTENNA POLARIZATION TAB */}
        {selectedSubTab === 'polarization' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Slider controller */}
            <div className="bg-[#0f172a] rounded-2xl p-5 border border-slate-800 flex flex-col justify-between shadow-2xl relative min-h-[300px] text-xs text-slate-200">
              <span className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold">ANTENNA ALIGNMENT</span>
              
              <div className="space-y-5">
                <div>
                  <h6 className="text-[13px] font-bold text-white flex items-center gap-1.5"><Sliders className="w-4 h-4 text-indigo-400" /> Antenna Polarization Angles</h6>
                  <p className="text-[10px] text-slate-400 leading-normal">
                    หมุนองศาเสาอากาศของเราเตอร์ WAP (องศาเทียบกับแนวชี้ฟ้า 90 องศา) เพื่อตรวจวัดความสอดคล้อง
                  </p>
                </div>

                {/* Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold">
                    <span>องศาเสาเราเตอร์ WAP (Antenna Polarization Angle):</span>
                    <span className="text-indigo-400 font-mono">{antennaAngle} องศา</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="90"
                    value={antennaAngle}
                    onChange={(e) => setAntennaAngle(parseInt(e.target.value))}
                    className="w-full h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                  <div className="flex justify-between text-[8.5px] text-slate-500 font-bold">
                    <span>0° (เสาชี้ฟ้าแนวดิ่ง - Vertical)</span>
                    <span>90° (เสาชี้แนวราบ - Horizontal)</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-slate-950 border border-slate-850 rounded-xl leading-normal text-slate-500 text-[10.5px]">
                💡 <strong>วิเคราะห์ขั้วสัญญาณ:</strong> คอมพิวเตอร์แล็ปท็อปพนักงานมีเสาสัญญาณในแนวตั้ง **0 องศา (Vertical)** การหมุนเสาเราเตอร์ชี้ฟ้า 90 องศากับแนวราบ (องศาเสา 0°) จะให้ขั้วที่ตรงกันเป๊ะ สัญญาณแผ่กว้างเข้มข้นที่สุด
              </div>
            </div>

            {/* Signal Indicator display */}
            <div className="bg-[#0f172a] rounded-2xl p-5 border border-slate-800 flex flex-col justify-between items-center relative min-h-[300px]">
              <span className="text-[9px] font-mono text-slate-500 absolute top-3 left-3">LIVE SIGNAL STRENGTH GAUGH</span>
              
              <div className="my-auto w-full space-y-6 text-center text-slate-200">
                <div className="space-y-2 max-w-xs mx-auto">
                  <span className="text-xs text-slate-400 block font-bold">ดัชนีความเข้มข้นของสัญญาณ (Polarization Match):</span>
                  <div className="text-4xl font-mono font-bold tracking-tight text-indigo-400">
                    {signalBar} <span className="text-xs text-slate-500">dBm (Mocked Index)</span>
                  </div>

                  {/* Gauge bar */}
                  <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-850">
                    <div className={`h-full transition-all duration-300 ${
                      signalBar > 70 ? 'bg-emerald-500' : signalBar > 40 ? 'bg-amber-400' : 'bg-rose-500'
                    }`} style={{ width: `${signalBar}%` }} />
                  </div>

                  <span className="text-[10px] text-slate-400 block leading-tight pt-1">
                    {signalBar > 70 ? '✅ โพลาไรซ์ตรงขั้ว! คลื่นแผ่ตัวระนาบกว้าง สัญญาณเข้มข้น' :
                     signalBar > 40 ? '⚠️ ขั้วคลื่นเหลื่อมพิกัด (Polarization Loss) สัญญาณดร็อปลดกำลังลงชั่วคราว' :
                     '❌ สัญญาณขาดหายวิกฤต! ขั้วคลื่นตัดกันฉาก 90 องศา (Cross-polarization) การสื่อสารล้มเหลว'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </SimulatorShell>
  );
}
