import React from 'react';
import SQLSyntaxEngine from './SQLSyntaxEngine';
import { TerminalSquare } from 'lucide-react';

export default function SQL21901_U5_L1_SQLSecurityImportance() {
  const codeParts = [
  {
    "text": "Confidentiality (ความลับ) ",
    "key": "conf"
  },
  {
    "text": "Integrity (ความถูกต้อง) ",
    "key": "integ"
  },
  {
    "text": "Availability (ความพร้อมใช้) ",
    "key": "avail"
  },
  {
    "text": "CIA Triad ",
    "key": "cia"
  }
];
  const explanations = {
  "conf": {
    "title": "Confidentiality (ความลับ)",
    "desc": "ข้อมูลต้องเข้าถึงได้เฉพาะผู้ที่มีสิทธิ์เท่านั้น ป้องกันการรั่วไหล",
    "color": "text-pink-500"
  },
  "integ": {
    "title": "Integrity (ความถูกต้อง)",
    "desc": "ข้อมูลต้องไม่ถูกแอบแก้ไข และมีความน่าเชื่อถือเสมอ",
    "color": "text-yellow-500"
  },
  "avail": {
    "title": "Availability (ความพร้อมใช้)",
    "desc": "ระบบต้องพร้อมให้บริการเมื่อผู้ใช้ที่ได้รับอนุญาตต้องการ",
    "color": "text-emerald-400"
  },
  "cia": {
    "title": "CIA Triad",
    "desc": "3 เสาหลักของการรักษาความปลอดภัยข้อมูล",
    "color": "text-sky-400"
  }
};
  const quiz = { q: `การป้องกันไม่ให้แฮกเกอร์แอบเข้ามาแก้ไขข้อมูลเงินเดือนพนักงาน ตรงกับหลักการใดของ CIA Triad?`, opts: [{"val":"integ","label":"Integrity (ความถูกต้อง/ความสมบูรณ์)","correct":true},{"val":"conf","label":"Confidentiality (ความลับ)"},{"val":"avail","label":"Availability (ความพร้อมใช้)"}] };

  return (
    <SQLSyntaxEngine 
      title="ความสำคัญของการควบคุมข้อมูล"
      description="เรียนรู้โครงสร้างคำสั่งหลักโดยการคลิกหรือนำเมาส์ไปชี้ที่ส่วนต่างๆ ของโค้ด"
      icon={TerminalSquare}
      codeParts={codeParts}
      explanations={explanations}
      quiz={quiz}
    />
  );
}
