'use client'

import React, { useActionState } from 'react'
import { createBuilding } from '../action';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function page() {
     const [state, formAction, isPending] = useActionState(createBuilding, {
        success: false,
        message: '',
      });
  return (
     <div className='max-w-4xl mx-auto space-y-8'>
      <h1 className='text-4xl font-bold'>แก้ไข</h1>
      <form action={formAction} className='space-y-4'>
        <div>
          <Label htmlFor="name">ชื่ออาคาร</Label>
          <Input id="name" name="name" className={'bg-gray-200'} />
        </div>
        <div>
          <Label htmlFor="floor">จำนวนชั้น</Label>
          <Input id="floor" name="floor" className={'bg-gray-200'} />
        </div>
        <Button type="submit" disabled={isPending}>
          {isPending ? 'กำลังบันทึก...' : 'บันทึก'}
        </Button>

      </form>
    </div>
  )
}
