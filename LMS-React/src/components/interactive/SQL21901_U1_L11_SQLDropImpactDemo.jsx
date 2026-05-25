import React from 'react';
import SQLSyntaxEngine from './SQLSyntaxEngine';
import { TerminalSquare } from 'lucide-react';

export default function SQL21901_U1_L11_SQLDropImpactDemo() {
  const codeParts = [
  {
    "text": "ลบทุกอย่าง ",
    "key": "all"
  },
  {
    "text": "กู้คืนไม่ได้ ",
    "key": "noundo"
  },
  {
    "text": "FOREIGN KEY ",
    "key": "fk"
  },
  {
    "text": "แอปพลิเคชัน ",
    "key": "app"
  }
];
  const explanations = {
  "all": {
    "title": "ลบทุกอย่าง",
    "desc": "DROP DATABASE ลบตาราง ข้อมูล View Procedure ทั้งหมด",
    "color": "text-pink-500"
  },
  "noundo": {
    "title": "กู้คืนไม่ได้",
    "desc": "เมื่อ DROP แล้วจะกู้คืนไม่ได้ ยกเว้นมี Backup",
    "color": "text-yellow-500"
  },
  "fk": {
    "title": "FOREIGN KEY",
    "desc": "ถ้าตารางอื่นอ้างอิงอยู่ อาจ Drop ไม่ได้",
    "color": "text-emerald-400"
  },
  "app": {
    "title": "แอปพลิเคชัน",
    "desc": "แอปที่เชื่อมต่อจะ Error ทันที",
    "color": "text-sky-400"
  }
};

  return (
    <SQLSyntaxEngine 
      title="ผลกระทบจากการลบ"
      description="เรียนรู้โครงสร้างคำสั่งหลักโดยการคลิกหรือนำเมาส์ไปชี้ที่ส่วนต่างๆ ของโค้ด"
      icon={TerminalSquare}
      codeParts={codeParts}
      explanations={explanations}
    />
  );
}
