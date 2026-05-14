import React from 'react';
import SQLSyntaxEngine from './SQLSyntaxEngine';
import { TerminalSquare } from 'lucide-react';

export default function SQLLogicalDemo() {
  const codeParts = [
  {
    "text": "AND (และ) ",
    "key": "and"
  },
  {
    "text": "OR (หรือ) ",
    "key": "or"
  },
  {
    "text": "NOT (ไม่) ",
    "key": "not"
  },
  {
    "text": "วงเล็บ () ",
    "key": "parens"
  }
];
  const explanations = {
  "and": {
    "title": "AND (และ)",
    "desc": "เงื่อนไข \"ทั้งหมด\" ต้องเป็นจริง ถึงจะแสดงข้อมูล",
    "color": "text-pink-500"
  },
  "or": {
    "title": "OR (หรือ)",
    "desc": "เงื่อนไข \"อย่างน้อย 1 อัน\" เป็นจริง ก็แสดงข้อมูลแล้ว",
    "color": "text-yellow-500"
  },
  "not": {
    "title": "NOT (ไม่)",
    "desc": "กลับผลลัพธ์จากจริงเป็นเท็จ เช่น WHERE NOT status=\"banned\"",
    "color": "text-emerald-400"
  },
  "parens": {
    "title": "วงเล็บ ()",
    "desc": "ใช้จัดลำดับความสำคัญ เช่น WHERE (A OR B) AND C",
    "color": "text-sky-400"
  }
};
  const quiz = { q: `คำสั่ง WHERE gender="M" OR age > 20 จะแสดงข้อมูลใครบ้าง?`, opts: [{"val":"both","label":"ผู้ชายทุกคน (อายุเท่าไหร่ก็ได้) รวมกับ ทุกคนที่มีอายุมากกว่า 20 (เพศอะไรก็ได้)","correct":true},{"val":"and","label":"เฉพาะผู้ชายที่อายุมากกว่า 20 เท่านั้น"},{"val":"none","label":"เฉพาะผู้หญิงที่อายุน้อยกว่า 20"}] };

  return (
    <SQLSyntaxEngine 
      title="ตรรกะเชื่อมเงื่อนไข"
      description="เรียนรู้โครงสร้างคำสั่งหลักโดยการคลิกหรือนำเมาส์ไปชี้ที่ส่วนต่างๆ ของโค้ด"
      icon={TerminalSquare}
      codeParts={codeParts}
      explanations={explanations}
      quiz={quiz}
    />
  );
}
