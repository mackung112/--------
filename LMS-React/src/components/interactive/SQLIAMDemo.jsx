import React from 'react';
import SQLSyntaxEngine from './SQLSyntaxEngine';
import { TerminalSquare } from 'lucide-react';

export default function SQLIAMDemo() {
  const codeParts = [
  {
    "text": "Identity ",
    "key": "id"
  },
  {
    "text": "Role-Based Access (RBAC) ",
    "key": "role"
  },
  {
    "text": "Least Privilege ",
    "key": "least"
  },
  {
    "text": "Password Policy ",
    "key": "pwd"
  }
];
  const explanations = {
  "id": {
    "title": "Identity",
    "desc": "ตัวตนของผู้ใช้งาน (เช่น Username)",
    "color": "text-pink-500"
  },
  "role": {
    "title": "Role-Based Access (RBAC)",
    "desc": "จัดกลุ่มผู้ใช้เป็น Role เช่น admin, editor, viewer เพื่อง่ายต่อการให้สิทธิ์",
    "color": "text-yellow-500"
  },
  "least": {
    "title": "Least Privilege",
    "desc": "หลักการให้สิทธิ์ \"น้อยที่สุด\" เท่าที่จำเป็นต้องใช้ในการทำงานเท่านั้น",
    "color": "text-emerald-400"
  },
  "pwd": {
    "title": "Password Policy",
    "desc": "บังคับความยากของรหัสผ่าน และการหมดอายุ",
    "color": "text-sky-400"
  }
};
  const quiz = { q: `หลักการ Least Privilege (ให้สิทธิ์น้อยที่สุด) หมายถึงข้อใด?`, opts: [{"val":"least","label":"ให้สิทธิ์เฉพาะคำสั่งและตารางที่ผู้ใช้นั้นจำเป็นต้องใช้ในการทำงานจริงๆ เท่านั้น","correct":true},{"val":"low","label":"ให้ผู้ใช้ทุกคนมีสิทธิ์ระดับต่ำที่สุด (Viewer) เท่านั้น"},{"val":"admin","label":"ให้สิทธิ์ Admin เฉพาะคนที่ทำงานมานาน"}] };

  return (
    <SQLSyntaxEngine 
      title="ระบบจัดการสิทธิ์ (IAM)"
      description="เรียนรู้โครงสร้างคำสั่งหลักโดยการคลิกหรือนำเมาส์ไปชี้ที่ส่วนต่างๆ ของโค้ด"
      icon={TerminalSquare}
      codeParts={codeParts}
      explanations={explanations}
      quiz={quiz}
    />
  );
}
