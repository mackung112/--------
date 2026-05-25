import React from 'react';
import SQLSyntaxEngine from './SQLSyntaxEngine';
import { TerminalSquare } from 'lucide-react';

export default function SQL21901_U1_L10_SQLAlterDBDemo() {
  const codeParts = [
  {
    "text": "เปลี่ยน Character Set ",
    "key": "charset"
  },
  {
    "text": "เปลี่ยน Collation ",
    "key": "coll"
  },
  {
    "text": "เปลี่ยนทั้งคู่ ",
    "key": "both"
  }
];
  const explanations = {
  "charset": {
    "title": "เปลี่ยน Character Set",
    "desc": "ALTER DATABASE mydb CHARACTER SET utf8mb4;",
    "color": "text-pink-500"
  },
  "coll": {
    "title": "เปลี่ยน Collation",
    "desc": "ALTER DATABASE mydb COLLATE utf8mb4_unicode_ci;",
    "color": "text-yellow-500"
  },
  "both": {
    "title": "เปลี่ยนทั้งคู่",
    "desc": "ระบุทั้ง CHARACTER SET และ COLLATE พร้อมกัน",
    "color": "text-emerald-400"
  }
};

  return (
    <SQLSyntaxEngine 
      title="ALTER DATABASE"
      description="เรียนรู้โครงสร้างคำสั่งหลักโดยการคลิกหรือนำเมาส์ไปชี้ที่ส่วนต่างๆ ของโค้ด"
      icon={TerminalSquare}
      codeParts={codeParts}
      explanations={explanations}
    />
  );
}
