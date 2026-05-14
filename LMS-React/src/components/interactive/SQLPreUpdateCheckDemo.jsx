import React from 'react';
import SQLDataSimulatorEngine from './SQLDataSimulatorEngine';
import { Database } from 'lucide-react';

export default function SQLPreUpdateCheckDemo() {
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
    "id": "select",
    "sql": "SELECT ก่อนเสมอ",
    "desc": "ก่อนจะพิมพ์คำว่า UPDATE ให้พิมพ์ SELECT ทดสอบเงื่อนไข WHERE ดูก่อน",
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
    "id": "count",
    "sql": "นับจำนวนแถว",
    "desc": "ถ้าคิดว่าจะแก้ข้อมูล 1 แถว แต่ SELECT ออกมา 5 แถว แสดงว่าเงื่อนไขผิด!",
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
    "id": "pk",
    "sql": "ใช้ Primary Key",
    "desc": "ถ้าต้องการแก้ไขข้อมูลเฉพาะรายการ ควรระบุ WHERE ด้วย Primary Key (เช่น id)",
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
    "id": "backup",
    "sql": "สำรองข้อมูล",
    "desc": "ถ้าเป็นการอัปเดตข้อมูลจำนวนมาก ควร Export ตารางนั้นเก็บไว้ก่อน",
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
  const quiz = { q: `กฎทองคำ (Golden Rule) ก่อนรันคำสั่ง UPDATE คืออะไร?`, opts: [{"val":"sel","label":"เขียน SELECT เพื่อทดสอบเงื่อนไข WHERE ก่อนเสมอ","correct":true},{"val":"fast","label":"รีบรันให้เสร็จก่อนเจ้านายเห็น"},{"val":"commit","label":"รันคำสั่ง COMMIT ทันที"}] };

  return (
    <SQLDataSimulatorEngine 
      title="การตรวจสอบก่อนแก้ไข"
      description="ทดลองรันคำสั่ง SQL และดูผลลัพธ์การเปลี่ยนแปลงของข้อมูลในตารางจำลองด้านล่าง"
      icon={Database}
      initialTable={initialTable}
      queries={queries}
      quiz={quiz}
    />
  );
}
