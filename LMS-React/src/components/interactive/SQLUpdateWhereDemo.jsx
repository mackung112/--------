import React from 'react';
import SQLDataSimulatorEngine from './SQLDataSimulatorEngine';
import { Database } from 'lucide-react';

export default function SQLUpdateWhereDemo() {
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
    "id": "where",
    "sql": "WHERE Clause",
    "desc": "UPDATE users SET status=\"banned\" WHERE id = 5;",
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
    "id": "multi",
    "sql": "หลายเงื่อนไข",
    "desc": "ใช้ AND / OR ได้ เช่น WHERE age < 18 AND status = \"active\"",
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
    "id": "subq",
    "sql": "WHERE ด้วย Subquery",
    "desc": "อัปเดตตามข้อมูลอีกตาราง เช่น WHERE dep_id IN (SELECT id FROM deps)",
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
    "id": "limit",
    "sql": "LIMIT",
    "desc": "(ใน MySQL) สามารถจำกัดจำนวนแถวที่แก้ได้ เช่น LIMIT 1",
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
  const quiz = { q: `ถ้าลืมใส่ WHERE ในคำสั่ง UPDATE จะเกิดอะไรขึ้น?`, opts: [{"val":"all","label":"ข้อมูลทุกแถวในตารางนั้นจะถูกแก้ไขเป็นค่าใหม่ทั้งหมด!","correct":true},{"val":"err","label":"ระบบจะขึ้น Error แจ้งเตือน และไม่ทำงาน"},{"val":"last","label":"ข้อมูลแถวสุดท้ายเท่านั้นที่จะถูกแก้ไข"}] };

  return (
    <SQLDataSimulatorEngine 
      title="เงื่อนไขการแก้ไข (UPDATE WHERE)"
      description="ทดลองรันคำสั่ง SQL และดูผลลัพธ์การเปลี่ยนแปลงของข้อมูลในตารางจำลองด้านล่าง"
      icon={Database}
      initialTable={initialTable}
      queries={queries}
      quiz={quiz}
    />
  );
}
