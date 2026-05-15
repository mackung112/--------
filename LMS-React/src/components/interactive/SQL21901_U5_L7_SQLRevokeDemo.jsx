import React from 'react';
import SQLSyntaxEngine from './SQLSyntaxEngine';
import { TerminalSquare } from 'lucide-react';

export default function SQL21901_U5_L7_SQLRevokeDemo() {
  const codeParts = [
  {
    "text": "REVOKE ",
    "key": "revoke"
  },
  {
    "text": "ระบุให้ตรง ",
    "key": "spec"
  },
  {
    "text": "REVOKE ALL ",
    "key": "all"
  },
  {
    "text": "SHOW GRANTS ",
    "key": "show"
  }
];
  const explanations = {
  "revoke": {
    "title": "REVOKE",
    "desc": "ดึงสิทธิ์กลับ เช่น REVOKE INSERT ON mydb.* FROM \"user\";",
    "color": "text-pink-500"
  },
  "spec": {
    "title": "ระบุให้ตรง",
    "desc": "ต้อง REVOKE สิทธิ์ในระดับเดียวกับที่เคย GRANT ไว้",
    "color": "text-yellow-500"
  },
  "all": {
    "title": "REVOKE ALL",
    "desc": "ดึงสิทธิ์ทุกอย่างที่มีกลับคืนมาทั้งหมด",
    "color": "text-emerald-400"
  },
  "show": {
    "title": "SHOW GRANTS",
    "desc": "ใช้ SHOW GRANTS FOR \"user\"; เพื่อดูว่าปัจจุบันเขามีสิทธิ์อะไรบ้างก่อนเพิกถอน",
    "color": "text-sky-400"
  }
};
  const quiz = { q: `ก่อนทำการยกเลิกสิทธิ์ (REVOKE) เราควรใช้คำสั่งใดเพื่อตรวจสอบสิทธิ์ปัจจุบันของผู้ใช้?`, opts: [{"val":"show","label":"SHOW GRANTS FOR \"user\";","correct":true},{"val":"select","label":"SELECT * FROM user_privileges;"},{"val":"check","label":"CHECK PRIVILEGES FOR \"user\";"}] };

  return (
    <SQLSyntaxEngine 
      title="การยกเลิกสิทธิ์ (REVOKE)"
      description="เรียนรู้โครงสร้างคำสั่งหลักโดยการคลิกหรือนำเมาส์ไปชี้ที่ส่วนต่างๆ ของโค้ด"
      icon={TerminalSquare}
      codeParts={codeParts}
      explanations={explanations}
      quiz={quiz}
    />
  );
}
