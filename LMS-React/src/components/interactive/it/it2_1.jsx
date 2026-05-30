import React, { useState } from 'react';
import {
  Cpu, CircuitBoard, MemoryStick, HardDrive, Zap, Monitor,
  Box, Activity, ChevronRight, CheckCircle, Info, AlertTriangle,
  Thermometer, Wind, Database, Layers, Settings, BarChart3,
  ArrowRight, Star, Shield, Gauge
} from 'lucide-react';
import {
  AmbientBackdrop,
  ConceptCard,
  SectionBlock,
  QuizEngine
} from '../shared';
import TeacherTask from '../../ui/TeacherTask';

// ──────────────────────────────────────────────────────────────────────────────
// DATA DEFINITIONS
// ──────────────────────────────────────────────────────────────────────────────

const cpuArchData = [
  {
    term: 'Cores (แกนประมวลผล)',
    desc: 'หน่วยประมวลผลอิสระภายใน CPU แต่ละแกนสามารถรันโปรแกรมแยกกันได้พร้อมกัน CPU ยุคใหม่มี 4–24+ Cores',
    example: 'Intel Core i9-14900K มี 24 Cores (8P + 16E), AMD Ryzen 9 7950X มี 16 Cores',
    color: 'indigo'
  },
  {
    term: 'Threads (เส้นด้ายประมวลผล)',
    desc: 'กระบวนการเสมือน (Virtual Execution Path) ที่ซ้อนทับ Core ด้วยเทคโนโลยี HyperThreading (Intel) หรือ SMT (AMD)',
    example: 'CPU 8 Cores + HyperThreading = 16 Threads ช่วยเพิ่มประสิทธิภาพ Multitask สูงสุด',
    color: 'violet'
  },
  {
    term: 'Cache Memory (หน่วยความจำแคช)',
    desc: 'หน่วยความจำความเร็วสูงอยู่ใกล้แกนประมวลผล แบ่งเป็น L1 (เร็วสุด/น้อย), L2 (กลาง), L3 (ช้า/มาก)',
    example: 'L1: 32–64 KB/Core (< 1 ns), L2: 256 KB–4 MB/Core, L3: 8–128 MB (shared)',
    color: 'cyan'
  },
  {
    term: 'Socket (ซ็อกเก็ต)',
    desc: 'ขั้วต่อทางกายภาพบนเมนบอร์ดที่รองรับ CPU เฉพาะรุ่น ต่างแบรนด์และรุ่นจะใช้ Socket ต่างกัน',
    example: 'Intel LGA1700 (Gen 12/13/14), AMD AM5 (Ryzen 7000+), LGA4677 (Xeon Scalable)',
    color: 'amber'
  },
  {
    term: 'TDP (Thermal Design Power)',
    desc: 'ค่าความร้อนสูงสุดที่ระบบระบายความร้อนต้องรองรับ ไม่ใช่ค่าการใช้ไฟจริง',
    example: 'Intel Core i5-13600K TDP = 125W (สูงสุด 253W), Ryzen 5 7600X TDP = 105W',
    color: 'rose'
  },
  {
    term: 'Clock Speed (ความเร็วสัญญาณนาฬิกา)',
    desc: 'จำนวนรอบการประมวลผลต่อวินาที วัดเป็น GHz ยิ่งสูงยิ่งเร็ว แต่ขึ้นกับ IPC และสถาปัตยกรรมด้วย',
    example: 'Intel i9-14900KS Base 3.2GHz / Boost 6.0GHz, AMD Ryzen 9 7950X3D Boost 5.7GHz',
    color: 'emerald'
  }
];

const mbFormFactors = [
  { name: 'E-ATX', size: '305×330 mm', slots: '8 RAM, 4 PCIe x16', use: 'Workstation / Enthusiast', color: 'purple' },
  { name: 'ATX', size: '305×244 mm', slots: '4–8 RAM, 2–3 PCIe x16', use: 'Desktop ทั่วไป / Gaming', color: 'indigo' },
  { name: 'Micro-ATX', size: '244×244 mm', slots: '4 RAM, 1–2 PCIe x16', use: 'Mini Tower / Budget Build', color: 'cyan' },
  { name: 'Mini-ITX', size: '170×170 mm', slots: '2 RAM, 1 PCIe x16', use: 'SFF / HTPC / Compact', color: 'emerald' },
];

const ramTypes = [
  { type: 'DDR4', speed: '2133–5333 MHz', voltage: '1.2V', channels: 'Dual-Channel', pins: '288-pin DIMM', typical: 'รุ่น 2017–2023, Intel Gen 12 หรือ AM4' },
  { type: 'DDR5', speed: '4800–8000+ MHz', voltage: '1.1V', channels: 'Dual-Channel (แต่ละโมดูลมี 2 Sub-channels)', pins: '288-pin DIMM (ต่างจาก DDR4)', typical: 'Intel Gen 13/14+, AMD AM5 (Ryzen 7000+)' },
  { type: 'LPDDR5X', speed: '8533 MHz', voltage: '0.9V', channels: 'On-die (ลงบนบอร์ด)', pins: 'ไม่มีสล็อต (Soldered)', typical: 'Laptop ระดับบาง, Apple M-series, Snapdragon' },
];

const storageComparison = [
  {
    type: 'HDD (Hard Disk Drive)',
    tech: 'จานแม่เหล็กหมุน 5400–7200 RPM',
    read: '80–180 MB/s',
    write: '70–160 MB/s',
    latency: '5–10 ms',
    interface: 'SATA III (6 Gbps)',
    pros: 'ราคาถูก ความจุสูง (ถึง 20 TB+)',
    cons: 'ช้า, เสียงดัง, แตกหักง่าย',
    color: 'slate',
    icon: '💿'
  },
  {
    type: 'SSD SATA',
    tech: 'NAND Flash (TLC/QLC) ผ่านสาย SATA',
    read: '500–560 MB/s',
    write: '400–530 MB/s',
    latency: '0.1 ms',
    interface: 'SATA III (6 Gbps)',
    pros: 'เร็วกว่า HDD 5–10x, เงียบ, ทนทาน',
    cons: 'ราคาสูงกว่า HDD, ความจุน้อยกว่า',
    color: 'blue',
    icon: '💾'
  },
  {
    type: 'M.2 NVMe (PCIe 4.0)',
    tech: 'NAND Flash ผ่าน PCIe 4.0 x4',
    read: '3500–7000 MB/s',
    write: '2500–6500 MB/s',
    latency: '0.02 ms',
    interface: 'PCIe 4.0 x4 (M.2 2280)',
    pros: 'เร็วมาก ขนาดเล็ก ติดบนบอร์ดได้',
    cons: 'ราคาสูง ร้อนต้องใช้ Heatsink',
    color: 'violet',
    icon: '⚡'
  },
  {
    type: 'M.2 NVMe (PCIe 5.0)',
    tech: 'NAND Flash ผ่าน PCIe 5.0 x4',
    read: '10000–14800 MB/s',
    write: '9500–14000 MB/s',
    latency: '< 0.01 ms',
    interface: 'PCIe 5.0 x4 (M.2 2280)',
    pros: 'เร็วที่สุดในตลาด เหมาะ Video Production',
    cons: 'ราคาสูงมาก ร้อนจัด ต้องใช้ Heatsink ใหญ่',
    color: 'rose',
    icon: '🚀'
  }
];

const psuRatings = [
  { rating: '80 Plus White', eff: '≥ 80%', load: '20/50/100%', tier: 'Entry', color: 'slate' },
  { rating: '80 Plus Bronze', eff: '≥ 82/85/82%', load: '20/50/100%', tier: 'Budget', color: 'amber' },
  { rating: '80 Plus Silver', eff: '≥ 85/88/85%', load: '20/50/100%', tier: 'Mid', color: 'slate' },
  { rating: '80 Plus Gold', eff: '≥ 87/90/87%', load: '20/50/100%', tier: 'Popular', color: 'yellow' },
  { rating: '80 Plus Platinum', eff: '≥ 90/92/89%', load: '20/50/100%', tier: 'High-end', color: 'indigo' },
  { rating: '80 Plus Titanium', eff: '≥ 92/94/90%', load: '20/50/100%', tier: 'Premium', color: 'cyan' },
];

const gpuTiers = [
  { tier: 'Entry (งบน้อย)', cards: 'RTX 4060, RX 7600, Arc A750', vram: '8 GB GDDR6', perf: '1080p Gaming Medium-High', color: 'emerald' },
  { tier: 'Mid-range', cards: 'RTX 4070, RX 7700 XT, RTX 3080', vram: '12 GB GDDR6X', perf: '1440p Gaming High-Ultra', color: 'indigo' },
  { tier: 'High-end', cards: 'RTX 4080 Super, RX 7900 GRE', vram: '16 GB GDDR6X', perf: '4K Gaming / AI Workload', color: 'violet' },
  { tier: 'Enthusiast', cards: 'RTX 4090, RX 7900 XTX', vram: '24 GB GDDR6X', perf: '4K Ultra / 8K / Creative Pro', color: 'rose' },
];

