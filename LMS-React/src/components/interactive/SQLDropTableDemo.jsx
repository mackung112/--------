import React from 'react';
import SQLSyntaxEngine from './SQLSyntaxEngine';
import { TerminalSquare } from 'lucide-react';

export default function SQLDropTableDemo() {
  const codeParts = [
  {
    "text": "DROP TABLE ",
    "key": "drop"
  },
  {
    "text": "IF EXISTS ",
    "key": "if"
  },
  {
    "text": "ลบตารางหลักไม่ได้ ",
    "key": "fk"
  },
  {
    "text": "TRUNCATE vs DROP ",
    "key": "trunc"
  }
];
  const explanations = {
  "drop": {
    "title": "DROP TABLE",
    "desc": "DROP TABLE users;",
    "color": "text-pink-500"
  },
  "if": {
    "title": "IF EXISTS",
    "desc": "DROP TABLE IF EXISTS users; ป้องกัน Error ถ้าไม่มีตาราง",
    "color": "text-yellow-500"
  },
  "fk": {
    "title": "ลบตารางหลักไม่ได้",
    "desc": "ถ้าตารางอื่นเอา FK มาชี้ที่ตารางนี้ จะ Drop ไม่ได้จนกว่าจะเอา FK ออก",
    "color": "text-emerald-400"
  },
  "trunc": {
    "title": "TRUNCATE vs DROP",
    "desc": "TRUNCATE ลบเฉพาะข้อมูลแต่เก็บโครงสร้าง ส่วน DROP ลบทิ้งทั้งหมด",
    "color": "text-sky-400"
  }
};
  const quiz = { q: `ความแตกต่างระหว่าง DROP TABLE กับ TRUNCATE TABLE คืออะไร?`, opts: [{"val":"diff","label":"DROP ลบโครงสร้างและข้อมูลทิ้งทั้งหมด แต่ TRUNCATE ลบแค่ข้อมูล โครงสร้างยังอยู่","correct":true},{"val":"same","label":"เหมือนกันทุกประการ แค่เขียนต่างกัน"},{"val":"drop","label":"DROP ลบเฉพาะข้อมูล TRUNCATE ลบโครงสร้าง"}] };

  return (
    <SQLSyntaxEngine 
      title="ลบตาราง (DROP TABLE)"
      description="เรียนรู้โครงสร้างคำสั่งหลักโดยการคลิกหรือนำเมาส์ไปชี้ที่ส่วนต่างๆ ของโค้ด"
      icon={TerminalSquare}
      codeParts={codeParts}
      explanations={explanations}
      quiz={quiz}
    />
  );
}
