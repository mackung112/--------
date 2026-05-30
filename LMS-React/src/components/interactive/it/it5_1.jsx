/**
 * it5_1.jsx — หน่วยที่ 5.1 มาตรฐานและแบบจำลองการสื่อสารข้อมูล (OSI Model & TCP/IP)
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
  Cpu, Activity, Radio, LockKeyhole, Network, Sliders, Settings2, ShieldCheck as SecureIcon, Scan,
  ArrowDown, ArrowUp, Send, CheckSquare
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
   AMBIENT BACKDROP THEME — IT Unit 5.1 (Indigo/Blue/Violet/Slate)
   ═══════════════════════════════════════════════════════════════════ */
const IT5_1_BLOBS = [
  { color: 'bg-indigo-300',  size: 'w-[450px] h-[450px]', position: '-top-20 -left-20',       opacity: 'opacity-35' },
  { color: 'bg-blue-200',    size: 'w-[400px] h-[400px]', position: 'top-1/3 -right-20',      opacity: 'opacity-30' },
  { color: 'bg-violet-300',  size: 'w-96 h-96', position: '-bottom-20 left-1/4',     opacity: 'opacity-25' },
  { color: 'bg-slate-300',   size: 'w-80 h-80', position: 'top-2/3 right-1/3',       opacity: 'opacity-20' },
];

/* ═══════════════════════════════════════════════════════════════════
   DATA: QUIZ FOR UNIT 5.1
   ═══════════════════════════════════════════════════════════════════ */
const QUIZ_LEVELS = [
  {
    title: 'โจทย์ที่ 1: องค์ประกอบของโปรโตคอลการสื่อสาร',
    desc: 'ข้อกำหนดโครงสร้างและรูปแบบข้อมูลของข่าวสารที่ตกลงเพื่อสื่อสารร่วมกัน เช่น ฟิลด์ข้อมูล 8 บิตแรกคือที่อยู่ผู้ส่ง ตรงกับองค์ประกอบใดของโปรโตคอลสากล?',
    options: [
      { key: 'A', text: 'Semantics (ความหมายของบิตและการควบคุม)', isCorrect: false },
      { key: 'B', text: 'Syntax (โครงสร้างไวยากรณ์และรูปแบบของข้อมูล)', isCorrect: true },
      { key: 'C', text: 'Timing (จังหวะการรับส่งและความเร็ว)', isCorrect: false },
      { key: 'D', text: 'Routing (การหาเส้นทางข้าม Subnet)', isCorrect: false }
    ],
    tip: 'Syntax เกี่ยวข้องกับรูปแบบ โครงสร้าง และการจัดบิตข้อมูล ส่วน Semantics คือการตีความหมายของแต่ละส่วนข้อมูล และ Timing คือความเร็วและระยะเวลา'
  },
  {
    title: 'โจทย์ที่ 2: บทบาทและ PDU ของ Transport Layer ใน OSI Model',
    desc: 'ในแบบจำลองอ้างอิง OSI ชั้นเลเยอร์ใดมีหน้าที่รับผิดชอบการสื่อสารแบบต้นทางถึงปลายทาง (End-to-End) และมีหน่วยข้อมูล PDU เรียกว่า Segment?',
    options: [
      { key: 'A', text: 'Network Layer (ชั้นเครือข่าย)', isCorrect: false },
      { key: 'B', text: 'Data Link Layer (ชั้นเชื่อมโยงข้อมูล)', isCorrect: false },
      { key: 'C', text: 'Transport Layer (ชั้นขนส่งข้อมูล)', isCorrect: true },
      { key: 'D', text: 'Session Layer (ชั้นควบคุมเซสชัน)', isCorrect: false }
    ],
    tip: 'Transport Layer (เลเยอร์ 4) ควบคุมการส่งข้อมูล End-to-End มี PDU เป็น Segment โดยใช้โปรโตคอลหลักเช่น TCP หรือ UDP'
  },
  {
    title: 'โจทย์ที่ 3: การเทียบเคียงเลเยอร์ OSI และ TCP/IP',
    desc: 'เมื่อทำการวิเคราะห์เปรียบเทียบ OSI Model กับ TCP/IP Model ชั้น Application Layer ของแบบจำลอง TCP/IP จะเทียบเท่ากับเลเยอร์ใดรวมกันใน OSI Model?',
    options: [
      { key: 'A', text: 'Application, Presentation และ Session Layer', isCorrect: true },
      { key: 'B', text: 'Application, Presentation และ Transport Layer', isCorrect: false },
      { key: 'C', text: 'Transport และ Network Layer', isCorrect: false },
      { key: 'D', text: 'Data Link และ Physical Layer', isCorrect: false }
    ],
    tip: 'TCP/IP Model ได้ควบรวมเลเยอร์ระดับสูง 3 ชั้นของ OSI (Session, Presentation, Application) เข้าเป็นเลเยอร์ระดับแอปพลิเคชัน (Application) เพียงหนึ่งเดียว'
  },
  {
    title: 'โจทย์ที่ 4: ลำดับขั้นตอนกระบวนการห่อหุ้มข้อมูล (Data Encapsulation)',
    desc: 'เมื่อแอปพลิเคชันของผู้ใช้จัดส่งข้อมูลออกไป ข้อมูลดิบจะถูกแปรรูปและห่อหุ้มตามลำดับขั้นตอนในฝั่งส่งอย่างไรก่อนถูกนำส่งผ่านสื่อกลางไร้สาย/ใช้สาย?',
    options: [
      { key: 'A', text: 'Data ➔ Frame ➔ Segment ➔ Packet ➔ Bits', isCorrect: false },
      { key: 'B', text: 'Data ➔ Segment ➔ Packet ➔ Frame ➔ Bits', isCorrect: true },
      { key: 'C', text: 'Bits ➔ Frame ➔ Packet ➔ Segment ➔ Data', isCorrect: false },
      { key: 'D', text: 'Packet ➔ Segment ➔ Frame ➔ Data ➔ Bits', isCorrect: false }
    ],
    tip: 'Data (Application) ถูกเติมหัว Transport กลายเป็น Segment ➔ เติมหัว Network กลายเป็น Packet ➔ เติมหัว/หาง Data Link กลายเป็น Frame ➔ ส่งออกที่ Physical เป็น Bits'
  },
  {
    title: 'โจทย์ที่ 5: พอร์ตมาตรฐานของโปรโตคอลตรวจสอบสิทธิ์ควบคุมระยะไกลอย่างปลอดภัย',
    desc: 'หากผู้ดูแลระบบเน็ตเวิร์กต้องการรีโมตล็อกอินเข้าไปแก้ไฟล์คอนฟิกบนเซิร์ฟเวอร์อย่างมั่นคงปลอดภัยสูง โดยป้องกันการดักจราจรเพื่อขโมยรหัสผ่าน ควรเลือกใช้โปรโตคอลและพอร์ตบริการใด?',
    options: [
      { key: 'A', text: 'Telnet บนพอร์ตหมายเลข 23', isCorrect: false },
      { key: 'B', text: 'SSH บนพอร์ตหมายเลข 22', isCorrect: true },
      { key: 'C', text: 'FTP บนพอร์ตหมายเลข 20 และ 21', isCorrect: false },
      { key: 'D', text: 'HTTP บนพอร์ตหมายเลข 80', isCorrect: false }
    ],
    tip: 'SSH (Secure Shell) ทำงานบนพอร์ต 22 มีการสร้างช่องทางเข้ารหัสลับอย่างสมบูรณ์แบบ แตกต่างจาก Telnet พอร์ต 23 ที่ส่งรหัสผ่านและคำสั่งแบบ Cleartext ซึ่งเป็นช่องโหว่ร้ายแรง'
  }
];

