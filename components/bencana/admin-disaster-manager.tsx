"use client"

import { useState } from "react"
import { ShieldAlert, AlertTriangle, CheckCircle2, Save, Megaphone } from "lucide-react"

export function AdminDisasterManager() {
  const [overrideStatus, setOverrideStatus] = useState<"auto" | "aman" | "waspada" | "bahaya">("auto")
  const [announcement, setAnnouncement] = useState("")
  const [saved, setSaved] = useState(false)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const statusOptions = [
    {
      value: "auto" as const,
      label: "Otomatis (API)",
      description: "Ikuti ramalan BMKG/Open-Meteo",
      icon: CheckCircle2,
      activeClass: "border-emerald-600 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-200",
    },
    {
      value: "aman" as const,
      label: 'Paksa "AMAN"',
      description: "Kondisi lapangan kondusif",
      icon: CheckCircle2,
      activeClass: "border-emerald-600 bg-emerald-600 text-white shadow-md",
    },
    {
      value: "waspada" as const,
      label: 'Paksa "WASPADA"',
      description: "Genangan lokal / Hujan deras",
      icon: AlertTriangle,
      activeClass: "border-amber-600 bg-amber-600 text-white shadow-md",
    },
    {
      value: "bahaya" as const,
      label: "SIAGA BANJIR KIRIMAN",
      description: "Banjir kiriman hulu / Luapan",
      icon: ShieldAlert,
      activeClass: "border-rose-700 bg-rose-700 text-white shadow-md",
    },
  ]

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
      <div className="border-b border-slate-100 pb-4">
        <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">Panel kontrol admin</p>
        <h2 className="text-lg font-black text-slate-900 mt-1">Kelola Status Bencana & Peta</h2>
        <p className="text-xs text-slate-500 mt-1">
          Pengaturan manual jika terjadi cuaca ekstrem lokal atau luapan banjir kiriman sungai hulu.
        </p>
      </div>

      <form onSubmit={handleSave} className="mt-5 space-y-5">
        {/* Status Override */}
        <div className="rounded-xl bg-slate-50 p-4 space-y-3">
          <p className="text-xs font-bold text-slate-800">
            1. Mode Status Keamanan Bencana
          </p>

          <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
            {statusOptions.map(({ value, label, description, icon: Icon, activeClass }) => (
              <button
                key={value}
                type="button"
                onClick={() => setOverrideStatus(value)}
                className={`rounded-xl p-3 text-left border transition text-xs ${
                  overrideStatus === value
                    ? activeClass
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-black">{label}</span>
                  <Icon className="h-3.5 w-3.5" />
                </div>
                <p className="text-[10px] opacity-80 mt-1">{description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Emergency Announcement */}
        <div className="rounded-xl bg-slate-50 p-4 space-y-2.5">
          <div className="flex items-center gap-2">
            <Megaphone className="h-3.5 w-3.5 text-emerald-700" />
            <p className="text-xs font-bold text-slate-800">
              2. Pengumuman Darurat Bencana Desa
            </p>
          </div>
          <textarea
            rows={3}
            value={announcement}
            onChange={(e) => setAnnouncement(e.target.value)}
            placeholder="Misal: Dihimbau warga Dusun Gabang untuk mengamankan pompa air persawahan karena debit air sungai mulai naik..."
            className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-900 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 font-medium"
          />
        </div>

        {/* Save */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-t border-slate-100 pt-4">
          {saved ? (
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
              <CheckCircle2 className="h-3.5 w-3.5" /> Pengaturan berhasil diperbarui!
            </span>
          ) : (
            <span className="text-xs text-slate-400 font-medium">* Perubahan langsung berefek ke tampilan warga.</span>
          )}

          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-800 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-emerald-900 transition"
          >
            <Save className="h-3.5 w-3.5" />
            <span>Simpan Pengaturan</span>
          </button>
        </div>
      </form>
    </div>
  )
}
