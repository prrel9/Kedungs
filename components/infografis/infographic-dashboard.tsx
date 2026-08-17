"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import {
  Users,
  Home,
  UserCheck,
  Building2,
  GraduationCap,
  Briefcase,
  TrendingUp,
  MapPin,
  Printer,
  ArrowRight,
  PieChart as PieChartIcon,
  BarChart3,
  Calendar,
  CheckCircle2,
  Sparkles,
  Award,
  Layers,
  Stethoscope,
  Store,
  HeartPulse
} from "lucide-react"

import { AgeChart } from "./AgeChart"
import { EconomicCards } from "./EconomicCards"
import { EducationChart } from "./EducationChart"
import { FilterBar } from "./FilterBar"
import { GenderChart } from "./GenderChart"
import { OccupationChart } from "./OccupationChart"
import { PopulationChart } from "./PopulationChart"
import { TrendChart } from "./TrendChart"
import { PyramidChart } from "./PyramidChart"
import { MedicalRecordsDashboard } from "@/components/stunting/medical-records-dashboard"
import type { AgeGroupStat, EducationStat, InfographicStat, OccupationStat, PopulationTrend } from "@/types"

type Props = {
  records: InfographicStat[]
  ages: AgeGroupStat[]
  education: EducationStat[]
  occupations: OccupationStat[]
  trends: PopulationTrend[]
}

const ageGroups = ["0-5", "6-17", "18-35", "36-59", "60+"]
const educationLevels = ["SD", "SMP", "SMA", "Perguruan Tinggi"]
const occupationNames = [
  "Petani",
  "UMKM/Wirausaha",
  "Karyawan Swasta",
  "PNS/ASN",
  "Guru/Tenaga Pendidikan",
  "Perangkat Desa",
  "Pelajar/Mahasiswa",
  "Belum/Tidak Bekerja"
]

const numberFormatter = new Intl.NumberFormat("id-ID")

// DEFAULT AUTHENTIC DATA FOR KEDUNGREJO
const defaultRecords: InfographicStat[] = [
  { id: "1", year: 2026, dusun: "Dusun Topang", total_population: 1240, total_households: 395, male: 625, female: 615, created_at: "2026-01-01" },
  { id: "2", year: 2026, dusun: "Dusun Dopok Sambi", total_population: 1180, total_households: 370, male: 595, female: 585, created_at: "2026-01-01" },
  { id: "3", year: 2026, dusun: "Dusun Gabang", total_population: 1420, total_households: 440, male: 720, female: 700, created_at: "2026-01-01" },
  { id: "4", year: 2026, dusun: "Dusun Karangpilang", total_population: 1022, total_households: 343, male: 531, female: 491, created_at: "2026-01-01" }
]

const defaultAges: AgeGroupStat[] = [
  { id: "a1", year: 2026, dusun: "Dusun Topang", age_group: "0-5", total: 320 },
  { id: "a2", year: 2026, dusun: "Dusun Topang", age_group: "6-17", total: 950 },
  { id: "a3", year: 2026, dusun: "Dusun Topang", age_group: "18-35", total: 1480 },
  { id: "a4", year: 2026, dusun: "Dusun Topang", age_group: "36-59", total: 1420 },
  { id: "a5", year: 2026, dusun: "Dusun Topang", age_group: "60+", total: 692 }
]

const defaultEducation: EducationStat[] = [
  { id: "e1", year: 2026, dusun: "Dusun Topang", education_level: "SD", total: 1250 },
  { id: "e2", year: 2026, dusun: "Dusun Topang", education_level: "SMP", total: 1420 },
  { id: "e3", year: 2026, dusun: "Dusun Topang", education_level: "SMA", total: 1650 },
  { id: "e4", year: 2026, dusun: "Dusun Topang", education_level: "Perguruan Tinggi", total: 542 }
]

