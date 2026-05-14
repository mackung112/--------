import React from 'react';
import SQLSyntaxEngine from './SQLSyntaxEngine';
import { TerminalSquare } from 'lucide-react';

export default function SQLAccessControlDemo() {
  const codeParts = [
  {
    "text": "CREATE USER ",
    "key": "create"
  },
  {
    "text": "Host Restriction ",
    "key": "host"
  },
  {
    "text": "DROP USER ",
    "key": "drop"
  },
  {
    "text": "ALTER USER ",
    "key": "alter"
  }
];
  const explanations = {
  "create": {
    "title": "CREATE USER",
    "desc": "CREATE USER \"somchai\"@\"localhost\" IDENTIFIED BY \"password\";",
    "color": "text-pink-500"
  },
  "host": {
    "title": "Host Restriction",
    "desc": "กำหนดได้ว่า User นี้ต้องเชื่อมต่อมาจาก IP/Host ใดเท่านั้น (เช่น localhost)",
    "color": "text-yellow-500"
  },
  "drop": {
    "title": "DROP USER",
    "desc": "ลบผู้ใช้งานเมื่อลาออก",
    "color": "text-emerald-400"
  },
  "alter": {
    "title": "ALTER USER",
    "desc": "ใช้เปลี่ยนรหัสผ่านหรือล็อคบัญชี",
    "color": "text-sky-400"
  }
};
  const quiz = { q: `ถ้ากำหนด User เป็น "john"@"192.168.1.10" หมายความว่าอย่างไร?`, opts: [{"val":"ip","label":"John สามารถล็อคอินเข้าฐานข้อมูลได้จากเครื่อง IP 192.168.1.10 เท่านั้น","correct":true},{"val":"any","label":"John ล็อคอินจากที่ไหนก็ได้"},{"val":"pw","label":"John ต้องใช้ 192.168.1.10 เป็นรหัสผ่าน"}] };

  return (
    <SQLSyntaxEngine 
      title="การควบคุมการเข้าถึง"
      description="เรียนรู้โครงสร้างคำสั่งหลักโดยการคลิกหรือนำเมาส์ไปชี้ที่ส่วนต่างๆ ของโค้ด"
      icon={TerminalSquare}
      codeParts={codeParts}
      explanations={explanations}
      quiz={quiz}
    />
  );
}
