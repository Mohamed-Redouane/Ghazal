"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Toaster } from "@/components/ui/sonner"

function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <>
      {children}
      {isMounted && (
        <Toaster
          position="bottom-right"
          theme="dark"
          richColors
          closeButton
          expand={false}
          visibleToasts={5}
          toastOptions={{
            classNames: {
              toast:
                "rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white font-medium !z-[9999]",
              description: "text-sm text-gray-500 dark:text-gray-300",
              actionButton: "text-blue-500 hover:text-blue-700",
              cancelButton: "text-gray-400 hover:text-gray-600",
            },
            style: {
              padding: "16px",
              zIndex: 9999,
            },
            duration: 4000,
          }}
          style={{
            zIndex: 9999,
          }}
        />
      )}
    </>
  )
}

export default ClientLayout
