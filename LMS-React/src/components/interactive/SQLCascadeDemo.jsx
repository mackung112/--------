import React from 'react';
import SQLSyntaxEngine from './SQLSyntaxEngine';
import { TerminalSquare } from 'lucide-react';

export default function SQLCascadeDemo() {
  const codeParts = [
  {
    "text": "RESTRICT (ค่าเริ่มต้น) ",
    "key": "res"
  },
  {
    "text": "CASCADE ",
    "key": "cas"
  },
  {
    "text": "SET NULL ",
    "key": "null"
  },
  {
    "text": "ON UPDATE ",
    "key": "update"
  }
];
  const explanations = {
  "res": {
    "title": "RESTRICT (ค่าเริ่มต้น)",
    "desc": "ห้ามลบข้อมูลในตารางหลัก ถ้ายังมีข้อมูลในตารางรองอ้างอิงอยู่",
    "color": "text-pink-500"
  },
  "cas": {
    "title": "CASCADE",
    "desc": "ถ้าลบข้อมูลตารางหลัก ให้ลบข้อมูลตารางรองที่เชื่อมกันทิ้งด้วย",
    "color": "text-yellow-500"
  },
  "null": {
    "title": "SET NULL",
    "desc": "ถ้าลบตารางหลัก ให้ข้อมูลตารางรองที่เป็น FK เปลี่ยนค่าเป็น NULL",
    "color": "text-emerald-400"
  },
  "update": {
    "title": "ON UPDATE",
    "desc": "สามารถตั้งค่า ON UPDATE CASCADE เวลาแก้ PK ให้ FK เปลี่ยนตามได้",
    "color": "text-sky-400"
  }
};
  const quiz = { q: `ถ้าตั้งค่า ON DELETE CASCADE จะเกิดอะไรขึ้นเมื่อลบข้อมูลลูกค้า (ตารางหลัก)?`, opts: [{"val":"cas","label":"ข้อมูลการสั่งซื้อ (ตารางรอง) ของลูกค้านั้นจะถูกลบไปด้วยอัตโนมัติ","correct":true},{"val":"err","label":"เกิด Error ไม่สามารถลบได้"},{"val":"null","label":"รหัสลูกค้าในการสั่งซื้อจะกลายเป็น NULL"}] };

  return (
    <SQLSyntaxEngine 
      title="ผลกระทบการลบ (CASCADE)"
      description="เรียนรู้โครงสร้างคำสั่งหลักโดยการคลิกหรือนำเมาส์ไปชี้ที่ส่วนต่างๆ ของโค้ด"
      icon={TerminalSquare}
      codeParts={codeParts}
      explanations={explanations}
      quiz={quiz}
    />
  );
}