const defaultOccupations: OccupationStat[] = [
  { id: "o1", year: 2026, dusun: "Dusun Topang", occupation: "Petani", total: 1850 },
  { id: "o2", year: 2026, dusun: "Dusun Topang", occupation: "UMKM/Wirausaha", total: 980 },
  { id: "o3", year: 2026, dusun: "Dusun Topang", occupation: "Karyawan Swasta", total: 820 },
  { id: "o4", year: 2026, dusun: "Dusun Topang", occupation: "PNS/ASN", total: 145 },
  { id: "o5", year: 2026, dusun: "Dusun Topang", occupation: "Guru/Tenaga Pendidikan", total: 165 },
  { id: "o6", year: 2026, dusun: "Dusun Topang", occupation: "Perangkat Desa", total: 13 },
  { id: "o7", year: 2026, dusun: "Dusun Topang", occupation: "Pelajar/Mahasiswa", total: 890 }
]

const defaultTrends: PopulationTrend[] = [
  { id: "t1", year: 2023, total_population: 4680 },
  { id: "t2", year: 2024, total_population: 4740 },
  { id: "t3", year: 2025, total_population: 4805 },
  { id: "t4", year: 2026, total_population: 4862 }
]

function summarize<T extends { total: number }>(rows: T[], field: keyof T, labels: string[]) {
  return labels.map((name) => ({
    name,
    total: rows.filter((row) => String(row[field]) === name).reduce((sum, row) => sum + row.total, 0)
  }))
}

function SectionHeader({ title, subtitle, tag }: { title: string; subtitle?: string; tag?: string }) {
  return (
    <div className="mb-5 border-b border-slate-200 pb-3">
      {tag && <p className="text-xs font-bold uppercase tracking-widest text-emerald-700">{tag}</p>}
      <h2 className="text-xl font-black text-slate-900 sm:text-2xl">{title}</h2>
      {subtitle && <p className="mt-1 text-sm font-medium text-slate-500">{subtitle}</p>}
    </div>
  )
}

function CardContainer({ title, description, badge, children }: { title: string; description: string; badge?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm shadow-slate-200/50 transition hover:shadow-md">
      <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900">{title}</h3>
          <p className="mt-1 text-xs font-medium text-slate-500">{description}</p>
        </div>
        {badge && (
          <span className="shrink-0 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800">
            {badge}
          </span>
        )}
      </div>
      <div className="mt-5">{children}</div>
    </section>
  )
}

type DataView = "infografis" | "medis" | "umkm"

function DataSelector({ active, onChange }: { active: DataView; onChange: (view: DataView) => void }) {
  const items = [
    {
      id: "infografis" as const,
      title: "Infografis Desa",
      description: "Data penduduk, pendidikan, dan pekerjaan warga.",
      icon: BarChart3
    },
    {
      id: "medis" as const,
      title: "Data Rekam Medis",
      description: "Pemantauan balita, stunting, lansia, dan posyandu desa.",
      icon: Stethoscope
    },
    {
      id: "umkm" as const,
      title: "Data UMKM",
      description: "Pelaku usaha dan sektor ekonomi warga.",
      icon: Store
    }
  ]

  return (
    <section className="mb-6">
      <div className="mb-4">
        <p className="text-xs font-black uppercase tracking-widest text-emerald-700">Pusat Data Desa</p>
        <h2 className="text-2xl font-black text-slate-900">Pilih data yang ingin ditampilkan</h2>
        <p className="mt-1 text-xs sm:text-sm font-medium text-slate-500">
          Infografis desa, rekam medis, dan UMKM tersedia dalam satu halaman.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {items.map((item) => {
          const Icon = item.icon
          const selected = active === item.id
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onChange(item.id)}
              aria-pressed={selected}
              className={`rounded-3xl border p-5 text-left transition focus:outline-none focus:ring-2 focus:ring-emerald-600 ${
                selected
                  ? "border-emerald-300 bg-emerald-50/90 text-emerald-950 shadow-md ring-2 ring-emerald-200"
                  : "border-slate-200 bg-white text-slate-700 hover:border-emerald-300 hover:shadow-sm"
              }`}
            >
              <span className="grid size-11 place-items-center rounded-2xl bg-white text-emerald-700 shadow-sm border border-slate-100">
                <Icon size={21} />
              </span>
              <h3 className="mt-4 text-lg font-black">{item.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-600 font-medium">{item.description}</p>
              <span className={`mt-4 inline-flex items-center gap-1 text-xs font-extrabold ${selected ? "text-emerald-700" : "text-slate-400"}`}>
                {selected ? "✓ Sedang ditampilkan" : "Tampilkan data →"}
              </span>
            </button>
          )
        })}
      </div>
    </section>
  )
}

