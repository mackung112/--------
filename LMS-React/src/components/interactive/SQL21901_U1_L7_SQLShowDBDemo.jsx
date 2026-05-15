import React from 'react';
import SQLSyntaxEngine from './SQLSyntaxEngine';
import { TerminalSquare } from 'lucide-react';

export default function SQL21901_U1_L7_SQLShowDBDemo() {
  const codeParts = [
  {
    "text": "SHOW DATABASES ",
    "key": "show"
  },
  {
    "text": "USE database_name ",
    "key": "use"
  },
  {
    "text": "SHOW TABLES ",
    "key": "tables"
  },
  {
    "text": "DESCRIBE table_name ",
    "key": "desc"
  }
];
  const explanations = {
  "show": {
    "title": "SHOW DATABASES",
    "desc": "แสดงรายชื่อฐานข้อมูลทั้งหมดบนเซิร์ฟเวอร์",
    "color": "text-pink-500"
  },
  "use": {
    "title": "USE database_name",
    "desc": "เลือกฐานข้อมูลที่ต้องการใช้งาน",
    "color": "text-yellow-500"
  },
  "tables": {
    "title": "SHOW TABLES",
    "desc": "แสดงรายชื่อตารางทั้งหมดในฐานข้อมูลปัจจุบัน",
    "color": "text-emerald-400"
  },
  "desc": {
    "title": "DESCRIBE table_name",
    "desc": "แสดงโครงสร้างคอลัมน์ของตาราง",
    "color": "text-sky-400"
  }
};
  const quiz = { q: `คำสั่งใดใช้ดูรายชื่อฐานข้อมูลทั้งหมด?`, opts: [{"val":"show","label":"SHOW DATABASES;","correct":true},{"val":"list","label":"LIST DATABASES;"},{"val":"get","label":"GET DATABASES;"}] };

  return (
    <SQLSyntaxEngine 
      title="SHOW DATABASES"
      description="เรียนรู้โครงสร้างคำสั่งหลักโดยการคลิกหรือนำเมาส์ไปชี้ที่ส่วนต่างๆ ของโค้ด"
      icon={TerminalSquare}
      codeParts={codeParts}
      explanations={explanations}
      quiz={quiz}
    />
  );
}
