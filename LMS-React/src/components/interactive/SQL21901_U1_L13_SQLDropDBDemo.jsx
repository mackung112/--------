import React from 'react';
import SQLSyntaxEngine from './SQLSyntaxEngine';
import { TerminalSquare } from 'lucide-react';

export default function SQL21901_U1_L13_SQLDropDBDemo() {
  const codeParts = [
  {
    "text": "Syntax ",
    "key": "syntax"
  },
  {
    "text": "IF EXISTS ",
    "key": "ifexists"
  },
  {
    "text": "⚠️ อันตราย! ",
    "key": "danger"
  }
];
  const explanations = {
  "syntax": {
    "title": "Syntax",
    "desc": "DROP DATABASE [IF EXISTS] database_name;",
    "color": "text-pink-500"
  },
  "ifexists": {
    "title": "IF EXISTS",
    "desc": "ป้องกัน Error ถ้าฐานข้อมูลไม่มีอยู่จริง",
    "color": "text-yellow-500"
  },
  "danger": {
    "title": "⚠️ อันตราย!",
    "desc": "คำสั่งนี้ลบทุกอย่างอย่างถาวร ใช้อย่างระมัดระวัง",
    "color": "text-emerald-400"
  }
};
  const quiz = { q: `IF EXISTS ใน DROP DATABASE ใช้ทำอะไร?`, opts: [{"val":"prevent","label":"ป้องกัน Error ถ้าฐานข้อมูลไม่มีอยู่","correct":true},{"val":"check","label":"ตรวจสอบว่ามีข้อมูลอยู่หรือไม่"},{"val":"backup","label":"สำรองข้อมูลก่อนลบ"}] };

  return (
    <SQLSyntaxEngine 
      title="DROP DATABASE"
      description="เรียนรู้โครงสร้างคำสั่งหลักโดยการคลิกหรือนำเมาส์ไปชี้ที่ส่วนต่างๆ ของโค้ด"
      icon={TerminalSquare}
      codeParts={codeParts}
      explanations={explanations}
      quiz={quiz}
    />
  );
}
