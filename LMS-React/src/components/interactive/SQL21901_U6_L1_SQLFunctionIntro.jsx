import React from 'react';
import SQLSyntaxEngine from './SQLSyntaxEngine';
import { TerminalSquare } from 'lucide-react';

export default function SQL21901_U6_L1_SQLFunctionIntro() {
  const codeParts = [
  {
    "text": "Function คืออะไร? ",
    "key": "what"
  },
  {
    "text": "Built-in Functions ",
    "key": "built"
  },
  {
    "text": "Parameters ",
    "key": "param"
  },
  {
    "text": "Return Value ",
    "key": "return"
  }
];
  const explanations = {
  "what": {
    "title": "Function คืออะไร?",
    "desc": "โปรแกรมย่อยที่รับค่าเข้าไปประมวลผล แล้วส่งผลลัพธ์กลับออกมา",
    "color": "text-pink-500"
  },
  "built": {
    "title": "Built-in Functions",
    "desc": "ฟังก์ชันที่มีมาให้ใน MySQL อยู่แล้ว เช่น SUM, NOW, CONCAT",
    "color": "text-yellow-500"
  },
  "param": {
    "title": "Parameters",
    "desc": "ค่าที่ส่งเข้าไปในวงเล็บของฟังก์ชัน เช่น UPPER(\"hello\")",
    "color": "text-emerald-400"
  },
  "return": {
    "title": "Return Value",
    "desc": "ผลลัพธ์ที่ได้ออกมา เช่น UPPER(\"hello\") จะคืนค่า \"HELLO\"",
    "color": "text-sky-400"
  }
};
  const quiz = { q: `ข้อใดอธิบายการทำงานของฟังก์ชันใน SQL ได้ถูกต้อง?`, opts: [{"val":"ret","label":"รับค่า (Parameter) เข้าไปประมวลผลและส่งผลลัพธ์ (Return) กลับมา","correct":true},{"val":"var","label":"ใช้สำหรับเก็บข้อมูลชั่วคราว"},{"val":"table","label":"เป็นชื่อเรียกอีกอย่างของตาราง"}] };

  return (
    <SQLSyntaxEngine 
      title="หลักการของฟังก์ชัน"
      description="เรียนรู้โครงสร้างคำสั่งหลักโดยการคลิกหรือนำเมาส์ไปชี้ที่ส่วนต่างๆ ของโค้ด"
      icon={TerminalSquare}
      codeParts={codeParts}
      explanations={explanations}
      quiz={quiz}
    />
  );
}
