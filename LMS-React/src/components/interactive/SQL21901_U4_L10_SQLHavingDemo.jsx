import React from 'react';
import SQLSyntaxEngine from './SQLSyntaxEngine';
import { TerminalSquare } from 'lucide-react';

export default function SQL21901_U4_L10_SQLHavingDemo() {
  const codeParts = [
  {
    "text": "HAVING ",
    "key": "having"
  },
  {
    "text": "WHERE vs HAVING ",
    "key": "diff"
  },
  {
    "text": "ใช้กับ Aggregate ",
    "key": "agg"
  },
  {
    "text": "ลำดับคำสั่ง ",
    "key": "order"
  }
];
  const explanations = {
  "having": {
    "title": "HAVING",
    "desc": "เหมือน WHERE แต่ใช้ \"กรองผลลัพธ์ของกลุ่ม\" หลังจากการ GROUP BY แล้ว",
    "color": "text-pink-500"
  },
  "diff": {
    "title": "WHERE vs HAVING",
    "desc": "WHERE กรองทีละแถว (ก่อนจัดกลุ่ม) / HAVING กรองทั้งกลุ่ม (หลังจัดกลุ่ม)",
    "color": "text-yellow-500"
  },
  "agg": {
    "title": "ใช้กับ Aggregate",
    "desc": "HAVING สามารถใส่เงื่อนไขที่มีฟังก์ชันได้ เช่น HAVING COUNT(*) > 5",
    "color": "text-emerald-400"
  },
  "order": {
    "title": "ลำดับคำสั่ง",
    "desc": "WHERE -> GROUP BY -> HAVING -> ORDER BY",
    "color": "text-sky-400"
  }
};
  const quiz = { q: `ถ้าต้องการหาแผนกที่มีผลรวมเงินเดือน (SUM) มากกว่า 1 ล้านบาท ต้องใช้คำสั่งใดสำหรับเงื่อนไขนี้?`, opts: [{"val":"having","label":"HAVING SUM(salary) > 1000000","correct":true},{"val":"where","label":"WHERE SUM(salary) > 1000000"},{"val":"where2","label":"WHERE salary > 1000000"}] };

  return (
    <SQLSyntaxEngine 
      title="การกรองกลุ่ม (HAVING)"
      description="เรียนรู้โครงสร้างคำสั่งหลักโดยการคลิกหรือนำเมาส์ไปชี้ที่ส่วนต่างๆ ของโค้ด"
      icon={TerminalSquare}
      codeParts={codeParts}
      explanations={explanations}
      quiz={quiz}
    />
  );
}