export default function ComponentName() {
  return (
    <>
      {/* Layer 1: Ambient Backdrop & Theme Gradients */}
      <AmbientBackdrop blobs={IT5_1_BLOBS} />

      {/* Layer 3: Flexible Subtopics & Fluid Open-Air Layout */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 space-y-12 md:space-y-16 relative z-10">
        
        {/* ─── SUBTOPIC 1: ความหมายและองค์ประกอบของโปรโตคอลการสื่อสารข้อมูล ─────────────────── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">กฎระเบียบและข้อตกลงกลางระบบเครือข่าย</span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              ความหมายและองค์ประกอบของโปรโตคอลการสื่อสารข้อมูล
            </h3>
          </div>
          
          <div className="text-[16px] md:text-[17px] font-normal text-zinc-600 leading-relaxed space-y-4">
            <p>
              ในระบบเครือข่ายคอมพิวเตอร์ อุปกรณ์ต่าง ๆ ที่เชื่อมต่อกันมักจะมาจากผู้ผลิตต่างค่าย มีสถาปัตยกรรมชิปเซ็ตและระบบปฏิบัติการที่ต่างกันอย่างสิ้นเชิง 
              เพื่อให้ระบบคอมพิวเตอร์เหล่านี้สามารถเชื่อมต่อและสนทนารับส่งข้อมูลกันได้อย่างราบรื่น จึงต้องกำหนด <strong>โปรโตคอล (Protocol)</strong> 
              ซึ่งเปรียบเสมือน "ภาษากลางสากล" ที่ทุกระบบตกลงยอมรับและปฏิบัติตามอย่างเคร่งครัด
            </p>
            <p>
              องค์ประกอบรากฐานทางเทคนิคและวิศวกรรมไอทีของโปรโตคอลแบ่งออกเป็น 3 หัวข้อหลัก:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-4 text-left">
              <div className="bg-gradient-to-br from-indigo-50/60 to-white p-5 rounded-2xl border border-indigo-100 shadow-sm space-y-2">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-indigo-50 border border-indigo-200 text-indigo-700 font-mono">Syntax</span>
                <h6 className="font-bold text-indigo-950 text-[15px]">ไวยากรณ์และรูปแบบของข้อมูล</h6>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  โครงสร้างทางกายภาพหรือรูปแบบการจัดเรียงบิตข้อมูล เช่น กำหนดให้ 8 บิตแรกคือที่อยู่ผู้ส่ง (Source Address) บิตถัดมาคือที่อยู่ผู้รับ และบิตที่เหลือคือข้อความดิบ
                </p>
              </div>
              <div className="bg-gradient-to-br from-violet-50/60 to-white p-5 rounded-2xl border border-violet-100 shadow-sm space-y-2">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-violet-50 border border-violet-200 text-violet-700 font-mono">Semantics</span>
                <h6 className="font-bold text-violet-950 text-[15px]">ความหมายและการควบคุม</h6>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  การตีความหมายของบิตแต่ละกลุ่ม เพื่อให้อุปกรณ์ควบคุมรู้ว่าต้องประมวลผลอย่างไร เช่น หากพบค่าบิตหลักนี้เป็น 1 หมายถึงให้ทำการส่งต่อ (Route) หรือให้ทำลายทิ้งหากหมดอายุการเดินทาง
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-50/60 to-white p-5 rounded-2xl border border-blue-100 shadow-sm space-y-2">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-blue-50 border border-blue-200 text-blue-700 font-mono">Timing</span>
                <h6 className="font-bold text-blue-950 text-[15px]">จังหวะเวลาและการประสานงาน</h6>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  การประสานจังหวะจราจรข้อมูล เช่น อัตราความเร็วในการรับส่ง (Data Rate) เพื่อป้องกันไม่ให้ฝั่งส่งที่เร็วเกินไปยิงบิตกระแทกท่วมฝั่งรับที่มีกำลังประมวลผลต่ำกว่าจนล้นระบบ
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── SUBTOPIC 2: แบบจำลองโครงสร้างอ้างอิง OSI 7 ชั้น ─────────────────────────────── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">กรอบแนวคิดทฤษฎีมาตรฐานสากล</span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              แบบจำลองโครงสร้างอ้างอิง OSI 7 ชั้น
            </h3>
          </div>

          <div className="text-[16px] md:text-[17px] font-normal text-zinc-600 leading-relaxed space-y-4">
            <p>
              เพื่อจัดระบบการสื่อสารข้อมูลให้เป็นสัดส่วนง่ายต่อการออกแบบพัฒนาฮาร์ดแวร์และซอฟต์แวร์ องค์กรระหว่างประเทศว่าด้วยการมาตรฐาน (ISO) 
              จึงประกาศแนวคิด <strong>แบบจำลอง OSI (Open Systems Interconnection Reference Model)</strong> ประกอบด้วย 7 เลเยอร์ 
              การสื่อสารจะเริ่มส่งจากเลเยอร์สูงสุด (Layer 7) ลงล่างจนถึงเลเยอร์ล่างสุด (Layer 1) เพื่อแปลงเป็นกระแสส่งข้ามตัวกลาง และฝั่งรับจะวิ่งสวนทางขึ้นสู่ระบบแอปพลิเคชัน
            </p>
            <p>
              การแยกขอบเขตและหน้าที่การจัดส่งข้อมูลในแต่ละเลเยอร์ช่วยให้นักพัฒนาสามารถโฟกัสจุดแก้ปัญหาได้รวดเร็ว เช่น ปัญหาสายหลวมขจัดได้ที่ Layer 1, ปัญหาการเลือกไอพีชนแก้ที่ Layer 3
            </p>
          </div>

          {/* Interactive Simulator 1: OSI 7-Layer Interactive Inspector */}
          <OsiLayerInspector />
        </section>

        {/* ─── SUBTOPIC 3: ชุดโปรโตคอล TCP/IP 4 ชั้นและการเทียบเคียง ─────────────────────── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">สถาปัตยกรรมการปฏิบัติตามมาตรฐานงานจริง</span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              ชุดโปรโตคอล TCP/IP 4 ชั้นและการเทียบเคียงกับแบบจำลอง OSI
            </h3>
          </div>

          <div className="text-[16px] md:text-[17px] font-normal text-zinc-600 leading-relaxed space-y-4">
            <p>
              แม้แบบจำลอง OSI 7 ชั้นจะเป็นทฤษฎีที่ใช้อ้างอิงการศึกษาอย่างยอดเยี่ยม ทว่าในสถาปัตยกรรมเครือข่ายอินเทอร์เน็ตจริงที่ถูกสร้างและใช้งานอย่างมีประสิทธิภาพสูงสุดคือ 
              <strong>แบบจำลอง TCP/IP (TCP/IP Model)</strong> ซึ่งมีโครงสร้างกระชับควบรวมกว่าเพียง 4 เลเยอร์
            </p>
            <p>
              การเทียบเคียง (Mapping) โครงร่างสัญญะของทั้งสองสถาปัตยกรรม แสดงรายละเอียดดังนี้:
            </p>
            <ul className="space-y-3.5 my-4 text-left">
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center p-1 rounded-full bg-indigo-100 text-indigo-600 mr-3 shrink-0 mt-0.5"><Check className="w-4 h-4" /></span>
                <div>
                  <strong>Application Layer (TCP/IP):</strong> ควบรวมหน้าที่ระดับสูงของ OSI Model ทั้ง 3 ชั้นด้านบน (Application, Presentation, Session) เข้าเป็นหนึ่งเดียว ทำงานประสานคำสั่งบริการแอปพลิเคชันอย่างครบถ้วน
                </div>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center p-1 rounded-full bg-indigo-100 text-indigo-600 mr-3 shrink-0 mt-0.5"><Check className="w-4 h-4" /></span>
                <div>
                  <strong>Transport Layer (TCP/IP):</strong> เทียบได้กับชั้น Transport ของ OSI คอยดูแลเรื่องการควบคุมความถูกต้องครบถ้วนของการไหลข้อมูลผ่านช่องทางการเชื่อมต่อ (TCP หรือ UDP)
                </div>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center p-1 rounded-full bg-indigo-100 text-indigo-600 mr-3 shrink-0 mt-0.5"><Check className="w-4 h-4" /></span>
                <div>
                  <strong>Internet Layer (TCP/IP):</strong> เทียบได้กับชั้น Network ของ OSI ดูแลเรื่องการหาเส้นทางและการกระจายที่อยู่ไอพีนำทาง (IP Address, ARP) ข้ามระบบ
                </div>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center p-1 rounded-full bg-indigo-100 text-indigo-600 mr-3 shrink-0 mt-0.5"><Check className="w-4 h-4" /></span>
                <div>
                  <strong>Network Access / Link Layer (TCP/IP):</strong> ควบรวมหน้าที่ระดับล่างของ OSI (Data Link และ Physical) จัดส่งเฟรมข้อมูลข้ามตัวนำสัญญาณทองแดง/แสง และคุมฮาร์ดแวร์พื้นฐาน
                </div>
              </li>
            </ul>
          </div>

          {/* Interactive Simulator 2: OSI vs TCP/IP Mapping Tool */}
          <OsiTcpipMappingTool />
        </section>

        {/* ─── SUBTOPIC 4: กระบวนการห่อหุ้มและถอดรหัสหน่วยข้อมูล ───────────────────────────── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">ขั้นตอนการไหลบิตสัญญาณในท่อส่ง</span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              กระบวนการห่อหุ้มและถอดรหัสหน่วยข้อมูล (Data Encapsulation & Decapsulation)
            </h3>
          </div>

          <div className="text-[16px] md:text-[17px] font-normal text-zinc-600 leading-relaxed space-y-4">
            <p>
              ในการนำส่งข้อมูลข่าวสารข้ามสายเชื่อมต่อ ข้อมูลจะไม่เดินทางเป็นก้อนดิบเดี่ยวเปล่า ๆ แต่จะเดินทางผ่านกระบวนการบรรจุกล่องหุ้มฉลากทีละขั้น 
              กระบวนการห่อหุ้มและปิดฉลากข้อมูลนี้เรียกว่า <strong>Data Encapsulation</strong> ในฝั่งส่ง และเมื่อแพ็กเก็ตวิ่งผ่านตัวกลางข้ามวงสายแลนมาถึงฝั่งรับ 
              ระบบปฏิบัติการจะแกะกล่องเหล่านั้นออกทีละชั้นซึ่งเรียกว่า <strong>Data Decapsulation</strong> เพื่อดึงเอาตัวแปรข้อความจริงขึ้นส่งมอบให้แอปพลิเคชัน
            </p>
            
            <div className="p-5 bg-white/60 border border-slate-200 shadow-sm rounded-2xl border-l-[3px] border-l-indigo-500/80 leading-normal text-slate-500 text-xs">
              💡 <strong>คำจำกัดความ PDU (Protocol Data Unit):</strong> คือชื่อเรียกหน่วยข้อมูลที่เปลี่ยนสถานะทางตรรกะในแต่ละระดับการห่อหุ้ม ได้แก่ 
              <span className="mx-1 font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-1 py-0.5 rounded font-mono">Data</span> (ฝั่งแอปพลิเคชัน) ➔ 
              <span className="mx-1 font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1 py-0.5 rounded font-mono">Segment</span> (ฝั่งขนส่ง/พอร์ต) ➔ 
              <span className="mx-1 font-bold text-yellow-700 bg-yellow-50 border border-yellow-200 px-1 py-0.5 rounded font-mono">Packet</span> (ฝั่งไอพีนำทาง) ➔ 
              <span className="mx-1 font-bold text-orange-700 bg-orange-50 border border-orange-200 px-1 py-0.5 rounded font-mono">Frame</span> (ฝั่งฮาร์ดแวร์/MAC) ➔ 
              <span className="mx-1 font-bold text-rose-700 bg-rose-50 border border-rose-200 px-1 py-0.5 rounded font-mono">Bits</span> (ฝั่งขั้วไฟนำสัญญาณ)
            </div>
          </div>

          {/* Interactive Simulator 3: Data Encapsulation & Decapsulation Lab */}
          <DataEncapsulationLab />
        </section>

        {/* ─── SUBTOPIC 5: พอร์ตบริการและหน้าที่ของโปรโตคอลมาตรฐานเครือข่าย ─────────────────── */}
        <section className="space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase">การจัดสรรช่องควบคุมและการติดต่อระดับโฮสต์</span>
            <h3 className="text-[26px] font-semibold text-zinc-900 leading-tight mt-1">
              พอร์ตบริการและหน้าที่ของโปรโตคอลมาตรฐานเครือข่าย
            </h3>
          </div>

          <div className="text-[16px] md:text-[17px] font-normal text-zinc-600 leading-relaxed space-y-4">
            <p>
              ในระดับการสื่อสาร Transport Layer โปรโตคอลจำเป็นต้องจำแนกบริการออกเป็น <strong>หมายเลขพอร์ต (Port Numbers)</strong> 
              ตั้งแต่พอร์ต 0 ถึง 65535 วัตถุประสงค์เพื่อให้เซิร์ฟเวอร์รู้ว่าคำขอของเครื่องปลายทางต้องการเรียกใช้งานแอปพลิเคชันหรือเซิร์ฟเวอร์ตัวใดในบอร์ดระบบ 
              โดยมีพอร์ตมาตรฐานที่พบบ่อย (Well-known Ports 0 - 1023) ที่วิศวกรและช่างไอทีระบบบำรุงรักษาต้องจำได้ขึ้นใจ:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-4 text-left">
              <div className="bg-gradient-to-br from-indigo-50/60 to-white p-5 rounded-2xl border border-indigo-150 shadow-sm space-y-2">
                <span className="p-2 rounded-xl bg-indigo-100 text-indigo-700 inline-block font-bold font-mono text-xs">HTTP (80) / HTTPS (443)</span>
                <h6 className="font-bold text-indigo-950 text-[14.5px]">บริการเปิดดูหน้าเว็บเพจ</h6>
                <p className="text-xs text-zinc-500 leading-relaxed font-sans">
                  HTTP (80) ส่งข้อมูลดิบไม่ปลอดภัย ถูกดักจับและแอบส่องไฟล์ได้ง่าย สากลจึงหันมาใช้ HTTPS (443) ซึ่งผ่านการเข้ารหัสลับด้วย SSL/TLS ปลอดภัยสูง
                </p>
              </div>
              <div className="bg-gradient-to-br from-emerald-50/60 to-white p-5 rounded-2xl border border-emerald-150 shadow-sm space-y-2">
                <span className="p-2 rounded-xl bg-emerald-100 text-emerald-700 inline-block font-bold font-mono text-xs">SSH (22) / Telnet (23)</span>
                <h6 className="font-bold text-emerald-950 text-[14.5px]">ระบบรีโมทควบคุมระยะไกล</h6>
                <p className="text-xs text-zinc-500 leading-relaxed font-sans">
                  SSH (พอร์ต 22) เข้ารหัสลับข้อมูลรหัสผ่านความปลอดภัยแน่นหนา ทดแทนการใช้ Telnet (พอร์ต 23) ซึ่งเป็นสัญญะข้อความดิบที่เสี่ยงสูงต่อการถูก sniff รหัสผ่าน
                </p>
              </div>
              <div className="bg-gradient-to-br from-yellow-50/60 to-white p-5 rounded-2xl border border-yellow-150 shadow-sm space-y-2">
                <span className="p-2 rounded-xl bg-yellow-100 text-yellow-700 inline-block font-bold font-mono text-xs">DNS (53) / DHCP (67/68)</span>
                <h6 className="font-bold text-yellow-950 text-[14.5px]">ตัวแปลระบบและการจัดสรรไอพี</h6>
                <p className="text-xs text-zinc-500 leading-relaxed font-sans">
                  DNS (พอร์ต 53) แปลงชื่อเว็บเพจเป็นไอพีแอดเดรส และ DHCP (พอร์ต 67/68) คอยตรวจจับอุปกรณ์และแจกไอพีพร้อม subnet ให้พนักงานทันทีที่เสียบสาย LAN
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Simulator 4: Protocol Port Router Board */}
          <ProtocolPortRouter />
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
            title="ภารกิจวิเคราะห์ลำดับแพ็กเก็ตจำลองและวางระบบตรวจสอบสิทธิ์บำรุงรักษาเครือข่ายองค์กร"
            taskText={`ให้นักเรียนสวมบทบาทเป็น "วิศวกรเครือข่ายและการรักษาความมั่นคงปลอดภัยไซเบอร์" (Network Security Engineer) ดำเนินการศึกษาและสรุปคู่มือรายงานเชิงเทคนิคดังนี้:
1. อธิบายหน้าที่หลักและเปรียบเทียบจุดแตกต่างของการทำงานระหว่างแบบจำลองอ้างอิง OSI Model (7 ชั้น) และ TCP/IP Model (4 ชั้น) ในด้านขอบเขตการควบรวมเลเยอร์ระดับสูงและระดับล่าง
2. เขียนผังวิชวลหรือขั้นตอนการห่อหุ้มข้อมูล (Data Encapsulation Flow) ของการส่งสัญญาณเว็บเพจแบบ HTTPS (Port 443) จากขั้นตอนข้อมูลดิบ (Application Payload) ลงไปสู่อัตราบิต (Bits Stream) โดยระบุข้อมูลที่จะถูกเติมเข้าเป็น Header/Trailer ในแต่ละขั้นตอนอย่างละเอียด
3. สรุปความจำเป็นทางด้านความมั่นคงปลอดภัยว่า เหตุใดการตั้งค่านโยบายของไฟร์วอลล์ (Firewall ACL Rules) ในบริษัทสากลระดับอาชีพ จึงต้องบังคับบล็อกพอร์ต Telnet (Port 23) และ FTP (Port 20/21) พร้อมแสดงทางเลือกโปรโตคอลทดแทนที่ดีกว่า`}
          />
        </div>

      </main>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   1. OSI 7-LAYER INTERACTIVE INSPECTOR (Subtopic 2)
   ═══════════════════════════════════════════════════════════════════ */
const OSI_LAYERS = [
  {
    number: 7,
    nameEn: 'Application Layer',
    nameTh: 'ชั้นแอปพลิเคชัน',
    colorClass: 'border-purple-300 text-purple-700 bg-purple-50/40 hover:bg-purple-50/60 shadow-purple-100/50',
    accentColor: '#8B5CF6',
    pdu: 'ข้อมูล (Data)',
    protocols: 'HTTP, HTTPS, FTP, DNS, DHCP, SSH, SMTP',
    hardware: 'ซอฟต์แวร์เบราว์เซอร์, เครื่องแม่ข่าย, Client Application',
    role: 'ให้บริการและติดต่อเชื่อมต่อโดยตรงระหว่างซอฟต์แวร์แอปพลิเคชันของผู้ใช้งานอินเทอร์เน็ตกับเครือข่าย'
  },
  {
    number: 6,
    nameEn: 'Presentation Layer',
    nameTh: 'ชั้นนำเสนอข้อมูล',
    colorClass: 'border-indigo-300 text-indigo-700 bg-indigo-50/40 hover:bg-indigo-50/60 shadow-indigo-100/50',
    accentColor: '#6366F1',
    pdu: 'ข้อมูล (Data / Formatted)',
    protocols: 'SSL, TLS, ASCII, EBCDIC, JPEG, GIF, MP4',
    hardware: 'กลไกการเข้ารหัสลับบนเบราว์เซอร์/OS, ตัวบีบอัดไฟล์',
    role: 'รับผิดชอบการแปลงฟอร์แมตโครงสร้างข้อมูล แปลงรหัสอักขระ บีบอัดความยาวไฟล์ และสกัดการเข้ารหัส/ถอดรหัสเพื่อความปลอดภัย'
  },
  {
    number: 5,
    nameEn: 'Session Layer',
    nameTh: 'ชั้นเซสชัน',
    colorClass: 'border-blue-300 text-blue-700 bg-blue-50/40 hover:bg-blue-50/60 shadow-blue-100/50',
    accentColor: '#3B82F6',
    pdu: 'ข้อมูล (Data / Sessions)',
    protocols: 'NetBIOS, L2TP, PPTP, SOCKS, SQL Connection',
    hardware: 'Connection Engine ของระบบปฏิบัติการ (OS)',
    role: 'ควบคุมการสนทนา ทำหน้าที่เริ่มสร้าง จัดระเบียบการเชื่อมต่อ และตัดบทสัมพันธ์เซสชันระหว่างโฮสต์ระบบต้นทางและปลายทาง'
  },
  {
    number: 4,
    nameEn: 'Transport Layer',
    nameTh: 'ชั้นขนส่งข้อมูล',
    colorClass: 'border-emerald-300 text-emerald-700 bg-emerald-50/40 hover:bg-emerald-50/60 shadow-emerald-100/50',
    accentColor: '#10B981',
    pdu: 'ส่วนข้อมูล (Segment / Datagram)',
    protocols: 'TCP (การส่งแบบควบคุมยืนยัน), UDP (การส่งความเร็วสูงไม่ยืนยัน)',
    hardware: 'TCP socket Engine, โปรโตคอลสแต็กของระบบคอมพิวเตอร์',
    role: 'บริหารจัดการและควบคุมอัตราไหลข้อมูลแบบ End-to-End ดูแลความถูกต้อง ขจัดปัญหาบิตชำรุด และสับแบ่งก้อนขนาดใหญ่'
  },
  {
    number: 3,
    nameEn: 'Network Layer',
    nameTh: 'ชั้นเครือข่าย',
    colorClass: 'border-yellow-300 text-yellow-700 bg-yellow-50/40 hover:bg-yellow-50/60 shadow-yellow-100/50',
    accentColor: '#EAB308',
    pdu: 'แพ็กเก็ต (Packet)',
    protocols: 'IP (IPv4 / IPv6), ICMP, ARP, RIP, OSPF',
    hardware: 'เราเตอร์ (Router), L3 Switch, เกตเวย์เชื่อมโยงข้ามวง',
    role: 'จัดการที่อยู่เชิงตรรกะ IP Address และนำหากลวิธีส่งแพ็กเก็ตผ่านเส้นทางที่ดีที่สุด (Routing) เพื่อส่งข้ามไปต่าง Subnet'
  },
  {
    number: 2,
    nameEn: 'Data Link Layer',
    nameTh: 'ชั้นเชื่อมโยงข้อมูล',
    colorClass: 'border-orange-300 text-orange-700 bg-orange-50/40 hover:bg-orange-50/60 shadow-orange-100/50',
    accentColor: '#F97316',
    pdu: 'เฟรม (Frame)',
    protocols: 'Ethernet (802.3), Wi-Fi (802.11), PPP, VLAN, ARP',
    hardware: 'สวิตช์เครือข่าย (Switch), การ์ด LAN (NIC), บริดจ์ (Bridge)',
    role: 'ควบคุมการส่งข้อมูลระดับฮาร์ดแวร์โดยใช้ MAC Address แบ่งบิตเป็นเฟรม ตรวจสอบข้อผิดพลาดทางกายภาพขั้นต้นด้วยบิต FCS'
  },
  {
    number: 1,
    nameEn: 'Physical Layer',
    nameTh: 'ชั้นกายภาพ',
    colorClass: 'border-rose-300 text-rose-700 bg-rose-50/40 hover:bg-rose-50/60 shadow-rose-100/50',
    accentColor: '#F43F5E',
    pdu: 'บิต (Bits)',
    protocols: 'บิตนำส่งสัญญาณ, แรงดันคลื่นไฟฟ้า, คลื่นแสงไฟเบอร์',
    hardware: 'สายทองแดง UTP, ใยแก้วนำแสง, ฮับ (Hub), รีพีตเตอร์, ขั้วหัว RJ-45',
    role: 'ทำหน้าที่ควบคุมกลไกทางฟิสิกส์ แปลงสถานะบิตข้อมูล 0 และ 1 เป็นพัลส์ไฟฟ้าหรือกระแสงแสงพุ่งผ่านสื่อนำสายเคเบิล'
  }
];

function OsiLayerInspector() {
  const [selectedLayerIndex, setSelectedLayerIndex] = useState(0); // Application by default
  const [isSimulating, setIsSimulating] = useState(false);
  const [simStep, setSimStep] = useState(null); // null, 'L7_S' -> 'L1_S' -> 'Transit' -> 'L1_R' -> 'L7_R'
  const [simLogs, setSimLogs] = useState([]);
  const logsEndRef = useRef(null);

  const activeLayer = OSI_LAYERS[selectedLayerIndex];

  // Auto-scroll simulation logs
  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [simLogs]);

  const triggerSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimLogs(['🌐 เริ่มกระบวนการรับส่งข้อมูลผ่านเครือข่ายจำลอง [HTTPS Request]']);
    
    // Total steps sequence:
    // 0..6 (Down L7..L1 Sender)
    // 7 (Transit)
    // 8..14 (Up L1..L7 Receiver)
    let currentStep = 0;
    setSimStep('L7_S');

    const interval = setInterval(() => {
      currentStep++;
      if (currentStep <= 6) {
        // Moving down sender stack
        const layerNum = 7 - currentStep;
        const layer = OSI_LAYERS[currentStep];
        setSimStep(`L${layerNum}_S`);
        setSimLogs(prev => [...prev, `[ฝั่งส่ง - Encapsulate] ไหลลงสู่ ${layer.nameEn}: เติม Header ของชั้นนี้ (PDU: ${layer.pdu})`]);
      } else if (currentStep === 7) {
        // Travelling over physical wire
        setSimStep('Transit');
        setSimLogs(prev => [...prev, '⚡ [กายภาพ - Physical Media] ข้อมูลแปลงเป็นบิตไฟฟ้าวิ่งข้ามสายนำสัญญาณไปยังเครื่องรับปลายทาง...']);
      } else if (currentStep <= 14) {
        // Moving up receiver stack
        const recIndex = currentStep - 8;
        const layerNum = recIndex + 1;
        const layer = OSI_LAYERS[6 - recIndex];
        setSimStep(`L${layerNum}_R`);
        setSimLogs(prev => [...prev, `[ฝั่งรับ - Decapsulate] ไหลขึ้นสู่ ${layer.nameEn}: ตรวจเช็คและแกะแกนหัว (PDU: ${layer.pdu}) สำเร็จ`]);
      } else {
        // Done
        clearInterval(interval);
        setSimStep(null);
        setIsSimulating(false);
        setSimLogs(prev => [...prev, '🎉 [สมบูรณ์ - Delivered] ข้อมูลเว็บเพจถูกประมวลผลถอดรหัสเรียบร้อย แสดงผลหน้าเว็บให้ผู้รับเสร็จสมบูรณ์!']);
      }
    }, 850);
  };

  return (
    <SimulatorShell
      icon={<Cpu className="w-6 h-6 text-indigo-500" />}
      title="แผงผ่าแกนวิเคราะห์ OSI 7 ชั้นและระบบรับส่งแพ็กเก็ตจำลอง"
      accentBg="bg-indigo-50"
      iconColor="text-indigo-600"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch select-none text-left font-sans">
        
        {/* Left Vertical List of 7 Layers with simulation tracking dots */}
        <div className="bg-[#0f172a] rounded-2xl p-5 border border-slate-800 flex flex-col justify-between shadow-2xl relative min-h-[460px] lg:col-span-1 text-xs text-slate-200">
          <span className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold">OSI VERTICAL PILE</span>
          
          <div className="space-y-4">
            <div>
              <h6 className="text-[13px] font-bold text-white flex items-center gap-1.5"><Sliders className="w-4 h-4 text-indigo-400" /> OSI layers</h6>
              <p className="text-[10px] text-slate-400 leading-normal">
                คลิกเพื่อสำรวจเนื้อหา หรือกดเปิดแล็บยิงแพ็กเก็ตไหลข้ามชั้นจำลอง
              </p>
            </div>

            <div className="flex flex-col gap-2">
              {OSI_LAYERS.map((layer, idx) => {
                const isSelected = selectedLayerIndex === idx;
                const layerNum = layer.number;
                
                // Determine highlight states based on simulation steps
                const isSenderActive = simStep === `L${layerNum}_S`;
                const isReceiverActive = simStep === `L${layerNum}_R`;
                const isPulse = isSenderActive || isReceiverActive;

                return (
                  <button
                    key={idx}
                    onClick={() => !isSimulating && setSelectedLayerIndex(idx)}
                    disabled={isSimulating}
                    className={`p-2.5 border rounded-xl text-left cursor-pointer transition-all active:scale-98 flex items-center justify-between group ${
                      isPulse 
                        ? 'bg-indigo-600 border-indigo-400 text-white animate-pulse shadow-md font-bold'
                        : isSelected
                          ? 'bg-slate-900 border-indigo-500/60 text-indigo-300 font-bold'
                          : 'bg-slate-950 border-slate-850 text-slate-450 hover:bg-slate-900 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-6 h-6 rounded-lg font-mono font-bold text-xs flex items-center justify-center ${
                        isPulse
                          ? 'bg-white text-indigo-700'
                          : isSelected
                            ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                            : 'bg-slate-900 border border-slate-800 text-slate-400'
                      }`}>
                        {layerNum}
                      </span>
                      <div className="leading-tight">
                        <span className="block text-[11px] font-bold">{layer.nameEn}</span>
                        <span className="block text-[9.5px] opacity-80 font-normal">{layer.nameTh}</span>
                      </div>
                    </div>
                    
                    {/* Simulated indicators */}
                    <div className="flex gap-1.5 items-center">
                      {isSenderActive && <ArrowDown className="w-3.5 h-3.5 text-white animate-bounce" />}
                      {isReceiverActive && <ArrowUp className="w-3.5 h-3.5 text-white animate-bounce" />}
                      {!isSimulating && (
                        <ChevronRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-slate-300" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-850">
            <button
              onClick={triggerSimulation}
              disabled={isSimulating}
              className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98 shadow-md ${
                isSimulating
                  ? 'bg-slate-900 border border-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              <Send className="w-4 h-4" />
              {isSimulating ? 'กำลังส่งข้อมูล...' : 'จำลองการส่งข้อมูล (SIMULATE FLOW)'}
            </button>
          </div>
        </div>

        {/* Right Details Panel and Simulation Live Terminal */}
        <div className="flex flex-col justify-between space-y-6 lg:col-span-2 text-left">
          
          {/* Layer description board (Dynamic based on click) */}
          <div className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl p-6 border-l-[3.5px] border-l-indigo-500/80 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest block font-mono">
                  OSI LAYER {activeLayer.number} DETAILS
                </span>
                <h4 className="text-xl font-bold text-zinc-900 mt-0.5">{activeLayer.nameEn}</h4>
              </div>
              <span className="px-3 py-1.5 rounded-xl bg-indigo-50 border border-indigo-200/50 text-indigo-700 text-xs font-mono font-bold">
                PDU: {activeLayer.pdu}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5">
                <span className="text-slate-500 font-bold block">หน้าที่หลัก (Role):</span>
                <p className="text-[13px] text-zinc-650 leading-relaxed font-sans">{activeLayer.role}</p>
              </div>
              <div className="space-y-2 bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                <div>
                  <span className="text-slate-400 font-bold block text-[10px]">โปรโตคอลหลัก (Protocols):</span>
                  <span className="font-bold text-slate-700 block text-[12.5px] font-mono mt-0.5">{activeLayer.protocols}</span>
                </div>
                <div className="border-t border-slate-100 pt-1.5">
                  <span className="text-slate-400 font-bold block text-[10px]">ชิ้นส่วนฮาร์ดแวร์/ซอฟต์แวร์:</span>
                  <span className="font-bold text-indigo-700 block text-[12.5px] mt-0.5">{activeLayer.hardware}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Symmetrical wire display when in physical transit */}
          {simStep === 'Transit' && (
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-center gap-4 text-white animate-pulse">
              <div className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
              <span className="font-mono text-xs">PHYSICAL TRANSIT: 10110010 01101101 11001010 OVER COPPER CABLE</span>
            </div>
          )}

          {/* Console Output Screen representing encapsulator / decapsulator steps */}
          <div className="space-y-2">
            <span className="text-[11.5px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-indigo-500" />
              ลูพแสดงประวัติการห่อหุ้มในเครือข่าย (Live Encapsulation Loop Logs)
            </span>
            <ConsoleScreen height="h-[180px]">
              <div className="space-y-1 text-emerald-400 font-mono text-[12.5px] leading-relaxed">
                {simLogs.length === 0 ? (
                  <span className="text-slate-500 italic">... กดปุ่ม "จำลองการส่งข้อมูล" เพื่อเริ่มกระบวนการจัดส่งบิตข้ามเลเยอร์ ...</span>
                ) : (
                  simLogs.map((log, idx) => (
                    <div key={idx} className="transition-all duration-300">
                      {log}
                    </div>
                  ))
                )}
                <div ref={logsEndRef} />
              </div>
            </ConsoleScreen>
          </div>

        </div>

      </div>
    </SimulatorShell>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   2. OSI MODEL VS TCP/IP MODEL MAPPING (Subtopic 3)
   ═══════════════════════════════════════════════════════════════════ */
const TCPIP_LAYERS = [
  {
    id: 'app',
    nameEn: 'Application Layer',
    nameTh: 'ชั้นแอปพลิเคชัน',
    colorClass: 'border-purple-300 text-purple-700 bg-purple-50/40 hover:bg-purple-50/60 shadow-purple-100/50',
    protocols: 'HTTP, FTP, DNS, DHCP, SSH',
    mappedOsi: [7, 6, 5],
    yAnchor: 65, // Relative center coordinate on SVG
    desc: 'ควบรวมการสนทนา แปลงฟอร์แมตข้อมูล และนำเสนอทางแอปพลิเคชันของผู้ใช้'
  },
  {
    id: 'trans',
    nameEn: 'Transport Layer',
    nameTh: 'ชั้นขนส่งข้อมูล',
    colorClass: 'border-emerald-300 text-emerald-700 bg-emerald-50/40 hover:bg-emerald-50/60 shadow-emerald-100/50',
    protocols: 'TCP, UDP',
    mappedOsi: [4],
    yAnchor: 145,
    desc: 'ดูแลพิกัดช่องทางการเชื่อมต่อ ความเสถียรของบิต และสับขนาดแพ็กเก็ต'
  },
  {
    id: 'internet',
    nameEn: 'Internet Layer',
    nameTh: 'ชั้นอินเทอร์เน็ต',
    colorClass: 'border-yellow-300 text-yellow-700 bg-yellow-50/40 hover:bg-yellow-50/60 shadow-yellow-100/50',
    protocols: 'IP, ICMP, ARP',
    mappedOsi: [3],
    yAnchor: 200,
    desc: 'จัดการนำส่งไอพีแอดเดรสและการหาตรรกะเส้นทางข้ามวงเราเตอร์'
  },
  {
    id: 'link',
    nameEn: 'Network Access Layer',
    nameTh: 'ชั้นเข้าถึงเครือข่าย / ลิงก์',
    colorClass: 'border-orange-300 text-orange-700 bg-orange-50/40 hover:bg-orange-50/60 shadow-orange-100/50',
    protocols: 'Ethernet, Wi-Fi, PPP',
    mappedOsi: [2, 1],
    yAnchor: 275,
    desc: 'สลับแปลข้อมูลเข้าสู่เฟรมและบิตไฟฟ้านำสายทางส่งข้ามตัวนำฟิสิกส์'
  }
];

// Layout mapping helper for OSI nodes
const OSI_NODE_Y_ANCHORS = {
  7: 25,
  6: 65,
  5: 105,
  4: 145,
  3: 200,
  2: 255,
  1: 295
};

function OsiTcpipMappingTool() {
  const [selectedTcpipId, setSelectedTcpipId] = useState('app');

  const activeTcpip = TCPIP_LAYERS.find(t => t.id === selectedTcpipId);

  return (
    <SimulatorShell
      icon={<Network className="w-6 h-6 text-indigo-500 animate-pulse" />}
      title="แผงจำลองตรรกะเปรียบเทียบ OSI vs TCP/IP (Symmetrical Center Mapping Tool)"
      accentBg="bg-indigo-50"
      iconColor="text-indigo-600"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch select-none text-left font-sans">
        
        {/* Left side side-by-side interactive SVG mapping panel */}
        <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 flex flex-col justify-between items-center relative min-h-[380px] lg:col-span-2 overflow-hidden shadow-2xl">
          <span className="text-[9px] font-mono text-slate-500 absolute top-3 left-3">MAPPING CONNECTIONS (ABSOLUTE CENTER STANDARD)</span>
          
          <svg viewBox="0 0 350 320" className="w-full max-w-[325px] h-80 z-10 my-auto overflow-visible">
            {/* Absolute Center x=175.
               Side A OSI nodes x=45
               Side B TCPIP nodes x=305
            */}

            {/* Symmetrical Orthogonal connection lines */}
            {TCPIP_LAYERS.map(t => {
              const isActive = t.id === selectedTcpipId;
              const tcpipY = t.yAnchor;

              return t.mappedOsi.map(osiNum => {
                const osiY = OSI_NODE_Y_ANCHORS[osiNum];
                
                return (
                  <path
                    key={`${t.id}-${osiNum}`}
                    d={`M 115 ${osiY} C 185 ${osiY}, 165 ${tcpipY}, 235 ${tcpipY}`}
                    fill="none"
                    stroke={isActive ? '#6366F1' : '#475569'}
                    strokeWidth={isActive ? '3' : '1.5'}
                    strokeOpacity={isActive ? '1' : '0.4'}
                    strokeDasharray={isActive ? '5,3' : 'none'}
                    className={`transition-all duration-300 ${isActive ? 'animate-[dash_1s_linear_infinite]' : ''}`}
                  />
                );
              });
            })}

            {/* Left Column: OSI Nodes (Layer 7 down to 1) */}
            {OSI_LAYERS.map(layer => {
              const isMapped = activeTcpip.mappedOsi.includes(layer.number);
              const y = OSI_NODE_Y_ANCHORS[layer.number];

              return (
                <g key={layer.number} className="transition-all duration-300">
                  {/* Outer glow for mapped elements */}
                  <rect
                    x="10"
                    y={y - 15}
                    width="105"
                    height="30"
                    rx="6"
                    fill={isMapped ? '#1E293B' : '#0F172A'}
                    stroke={isMapped ? '#8B5CF6' : '#334155'}
                    strokeWidth="1.5"
                    className="transition-all"
                  />
                  <text x="18" y={y + 1} fill={isMapped ? '#FFFFFF' : '#64748B'} fontSize="7.5" fontWeight="bold" fontFamily="mono">
                    L{layer.number}
                  </text>
                  <text x="35" y={y + 1} fill={isMapped ? '#C084FC' : '#475569'} fontSize="8" fontWeight="bold" fontFamily="sans">
                    {layer.nameEn.split(' ')[0]}
                  </text>
                  
                  {/* Absolute center anchor dot */}
                  <circle cx="115" cy={y} r="2.5" fill={isMapped ? '#A855F7' : '#475569'} />
                </g>
              );
            })}

            {/* Right Column: TCP/IP Nodes */}
            {TCPIP_LAYERS.map(t => {
              const isActive = t.id === selectedTcpipId;
              const y = t.yAnchor;
              
              // Box height depends on the layer span
              let boxHeight = 40;
              if (t.id === 'app') boxHeight = 70;
              if (t.id === 'link') boxHeight = 55;

              return (
                <g key={t.id} className="transition-all duration-300 cursor-pointer" onClick={() => setSelectedTcpipId(t.id)}>
                  {/* Box container */}
                  <rect
                    x="235"
                    y={y - boxHeight / 2}
                    width="105"
                    height={boxHeight}
                    rx="8"
                    fill={isActive ? '#1E293B' : '#0F172A'}
                    stroke={isActive ? '#10B981' : '#334155'}
                    strokeWidth={isActive ? '2' : '1.2'}
                  />
                  
                  {/* Text labels */}
                  <text x="287" y={y - 4} fill={isActive ? '#FFFFFF' : '#94A3B8'} fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans">
                    {t.nameEn.split(' ')[0]} Layer
                  </text>
                  
                  <text x="287" y={y + 6} fill={isActive ? '#34D399' : '#64748B'} fontSize="7" textAnchor="middle" fontFamily="mono">
                    {t.protocols.split(',').slice(0, 2).join(',')}
                  </text>
                  
                  {/* Absolute center connection dot */}
                  <circle cx="235" cy={y} r="3.5" fill={isActive ? '#10B981' : '#475569'} />
                </g>
              );
            })}

            {/* Side column labels */}
            <text x="62" y="315" fill="#94A3B8" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans">OSI 7 Layers</text>
            <text x="287" y="315" fill="#94A3B8" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans">TCP/IP 4 Layers</text>
          </svg>
        </div>

        {/* Right Information panel mapping the equivalents */}
        <div className="flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <span className="text-[12px] font-bold text-slate-400 uppercase tracking-wider block">
              ตรรกะเทียบเคียงเลเยอร์ (Equivalent Mapping Analyzer)
            </span>
            
            <div className="text-slate-650 text-sm leading-relaxed space-y-4 font-sans">
              <p>
                คลิกปุ่มหรือเลเยอร์ฝั่งขวาของ <strong>TCP/IP Model</strong> เพื่อส่องดูขอบเขตหน้าที่ซึ่งควบรวมมาจากฝั่ง <strong>OSI Model</strong>
              </p>

              {/* Option Selector Grid */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                {TCPIP_LAYERS.map(t => {
                  const isActive = t.id === selectedTcpipId;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setSelectedTcpipId(t.id)}
                      className={`p-2 border text-[11px] rounded-lg font-bold transition-all cursor-pointer active:scale-95 text-center ${
                        isActive
                          ? 'bg-indigo-50/50 border-indigo-500 text-indigo-700 font-bold shadow-sm'
                          : 'bg-white border-slate-200 text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      {t.nameEn.split(' ')[0]}
                      <span className="block text-[8.5px] font-normal leading-none mt-1 opacity-90">{t.nameTh}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mapping diagnostics result box */}
          <div className="p-5 bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-2xl border-l-[3.5px] border-l-emerald-500/80 space-y-3.5 leading-normal text-xs">
            <h5 className="font-bold text-slate-800 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-emerald-600" />
              ชั้น {activeTcpip.nameEn}
            </h5>
            <div className="space-y-2 text-slate-500 leading-relaxed font-sans">
              <p>
                <strong>ขอบข่ายการเทียบเคียง:</strong> ควบรวมชั้นเลเยอร์ของ OSI ทั้งหมด ได้แก่ 
                <span className="ml-1 font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-1 py-0.5 rounded font-mono">
                  {activeTcpip.mappedOsi.map(n => `L${n}`).reverse().join(', ')}
                </span>
              </p>
              <p>
                <strong>หน้าที่ระดับโปรโตคอล:</strong> {activeTcpip.desc}
              </p>
              <p>
                <strong>โปรโตคอลหลักในชั้นนี้:</strong> 
                <span className="ml-1 font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1 py-0.5 rounded text-[10.5px]">
                  {activeTcpip.protocols}
                </span>
              </p>
            </div>
          </div>
        </div>

      </div>
    </SimulatorShell>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   3. DATA ENCAPSULATION & DECAPSULATION LAB (Subtopic 4)
   ═══════════════════════════════════════════════════════════════════ */
const ENCAP_STEPS = [
  {
    name: 'Application (Data)',
    pdu: 'Data',
    desc: 'ฝั่งแอปพลิเคชันจัดเตรียมตัวแปร Payload ข้อความต้นฉบับของผู้ใช้งาน',
    headerInfo: 'ไม่มีการห่อหุ้มเพิ่มเติม (บรรจุ Payload ดิบ)',
    preview: (payload) => `${payload}`
  },
  {
    name: 'Transport (Segment)',
    pdu: 'Segment',
    desc: 'แปรรูปและหุ้ม TCP Header ระบุหมายเลขพอร์ตต้นทางปลายทางเพื่อเชื่อมต่อช่องสื่อสาร',
    headerInfo: 'TCP Header [Src Port: 51220, Dest Port: 443, Seq: 401]',
    preview: (payload) => `[TCP Header: 51220➔443] | Payload: "${payload}"`
  },
  {
    name: 'Network (Packet)',
    pdu: 'Packet',
    desc: 'ห่อหุ้ม IP Header ระบุที่อยู่ไอพีแอดเดรสต้นทางปลายทางเพื่อหาเส้นทางนำส่งข้ามเครือข่าย',
    headerInfo: 'IP Header [Src IP: 192.168.1.150, Dest IP: 8.8.8.8, TTL: 64]',
    preview: (payload) => `[IP Header: 192.168.1.150➔8.8.8.8] | [TCP Header] | "${payload}"`
  },
  {
    name: 'Data Link (Frame)',
    pdu: 'Frame',
    desc: 'ห่อหุ้ม Ethernet Header ระบุ MAC Address และเติมหาง FCS ตรวจสอบบิตชำรุดทางฟิสิกส์',
    headerInfo: 'Ethernet [Src MAC: E0:D5:5E➔Dest MAC: A4:7B:2C] + [FCS Trailer: 0xEE7D5A9B]',
    preview: (payload) => `[Eth Header: MAC] | [IP Hdr] | [TCP Hdr] | "${payload}" | [FCS: 0xEE7D5A]`
  },
  {
    name: 'Physical (Bits)',
    pdu: 'Bits',
    desc: 'แปลงก้อนกรอบข้อมูล Frame ทั้งหมดออกมาเป็นสัญญาณพัลส์แรงดันบิตไฟฟ้า 0 และ 1 ส่งออกสื่อกลาง',
    headerInfo: 'สัญญาณไฟฟ้า / สัญญาณแสงเดินทางผ่านสาย LAN',
    preview: (payload) => `01000111 01000101 01010100 00100000 00101111 01101001 01101110 01100100 01100101 01111000`
  }
];

function DataEncapsulationLab() {
  const [mode, setMode] = useState('encap'); // encap | decap
  const [stepIndex, setStepIndex] = useState(0); // 0 to 4
  const [payloadText, setPayloadText] = useState('GET /index.html HTTPS/1.1');
  const [feedback, setFeedback] = useState('ยินดีต้อนรับสู่แล็บห่อหุ้มข้อมูล เริ่มสเตปแรกโดยกดปุ่ม "ถัดไป"');

  const maxSteps = ENCAP_STEPS.length;
  const currentStep = ENCAP_STEPS[stepIndex];

  const handleNext = () => {
    if (mode === 'encap') {
      if (stepIndex < maxSteps - 1) {
        const nextIdx = stepIndex + 1;
        setStepIndex(nextIdx);
        setFeedback(`[ห่อหุ้ม - Encap] เลื่อนขยับสู่สเตป ${nextIdx + 1} (${ENCAP_STEPS[nextIdx].name}) เติมโครงสร้าง Headers เรียบร้อย`);
      } else {
        setFeedback('🎉 [เสร็จสมบูรณ์] ข้อมูลห่อหุ้มครบถ้วน 100% จนกลายเป็นบิตสัญญาณพร้อมส่งออกทางสายเคเบิลเรียบร้อย!');
      }
    } else {
      // decap mode
      if (stepIndex > 0) {
        const nextIdx = stepIndex - 1;
        setStepIndex(nextIdx);
        setFeedback(`[แกะถอด - Decap] สเตปถอดโครงสร้างขึ้นสู่ ${nextIdx + 1} (${ENCAP_STEPS[nextIdx].name}) สลัดส่วนหัวทิ้งสำเร็จ`);
      } else {
        setFeedback('🎉 [เสร็จสมบูรณ์] แกะข้อมูลและถอดรหัสบิตสำเร็จ ได้ Payload ดิบทรงเดิมส่งมอบแอปพลิเคชัน!');
      }
    }
  };

  const handlePrev = () => {
    if (mode === 'encap') {
      if (stepIndex > 0) {
        const prevIdx = stepIndex - 1;
        setStepIndex(prevIdx);
        setFeedback(`ถอยสเตปย้อนกลับสู่ชั้น ${ENCAP_STEPS[prevIdx].name}`);
      }
    } else {
      // decap mode
      if (stepIndex < maxSteps - 1) {
        const prevIdx = stepIndex + 1;
        setStepIndex(prevIdx);
        setFeedback(`ถอยสเตปแกะข้อมูล ย้อนลงสู่ชั้น ${ENCAP_STEPS[prevIdx].name}`);
      }
    }
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
    if (newMode === 'encap') {
      setStepIndex(0);
      setFeedback('เริ่มสเตปการห่อหุ้มข้อมูล (Data Encapsulation) ของฝั่งส่งทีละระดับชั้น');
    } else {
      setStepIndex(4);
      setFeedback('เริ่มสเตปการถอดรหัสข้อมูล (Data Decapsulation) ย้อนบิตสัญญาณขึ้นสู่ฝั่งรับ');
    }
  };

  return (
    <SimulatorShell
      icon={<Layers className="w-6 h-6 text-indigo-500" />}
      title="ห้องปฏิบัติการทดสอบการห่อหุ้มและถอดรหัสบิตแพ็กเก็ตข้อมูล (Data Encapsulation Lab)"
      accentBg="bg-indigo-50"
      iconColor="text-indigo-600"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch select-none text-left font-sans">
        
        {/* Left Column Controls and Input payload */}
        <div className="bg-[#0f172a] rounded-2xl p-5 border border-slate-800 flex flex-col justify-between shadow-2xl relative min-h-[400px] text-xs text-slate-200 lg:col-span-1">
          <span className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold">PIPELINE CONTROLLER</span>
          
          <div className="space-y-4">
            <div>
              <h6 className="text-[13px] font-bold text-white flex items-center gap-1.5"><Sliders className="w-4 h-4 text-indigo-400" /> Pipeline config</h6>
              <p className="text-[10px] text-slate-400 leading-normal">
                ระบุ Payload คำสั่งดิบ เลือกโหมดฝั่งรับ/ส่ง แล้วคลิกไล่สเตปเพื่อศึกษา
              </p>
            </div>

            {/* Input payload textbox */}
            <div className="space-y-1.5">
              <span className="text-[10px] text-slate-400 font-bold block">ข้อความผู้ส่ง (Application Payload):</span>
              <input
                type="text"
                disabled={stepIndex !== 0 && mode === 'encap'}
                value={payloadText}
                onChange={(e) => setPayloadText(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 font-mono text-xs text-emerald-400 focus:outline-none focus:border-indigo-500/80"
              />
              {stepIndex !== 0 && mode === 'encap' && (
                <span className="text-[9px] text-slate-500 italic block">ล็อคข้อความชั่วคราวระหว่างเริ่ม Encapsulate</span>
              )}
            </div>

            {/* Mode selection button */}
            <div className="space-y-1.5 pt-2">
              <span className="text-[10px] text-slate-400 font-bold block">เลือกสัญญะจราจรเครือข่าย:</span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleModeChange('encap')}
                  className={`w-full py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                    mode === 'encap' ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-900 border border-slate-850 text-slate-450 hover:text-white'
                  }`}
                >
                  ห่อหุ้ม (ENCAPSULATE)
                </button>
                <button
                  onClick={() => handleModeChange('decap')}
                  className={`w-full py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                    mode === 'decap' ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-900 border border-slate-850 text-slate-450 hover:text-white'
                  }`}
                >
                  แกะถอด (DECAPSULATE)
                </button>
              </div>
            </div>
          </div>

          {/* Stepper buttons */}
          <div className="space-y-2 pt-4">
            <div className="flex gap-2">
              <button
                onClick={handlePrev}
                disabled={(mode === 'encap' && stepIndex === 0) || (mode === 'decap' && stepIndex === maxSteps - 1)}
                className="w-1/2 py-2 bg-slate-900 border border-slate-800 hover:text-white text-slate-400 rounded-lg cursor-pointer font-bold text-xs disabled:opacity-40 disabled:cursor-not-allowed"
              >
                ย้อนกลับสเตป
              </button>
              <button
                onClick={handleNext}
                className="w-1/2 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg cursor-pointer font-bold text-xs active:scale-98 shadow-sm"
              >
                สเตปถัดไป ➔
              </button>
            </div>
            
            <button
              onClick={() => handleModeChange(mode)}
              className="w-full py-1.5 bg-slate-950 border border-slate-900 text-slate-500 hover:text-slate-350 text-[10px] rounded-lg font-mono"
            >
              RESET LAB
            </button>
          </div>
        </div>

        {/* Right Dashboard visualization of the package growing/shrinking */}
        <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 flex flex-col justify-between relative min-h-[400px] text-left font-mono text-xs text-slate-200 lg:col-span-2">
          <span className="text-[9px] font-mono text-slate-500 absolute top-3 left-3">LIVE PACKET PACKAGING VIEW</span>
          
          <div className="my-auto space-y-5 pt-4">
            
            {/* Visual presentation of step pipeline */}
            <div className="flex justify-between items-center bg-slate-900 p-2.5 rounded-xl border border-slate-850 text-[9px] text-slate-450">
              {ENCAP_STEPS.map((s, idx) => {
                const isActive = stepIndex === idx;
                const isPassed = mode === 'encap' ? idx <= stepIndex : idx >= stepIndex;

                return (
                  <div key={idx} className="flex items-center gap-1">
                    <span className={`w-4 h-4 rounded-full flex items-center justify-center font-bold text-[8.5px] ${
                      isActive
                        ? 'bg-indigo-500 text-white'
                        : isPassed
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-slate-950 border border-slate-800 text-slate-600'
                    }`}>
                      {idx + 1}
                    </span>
                    <span className={`font-sans hidden sm:inline ${isActive ? 'text-white font-bold' : ''}`}>{s.pdu}</span>
                  </div>
                );
              })}
            </div>

            {/* Visual envelope diagram representation */}
            <div className="w-full py-4 flex flex-col justify-center items-center bg-[#090d16] rounded-xl border border-slate-900 min-h-[140px] px-4 space-y-2.5 relative">
              
              {/* Bits level has special binary scrolling representation */}
              {currentStep.pdu === 'Bits' ? (
                <div className="w-full text-center text-rose-500 font-mono text-[11px] select-all bg-rose-500/5 p-3 rounded-lg border border-rose-500/25 tracking-widest break-all">
                  {currentStep.preview(payloadText)}
                </div>
              ) : (
                <div className="w-full max-w-md text-[11px] font-mono leading-none border border-slate-700/60 rounded-xl overflow-hidden shadow-2xl relative">
                  
                  {/* Frame envelope */}
                  {stepIndex >= 3 && (
                    <div className="bg-orange-950/40 text-orange-400 border-b border-orange-500/20 p-2 text-center text-[9.5px]">
                      [Ethernet Frame Header] [MAC Address Target: 00:11:22:33:44:55]
                    </div>
                  )}

                  {/* Packet envelope */}
                  {stepIndex >= 2 && (
                    <div className="bg-yellow-950/40 text-yellow-400 border-b border-yellow-500/20 p-2 text-center text-[9.5px]">
                      [IP Packet Header] [Source IP: 192.168.1.150 ➔ Dest IP: 8.8.8.8]
                    </div>
                  )}

                  {/* Segment envelope */}
                  {stepIndex >= 1 && (
                    <div className="bg-emerald-950/40 text-emerald-400 border-b border-emerald-500/20 p-2 text-center text-[9.5px]">
                      [TCP Segment Header] [Target Port: 443 HTTPS | Seq No: 808]
                    </div>
                  )}

                  {/* Original data inside */}
                  <div className="bg-indigo-950/40 text-indigo-300 p-4 text-center font-bold font-sans text-xs border border-indigo-500/30 rounded-b-xl">
                    Payload: "{payloadText}"
                  </div>

                  {/* Frame tail */}
                  {stepIndex >= 3 && (
                    <div className="bg-orange-950/40 text-orange-400 border-t border-orange-500/20 p-2 text-center text-[9.5px]">
                      [Frame Trailer: 32-bit FCS error verification code 0xAE8D9F]
                    </div>
                  )}

                </div>
              )}

              <span className="text-[8px] text-slate-500 absolute bottom-1 right-2">Visual packaging schema</span>
            </div>

            {/* Step metadata */}
            <div className="grid grid-cols-2 gap-4 bg-slate-900 p-3 rounded-xl border border-slate-850 font-sans text-[10.5px]">
              <div>
                <span className="text-slate-500 block">สัญญะหน่วย PDU:</span>
                <span className="font-bold text-white block mt-0.5 font-mono">{currentStep.pdu}</span>
              </div>
              <div>
                <span className="text-slate-500 block">ข้อมูลเติมแต่งหัว (Header Info):</span>
                <span className="font-bold text-indigo-300 block mt-0.5 font-mono text-[9.5px] leading-tight truncate">{currentStep.headerInfo}</span>
              </div>
            </div>

          </div>

          {/* Interactive instruction feedback box */}
          <div className="p-3 bg-slate-950 border border-slate-850 rounded-xl leading-normal text-slate-400 text-[10.5px] font-sans flex gap-2 items-start mt-4">
            <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
            <div className="space-y-1 font-sans">
              <p className="font-bold text-white">{feedback}</p>
              <p className="text-[10px] text-slate-500 font-sans">{currentStep.desc}</p>
            </div>
          </div>

        </div>

      </div>
    </SimulatorShell>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   4. PROTOCOL PORT ROUTER BOARD (Subtopic 5)
   ═══════════════════════════════════════════════════════════════════ */
const PROTOCOL_PACKETS = [
  {
    desc: 'การขอเปิดเว็บเพจธรรมดา (HTTP Request)',
    port: 80,
    protocol: 'HTTP',
    source: '192.168.12.50',
    details: 'ต้องการดึงข้อมูลรูปภาพและเท็มเพลต html หน้าเว็บหลัก',
    correctAction: 'redirect', // Should redirect to secure HTTPS 443
    feedbackCorrect: 'เยี่ยมยอด! HTTP เปล่าไม่ปลอดภัย ระบบได้ทำการย้ายขั้ว (Redirect) ส่งต่อไปยังช่องพอร์ต 443 HTTPS สำเร็จ!',
    feedbackWrong: 'ผิดพลาด! การอนุญาต HTTP (พอร์ต 80) โดยตรงอาจเสี่ยงถูก sniffing ดักจับความปลอดภัย ควรทำ Redirect ไปยัง HTTPS'
  },
  {
    desc: 'คำขอรีโมทคอนโทรลระบบ (Telnet Terminal)',
    port: 23,
    protocol: 'Telnet',
    source: '10.0.0.12',
    details: 'พยายามล็อกอินเข้าระบบด้วย Command Line เพื่อคอนฟิกเราเตอร์',
    correctAction: 'block', // Plaintext security risk
    feedbackCorrect: 'ถูกต้อง! การใช้ Telnet (พอร์ต 23) ส่งข้อความแบบ Cleartext เป็นช่องโหว่ร้ายแรง ช่างไอทีต้องบล็อกและบังคับผู้ใช้ไปใช้ SSH พอร์ต 22 แทน',
    feedbackWrong: 'อันตราย! การปล่อยให้เข้าใช้ Telnet พอร์ต 23 ทำให้แฮกเกอร์ในเครือข่าย Sniff ตรวจส่องรหัสผ่านและคีย์ควบคุมแอดมินได้ง่ายมาก!'
  },
  {
    desc: 'ดึงข้อมูลชื่อไอพีเครื่องข้ามโดเมน (DNS Query)',
    port: 53,
    protocol: 'DNS',
    source: '192.168.1.120',
    details: 'ต้องการแปลงชื่อ URL "google.com" ส่งออกไปหา Domain Name Server',
    correctAction: 'dns',
    feedbackCorrect: 'ถูกต้อง! คำขอถูกนำทางส่งต่อไปยังหน่วยเซิร์ฟเวอร์แปลชื่อระบบ DNS (Port 53) สำเร็จ!',
    feedbackWrong: 'ไม่สอดคล้อง! นี่คือคำขอแปลงชื่อโดเมนเป็นไอพีแอดเดรส ต้องส่งต่อไปยังเซิร์ฟเวอร์ DNS เท่านั้น'
  },
  {
    desc: 'ขอล็อกอินเข้าระบบควบคุมปลอดภัย (SSH Terminal)',
    port: 22,
    protocol: 'SSH',
    source: '192.168.1.5',
    details: 'แอดมินต้องการต่อเข้ารีโมทเซิร์ฟเวอร์ความปลอดภัยสูงผ่านช่องทางเข้ารหัส',
    correctAction: 'ssh',
    feedbackCorrect: 'ถูกต้อง! SSH (พอร์ต 22) มีการตั้งค่าช่องทางเข้ารหัสลับอย่างสมบูรณ์แบบ อนุญาตส่งต่อแอดมินบำรุงรักษาระบบได้ปลอดภัยสูง!',
    feedbackWrong: 'ผิดพิกัด! นี่คือระบบรีโมทควบคุมที่ปลอดภัย (SSH) ต้องนำทางส่งต่อไปยังเซิร์ฟเวอร์ SSH พอร์ต 22'
  },
  {
    desc: 'สแกนอุปกรณ์เพื่อขอรับหมายเลข IP (DHCP Request)',
    port: 67,
    protocol: 'DHCP',
    source: '00:1E:8F:A2:3B:11',
    details: 'เครื่องคอมพิวเตอร์พนักงานเสียบสายไฟ UTP และยิงสแกนเพื่อรับไอพีแอดเดรสอัตโนมัติ',
    correctAction: 'dhcp',
    feedbackCorrect: 'ถูกต้อง! ส่งต่อข้อมูลไปยัง DHCP Server (พอร์ต 67/68) เพื่อแจกจ่ายไอพีแอนด์เกตเวย์ให้กับผู้ใช้เสร็จสิ้น',
    feedbackWrong: 'ผิดพิกัด! คำขอขอรับที่อยู่ไอพีอัตโนมัติ DHCP ต้องนำทางวิ่งเข้า DHCP Server เท่านั้น'
  },
  {
    desc: 'เชื่อมต่อขอเข้าหน้าเว็บเข้ารหัสลับ (HTTPS Request)',
    port: 443,
    protocol: 'HTTPS',
    source: '192.168.1.52',
    details: 'ต้องการเช็คหน้าเข้าสู่ระบบธนาคารเพื่อความมั่นคงสูงสุดด้วยการสลักคีย์บิต',
    correctAction: 'web',
    feedbackCorrect: 'ถูกต้อง! สัญญาณถูกส่งผ่านไปยัง Secure Web Server HTTPS (พอร์ต 443) ข้อมูลปลอดภัยบีบอัดเข้ารหัสครบถ้วน!',
    feedbackWrong: 'ผิดเป้าหมาย! การร้องขอ HTTPS เพื่อความมั่นคงสูง ต้องนำทางส่งเข้าหาเว็บเซิร์ฟเวอร์พอร์ต 443'
  }
];

function ProtocolPortRouter() {
  const [packetIndex, setPacketIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [logs, setLogs] = useState([]);
  const [feedback, setFeedback] = useState('เตรียมตัววิเคราะห์พอร์ตแพ็กเก็ต เลือกการกระทำที่สอดคล้องกับนโยบายระบบรักษาความปลอดภัย');
  const [isGameOver, setIsGameOver] = useState(false);

  const packet = PROTOCOL_PACKETS[packetIndex];

  const handleAction = (action) => {
    if (isGameOver) return;

    const isCorrect = packet.correctAction === action;
    let newScore = score;
    let logMessage = '';

    if (isCorrect) {
      newScore = score + 10;
      setScore(newScore);
      setFeedback(`🎉 ${packet.feedbackCorrect}`);
      logMessage = `✅ [SUCCESS] Packet ${packet.protocol} (Port ${packet.port}) from ${packet.source} ➔ Action: ${action.toUpperCase()} (+10 XP)`;
    } else {
      setFeedback(`❌ ${packet.feedbackWrong}`);
      logMessage = `⚠️ [SECURITY ALERT] Packet ${packet.protocol} (Port ${packet.port}) from ${packet.source} ➔ Misrouted/Unsafe Action!`;
    }

    setLogs(prev => [logMessage, ...prev]);

    // Move to next packet
    if (packetIndex < PROTOCOL_PACKETS.length - 1) {
      setTimeout(() => {
        setPacketIndex(prev => prev + 1);
      }, 3000);
    } else {
      setIsGameOver(true);
      setLogs(prev => [`🎉 [GAME COMPLETED] ได้รับคะแนนความมั่นคงเน็ตเวิร์กร่วม ${newScore} คะแนน!`, ...prev]);
    }
  };

  const resetGame = () => {
    setPacketIndex(0);
    setScore(0);
    setLogs([]);
    setIsGameOver(false);
    setFeedback('เตรียมตัววิเคราะห์พอร์ตแพ็กเก็ต เลือกการกระทำที่สอดคล้องกับนโยบายระบบรักษาความปลอดภัย');
  };

  return (
    <SimulatorShell
      icon={<ShieldAlert className="w-6 h-6 text-indigo-500" />}
      title="แผงจำลองการตั้งกฎตัวกรองและนำทางหมายเลขพอร์ตเราเตอร์ (Protocol Port Router)"
      accentBg="bg-indigo-50"
      iconColor="text-indigo-600"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch select-none text-left font-sans">
        
        {/* Left Column incoming packet display */}
        <div className="bg-[#0f172a] rounded-2xl p-5 border border-slate-800 flex flex-col justify-between shadow-2xl relative min-h-[380px] text-xs text-slate-200 lg:col-span-1">
          <span className="text-[9px] font-mono text-slate-500 absolute top-3 right-4 font-bold">INCOMING TRAFFIC QUEUE</span>
          
          <div className="space-y-4">
            <div>
              <h6 className="text-[13px] font-bold text-white flex items-center gap-1.5"><Activity className="w-4 h-4 text-rose-500 animate-pulse" /> Network Analyzer</h6>
              <p className="text-[10px] text-slate-400 leading-normal">
                แพ็กเก็ตข้อมูลสแกนขาเข้าตรวจพบในสายทองแดง:
              </p>
            </div>

            {/* Packet Visual Card representation */}
            {!isGameOver ? (
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-3 relative overflow-hidden">
                <span className="absolute top-2 right-2 px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 font-mono text-[9px] border border-rose-500/30 animate-pulse">
                  PORT {packet.port}
                </span>

                <div className="space-y-1">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">ผู้ส่ง (Source):</span>
                  <span className="font-mono text-xs text-slate-300 block">{packet.source}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">โปรโตคอลตรวจพบ:</span>
                  <span className="font-bold text-white block text-sm font-sans">{packet.protocol} ({packet.desc})</span>
                </div>
                <div className="space-y-1 border-t border-slate-800/80 pt-2">
                  <span className="text-[10px] text-slate-500 block uppercase font-bold">วัตถุประสงค์ (Payload details):</span>
                  <p className="text-[10.5px] text-slate-400 leading-relaxed font-sans">{packet.details}</p>
                </div>
              </div>
            ) : (
              <div className="bg-emerald-950/20 border border-emerald-500/20 p-4 rounded-xl text-center space-y-2">
                <CheckSquare className="w-10 h-10 text-emerald-500 mx-auto" />
                <h6 className="font-bold text-white text-xs">วิเคราะห์แพ็กเก็ตครบถ้วน!</h6>
                <p className="text-[10px] text-slate-400 font-sans">แผงวงจรความมั่นคงปลอดภัยทำงานเรียบร้อยแล้ว</p>
              </div>
            )}
          </div>

          {/* Action routing buttons */}
          <div className="space-y-2 pt-4">
            <span className="text-[10px] text-slate-400 font-bold block">เลือกคำตัดสินใจนำทางระบบความปลอดภัย:</span>
            <div className="grid grid-cols-2 gap-2">
              <button
                disabled={isGameOver}
                onClick={() => handleAction('web')}
                className="py-2 bg-indigo-650 hover:bg-indigo-700 text-white rounded-lg cursor-pointer font-bold text-[10.5px] transition-all disabled:opacity-40"
              >
                ➔ Web Server (443)
              </button>
              <button
                disabled={isGameOver}
                onClick={() => handleAction('dns')}
                className="py-2 bg-yellow-600 hover:bg-yellow-750 text-white rounded-lg cursor-pointer font-bold text-[10.5px] transition-all disabled:opacity-40"
              >
                ➔ DNS Server (53)
              </button>
              <button
                disabled={isGameOver}
                onClick={() => handleAction('ssh')}
                className="py-2 bg-emerald-650 hover:bg-emerald-700 text-white rounded-lg cursor-pointer font-bold text-[10.5px] transition-all disabled:opacity-40"
              >
                ➔ SSH Server (22)
              </button>
              <button
                disabled={isGameOver}
                onClick={() => handleAction('dhcp')}
                className="py-2 bg-teal-650 hover:bg-teal-700 text-white rounded-lg cursor-pointer font-bold text-[10.5px] transition-all disabled:opacity-40"
              >
                ➔ DHCP Server (67)
              </button>
              <button
                disabled={isGameOver}
                onClick={() => handleAction('redirect')}
                className="py-2 bg-cyan-600 hover:bg-cyan-750 text-white rounded-lg cursor-pointer font-bold text-[10.5px] transition-all disabled:opacity-40 col-span-2"
              >
                ⚡ HTTP Redirect to HTTPS
              </button>
              <button
                disabled={isGameOver}
                onClick={() => handleAction('block')}
                className="py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg cursor-pointer font-bold text-[10.5px] transition-all disabled:opacity-40 col-span-2"
              >
                🚫 BLOCK & DROP PACKET
              </button>
            </div>
            
            {isGameOver && (
              <button
                onClick={resetGame}
                className="w-full py-1.5 bg-slate-900 border border-slate-800 text-white font-bold text-[10.5px] rounded-lg mt-2 cursor-pointer"
              >
                RESET FIREWALL GAME
              </button>
            )}
          </div>
        </div>

        {/* Right Live Port Monitor Console and Score */}
        <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 flex flex-col justify-between relative min-h-[380px] font-sans text-xs text-slate-200 lg:col-span-2">
          <span className="text-[9px] font-mono text-slate-500 absolute top-3 left-3">LIVE SECURITY CONSOLE AND SCOREBOARD</span>
          
          <div className="my-auto space-y-6 pt-4">
            
            {/* Score and diagnostics progress */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-900 border border-slate-850 p-3.5 rounded-xl text-center">
                <span className="text-[10px] text-slate-500 block uppercase font-bold font-sans">คะแนนความปลอดภัยเน็ตเวิร์ก (Security XP)</span>
                <span className="text-3xl font-bold font-mono text-emerald-400 block mt-1">{score} XP</span>
              </div>
              <div className="bg-slate-900 border border-slate-850 p-3.5 rounded-xl text-center">
                <span className="text-[10px] text-slate-500 block uppercase font-bold font-sans">คิววิเคราะห์แพ็กเก็ต</span>
                <span className="text-3xl font-bold font-mono text-indigo-400 block mt-1">{packetIndex + 1} / {PROTOCOL_PACKETS.length}</span>
              </div>
            </div>

            {/* Firewalls rules details / Diagnostic console logs */}
            <div className="space-y-1.5">
              <span className="text-[10.5px] font-bold text-slate-450 uppercase font-sans tracking-wide block">
                บันทึกการกระทำเราเตอร์ระบบรักษาความปลอดภัย (Live Router Security Logs):
              </span>
              <ConsoleScreen height="h-[140px]">
                <div className="space-y-1 text-emerald-400 font-mono text-[11.5px] leading-relaxed">
                  {logs.length === 0 ? (
                    <span className="text-slate-500 italic">... รอกลั่นกรองและนำทางแพ็กเก็ตข้อมูล เพื่อแสดงบันทึกจราจรเครือข่าย ...</span>
                  ) : (
                    logs.map((log, idx) => (
                      <div key={idx} className="transition-all duration-300">
                        {log}
                      </div>
                    ))
                  )}
                </div>
              </ConsoleScreen>
            </div>

          </div>

          {/* Interactive instruction feedback box */}
          <div className="p-3 bg-slate-950 border border-slate-850 rounded-xl leading-normal text-slate-450 text-[10.5px] font-sans flex gap-2 items-start mt-4">
            <Info className="w-4.5 h-4.5 text-indigo-400 shrink-0 mt-0.5 animate-pulse" />
            <div className="space-y-0.5 font-sans">
              <p className="font-bold text-slate-350 font-sans">คำแนะนำด้านจรรยาช่างไอที:</p>
              <p className="text-[10px] text-slate-500 font-sans leading-relaxed">{feedback}</p>
            </div>
          </div>

        </div>

      </div>
    </SimulatorShell>
  );
}
