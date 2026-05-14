import React from 'react';
import SQLSyntaxEngine from './SQLSyntaxEngine';
import { TerminalSquare } from 'lucide-react';

export default function SQLDropColumnDemo() {
  const codeParts = [
  {
    "text": "DROP COLUMN ",
    "key": "drop"
  },
  {
    "text": "กู้คืนไม่ได้ ",
    "key": "noundo"
  },
  {
    "text": "ลบหลายคอลัมน์ ",
    "key": "multi"
  },
  {
    "text": "ข้อควรระวัง ",
    "key": "fk"
  }
];
  const explanations = {
  "drop": {
    "title": "DROP COLUMN",
    "desc": "ALTER TABLE users DROP COLUMN age;",
    "color": "text-pink-500"
  },
  "noundo": {
    "title": "กู้คืนไม่ได้",
    "desc": "ข้อมูลในคอลัมน์นั้นจะหายไปอย่างถาวร",
    "color": "text-yellow-500"
  },
  "multi": {
    "title": "ลบหลายคอลัมน์",
    "desc": "DROP COLUMN a, DROP COLUMN b;",
    "color": "text-emerald-400"
  },
  "fk": {
    "title": "ข้อควรระวัง",
    "desc": "ไม่สามารถลบคอลัมน์ที่เป็น Foreign Key ชี้ไปหาตารางอื่นอยู่ได้ง่ายๆ",
    "color": "text-sky-400"
  }
};
  const quiz = { q: `คำสั่งลบคอลัมน์ email จากตาราง users คือข้อใด?`, opts: [{"val":"drop","label":"ALTER TABLE users DROP COLUMN email;","correct":true},{"val":"del","label":"DELETE COLUMN email FROM users;"},{"val":"remove","label":"ALTER TABLE users REMOVE email;"}] };

  return (
    <SQLSyntaxEngine 
      title="ลบคอลัมน์ (DROP COLUMN)"
      description="เรียนรู้โครงสร้างคำสั่งหลักโดยการคลิกหรือนำเมาส์ไปชี้ที่ส่วนต่างๆ ของโค้ด"
      icon={TerminalSquare}
      codeParts={codeParts}
      explanations={explanations}
      quiz={quiz}
    />
  );
}
