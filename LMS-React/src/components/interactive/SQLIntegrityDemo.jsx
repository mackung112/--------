import React from 'react';
import SQLSyntaxEngine from './SQLSyntaxEngine';
import { TerminalSquare } from 'lucide-react';

export default function SQLIntegrityDemo() {
  const codeParts = [
  {
    "text": "Entity Integrity ",
    "key": "entity"
  },
  {
    "text": "Referential Integrity ",
    "key": "ref"
  },
  {
    "text": "Domain Integrity ",
    "key": "domain"
  },
  {
    "text": "Transaction ",
    "key": "tx"
  }
];
  const explanations = {
  "entity": {
    "title": "Entity Integrity",
    "desc": "การใช้ PRIMARY KEY รับประกันว่าแต่ละแถวมีตัวตนและไม่ซ้ำกัน",
    "color": "text-pink-500"
  },
  "ref": {
    "title": "Referential Integrity",
    "desc": "การใช้ FOREIGN KEY รับประกันว่าความสัมพันธ์ระหว่างตารางถูกต้องเสมอ",
    "color": "text-yellow-500"
  },
  "domain": {
    "title": "Domain Integrity",
    "desc": "ข้อมูลที่ใส่ต้องตรงกับ Data Type และ Constraints (เช่น ห้ามอายุติดลบ)",
    "color": "text-emerald-400"
  },
  "tx": {
    "title": "Transaction",
    "desc": "รับประกันว่าการเปลี่ยนแปลงหลายขั้นตอนจะสำเร็จทั้งหมด หรือล้มเหลวทั้งหมด",
    "color": "text-sky-400"
  }
};
  const quiz = { q: `การที่เราไม่สามารถเพิ่มรหัสแผนกที่ "ไม่มีอยู่จริง" ลงในตารางพนักงานได้ เป็นการรักษาความถูกต้องประเภทใด?`, opts: [{"val":"ref","label":"Referential Integrity (ความสมบูรณ์เชิงอ้างอิง ผ่าน Foreign Key)","correct":true},{"val":"entity","label":"Entity Integrity (ความสมบูรณ์ของเอนทิตี)"},{"val":"domain","label":"Domain Integrity (ความสมบูรณ์ของโดเมน)"}] };

  return (
    <SQLSyntaxEngine 
      title="การรักษาความถูกต้องของข้อมูล"
      description="เรียนรู้โครงสร้างคำสั่งหลักโดยการคลิกหรือนำเมาส์ไปชี้ที่ส่วนต่างๆ ของโค้ด"
      icon={TerminalSquare}
      codeParts={codeParts}
      explanations={explanations}
      quiz={quiz}
    />
  );
}