const monitorPanels = [
  {
    type: 'TN (Twisted Nematic)',
    response: '1–5 ms',
    viewAngle: '160°/170°',
    colorDepth: '6-bit (FRC to 8-bit)',
    pros: 'Response เร็วที่สุด ราคาถูก',
    cons: 'สีไม่สวย มุมมองแคบ',
    bestFor: 'FPS Gaming แข่งขัน',
    color: 'amber'
  },
  {
    type: 'IPS (In-Plane Switching)',
    response: '4–8 ms (Fast IPS 1 ms)',
    viewAngle: '178°/178°',
    colorDepth: '8-bit (10-bit HDR)',
    pros: 'สีสวยสดใส มุมมองกว้าง',
    cons: 'ราคาสูงกว่า TN, IPS Glow',
    bestFor: 'Creative Work, Design, Photo',
    color: 'indigo'
  },
  {
    type: 'VA (Vertical Alignment)',
    response: '4–12 ms',
    viewAngle: '178°/178°',
    colorDepth: '8-bit (10-bit HDR)',
    pros: 'Contrast ratio สูงสุด, สีดำลึก',
    cons: 'Motion blur, smearing ในฉากเร็ว',
    bestFor: 'ชมภาพยนตร์ HDR, Console Gaming',
    color: 'emerald'
  },
  {
    type: 'OLED',
    response: '< 0.1 ms',
    viewAngle: '180°/180°',
    colorDepth: '10-bit (True HDR)',
    pros: 'Perfect Black, สีสมจริงที่สุด, response เร็วสุด',
    cons: 'ราคาแพงมาก, Burn-in risk',
    bestFor: 'Premium Gaming, Professional Studio',
    color: 'violet'
  }
];

const videoConnectors = [
  { name: 'VGA (D-Sub)', signal: 'Analog', maxRes: '1920×1200', maxHz: '75 Hz', note: 'เก่ามาก หลีกเลี่ยงใช้', color: 'slate' },
  { name: 'DVI-D', signal: 'Digital', maxRes: '2560×1600', maxHz: '144 Hz', note: 'ไม่รองรับเสียง', color: 'amber' },
  { name: 'HDMI 2.0', signal: 'Digital', maxRes: '4K@60Hz', maxHz: '144 Hz (1080p)', note: 'รองรับเสียง, ใช้งานทั่วไป', color: 'cyan' },
  { name: 'HDMI 2.1', signal: 'Digital', maxRes: '10K', maxHz: '4K@144Hz / 8K@60Hz', note: 'Gaming TV, Console next-gen', color: 'indigo' },
  { name: 'DisplayPort 1.4', signal: 'Digital', maxRes: '8K@60Hz', maxHz: '4K@144Hz', note: 'มาตรฐาน Gaming Monitor', color: 'violet' },
  { name: 'DisplayPort 2.1', signal: 'Digital', maxRes: '16K', maxHz: '4K@165Hz HDR', note: 'ล่าสุด รองรับ 16K', color: 'rose' },
];

// ──────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ──────────────────────────────────────────────────────────────────────────────

