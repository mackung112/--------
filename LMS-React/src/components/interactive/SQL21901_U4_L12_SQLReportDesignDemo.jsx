import React from 'react';
import SQLSyntaxEngine from './SQLSyntaxEngine';
import { TerminalSquare } from 'lucide-react';

export default function SQL21901_U4_L12_SQLReportDesignDemo() {
  const codeParts = [
  {
    "text": "เข้าใจความต้องการ ",
    "key": "req"
  },
  {
    "text": "เขียน Query สรุป ",
    "key": "query"
  },
  {
    "text": "จัดรูปแบบด้วย SQL ",
    "key": "format"
  },
  {
    "text": "สร้างเป็น VIEW ",
    "key": "view"
  }
];
  const explanations = {
  "req": {
    "title": "เข้าใจความต้องการ",
    "desc": "ใครเป็นคนดูรายงาน? เขาต้องการรู้อะไร?",
    "color": "text-pink-500"
  },
  "query": {
    "title": "เขียน Query สรุป",
    "desc": "ใช้ JOIN, GROUP BY, Aggregate ให้ดึงเฉพาะผลสรุป (ไม่ดึง Data ดิบไปคำนวณข้างนอก)",
    "color": "text-yellow-500"
  },
  "format": {
    "title": "จัดรูปแบบด้วย SQL",
    "desc": "ใช้ DATE_FORMAT, CONCAT, CAST เพื่อให้ผลลัพธ์พร้อมใช้งาน",
    "color": "text-emerald-400"
  },
  "view": {
    "title": "สร้างเป็น VIEW",
    "desc": "ถ้า Query ยาวมาก ให้บันทึกเป็น VIEW เพื่อเรียกใช้ง่ายๆ เหมือนตารางปกติ",
    "color": "text-sky-400"
  }
};
  const quiz = { q: `หลักการที่ดีในการทำรายงานด้วยฐานข้อมูลคืออะไร?`, opts: [{"val":"db","label":"ให้ Database ช่วยคำนวณผลสรุปและจัดกลุ่มมาให้เสร็จสรรพผ่าน Query","correct":true},{"val":"raw","label":"SELECT * ดึงข้อมูลดิบทั้งหมด แล้วค่อยไปวนลูปคำนวณในโปรแกรม"},{"val":"view","label":"ไม่ต้องออกแบบ เขียน SQL แบบสุ่มๆ ไป"}] };

  return (
    <SQLSyntaxEngine 
      title="การออกแบบรายงาน"
      description="เรียนรู้โครงสร้างคำสั่งหลักโดยการคลิกหรือนำเมาส์ไปชี้ที่ส่วนต่างๆ ของโค้ด"
      icon={TerminalSquare}
      codeParts={codeParts}
      explanations={explanations}
      quiz={quiz}
    />
  );
}
