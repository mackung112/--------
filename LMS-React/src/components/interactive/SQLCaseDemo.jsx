import React from 'react';
import SQLSyntaxEngine from './SQLSyntaxEngine';
import { TerminalSquare } from 'lucide-react';

export default function SQLCaseDemo() {
  const codeParts = [
  {
    "text": "UPPER() ",
    "key": "up"
  },
  {
    "text": "LOWER() ",
    "key": "low"
  },
  {
    "text": "ใช้ค้นหาไม่สน Case ",
    "key": "search"
  },
  {
    "text": "จัดระเบียบข้อมูล ",
    "key": "clean"
  }
];
  const explanations = {
  "up": {
    "title": "UPPER()",
    "desc": "แปลงข้อความทั้งหมดเป็นตัวพิมพ์ใหญ่ (เช่น john -> JOHN)",
    "color": "text-pink-500"
  },
  "low": {
    "title": "LOWER()",
    "desc": "แปลงข้อความทั้งหมดเป็นตัวพิมพ์เล็ก (เช่น SQL -> sql)",
    "color": "text-yellow-500"
  },
  "search": {
    "title": "ใช้ค้นหาไม่สน Case",
    "desc": "เช่น WHERE LOWER(name) = \"admin\"",
    "color": "text-emerald-400"
  },
  "clean": {
    "title": "จัดระเบียบข้อมูล",
    "desc": "ก่อนจัดเก็บ อาจใช้ LOWER() แปลงอีเมลให้เป็นพิมพ์เล็กทั้งหมด",
    "color": "text-sky-400"
  }
};
  const quiz = { q: `ถ้าข้อมูลในระบบมีทั้ง "Mac", "MAC", "mac" หากต้องการเปรียบเทียบให้ตรงกับคำว่า "mac" เสมอ ควรทำอย่างไร?`, opts: [{"val":"low","label":"WHERE LOWER(name) = \"mac\"","correct":true},{"val":"up","label":"WHERE UPPER(name) = \"mac\""},{"val":"eq","label":"WHERE name = \"mac\""}] };

  return (
    <SQLSyntaxEngine 
      title="ตัวพิมพ์ใหญ่-เล็ก (UPPER, LOWER)"
      description="เรียนรู้โครงสร้างคำสั่งหลักโดยการคลิกหรือนำเมาส์ไปชี้ที่ส่วนต่างๆ ของโค้ด"
      icon={TerminalSquare}
      codeParts={codeParts}
      explanations={explanations}
      quiz={quiz}
    />
  );
}
