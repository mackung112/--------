import React from 'react';
import SQLSyntaxEngine from './SQLSyntaxEngine';
import { TerminalSquare } from 'lucide-react';

export default function SQL21901_U6_L9_SQLCaseIfDemo() {
  const codeParts = [
  {
    "text": "IF() ",
    "key": "if"
  },
  {
    "text": "CASE WHEN ",
    "key": "case"
  },
  {
    "text": "ตัวอย่าง CASE ",
    "key": "case_ex"
  },
  {
    "text": "IFNULL() ",
    "key": "nullif"
  }
];
  const explanations = {
  "if": {
    "title": "IF()",
    "desc": "IF(เงื่อนไข, ค่าถ้าจริง, ค่าถ้าเท็จ) (เฉพาะ MySQL)",
    "color": "text-pink-500"
  },
  "case": {
    "title": "CASE WHEN",
    "desc": "ใช้ได้หลายเงื่อนไข (เป็นมาตรฐาน SQL)",
    "color": "text-yellow-500"
  },
  "case_ex": {
    "title": "ตัวอย่าง CASE",
    "desc": "CASE WHEN score >= 50 THEN \"Pass\" ELSE \"Fail\" END",
    "color": "text-emerald-400"
  },
  "nullif": {
    "title": "IFNULL()",
    "desc": "IFNULL(col, \"ไม่มีค่า\") ถ้า col เป็น NULL ให้ใช้คำว่า \"ไม่มีค่า\" แทน",
    "color": "text-sky-400"
  }
};
  const quiz = { q: `ข้อใดคือโครงสร้างพื้นฐานที่ถูกต้องของ CASE statement?`, opts: [{"val":"case","label":"CASE WHEN condition THEN result ELSE result END","correct":true},{"val":"if","label":"IF condition THEN result ELSE result END IF"},{"val":"switch","label":"SWITCH condition CASE result END"}] };

  return (
    <SQLSyntaxEngine 
      title="ฟังก์ชันเงื่อนไข (CASE, IF)"
      description="เรียนรู้โครงสร้างคำสั่งหลักโดยการคลิกหรือนำเมาส์ไปชี้ที่ส่วนต่างๆ ของโค้ด"
      icon={TerminalSquare}
      codeParts={codeParts}
      explanations={explanations}
      quiz={quiz}
    />
  );
}
