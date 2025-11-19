import React from 'react'
import BuildingTable from './table'
import connectDB from '@/lib/db'
import Building from '@/models/Building'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

async function getBuilding(params) {
    await connectDB()

    const { search } = await params

    const query = search
        ? { name: { $regex: search, $options: 'i' } }
        : {};

    const buildings = await Building.find(query).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(buildings));

}

export default async function page({ searchParams }) {
    const data = await getBuilding(searchParams)
    return (
        <div>
            <h1 className='text-4xl font-bold mb-4'>อาคารเรียน</h1>
            <div className='flex justify-end'>
                <Button asChild>
                    <Link href={'/buildings/create'}>
                        <Plus /> เพิ่มอาคาร
                    </Link>
                </Button>
            </div>
            <BuildingTable data={data} />
        </div>
    )
}
