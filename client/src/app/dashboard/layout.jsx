import LoggedNavbar from '@/components/LoggedNavbar'
import React from 'react'

export default function layout({children}) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <LoggedNavbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}
