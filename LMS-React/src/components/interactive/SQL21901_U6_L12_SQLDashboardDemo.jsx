import React from 'react';
import SQLSyntaxEngine from './SQLSyntaxEngine';
import { TerminalSquare } from 'lucide-react';

export default function SQL21901_U6_L12_SQLDashboardDemo() {
  const codeParts = [
  {
    "text": "Key Metrics ",
    "key": "metric"
  },
  {
    "text": "ข้อมูลสำหรับกราฟ ",
    "key": "chart"
  },
  {
    "text": "Top N ",
    "key": "top"
  },
  {
    "text": "ความเร็ว ",
    "key": "cache"
  }
];
  const explanations = {
  "metric": {
    "title": "Key Metrics",
    "desc": "เขียน Query ดึงตัวเลขสำคัญ เช่น ยอดขายรวมวันนี้, จำนวนผู้ใช้ใหม่",
    "color": "text-pink-500"
  },
  "chart": {
    "title": "ข้อมูลสำหรับกราฟ",
    "desc": "เตรียมข้อมูล 2 คอลัมน์ (เช่น ชื่อเดือน และ ยอดขาย) สำหรับวาดกราฟ",
    "color": "text-yellow-500"
  },
  "top": {
    "title": "Top N",
    "desc": "ใช้ ORDER BY ... DESC LIMIT 5 เพื่อหา สินค้าขายดี 5 อันดับแรก",
    "color": "text-emerald-400"
  },
  "cache": {
    "title": "ความเร็ว",
    "desc": "ข้อมูล Dashboard มักเรียกใช้บ่อย ควรสร้าง Materialized View หรือทำ Caching",
    "color": "text-sky-400"
  }
};
  const quiz = { q: `คำสั่งใดเหมาะสมที่สุดสำหรับหา "สินค้าที่ขายดีที่สุด 10 อันดับแรก" เพื่อแสดงบน Dashboard?`, opts: [{"val":"limit","label":"ORDER BY total_sales DESC LIMIT 10","correct":true},{"val":"top","label":"SELECT TOP 10 * FROM products"},{"val":"max","label":"SELECT MAX(total_sales) 10"}] };

  return (
    <SQLSyntaxEngine 
      title="การสร้างแดชบอร์ด"
      description="เรียนรู้โครงสร้างคำสั่งหลักโดยการคลิกหรือนำเมาส์ไปชี้ที่ส่วนต่างๆ ของโค้ด"
      icon={TerminalSquare}
      codeParts={codeParts}
      explanations={explanations}
      quiz={quiz}
    />
  );
}
