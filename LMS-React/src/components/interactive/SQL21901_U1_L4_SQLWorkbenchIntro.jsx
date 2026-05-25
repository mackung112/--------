import React from 'react';
import SQLSyntaxEngine from './SQLSyntaxEngine';
import { TerminalSquare } from 'lucide-react';

export default function SQL21901_U1_L4_SQLWorkbenchIntro() {
  const codeParts = [
  {
    "text": "SQL Editor ",
    "key": "editor"
  },
  {
    "text": "Schema Navigator ",
    "key": "schema"
  },
  {
    "text": "Result Grid ",
    "key": "result"
  },
  {
    "text": "Data Modeler ",
    "key": "model"
  }
];
  const explanations = {
  "editor": {
    "title": "SQL Editor",
    "desc": "เขียนและรัน SQL Query ได้โดยตรง มี Syntax Highlighting",
    "color": "text-pink-500"
  },
  "schema": {
    "title": "Schema Navigator",
    "desc": "ดูโครงสร้างฐานข้อมูล ตาราง คอลัมน์ ได้ง่าย",
    "color": "text-yellow-500"
  },
  "result": {
    "title": "Result Grid",
    "desc": "แสดงผลลัพธ์จากการรัน Query ในรูปแบบตาราง",
    "color": "text-emerald-400"
  },
  "model": {
    "title": "Data Modeler",
    "desc": "ออกแบบ ER Diagram แบบ drag-and-drop",
    "color": "text-sky-400"
  }
};

  return (
    <SQLSyntaxEngine 
      title="แนะนำ MySQL Workbench"
      description="เรียนรู้โครงสร้างคำสั่งหลักโดยการคลิกหรือนำเมาส์ไปชี้ที่ส่วนต่างๆ ของโค้ด"
      icon={TerminalSquare}
      codeParts={codeParts}
      explanations={explanations}
    />
  );
}
