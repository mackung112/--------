import React from 'react';
import SQLSyntaxEngine from './SQLSyntaxEngine';
import { TerminalSquare } from 'lucide-react';

export default function SQL21901_U4_L3_SQLOrderByDemo() {
  const codeParts = [
  {
    "text": "ORDER BY ",
    "key": "order"
  },
  {
    "text": "ASC ",
    "key": "asc"
  },
  {
    "text": "DESC ",
    "key": "desc"
  },
  {
    "text": "เรียงหลายคอลัมน์ ",
    "key": "multi"
  }
];
  const explanations = {
  "order": {
    "title": "ORDER BY",
    "desc": "จัดเรียงผลลัพธ์ตามคอลัมน์ที่ระบุ โดยค่าเริ่มต้นจะเรียงจากน้อยไปมาก",
    "color": "text-pink-500"
  },
  "asc": {
    "title": "ASC",
    "desc": "เรียงจากน้อยไปมาก (A-Z, 0-9) - เป็นค่า Default",
    "color": "text-yellow-500"
  },
  "desc": {
    "title": "DESC",
    "desc": "เรียงจากมากไปน้อย (Z-A, 9-0) เช่น สินค้าราคาแพงสุด",
    "color": "text-emerald-400"
  },
  "multi": {
    "title": "เรียงหลายคอลัมน์",
    "desc": "ORDER BY department ASC, salary DESC (เรียงแผนกก่อน แล้วเรียงเงินเดือน)",
    "color": "text-sky-400"
  }
};
  const quiz = { q: `ถ้าต้องการแสดงสินค้าที่ "ราคาแพงที่สุด" ขึ้นมาก่อน ต้องเรียงลำดับแบบใด?`, opts: [{"val":"desc","label":"ORDER BY price DESC","correct":true},{"val":"asc","label":"ORDER BY price ASC"},{"val":"high","label":"ORDER BY price HIGH"}] };

  return (
    <SQLSyntaxEngine 
      title="การจัดเรียงข้อมูล (ORDER BY)"
      description="เรียนรู้โครงสร้างคำสั่งหลักโดยการคลิกหรือนำเมาส์ไปชี้ที่ส่วนต่างๆ ของโค้ด"
      icon={TerminalSquare}
      codeParts={codeParts}
      explanations={explanations}
      quiz={quiz}
    />
  );
}
