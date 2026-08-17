import Link from "next/link"
import { ArrowLeft, ShieldAlert } from "lucide-react"
import { AdminDisasterManager } from "@/components/bencana/admin-disaster-manager"

export const metadata = { title: "Kelola Status Bencana | Admin Kedungrejo" }

export default function AdminBencanaPage() {
  return (
    <main className="min-h-screen bg-[#f0f4f1] px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-4xl space-y-6">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-sm font-bold text-emerald-800 transition hover:text-emerald-950"
        >
          <ArrowLeft size={17} /> Kembali ke dashboard
        </Link>

        <header className="rounded-2xl bg-gradient-to-br from-emerald-900 to-teal-800 p-6 text-white shadow-lg shadow-emerald-900/15 sm:p-8">
          <span className="grid size-10 place-items-center rounded-xl bg-white/15">
            <ShieldAlert size={20} />
          </span>
          <h1 className="mt-5 text-2xl font-black tracking-tight sm:text-3xl">Kelola Bencana & Status Peta</h1>
          <p className="mt-2 max-w-xl text-sm leading-7 text-emerald-100">
            Atur status peringatan darurat desa, verifikasi kondisi bencana di lapangan, dan kelola pengumuman cuaca untuk warga.
          </p>
        </header>

        <AdminDisasterManager />
      </div>
    </main>
  )
}
