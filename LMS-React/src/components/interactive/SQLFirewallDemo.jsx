import React from 'react';
import SQLSyntaxEngine from './SQLSyntaxEngine';
import { TerminalSquare } from 'lucide-react';

export default function SQLFirewallDemo() {
  const codeParts = [
  {
    "text": "Database Firewall ",
    "key": "wall"
  },
  {
    "text": "IP Allowlist ",
    "key": "ip"
  },
  {
    "text": "ซ่อน Port ",
    "key": "port"
  },
  {
    "text": "กรอง Query อันตราย ",
    "key": "sqli"
  }
];
  const explanations = {
  "wall": {
    "title": "Database Firewall",
    "desc": "กำแพงกรองข้อมูลที่วิ่งเข้าออกฐานข้อมูล ป้องกันการเชื่อมต่อที่ไม่ได้รับอนุญาต",
    "color": "text-pink-500"
  },
  "ip": {
    "title": "IP Allowlist",
    "desc": "อนุญาตให้เฉพาะ IP ของแอปพลิเคชันหรือบริษัทเท่านั้นที่ต่อ DB ได้",
    "color": "text-yellow-500"
  },
  "port": {
    "title": "ซ่อน Port",
    "desc": "ไม่เปิด Port 3306 (MySQL) ให้เข้าถึงจาก Internet สาธารณะเด็ดขาด",
    "color": "text-emerald-400"
  },
  "sqli": {
    "title": "กรอง Query อันตราย",
    "desc": "Firewall ขั้นสูงสามารถตรวจจับและบล็อกคำสั่ง SQL Injection ได้",
    "color": "text-sky-400"
  }
};
  const quiz = { q: `วิธีป้องกันฐานข้อมูลจากการถูกโจมตีจากอินเทอร์เน็ตที่ได้ผลที่สุดคืออะไร?`, opts: [{"val":"port","label":"ปิดไม่ให้เข้าถึงจากอินเทอร์เน็ตสาธารณะ และใช้ IP Allowlist ให้เฉพาะเซิร์ฟเวอร์แอปพลิเคชันเข้าถึงได้","correct":true},{"val":"pwd","label":"ตั้งรหัสผ่านให้ยาวมากๆ ไว้ป้องกัน"},{"val":"portnum","label":"เปลี่ยน Port จาก 3306 เป็นเลขอื่น"}] };

  return (
    <SQLSyntaxEngine 
      title="การใช้ Firewalls"
      description="เรียนรู้โครงสร้างคำสั่งหลักโดยการคลิกหรือนำเมาส์ไปชี้ที่ส่วนต่างๆ ของโค้ด"
      icon={TerminalSquare}
      codeParts={codeParts}
      explanations={explanations}
      quiz={quiz}
    />
  );
}
