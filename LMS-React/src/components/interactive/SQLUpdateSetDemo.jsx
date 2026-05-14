import React from 'react';
import SQLDataSimulatorEngine from './SQLDataSimulatorEngine';
import { Database } from 'lucide-react';

export default function SQLUpdateSetDemo() {
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
    "id": "update",
    "sql": "UPDATE",
    "desc": "ระบุชื่อตารางที่ต้องการแก้ไข เช่น UPDATE users",
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
    "id": "set",
    "sql": "SET",
    "desc": "ระบุคอลัมน์และค่าใหม่ เช่น SET age = 21, status = \"active\"",
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
    "id": "math",
    "sql": "คำนวณจากค่าเดิม",
    "desc": "เราสามารถใช้ค่าเดิมมาคำนวณได้ เช่น SET price = price * 1.1 (ขึ้นราคา 10%)",
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
    "id": "danger",
    "sql": "⚠️ ระวังลืม WHERE",
    "desc": "ถ้าใช้ UPDATE โดยไม่มี WHERE ข้อมูลจะถูกเปลี่ยนทุกแถวในตาราง!",
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
  const quiz = { q: `ถ้าต้องการเพิ่มเงินเดือนพนักงานทุกคนขึ้น 5% คำสั่งใดถูกต้องที่สุด?`, opts: [{"val":"math","label":"UPDATE employees SET salary = salary * 1.05;","correct":true},{"val":"plus","label":"UPDATE employees SET salary = 5%;"},{"val":"add","label":"ALTER TABLE employees ADD salary 5%;"}] };

  return (
    <SQLDataSimulatorEngine 
      title="การแก้ไขข้อมูล (UPDATE SET)"
      description="ทดลองรันคำสั่ง SQL และดูผลลัพธ์การเปลี่ยนแปลงของข้อมูลในตารางจำลองด้านล่าง"
      icon={Database}
      initialTable={initialTable}
      queries={queries}
      quiz={quiz}
    />
  );
}
