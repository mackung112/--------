import React from 'react';
import SQLSyntaxEngine from './SQLSyntaxEngine';
import { TerminalSquare } from 'lucide-react';

export default function SQL21901_U1_L9_SQLBackupDemo() {
  const codeParts = [
  {
    "text": "mysqldump ",
    "key": "dump"
  },
  {
    "text": "Workbench Export ",
    "key": "wb"
  },
  {
    "text": "Scheduled Backup ",
    "key": "schedule"
  },
  {
    "text": "Restore ",
    "key": "restore"
  }
];
  const explanations = {
  "dump": {
    "title": "mysqldump",
    "desc": "คำสั่ง CLI สำหรับ export ฐานข้อมูลเป็นไฟล์ .sql",
    "color": "text-pink-500"
  },
  "wb": {
    "title": "Workbench Export",
    "desc": "ใช้ MySQL Workbench → Server → Data Export",
    "color": "text-yellow-500"
  },
  "schedule": {
    "title": "Scheduled Backup",
    "desc": "ตั้ง Cron Job ให้ backup อัตโนมัติตามเวลา",
    "color": "text-emerald-400"
  },
  "restore": {
    "title": "Restore",
    "desc": "ใช้ mysql < backup.sql เพื่อกู้คืนข้อมูล",
    "color": "text-sky-400"
  }
};
  const quiz = { q: `คำสั่งใดใช้สำรองฐานข้อมูล MySQL จาก CLI?`, opts: [{"val":"dump","label":"mysqldump -u root -p mydb > backup.sql","correct":true},{"val":"cp","label":"cp mydb backup.sql"},{"val":"export","label":"EXPORT DATABASE mydb;"}] };

  return (
    <SQLSyntaxEngine 
      title="การสำรองข้อมูล (Backup)"
      description="เรียนรู้โครงสร้างคำสั่งหลักโดยการคลิกหรือนำเมาส์ไปชี้ที่ส่วนต่างๆ ของโค้ด"
      icon={TerminalSquare}
      codeParts={codeParts}
      explanations={explanations}
      quiz={quiz}
    />
  );
}
