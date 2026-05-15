import React from 'react';
import SQLDataSimulatorEngine from './SQLDataSimulatorEngine';
import { Database } from 'lucide-react';

export default function SQL21901_U6_L4_SQLAvgDemo() {
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
    "id": "avg",
    "sql": "AVG()",
    "desc": "คำนวณค่าเฉลี่ย (ผลรวม ÷ จำนวนแถว) ของคอลัมน์ตัวเลข",
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
    "id": "null",
    "sql": "ระวังค่า NULL",
    "desc": "AVG ไม่นำแถวที่เป็น NULL มาเป็นตัวหาร",
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
    "id": "round",
    "sql": "ปัดทศนิยม",
    "desc": "มักใช้คู่กับ ROUND(AVG(price), 2) เพื่อเอาทศนิยม 2 ตำแหน่ง",
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
    "id": "group",
    "sql": "ใช้หาค่าเฉลี่ยกลุ่ม",
    "desc": "เช่น หาเงินเดือนเฉลี่ยของแต่ละแผนก",
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
  const quiz = { q: `ข้อควรระวังเมื่อใช้ฟังก์ชัน AVG() คืออะไร?`, opts: [{"val":"null","label":"แถวที่มีค่าเป็น NULL จะไม่ถูกนำมาคำนวณเป็นตัวหาร","correct":true},{"val":"zero","label":"ค่า 0 จะถูกข้ามไปไม่นำมาคิดค่าเฉลี่ย"},{"val":"text","label":"สามารถใช้หาค่าเฉลี่ยของข้อความได้"}] };

  return (
    <SQLDataSimulatorEngine 
      title="ค่าเฉลี่ย (AVG)"
      description="ทดลองรันคำสั่ง SQL และดูผลลัพธ์การเปลี่ยนแปลงของข้อมูลในตารางจำลองด้านล่าง"
      icon={Database}
      initialTable={initialTable}
      queries={queries}
      quiz={quiz}
    />
  );
}
