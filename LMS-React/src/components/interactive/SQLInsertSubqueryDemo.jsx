import React from 'react';
import SQLDataSimulatorEngine from './SQLDataSimulatorEngine';
import { Database } from 'lucide-react';

export default function SQLInsertSubqueryDemo() {
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
    "id": "sub",
    "sql": "INSERT INTO ... SELECT",
    "desc": "INSERT INTO archive_users SELECT * FROM users WHERE status=\"inactive\";",
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
    "id": "copy",
    "sql": "การคัดลอกข้อมูล",
    "desc": "เหมาะสำหรับการสำรองข้อมูล การย้ายข้อมูล หรือสรุปรายงานลงตารางใหม่",
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
    "id": "match",
    "sql": "โครงสร้างต้องตรงกัน",
    "desc": "จำนวนคอลัมน์และประเภทข้อมูลของ SELECT ต้องตรงกับ INSERT",
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
    "id": "novalue",
    "sql": "ไม่มี VALUES",
    "desc": "การใช้ท่านี้ ไม่ต้องใช้คำว่า VALUES",
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
  const quiz = { q: `ถ้าต้องการย้ายข้อมูลลูกค้าที่ไม่ได้ซื้อของนานเกิน 1 ปี ไปยังตาราง old_customers ควรใช้วิธีใด?`, opts: [{"val":"subq","label":"INSERT INTO old_customers SELECT * FROM customers WHERE last_active < \"2023-01-01\";","correct":true},{"val":"loop","label":"ดึงข้อมูลมาด้วยโปรแกรม แล้วสั่ง INSERT ทีละคน"},{"val":"copy","label":"COPY customers TO old_customers;"}] };

  return (
    <SQLDataSimulatorEngine 
      title="การเพิ่มข้อมูลจาก Subquery"
      description="ทดลองรันคำสั่ง SQL และดูผลลัพธ์การเปลี่ยนแปลงของข้อมูลในตารางจำลองด้านล่าง"
      icon={Database}
      initialTable={initialTable}
      queries={queries}
      quiz={quiz}
    />
  );
}
