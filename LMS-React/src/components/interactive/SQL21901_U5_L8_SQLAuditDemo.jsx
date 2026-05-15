import React from 'react';
import SQLSyntaxEngine from './SQLSyntaxEngine';
import { TerminalSquare } from 'lucide-react';

export default function SQL21901_U5_L8_SQLAuditDemo() {
  const codeParts = [
  {
    "text": "General Query Log ",
    "key": "log"
  },
  {
    "text": "Slow Query Log ",
    "key": "slow"
  },
  {
    "text": "Error Log ",
    "key": "err"
  },
  {
    "text": "Audit Table (Trigger) ",
    "key": "trigger"
  }
];
  const explanations = {
  "log": {
    "title": "General Query Log",
    "desc": "บันทึกทุกคำสั่ง SQL ที่วิ่งเข้ามาในเซิร์ฟเวอร์",
    "color": "text-pink-500"
  },
  "slow": {
    "title": "Slow Query Log",
    "desc": "บันทึกเฉพาะคำสั่งที่ทำงานช้า เพื่อนำไปปรับปรุงประสิทธิภาพ (Optimize)",
    "color": "text-yellow-500"
  },
  "err": {
    "title": "Error Log",
    "desc": "บันทึกข้อผิดพลาดและสถานะการทำงานของเซิร์ฟเวอร์",
    "color": "text-emerald-400"
  },
  "trigger": {
    "title": "Audit Table (Trigger)",
    "desc": "สร้าง Trigger เพื่อเขียน Log เวลาข้อมูลตารางสำคัญถูก แก้/ลบ ว่าใครเป็นคนทำ",
    "color": "text-sky-400"
  }
};
  const quiz = { q: `ถ้าต้องการรู้ว่าคำสั่ง SQL ใดบ้างที่ทำให้เว็บของเราทำงานช้า ควรเปิดดู Log ใด?`, opts: [{"val":"slow","label":"Slow Query Log","correct":true},{"val":"err","label":"Error Log"},{"val":"gen","label":"General Query Log"}] };

  return (
    <SQLSyntaxEngine 
      title="การตรวจสอบการใช้งาน (Auditing)"
      description="เรียนรู้โครงสร้างคำสั่งหลักโดยการคลิกหรือนำเมาส์ไปชี้ที่ส่วนต่างๆ ของโค้ด"
      icon={TerminalSquare}
      codeParts={codeParts}
      explanations={explanations}
      quiz={quiz}
    />
  );
}
