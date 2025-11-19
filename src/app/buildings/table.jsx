'use client'

import { Button } from '@/components/ui/button'
import { DropdownMenu } from '@/components/ui/dropdown-menu'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { Pencil, Search, Trash } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function BuildingTable({ data }) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [search, setSearch] = useState(searchParams.search || '')
    const [buildings, setBuildings] = useState([])

    useEffect(() => {
        fetch('/api/buildings').then(res => res.json()).then(data => setBuildings(data.data))
    }, [])

    const columns = [
        {
            accessorKey: 'name',
            header: "ชื่ออาคาร"
        },
        {
            accessorKey: 'floor',
            header: 'จำนวนชั้น'
        },
        {
            header: 'test',
            cell: () => (
                <div>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="เลือกชั่น" />
                        </SelectTrigger>
                        <SelectContent>
                            {buildings.map((building, i) => (
                                <SelectItem key={i} value={building._id}>{building.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            )
        },
        {
            header: 'จัดการ',
            cell: ({ row }) => (
                <div>
                    <Button variant={'outline'} className={'cursor-pointer'} asChild>
                        <Link href={`/buildings/${row.original._id}/edit`}>
                            <Pencil /> แก้ไช
                        </Link>
                    </Button>

                    <Button variant={'outline'} className={'cursor-pointer'}>
                        <Trash /> ลบ
                    </Button>
                </div>
            )
        }
    ]

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    useEffect(() => {
        const params = new URLSearchParams()
        if (search) {
            params.set('search', search)
        } else {
            params.delete('search')
        }
        router.replace(`?${params.toString()}`)
    }, [search])


    return (
        <div className='space-y-4'>
            <div >
                <InputGroup className={'w-sm'}>
                    <InputGroupAddon >
                        <Search />
                    </InputGroupAddon>
                    <InputGroupInput placeholder="Search..." value={search}
                        onChange={(e) => setSearch(e.target.value)} />
                </InputGroup>
            </div>
            <div className="border rounded-xl ">
                <Table className={'table-fixed'}>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
