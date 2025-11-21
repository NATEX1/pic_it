import AppSidebar from '@/components/app-sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'

export default function layout({children}) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-full p-8">
                {children}
            </main>
        </SidebarProvider>
    )
}
