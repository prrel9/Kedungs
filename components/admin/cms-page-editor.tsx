"use client"

import { useEffect, useState } from "react"
import { Save, Check } from "lucide-react"
import type { CmsPageContent } from "@/lib/cms-pages"

const inputClass =
  "mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-semibold text-slate-800 outline-none transition focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-100"

export function CmsPageEditor() {
  const [pages, setPages] = useState<CmsPageContent[]>([])
  const [active, setActive] = useState(0)
  const [activeSection, setActiveSection] = useState(0)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    fetch("/api/cms/pages")
      .then((response) => response.json())
      .then((payload) => setPages(payload.pages ?? []))
  }, [])

  const update = (field: keyof CmsPageContent, value: string) => {
    setPages((current) => current.map((page, index) => (index === active ? { ...page, [field]: value } : page)))
  }

  const updateSection = (field: "eyebrow" | "title" | "description" | "action" | "href", value: string) => {
    setPages((current) =>
      current.map((page, pageIndex) =>
        pageIndex === active
          ? {
              ...page,
              sections: page.sections.map((section, sectionIndex) => (sectionIndex === activeSection ? { ...section, [field]: value } : section)),
            }
          : page,
      ),
    )
  }

  const updateItem = (itemIndex: number, field: "title" | "description" | "value" | "detail" | "href" | "category" | "date" | "image", value: string) => {
    setPages((current) =>
      current.map((page, pageIndex) =>
        pageIndex === active
          ? {
              ...page,
              sections: page.sections.map((section, sectionIndex) =>
                sectionIndex === activeSection
                  ? {
                      ...section,
                      items: (section.items ?? []).map((item, index) => (index === itemIndex ? { ...item, [field]: value } : item)),
                    }
                  : section,
              ),
            }
          : page,
      ),
    )
  }

  const save = async () => {
    setSaving(true)
    setMessage("")

    const response = await fetch("/api/cms/pages", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pages }),
    })
    const payload = await response.json()

    setPages(payload.pages ?? pages)
    setSaving(false)
    setMessage(response.ok ? "Berhasil disimpan!" : "Gagal menyimpan.")
    setTimeout(() => setMessage(""), 4000)
  }

  const page = pages[active]
  const section = page?.sections?.[activeSection]

  if (!page) {
    return (
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-emerald-600 border-t-transparent" />
          <span className="text-sm font-semibold text-slate-500">Memuat data CMS...</span>
        </div>
      </div>
    )
  }

  return (
    <section id="konten-halaman" className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">Konten halaman</p>
          <h2 className="mt-1 text-lg font-black text-slate-950 sm:text-xl">Atur isi halaman publik</h2>
          <p className="mt-1 text-xs text-slate-500">Data yang disimpan langsung tampil di website utama.</p>
        </div>

        {/* Save Button (top) */}
        <button
          onClick={save}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-slate-800 disabled:opacity-60 shrink-0"
        >
          {saving ? (
            <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : message ? (
            <Check className="h-3.5 w-3.5 text-emerald-300" />
          ) : (
            <Save className="h-3.5 w-3.5" />
          )}
          {saving ? "Menyimpan..." : message || "Simpan perubahan"}
        </button>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
        {/* Page Tabs (left sidebar) */}
        <div className="flex gap-2 overflow-x-auto pb-1 lg:grid lg:w-48 lg:gap-1.5 lg:overflow-visible lg:pb-0">
          {pages.map((item, index) => (
            <button
              key={item.slug}
              type="button"
              onClick={() => {
                setActive(index)
                setActiveSection(0)
              }}
              className={`shrink-0 rounded-xl px-3 py-2.5 text-left text-xs font-bold transition ${
                active === index ? "bg-emerald-600 text-white shadow-sm" : "bg-slate-50 text-slate-600 hover:bg-emerald-50 hover:text-emerald-800"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Form Area */}
        <div className="min-w-0 flex-1">
          {/* Hero Section */}
          <div className="mb-4 rounded-xl bg-slate-50 px-4 py-3">
            <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">Hero halaman: {page.label}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="text-xs font-bold text-slate-700">
              Eyebrow
              <input value={page.eyebrow} onChange={(event) => update("eyebrow", event.target.value)} className={inputClass} />
            </label>
            <label className="text-xs font-bold text-slate-700">
              Posisi gambar
              <input value={page.imagePosition} onChange={(event) => update("imagePosition", event.target.value)} className={inputClass} />
            </label>
            <label className="sm:col-span-2 text-xs font-bold text-slate-700">
              Judul
              <input value={page.title} onChange={(event) => update("title", event.target.value)} className={inputClass} />
            </label>
            <label className="sm:col-span-2 text-xs font-bold text-slate-700">
              Deskripsi
              <textarea value={page.description} onChange={(event) => update("description", event.target.value)} rows={2} className={inputClass} />
            </label>
            <label className="sm:col-span-2 text-xs font-bold text-slate-700">
              URL gambar hero
              <input value={page.image} onChange={(event) => update("image", event.target.value)} className={inputClass} />
            </label>
          </div>

          {/* Section Editor */}
          {page.sections.length ? (
            <div className="mt-5 border-t border-slate-100 pt-5">
              {/* Section Tabs */}
              <div className="mb-4 flex flex-wrap gap-1.5">
                {page.sections.map((item, index) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setActiveSection(index)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                      activeSection === index ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-500 hover:bg-emerald-50 hover:text-emerald-800"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Section Fields */}
              {section ? (
                <div className="rounded-xl border border-slate-200 p-4">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <label className="text-xs font-bold text-slate-700">
                      Eyebrow section
                      <input value={section.eyebrow ?? ""} onChange={(event) => updateSection("eyebrow", event.target.value)} className={inputClass} />
                    </label>
                    <label className="text-xs font-bold text-slate-700">
                      Teks tombol
                      <input value={section.action ?? ""} onChange={(event) => updateSection("action", event.target.value)} className={inputClass} />
                    </label>
                    <label className="sm:col-span-2 text-xs font-bold text-slate-700">
                      Judul section
                      <input value={section.title ?? ""} onChange={(event) => updateSection("title", event.target.value)} className={inputClass} />
                    </label>
                    <label className="sm:col-span-2 text-xs font-bold text-slate-700">
                      Deskripsi section
                      <textarea value={section.description ?? ""} onChange={(event) => updateSection("description", event.target.value)} rows={2} className={inputClass} />
                    </label>
                  </div>

                  {/* Items */}
                  {(section.items ?? []).length > 0 && (
                    <div className="mt-4 space-y-3">
                      {(section.items ?? []).map((item, itemIndex) => (
                        <div key={`${section.key}-${itemIndex}`} className="rounded-xl bg-slate-50 p-3.5">
                          <p className="text-[11px] font-black uppercase tracking-wider text-slate-400 mb-2">Item {itemIndex + 1}</p>
                          <div className="grid gap-2.5 sm:grid-cols-2">
                            <input value={item.title} onChange={(event) => updateItem(itemIndex, "title", event.target.value)} className={inputClass} placeholder="Judul item" />
                            <input value={item.value ?? ""} onChange={(event) => updateItem(itemIndex, "value", event.target.value)} className={inputClass} placeholder="Nilai/statistik" />
                            <input value={item.detail ?? ""} onChange={(event) => updateItem(itemIndex, "detail", event.target.value)} className={inputClass} placeholder="Detail kecil" />
                            <input value={item.href ?? ""} onChange={(event) => updateItem(itemIndex, "href", event.target.value)} className={inputClass} placeholder="Link" />
                            <textarea value={item.description ?? ""} onChange={(event) => updateItem(itemIndex, "description", event.target.value)} rows={2} className={`${inputClass} sm:col-span-2`} placeholder="Deskripsi" />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          ) : (
            <div className="mt-5 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4 text-xs font-semibold text-slate-400">
              Section halaman ini belum tersedia. Hero sudah bisa diedit di atas.
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