export default function IT2_1() {
  const [selectedCpuArch, setSelectedCpuArch] = useState(0);
  const [selectedStorage, setSelectedStorage] = useState(0);
  const [selectedPanel, setSelectedPanel] = useState(0);
  const [selectedConnector, setSelectedConnector] = useState(0);

  // PSU Calculator
  const [cpuTdp, setCpuTdp] = useState(125);
  const [gpuTdp, setGpuTdp] = useState(320);
  const [ramCount, setRamCount] = useState(2);
  const [driveCount, setDriveCount] = useState(2);
  const [extraW, setExtraW] = useState(30);
  const totalLoad = cpuTdp + gpuTdp + (ramCount * 5) + (driveCount * 7) + extraW;
  const recommendedPsu = Math.ceil((totalLoad * 1.25) / 50) * 50;

  // CPU Architecture visual state
  const activeCpu = cpuArchData[selectedCpuArch];

  return (
    <>
      {/* Layer 1: Ambient Backdrop */}
      <AmbientBackdrop />

      {/* Layer 3: Main Content */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-6 pb-12 space-y-16 md:space-y-20 relative z-10">

        {/* ================================================================
            SECTION 1: หน่วยประมวลผลกลาง (CPU)
            ================================================================ */}
        <section id="section-cpu" className="space-y-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-1.5 h-7 bg-indigo-600 rounded-full" />
              <h2 className="text-[26px] font-bold text-zinc-900 font-sans tracking-tight">
                หน่วยประมวลผลกลาง (Central Processing Unit — CPU)
              </h2>
            </div>
            <p className="text-[16px] text-zinc-600 leading-relaxed max-w-4xl">
              CPU คือสมองหลักของคอมพิวเตอร์ ทำหน้าที่ดำเนินการคำสั่งโปรแกรมทุกอย่างด้วยวงจรดิจิทัลที่ซับซ้อน 
              ประกอบด้วยพันล้านทรานซิสเตอร์บนซิลิกอน ผลิตด้วยกระบวนการ Lithography ระดับนาโนเมตร (3–5 nm) 
              สองแบรนด์หลักในตลาด Desktop คือ <strong>Intel</strong> และ <strong>AMD</strong>
            </p>
          </div>

          {/* CPU Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-indigo-200/50">
            <img
              src="/images/it/cpu_architecture.png"
              alt="สถาปัตยกรรม CPU แสดง Cores, Cache และ Memory Controller"
              className="w-full object-cover max-h-80"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/80 to-transparent px-6 py-4">
              <p className="text-white text-[13px] font-semibold">แผนผังสถาปัตยกรรม CPU — แสดง Cores, Cache L1/L2/L3, Memory Controller และ PCIe Lanes</p>
            </div>
          </div>

          {/* CPU Architecture Explorer */}
          <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-2xl p-6 md:p-8 shadow-xl">
            <p className="text-[13px] font-bold text-slate-500 uppercase tracking-wider mb-5">สถาปัตยกรรม CPU — คลิกเพื่อเรียนรู้</p>
            
            {/* Selector Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              {cpuArchData.map((item, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedCpuArch(i)}
                  className={`px-4 py-2 rounded-xl text-[13px] font-bold border-2 transition-all duration-200 active:scale-[0.97] ${
                    selectedCpuArch === i
                      ? `border-${item.color}-400 bg-${item.color}-50 text-${item.color}-700`
                      : 'border-slate-200 text-slate-600 hover:border-slate-300 bg-white/50'
                  }`}
                >
                  {item.term.split(' (')[0]}
                </button>
              ))}
            </div>

            {/* Detail Panel */}
            <div className={`rounded-2xl p-6 border-2 transition-all duration-300 ${
              activeCpu.color === 'indigo' ? 'bg-indigo-50 border-indigo-200' :
              activeCpu.color === 'violet' ? 'bg-violet-50 border-violet-200' :
              activeCpu.color === 'cyan' ? 'bg-cyan-50 border-cyan-200' :
              activeCpu.color === 'amber' ? 'bg-amber-50 border-amber-200' :
              activeCpu.color === 'rose' ? 'bg-rose-50 border-rose-200' :
              'bg-emerald-50 border-emerald-200'
            }`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className={`text-[18px] font-black ${
                    activeCpu.color === 'indigo' ? 'text-indigo-800' :
                    activeCpu.color === 'violet' ? 'text-violet-800' :
                    activeCpu.color === 'cyan' ? 'text-cyan-800' :
                    activeCpu.color === 'amber' ? 'text-amber-800' :
                    activeCpu.color === 'rose' ? 'text-rose-800' :
                    'text-emerald-800'
                  }`}>{activeCpu.term}</h3>
                  <p className="text-[15px] text-slate-700 leading-relaxed">{activeCpu.desc}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-[12px] font-bold text-slate-500 uppercase tracking-wider">ตัวอย่างจริง</p>
                  <div className="bg-white/80 rounded-xl p-4 border border-white">
                    <p className="text-[14px] text-slate-700 font-medium leading-relaxed">{activeCpu.example}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CPU Socket Comparison */}
            <div className="mt-6 border-t border-slate-100 pt-6">
              <p className="text-[13px] font-bold text-slate-500 uppercase tracking-wider mb-4">เปรียบเทียบ Socket มาตรฐาน (2024)</p>
              <div className="overflow-x-auto">
                <table className="w-full text-[13px] text-left">
                  <thead>
                    <tr className="bg-gradient-to-r from-indigo-600 to-violet-700 text-white">
                      <th className="px-4 py-3 font-bold rounded-tl-xl">Socket</th>
                      <th className="px-4 py-3 font-bold">แบรนด์ / Platform</th>
                      <th className="px-4 py-3 font-bold">CPU รองรับ</th>
                      <th className="px-4 py-3 font-bold">RAM รองรับ</th>
                      <th className="px-4 py-3 font-bold rounded-tr-xl">PCIe</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      { socket: 'LGA1700', brand: 'Intel', cpu: 'Core Gen 12/13/14 (Alder/Raptor)', ram: 'DDR4 / DDR5', pcie: 'PCIe 5.0 x16' },
                      { socket: 'LGA1851', brand: 'Intel', cpu: 'Core Ultra Gen 200 (Arrow Lake)', ram: 'DDR5 only', pcie: 'PCIe 5.0 x16' },
                      { socket: 'AM4', brand: 'AMD', cpu: 'Ryzen 1000–5000 (Zen–Zen 3)', ram: 'DDR4 only', pcie: 'PCIe 4.0 x16' },
                      { socket: 'AM5', brand: 'AMD', cpu: 'Ryzen 7000–9000 (Zen 4/5)', ram: 'DDR5 only', pcie: 'PCIe 5.0 x16' },
                    ].map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                        <td className="px-4 py-3 font-black text-indigo-700">{row.socket}</td>
                        <td className="px-4 py-3 font-semibold text-slate-700">{row.brand}</td>
                        <td className="px-4 py-3 text-slate-600">{row.cpu}</td>
                        <td className="px-4 py-3 text-slate-600">{row.ram}</td>
                        <td className="px-4 py-3 text-emerald-700 font-semibold">{row.pcie}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================
            SECTION 2: แผงวงจรหลัก (Motherboard)
            ================================================================ */}
        <section id="section-motherboard" className="space-y-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-1.5 h-7 bg-violet-600 rounded-full" />
              <h2 className="text-[26px] font-bold text-zinc-900 font-sans tracking-tight">
                แผงวงจรหลัก (Motherboard)
              </h2>
            </div>
            <p className="text-[16px] text-zinc-600 leading-relaxed max-w-4xl">
              Motherboard คือแผงวงจรหลักที่เป็นโครงสร้างพื้นฐานเชื่อมโยงชิ้นส่วนทั้งหมดเข้าด้วยกัน 
              ประกอบด้วยซ็อกเก็ต CPU, สล็อต RAM, ช่องเสียบ PCIe, M.2 Slot, Chipset ควบคุม, พอร์ต I/O ด้านหลัง 
              และวงจรจ่ายไฟ VRM (Voltage Regulator Module) สำหรับส่งกระแสที่เสถียรให้ CPU
            </p>
          </div>

          {/* Motherboard Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-violet-200/50">
            <img
              src="/images/it/motherboard_layout.png"
              alt="แผนผัง Motherboard ATX แสดง CPU Socket, RAM Slots, PCIe, M.2"
              className="w-full object-cover max-h-80"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/80 to-transparent px-6 py-4">
              <p className="text-white text-[13px] font-semibold">แผนผัง Motherboard ATX — แสดง CPU Socket, DDR5 Slots, PCIe x16, M.2 NVMe, VRM Phases และพอร์ต I/O</p>
            </div>
          </div>

          {/* Form Factor Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {mbFormFactors.map((ff, i) => (
              <div key={i} className={`bg-white/70 backdrop-blur-xl border-2 rounded-2xl p-5 text-center space-y-2 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 ${
                ff.color === 'purple' ? 'border-purple-200' :
                ff.color === 'indigo' ? 'border-indigo-200' :
                ff.color === 'cyan' ? 'border-cyan-200' : 'border-emerald-200'
              }`}>
                {/* Visual size indicator */}
                <div className="flex justify-center">
                  <div className={`rounded-lg border-2 flex items-center justify-center text-[10px] font-black ${
                    i === 0 ? 'w-16 h-20 border-purple-400 bg-purple-50 text-purple-700' :
                    i === 1 ? 'w-14 h-16 border-indigo-400 bg-indigo-50 text-indigo-700' :
                    i === 2 ? 'w-11 h-11 border-cyan-400 bg-cyan-50 text-cyan-700' :
                    'w-8 h-8 border-emerald-400 bg-emerald-50 text-emerald-700'
                  }`}>
                    {ff.name.split(' ')[0]}
                  </div>
                </div>
                <h4 className="text-[14px] font-black text-slate-800">{ff.name}</h4>
                <p className="text-[12px] font-mono text-slate-500">{ff.size}</p>
                <p className="text-[12px] text-slate-600">{ff.slots}</p>
                <div className={`text-[11px] font-bold px-2 py-1 rounded-full ${
                  ff.color === 'purple' ? 'bg-purple-100 text-purple-700' :
                  ff.color === 'indigo' ? 'bg-indigo-100 text-indigo-700' :
                  ff.color === 'cyan' ? 'bg-cyan-100 text-cyan-700' :
                  'bg-emerald-100 text-emerald-700'
                }`}>{ff.use}</div>
              </div>
            ))}
          </div>

          {/* Chipset & PCIe Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-2xl p-6 shadow-lg space-y-4">
              <h3 className="text-[17px] font-bold text-slate-800">ชิปเซ็ต (Chipset) คืออะไร?</h3>
              <p className="text-[15px] text-slate-600 leading-relaxed">
                ชิปเซ็ตเปรียบเหมือน "ผู้จัดการจราจร" บนเมนบอร์ด ทำหน้าที่ควบคุมการสื่อสารระหว่าง CPU, RAM, PCIe, 
                Storage และพอร์ต I/O ต่างๆ ชิปเซ็ตสูงกว่าจะมีพอร์ต USB, SATA, M.2 มากกว่า
              </p>
              <div className="space-y-2">
                {[
                  { brand: 'Intel Z790', use: 'Overclocking + 4 M.2 + USB 4', level: 'Enthusiast' },
                  { brand: 'Intel B760', use: 'Mid-range, 2-3 M.2', level: 'Mainstream' },
                  { brand: 'AMD X670E', use: 'OC + PCIe 5.0 x16/M.2', level: 'Enthusiast' },
                  { brand: 'AMD B650', use: 'Mid-range AM5, PCIe 5.0 M.2', level: 'Mainstream' },
                ].map((c, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                    <span className="text-[13px] font-bold text-violet-700">{c.brand}</span>
                    <span className="text-[12px] text-slate-600 flex-1 mx-3">{c.use}</span>
                    <span className="text-[11px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{c.level}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-2xl p-6 shadow-lg space-y-4">
              <h3 className="text-[17px] font-bold text-slate-800">สล็อตขยาย PCIe (PCI Express)</h3>
              <p className="text-[15px] text-slate-600 leading-relaxed">
                PCIe (Peripheral Component Interconnect Express) คือบัสความเร็วสูงสำหรับเชื่อม GPU, NVMe SSD, 
                Capture Card, Sound Card และอุปกรณ์ขยายอื่นๆ ความเร็วขึ้นกับจำนวน Lanes (x1, x4, x8, x16)
              </p>
              <div className="space-y-2">
                {[
                  { gen: 'PCIe 3.0 x16', bw: '16 GB/s', use: 'GPU รุ่นเก่า, NVMe Gen 3' },
                  { gen: 'PCIe 4.0 x16', bw: '32 GB/s', use: 'GPU รุ่นใหม่ (RTX 3000/RX 6000)' },
                  { gen: 'PCIe 5.0 x16', bw: '64 GB/s', use: 'GPU ล่าสุด (RTX 4000/RX 7000)' },
                  { gen: 'PCIe 5.0 x4 (M.2)', bw: '16 GB/s', use: 'NVMe Gen 5 SSD (14 GB/s+)' },
                ].map((p, i) => (
                  <div key={i} className="flex items-center gap-3 py-2 border-b border-slate-100 last:border-0">
                    <span className="text-[12px] font-black text-indigo-700 w-36 shrink-0">{p.gen}</span>
                    <span className="text-[12px] font-mono font-bold text-emerald-600 w-16 shrink-0">{p.bw}</span>
                    <span className="text-[12px] text-slate-600">{p.use}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================
            SECTION 3: หน่วยความจำหลัก (RAM)
            ================================================================ */}
        <section id="section-ram" className="space-y-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-1.5 h-7 bg-cyan-600 rounded-full" />
              <h2 className="text-[26px] font-bold text-zinc-900 font-sans tracking-tight">
                หน่วยความจำหลัก (RAM — Random Access Memory)
              </h2>
            </div>
            <p className="text-[16px] text-zinc-600 leading-relaxed max-w-4xl">
              RAM คือหน่วยความจำชั่วคราว (Volatile Memory) ที่เก็บข้อมูลและโปรแกรมที่กำลังทำงาน 
              ความจุ RAM ส่งผลโดยตรงต่อการทำงานหลายโปรแกรมพร้อมกัน การแก้ไขวิดีโอ และประสิทธิภาพเกม 
              เมื่อปิดเครื่องข้อมูลใน RAM จะหายไปทั้งหมด
            </p>
          </div>

          {/* RAM Type Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {ramTypes.map((ram, i) => (
              <div key={i} className="bg-white/70 backdrop-blur-xl border border-cyan-200 rounded-2xl p-6 space-y-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-[20px] font-black text-cyan-700">{ram.type}</h3>
                  {i === 1 && <span className="text-[11px] font-bold bg-cyan-100 text-cyan-700 px-2 py-0.5 rounded-full">ล่าสุด</span>}
                  {i === 2 && <span className="text-[11px] font-bold bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full">Mobile</span>}
                </div>
                <div className="space-y-2">
                  {[
                    { label: 'ความเร็ว', value: ram.speed },
                    { label: 'แรงดันไฟ', value: ram.voltage },
                    { label: 'Channel', value: ram.channels },
                    { label: 'พิน', value: ram.pins },
                  ].map((r, j) => (
                    <div key={j} className="flex justify-between text-[13px] border-b border-slate-100 pb-1 last:border-0">
                      <span className="text-slate-500 font-medium">{r.label}</span>
                      <span className="font-bold text-slate-800">{r.value}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[12px] text-slate-500 leading-relaxed bg-slate-50 rounded-xl p-3">{ram.typical}</p>
              </div>
            ))}
          </div>

          {/* Dual Channel Diagram */}
          <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-2xl p-6 shadow-lg">
            <h3 className="text-[17px] font-bold text-slate-800 mb-4">ระบบ Dual-Channel — ทำไมต้องใส่ RAM 2 แท่ง?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="space-y-3">
                <p className="text-[15px] text-slate-600 leading-relaxed">
                  Dual-Channel คือโหมดที่ CPU เข้าถึง RAM ผ่าน 2 ช่องทางพร้อมกัน ทำให้ Bandwidth รวมเพิ่มขึ้น 2 เท่า 
                  (เช่น DDR4-3200 แบบ Single = 25.6 GB/s → Dual = 51.2 GB/s)
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-3 p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <p className="text-[13px] text-emerald-800">ใส่ RAM 2 แท่งในสล็อตที่ถูกต้อง (ตามสี/ตำแหน่งในคู่มือบอร์ด) เพื่อเปิด Dual-Channel</p>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-xl border border-amber-100">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <p className="text-[13px] text-amber-800">ใส่แท่งเดียว = Single-Channel ประสิทธิภาพลดลง 10–30% ใน GPU onboard</p>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-indigo-50 rounded-xl border border-indigo-100">
                    <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <p className="text-[13px] text-indigo-800">AMD Ryzen แนะนำใส่ Slot A2+B2 (ไม่ใช่ A1+B1) เพื่อสัญญาณที่เสถียรกว่า</p>
                  </div>
                </div>
              </div>
              {/* Dual Channel SVG Diagram */}
              <div className="flex justify-center">
                <svg viewBox="0 0 300 200" className="w-72 h-48">
                  {/* CPU */}
                  <rect x="110" y="80" width="80" height="40" rx="6" fill="#4F46E5" opacity="0.9"/>
                  <text x="150" y="97" textAnchor="middle" fontSize="9" fill="white" fontWeight="bold">CPU</text>
                  <text x="150" y="110" textAnchor="middle" fontSize="7" fill="#C7D2FE">Memory Controller</text>

                  {/* Single Channel path */}
                  <text x="150" y="16" textAnchor="middle" fontSize="9" fill="#64748b" fontWeight="bold">Dual-Channel Mode</text>

                  {/* Channel A */}
                  <rect x="20" y="10" width="70" height="30" rx="4" fill="#06B6D4" opacity="0.9"/>
                  <text x="55" y="22" textAnchor="middle" fontSize="8" fill="white" fontWeight="bold">RAM Slot A2</text>
                  <text x="55" y="33" textAnchor="middle" fontSize="7" fill="#CFFAFE">Channel A</text>

                  {/* Channel B */}
                  <rect x="210" y="10" width="70" height="30" rx="4" fill="#8B5CF6" opacity="0.9"/>
                  <text x="245" y="22" textAnchor="middle" fontSize="8" fill="white" fontWeight="bold">RAM Slot B2</text>
                  <text x="245" y="33" textAnchor="middle" fontSize="7" fill="#DDD6FE">Channel B</text>

                  {/* Connections */}
                  <line x1="55" y1="40" x2="55" y2="75" stroke="#06B6D4" strokeWidth="2.5"/>
                  <line x1="55" y1="75" x2="110" y2="95" stroke="#06B6D4" strokeWidth="2.5"/>
                  <line x1="245" y1="40" x2="245" y2="75" stroke="#8B5CF6" strokeWidth="2.5"/>
                  <line x1="245" y1="75" x2="190" y2="95" stroke="#8B5CF6" strokeWidth="2.5"/>

                  {/* Bandwidth label */}
                  <rect x="70" y="125" width="160" height="30" rx="6" fill="#F0FDF4" stroke="#10B981" strokeWidth="1.5"/>
                  <text x="150" y="137" textAnchor="middle" fontSize="8" fill="#065F46" fontWeight="bold">Total Bandwidth = 2×</text>
                  <text x="150" y="149" textAnchor="middle" fontSize="8" fill="#065F46">Channel A + Channel B</text>

                  {/* Arrows */}
                  <text x="44" y="62" fontSize="9" fill="#06B6D4">↓ 64-bit</text>
                  <text x="224" y="62" fontSize="9" fill="#8B5CF6">↓ 64-bit</text>
                  <text x="70" y="175" fontSize="7.5" fill="#64748b">= 128-bit total bus width</text>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================
            SECTION 4: อุปกรณ์จัดเก็บข้อมูล (Storage)
            ================================================================ */}
        <section id="section-storage" className="space-y-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-1.5 h-7 bg-amber-600 rounded-full" />
              <h2 className="text-[26px] font-bold text-zinc-900 font-sans tracking-tight">
                อุปกรณ์จัดเก็บข้อมูล (Storage Devices)
              </h2>
            </div>
            <p className="text-[16px] text-zinc-600 leading-relaxed max-w-4xl">
              Storage คือหน่วยความจำถาวร (Non-volatile Memory) ที่เก็บข้อมูลแม้จะปิดเครื่อง ความเร็วและประเภทของ Storage 
              ส่งผลอย่างมากต่อเวลาบูต OS การโหลดเกม และการย้าย/แก้ไขไฟล์ขนาดใหญ่
            </p>
          </div>

          {/* Storage Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-amber-200/50">
            <img
              src="/images/it/storage_comparison.png"
              alt="เปรียบเทียบ HDD, SSD SATA, NVMe Gen4, NVMe Gen5"
              className="w-full object-cover max-h-72"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/80 to-transparent px-6 py-4">
              <p className="text-white text-[13px] font-semibold">เปรียบเทียบความเร็ว: HDD (80MB/s) → SATA SSD (560MB/s) → NVMe Gen4 (7GB/s) → NVMe Gen5 (14GB/s)</p>
            </div>
          </div>

          {/* Storage Type Selector */}
          <div className="flex flex-wrap gap-3 mb-2">
            {storageComparison.map((s, i) => (
              <button
                key={i}
                onClick={() => setSelectedStorage(i)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 text-[13px] font-bold transition-all duration-200 active:scale-[0.97] ${
                  selectedStorage === i
                    ? 'border-amber-400 bg-amber-50 text-amber-800'
                    : 'border-slate-200 bg-white/50 text-slate-600 hover:border-slate-300'
                }`}
              >
                <span>{s.icon}</span>
                <span>{s.type.split(' (')[0]}</span>
              </button>
            ))}
          </div>

          {/* Selected Storage Detail */}
          {(() => {
            const s = storageComparison[selectedStorage];
            return (
              <div className="bg-white/70 backdrop-blur-xl border border-amber-200 rounded-2xl p-6 md:p-8 shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{s.icon}</span>
                      <div>
                        <h3 className="text-[18px] font-black text-slate-800">{s.type}</h3>
                        <p className="text-[13px] text-slate-500">{s.tech}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: 'Read Speed', value: s.read, color: 'emerald' },
                        { label: 'Write Speed', value: s.write, color: 'indigo' },
                        { label: 'Latency', value: s.latency, color: 'violet' },
                        { label: 'Interface', value: s.interface, color: 'amber' },
                      ].map((stat, j) => (
                        <div key={j} className={`p-3 rounded-xl border ${
                          stat.color === 'emerald' ? 'bg-emerald-50 border-emerald-100' :
                          stat.color === 'indigo' ? 'bg-indigo-50 border-indigo-100' :
                          stat.color === 'violet' ? 'bg-violet-50 border-violet-100' :
                          'bg-amber-50 border-amber-100'
                        }`}>
                          <p className={`text-[11px] font-bold uppercase tracking-wider mb-1 ${
                            stat.color === 'emerald' ? 'text-emerald-600' :
                            stat.color === 'indigo' ? 'text-indigo-600' :
                            stat.color === 'violet' ? 'text-violet-600' :
                            'text-amber-600'
                          }`}>{stat.label}</p>
                          <p className={`text-[14px] font-black ${
                            stat.color === 'emerald' ? 'text-emerald-800' :
                            stat.color === 'indigo' ? 'text-indigo-800' :
                            stat.color === 'violet' ? 'text-violet-800' :
                            'text-amber-800'
                          }`}>{stat.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
                      <p className="text-[12px] font-bold text-emerald-700 uppercase tracking-wider mb-1">จุดเด่น</p>
                      <p className="text-[14px] text-emerald-800 font-medium">{s.pros}</p>
                    </div>
                    <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl">
                      <p className="text-[12px] font-bold text-rose-700 uppercase tracking-wider mb-1">จุดอ่อน</p>
                      <p className="text-[14px] text-rose-800 font-medium">{s.cons}</p>
                    </div>

                    {/* Speed Bar Visualization */}
                    <div className="space-y-2">
                      <p className="text-[12px] font-bold text-slate-500 uppercase tracking-wider">ความเร็วเชิงเปรียบเทียบ</p>
                      {[
                        { label: 'HDD', pct: 3, color: 'bg-slate-400' },
                        { label: 'SSD SATA', pct: 10, color: 'bg-blue-400' },
                        { label: 'NVMe PCIe4', pct: 55, color: 'bg-violet-500' },
                        { label: 'NVMe PCIe5', pct: 100, color: 'bg-rose-500' },
                      ].map((bar, j) => (
                        <div key={j} className="flex items-center gap-3">
                          <span className="text-[11px] font-mono text-slate-500 w-20 shrink-0">{bar.label}</span>
                          <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${bar.color} ${selectedStorage === j ? 'ring-2 ring-offset-1 ring-amber-400' : ''}`}
                                 style={{ width: `${bar.pct}%` }} />
                          </div>
                          <span className="text-[11px] text-slate-400 w-6 shrink-0">{bar.pct === 100 ? '×' : (bar.pct < 10 ? `1/${Math.round(100/bar.pct)}` : `×${Math.round(bar.pct/3)}`)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </section>

        {/* ================================================================
            SECTION 5: แหล่งจ่ายไฟ (PSU) + เครื่องคำนวณ
            ================================================================ */}
        <section id="section-psu" className="space-y-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-1.5 h-7 bg-yellow-500 rounded-full" />
              <h2 className="text-[26px] font-bold text-zinc-900 font-sans tracking-tight">
                แหล่งจ่ายไฟ (Power Supply Unit — PSU)
              </h2>
            </div>
            <p className="text-[16px] text-zinc-600 leading-relaxed max-w-4xl">
              PSU แปลงกระแสสลับ AC (220V จากผนัง) เป็นกระแสตรง DC ระดับต่ำ (+3.3V, +5V, +12V) 
              เพื่อจ่ายให้ทุกชิ้นส่วนในระบบ ประสิทธิภาพ (Efficiency) ของ PSU วัดด้วยมาตรฐาน 80 Plus 
              ยิ่งสูงยิ่งประหยัดไฟและสร้างความร้อนน้อยลง
            </p>
          </div>

          {/* PSU Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-yellow-200/50">
            <img
              src="/images/it/psu_80plus.png"
              alt="แหล่งจ่ายไฟ PSU และมาตรฐาน 80 Plus"
              className="w-full object-cover max-h-72"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/80 to-transparent px-6 py-4">
              <p className="text-white text-[13px] font-semibold">มาตรฐาน 80 Plus — ยิ่งเกรดสูง ประสิทธิภาพยิ่งดี สูญเสียพลังงานเป็นความร้อนน้อยลง</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 80 Plus Table */}
            <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-2xl p-6 shadow-lg space-y-4">
              <h3 className="text-[16px] font-bold text-slate-800">มาตรฐาน 80 Plus Certification</h3>
              <div className="space-y-2">
                {psuRatings.map((r, i) => (
                  <div key={i} className={`flex items-center gap-3 p-2.5 rounded-xl border ${
                    r.color === 'slate' ? 'bg-slate-50 border-slate-200' :
                    r.color === 'amber' ? 'bg-amber-50 border-amber-200' :
                    r.color === 'yellow' ? 'bg-yellow-50 border-yellow-200' :
                    r.color === 'indigo' ? 'bg-indigo-50 border-indigo-200' :
                    'bg-cyan-50 border-cyan-200'
                  }`}>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-[10px] font-black ${
                      r.color === 'slate' ? 'bg-slate-200 text-slate-700' :
                      r.color === 'amber' ? 'bg-amber-200 text-amber-800' :
                      r.color === 'yellow' ? 'bg-yellow-200 text-yellow-800' :
                      r.color === 'indigo' ? 'bg-indigo-200 text-indigo-800' :
                      'bg-cyan-200 text-cyan-800'
                    }`}>{r.tier.split('-')[0]}</div>
                    <div className="flex-1">
                      <p className="text-[13px] font-bold text-slate-800">{r.rating}</p>
                      <p className="text-[11px] text-slate-500">ประสิทธิภาพ {r.eff}</p>
                    </div>
                    <span className="text-[11px] font-bold text-slate-500">{r.tier}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* PSU Calculator */}
            <div className="bg-white/60 backdrop-blur-xl border border-yellow-200 rounded-2xl p-6 shadow-lg space-y-5">
              <h3 className="text-[16px] font-bold text-slate-800">🔌 เครื่องคำนวณ PSU ที่เหมาะสม</h3>

              <div className="space-y-4">
                {[
                  { label: 'CPU TDP (W)', state: cpuTdp, setter: setCpuTdp, min: 35, max: 350, step: 5, hint: `เช่น i7-13700K = 125W, Ryzen 9 = 170W` },
                  { label: 'GPU TDP (W)', state: gpuTdp, setter: setGpuTdp, min: 0, max: 600, step: 10, hint: `เช่น RTX 4080 = 320W, RTX 4060 = 115W` },
                  { label: 'จำนวน RAM (แท่ง)', state: ramCount, setter: setRamCount, min: 1, max: 8, step: 1, hint: `≈ 5W/แท่ง` },
                  { label: 'จำนวน Storage (ชิ้น)', state: driveCount, setter: setDriveCount, min: 1, max: 8, step: 1, hint: `≈ 7W/ชิ้น` },
                  { label: 'อุปกรณ์เพิ่มเติม (W)', state: extraW, setter: setExtraW, min: 0, max: 100, step: 5, hint: `พัดลม, USB, Capture Card` },
                ].map((item, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <label className="text-[13px] font-bold text-slate-700">{item.label}</label>
                      <span className="text-[14px] font-black text-yellow-700">{item.state}{i < 3 ? (i < 2 ? 'W' : '') : (i === 2 ? '' : (i === 3 ? '' : 'W'))}</span>
                    </div>
                    <input
                      type="range" min={item.min} max={item.max} step={item.step}
                      value={item.state}
                      onChange={e => item.setter(Number(e.target.value))}
                      className="w-full accent-yellow-500"
                    />
                    <p className="text-[11px] text-slate-400">{item.hint}</p>
                  </div>
                ))}
              </div>

              {/* Result */}
              <div className="p-4 bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-300 rounded-2xl space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[14px] font-bold text-amber-800">ภาระไฟรวม</span>
                  <span className="text-[20px] font-black text-amber-700">{totalLoad} W</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[14px] font-bold text-amber-800">PSU ที่แนะนำ (×1.25 Safety)</span>
                  <span className="text-[24px] font-black text-yellow-600">{recommendedPsu} W</span>
                </div>
                <p className="text-[12px] text-amber-700">เผื่อ Headroom 25% สำหรับการ Overclocking และอายุการใช้งาน PSU ที่ยาวนาน</p>
              </div>
            </div>
          </div>

          {/* Modular PSU Types */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { type: 'Non-Modular', desc: 'สายไฟครบทุกชุดติดถาวร ราคาถูก แต่จัดสายยาก เหมาะกับงบน้อย', pro: 'ราคาถูก', con: 'จัดสายยาก', color: 'slate' },
              { type: 'Semi-Modular', desc: 'สายหลัก 24-pin และ 8-pin ติดถาวร สายเสริมถอดได้ สมดุลราคา-ความสะดวก', pro: 'สมดุล', con: 'ปานกลาง', color: 'amber' },
              { type: 'Full-Modular', desc: 'ถอดสายได้ทั้งหมด ต่อเฉพาะที่ใช้ จัดสายสวยที่สุด แต่ราคาสูงกว่า', pro: 'Cable Mgmt ดีที่สุด', con: 'ราคาสูง', color: 'indigo' },
            ].map((p, i) => (
              <div key={i} className={`bg-white/70 backdrop-blur-xl border-2 rounded-2xl p-5 space-y-3 ${
                p.color === 'slate' ? 'border-slate-200' :
                p.color === 'amber' ? 'border-amber-200' : 'border-indigo-200'
              }`}>
                <h4 className={`text-[15px] font-black ${
                  p.color === 'slate' ? 'text-slate-700' :
                  p.color === 'amber' ? 'text-amber-700' : 'text-indigo-700'
                }`}>{p.type}</h4>
                <p className="text-[13px] text-slate-600 leading-relaxed">{p.desc}</p>
                <div className="flex gap-2">
                  <span className="text-[11px] font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">✓ {p.pro}</span>
                  <span className="text-[11px] font-bold bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full">✗ {p.con}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================================================================
            SECTION 6: การ์ดแสดงผล (GPU)
            ================================================================ */}
        <section id="section-gpu" className="space-y-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-1.5 h-7 bg-violet-600 rounded-full" />
              <h2 className="text-[26px] font-bold text-zinc-900 font-sans tracking-tight">
                การ์ดแสดงผล (Graphics Processing Unit — GPU / VGA Card)
              </h2>
            </div>
            <p className="text-[16px] text-zinc-600 leading-relaxed max-w-4xl">
              GPU คือชิปประมวลผลกราฟิกเฉพาะทาง มี Shader Core หลายพันตัวสำหรับคำนวณแบบขนาน (Parallel Computing) 
              เหมาะสำหรับ 3D Rendering, AI/ML Training, Video Encoding, และ Scientific Simulation 
              แบ่งเป็น 2 ประเภท: <strong>Integrated GPU</strong> (อยู่ใน CPU) และ <strong>Dedicated GPU</strong> (การ์ดจอแยก)
            </p>
          </div>

          {/* GPU Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-violet-200/50">
            <img
              src="/images/it/gpu_tiers.png"
              alt="ระดับ GPU จาก Entry ถึง Enthusiast พร้อม VRAM"
              className="w-full object-cover max-h-72"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/80 to-transparent px-6 py-4">
              <p className="text-white text-[13px] font-semibold">ระดับการ์ดจอ: Entry (8GB) → Mid-range (12GB) → High-end (16GB) → Enthusiast (24GB VRAM)</p>
            </div>
          </div>

          {/* GPU Tier Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {gpuTiers.map((tier, i) => (
              <div key={i} className={`bg-white/70 backdrop-blur-xl border-2 rounded-2xl p-5 space-y-3 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 ${
                tier.color === 'emerald' ? 'border-emerald-200' :
                tier.color === 'indigo' ? 'border-indigo-200' :
                tier.color === 'violet' ? 'border-violet-200' : 'border-rose-200'
              }`}>
                <div className={`text-[11px] font-black uppercase tracking-wider px-2 py-1 rounded-full inline-block ${
                  tier.color === 'emerald' ? 'bg-emerald-100 text-emerald-700' :
                  tier.color === 'indigo' ? 'bg-indigo-100 text-indigo-700' :
                  tier.color === 'violet' ? 'bg-violet-100 text-violet-700' : 'bg-rose-100 text-rose-700'
                }`}>{tier.tier}</div>
                <p className={`text-[13px] font-bold ${
                  tier.color === 'emerald' ? 'text-emerald-800' :
                  tier.color === 'indigo' ? 'text-indigo-800' :
                  tier.color === 'violet' ? 'text-violet-800' : 'text-rose-800'
                }`}>{tier.cards}</p>
                <p className="text-[12px] font-mono text-slate-600 font-bold">{tier.vram}</p>
                <p className="text-[12px] text-slate-500 leading-relaxed">{tier.perf}</p>
              </div>
            ))}
          </div>

          {/* iGPU vs dGPU */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-2xl p-6 shadow-lg space-y-3">
              <h3 className="text-[16px] font-bold text-slate-800">🔵 Integrated GPU (iGPU)</h3>
              <p className="text-[14px] text-slate-600 leading-relaxed">
                GPU ที่ฝังอยู่ภายใน CPU Die เดียวกัน ใช้พื้นที่ RAM ของระบบเป็น VRAM (แชร์) 
                ประสิทธิภาพต่ำกว่า dGPU แต่ประหยัดพลังงาน เหมาะสำหรับงานสำนักงาน, การดูวิดีโอ
              </p>
              <div className="space-y-1.5">
                {['Intel UHD 770 (i7-13700K)', 'Intel Arc Graphics (Core Ultra)', 'AMD Radeon 780M (Ryzen 7 7840U)', 'Apple M4 GPU (38 Core)'].map((g, i) => (
                  <div key={i} className="flex items-center gap-2 text-[13px] text-slate-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0"/>
                    {g}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-2xl p-6 shadow-lg space-y-3">
              <h3 className="text-[16px] font-bold text-slate-800">🟣 Dedicated GPU (dGPU)</h3>
              <p className="text-[14px] text-slate-600 leading-relaxed">
                การ์ดจอแยกที่มี GPU Chip, VRAM เฉพาะ (GDDR6/6X) และระบบระบายความร้อนตัวเองอิสระ 
                เสียบในสล็อต PCIe x16 รองรับทุกงาน ตั้งแต่ Gaming ถึง AI Training เชิงพาณิชย์
              </p>
              <div className="space-y-1.5">
                {['NVIDIA GeForce RTX 4090 (24 GB GDDR6X)', 'AMD Radeon RX 7900 XTX (24 GB GDDR6)', 'NVIDIA RTX 4060 Ti (16 GB, งบกลาง)', 'NVIDIA RTX A6000 (48 GB, Workstation)'].map((g, i) => (
                  <div key={i} className="flex items-center gap-2 text-[13px] text-slate-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0"/>
                    {g}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================
            SECTION 7: เคสคอมพิวเตอร์ (Computer Case)
            ================================================================ */}
        <section id="section-case" className="space-y-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-1.5 h-7 bg-slate-600 rounded-full" />
              <h2 className="text-[26px] font-bold text-zinc-900 font-sans tracking-tight">
                เคสคอมพิวเตอร์ (Computer Case / Chassis)
              </h2>
            </div>
            <p className="text-[16px] text-zinc-600 leading-relaxed max-w-4xl">
              เคสคือโครงสร้างโลหะ/อลูมิเนียมที่บรรจุและปกป้องชิ้นส่วนทั้งหมด นอกจากความสวยงามแล้ว 
              การออกแบบ Airflow ภายในเคสส่งผลโดยตรงต่ออุณหภูมิการทำงานของ CPU และ GPU ทั้งระบบ
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case Form Factors */}
            <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-2xl p-6 shadow-lg space-y-4">
              <h3 className="text-[16px] font-bold text-slate-800">ฟอร์มแฟกเตอร์เคส (Case Size)</h3>
              <div className="space-y-3">
                {[
                  { name: 'Full Tower', mb: 'E-ATX / ATX', gpu: '≤ 450mm', cooling: 'Radiator 480mm', pros: 'ระบายความร้อนดีที่สุด', color: 'rose' },
                  { name: 'Mid Tower', mb: 'ATX / mATX', gpu: '≤ 380mm', cooling: 'Radiator 360mm', pros: 'สมดุลดีที่สุด', color: 'indigo' },
                  { name: 'Mini Tower', mb: 'mATX', gpu: '≤ 300mm', cooling: 'Radiator 240mm', pros: 'ประหยัดพื้นที่', color: 'cyan' },
                  { name: 'ITX / SFF', mb: 'Mini-ITX', gpu: '≤ 280mm', cooling: 'AIO 120mm', pros: 'พกพาได้/จิ๋ว', color: 'emerald' },
                ].map((c, i) => (
                  <div key={i} className={`flex items-center gap-3 p-3 rounded-xl border ${
                    c.color === 'rose' ? 'bg-rose-50 border-rose-200' :
                    c.color === 'indigo' ? 'bg-indigo-50 border-indigo-200' :
                    c.color === 'cyan' ? 'bg-cyan-50 border-cyan-200' :
                    'bg-emerald-50 border-emerald-200'
                  }`}>
                    <div className={`shrink-0 rounded-lg flex items-center justify-center text-[9px] font-black ${
                      i === 0 ? 'w-10 h-14' : i === 1 ? 'w-9 h-12' : i === 2 ? 'w-8 h-10' : 'w-7 h-8'
                    } ${
                      c.color === 'rose' ? 'bg-rose-200 text-rose-700' :
                      c.color === 'indigo' ? 'bg-indigo-200 text-indigo-700' :
                      c.color === 'cyan' ? 'bg-cyan-200 text-cyan-700' :
                      'bg-emerald-200 text-emerald-700'
                    }`}>PC</div>
                    <div className="flex-1">
                      <p className="text-[13px] font-bold text-slate-800">{c.name}</p>
                      <p className="text-[11px] text-slate-500">บอร์ด: {c.mb} | GPU: {c.gpu}</p>
                      <p className="text-[11px] text-slate-500">ระบายความร้อน: {c.cooling}</p>
                    </div>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                      c.color === 'rose' ? 'bg-rose-100 text-rose-700' :
                      c.color === 'indigo' ? 'bg-indigo-100 text-indigo-700' :
                      c.color === 'cyan' ? 'bg-cyan-100 text-cyan-700' :
                      'bg-emerald-100 text-emerald-700'
                    }`}>{c.pros}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Airflow Guide */}
            <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-2xl p-6 shadow-lg space-y-4">
              <h3 className="text-[16px] font-bold text-slate-800">ทิศทางลมภายในเคส (Airflow Design)</h3>
              <div className="flex justify-center">
                <svg viewBox="0 0 250 200" className="w-64 h-52">
                  {/* Case outline */}
                  <rect x="30" y="20" width="190" height="160" rx="8" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="2"/>
                  
                  {/* Front Intake fans */}
                  <rect x="30" y="40" width="18" height="120" rx="3" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1.5"/>
                  <text x="39" y="102" textAnchor="middle" fontSize="7" fill="#1D4ED8" transform="rotate(-90, 39, 102)">INTAKE ➜</text>
                  
                  {/* Rear Exhaust fan */}
                  <circle cx="205" cy="55" r="18" fill="#FEE2E2" stroke="#EF4444" strokeWidth="1.5"/>
                  <text x="205" y="52" textAnchor="middle" fontSize="6.5" fill="#B91C1C">EXHAUST</text>
                  <text x="205" y="62" textAnchor="middle" fontSize="8" fill="#B91C1C">➜</text>

                  {/* Top Exhaust */}
                  <rect x="80" y="20" width="80" height="14" rx="3" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.5"/>
                  <text x="120" y="30" textAnchor="middle" fontSize="7" fill="#92400E">TOP EXHAUST ↑</text>

                  {/* Components */}
                  <rect x="60" y="80" width="50" height="30" rx="4" fill="#E0E7FF" stroke="#4F46E5" strokeWidth="1.2"/>
                  <text x="85" y="93" textAnchor="middle" fontSize="7" fill="#3730A3" fontWeight="bold">CPU</text>
                  <text x="85" y="104" textAnchor="middle" fontSize="6" fill="#4F46E5">Cooler</text>

                  <rect x="120" y="100" width="65" height="50" rx="4" fill="#EDE9FE" stroke="#7C3AED" strokeWidth="1.2"/>
                  <text x="152" y="123" textAnchor="middle" fontSize="7" fill="#5B21B6" fontWeight="bold">GPU</text>
                  <text x="152" y="137" textAnchor="middle" fontSize="6" fill="#7C3AED">Fans ↓↑</text>

                  {/* Airflow arrows inside */}
                  <path d="M 50,100 Q 75,90 90,90" stroke="#3B82F6" strokeWidth="1.5" fill="none" strokeDasharray="3 2" markerEnd="url(#ab)"/>
                  <path d="M 50,130 Q 75,130 120,130" stroke="#3B82F6" strokeWidth="1.5" fill="none" strokeDasharray="3 2"/>
                  <path d="M 190,100 L 210,65" stroke="#EF4444" strokeWidth="1.5" fill="none" strokeDasharray="3 2"/>
                  <path d="M 150,100 L 150,35" stroke="#D97706" strokeWidth="1.5" fill="none" strokeDasharray="3 2"/>

                  <defs>
                    <marker id="ab" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                      <path d="M 0,0 L 6,3 L 0,6 Z" fill="#3B82F6"/>
                    </marker>
                  </defs>

                  <text x="125" y="185" textAnchor="middle" fontSize="8" fill="#64748b">เย็น → ร้อน: Front→Rear / Bottom→Top</text>
                </svg>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'INTAKE', color: 'bg-blue-100 text-blue-700', note: 'อากาศเย็นเข้า' },
                  { label: 'EXHAUST', color: 'bg-red-100 text-red-700', note: 'อากาศร้อนออก' },
                  { label: 'TOP', color: 'bg-amber-100 text-amber-700', note: 'ระบายบน' },
                ].map((a, i) => (
                  <div key={i} className={`p-2 rounded-lg text-center ${a.color}`}>
                    <p className="text-[11px] font-black">{a.label}</p>
                    <p className="text-[10px] mt-0.5">{a.note}</p>
                  </div>
                ))}
              </div>
              <p className="text-[13px] text-slate-600 leading-relaxed">
                หลักการ: พัดลมด้านหน้า/ล่าง = Intake (ลมเย็นเข้า) พัดลมด้านหลัง/บน = Exhaust (ลมร้อนออก) 
                ให้แรงดันอากาศเป็น <strong>Positive Pressure</strong> เล็กน้อยเพื่อลดการสะสมฝุ่น
              </p>
            </div>
          </div>
        </section>

        {/* ================================================================
            SECTION 8: จอแสดงผล (Monitor) และสายเชื่อมต่อ
            ================================================================ */}
        <section id="section-monitor" className="space-y-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-1.5 h-7 bg-teal-600 rounded-full" />
              <h2 className="text-[26px] font-bold text-zinc-900 font-sans tracking-tight">
                จอแสดงผล (Monitor) ชนิดแผงและสายเชื่อมต่อสัญญาณภาพ
              </h2>
            </div>
            <p className="text-[16px] text-zinc-600 leading-relaxed max-w-4xl">
              Monitor แสดงผลลัพธ์จาก GPU ออกเป็นภาพที่มองเห็นได้ ชนิดแผง (Panel Type) ส่งผลต่อความสวยของสี 
              ความเร็ว และมุมมอง การเลือกสายเชื่อมต่อที่ถูกต้องช่วยให้ได้รับอัตราการรีเฟรชและความละเอียดสูงสุด
            </p>
          </div>

          {/* Monitor Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-teal-200/50">
            <img
              src="/images/it/monitor_panels.png"
              alt="เปรียบเทียบชนิดแผงจอ TN, IPS, VA, OLED"
              className="w-full object-cover max-h-72"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/80 to-transparent px-6 py-4">
              <p className="text-white text-[13px] font-semibold">เปรียบเทียบแผงจอ: TN (1ms / สีธรรมดา) | IPS (8ms / สีสวย) | VA (Contrast สูง) | OLED (Perfect Black)</p>
            </div>
          </div>

          {/* Panel Type Interactive */}
          <div className="flex flex-wrap gap-3 mb-2">
            {monitorPanels.map((p, i) => (
              <button
                key={i}
                onClick={() => setSelectedPanel(i)}
                className={`px-4 py-2.5 rounded-xl border-2 text-[13px] font-bold transition-all duration-200 active:scale-[0.97] ${
                  selectedPanel === i
                    ? `border-teal-500 bg-teal-50 text-teal-800`
                    : 'border-slate-200 bg-white/50 text-slate-600 hover:border-slate-300'
                }`}
              >
                {p.type.split(' (')[0]}
              </button>
            ))}
          </div>

          {(() => {
            const p = monitorPanels[selectedPanel];
            return (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/70 backdrop-blur-xl border border-teal-200 rounded-2xl p-6 shadow-lg space-y-4">
                  <h3 className="text-[18px] font-black text-slate-800">{p.type}</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: 'Response Time', value: p.response, color: 'rose' },
                      { label: 'View Angle', value: p.viewAngle, color: 'indigo' },
                      { label: 'Color Depth', value: p.colorDepth, color: 'violet' },
                      { label: 'Best For', value: p.bestFor, color: 'teal' },
                    ].map((stat, j) => (
                      <div key={j} className={`p-3 rounded-xl border ${
                        stat.color === 'rose' ? 'bg-rose-50 border-rose-100' :
                        stat.color === 'indigo' ? 'bg-indigo-50 border-indigo-100' :
                        stat.color === 'violet' ? 'bg-violet-50 border-violet-100' :
                        'bg-teal-50 border-teal-100'
                      }`}>
                        <p className={`text-[11px] font-bold uppercase tracking-wider mb-1 ${
                          stat.color === 'rose' ? 'text-rose-600' :
                          stat.color === 'indigo' ? 'text-indigo-600' :
                          stat.color === 'violet' ? 'text-violet-600' : 'text-teal-600'
                        }`}>{stat.label}</p>
                        <p className="text-[13px] font-black text-slate-800">{stat.value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl">
                      <p className="text-[12px] font-bold text-emerald-600 mb-1">จุดเด่น</p>
                      <p className="text-[13px] text-emerald-800">{p.pros}</p>
                    </div>
                    <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl">
                      <p className="text-[12px] font-bold text-rose-600 mb-1">จุดอ่อน</p>
                      <p className="text-[13px] text-rose-800">{p.cons}</p>
                    </div>
                  </div>
                </div>
                {/* Video Connectors */}
                <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl p-6 shadow-lg space-y-4">
                  <h3 className="text-[16px] font-bold text-slate-800">สายเชื่อมต่อสัญญาณภาพ</h3>
                  <div className="space-y-2">
                    {videoConnectors.map((c, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedConnector(i)}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all duration-150 active:scale-[0.98] ${
                          selectedConnector === i
                            ? 'border-teal-400 bg-teal-50'
                            : 'border-slate-200 bg-white/50 hover:border-slate-300'
                        }`}
                      >
                        <div className={`w-10 h-6 rounded flex items-center justify-center text-[9px] font-black shrink-0 ${
                          c.color === 'slate' ? 'bg-slate-200 text-slate-700' :
                          c.color === 'amber' ? 'bg-amber-200 text-amber-800' :
                          c.color === 'cyan' ? 'bg-cyan-200 text-cyan-800' :
                          c.color === 'indigo' ? 'bg-indigo-200 text-indigo-800' :
                          c.color === 'violet' ? 'bg-violet-200 text-violet-800' :
                          'bg-rose-200 text-rose-800'
                        }`}>{c.name.split(' ')[0]}</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] font-bold text-slate-800">{c.name}</p>
                          <p className="text-[11px] text-slate-500 truncate">{c.maxRes} / {c.maxHz}</p>
                        </div>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold shrink-0 ${
                          c.signal === 'Analog' ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'
                        }`}>{c.signal}</span>
                      </button>
                    ))}
                  </div>
                  {/* Selected connector detail */}
                  <div className="p-3 bg-teal-50 border border-teal-200 rounded-xl">
                    <p className="text-[12px] font-bold text-teal-700 mb-1">{videoConnectors[selectedConnector].name}</p>
                    <p className="text-[13px] text-teal-800">{videoConnectors[selectedConnector].note}</p>
                    <p className="text-[12px] text-teal-600 mt-1">รองรับสูงสุด: {videoConnectors[selectedConnector].maxRes} @ {videoConnectors[selectedConnector].maxHz}</p>
                  </div>
                </div>
              </div>
            );
          })()}
        </section>

        {/* ================================================================
            GAMIFICATION: QuizEngine
            ================================================================ */}
        <section id="section-quiz" className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-1.5 h-7 bg-indigo-600 rounded-full animate-pulse" />
              <h2 className="text-[26px] font-bold text-zinc-900 tracking-tight">
                ด่านทดสอบความรู้: เจาะลึกฮาร์ดแวร์คอมพิวเตอร์
              </h2>
            </div>
            <p className="text-[16px] text-zinc-600 leading-relaxed max-w-4xl">
              ทดสอบความเข้าใจเรื่องสถาปัตยกรรม CPU, Motherboard, RAM, Storage, PSU, GPU, Case และ Monitor 
              เลือกคำตอบที่ถูกต้องเพื่อประเมินความพร้อมก่อนเข้าสู่การประกอบจริง
            </p>
          </div>

          <QuizEngine
            title="เกมทดสอบ: ช่างเทคนิคฮาร์ดแวร์มืออาชีพ"
            description="วิเคราะห์สถานการณ์และเลือกคำตอบทางวิศวกรรมที่ถูกต้องที่สุด"
            levels={[
              {
                title: 'โจทย์ที่ 1: Socket และ Platform',
                desc: 'นักเรียนต้องการซื้อ CPU AMD Ryzen 7 7700X มาใส่เครื่อง ควรเลือก Motherboard ที่มี Socket ชนิดใดและรองรับ RAM แบบใด?',
                options: [
                  { key: 'A', text: 'Socket AM4 + DDR4', isCorrect: false },
                  { key: 'B', text: 'Socket AM5 + DDR5 (บังคับ)', isCorrect: true },
                  { key: 'C', text: 'Socket LGA1700 + DDR4/DDR5', isCorrect: false },
                  { key: 'D', text: 'Socket TR5 + DDR5', isCorrect: false }
                ],
                tip: 'Ryzen 7000 Series ใช้สถาปัตยกรรม Zen 4 บน Socket AM5 ซึ่งรองรับ DDR5 เท่านั้น'
              },
              {
                title: 'โจทย์ที่ 2: Dual-Channel RAM',
                desc: 'Motherboard มีสล็อต RAM 4 ช่อง (A1, A2, B1, B2) ต้องการใช้ RAM 2 แท่งแบบ Dual-Channel ควรเสียบในตำแหน่งใด?',
                options: [
                  { key: 'A', text: 'A1 + A2 (ช่องเดียวกัน)', isCorrect: false },
                  { key: 'B', text: 'A1 + B1 (ห่างกัน)', isCorrect: false },
                  { key: 'C', text: 'A2 + B2 (ข้ามช่อง ตามคู่มือบอร์ด)', isCorrect: true },
                  { key: 'D', text: 'B1 + B2 (ช่องเดียวกัน)', isCorrect: false }
                ],
                tip: 'โดยทั่วไปควรเสียบ Slot A2+B2 เพื่อลด Signal Trace และรองรับ Dual-Channel สมบูรณ์ แต่ต้องตรวจสอบคู่มือเมนบอร์ดก่อนเสมอ'
              },
              {
                title: 'โจทย์ที่ 3: ขนาด PSU ที่เหมาะสม',
                desc: 'ระบบที่จะสร้างประกอบด้วย Intel i9-13900K (TDP 253W), RTX 4090 (TDP 450W), RAM 2 แท่ง, SSD NVMe 2 ตัว อยากได้ PSU ขนาดเหมาะสมพร้อม Safety Headroom 25%',
                options: [
                  { key: 'A', text: '650W Gold', isCorrect: false },
                  { key: 'B', text: '750W Platinum', isCorrect: false },
                  { key: 'C', text: '900W Gold', isCorrect: false },
                  { key: 'D', text: '1000W Platinum หรือสูงกว่า', isCorrect: true }
                ],
                tip: 'Load รวม = 253+450+10+14+30 = 757W × 1.25 = 946W → ควรเลือก 1000W+ เพื่อความปลอดภัยและอายุ PSU'
              },
              {
                title: 'โจทย์ที่ 4: ชนิดแผง Monitor',
                desc: 'นักกีฬา E-Sport ต้องการ Monitor สำหรับเล่น FPS ระดับแข่งขัน ต้องการ Response Time ต่ำที่สุดเพื่อตอบสนองที่เร็วที่สุด ควรเลือกแผงชนิดใด?',
                options: [
                  { key: 'A', text: 'IPS เพราะสีสวยกว่า', isCorrect: false },
                  { key: 'B', text: 'VA เพราะ Contrast ดี', isCorrect: false },
                  { key: 'C', text: 'TN เพราะ Response Time 1ms เร็วที่สุดราคาเหมาะสม', isCorrect: true },
                  { key: 'D', text: 'OLED เพราะ Response < 0.1ms', isCorrect: false }
                ],
                tip: 'TN Panel มี Response Time เพียง 1-5ms ในราคาเข้าถึงได้ เหมาะ E-Sport ระดับแข่งขัน แม้ OLED เร็วกว่าแต่ราคาสูงมาก'
              },
              {
                title: 'โจทย์ที่ 5: สาย DisplayPort vs HDMI',
                desc: 'Gaming Monitor รองรับ 4K@144Hz ต้องการใช้ความละเอียดและ Refresh Rate สูงสุด ควรใช้สายสัญญาณชนิดใดระหว่าง HDMI 2.0 กับ DisplayPort 1.4?',
                options: [
                  { key: 'A', text: 'HDMI 2.0 เพราะเป็นมาตรฐานสากลกว่า', isCorrect: false },
                  { key: 'B', text: 'VGA เพราะเสียบได้กับทุกบอร์ด', isCorrect: false },
                  { key: 'C', text: 'DisplayPort 1.4 รองรับ 4K@144Hz ได้สมบูรณ์', isCorrect: true },
                  { key: 'D', text: 'DVI-D เพราะสัญญาณดิจิทัลคุณภาพสูง', isCorrect: false }
                ],
                tip: 'HDMI 2.0 รองรับ 4K@60Hz เท่านั้น ส่วน DisplayPort 1.4 รองรับ 4K@144Hz และ HDR ได้เต็มประสิทธิภาพ'
              }
            ]}
            accentColor="from-indigo-500/20 to-violet-500/20"
            icon={<Cpu className="w-8 h-8 text-indigo-400" />}
          />
        </section>

        {/* ================================================================
            TEACHER TASK
            ================================================================ */}
        <SectionBlock>
          <div className="space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="w-1.5 h-7 bg-indigo-600 rounded-full" />
              <h2 className="text-[26px] font-bold text-zinc-900 font-sans tracking-tight">
                ภารกิจประจำหน่วย 2.1: วิเคราะห์และออกแบบระบบคอมพิวเตอร์
              </h2>
            </div>
            <p className="text-[16px] text-zinc-600 leading-relaxed max-w-4xl">
              ประยุกต์ความรู้เรื่องฮาร์ดแวร์ทั้ง 8 ส่วนในการวิเคราะห์ เปรียบเทียบ และวางแผนการสร้างระบบตามเงื่อนไขที่กำหนด
            </p>
            <TeacherTask
              title="ใบงานที่ 2.1: ออกแบบและวิเคราะห์สเปคคอมพิวเตอร์ตามวัตถุประสงค์"
              taskText={`สถานการณ์: ร้านซ่อมคอมพิวเตอร์ได้รับงานจากลูกค้า 3 กลุ่ม ให้นักเรียนออกแบบ PC Spec ที่เหมาะสม

กลุ่มที่ 1 (งบ 25,000 บาท): นักเรียนอาชีวะที่ต้องการเครื่องสำหรับเรียน Programming, ตัดต่อวิดีโอเบื้องต้น และเล่นเกมบ้างตามโอกาส

กลุ่มที่ 2 (งบ 50,000 บาท): ช่างถ่ายภาพมืออาชีพที่ต้องการระบบสำหรับ Lightroom/Photoshop, Capture One และ After Effects พร้อมจอสีถูกต้อง

กลุ่มที่ 3 (ไม่จำกัดงบ): สำนักงานสาขาที่ต้องการ Server สำหรับ File Sharing 20 เครื่อง พร้อม Storage ขนาด 50 TB

สำหรับแต่ละกลุ่ม ให้:
1. เลือก CPU + Socket + Chipset ที่เหมาะสม พร้อมให้เหตุผล
2. กำหนดประเภท RAM (DDR4/DDR5), ความเร็ว, จำนวน และ Channel Mode
3. เลือกประเภท Storage (HDD/SSD SATA/NVMe) พร้อมความจุและจำนวน
4. คำนวณขนาด PSU ที่ต้องการ (แสดงการคำนวณทีละขั้น)
5. เลือกชนิดจอภาพ (Panel Type) และสายเชื่อมต่อที่เหมาะกับงาน พร้อมอธิบายเหตุผล`}
            />
          </div>
        </SectionBlock>

      </main>
    </>
  );
}
