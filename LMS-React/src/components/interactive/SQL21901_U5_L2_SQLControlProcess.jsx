import React from 'react';
import SQLSyntaxEngine from './SQLSyntaxEngine';
import { TerminalSquare } from 'lucide-react';

export default function SQL21901_U5_L2_SQLControlProcess() {
  const codeParts = [
  {
    "text": "1. กำหนดนโยบาย (Policy) ",
    "key": "policy"
  },
  {
    "text": "2. พิสูจน์ตัวตน (Authentication) ",
    "key": "auth"
  },
  {
    "text": "3. การให้สิทธิ์ (Authorization) ",
    "key": "authz"
  },
  {
    "text": "4. ตรวจสอบ (Auditing) ",
    "key": "audit"
  }
];
  const explanations = {
  "policy": {
    "title": "1. กำหนดนโยบาย (Policy)",
    "desc": "ตั้งกฎว่าใครทำอะไรได้บ้าง เช่น พนักงานทั่วไปดูได้แค่ข้อมูลตัวเอง",
    "color": "text-pink-500"
  },
  "auth": {
    "title": "2. พิสูจน์ตัวตน (Authentication)",
    "desc": "ตรวจสอบว่าผู้ใช้คือคนที่กล่าวอ้างจริงหรือไม่ (เช่น ใช้รหัสผ่าน)",
    "color": "text-yellow-500"
  },
  "authz": {
    "title": "3. การให้สิทธิ์ (Authorization)",
    "desc": "อนุญาตให้ทำสิ่งต่างๆ ตามระดับสิทธิ์ที่ตั้งไว้",
    "color": "text-emerald-400"
  },
  "audit": {
    "title": "4. ตรวจสอบ (Auditing)",
    "desc": "เก็บ Log และสุ่มตรวจการเข้าถึงที่ผิดปกติ",
    "color": "text-sky-400"
  }
};
  const quiz = { q: `การที่ระบบตรวจสอบรหัสผ่านว่าถูกต้องหรือไม่ เป็นขั้นตอนใดของกระบวนการควบคุม?`, opts: [{"val":"auth","label":"Authentication (การพิสูจน์ตัวตน)","correct":true},{"val":"authz","label":"Authorization (การให้สิทธิ์)"},{"val":"audit","label":"Auditing (การตรวจสอบ)"}] };

  return (
    <SQLSyntaxEngine 
      title="กระบวนการควบคุมข้อมูล"
      description="เรียนรู้โครงสร้างคำสั่งหลักโดยการคลิกหรือนำเมาส์ไปชี้ที่ส่วนต่างๆ ของโค้ด"
      icon={TerminalSquare}
      codeParts={codeParts}
      explanations={explanations}
      quiz={quiz}
    />
  );
}
