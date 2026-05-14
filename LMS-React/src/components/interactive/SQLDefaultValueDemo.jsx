import React from 'react';
import SQLSyntaxEngine from './SQLSyntaxEngine';
import { TerminalSquare } from 'lucide-react';

export default function SQLDefaultValueDemo() {
  const codeParts = [
  {
    "text": "DEFAULT value ",
    "key": "def"
  },
  {
    "text": "CURRENT_TIMESTAMP ",
    "key": "time"
  },
  {
    "text": "NULL ",
    "key": "null"
  },
  {
    "text": "เขียนทับ ",
    "key": "override"
  }
];
  const explanations = {
  "def": {
    "title": "DEFAULT value",
    "desc": "status VARCHAR(20) DEFAULT \"active\"",
    "color": "text-pink-500"
  },
  "time": {
    "title": "CURRENT_TIMESTAMP",
    "desc": "created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
    "color": "text-yellow-500"
  },
  "null": {
    "title": "NULL",
    "desc": "ถ้าไม่กำหนด DEFAULT ปกติจะเป็น NULL (ถ้าไม่ใส่ NOT NULL)",
    "color": "text-emerald-400"
  },
  "override": {
    "title": "เขียนทับ",
    "desc": "เราสามารถระบุค่าอื่นทับค่า DEFAULT ได้ตอน INSERT",
    "color": "text-sky-400"
  }
};
  const quiz = { q: `ถ้าตั้ง DEFAULT เป็น "pending" แล้ว INSERT โดยไม่ระบุค่าคอลัมน์นี้ ข้อมูลจะเป็นอย่างไร?`, opts: [{"val":"def","label":"ได้ค่าเป็น \"pending\" อัตโนมัติ","correct":true},{"val":"null","label":"เป็นค่าว่าง (NULL)"},{"val":"error","label":"เกิด Error"}] };

  return (
    <SQLSyntaxEngine 
      title="ค่าเริ่มต้น (DEFAULT)"
      description="เรียนรู้โครงสร้างคำสั่งหลักโดยการคลิกหรือนำเมาส์ไปชี้ที่ส่วนต่างๆ ของโค้ด"
      icon={TerminalSquare}
      codeParts={codeParts}
      explanations={explanations}
      quiz={quiz}
    />
  );
}
