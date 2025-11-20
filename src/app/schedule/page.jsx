'use client'

import { useEffect, useState } from "react";

export default function Home() {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    const fetchSchedule = async () => {
      const res = await fetch("/api/schedule");
      const data = await res.json();
      setSchedule(data.schedule);
    };

    fetchSchedule();
  }, []);

  // จัดกลุ่มข้อมูลตามวัน
  const groupedSchedule = schedule.reduce((acc, entry) => {
    if (!acc[entry.day]) {
      acc[entry.day] = [];
    }
    acc[entry.day].push(entry);
    return acc;
  }, {});

  return (
    <div>
      <h1>ตารางเรียน</h1>
      <table className="w-full">
        <thead>
          <tr>
            <th>คาบ</th>
            <th>จันทร์</th>
            <th>อังคาร</th>
            <th>พุธ</th>
            <th>พฤหัสบดี</th>
            <th>ศุกร์</th>
          </tr>
        </thead>
        <tbody>
          {/* สร้างแถวสำหรับแต่ละคาบเรียน */}
          {[1, 2, 3, 4, 5, 6, 7, 8].map((period) => (
            <tr key={period}>
              <td>คาบ {period}</td>
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => {
                // ค้นหาว่าวันไหนมีคาบเรียนตรงกับวันและคาบ
                const entry = groupedSchedule[day]?.find(item => item.period === period);
                return (
                  <td key={day}>
                    {entry ? (
                      <>
                        <div>{entry.subject}</div>
                        <div>{entry.teacherName}</div>
                        <div>{entry.classroom}</div>
                      </>
                    ) : (
                      "-"
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
