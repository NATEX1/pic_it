import connectDB from "@/lib/db";
import Building from "@/models/Building";
import { NextResponse } from "next/server";

export async function GET(request){
    await connectDB()
    const buildings = await Building.find()
    return NextResponse.json({data: buildings})
}