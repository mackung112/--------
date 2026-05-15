import React from 'react';
import SQLSyntaxEngine from './SQLSyntaxEngine';
import { TerminalSquare } from 'lucide-react';

export default function SQL21901_U6_L2_SQLFunctionTypes() {
  const codeParts = [
  {
    "text": "Scalar Functions ",
    "key": "scalar"
  },
  {
    "text": "Aggregate Functions ",
    "key": "agg"
  },
  {
    "text": "Math Functions ",
    "key": "math"
  },
  {
    "text": "Date/Time Functions ",
    "key": "date"
  }
];
  const explanations = {
  "scalar": {
    "title": "Scalar Functions",
    "desc": "รับค่า 1 แถว คืนค่า 1 แถว (เช่น เปลี่ยนตัวพิมพ์ใหญ่, หาความยาวตัวอักษร)",
    "color": "text-pink-500"
  },
  "agg": {
    "title": "Aggregate Functions",
    "desc": "รับค่าหลายแถว คืนค่าผลสรุป 1 แถว (เช่น หาผลรวม, ค่าเฉลี่ย, นับจำนวน)",
    "color": "text-yellow-500"
  },
  "math": {
    "title": "Math Functions",
    "desc": "ฟังก์ชันคณิตศาสตร์ เช่น ปัดเศษ (ROUND), หาค่าสมบูรณ์ (ABS)",
    "color": "text-emerald-400"
  },
  "date": {
    "title": "Date/Time Functions",
    "desc": "จัดการวันที่และเวลา เช่น ดึงเดือน (MONTH), หาวันปัจจุบัน (NOW)",
    "color": "text-sky-400"
  }
};
  const quiz = { q: `ฟังก์ชันใดจัดเป็น Aggregate Function (ทำงานกับข้อมูลหลายแถวแล้วสรุปเป็นแถวเดียว)?`, opts: [{"val":"agg","label":"SUM()","correct":true},{"val":"scalar","label":"UPPER()"},{"val":"math","label":"ROUND()"}] };

  return (
    <SQLSyntaxEngine 
      title="ประเภทฟังก์ชัน"
      description="เรียนรู้โครงสร้างคำสั่งหลักโดยการคลิกหรือนำเมาส์ไปชี้ที่ส่วนต่างๆ ของโค้ด"
      icon={TerminalSquare}
      codeParts={codeParts}
      explanations={explanations}
      quiz={quiz}
    />
  );
}
