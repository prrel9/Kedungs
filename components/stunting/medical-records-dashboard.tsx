"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Users,
  UserCheck,
  Building2,
  Calendar,
  ChevronDown,
  HeartPulse,
  Activity,
  ShieldCheck,
  Stethoscope,
  BookOpen,
  Home,
  CheckCircle2,
  AlertTriangle,
  ClipboardList,
  Sparkles,
  Apple,
  Droplets,
  HeartHandshake,
  BarChart2,
  FolderOpen,
  MapPin
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts"

export function MedicalRecordsDashboard({ hideSidebar = false }: { hideSidebar?: boolean }) {
  const [activeTab, setActiveTab] = useState<"lansia" | "stunting" | "all">("lansia")
  const [selectedYear, setSelectedYear] = useState("2026")
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Data Lansia per Dusun (Bar Chart)
  const lansiaDusunData = [
    { dusun: "Dusun Gabang", jiwa: 156 },
    { dusun: "Dusun Topang", jiwa: 132 },
    { dusun: "Dusun Dopok Sambi", jiwa: 124 },
    { dusun: "Dusun Karangpilang", jiwa: 100 }
  ]

  // Kelompok Usia Lansia (Donut Chart)
  const lansiaUsiaData = [
    { name: "60–69 tahun", value: 258, percentage: "50,4%", color: "#4caf50" },
    { name: "70–79 tahun", value: 172, percentage: "33,6%", color: "#ffb74d" },
    { name: "80+ tahun", value: 82, percentage: "16,0%", color: "#42a5f5" }
  ]

  // Penyakit Terbanyak Lansia
  const penyakitLansia = [
    { name: "Hipertensi", count: 176, percentage: "34,4%", fill: 70 },
    { name: "Diabetes Melitus", count: 118, percentage: "23,0%", fill: 50 },
    { name: "Asam Urat", count: 96, percentage: "18,8%", fill: 40 },
    { name: "Kolesterol Tinggi", count: 74, percentage: "14,5%", fill: 30 },
    { name: "Lainnya", count: 48, percentage: "9,3%", fill: 20 }
  ]

  // Stunting per Dusun
  const stuntingDusun = [
    { dusun: "Dusun Gabang", anak: 14, percent: "14,3%", fill: 80 },
    { dusun: "Dusun Topang", anak: 9, percent: "10,0%", fill: 55 },
    { dusun: "Dusun Dopok Sambi", anak: 8, percent: "9,3%", fill: 50 },
    { dusun: "Dusun Karangpilang", anak: 5, percent: "7,1%", fill: 35 }
  ]

  // Status Gizi Balita (Donut Chart)
  const stuntingGiziData = [
    { name: "Normal", value: 248, percentage: "79,5%", color: "#4caf50" },
    { name: "Risiko Stunting", value: 28, percentage: "9,0%", color: "#ffb74d" },
    { name: "Stunting", value: 36, percentage: "11,5%", color: "#e91e63" }
  ]

  return (
    <div className="min-h-screen bg-[#f7f9f7] text-slate-800 antialiased">
      <div className="mx-auto max-w-[1440px] px-3 sm:px-5 py-6">
        <div className={hideSidebar ? "w-full space-y-6" : "grid gap-6 lg:grid-cols-[230px_1fr]"}>
          {/* ======================================================== */}
          {/* SIDEBAR KIRI (CONDITIONAL) */}
          {/* ======================================================== */}
          {!hideSidebar && (
            <aside className="space-y-5 rounded-3xl border border-slate-200/80 bg-white p-4 shadow-sm h-fit">
              {/* Header Sidebar Logo */}
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-emerald-200 bg-emerald-50 p-1">
                  <Image
                    src="/images/logokedungrejo.jpeg"
                    alt="Desa Kedungrejo"
                    width={40}
                    height={40}
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <b className="block text-xs font-black uppercase tracking-wider text-slate-900 truncate">Desa Kedungrejo</b>
                  <span className="block text-[11px] font-medium text-slate-500 truncate">Kec. Kerek, Kab. Tuban</span>
                </div>
              </div>

              {/* Menu Group 1: Infografis */}
              <div>
                <div className="flex items-center gap-2 text-emerald-700 px-2 py-1 mb-1">
                  <BarChart2 className="h-4 w-4" />
                  <span className="text-xs font-black uppercase tracking-wider">Infografis</span>
                </div>
                <div className="space-y-0.5 pl-6 text-xs font-medium text-slate-600">
                  <Link href="/infografis" className="block rounded-xl px-3 py-2 transition hover:bg-slate-100 hover:text-slate-900">
                    Kependudukan
                  </Link>
                  <Link href="/infografis" className="block rounded-xl px-3 py-2 transition hover:bg-slate-100 hover:text-slate-900">
                    Pendidikan
                  </Link>
                  <Link href="/infografis" className="block rounded-xl px-3 py-2 transition hover:bg-slate-100 hover:text-slate-900">
                    Pekerjaan
                  </Link>
                </div>
              </div>

              {/* Menu Group 2: Data Rekam Medis (Active Group) */}
              <div className="rounded-2xl bg-emerald-50/80 p-2 border border-emerald-100">
                <div className="flex items-center gap-2 text-emerald-800 px-2 py-1">
                  <FolderOpen className="h-4 w-4 text-emerald-700" />
                  <span className="text-xs font-black uppercase tracking-wider">Data Rekam Medis</span>
                </div>

                <div className="mt-1 space-y-1 pl-6">
                  <button
                    type="button"
                    onClick={() => setActiveTab("lansia")}
                    className={`w-full text-left rounded-xl px-3 py-2 text-xs font-bold transition ${
                      activeTab === "lansia"
                        ? "bg-emerald-700 text-white shadow-sm"
                        : "text-emerald-900 hover:bg-emerald-100/70"
                    }`}
                  >
                    Lansia
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("stunting")}
                    className={`w-full text-left rounded-xl px-3 py-2 text-xs font-bold transition ${
                      activeTab === "stunting"
                        ? "bg-emerald-700 text-white shadow-sm"
                        : "text-emerald-900 hover:bg-emerald-100/70"
                    }`}
                  >
                    Stunting
                  </button>
                </div>
              </div>

              {/* Menu Group 3: Peta Lokasi Bencana */}
              <div>
                <Link
                  href="/peta-bencana"
                  className="flex items-center gap-2 text-xs font-bold text-slate-700 px-3 py-2.5 rounded-xl transition hover:bg-slate-100"
                >
                  <MapPin className="h-4 w-4 text-slate-500" />
                  <span>Peta Lokasi Bencana</span>
                </Link>
              </div>

              {/* Bottom Sidebar Widget */}
              <div className="rounded-2xl border border-emerald-200/70 bg-gradient-to-b from-emerald-50/90 to-emerald-100/40 p-4 text-center">
                <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 shadow-inner">
                  <HeartHandshake className="h-7 w-7" />
                </div>
                <h4 className="text-xs font-black text-slate-900">Data untuk Desa Sehat</h4>
                <p className="mt-1.5 text-[11px] leading-relaxed text-slate-600 font-medium">
                  Data kesehatan masyarakat Desa Kedungrejo kami sajikan secara transparan untuk mendukung desa yang lebih sehat dan sejahtera.
                </p>
              </div>
            </aside>
          )}

          {/* ======================================================== */}
          {/* MAIN CONTENT AREA */}
          {/* ======================================================== */}
          <main className="space-y-6">
            {/* ---------------------------------------------------- */}
            {/* HEADER CONTENT */}
            {/* ---------------------------------------------------- */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm">
              <div>
                <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                  Data Rekam Medis Desa Kedungrejo
                </h1>
                <p className="mt-1 text-xs sm:text-sm font-medium text-slate-500">
                  Informasi data kesehatan masyarakat berdasarkan hasil pendataan dan posyandu.
                </p>
              </div>

              {/* Year Dropdown */}
              <div className="flex items-center gap-2">
                <div className="relative">
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 pr-9 text-xs font-black text-slate-800 outline-none transition focus:border-emerald-600 focus:bg-white cursor-pointer"
                  >
                    <option value="2026">2026</option>
                    <option value="2025">2025</option>
                    <option value="2024">2024</option>
                  </select>
                  <Calendar className="pointer-events-none absolute right-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
                </div>
              </div>
            </div>

            {/* ---------------------------------------------------- */}
            {/* TAB DATA (LANSIA | STUNTING) */}
            {/* ---------------------------------------------------- */}
            <div className="flex items-center gap-6 border-b border-slate-200/80 px-2">
              <button
                type="button"
                onClick={() => setActiveTab("lansia")}
                className={`pb-3 text-sm font-black transition relative ${
                  activeTab === "lansia" || activeTab === "all"
                    ? "text-emerald-700 border-b-2 border-emerald-700"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Users className="h-4 w-4" /> Lansia
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("stunting")}
                className={`pb-3 text-sm font-black transition relative ${
                  activeTab === "stunting"
                    ? "text-emerald-700 border-b-2 border-emerald-700"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                <span className="flex items-center gap-2">
                  <HeartPulse className="h-4 w-4" /> Stunting
                </span>
              </button>
            </div>

            {/* ======================================================== */}
            {/* DASHBOARD LANSIA SECTION */}
            {/* ======================================================== */}
            {(activeTab === "lansia" || activeTab === "all") && (
              <div className="space-y-6">
                <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-6">
                  <div>
                    <h2 className="text-lg font-black text-slate-900">Ringkasan Data Lansia</h2>
                    <p className="text-xs font-medium text-slate-500 mt-0.5">
                      Data penduduk lanjut usia (60 tahun ke atas) di Desa Kedungrejo
                    </p>
                  </div>

                  {/* 4 STATISTIC CARDS LANSIA */}
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Card 1 */}
                    <div className="rounded-2xl border border-slate-200/80 bg-white p-4 space-y-3 shadow-xs">
                      <div className="flex items-center justify-between">
                        <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 text-emerald-700">
                          <Users className="h-5 w-5" />
                        </span>
                        <span className="text-[11px] font-bold text-slate-500">Total Lansia</span>
                      </div>
                      <div>
                        <span className="text-3xl font-black text-slate-900">512</span>
                        <span className="ml-1.5 text-xs font-bold text-slate-500">Jiwa</span>
                      </div>
                      <div className="rounded-lg bg-slate-50 py-1 px-2 text-[11px] font-medium text-slate-500">
                        7,8% dari total penduduk
                      </div>
                    </div>

                    {/* Card 2 */}
                    <div className="rounded-2xl border border-slate-200/80 bg-white p-4 space-y-3 shadow-xs">
                      <div className="flex items-center justify-between">
                        <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue-600">
                          <Users className="h-5 w-5" />
                        </span>
                        <span className="text-[11px] font-bold text-slate-500">Laki-laki</span>
                      </div>
                      <div>
                        <span className="text-3xl font-black text-slate-900">238</span>
                        <span className="ml-1.5 text-xs font-bold text-slate-500">Jiwa</span>
                      </div>
                      <div className="text-[11px] font-bold text-slate-500">46,5%</div>
                    </div>

                    {/* Card 3 */}
                    <div className="rounded-2xl border border-slate-200/80 bg-white p-4 space-y-3 shadow-xs">
                      <div className="flex items-center justify-between">
                        <span className="grid h-10 w-10 place-items-center rounded-xl bg-pink-50 text-pink-600">
                          <Users className="h-5 w-5" />
                        </span>
                        <span className="text-[11px] font-bold text-slate-500">Perempuan</span>
                      </div>
                      <div>
                        <span className="text-3xl font-black text-slate-900">274</span>
                        <span className="ml-1.5 text-xs font-bold text-slate-500">Jiwa</span>
                      </div>
                      <div className="text-[11px] font-bold text-slate-500">53,5%</div>
                    </div>

                    {/* Card 4 */}
                    <div className="rounded-2xl border border-slate-200/80 bg-white p-4 space-y-3 shadow-xs">
                      <div className="flex items-center justify-between">
                        <span className="grid h-10 w-10 place-items-center rounded-xl bg-amber-50 text-amber-600">
                          <Home className="h-5 w-5" />
                        </span>
                        <span className="text-[11px] font-bold text-slate-500">Dusun Terbanyak</span>
                      </div>
                      <div>
                        <span className="text-lg font-black text-slate-900 block">Dusun Gabang</span>
                        <span className="text-xs font-bold text-slate-500">156 Jiwa</span>
                      </div>
                    </div>
                  </div>

                  {/* GRAFIK LANSIA (2 COLUMN) */}
                  <div className="grid gap-6 lg:grid-cols-2 pt-2">
                    {/* Left: Bar Chart Sebaran Lansia per Dusun */}
                    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 space-y-4">
                      <h3 className="text-sm font-black text-slate-900">Sebaran Lansia per Dusun</h3>

                      {isClient ? (
                        <div className="h-56 w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={lansiaDusunData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                              <XAxis dataKey="dusun" tick={{ fontSize: 10, fontWeight: 600, fill: "#64748b" }} axisLine={false} tickLine={false} />
                              <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} domain={[0, 200]} />
                              <Tooltip cursor={{ fill: "rgba(0,0,0,0.03)" }} contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
                              <Bar dataKey="jiwa" fill="#4caf50" radius={[8, 8, 0, 0]} barSize={40} label={{ position: "top", fill: "#1e293b", fontSize: 12, fontWeight: 800 }} />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      ) : (
                        <div className="h-56 grid place-items-center text-xs text-slate-400">Memuat grafik...</div>
                      )}
                    </div>

                    {/* Right: Donut Chart Kelompok Usia Lansia */}
                    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 space-y-4">
                      <h3 className="text-sm font-black text-slate-900">Kelompok Usia Lansia</h3>

                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="relative h-48 w-48 shrink-0">
                          {isClient ? (
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie data={lansiaUsiaData} innerRadius={55} outerRadius={80} paddingAngle={2} dataKey="value">
                                  {lansiaUsiaData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                  ))}
                                </Pie>
                              </PieChart>
                            </ResponsiveContainer>
                          ) : null}
                          <div className="absolute inset-0 grid place-items-center text-center pointer-events-none">
                            <div>
                              <span className="text-[10px] font-extrabold uppercase text-slate-400 block">Total</span>
                              <span className="text-xl font-black text-slate-900 block leading-tight">512</span>
                              <span className="text-[10px] font-bold text-slate-500 block">Jiwa</span>
                            </div>
                          </div>
                        </div>

                        {/* Legend List */}
                        <div className="space-y-3 w-full sm:w-auto">
                          {lansiaUsiaData.map((item) => (
                            <div key={item.name} className="flex items-center gap-2 text-xs">
                              <span className="h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                              <div>
                                <span className="font-bold text-slate-700 block">{item.name}</span>
                                <span className="text-slate-500 text-[11px]">{item.value} jiwa ({item.percentage})</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* INFORMASI KESEHATAN LANSIA (2 COLUMN) */}
                  <div className="grid gap-6 lg:grid-cols-2 pt-2">
                    {/* Left: Penyakit Terbanyak */}
                    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 space-y-4">
                      <h3 className="text-sm font-black text-slate-900">Penyakit Terbanyak pada Lansia</h3>

                      <div className="space-y-3">
                        {penyakitLansia.map((item) => (
                          <div key={item.name} className="space-y-1">
                            <div className="flex justify-between text-xs font-bold text-slate-700">
                              <span>{item.name}</span>
                              <span className="text-slate-900">{item.count} ({item.percentage})</span>
                            </div>
                            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                              <div className="h-full rounded-full bg-emerald-600" style={{ width: `${item.fill}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right: Layanan Kesehatan Lansia */}
                    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 space-y-4">
                      <h3 className="text-sm font-black text-slate-900">Layanan Kesehatan Lansia</h3>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-xl border border-slate-100 bg-emerald-50/50 p-3 flex items-center gap-3">
                          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-emerald-100 text-emerald-700">
                            <Stethoscope className="h-4 w-4" />
                          </div>
                          <div>
                            <span className="text-xs font-bold text-slate-800 block">Posyandu Lansia</span>
                            <span className="text-[11px] font-medium text-slate-500">4 Posyandu</span>
                          </div>
                        </div>

                        <div className="rounded-xl border border-slate-100 bg-emerald-50/50 p-3 flex items-center gap-3">
                          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-emerald-100 text-emerald-700">
                            <Home className="h-4 w-4" />
                          </div>
                          <div>
                            <span className="text-xs font-bold text-slate-800 block">Kunjungan Rumah</span>
                            <span className="text-[11px] font-medium text-slate-500">Rutin Dilakukan</span>
                          </div>
                        </div>

                        <div className="rounded-xl border border-slate-100 bg-emerald-50/50 p-3 flex items-center gap-3">
                          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-emerald-100 text-emerald-700">
                            <Activity className="h-4 w-4" />
                          </div>
                          <div>
                            <span className="text-xs font-bold text-slate-800 block">Pemeriksaan Berkala</span>
                            <span className="text-[11px] font-medium text-slate-500">Setiap Bulan</span>
                          </div>
                        </div>

                        <div className="rounded-xl border border-slate-100 bg-emerald-50/50 p-3 flex items-center gap-3">
                          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-emerald-100 text-emerald-700">
                            <BookOpen className="h-4 w-4" />
                          </div>
                          <div>
                            <span className="text-xs font-bold text-slate-800 block">Edukasi Kesehatan</span>
                            <span className="text-[11px] font-medium text-slate-500">Secara Berkala</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* DASHBOARD STUNTING SECTION */}
            {/* ======================================================== */}
            {(activeTab === "stunting" || activeTab === "all") && (
              <div className="space-y-6">
                <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-6">
                  <div>
                    <h2 className="text-lg font-black text-slate-900">Ringkasan Data Stunting</h2>
                    <p className="text-xs font-medium text-slate-500 mt-0.5">
                      Data balita dengan risiko stunting di Desa Kedungrejo
                    </p>
                  </div>

                  {/* 4 STATISTIC CARDS STUNTING */}
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Card 1 */}
                    <div className="rounded-2xl border border-slate-200/80 bg-white p-4 space-y-3 shadow-xs">
                      <div className="flex items-center justify-between">
                        <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 text-emerald-700">
                          <Users className="h-5 w-5" />
                        </span>
                        <span className="text-[11px] font-bold text-slate-500">Total Balita</span>
                      </div>
                      <div>
                        <span className="text-3xl font-black text-slate-900">312</span>
                        <span className="ml-1.5 text-xs font-bold text-slate-500">Anak</span>
                      </div>
                    </div>

                    {/* Card 2 */}
                    <div className="rounded-2xl border border-slate-200/80 bg-white p-4 space-y-3 shadow-xs">
                      <div className="flex items-center justify-between">
                        <span className="grid h-10 w-10 place-items-center rounded-xl bg-pink-50 text-pink-600">
                          <HeartPulse className="h-5 w-5" />
                        </span>
                        <span className="text-[11px] font-bold text-slate-500">Balita Stunting</span>
                      </div>
                      <div>
                        <span className="text-3xl font-black text-slate-900">36</span>
                        <span className="ml-1.5 text-xs font-bold text-slate-500">Anak</span>
                      </div>
                      <div className="text-[11px] font-bold text-slate-500">11,5% dari total balita</div>
                    </div>

                    {/* Card 3 */}
                    <div className="rounded-2xl border border-slate-200/80 bg-white p-4 space-y-3 shadow-xs">
                      <div className="flex items-center justify-between">
                        <span className="grid h-10 w-10 place-items-center rounded-xl bg-amber-50 text-amber-600">
                          <AlertTriangle className="h-5 w-5" />
                        </span>
                        <span className="text-[11px] font-bold text-slate-500">Balita Risiko Stunting</span>
                      </div>
                      <div>
                        <span className="text-3xl font-black text-slate-900">28</span>
                        <span className="ml-1.5 text-xs font-bold text-slate-500">Anak</span>
                      </div>
                      <div className="text-[11px] font-bold text-slate-500">9,0% dari total balita</div>
                    </div>

                    {/* Card 4 */}
                    <div className="rounded-2xl border border-slate-200/80 bg-white p-4 space-y-3 shadow-xs">
                      <div className="flex items-center justify-between">
                        <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 text-emerald-700">
                          <CheckCircle2 className="h-5 w-5" />
                        </span>
                        <span className="text-[11px] font-bold text-slate-500">Balita Normal</span>
                      </div>
                      <div>
                        <span className="text-3xl font-black text-slate-900">248</span>
                        <span className="ml-1.5 text-xs font-bold text-slate-500">Anak</span>
                      </div>
                      <div className="text-[11px] font-bold text-slate-500">79,5% dari total balita</div>
                    </div>
                  </div>

                  {/* GRAFIK STUNTING (2 COLUMN) */}
                  <div className="grid gap-6 lg:grid-cols-2 pt-2">
                    {/* Left: Sebaran Stunting per Dusun */}
                    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 space-y-4">
                      <h3 className="text-sm font-black text-slate-900">Sebaran Stunting per Dusun</h3>

                      <div className="space-y-3">
                        <div className="flex justify-between text-[11px] font-bold uppercase text-slate-400 border-b border-slate-100 pb-2">
                          <span>Dusun</span>
                          <span>Stunting / Persentase</span>
                        </div>
                        {stuntingDusun.map((item) => (
                          <div key={item.dusun} className="space-y-1">
                            <div className="flex justify-between text-xs font-bold text-slate-700">
                              <span>{item.dusun}</span>
                              <span className="text-slate-900">{item.anak} anak <span className="text-slate-400 font-normal">({item.percent})</span></span>
                            </div>
                            <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                              <div className="h-full rounded-full bg-pink-500" style={{ width: `${item.fill}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right: Donut Chart Status Gizi Balita */}
                    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 space-y-4">
                      <h3 className="text-sm font-black text-slate-900">Status Gizi Balita</h3>

                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="relative h-48 w-48 shrink-0">
                          {isClient ? (
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie data={stuntingGiziData} innerRadius={55} outerRadius={80} paddingAngle={2} dataKey="value">
                                  {stuntingGiziData.map((entry, index) => (
                                    <Cell key={`cell-gizi-${index}`} fill={entry.color} />
                                  ))}
                                </Pie>
                              </PieChart>
                            </ResponsiveContainer>
                          ) : null}
                          <div className="absolute inset-0 grid place-items-center text-center pointer-events-none">
                            <div>
                              <span className="text-[10px] font-extrabold uppercase text-slate-400 block">Total</span>
                              <span className="text-xl font-black text-slate-900 block leading-tight">312</span>
                              <span className="text-[10px] font-bold text-slate-500 block">Anak</span>
                            </div>
                          </div>
                        </div>

                        {/* Legend List */}
                        <div className="space-y-3 w-full sm:w-auto">
                          {stuntingGiziData.map((item) => (
                            <div key={item.name} className="flex items-center gap-2 text-xs">
                              <span className="h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                              <div>
                                <span className="font-bold text-slate-700 block">{item.name}</span>
                                <span className="text-slate-500 text-[11px]">{item.value} anak ({item.percentage})</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* PENCEGAHAN STUNTING (FULL WIDTH CARD) */}
                  <div className="rounded-2xl border border-slate-200/80 bg-white p-5 space-y-4">
                    <h3 className="text-sm font-black text-slate-900">Upaya Pencegahan Stunting</h3>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                      <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-3 space-y-2">
                        <div className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-100 text-emerald-800">
                          <ClipboardList className="h-4 w-4" />
                        </div>
                        <p className="text-xs font-bold text-slate-800 leading-tight">
                          Pemantauan Tumbuh Kembang Rutin di Posyandu
                        </p>
                      </div>

                      <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-3 space-y-2">
                        <div className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-100 text-emerald-800">
                          <Apple className="h-4 w-4" />
                        </div>
                        <p className="text-xs font-bold text-slate-800 leading-tight">
                          Pemberian Makanan Tambahan (PMT)
                        </p>
                      </div>

                      <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-3 space-y-2">
                        <div className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-100 text-emerald-800">
                          <BookOpen className="h-4 w-4" />
                        </div>
                        <p className="text-xs font-bold text-slate-800 leading-tight">
                          Edukasi Gizi untuk Orang Tua
                        </p>
                      </div>

                      <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-3 space-y-2">
                        <div className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-100 text-emerald-800">
                          <Droplets className="h-4 w-4" />
                        </div>
                        <p className="text-xs font-bold text-slate-800 leading-tight">
                          Sanitasi dan PHBS
                        </p>
                      </div>

                      <div className="col-span-2 sm:col-span-1 rounded-xl border border-slate-100 bg-slate-50/80 p-3 space-y-2">
                        <div className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-100 text-emerald-800">
                          <UserCheck className="h-4 w-4" />
                        </div>
                        <p className="text-xs font-bold text-slate-800 leading-tight">
                          Kolaborasi dengan Tenaga Kesehatan
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* FOOTER DATA */}
            {/* ---------------------------------------------------- */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-[11px] font-semibold text-slate-400 pt-2 px-2 border-t border-slate-200/60">
              <p>Sumber Data: Pendataan Desa Kedungrejo & Laporan Posyandu Tahun 2026</p>
              <p>Data diperbarui: 15 Mei 2026</p>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
