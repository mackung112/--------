import React from 'react';
import SQLSyntaxEngine from './SQLSyntaxEngine';
import { TerminalSquare } from 'lucide-react';

export default function SQL21901_U4_L11_SQLUnionDemo() {
  const codeParts = [
  {
    "text": "UNION ",
    "key": "union"
  },
  {
    "text": "UNION ALL ",
    "key": "all"
  },
  {
    "text": "จำนวนคอลัมน์ต้องเท่ากัน ",
    "key": "rule1"
  },
  {
    "text": "ประเภทข้อมูลต้องเหมือนกัน ",
    "key": "rule2"
  }
];
  const explanations = {
  "union": {
    "title": "UNION",
    "desc": "นำผลลัพธ์ของ SELECT 2 อันมาต่อกัน (บน-ล่าง) โดยตัดแถวที่ซ้ำออก",
    "color": "text-pink-500"
  },
  "all": {
    "title": "UNION ALL",
    "desc": "เอามาต่อกันทั้งหมด ไม่ตัดตัวที่ซ้ำ (เร็วกว่า UNION ธรรมดา)",
    "color": "text-yellow-500"
  },
  "rule1": {
    "title": "จำนวนคอลัมน์ต้องเท่ากัน",
    "desc": "SELECT A ต้องมีจำนวนคอลัมน์เท่ากับ SELECT B",
    "color": "text-emerald-400"
  },
  "rule2": {
    "title": "ประเภทข้อมูลต้องเหมือนกัน",
    "desc": "คอลัมน์ที่ตำแหน่งเดียวกัน ต้องเป็น Data Type เดียวกันหรือเข้ากันได้",
    "color": "text-sky-400"
  }
};
  const quiz = { q: `ความแตกต่างของ UNION กับ JOIN คืออะไร?`, opts: [{"val":"diff","label":"UNION เอาข้อมูลมาต่อกัน \"บน-ล่าง\" แต่ JOIN เอามาต่อกัน \"ซ้าย-ขวา\"","correct":true},{"val":"same","label":"ไม่ต่างกันเลย เป็นชื่อเรียกเฉยๆ"},{"val":"rev","label":"UNION ต่อซ้ายขวา JOIN ต่อบนล่าง"}] };

  return (
    <SQLSyntaxEngine 
      title="การรวมผลลัพธ์ (UNION)"
      description="เรียนรู้โครงสร้างคำสั่งหลักโดยการคลิกหรือนำเมาส์ไปชี้ที่ส่วนต่างๆ ของโค้ด"
      icon={TerminalSquare}
      codeParts={codeParts}
      explanations={explanations}
      quiz={quiz}
    />
  );
}
