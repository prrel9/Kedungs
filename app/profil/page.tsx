import Link from "next/link"
import { MapPin, Target, Trees, Users, ArrowRight, Building2, type LucideIcon } from "lucide-react"

import { VillageMap } from "@/components/profil/village-map"
import { getCmsPage } from "@/lib/cms-pages"

const statIcons: LucideIcon[] = [Target, Users, Trees]

export const dynamic = "force-dynamic"

export default async function Profil() {
  const page = await getCmsPage("profil")
  const section = (key: string) => page.sections.find((item) => item.key === key)
  const historySection = section("history")
  const devSection = section("development")

  const statCards = (historySection?.items ?? []).map((item, index) => ({
    icon: statIcons[index] ?? Target,
    title: item.title,
    description: item.description ?? ""
  }))

  const quote = devSection?.items?.[0]?.description ?? "Gotong royong menjadi fondasi utama pembangunan Desa Kedungrejo yang modern."

  return (
    <>
      {/* Page Heading (replaces hero, pulling dynamically from CMS) */}
      <div className="border-b border-slate-200 bg-white px-5 pb-10 pt-12 sm:pb-14 sm:pt-16">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-700">{page.eyebrow}</p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
            {page.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
            {page.description}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-600">
              {historySection?.eyebrow ?? "Sejarah Desa"}
            </p>
            <h2 className="mt-3 text-3xl font-black text-slate-900">
              {historySection?.title ?? "Tumbuh bersama sejak 1928."}
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-600">
              {historySection?.description ?? "Desa Kedungrejo berkembang dari permukiman agraris yang dikelilingi persawahan subur. Hari ini, desa kami memadukan kearifan lokal dengan tata kelola digital untuk memberikan hidup yang lebih baik bagi setiap keluarga."}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {statCards.map(({ icon: Icon, title, description }) => (
                <div key={title} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
                  <Icon className="text-emerald-600" />
                  <p className="mt-4 font-black text-slate-900">{title}</p>
                  <p className="mt-1 text-sm text-slate-500">{description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] bg-green-800 p-8 text-white shadow-lg">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
              <MapPin className="h-5 w-5" />
            </div>
            <h2 className="mt-10 text-2xl font-black">
              {devSection?.title ?? "Arah pembangunan"}
            </h2>
            <p className="mt-4 leading-7 text-white/90">
              {devSection?.description ?? "Membangun pelayanan prima, ekonomi yang produktif, lingkungan lestari, dan masyarakat yang sehat."}
            </p>

            <div className="mt-8 rounded-2xl border border-white/20 bg-white/5 p-4 text-sm text-white/85">
              “{quote}”
            </div>
          </div>
        </div>

        {/* Section Perangkat Desa CTA */}
        <div className="my-16 rounded-[32px] border border-emerald-200 bg-gradient-to-br from-emerald-50 via-teal-50/50 to-white p-8 shadow-sm sm:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3.5 py-1 text-xs font-bold text-emerald-800">
                <Building2 className="h-3.5 w-3.5" />
                Pemerintahan Desa
              </span>
              <h3 className="text-2xl font-black text-slate-900 sm:text-3xl">Struktur Organisasi & Perangkat Desa</h3>
              <p className="max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
                Lihat susunan lengkap Kepala Desa, Sekretaris Desa, BPD, para Kaur & Kasi, hingga Kepala Dusun di Desa Kedungrejo.
              </p>
            </div>
            <Link
              href="/profil/struktur-perangkat-desa"
              className="inline-flex items-center justify-center gap-2.5 rounded-2xl bg-emerald-700 px-6 py-4 font-bold text-white shadow-lg shadow-emerald-700/20 transition hover:bg-emerald-800 hover:shadow-xl"
            >
              <span>Lihat Struktur Perangkat</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>

        <VillageMap />
      </div>
    </>
  )
}
