import React from 'react';
import SQLSyntaxEngine from './SQLSyntaxEngine';
import { TerminalSquare } from 'lucide-react';

export default function SQL21901_U6_L7_SQLConcatDemo() {
  const codeParts = [
  {
    "text": "CONCAT() ",
    "key": "concat"
  },
  {
    "text": "CONCAT_WS() ",
    "key": "ws"
  },
  {
    "text": "ระวัง NULL ",
    "key": "null"
  },
  {
    "text": "จัดรูปแบบผลลัพธ์ ",
    "key": "format"
  }
];
  const explanations = {
  "concat": {
    "title": "CONCAT()",
    "desc": "เชื่อมข้อความหรือคอลัมน์เข้าด้วยกัน เช่น CONCAT(fname, \" \", lname)",
    "color": "text-pink-500"
  },
  "ws": {
    "title": "CONCAT_WS()",
    "desc": "With Separator: เชื่อมโดยมีตัวคั่น เช่น CONCAT_WS(\",\", \"A\", \"B\") -> \"A,B\"",
    "color": "text-yellow-500"
  },
  "null": {
    "title": "ระวัง NULL",
    "desc": "ถ้าใช้ CONCAT ธรรมดา แล้วมีค่าใดเป็น NULL ผลลัพธ์จะเป็น NULL ทั้งหมด!",
    "color": "text-emerald-400"
  },
  "format": {
    "title": "จัดรูปแบบผลลัพธ์",
    "desc": "นิยมใช้สร้าง Full Name หรือที่อยู่แบบเต็มเพื่อไปแสดงผล",
    "color": "text-sky-400"
  }
};
  const quiz = { q: `ถ้า firstname คือ "John" และ lastname คือ NULL ผลลัพธ์ของ CONCAT(firstname, lastname) คืออะไร?`, opts: [{"val":"null","label":"NULL","correct":true},{"val":"john","label":"\"John\""},{"val":"space","label":"\"John \""}] };

  return (
    <SQLSyntaxEngine 
      title="การเชื่อมข้อความ (CONCAT)"
      description="เรียนรู้โครงสร้างคำสั่งหลักโดยการคลิกหรือนำเมาส์ไปชี้ที่ส่วนต่างๆ ของโค้ด"
      icon={TerminalSquare}
      codeParts={codeParts}
      explanations={explanations}
      quiz={quiz}
    />
  );
}
