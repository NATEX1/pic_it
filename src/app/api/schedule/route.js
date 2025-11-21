import connectDB from "@/lib/db";
import Classroom from "@/models/Classroom";
import Group from "@/models/Group";
import Subject from "@/models/Subject";
import Teacher from "@/models/Teacher";
import { NextResponse } from "next/server";

// app/api/schedule/route.js
export async function GET() {
    const daysOfWeek = ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์"];
    const PERIODS = [1, 2, 3, 4, 5, 6]; // คาบ 4 = พักกลางวัน

        await connectDB()
    
    // Dummy Data
    const teachers = await Teacher.find()
    const classrooms = await Classroom.find()
    const subjects = await Subject.find()
    const groups = await Group.find()

    return NextResponse.json(subjects)

    // สร้างตารางเรียน
    const schedule = [];
    groups.forEach((group) => {
        group.subjects.forEach((subjId) => {
            const subject = subjects.find((s) => s._id.toString() === subjId.toString());
            const teacher = teachers.find((t) => t._id.toString() === subject.teacherId.toString());

            // Prepare slots
            const slots = [];
            daysOfWeek.forEach((day) => {  // Changed from DAYS to daysOfWeek
                PERIODS.forEach((period) => {
                    if (period === 4) { // Explicitly add "พัก" for period 4
                        slots.push({
                            day,
                            period,
                            subject: "พัก",
                            teacherId: "",
                            teacherName: "",
                            classroom: "",
                        });
                    } else {
                        slots.push({ day, period });
                    }
                });
            });

            // Shuffle slots
            for (let i = slots.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [slots[i], slots[j]] = [slots[j], slots[i]];
            }

            // Add slots based on hoursPerWeek
            for (let i = 0; i < subject.hoursPerWeek && i < slots.length; i++) {
                const slot = slots[i];
                const classroom = classrooms[Math.floor(Math.random() * classrooms.length)];
                schedule.push({
                    day: slot.day,
                    period: slot.period,
                    groupId: group._id,
                    groupName: group.name,
                    subject: slot.subject || subject.name,  // Use "พัก" if period is 4
                    teacherId: slot.teacherId || teacher._id,
                    teacherName: slot.teacherId ? teacher.name : "", // Empty for "พัก"
                    classroom: slot.classroom || classroom.name,
                });
            }
        });
    });


    return NextResponse.json(schedule)
}
