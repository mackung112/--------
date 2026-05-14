import React from 'react';
import SQLDataSimulatorEngine from './SQLDataSimulatorEngine';
import { Database } from 'lucide-react';

export default function SQLInsertMultiDemo() {
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
    "id": "multi",
    "sql": "INSERT Multiple",
    "desc": "INSERT INTO users (name, age) VALUES (\"A\", 20), (\"B\", 25), (\"C\", 22);",
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
    "id": "perf",
    "sql": "ประสิทธิภาพ",
    "desc": "การเพิ่มทีละหลายแถวในคำสั่งเดียว เร็วกว่าการสั่ง INSERT ทีละแถวหลายๆ ครั้ง",
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
    "id": "limit",
    "sql": "ข้อจำกัด",
    "desc": "ระวังขนาดของ Query หากส่งข้อมูลเป็นหมื่นแถวในคำสั่งเดียว",
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
    "id": "tx",
    "sql": "Transaction",
    "desc": "ถ้าแถวใดแถวหนึ่ง Error ข้อมูลทั้งหมดในคำสั่งนี้จะไม่ถูกบันทึก",
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
  const quiz = { q: `ข้อดีหลักของการใช้ INSERT แบบหลายแถวพร้อมกันคืออะไร?`, opts: [{"val":"perf","label":"ช่วยเพิ่มประสิทธิภาพและทำงานเร็วกว่าการ INSERT ทีละแถว","correct":true},{"val":"easy","label":"เขียนโค้ดง่ายกว่า"},{"val":"ai","label":"ทำให้ AUTO_INCREMENT ทำงานได้ดีขึ้น"}] };

  return (
    <SQLDataSimulatorEngine 
      title="การเพิ่มข้อมูลหลายแถว"
      description="ทดลองรันคำสั่ง SQL และดูผลลัพธ์การเปลี่ยนแปลงของข้อมูลในตารางจำลองด้านล่าง"
      icon={Database}
      initialTable={initialTable}
      queries={queries}
      quiz={quiz}
    />
  );
}
