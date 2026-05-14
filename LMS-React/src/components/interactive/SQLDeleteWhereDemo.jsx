import React from 'react';
import SQLDataSimulatorEngine from './SQLDataSimulatorEngine';
import { Database } from 'lucide-react';

export default function SQLDeleteWhereDemo() {
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
    "id": "del",
    "sql": "DELETE FROM",
    "desc": "DELETE FROM users WHERE id = 10;",
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
    "id": "danger",
    "sql": "⚠️ ลืม WHERE = หายนะ",
    "desc": "ถ้าสั่ง DELETE FROM users โดยไม่มี WHERE ข้อมูลทั้งหมดในตารางจะหายเกลี้ยง!",
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
    "id": "perf",
    "sql": "ความเร็ว",
    "desc": "การ DELETE ข้อมูลจำนวนมหาศาลจะใช้เวลานานและล็อกตาราง (ควรใช้ TRUNCATE ถ้ายอมลบหมด)",
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
    "id": "return",
    "sql": "การคืนพื้นที่",
    "desc": "เมื่อ DELETE ข้อมูล พื้นที่ดิสก์อาจไม่ลดลงทันที ต้องรันคำสั่ง Optimize Table",
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
  const quiz = { q: `การรันคำสั่ง DELETE FROM orders; ส่งผลอย่างไร?`, opts: [{"val":"all","label":"ลบข้อมูลรายการสั่งซื้อทุกแถวทิ้งทั้งหมด","correct":true},{"val":"err","label":"เกิด Error เพราะไม่ได้ระบุ WHERE"},{"val":"drop","label":"ลบตาราง orders ทิ้งทั้งตาราง"}] };

  return (
    <SQLDataSimulatorEngine 
      title="การลบข้อมูล (DELETE WHERE)"
      description="ทดลองรันคำสั่ง SQL และดูผลลัพธ์การเปลี่ยนแปลงของข้อมูลในตารางจำลองด้านล่าง"
      icon={Database}
      initialTable={initialTable}
      queries={queries}
      quiz={quiz}
    />
  );
}
