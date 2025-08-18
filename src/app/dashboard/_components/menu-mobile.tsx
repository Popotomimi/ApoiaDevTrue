"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DialogTitle } from "@/components/ui/dialog"

export function MobileMenu() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Abrir menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[240px] sm:w-[300px] p-5">
        <DialogTitle>
          Menu
        </DialogTitle>

        <div className="flex flex-col gap-6 py-6">
          <Link
            href="/dashboard"
            className="text-sm font-medium transition-colors hover:text-primary"
            onClick={() => setOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            href="/dashboard/me"
            className="text-sm font-medium transition-colors hover:text-primary"
            onClick={() => setOpen(false)}
          >
            Meu perfil
          </Link>

          <Button
            variant="ghost"
            className="justify-start px-0 text-red-500 hover:text-red-600 hover:bg-transparent cursor-pointer"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
