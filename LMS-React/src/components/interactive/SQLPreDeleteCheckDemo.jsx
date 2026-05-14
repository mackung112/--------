import React from 'react';
import SQLDataSimulatorEngine from './SQLDataSimulatorEngine';
import { Database } from 'lucide-react';

export default function SQLPreDeleteCheckDemo() {
  const initialTable = {
  "columns": [
    "id",
    "name",
    "department",
    "salary"
  ],
  "rows": [
    {
      "data": [
        1,
        "สมชาย",
        "IT",
        45000
      ]
    },
    {
      "data": [
        2,
        "สมหญิง",
        "HR",
        35000
      ]
    },
    {
      "data": [
        3,
        "วิชัย",
        "Sales",
        55000
      ]
    },
    {
      "data": [
        4,
        "มาลี",
        "IT",
        48000
      ]
    }
  ]
};
  const queries = [
  {
    "id": "sel",
    "sql": "SELECT ทดสอบ",
    "desc": "เช่นเดียวกับ UPDATE ต้อง SELECT ข้อมูลดูให้แน่ใจก่อนสั่ง DELETE",
    "resultMsg": "Query executed successfully",
    "resultTable": {
      "columns": [
        "id",
        "name",
        "department",
        "salary"
      ],
      "rows": [
        {
          "data": [
            1,
            "สมชาย",
            "IT",
            45000
          ]
        },
        {
          "data": [
            2,
            "สมหญิง",
            "HR",
            35000
          ]
        },
        {
          "data": [
            3,
            "วิชัย",
            "Sales",
            55000
          ]
        },
        {
          "data": [
            4,
            "มาลี",
            "IT",
            48000
          ]
        }
      ]
    }
  },
  {
    "id": "fk",
    "sql": "ระวัง Foreign Key",
    "desc": "ถ้าลบแล้ว ข้อมูลตารางอื่นที่เชื่อมโยงอยู่จะได้รับผลกระทบ (ขึ้นอยู่กับ CASCADE/RESTRICT)",
    "resultMsg": "Query executed successfully",
    "resultTable": {
      "columns": [
        "id",
        "name",
        "department",
        "salary"
      ],
      "rows": [
        {
          "data": [
            1,
            "สมชาย",
            "IT",
            45000
          ]
        },
        {
          "data": [
            2,
            "สมหญิง",
            "HR",
            35000
          ]
        }
      ]
    }
  },
  {
    "id": "soft",
    "sql": "Soft Delete (แนะนำ)",
    "desc": "แทนที่จะลบทิ้งจริง ให้ใช้วิธี UPDATE status=\"deleted\" แทน",
    "resultMsg": "Query executed successfully",
    "resultTable": {
      "columns": [
        "id",
        "name",
        "department",
        "salary"
      ],
      "rows": [
        {
          "data": [
            1,
            "สมชาย",
            "IT",
            99000
          ],
          "highlight": true
        },
        {
          "data": [
            2,
            "สมหญิง",
            "HR",
            35000
          ]
        },
        {
          "data": [
            3,
            "วิชัย",
            "Sales",
            55000
          ]
        },
        {
          "data": [
            4,
            "มาลี",
            "IT",
            48000
          ]
        }
      ]
    }
  },
  {
    "id": "audit",
    "sql": "เก็บ Log",
    "desc": "บางระบบต้องบันทึกประวัติว่า \"ใครลบ ลบเมื่อไหร่\" ก่อนทำการลบจริง",
    "resultMsg": "Query executed successfully",
    "resultTable": {
      "columns": [
        "id",
        "name",
        "department",
        "salary"
      ],
      "rows": [
        {
          "data": [
            1,
            "สมชาย",
            "IT",
            45000
          ]
        },
        {
          "data": [
            2,
            "สมหญิง",
            "HR",
            35000
          ]
        }
      ]
    }
  }
];
  const quiz = { q: `วิธีใดปลอดภัยที่สุดเมื่อต้องการ "ลบ" ข้อมูลผู้ใช้งานออกจากระบบ?`, opts: [{"val":"soft","label":"ใช้ UPDATE เพื่อเปลี่ยนสถานะเป็น \"inactive\" หรือ \"deleted\" แทนการลบจริง","correct":true},{"val":"hard","label":"ใช้ DELETE FROM users เพื่อประหยัดพื้นที่"},{"val":"trunc","label":"ใช้ TRUNCATE TABLE users"}] };

  return (
    <SQLDataSimulatorEngine 
      title="การประเมินก่อนลบ"
      description="ทดลองรันคำสั่ง SQL และดูผลลัพธ์การเปลี่ยนแปลงของข้อมูลในตารางจำลองด้านล่าง"
      icon={Database}
      initialTable={initialTable}
      queries={queries}
      quiz={quiz}
    />
  );
}
