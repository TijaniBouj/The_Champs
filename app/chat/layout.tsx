import React from 'react'
import { SidebarDesktop } from '@/components/sidebar-desktop'

interface ChatLayoutProps {
  children: React.ReactNode
}

export default async function ChatLayout({ children }: ChatLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarDesktop />
      <div className="flex flex-col flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  )
}
