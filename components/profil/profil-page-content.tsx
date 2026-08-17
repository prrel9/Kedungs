"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Script from "next/script"
import {
  ArrowRight,
  Users,
  Map,
  Building,
  Target,
  CheckCircle2,
  X,
  Calendar,
  Sparkles,
  Award,
  ExternalLink,
  ChevronRight,
  Landmark,
  Trees,
  Wheat,
  Store,
  Compass,
  Heart,
  ImageIcon,
  Maximize2
} from "lucide-react"

declare global {
  interface Window {
    L?: any
  }
}

export function ProfilPageContent() {
  const [isSejarahModalOpen, setIsSejarahModalOpen] = useState(false)
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<{ src: string; title: string } | null>(null)
  const [leafletLoaded, setLeafletLoaded] = useState(false)
  const mapElement = useRef<HTMLDivElement>(null)

  const googleMapsUrl =
    "https://www.google.com/maps/search/?api=1&query=Desa+Kedungrejo+Kecamatan+Modo+Kabupaten+Lamongan"

  // Leaflet map setup for side-by-side section
  useEffect(() => {
    if (!leafletLoaded || !mapElement.current || !window.L) return

    const leaflet = window.L
    const map = leaflet.map(mapElement.current, {
      scrollWheelZoom: false,
      zoomControl: true,
      dragging: true
    })

    leaflet
      .tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors"
      })
      .addTo(map)

    map.setView([-7.1571, 112.1593], 14)

    const customIcon = leaflet.divIcon({
      className: "custom-map-pin",
      html: `<div class="grid h-9 w-9 place-items-center rounded-full bg-emerald-700 text-white shadow-lg border-2 border-white animate-bounce"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg></div>`,
      iconSize: [36, 36],
      iconAnchor: [18, 36]
    })

    leaflet
      .marker([-7.1571, 112.1593], { icon: customIcon })
      .addTo(map)
      .bindPopup("<b>Desa Kedungrejo</b><br/>Kecamatan Modo, Lamongan")
      .openPopup()

    return () => {
      map.remove()
    }
  }, [leafletLoaded])

  // Potensi Desa items
  const potensiList = [
    {
      title: "Pertanian",
      desc: "Padi, jagung, kacang tanah, dan pertanian hortikultura.",
      icon: Wheat,
      bg: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Peternakan",
      desc: "Sapi potong, kambing, ayam unggas, dan ternak keluarga.",
      icon: Trees,
      bg: "https://images.unsplash.com/photo-1546445317-29f4545f9d52?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "UMKM Desa",
      desc: "Kerajinan olahan pangan, olahan makanan tradisional, dan perdagangan.",
      icon: Store,
      bg: "https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Pariwisata & Alam",
      desc: "Wisata persawahan, alur sungai alam, dan tradisi lokal.",
      icon: Compass,
      bg: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Gotong Royong",
      desc: "Budaya kebersamaan dan kerja bakti warga yang kuat.",
      icon: Heart,
      bg: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80"
    }
  ]

  // Galeri Desa items
  const galleryItems = [
    { src: "/images/dorr.jpg", title: "Pemandangan Persawahan Subur Kedungrejo" },
    { src: "https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?auto=format&fit=crop&w=900&q=80", title: "Kegiatan Pertanian & Panen Raya Warga" },
    { src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=80", title: "Musyawarah & Gotong Royong Pembangunan Desa" },
    { src: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=900&q=80", title: "Gapura & Akses Jalan Utama Desa Kedungrejo" },
    { src: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=80", title: "Suasana Senja di Hamparan Sawah Kedungrejo" },
    { src: "/images/logokedungrejo.png", title: "Lambang Kebanggaan Desa Kedungrejo" }
  ]

  return (
    <div className="bg-slate-50/60 pb-20 text-slate-800">
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <Script
        src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        strategy="afterInteractive"
        onLoad={() => setLeafletLoaded(true)}
      />

      {/* ---------------------------------------------------- */}
      {/* HERO SECTION (EXACT REFERENCE DESIGN) */}
      {/* ---------------------------------------------------- */}
      <section className="mx-auto max-w-7xl px-4 pt-6 sm:px-6">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-emerald-950 shadow-2xl shadow-emerald-950/20">
          {/* Hero Image */}
          <img
            src="/images/dorr.jpg"
            alt="Desa Kedungrejo"
            className="absolute inset-0 h-full w-full object-cover object-center opacity-40 mix-blend-overlay transition-transform duration-1000 hover:scale-105"
          />

          {/* Hero Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/90 via-emerald-950/70 to-transparent" />

          {/* Hero Content */}
          <div className="relative z-10 px-6 py-16 sm:px-12 sm:py-24 lg:w-2/3">
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-4 py-1.5 text-xs font-black tracking-widest text-emerald-300 backdrop-blur-md uppercase border border-emerald-400/30">
              Profil Desa
            </span>

            <h1 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
              Desa Kedungrejo
            </h1>

            <p className="mt-4 text-base font-medium leading-relaxed text-emerald-100/90 sm:text-lg">
              Desa yang maju, mandiri, dan sejahtera berlandaskan gotong royong dan kearifan lokal.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setIsSejarahModalOpen(true)}
                className="inline-flex items-center gap-2.5 rounded-2xl bg-emerald-600 px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-emerald-600/30 transition hover:bg-emerald-500 hover:scale-105 active:scale-95"
              >
                <span>Lihat Sejarah Desa</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SECTION 1: TENTANG DESA KEDUNGREJO & STAT CARDS */}
      {/* ---------------------------------------------------- */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-stretch">
          {/* Left: About Text */}
          <div className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8 lg:col-span-4">
            <div>
              <h2 className="text-xl font-black text-slate-900 sm:text-2xl">Tentang Desa Kedungrejo</h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-600 font-medium">
                Desa Kedungrejo merupakan salah satu desa di Kecamatan Modo, Kabupaten Lamongan yang memiliki potensi besar di bidang pertanian, peternakan, dan sumber daya manusia yang berdaya saing.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100">
              <button
                onClick={() => setIsSejarahModalOpen(true)}
                className="inline-flex items-center gap-2 text-sm font-black text-emerald-700 hover:text-emerald-900 transition"
              >
                <span>Selengkapnya</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Right: 5 Stat Cards Grid */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:col-span-8">
            <div className="flex flex-col items-center justify-center rounded-3xl border border-slate-200/80 bg-white p-5 text-center shadow-sm transition hover:border-emerald-300 hover:shadow-md">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-50 text-emerald-700">
                <Users className="h-6 w-6" />
              </div>
              <p className="mt-4 text-2xl font-black text-slate-900">6.215</p>
              <p className="mt-1 text-xs font-bold text-slate-500">Jumlah Penduduk</p>
            </div>

            <div className="flex flex-col items-center justify-center rounded-3xl border border-slate-200/80 bg-white p-5 text-center shadow-sm transition hover:border-emerald-300 hover:shadow-md">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-50 text-emerald-700">
                <Map className="h-6 w-6" />
              </div>
              <p className="mt-4 text-2xl font-black text-slate-900">1.628,40 Ha</p>
              <p className="mt-1 text-xs font-bold text-slate-500">Luas Wilayah</p>
            </div>

            <div className="flex flex-col items-center justify-center rounded-3xl border border-slate-200/80 bg-white p-5 text-center shadow-sm transition hover:border-emerald-300 hover:shadow-md">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-50 text-emerald-700">
                <Building className="h-6 w-6" />
              </div>
              <p className="mt-4 text-2xl font-black text-slate-900">8</p>
              <p className="mt-1 text-xs font-bold text-slate-500">Jumlah Dusun</p>
            </div>

            <div className="flex flex-col items-center justify-center rounded-3xl border border-slate-200/80 bg-white p-5 text-center shadow-sm transition hover:border-emerald-300 hover:shadow-md">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-50 text-emerald-700">
                <Users className="h-6 w-6" />
              </div>
              <p className="mt-4 text-2xl font-black text-slate-900">32</p>
              <p className="mt-1 text-xs font-bold text-slate-500">Jumlah RT</p>
            </div>

            <div className="col-span-2 sm:col-span-1 flex flex-col items-center justify-center rounded-3xl border border-slate-200/80 bg-white p-5 text-center shadow-sm transition hover:border-emerald-300 hover:shadow-md">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-50 text-emerald-700">
                <Users className="h-6 w-6" />
              </div>
              <p className="mt-4 text-2xl font-black text-slate-900">8</p>
              <p className="mt-1 text-xs font-bold text-slate-500">Jumlah RW</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SECTION 2: VISI & MISI DESA */}
      {/* ---------------------------------------------------- */}
      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-12">
          {/* VISI CARD */}
          <div className="rounded-3xl border border-emerald-200/60 bg-gradient-to-br from-emerald-50/70 via-teal-50/30 to-white p-6 shadow-sm sm:p-8 lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-emerald-700">VISI</span>
              <div className="mt-6 flex items-center gap-4">
                <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-emerald-700 text-white shadow-lg shadow-emerald-700/20">
                  <Target className="h-8 w-8" />
                </div>
                <blockquote className="text-base font-black leading-relaxed text-slate-900 sm:text-lg">
                  “Terwujudnya Desa Kedungrejo yang maju, mandiri, dan sejahtera berlandaskan gotong royong dan kearifan lokal.”
                </blockquote>
              </div>
            </div>
          </div>

          {/* MISI CARD */}
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8 lg:col-span-7">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-700">MISI</span>

            <div className="mt-4 space-y-3">
              {[
                "Meningkatkan kualitas pelayanan publik yang prima.",
                "Mendorong pembangunan infrastruktur desa yang berkelanjutan.",
                "Mengembangkan potensi ekonomi masyarakat berbasis potensi lokal.",
                "Meningkatkan kesejahteraan masyarakat secara merata.",
                "Mewujudkan tata kelola pemerintahan desa yang transparan, akuntabel, dan partisipatif."
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3.5 rounded-2xl bg-slate-50/80 p-3.5 border border-slate-100">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-emerald-700 text-xs font-black text-white">
                    {idx + 1}
                  </span>
                  <p className="text-xs font-bold text-slate-700 sm:text-sm">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SECTION 3: STRUKTUR PEMERINTAHAN & PETA DESA */}
      {/* ---------------------------------------------------- */}
      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Left: Structure Diagram */}
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8 lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h2 className="text-xl font-black text-slate-900">Struktur Pemerintahan Desa</h2>
                <Link
                  href="/profil/struktur-perangkat-desa"
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-900 transition flex items-center gap-1"
                >
                  Detail Perangkat <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {/* Visual Tree Diagram (Matching Mockup) */}
              <div className="mt-6 space-y-4">
                {/* Level 1: Kepala Desa */}
                <div className="mx-auto max-w-xs text-center">
                  <div className="rounded-2xl bg-emerald-800 p-3 text-white shadow-md">
                    <span className="inline-flex items-center gap-1.5 text-xs font-black">
                      <Landmark className="h-4 w-4" /> Kepala Desa
                    </span>
                  </div>
                  <div className="mx-auto h-4 w-0.5 bg-emerald-300" />
                </div>

                {/* Level 2: Sekretaris Desa */}
                <div className="mx-auto max-w-xs text-center">
                  <div className="rounded-2xl border-2 border-emerald-600 bg-emerald-50 p-2.5 text-emerald-900 shadow-sm">
                    <span className="text-xs font-black">Sekretaris Desa</span>
                  </div>
                  <div className="mx-auto h-4 w-0.5 bg-slate-300" />
                </div>

                {/* Level 3: Kaur & Kasi Grid */}
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 text-center">
                  {[
                    "Kasi Pemerintahan",
                    "Kasi Kesejahteraan",
                    "Kasi Pelayanan",
                    "Kaur Keuangan",
                    "Kaur Umum"
                  ].map((role) => (
                    <div key={role} className="rounded-xl border border-slate-200 bg-slate-50 p-2 text-[10px] font-bold text-slate-700">
                      {role}
                    </div>
                  ))}
                </div>

                {/* Level 4: Kepala Dusun Grid */}
                <div className="pt-2">
                  <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 text-center mb-2">Kepala Dusun (Kadus)</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                    {[
                      "Dusun Gabang",
                      "Dusun Topang",
                      "Dusun Dopok Sambi",
                      "Dusun Karangpilang"
                    ].map((dusun) => (
                      <div key={dusun} className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-2 text-[10px] font-black text-emerald-800">
                        {dusun}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 text-center sm:text-left">
              <Link
                href="/profil/struktur-perangkat-desa"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-slate-800"
              >
                <span>Lihat Struktur Perangkat Lengkap</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Right: Map Section */}
          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8 lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h2 className="text-xl font-black text-slate-900">Peta Desa Kedungrejo</h2>
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-900 transition flex items-center gap-1"
                >
                  Lihat Peta Lebih Besar <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>

              {/* Map Canvas */}
              <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 shadow-inner bg-slate-100">
                <div ref={mapElement} className="h-64 w-full sm:h-72" />
              </div>
            </div>

            <div className="mt-4 text-xs font-semibold text-slate-500">
              📍 Kedungrejo, Kecamatan Modo, Kabupaten Lamongan, Jawa Timur.
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SECTION 4: DATA & WILAYAH DESA */}
      {/* ---------------------------------------------------- */}
      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-black text-slate-900 border-b border-slate-100 pb-4">Data & Wilayah Desa</h2>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {/* Card 1 */}
            <div className="space-y-4 rounded-2xl border border-slate-200/70 bg-slate-50/70 p-5">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-100 text-emerald-800">
                  <Map className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase text-slate-500">Luas Wilayah</p>
                  <p className="text-base font-black text-slate-900">1.628,40 Ha</p>
                </div>
              </div>

              <div className="flex items-center gap-3 border-t border-slate-200/60 pt-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-100 text-emerald-800">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase text-slate-500">Jumlah Penduduk</p>
                  <p className="text-base font-black text-slate-900">6.215 Jiwa</p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="space-y-4 rounded-2xl border border-slate-200/70 bg-slate-50/70 p-5">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-100 text-emerald-800">
                  <Building className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase text-slate-500">Jumlah Dusun</p>
                  <p className="text-base font-black text-slate-900">8 Dusun</p>
                </div>
              </div>

              <div className="flex items-center gap-3 border-t border-slate-200/60 pt-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-100 text-emerald-800">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase text-slate-500">Jumlah RT / RW</p>
                  <p className="text-base font-black text-slate-900">32 RT / 8 RW</p>
                </div>
              </div>
            </div>

            {/* Card 3: Batas Wilayah */}
            <div className="rounded-2xl border border-slate-200/70 bg-slate-50/70 p-5 space-y-2">
              <p className="text-xs font-black uppercase text-slate-900 mb-3">Batas Wilayah</p>

              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="font-bold text-slate-500">Utara</span>
                  <span className="font-extrabold text-slate-800">: Desa Sidomukti / Sukosongo</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-slate-500">Selatan</span>
                  <span className="font-extrabold text-slate-800">: Desa Mulyoagung</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-slate-500">Timur</span>
                  <span className="font-extrabold text-slate-800">: Desa Wotgalih</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-slate-500">Barat</span>
                  <span className="font-extrabold text-slate-800">: Desa Sumberagung</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SECTION 5: POTENSI DESA */}
      {/* ---------------------------------------------------- */}
      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-black text-slate-900 border-b border-slate-100 pb-4">Potensi Desa</h2>

          <div className="mt-6 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
            {potensiList.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg min-h-[160px] flex flex-col justify-between text-white"
                >
                  <img
                    src={item.bg}
                    alt={item.title}
                    className="absolute inset-0 h-full w-full object-cover opacity-40 transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

                  <div className="relative z-10 flex items-center gap-2">
                    <span className="grid h-8 w-8 place-items-center rounded-xl bg-emerald-600/80 backdrop-blur-md text-white">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="text-xs font-black text-emerald-300 uppercase tracking-wider">{item.title}</span>
                  </div>

                  <div className="relative z-10">
                    <p className="text-xs text-slate-200 leading-relaxed font-medium">{item.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* SECTION 6: GALERI DESA */}
      {/* ---------------------------------------------------- */}
      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h2 className="text-xl font-black text-slate-900">Galeri Desa</h2>
            <button
              onClick={() => setSelectedGalleryImage(galleryItems[0])}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-900 transition flex items-center gap-1"
            >
              Lihat Semua Galeri <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="mt-6 grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
            {galleryItems.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedGalleryImage(item)}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 aspect-video sm:aspect-square text-left transition hover:ring-4 hover:ring-emerald-200"
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover:opacity-100 transition-opacity grid place-items-center text-white">
                  <Maximize2 className="h-5 w-5" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* POP-UP INTERAKTIF SEJARAH DESA (NEAR FULL SCREEN) */}
      {/* ---------------------------------------------------- */}
      {isSejarahModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-3 sm:p-6 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-[2.5rem] bg-white shadow-2xl">
            {/* Modal Header */}
            <div className="relative bg-emerald-950 px-6 py-8 text-white sm:px-10">
              <img
                src="/images/dorr.jpg"
                alt="Sejarah Kedungrejo"
                className="absolute inset-0 h-full w-full object-cover opacity-25"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-emerald-950/80 to-transparent" />

              <div className="relative z-10 flex items-start justify-between">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-black text-emerald-300 uppercase tracking-widest border border-emerald-400/30">
                    <Calendar className="h-3.5 w-3.5" /> Sejarah & Asal Usul
                  </span>
                  <h3 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl text-white">
                    Sejarah & Perjalanan Desa Kedungrejo
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-emerald-100/90 font-medium">
                    Kecamatan Modo, Kabupaten Lamongan, Jawa Timur
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsSejarahModalOpen(false)}
                  className="grid h-10 w-10 place-items-center rounded-2xl bg-white/10 text-white transition hover:bg-white/20 active:scale-95"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div className="overflow-y-auto p-6 sm:p-10 space-y-8">
              {/* Asal Usul Nama */}
              <div className="rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50/60 to-white p-6">
                <h4 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-emerald-700" />
                  Asal Usul Nama "Kedungrejo"
                </h4>
                <p className="mt-3 text-sm leading-relaxed text-slate-700 font-medium">
                  Nama <strong>Kedungrejo</strong> berasal dari dua kata Bahasa Jawa kuno:
                </p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <span className="text-xs font-black uppercase text-emerald-700">1. Kedung</span>
                    <p className="mt-1 text-xs text-slate-600 leading-relaxed font-medium">
                      Berarti lubuk sungai / cekungan air yang dalam. Menggambarkan posisi wilayah desa yang dikelilingi sumber air dan alur sungai yang subur bagi pertanian.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <span className="text-xs font-black uppercase text-emerald-700">2. Rejo</span>
                    <p className="mt-1 text-xs text-slate-600 leading-relaxed font-medium">
                      Berarti ramai, makmur, dan sejahtera. Menjadi doa para tetua founder desa agar warga senantiasa hidup tenteram, berkecukupan, dan ramai dalam kebaikan.
                    </p>
                  </div>
                </div>
              </div>

              {/* Timeline Perjalanan Desa */}
              <div>
                <h4 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-3 mb-6">
                  Garis Waktu Perjalanan Desa
                </h4>

                <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-emerald-200">
                  {[
                    {
                      year: "1928",
                      title: "Era Pembentukan Permukiman Agraris",
                      desc: "Desa Kedungrejo terbentuk sebagai permukiman petani yang memanfaatkan kesuburan tanah Modo untuk budidaya padi dan tanaman pangan."
                    },
                    {
                      year: "1950",
                      title: "Pembangunan Irigasi & Penataan Dusun",
                      desc: "Para sesepuh desa memrakarsai pembentukan saluran irigasi bersama dan penataan batas wilayah dusun (Dopok Sambi, Gabang, Karangpilang, Topang)."
                    },
                    {
                      year: "1985",
                      title: "Penetapan Sentra Pertanian & Lumbung Pangan",
                      desc: "Kedungrejo ditetapkan sebagai salah satu wilayah penyangga pangan di Kabupaten Lamongan dengan produktivitas padi dan palawija yang melimpah."
                    },
                    {
                      year: "2024 - Sekarang",
                      title: "Era Desa Digital & Pelayanan Terpadu",
                      desc: "Integrasi teknologi informasi, GIS pemetaan lahan, dashboard infografis, dan digitalisasi pelayanan publik demi kemudahan seluruh warga."
                    }
                  ].map((item, idx) => (
                    <div key={idx} className="relative flex gap-4 pl-10">
                      <div className="absolute left-0 top-1.5 grid h-7 w-7 place-items-center rounded-full bg-emerald-700 text-white ring-4 ring-white text-xs font-bold">
                        {idx + 1}
                      </div>
                      <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 flex-1">
                        <span className="inline-block rounded-lg bg-emerald-100 px-2.5 py-0.5 text-xs font-black text-emerald-800">
                          {item.year}
                        </span>
                        <h5 className="mt-2 text-sm font-black text-slate-900">{item.title}</h5>
                        <p className="mt-1 text-xs leading-relaxed text-slate-600 font-medium">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t border-slate-100 bg-slate-50 px-6 py-4 sm:px-10 flex justify-end">
              <button
                type="button"
                onClick={() => setIsSejarahModalOpen(false)}
                className="rounded-2xl bg-slate-900 px-6 py-2.5 text-xs font-black text-white hover:bg-slate-800 transition"
              >
                Tutup Sejarah Desa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LIGHTBOX POP-UP UNTUK GALERI DESA */}
      {selectedGalleryImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-md animate-in fade-in">
          <div className="relative max-w-4xl w-full overflow-hidden rounded-3xl bg-slate-900 text-white shadow-2xl">
            <button
              onClick={() => setSelectedGalleryImage(null)}
              className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-2xl bg-black/50 text-white hover:bg-black/80"
            >
              <X className="h-5 w-5" />
            </button>
            <img src={selectedGalleryImage.src} alt={selectedGalleryImage.title} className="w-full max-h-[75vh] object-contain" />
            <div className="p-4 text-center text-sm font-extrabold text-slate-200 bg-slate-950">
              {selectedGalleryImage.title}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
