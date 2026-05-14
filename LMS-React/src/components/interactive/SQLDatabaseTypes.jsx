import React from 'react';
import SQLSyntaxEngine from './SQLSyntaxEngine';
import { TerminalSquare } from 'lucide-react';

export default function SQLDatabaseTypes() {
  const codeParts = [
  {
    "text": "Relational (SQL) ",
    "key": "rel"
  },
  {
    "text": "Document (NoSQL) ",
    "key": "doc"
  },
  {
    "text": "Key-Value ",
    "key": "kv"
  },
  {
    "text": "Graph Database ",
    "key": "graph"
  }
];
  const explanations = {
  "rel": {
    "title": "Relational (SQL)",
    "desc": "จัดเก็บข้อมูลในตาราง มีความสัมพันธ์ระหว่างตาราง เช่น MySQL, PostgreSQL",
    "color": "text-pink-500"
  },
  "doc": {
    "title": "Document (NoSQL)",
    "desc": "เก็บข้อมูลเป็นเอกสาร JSON เช่น MongoDB",
    "color": "text-yellow-500"
  },
  "kv": {
    "title": "Key-Value",
    "desc": "เก็บข้อมูลแบบคู่ Key-Value เช่น Redis",
    "color": "text-emerald-400"
  },
  "graph": {
    "title": "Graph Database",
    "desc": "เก็บข้อมูลเป็นโหนดและเส้นเชื่อม เช่น Neo4j",
    "color": "text-sky-400"
  }
};
  const quiz = { q: `MySQL เป็นฐานข้อมูลประเภทใด?`, opts: [{"val":"rel","label":"Relational Database — จัดเก็บข้อมูลเป็นตาราง","correct":true},{"val":"doc","label":"Document Database"},{"val":"kv","label":"Key-Value Store"}] };

  return (
    <SQLSyntaxEngine 
      title="ประเภทฐานข้อมูล"
      description="เรียนรู้โครงสร้างคำสั่งหลักโดยการคลิกหรือนำเมาส์ไปชี้ที่ส่วนต่างๆ ของโค้ด"
      icon={TerminalSquare}
      codeParts={codeParts}
      explanations={explanations}
      quiz={quiz}
    />
  );
}
