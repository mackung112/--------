import React from 'react';
import SQLSyntaxEngine from './SQLSyntaxEngine';
import { TerminalSquare } from 'lucide-react';

export default function SQLDistinctDemo() {
  const codeParts = [
  {
    "text": "DISTINCT ",
    "key": "dist"
  },
  {
    "text": "หลายคอลัมน์ ",
    "key": "multi"
  },
  {
    "text": "ตัวอย่างการใช้ ",
    "key": "usecase"
  },
  {
    "text": "ประสิทธิภาพ ",
    "key": "perf"
  }
];
  const explanations = {
  "dist": {
    "title": "DISTINCT",
    "desc": "ตัดข้อมูลที่ซ้ำกันออก ให้แสดงผลเพียง 1 รายการเท่านั้น",
    "color": "text-pink-500"
  },
  "multi": {
    "title": "หลายคอลัมน์",
    "desc": "SELECT DISTINCT col1, col2 จะถือว่าซ้ำก็ต่อเมื่อค่าทั้งสองคอลัมน์เหมือนกันเป๊ะ",
    "color": "text-yellow-500"
  },
  "usecase": {
    "title": "ตัวอย่างการใช้",
    "desc": "หาว่าลูกค้าของเรามาจาก \"จังหวัด\" อะไรบ้าง โดยไม่ต้องการรายชื่อคน",
    "color": "text-emerald-400"
  },
  "perf": {
    "title": "ประสิทธิภาพ",
    "desc": "การใช้ DISTINCT มีผลกระทบต่อความเร็ว เพราะต้องเช็คความซ้ำซ้อนทั้งหมด",
    "color": "text-sky-400"
  }
};
  const quiz = { q: `ถ้ามีพนักงาน 10 คน ทำงานใน 3 แผนก (IT, HR, Sales) คำสั่ง SELECT DISTINCT department FROM employees จะได้กี่แถว?`, opts: [{"val":"3","label":"3 แถว","correct":true},{"val":"10","label":"10 แถว"},{"val":"1","label":"1 แถว"}] };

  return (
    <SQLSyntaxEngine 
      title="การดึงข้อมูลไม่ซ้ำ (DISTINCT)"
      description="เรียนรู้โครงสร้างคำสั่งหลักโดยการคลิกหรือนำเมาส์ไปชี้ที่ส่วนต่างๆ ของโค้ด"
      icon={TerminalSquare}
      codeParts={codeParts}
      explanations={explanations}
      quiz={quiz}
    />
  );
}
