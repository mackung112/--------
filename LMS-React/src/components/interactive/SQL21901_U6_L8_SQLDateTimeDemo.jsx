import React from 'react';
import SQLSyntaxEngine from './SQLSyntaxEngine';
import { TerminalSquare } from 'lucide-react';

export default function SQL21901_U6_L8_SQLDateTimeDemo() {
  const codeParts = [
  {
    "text": "NOW() / CURDATE() ",
    "key": "now"
  },
  {
    "text": "ดึงบางส่วน ",
    "key": "extract"
  },
  {
    "text": "บวก/ลบวันที่ ",
    "key": "math"
  },
  {
    "text": "หาความต่าง ",
    "key": "diff"
  }
];
  const explanations = {
  "now": {
    "title": "NOW() / CURDATE()",
    "desc": "ดึงวันเวลาปัจจุบัน (NOW) หรือดึงแค่วันที่ (CURDATE)",
    "color": "text-pink-500"
  },
  "extract": {
    "title": "ดึงบางส่วน",
    "desc": "YEAR(date), MONTH(date), DAY(date)",
    "color": "text-yellow-500"
  },
  "math": {
    "title": "บวก/ลบวันที่",
    "desc": "DATE_ADD(date, INTERVAL 7 DAY) (บวกไปอีก 7 วัน)",
    "color": "text-emerald-400"
  },
  "diff": {
    "title": "หาความต่าง",
    "desc": "DATEDIFF(date1, date2) หาวันที่ห่างกันกี่วัน",
    "color": "text-sky-400"
  }
};
  const quiz = { q: `ถ้าต้องการหาวันที่อีก 30 วันข้างหน้าจากวันนี้ ควรใช้คำสั่งใด?`, opts: [{"val":"add","label":"DATE_ADD(CURDATE(), INTERVAL 30 DAY)","correct":true},{"val":"plus","label":"CURDATE() + 30"},{"val":"next","label":"NEXT_MONTH(CURDATE())"}] };

  return (
    <SQLSyntaxEngine 
      title="การจัดการวันที่และเวลา"
      description="เรียนรู้โครงสร้างคำสั่งหลักโดยการคลิกหรือนำเมาส์ไปชี้ที่ส่วนต่างๆ ของโค้ด"
      icon={TerminalSquare}
      codeParts={codeParts}
      explanations={explanations}
      quiz={quiz}
    />
  );
}
