// app/api/schedule/route.js
export async function GET() {
  const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const PERIODS = [1, 2, 3, 4, 5, 6, 7, 8]; // คาบ 4 = พักกลางวัน

  // Dummy Data
  const teachers = Array.from({ length: 8 }, (_, i) => ({ _id: `T${i + 1}`, name: `ครู${i + 1}` }));
  const classrooms = Array.from({ length: 4 }, (_, i) => ({ _id: `C${101 + i}`, name: `ห้อง ${101 + i}` }));
  const subjects = Array.from({ length: 9 }, (_, i) => ({
    _id: `S${i + 1}`,
    name: `วิชา${i + 1}`,
    teacherId: teachers[i % teachers.length]._id,
    hoursPerWeek: 3,
  }));
  const groups = Array.from({ length: 4 }, (_, i) => ({
    _id: `G${i + 1}`,
    name: `กลุ่ม${i + 1}`,
    subjects: subjects.map((s) => s._id),
  }));

  // สร้างตารางเรียน
  const schedule = [];
  groups.forEach((group) => {
    group.subjects.forEach((subjId) => {
      const subject = subjects.find((s) => s._id === subjId);
      const teacher = teachers.find((t) => t._id === subject.teacherId);

      // เตรียม slots
      const slots = [];
      DAYS.forEach((day) => {
        PERIODS.forEach((period) => {
          if (period !== 4) slots.push({ day, period }); // คาบ 4 = พักกลางวัน
        });
      });

      // shuffle slots
      for (let i = slots.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [slots[i], slots[j]] = [slots[j], slots[i]];
      }

      // เอา slots ตาม hoursPerWeek
      for (let i = 0; i < subject.hoursPerWeek && i < slots.length; i++) {
        const slot = slots[i];
        const classroom = classrooms[Math.floor(Math.random() * classrooms.length)];
        schedule.push({
          day: slot.day,
          period: slot.period,
          groupId: group._id,
          groupName: group.name,
          subject: subject.name,
          teacherId: teacher._id,
          teacherName: teacher.name,
          classroom: classroom.name,
        });
      }
    });
  });

  return new Response(JSON.stringify({ schedule }), {
    headers: { "Content-Type": "application/json" },
  });
}
