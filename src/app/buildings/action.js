'use server';

import connectDB from "@/lib/db";
import Building from "@/models/Building";
import { redirect } from "next/navigation";



export async function createBuilding(prevState, formData) {
    const name = await formData.get('name');
    const floor = await formData.get('floor');
    // console.log('name: ', name);
    // console.log('floor: ', floor);

    await connectDB()

    const newBuilding = new Building({name, floor})

    await newBuilding.save()
    
    redirect('/buildings')
}


export async function updateBuilding(prevState, formData) {
    const id = await formData.get('id');
    const name = await formData.get('name');
    const floor = await formData.get('floor');
    // console.log('name: ', name);
    // console.log('floor: ', floor);

    await connectDB()

    await Building.findByIdAndUpdate(id, {
        name,
        floor: Number(floor),
    });
    redirect('/buildings')
}