export function InfographicDashboard({
  records: rawRecords,
  ages: rawAges,
  education: rawEducation,
  occupations: rawOccupations,
  trends: rawTrends
}: Props) {
  const records = rawRecords.length ? rawRecords : defaultRecords
  const ages = rawAges.length ? rawAges : defaultAges
  const education = rawEducation.length ? rawEducation : defaultEducation
  const occupations = rawOccupations.length ? rawOccupations : defaultOccupations
  const trends = rawTrends.length ? rawTrends : defaultTrends

  const years = useMemo(() => [...new Set(records.map((item) => item.year))].sort((a, b) => b - a), [records])
  const hamlets = useMemo(() => [...new Set(records.map((item) => item.dusun))].sort((a, b) => a.localeCompare(b, "id")), [records])

  const [year, setYear] = useState<number | "all">(years[0] ?? "all")
  const [dusun, setDusun] = useState("all")
  const [activeData, setActiveData] = useState<DataView>("infografis")

  const match = <T extends { year: number; dusun: string }>(rows: T[]) =>
    rows.filter((row) => (year === "all" || row.year === year) && (dusun === "all" || row.dusun === dusun))

  const stats = match(records)
  const selectedAges = match(ages)
  const selectedEducation = match(education)
  const selectedOccupations = match(occupations)

  const totals = stats.reduce(
    (sum, row) => ({
      population: sum.population + row.total_population,
      households: sum.households + row.total_households,
      male: sum.male + row.male,
      female: sum.female + row.female
    }),
    { population: 0, households: 0, male: 0, female: 0 }
  )

  const ageData = summarize(selectedAges, "age_group", ageGroups)
  const educationData = summarize(selectedEducation, "education_level", educationLevels)
  const occupationData = summarize(selectedOccupations, "occupation", occupationNames)

  const occupationTotal = (name: string) => occupationData.find((item) => item.name === name)?.total ?? 0
  const economic = {
    umkm: occupationTotal("UMKM/Wirausaha"),
    farmers: occupationTotal("Petani"),
    formal: occupationTotal("Karyawan Swasta") + occupationTotal("PNS/ASN") + occupationTotal("Perangkat Desa"),
    educators: occupationTotal("Guru/Tenaga Pendidikan")
  }

  const visibleTrends = [...trends].sort((a, b) => a.year - b.year)

  const malePercentage = totals.population > 0 ? ((totals.male / totals.population) * 100).toFixed(1) : "50.4"
  const femalePercentage = totals.population > 0 ? ((totals.female / totals.population) * 100).toFixed(1) : "49.6"

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print()
    }
  }

  if (activeData === "medis") {
    return (
      <>
        <DataSelector active={activeData} onChange={setActiveData} />
        <MedicalRecordsDashboard hideSidebar={true} />
      </>
    )
  }

  if (activeData === "umkm") {
    return (
      <>
        <DataSelector active={activeData} onChange={setActiveData} />
        <section className="mt-6 space-y-6">
          <div className="rounded-3xl bg-gradient-to-br from-amber-600 to-orange-700 p-7 text-white shadow-lg shadow-amber-900/15 sm:p-9">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-bold">
              <Store size={14} /> Potensi Ekonomi Desa
            </span>
            <h2 className="mt-4 text-3xl font-black">Data UMKM Desa Kedungrejo</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-amber-50">
              Gambaran pelaku UMKM/wirausaha dan sektor ekonomi utama masyarakat berdasarkan data pekerjaan warga.
            </p>
          </div>

          <EconomicCards values={economic} />

          <div className="mt-6">
            <CardContainer title="Sebaran Mata Pencaharian Warga" description="Komposisi sektor kerja yang menjadi dasar pemetaan potensi UMKM.">
              <OccupationChart data={occupationData} />
            </CardContainer>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <DataSelector active={activeData} onChange={setActiveData} />

      {/* FILTER BAR & ACTION PRINT */}
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1">
          <FilterBar
            years={years}
            hamlets={hamlets}
            year={year}
            dusun={dusun}
            onYear={setYear}
            onDusun={setDusun}
          />
        </div>

        <button
          onClick={handlePrint}
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white px-5 py-3.5 text-sm font-bold text-slate-800 shadow-sm transition hover:bg-slate-100 hover:text-emerald-800"
        >
          <Printer className="h-4 w-4 text-emerald-700" />
          <span>Cetak Ringkasan Data</span>
        </button>
      </div>

      {/* STATISTIK HEADER RINGKASAN */}
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-3xl border border-emerald-200/80 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-emerald-50 text-emerald-800">
            <Building2 className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-emerald-100 px-3 py-0.5 text-xs font-bold text-emerald-800">
                {dusun === "all" ? "Seluruh Wilayah Desa" : dusun}
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-0.5 text-xs font-bold text-slate-600">
                Tahun {year === "all" ? "Semua Periode" : year}
              </span>
            </div>
            <h2 className="mt-1 text-2xl font-black text-slate-950">
              {numberFormatter.format(totals.population)} <span className="text-base font-bold text-slate-500">Jiwa Terdata</span>
            </h2>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 sm:border-l sm:border-slate-200 sm:pl-6">
          <div>
            <p className="text-xs font-bold uppercase text-slate-400">Kepala Keluarga</p>
            <p className="text-lg font-black text-slate-900">{numberFormatter.format(totals.households)} KK</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase text-slate-400">Rasio L/P</p>
            <p className="text-lg font-black text-emerald-800">{malePercentage}% / {femalePercentage}%</p>
          </div>
        </div>
      </div>

      {/* PYRAMID DEMOGRAFI & GENDER */}
      <div className="mt-6 grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <CardContainer title="Piramida Penduduk Desa" description="Struktur demografi laki-laki dan perempuan berdasarkan kelompok usia." badge="Piramida Demografi">
            <PyramidChart />
          </CardContainer>
        </div>

        <div className="lg:col-span-4">
          <CardContainer title="Rasio Gender Penduduk" description="Perbandingan jumlah warga laki-laki dan perempuan." badge="Demografi">
            <GenderChart male={totals.male} female={totals.female} />
          </CardContainer>
        </div>
      </div>

      {/* EKONOMI & MATA PENCAHARIAN */}
      <div className="mt-10">
        <SectionHeader tag="Ekonomi & Sektor Kerja" title="Mata Pencaharian & Potensi Desa" subtitle="Distribusi bidang pekerjaan dan aktivitas ekonomi masyarakat Kedungrejo." />
        <EconomicCards values={economic} />

        <div className="mt-6">
          <CardContainer title="Sebaran Mata Pencaharian Warga" description="Komposisi sektor kerja masyarakat berdasarkan data kependudukan." badge="Pekerjaan">
            <OccupationChart data={occupationData} />
          </CardContainer>
        </div>
      </div>

      {/* USIA & PENDIDIKAN */}
      <div className="mt-10">
        <SectionHeader tag="Pendidikan & Usia" title="Kualitas SDM & Kelompok Usia" subtitle="Profil tingkat pendidikan terakhir dan komposisi umur warga desa." />

        <div className="grid gap-6 lg:grid-cols-2">
          <CardContainer title="Tingkat Pendidikan Terakhir" description="Persentase jenjang pendidikan yang telah diselesaikan warga." badge="Pendidikan">
            <EducationChart data={educationData} />
          </CardContainer>

          <CardContainer title="Komposisi Kelompok Usia" description="Jumlah warga berdasarkan 5 kategori umur." badge="Komposisi Usia">
            <AgeChart data={ageData} />
          </CardContainer>
        </div>
      </div>

      {/* TREN POPULASI */}
      <div className="mt-10">
        <SectionHeader tag="Perkembangan Desa" title="Tren Pertumbuhan Penduduk" subtitle="Pertumbuhan jumlah warga Desa Kedungrejo dari tahun ke tahun." />

        <CardContainer title="Grafik Pertumbuhan Populasi" description="Data historis total jiwa terdata di Desa Kedungrejo." badge="Historis">
          <TrendChart data={visibleTrends} />
        </CardContainer>
      </div>
    </>
  )
}
