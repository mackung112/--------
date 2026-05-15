import React from 'react';
import SQLSyntaxEngine from './SQLSyntaxEngine';
import { TerminalSquare } from 'lucide-react';

export default function SQL21901_U5_L6_SQLGrantDemo() {
  const codeParts = [
  {
    "text": "GRANT ",
    "key": "grant"
  },
  {
    "text": "ALL PRIVILEGES ",
    "key": "all"
  },
  {
    "text": "ระดับการให้สิทธิ์ ",
    "key": "level"
  },
  {
    "text": "FLUSH PRIVILEGES ",
    "key": "flush"
  }
];
  const explanations = {
  "grant": {
    "title": "GRANT",
    "desc": "คำสั่งมอบสิทธิ์ เช่น GRANT SELECT, INSERT ON mydb.* TO \"user\";",
    "color": "text-pink-500"
  },
  "all": {
    "title": "ALL PRIVILEGES",
    "desc": "ให้สิทธิ์ทุกอย่าง (ควรให้เฉพาะ Admin)",
    "color": "text-yellow-500"
  },
  "level": {
    "title": "ระดับการให้สิทธิ์",
    "desc": "ให้ระดับ Global (*.*), Database (db.*), หรือระดับ Table (db.table) ก็ได้",
    "color": "text-emerald-400"
  },
  "flush": {
    "title": "FLUSH PRIVILEGES",
    "desc": "สั่งให้เซิร์ฟเวอร์โหลดข้อมูลสิทธิ์ใหม่ทันที",
    "color": "text-sky-400"
  }
};
  const quiz = { q: `ถ้าต้องการให้พนักงาน "ดู" ข้อมูลจากตาราง customers ได้อย่างเดียว ต้องใช้คำสั่งใด?`, opts: [{"val":"sel","label":"GRANT SELECT ON customers TO \"employee\";","correct":true},{"val":"all","label":"GRANT ALL ON customers TO \"employee\";"},{"val":"view","label":"GRANT VIEW ON customers TO \"employee\";"}] };

  return (
    <SQLSyntaxEngine 
      title="การให้สิทธิ์ (GRANT)"
      description="เรียนรู้โครงสร้างคำสั่งหลักโดยการคลิกหรือนำเมาส์ไปชี้ที่ส่วนต่างๆ ของโค้ด"
      icon={TerminalSquare}
      codeParts={codeParts}
      explanations={explanations}
      quiz={quiz}
    />
  );
}
