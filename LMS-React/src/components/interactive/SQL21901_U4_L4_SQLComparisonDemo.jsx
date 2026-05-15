import React from 'react';
import SQLSyntaxEngine from './SQLSyntaxEngine';
import { TerminalSquare } from 'lucide-react';

export default function SQL21901_U4_L4_SQLComparisonDemo() {
  const codeParts = [
  {
    "text": "เท่ากับ / ไม่เท่ากับ ",
    "key": "eq"
  },
  {
    "text": "มากกว่า / น้อยกว่า ",
    "key": "gtlt"
  },
  {
    "text": "BETWEEN ",
    "key": "between"
  },
  {
    "text": "IN (...) ",
    "key": "in"
  }
];
  const explanations = {
  "eq": {
    "title": "เท่ากับ / ไม่เท่ากับ",
    "desc": "= (เท่ากับ), <> หรือ != (ไม่เท่ากับ)",
    "color": "text-pink-500"
  },
  "gtlt": {
    "title": "มากกว่า / น้อยกว่า",
    "desc": ">, <, >=, <= ใช้กับตัวเลขหรือวันที่",
    "color": "text-yellow-500"
  },
  "between": {
    "title": "BETWEEN",
    "desc": "หาระหว่าง 2 ค่า (รวมค่าหัวท้ายด้วย) เช่น BETWEEN 10 AND 20",
    "color": "text-emerald-400"
  },
  "in": {
    "title": "IN (...)",
    "desc": "หาค่าที่ตรงกับในวงเล็บ เช่น IN (1, 3, 5)",
    "color": "text-sky-400"
  }
};
  const quiz = { q: `คำสั่ง WHERE price BETWEEN 100 AND 200 มีความหมายตรงกับข้อใด?`, opts: [{"val":"gte","label":"WHERE price >= 100 AND price <= 200","correct":true},{"val":"gt","label":"WHERE price > 100 AND price < 200"},{"val":"in","label":"WHERE price IN (100, 200)"}] };

  return (
    <SQLSyntaxEngine 
      title="ตัวดำเนินการเปรียบเทียบ"
      description="เรียนรู้โครงสร้างคำสั่งหลักโดยการคลิกหรือนำเมาส์ไปชี้ที่ส่วนต่างๆ ของโค้ด"
      icon={TerminalSquare}
      codeParts={codeParts}
      explanations={explanations}
      quiz={quiz}
    />
  );
}
