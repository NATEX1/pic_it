'use client'

import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from "@/components/ui/table"; // Ensure correct imports

const Timetable = ({ group }) => {
  const [scheduleData, setScheduleData] = useState(null);

  // Fetch schedule data when the component mounts
  useEffect(() => {
    const fetchSchedule = async () => {
      const response = await fetch(`/api/schedule`);
      const data = await response.json();

      // Debugging: Log the fetched data to inspect
      console.log("Fetched Schedule Data:", data);

      setScheduleData(data);
    };

    fetchSchedule();
  }, []);

  // If data is not loaded, show a loading state
  if (!scheduleData) {
    return <div>Loading...</div>;
  }

  // Filter the timetable for the selected group
  const timetable = scheduleData.filter(item => item.groupName === group);

  // Debugging: Log the filtered timetable for the selected group
  console.log("Filtered Timetable for group", group, ":", timetable);

  // Days of the week for the timetable
  const daysOfWeek = ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์"];

  return (
    <div>
      <h2>ตารางเรียนกลุ่ม {group}</h2>
      <Table className={'table-fixed border'}>
        <TableHeader>
          <TableRow>
            <TableHead>วัน</TableHead>
            <TableHead className={'text-center font-bold'}>คาบ 1</TableHead>
            <TableHead className={'text-center font-bold'}>คาบ 2</TableHead>
            <TableHead className={'text-center font-bold'}>คาบ 3</TableHead>
            <TableHead className={'text-center font-bold'}>คาบ 4 (พัก)</TableHead>
            <TableHead className={'text-center font-bold'}>คาบ 5</TableHead>
            <TableHead className={'text-center font-bold'}>คาบ 6</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {daysOfWeek.map((day) => {
            const dailySchedule = timetable.filter(item => item.day === day);
            const periods = [1, 2, 3, 4, 5, 6]; // 6 periods in a day
            const rowData = periods.map((period) => {
              const periodData = dailySchedule.find(item => item.period === period);
              return periodData ? (
                <TableCell className={'text-center'} key={period}>
                  {periodData.subject === "พัก" ? "พักกินข้าว" : (
                    <>
                      {periodData.subject} <br />
                      {periodData.teacherName || "(ไม่ระบุ)"} <br />
                      {periodData.classroom}
                    </>
                  )}
                </TableCell>
              ) : (
                <TableCell key={period} className={'text-center'}>(ว่าง)</TableCell>
              );
            });

            return (
              <TableRow key={day}>
                <TableCell className={'font-bold'}>{day}</TableCell>
                {rowData}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default function Schedule() { 
  return <Timetable group={'กลุ่ม1'} />;
}
