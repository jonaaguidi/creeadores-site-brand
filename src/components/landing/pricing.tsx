"use client"

import { Check, Rocket, TrendingUp, Building2, Users, Megaphone, Percent, Repeat, ArrowRight, Phone, BadgeDollarSign, Gift, Sparkles, type LucideIcon } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { analytics } from "@/lib/analytics"
import { appLink } from "@/lib/links"
import ShinyText from "@/components/ui/shiny-text"
import type { PricingPlan } from "@/lib/i18n"

const planIconMap: Record<string, LucideIcon> = {
  check: Check,
  rocket: Rocket,
  trending: TrendingUp,
  building: Building2,
}

const featureIconMap: Record<string, LucideIcon> = {
  users: Users,
  megaphone: Megaphone,
  repeat: Repeat,
  percent: Percent,
}

export function Pricing() {
  const { dictionary } = useLanguage()
  const t = dictionary.home.pricing

  return (
    <section id="pricing" className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-16 bg-[#FAFAFE] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(0, 25, 218, 0.07) 1.2px, transparent 1.2px)", backgroundSize: "16px 16px" }} />
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
            <BadgeDollarSign size={13} />
            <ShinyText text={t.badge} color="#0019DA" shineColor="#93C5FD" speed={2} spread={90} />
          </span>
          <h2 style={{ fontSize: "clamp(22px, 3.5vw, 42px)", fontWeight: 700, lineHeight: 1.2, color: "#0A0A1A", textTransform: "uppercase", letterSpacing: "-0.02em", whiteSpace: "pre-line" }}>
            <TrendingUp className="inline-block align-middle" style={{ width: "0.85em", height: "0.85em", color: "#0019DA" }} /> {t.title}
          </h2>
          <p className="mt-4 mx-auto max-w-[520px] text-gray-500" style={{ fontSize: "16px", lineHeight: 1.7 }}>
            {t.description}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 max-w-[960px] mx-auto">
          {t.plans.map((plan) => (
            <PlanCard key={plan.name} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  )
}

function PlanCard({ plan }: { plan: PricingPlan }) {
  const PlanIcon = planIconMap[plan.iconName] || Check

  return (
    <div
      className={`relative rounded-xl p-5 sm:p-6 flex flex-col transition-transform duration-300 hover:-translate-y-1.5 cursor-default${plan.popular ? " animate-pulse-subtle" : ""}`}
      style={{
        backgroundColor: plan.popular ? "#0019DA" : "#FFFFFF",
        border: plan.popular ? "none" : "1px solid #E8E8F0",
        boxShadow: plan.popular
          ? undefined
          : "0 4px 20px rgba(0, 0, 0, 0.04)",
      }}
    >
      {plan.popular && plan.popularLabel && (
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full whitespace-nowrap"
          style={{
            backgroundColor: "#FFD700",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.05em",
            color: "#0A0A1A",
          }}
        >
          🔥 {plan.popularLabel}
        </div>
      )}

      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center mb-5"
        style={{ backgroundColor: plan.popular ? "rgba(255,255,255,0.15)" : "#EEF0FF" }}
      >
        <PlanIcon size={17} style={{ color: plan.popular ? "#FFFFFF" : "#0019DA" }} />
      </div>

      <h3
        className="text-[16px] sm:text-[18px]"
        style={{
          fontWeight: 700,
          color: plan.popular ? "#FFFFFF" : "#0A0A1A",
          marginBottom: "3px",
        }}
      >
        {plan.name}
      </h3>
      <p
        style={{
          fontSize: "12px",
          color: plan.popular ? "rgba(255,255,255,0.7)" : "#888",
          marginBottom: "20px",
        }}
      >
        {plan.description}
      </p>

      <div className="mb-5">
        {plan.price ? (
          <div>
            <div className="flex items-baseline gap-1">
              <span
                className="text-[28px] sm:text-[34px]"
                style={{
                  fontWeight: 800,
                  color: plan.popular ? "#FFFFFF" : "#0A0A1A",
                  lineHeight: 1,
                }}
              >
                {plan.arsPrice ?? plan.price}
              </span>
              <span
                style={{
                  fontSize: "13px",
                  color: plan.popular ? "rgba(255,255,255,0.6)" : "#999",
                  fontWeight: 500,
                }}
              >
                {plan.period}
              </span>
            </div>
            {plan.arsPrice && (
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 500,
                  color: plan.popular ? "rgba(255,255,255,0.5)" : "#999",
                  marginTop: "4px",
                  display: "block",
                }}
              >
                ({plan.price}{plan.period})
              </span>
            )}
          </div>
        ) : (
          <span style={{ fontSize: "18px", fontWeight: 700, color: "#0A0A1A" }}>
            {plan.customPriceLabel}
          </span>
        )}
      </div>

      <div className="h-px w-full mb-5" style={{ backgroundColor: plan.popular ? "rgba(255,255,255,0.15)" : "#E8E8F0" }} />

      {plan.trialBadge && (
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-lg mb-4"
          style={{
            backgroundColor: plan.popular ? "rgba(34, 197, 94, 0.15)" : "rgba(34, 197, 94, 0.08)",
            border: `1px solid ${plan.popular ? "rgba(34, 197, 94, 0.30)" : "rgba(34, 197, 94, 0.20)"}`,
          }}
        >
          <Gift size={13} style={{ color: plan.popular ? "#86EFAC" : "#16A34A", flexShrink: 0 }} />
          <span
            className="text-[10.5px] sm:text-[11px]"
            style={{
              fontWeight: 600,
              color: plan.popular ? "#86EFAC" : "#16A34A",
            }}
          >
            {plan.trialBadge}
          </span>
        </div>
      )}

      <ul className="flex flex-col gap-3 mb-6 flex-1">
        {plan.features.map((feature) => {
          const FeatureIcon = featureIconMap[feature.iconName] || Check
          return (
            <li key={feature.text} className="flex items-center gap-2.5">
              <div
                className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: plan.popular ? "rgba(255,255,255,0.12)" : "#F3F4FF" }}
              >
                <FeatureIcon size={12} style={{ color: plan.popular ? "#FFFFFF" : "#0019DA" }} />
              </div>
              <span
                className="text-[11.5px] sm:text-[12px]"
                style={{
                  fontWeight: 500,
                  color: plan.popular ? "rgba(255,255,255,0.9)" : "#555",
                }}
              >
                {feature.text}
              </span>
            </li>
          )
        })}
      </ul>

      <a
        href={appLink("/companies/new")}
        onClick={() =>
          analytics.trackMarketingCtaClicked({
            ctaName: plan.price ? "pricing_plan_signup" : "pricing_contact_sales",
            location: "pricing",
            destination: appLink("/companies/new"),
            targetUserType: "brand",
            planName: plan.name,
          })
        }
        className="w-full py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer hover:opacity-90"
        style={{
          backgroundColor: plan.popular ? "#FFFFFF" : plan.price ? "#0019DA" : "transparent",
          color: plan.popular ? "#0019DA" : plan.price ? "#FFFFFF" : "#0019DA",
          fontSize: "13px",
          fontWeight: 600,
          border: !plan.price ? "2px solid #0019DA" : "none",
        }}
      >
        {!plan.price && <Phone size={15} />}
        {plan.cta}
        {plan.price !== null && <ArrowRight size={15} />}
      </a>
    </div>
  )
}
