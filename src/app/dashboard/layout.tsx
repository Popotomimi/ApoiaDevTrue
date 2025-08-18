import { Header } from "./_components/header";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="w-full max-w-7xl mx-auto">
        {children}
      </main>
    </>
  )
}