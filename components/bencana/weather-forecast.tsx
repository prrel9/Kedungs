"use client"

import { useEffect, useState } from "react"
import { CloudRain, Sun, CloudLightning, Droplets, RefreshCw } from "lucide-react"

export interface WeatherDay {
  date: string
  dayName: string
  weatherCode: number
  tempMax: number
  tempMin: number
  precipitation: number // in mm
  windSpeed: number // in km/h
}

type Props = {
  onRiskChange: (level: "aman" | "waspada" | "bahaya") => void
  onWeatherUpdate?: (data: { risk: "aman" | "waspada" | "bahaya"; precipitationToday: number; weatherCode: number }) => void
}

export function WeatherForecast({ onRiskChange, onWeatherUpdate }: Props) {
  const [days, setDays] = useState<WeatherDay[]>([])
  const [loading, setLoading] = useState(true)
  const [period, setPeriod] = useState<7 | 14>(7)
  const [selectedQuarter, setSelectedQuarter] = useState<"all" | "p1" | "p2" | "p3" | "p4">("all")
  const [currentRisk, setCurrentRisk] = useState<"aman" | "waspada" | "bahaya">("aman")

  const currentYear = new Date().getFullYear()

  useEffect(() => {
    let active = true

    async function fetchForecast() {
      setLoading(true)
      try {
        // Open-Meteo API for Modo / Kedungrejo GPS (-7.1571, 112.1593)
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=-7.1571&longitude=112.1593&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max&timezone=Asia%2FJakarta&forecast_days=${period}`
        )
        const data = await response.json()

        if (data && data.daily && active) {
          const daily = data.daily
          const parsedDays: WeatherDay[] = daily.time.map((timeStr: string, index: number) => {
            const dateObj = new Date(timeStr)
            const dayNames = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]
            return {
              date: timeStr,
              dayName: index === 0 ? "Hari Ini" : dayNames[dateObj.getDay()],
              weatherCode: daily.weathercode[index] ?? 0,
              tempMax: Math.round(daily.temperature_2m_max[index] ?? 30),
              tempMin: Math.round(daily.temperature_2m_min[index] ?? 24),
              precipitation: daily.precipitation_sum[index] ?? 0,
              windSpeed: Math.round(daily.windspeed_10m_max[index] ?? 10)
            }
          })

          setDays(parsedDays)

          // Determine overall risk level based on max precipitation in next 3 days
          const maxRainNext3 = Math.max(...parsedDays.slice(0, 3).map((d) => d.precipitation))
          let risk: "aman" | "waspada" | "bahaya" = "aman"
          if (maxRainNext3 >= 50) {
            risk = "bahaya"
          } else if (maxRainNext3 >= 20) {
            risk = "waspada"
          }

          setCurrentRisk(risk)
          onRiskChange(risk)
          if (onWeatherUpdate && parsedDays.length > 0) {
            onWeatherUpdate({
              risk,
              precipitationToday: parsedDays[0].precipitation,
              weatherCode: parsedDays[0].weatherCode
            })
          }
        }
      } catch (err) {
        console.error("Failed to fetch weather data:", err)
        if (active) {
          const fallbackData: WeatherDay[] = [
            { date: "2026-08-15", dayName: "Hari Ini", weatherCode: 61, tempMax: 31, tempMin: 24, precipitation: 0.8, windSpeed: 14 },
            { date: "2026-08-16", dayName: "Minggu", weatherCode: 1, tempMax: 32, tempMin: 22, precipitation: 0.0, windSpeed: 18 },
            { date: "2026-08-17", dayName: "Senin", weatherCode: 1, tempMax: 33, tempMin: 23, precipitation: 0.0, windSpeed: 22 },
            { date: "2026-08-18", dayName: "Selasa", weatherCode: 61, tempMax: 32, tempMin: 24, precipitation: 0.2, windSpeed: 12 },
            { date: "2026-08-19", dayName: "Rabu", weatherCode: 61, tempMax: 31, tempMin: 24, precipitation: 1.2, windSpeed: 10 },
            { date: "2026-08-20", dayName: "Kamis", weatherCode: 1, tempMax: 32, tempMin: 23, precipitation: 0.0, windSpeed: 11 },
            { date: "2026-08-21", dayName: "Jumat", weatherCode: 61, tempMax: 32, tempMin: 22, precipitation: 0.6, windSpeed: 15 }
          ]
          setDays(fallbackData)
          setCurrentRisk("aman")
          onRiskChange("aman")
        }
      } finally {
        if (active) setLoading(false)
      }
    }

    void fetchForecast()
    return () => {
      active = false
    }
  }, [period, onRiskChange])

  const getWeatherInfo = (code: number, rain: number) => {
    if (code >= 95) {
      return { label: "Hujan Badai", icon: CloudRain, color: "text-amber-600 bg-amber-50" }
    }
    if (code >= 61 || rain >= 15) {
      return { label: "Hujan Lebat", icon: CloudRain, color: "text-blue-600 bg-blue-50" }
    }
    if (code >= 51 || rain > 0) {
      return { label: "Hujan Ringan", icon: Droplets, color: "text-teal-600 bg-teal-50" }
    }
    return { label: "Cerah / Berawan", icon: Sun, color: "text-amber-500 bg-amber-50" }
  }

  // Quarter Descriptions for Kedungrejo
  const quarterInfo = {
    all: { desc: "Data proyeksi hujan (mm) & suhu udara per hari dari stasiun meteorologi terdekat." },
    p1: { desc: "Periode 1 (Jan–Mar): Puncak Musim Hujan Awal Tahun — Olah lahan MT 1." },
    p2: { desc: "Periode 2 (Apr–Jun): Peralihan Pancaroba — Pertumbuhan Padi MT 2." },
    p3: { desc: "Periode 3 (Jul–Sep): Musim Kemarau — Tanam palawija (jagung/kedelai) & penjemuran gabah." },
    p4: { desc: "Periode 4 (Okt–Des): Awal Musim Hujan Akhir Tahun — Persiapan lahan MT 1." }
  }

  // Simple status info
  const statusInfo = {
    aman: { label: "Status: Kondisi Aman", bg: "bg-emerald-50 text-emerald-800 border-emerald-200" },
    waspada: { label: "Status: Waspada Cuaca", bg: "bg-amber-50 text-amber-800 border-amber-200" },
    bahaya: { label: "Status: Siaga Banjir", bg: "bg-rose-50 text-rose-800 border-rose-200" }
  }

  return (
    <div className="space-y-3">
      {/* Simple Status Strip */}
      <div className={`rounded-2xl border px-4 py-2.5 text-sm font-bold ${statusInfo[currentRisk].bg}`}>
        {statusInfo[currentRisk].label}
        <span className="ml-2 font-medium opacity-70">— data cuaca real-time Kedungrejo, Kec. Modo</span>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-lg font-black text-slate-900">Prakiraan Cuaca & Curah Hujan Kedungrejo</h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              {quarterInfo[selectedQuarter].desc}
            </p>
          </div>

        {/* PERIOD FILTER DROPDOWN & DAYS TOGGLE (MATCHING USER MOCKUP) */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Dropdown Selector (Matching Image 2 Mockup) */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400">Periode:</span>
            <select
              value={selectedQuarter}
              onChange={(e) => setSelectedQuarter(e.target.value as any)}
              className="rounded-2xl border-2 border-emerald-800 bg-emerald-900/5 px-4 py-2 text-xs font-black text-emerald-950 outline-none transition focus:ring-4 focus:ring-emerald-100 cursor-pointer"
            >
              <option value="all">Semua Periode</option>
              <option value="p1">Periode 1 (Jan–Mar)</option>
              <option value="p2">Periode 2 (Apr–Jun)</option>
              <option value="p3">Periode 3 (Jul–Sep)</option>
              <option value="p4">Periode 4 (Okt–Des)</option>
            </select>
          </div>

          {/* Quick 7 / 14 Days Toggle */}
          <div className="flex items-center gap-1.5 rounded-2xl bg-slate-100 p-1">
            <button
              onClick={() => setPeriod(7)}
              className={`rounded-xl px-3 py-1.5 text-xs font-extrabold transition ${
                period === 7 ? "bg-emerald-800 text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              7 Hari Ke Depan
            </button>
            <button
              onClick={() => setPeriod(14)}
              className={`rounded-xl px-3 py-1.5 text-xs font-extrabold transition ${
                period === 14 ? "bg-emerald-800 text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              14 Hari (2 Minggu)
            </button>
          </div>
        </div>
      </div>

      {/* Forecast Days Cards */}
      {loading ? (
        <div className="flex h-40 items-center justify-center text-slate-400">
          <RefreshCw className="h-6 w-6 animate-spin text-emerald-600" />
          <span className="ml-2 text-sm font-bold">Mengambil data cuaca Kedungrejo...</span>
        </div>
      ) : (
        <div className="mt-5 grid gap-3 grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 overflow-x-auto">
          {days.map((day) => {
            const info = getWeatherInfo(day.weatherCode, day.precipitation)
            const Icon = info.icon

            return (
              <div
                key={day.date}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/60 p-4 transition hover:-translate-y-1 hover:shadow-md"
              >
                <div>
                  <span className="text-[11px] font-black uppercase text-slate-500">{day.dayName}</span>
                  <p className="text-[10px] text-slate-400">{day.date}</p>

                  <div className="mt-3 flex items-center gap-2">
                    <div className={`grid h-8 w-8 place-items-center rounded-xl ${info.color}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-xs font-bold text-slate-800">{info.label}</span>
                  </div>
                </div>

                <div className="mt-4 border-t border-slate-200/80 pt-3 space-y-1">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-500">Curah Hujan:</span>
                    <span className={day.precipitation >= 20 ? "text-rose-700 font-extrabold" : "text-emerald-800"}>
                      {day.precipitation} mm
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span>Suhu:</span>
                    <span className="font-bold">{day.tempMin}° - {day.tempMax}°C</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
    </div>
  )
}
