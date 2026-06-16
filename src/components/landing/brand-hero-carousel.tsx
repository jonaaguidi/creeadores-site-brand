"use client"

import { useRef, useState, useEffect } from "react"
import { MapPin, Users, Star } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { getLocaleLanguage } from "@/lib/i18n"

const categoryLabel: Record<string, { one: string; other: string }> = {
  es: { one: "Categoría", other: "Categorías" },
  en: { one: "Category", other: "Categories" },
  pt: { one: "Categoria", other: "Categorias" },
}

interface CreatorInfo {
  name: string
  location: string
  followers: string
  rating: number
  categories: number
  rate: string
  image: string
  initials: string
}

interface VideoEntry {
  src: string
  creator: CreatorInfo
}

const ENTRIES: VideoEntry[] = [
  { src: "/videos/baly-gym-bro.mp4", creator: { name: "Facundo B.", location: "Buenos Aires, ARG", followers: "12k", rating: 4.8, categories: 3, rate: "AR$45.000", image: "https://images.unsplash.com/photo-1639422633786-bae289799873?w=80&h=80&fit=crop&crop=face", initials: "FB" } },
  { src: "/videos/lamode-ugc-cafe.mp4", creator: { name: "Camila T.", location: "Buenos Aires, ARG", followers: "23k", rating: 4.9, categories: 5, rate: "AR$62.000", image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&crop=face", initials: "CT" } },
  { src: "/videos/marroquineria-ugc-facu.mp4", creator: { name: "Florencia A.", location: "Buenos Aires, ARG", followers: "8.7k", rating: 4.5, categories: 2, rate: "AR$32.000", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face", initials: "FA" } },
  { src: "/videos/marroquineria-ugc-kitty.mp4", creator: { name: "Valentina R.", location: "Buenos Aires, ARG", followers: "15k", rating: 4.7, categories: 4, rate: "AR$55.000", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face", initials: "VR" } },
  { src: "/videos/marroquineria-ugc-oregon.mp4", creator: { name: "Sofia M.", location: "Córdoba, ARG", followers: "31k", rating: 5.0, categories: 6, rate: "AR$90.000", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face", initials: "SM" } },
  { src: "/videos/marroquineria-ugc-mochila.mp4", creator: { name: "Diego S.", location: "Buenos Aires, ARG", followers: "6.1k", rating: 4.3, categories: 2, rate: "AR$25.000", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=80&h=80&fit=crop&crop=face", initials: "DS" } },
  { src: "/videos/marroquineria-ugc-wonderlust.mp4", creator: { name: "Lucia F.", location: "Buenos Aires, ARG", followers: "18k", rating: 4.6, categories: 3, rate: "AR$48.000", image: "https://images.unsplash.com/photo-1619095383688-b9fd80f2b916?w=80&h=80&fit=crop&crop=face", initials: "LF" } },
  { src: "/videos/ugc-3-cosas-viaje.mp4", creator: { name: "Carolina V.", location: "Rosario, ARG", followers: "5.2k", rating: 4.2, categories: 1, rate: "AR$20.000", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face", initials: "CV" } },
  { src: "/videos/ugc-mochila-cambia-todo.mp4", creator: { name: "Mariana C.", location: "Buenos Aires, ARG", followers: "21k", rating: 4.8, categories: 4, rate: "AR$58.000", image: "https://images.unsplash.com/photo-1609505848912-b7c3b8b4beda?w=80&h=80&fit=crop&crop=face", initials: "MC" } },
  { src: "/videos/ugc-me-voy-viaje.mp4", creator: { name: "Paula R.", location: "Buenos Aires, ARG", followers: "9.5k", rating: 4.4, categories: 3, rate: "AR$38.000", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=face", initials: "PR" } },
  { src: "/videos/creeadores-final.mp4", creator: { name: "Ana G.", location: "Mendoza, ARG", followers: "19k", rating: 4.9, categories: 5, rate: "AR$72.000", image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=80&h=80&fit=crop&crop=face", initials: "AG" } },
]

export const videoCol1 = [ENTRIES[0], ENTRIES[4], ENTRIES[8]]
export const videoCol2 = [ENTRIES[1], ENTRIES[5], ENTRIES[9]]
export const videoCol3 = [ENTRIES[2], ENTRIES[6], ENTRIES[10]]
export const videoCol4 = [ENTRIES[3], ENTRIES[7]]

export const videoColumns = [
  { data: videoCol1, reverse: false },
  { data: videoCol2, reverse: true },
  { data: videoCol3, reverse: false },
  { data: videoCol4, reverse: true },
]

export const allEntries = ENTRIES

/** Lighter subset for mobile — skips the 4 heaviest videos (11-14 MB each) */
export const mobileEntries = [
  ENTRIES[0],  // baly-gym-bro (4 MB)
  ENTRIES[1],  // lamode-ugc-cafe (2.3 MB)
  ENTRIES[10], // creeadores-final (3.2 MB)
  ENTRIES[8],  // ugc-mochila-cambia-todo (5.5 MB)
  ENTRIES[7],  // ugc-3-cosas-viaje (6.6 MB)
  ENTRIES[6],  // marroquineria-ugc-wonderlust (7.1 MB)
  ENTRIES[5],  // marroquineria-ugc-mochila (7.7 MB)
]

export function MobileVideoCard({ videoSrc, creator }: { videoSrc: string; creator?: CreatorInfo }) {
  const { locale } = useLanguage()
  const lang = getLocaleLanguage(locale)
  const catLabel = categoryLabel[lang] ?? categoryLabel.es
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: "200px" },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (isVisible) {
      video.play().catch(() => {})
    } else {
      video.pause()
    }
  }, [isVisible])

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden"
      style={{
        width: "clamp(150px, 18vw, 200px)",
        height: "clamp(300px, 38vw, 410px)",
        border: "2px solid #2c2c2e",
        borderRadius: "clamp(18px, 3vw, 30px)",
        background: "#2c2c2e",
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.4), 0 12px 32px rgba(0,0,0,0.15), 0 4px 12px rgba(0,0,0,0.08)",
      }}
    >
      <div
        className="absolute inset-[3px] overflow-hidden"
        style={{ borderRadius: "clamp(15px, 2.7vw, 28px)", background: "linear-gradient(to bottom, #1a1a2e, #16213e)" }}
      >
        <video
          ref={videoRef}
          src={isVisible ? videoSrc : undefined}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
        />

        {creator && (
          <div className="absolute left-2.5 top-2.5 z-10" style={{ transform: "translateZ(0)", backfaceVisibility: "hidden" }}>
            <span className="rounded-full border border-[#22C55E]/30 bg-[#16A34A]/40 px-1 py-px text-[6.5px] font-semibold text-white shadow-lg" style={{ fontFamily: "Poppins, sans-serif" }}>
              + {creator.rate}
            </span>
          </div>
        )}

        {creator && (
          <div className="absolute inset-x-0 bottom-0 z-10 px-2.5 pb-2.5 pt-10" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.50) 55%, transparent 100%)", transform: "translateZ(0)", backfaceVisibility: "hidden" }}>
            <div className="flex items-center gap-1.5">
              <div className="h-5 w-5 flex-shrink-0 overflow-hidden rounded-full" style={{ border: "1.5px solid rgba(255,255,255,0.4)" }}>
                <div className="relative h-full w-full">
                  <div className="absolute inset-0 flex items-center justify-center" style={{ background: "linear-gradient(to bottom, #0019DA, #9810FA)" }}>
                    <span className="text-[6px] font-bold text-white" style={{ fontFamily: "Poppins, sans-serif" }}>{creator.initials}</span>
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={creator.image} alt="" className="relative h-full w-full object-cover" />
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-[8px] font-semibold text-white" style={{ fontFamily: "Poppins, sans-serif" }}>{creator.name}</h3>
                <div className="flex items-center gap-0.5 text-[6.5px] text-white/70" style={{ fontFamily: "Poppins, sans-serif" }}>
                  <MapPin className="h-2 w-2 flex-shrink-0" />
                  <span className="truncate">{creator.location}</span>
                </div>
              </div>
            </div>

            <div className="mt-1.5 flex flex-wrap items-center gap-1.5 text-[6.5px] text-white/90" style={{ fontFamily: "Poppins, sans-serif" }}>
              <span className="flex items-center gap-0.5">
                <Users className="h-2 w-2" />
                {creator.followers}
              </span>
              <span className="flex items-center gap-0.5">
                <Star className="h-2 w-2 text-[#FE9A00]" />
                {creator.rating.toFixed(1)}
              </span>
              {creator.categories > 0 && (
                <span className="rounded-full bg-white/15 px-1 py-px text-[5.5px] text-white/80">
                  +{creator.categories} {creator.categories === 1 ? catLabel.one : catLabel.other}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export function PhoneMockup({ videoSrc, creator }: { videoSrc: string; creator?: CreatorInfo }) {
  const { locale } = useLanguage()
  const lang = getLocaleLanguage(locale)
  const catLabel = categoryLabel[lang] ?? categoryLabel.es
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: "200px" },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (isVisible) {
      video.play().catch(() => {})
    } else {
      video.pause()
    }
  }, [isVisible])

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden"
      style={{
        width: "clamp(130px, 16vw, 180px)",
        height: "clamp(240px, 30vw, 340px)",
        border: "2px solid #2c2c2e",
        borderRadius: "clamp(18px, 3vw, 30px)",
        background: "#2c2c2e",
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.4), 0 12px 32px rgba(0,0,0,0.15), 0 4px 12px rgba(0,0,0,0.08)",
      }}
    >
      <div
        className="absolute top-[7.5px] left-1/2 -translate-x-1/2 z-20"
        style={{
          width: "clamp(20px, 3vw, 40px)",
          height: "clamp(5px, 1vw, 10px)",
          backgroundColor: "#2c2c2e",
          borderRadius: "10px",
        }}
      />

      <div
        className="absolute inset-[3px] overflow-hidden"
        style={{ borderRadius: "clamp(15px, 2.7vw, 28px)", background: "linear-gradient(to bottom, #1a1a2e, #16213e)" }}
      >
        <video
          ref={videoRef}
          src={isVisible ? videoSrc : undefined}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
        />

        {/* Rate badge — top left */}
        {creator && (
          <div className="absolute left-3.5 top-3.5 z-10">
            <span className="rounded-full border border-[#22C55E]/30 bg-[#16A34A]/40 px-1 py-px text-[7px] font-semibold text-white shadow-lg backdrop-blur-md" style={{ fontFamily: "Poppins, sans-serif" }}>
              + {creator.rate}
            </span>
          </div>
        )}

        {/* Creator info overlay with gradient */}
        {creator && (
          <div className="absolute inset-x-0 bottom-0 z-10 px-3.5 pb-3.5 pt-10" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.50) 55%, transparent 100%)" }}>
            <div className="flex items-center gap-1.5">
              <div className="h-6 w-6 flex-shrink-0 overflow-hidden rounded-full" style={{ border: "1.5px solid rgba(255,255,255,0.4)" }}>
                <div className="relative h-full w-full">
                  <div className="absolute inset-0 flex items-center justify-center" style={{ background: "linear-gradient(to bottom, #0019DA, #9810FA)" }}>
                    <span className="text-[7px] font-bold text-white" style={{ fontFamily: "Poppins, sans-serif" }}>{creator.initials}</span>
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={creator.image} alt="" className="relative h-full w-full object-cover" />
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-[9px] font-semibold text-white" style={{ fontFamily: "Poppins, sans-serif" }}>{creator.name}</h3>
                <div className="flex items-center gap-0.5 text-[7px] text-white/70" style={{ fontFamily: "Poppins, sans-serif" }}>
                  <MapPin className="h-2 w-2 flex-shrink-0" />
                  <span className="truncate">{creator.location}</span>
                </div>
              </div>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[7px] text-white/90" style={{ fontFamily: "Poppins, sans-serif" }}>
              <span className="flex items-center gap-0.5">
                <Users className="h-2.5 w-2.5" />
                {creator.followers}
              </span>
              <span className="flex items-center gap-0.5">
                <Star className="h-2.5 w-2.5 text-[#FE9A00]" />
                {creator.rating.toFixed(1)}
              </span>
              {creator.categories > 0 && (
                <span className="rounded-full bg-white/15 px-1 py-px text-[6px] text-white/80 backdrop-blur-sm">
                  +{creator.categories} {creator.categories === 1 ? catLabel.one : catLabel.other}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
