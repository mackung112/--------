import React from 'react';
import SQLSyntaxEngine from './SQLSyntaxEngine';
import { TerminalSquare } from 'lucide-react';

export default function SQL21901_U6_L10_SQLTrendAnalysis() {
  const codeParts = [
  {
    "text": "วิเคราะห์ตามเวลา ",
    "key": "time"
  },
  {
    "text": "Window Functions ",
    "key": "window"
  },
  {
    "text": "Year-over-Year ",
    "key": "yoy"
  },
  {
    "text": "Moving Average ",
    "key": "moving"
  }
];
  const explanations = {
  "time": {
    "title": "วิเคราะห์ตามเวลา",
    "desc": "GROUP BY YEAR(date), MONTH(date) ดูยอดขายรายเดือน",
    "color": "text-pink-500"
  },
  "window": {
    "title": "Window Functions",
    "desc": "(MySQL 8+) ใช้ฟังก์ชัน OVER() หาค่าผลรวมสะสม หรือจัดอันดับ (RANK)",
    "color": "text-yellow-500"
  },
  "yoy": {
    "title": "Year-over-Year",
    "desc": "เปรียบเทียบข้อมูลปีนี้กับปีก่อน",
    "color": "text-emerald-400"
  },
  "moving": {
    "title": "Moving Average",
    "desc": "หาค่าเฉลี่ยเคลื่อนที่เพื่อดูแนวโน้มลดความผันผวน",
    "color": "text-sky-400"
  }
};
  const quiz = { q: `ถ้าต้องการดูยอดขายรวม "แยกตามแต่ละเดือน" ในปี 2024 ต้องใช้เทคนิคใดร่วมกัน?`, opts: [{"val":"group","label":"WHERE YEAR(date)=2024 และ GROUP BY MONTH(date)","correct":true},{"val":"order","label":"ORDER BY MONTH(date)"},{"val":"sum","label":"SUM(MONTH(date))"}] };

  return (
    <SQLSyntaxEngine 
      title="การวิเคราะห์แนวโน้ม"
      description="เรียนรู้โครงสร้างคำสั่งหลักโดยการคลิกหรือนำเมาส์ไปชี้ที่ส่วนต่างๆ ของโค้ด"
      icon={TerminalSquare}
      codeParts={codeParts}
      explanations={explanations}
      quiz={quiz}
    />
  );
}
