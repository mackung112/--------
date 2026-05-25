import React from 'react';
import SQLSyntaxEngine from './SQLSyntaxEngine';
import { TerminalSquare } from 'lucide-react';

export default function SQL21901_U1_L12_SQLRiskManagement() {
  const codeParts = [
  {
    "text": "1. ระบุความเสี่ยง ",
    "key": "id"
  },
  {
    "text": "2. ประเมินระดับ ",
    "key": "assess"
  },
  {
    "text": "3. วางแผนป้องกัน ",
    "key": "mitigate"
  },
  {
    "text": "4. ติดตาม ",
    "key": "monitor"
  }
];
  const explanations = {
  "id": {
    "title": "1. ระบุความเสี่ยง",
    "desc": "มีอะไรที่อาจผิดพลาดได้บ้าง?",
    "color": "text-pink-500"
  },
  "assess": {
    "title": "2. ประเมินระดับ",
    "desc": "ความเสียหายรุนแรงแค่ไหน? เกิดบ่อยไหม?",
    "color": "text-yellow-500"
  },
  "mitigate": {
    "title": "3. วางแผนป้องกัน",
    "desc": "Backup, Test, สิทธิ์การเข้าถึง",
    "color": "text-emerald-400"
  },
  "monitor": {
    "title": "4. ติดตาม",
    "desc": "ตรวจสอบ Log และ Audit เป็นประจำ",
    "color": "text-sky-400"
  }
};

  return (
    <SQLSyntaxEngine 
      title="การจัดการความเสี่ยง"
      description="เรียนรู้โครงสร้างคำสั่งหลักโดยการคลิกหรือนำเมาส์ไปชี้ที่ส่วนต่างๆ ของโค้ด"
      icon={TerminalSquare}
      codeParts={codeParts}
      explanations={explanations}
    />
  );
}
