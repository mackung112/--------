import React from 'react';
import SQLSyntaxEngine from './SQLSyntaxEngine';
import { TerminalSquare } from 'lucide-react';

export default function SQL21901_U1_L6_SQLCreateDBDemo() {
  const codeParts = [
  {
    "text": "Syntax ",
    "key": "syntax"
  },
  {
    "text": "Character Set ",
    "key": "charset"
  },
  {
    "text": "Collation ",
    "key": "coll"
  },
  {
    "text": "USE Database ",
    "key": "use"
  }
];
  const explanations = {
  "syntax": {
    "title": "Syntax",
    "desc": "CREATE DATABASE ชื่อฐานข้อมูล;",
    "color": "text-pink-500"
  },
  "charset": {
    "title": "Character Set",
    "desc": "กำหนดภาษาที่ใช้ เช่น utf8mb4 สำหรับภาษาไทย",
    "color": "text-yellow-500"
  },
  "coll": {
    "title": "Collation",
    "desc": "กฎการเรียงลำดับตัวอักษร เช่น utf8mb4_unicode_ci",
    "color": "text-emerald-400"
  },
  "use": {
    "title": "USE Database",
    "desc": "เลือกฐานข้อมูลที่จะใช้งาน ด้วยคำสั่ง USE",
    "color": "text-sky-400"
  }
};

  return (
    <SQLSyntaxEngine 
      title="CREATE DATABASE"
      description="เรียนรู้โครงสร้างคำสั่งหลักโดยการคลิกหรือนำเมาส์ไปชี้ที่ส่วนต่างๆ ของโค้ด"
      icon={TerminalSquare}
      codeParts={codeParts}
      explanations={explanations}
    />
  );
}
