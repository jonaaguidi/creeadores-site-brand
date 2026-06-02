"use client"

import { Zap, Megaphone, Camera, Star, Check, Info, Gift, ArrowRight, type LucideIcon } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { analytics } from "@/lib/analytics"
import { appLink } from "@/lib/links"
import { SpotlightCard } from "@/components/ui/spotlight-card"
import ShinyText from "@/components/ui/shiny-text"
import type { CampaignTypeItem } from "@/lib/i18n"

const iconMap: Record<string, LucideIcon> = {
  zap: Zap,
  megaphone: Megaphone,
  camera: Camera,
  star: Star,
}

const iconColors = [
  { bg: "#FFF7ED", color: "#EA580C", border: "#FDBA74", ping: "rgba(234, 88, 12, 0.35)", spotlight: "rgba(234, 88, 12, 0.10)" },
  { bg: "#EEF0FF", color: "#0019DA", border: "#A5B4FC", ping: "rgba(0, 25, 218, 0.35)", spotlight: "rgba(0, 25, 218, 0.10)" },
  { bg: "#F0FDF4", color: "#16A34A", border: "#86EFAC", ping: "rgba(22, 163, 74, 0.35)", spotlight: "rgba(22, 163, 74, 0.10)" },
  { bg: "#FDF2F8", color: "#DB2777", border: "#F9A8D4", ping: "rgba(219, 39, 119, 0.35)", spotlight: "rgba(219, 39, 119, 0.10)" },
]

export function CampaignTypes() {
  const { dictionary } = useLanguage()
  const t = dictionary.home.campaignTypes

  return (
    <section
      id="campaigns"
      className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-16 overflow-hidden"
      style={{ backgroundColor: "#FAFAFE" }}
    >
      {/* Cross-hatch grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.4]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 25, 218, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 25, 218, 0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="relative max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 backdrop-blur-sm"
            style={{
              background: "linear-gradient(135deg, rgba(0, 25, 218, 0.08) 0%, rgba(99, 60, 255, 0.08) 100%)",
              border: "1px solid rgba(0, 25, 218, 0.12)",
              boxShadow: "0 2px 8px rgba(0, 25, 218, 0.06)",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.06em",
              color: "#0019DA",
            }}
          >
            <Megaphone size={13} />
            <ShinyText text={t.badge} color="#0019DA" shineColor="#93C5FD" speed={2} spread={90} />
          </span>
          <h2 style={{ fontSize: "clamp(22px, 3.5vw, 42px)", fontWeight: 700, lineHeight: 1.2, color: "#0A0A1A", whiteSpace: "pre-line", textTransform: "uppercase", letterSpacing: "-0.02em" }}>
            <Megaphone className="inline-block align-middle" style={{ width: "0.85em", height: "0.85em", color: "#0019DA" }} /> {t.title}
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-gray-500 text-[14px] sm:text-[16px]" style={{ lineHeight: 1.7 }}>
            {t.description}
          </p>
          {t.freeTrialCta && (
            <a
              href={appLink("/companies/new")}
              onClick={() =>
                analytics.trackMarketingCtaClicked({
                  ctaName: "free_trial_campaign_types",
                  location: "campaign_types",
                  destination: appLink("/companies/new"),
                  targetUserType: "brand",
                })
              }
              className="inline-flex items-center gap-2 mt-5 px-5 py-2.5 rounded-full transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 cursor-pointer"
              style={{
                background: "linear-gradient(135deg, #16A34A 0%, #15803D 100%)",
                color: "#FFFFFF",
                fontSize: "13px",
                fontWeight: 600,
                boxShadow: "0 4px 14px rgba(22, 163, 74, 0.30)",
              }}
            >
              <Gift size={15} />
              {t.freeTrialCta}
              <ArrowRight size={14} />
            </a>
          )}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 max-w-[1060px] mx-auto">
          {t.items.map((item, i) => (
            <CampaignCard key={item.title} item={item} index={i} />
          ))}
        </div>

        {/* Scroll down indicator */}
        <div className="flex flex-col items-center mt-14 gap-3">
          {/* Mouse icon */}
          <div
            className="w-7 h-11 rounded-full flex justify-center pt-2"
            style={{ border: "2px solid rgba(0, 25, 218, 0.2)" }}
          >
            <div
              className="w-1 h-2.5 rounded-full animate-scroll-dot"
              style={{ backgroundColor: "rgba(0, 25, 218, 0.35)" }}
            />
          </div>
          <span style={{ fontSize: "12px", fontWeight: 500, color: "#9CA3AF", letterSpacing: "0.03em" }}>
            {t.scrollLabel}
          </span>
        </div>
      </div>
    </section>
  )
}

function CampaignCard({ item, index }: { item: CampaignTypeItem; index: number }) {
  const Icon = iconMap[item.iconName] || Zap
  const palette = iconColors[index % iconColors.length]

  return (
    <SpotlightCard
      className="px-5 pt-5 pb-6 sm:px-7 sm:pt-6 sm:pb-7 flex flex-row items-start gap-4 sm:gap-5 cursor-pointer"
      spotlightColor={palette.spotlight}
      hoverBorderColor={palette.color}
    >
      {/* Icon */}
      <div
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: palette.bg, border: `1px solid ${palette.border}` }}
      >
        <Icon size={22} style={{ color: palette.color }} />
      </div>

      {/* Content */}
      <div className="flex flex-col min-w-0 flex-1">
        <div className="flex items-center gap-2" style={{ marginBottom: "4px" }}>
          <h3 className="text-[15px] sm:text-[17px]" style={{ fontWeight: 700, color: "#0A0A1A" }}>
            {item.title}
          </h3>
          {item.badge && (
            <span
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full"
              style={{
                fontSize: "9px",
                fontWeight: 700,
                letterSpacing: "0.05em",
                color: "#16A34A",
                backgroundColor: "rgba(22, 163, 74, 0.08)",
                border: "1px solid rgba(22, 163, 74, 0.2)",
              }}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
              {item.badge}
            </span>
          )}
        </div>

        <p className="text-[13px] sm:text-[14px]" style={{ color: "#6B7280", lineHeight: 1.6, marginBottom: "14px" }}>
          {item.description}
        </p>

        <ul className="flex flex-col gap-2">
          {item.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-2">
              <div
                className="w-[18px] h-[18px] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ backgroundColor: "#EEF0FF" }}
              >
                <Check size={10} style={{ color: "#0019DA" }} />
              </div>
              <span className="text-[12.5px] sm:text-[13.5px]" style={{ fontWeight: 500, color: "#555", lineHeight: 1.5 }}>
                {bullet}
              </span>
            </li>
          ))}
        </ul>

        {item.highlight && (
          <div
            className="flex items-center gap-1.5 mt-3 px-2.5 py-1.5 rounded-md w-fit"
            style={{ backgroundColor: "rgba(0, 25, 218, 0.05)" }}
          >
            <Info size={12} style={{ color: "#0019DA", flexShrink: 0 }} />
            <span style={{ fontSize: "11px", fontWeight: 500, color: "#0019DA" }}>
              {item.highlight}
            </span>
          </div>
        )}
      </div>
    </SpotlightCard>
  )
}
