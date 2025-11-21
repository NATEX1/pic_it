import Student from "@/models/Student";
import Teacher from "@/models/Teacher";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import connectDB from "./db";

export const authOptions = {
    providers: [
        CredentialsProvider({
            id: "student",
            name: "Student",
            credentials: {
                studentId: { label: "รหัสนักเรียน", type: "text" },
                password: { label: "วันเกิด (ddmmyyyy)", type: "text" }
            },
            async authorize(credentials) {
                const { studentId, password } = credentials;

                await connectDB();

                const student = await Student.findOne({
                    studentId,
                    birthDate: password
                });

                if (!student) {
                    throw new Error("รหัสนักเรียนหรือวันเกิดไม่ถูกต้อง");
                }

                return {
                    id: student._id,
                    name: `${student.prefix} ${student.firstName} ${student.lastName}`,
                    role: "student",
                    identifier: student.studentId
                };
            }
        }),

        CredentialsProvider({
            id: "teacher",
            name: "Teacher",
            credentials: {
                teacherId: { label: "รหัสครู", type: "text" },
                password: { label: "วันเกิด (ddmmyyyy)", type: "text" }
            },
            async authorize(credentials) {
                const { teacherId, password } = credentials;

                await connectDB();

                const teacher = await Teacher.findOne({
                    teacherId,
                    birthDate: password
                });

                if (!teacher) {
                    throw new Error("รหัสครูหรือวันเกิดไม่ถูกต้อง");
                }

                return {
                    id: teacher._id,
                    name: `${teacher.prefix} ${teacher.firstName} ${teacher.lastName}`,
                    role: "teacher",
                    identifier: teacher.teacherId
                };
            }
        }),
        CredentialsProvider({
            id: "admin",
            name: "Admin",
            credentials: {
                username: { label: "ชื่อผู้ใช้", type: "text" },
                password: { label: "รหัสผ่าน", type: "password" }
            },
            async authorize(credentials) {
                const { username, password } = credentials;

                if (username !== 'admin' && password !== '1234') {
                    throw new Error("เข้าสู่ระบบไม่สำเร็จ");
                }

                return {
                    id: 'adminId',
                    name: `Admin Art`,
                    role: "admin",
                    identifier: 'adminId'
                };
            }
        })
    ],

    session: {
        strategy: "jwt"
    },

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
                token.name = user.name;
                token.identifier = user.identifier;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.role = token.role;
            session.user.name = token.name;
            session.user.identifier = token.identifier;
            return session;
        }
    },

    secret: process.env.NEXTAUTH_SECRET
};

export default NextAuth(authOptions);
