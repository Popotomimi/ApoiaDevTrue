
import Link from "next/link"
import { HandCoins, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MobileMenu } from "./menu-mobile"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">

      <div className="flex h-16 items-center justify-between w-full px-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 font-semibold">
          <Link href="/dashboard" className="flex items-center gap-1 text-amber-500">
            <HandCoins className="h-6 w-6 mr-2" />
            <span className="text-xl font-bold">
              ApoiaDev
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/dashboard" className="text-sm font-medium transition-colors hover:text-primary">
            Dashboard
          </Link>
          <Link href="/dashboard/me" className="text-sm font-medium transition-colors hover:text-primary">
            Meu perfil
          </Link>

          <Button
            variant="ghost"
            size="icon"
            className="text-red-500 hover:text-red-600 hover:bg-red-50"
          >
            <LogOut className="h-5 w-5" />
            <span className="sr-only">Sair</span>
          </Button>
        </nav>

        <MobileMenu />
      </div>
    </header>
  )
}
