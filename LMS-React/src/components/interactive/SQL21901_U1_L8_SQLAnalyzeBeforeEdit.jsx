import React from 'react';
import SQLSyntaxEngine from './SQLSyntaxEngine';
import { TerminalSquare } from 'lucide-react';

export default function SQL21901_U1_L8_SQLAnalyzeBeforeEdit() {
  const codeParts = [
  {
    "text": "1. ตรวจสอบข้อมูลปัจจุบัน ",
    "key": "check"
  },
  {
    "text": "2. ประเมินผลกระทบ ",
    "key": "impact"
  },
  {
    "text": "3. สำรองข้อมูล ",
    "key": "backup"
  },
  {
    "text": "4. ทดสอบก่อนรัน ",
    "key": "test"
  }
];
  const explanations = {
  "check": {
    "title": "1. ตรวจสอบข้อมูลปัจจุบัน",
    "desc": "ใช้ SELECT ดูข้อมูลก่อนแก้ไขเสมอ",
    "color": "text-pink-500"
  },
  "impact": {
    "title": "2. ประเมินผลกระทบ",
    "desc": "ข้อมูลนี้ถูกอ้างอิงจากที่อื่นหรือไม่?",
    "color": "text-yellow-500"
  },
  "backup": {
    "title": "3. สำรองข้อมูล",
    "desc": "Backup ก่อนแก้ไขทุกครั้ง",
    "color": "text-emerald-400"
  },
  "test": {
    "title": "4. ทดสอบก่อนรัน",
    "desc": "ลองรันบน Database ทดสอบก่อน",
    "color": "text-sky-400"
  }
};

  return (
    <SQLSyntaxEngine 
      title="วิเคราะห์ก่อนแก้ไข"
      description="เรียนรู้โครงสร้างคำสั่งหลักโดยการคลิกหรือนำเมาส์ไปชี้ที่ส่วนต่างๆ ของโค้ด"
      icon={TerminalSquare}
      codeParts={codeParts}
      explanations={explanations}
    />
  );
}
