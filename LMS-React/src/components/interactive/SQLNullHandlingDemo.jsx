import React from 'react';
import SQLSyntaxEngine from './SQLSyntaxEngine';
import { TerminalSquare } from 'lucide-react';

export default function SQLNullHandlingDemo() {
  const codeParts = [
  {
    "text": "NULL คืออะไร? ",
    "key": "def"
  },
  {
    "text": "การปล่อยให้เป็น NULL ",
    "key": "insert"
  },
  {
    "text": "การตรวจสอบ ",
    "key": "check"
  },
  {
    "text": "การคำนวณ ",
    "key": "math"
  }
];
  const explanations = {
  "def": {
    "title": "NULL คืออะไร?",
    "desc": "NULL หมายถึง \"ไม่มีข้อมูล\" หรือ \"ไม่ระบุค่า\" ไม่ใช่ 0 และไม่ใช่ข้อความว่าง",
    "color": "text-pink-500"
  },
  "insert": {
    "title": "การปล่อยให้เป็น NULL",
    "desc": "ถ้าไม่ระบุค่าลงในคอลัมน์ที่อนุญาตให้เป็น NULL ค่าจะเป็น NULL อัตโนมัติ",
    "color": "text-yellow-500"
  },
  "check": {
    "title": "การตรวจสอบ",
    "desc": "ห้ามใช้ = NULL ต้องใช้ IS NULL หรือ IS NOT NULL เสมอ",
    "color": "text-emerald-400"
  },
  "math": {
    "title": "การคำนวณ",
    "desc": "ตัวเลขใดๆ คำนวณกับ NULL จะได้ผลลัพธ์เป็น NULL",
    "color": "text-sky-400"
  }
};
  const quiz = { q: `ถ้าต้องการค้นหาพนักงานที่ "ไม่มีข้อมูลเบอร์โทรศัพท์" ต้องใช้เงื่อนไขใด?`, opts: [{"val":"isnull","label":"WHERE phone IS NULL","correct":true},{"val":"eqnull","label":"WHERE phone = NULL"},{"val":"empty","label":"WHERE phone = \"\""}] };

  return (
    <SQLSyntaxEngine 
      title="การจัดการค่า NULL"
      description="เรียนรู้โครงสร้างคำสั่งหลักโดยการคลิกหรือนำเมาส์ไปชี้ที่ส่วนต่างๆ ของโค้ด"
      icon={TerminalSquare}
      codeParts={codeParts}
      explanations={explanations}
      quiz={quiz}
    />
  );
}
