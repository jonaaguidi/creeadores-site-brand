export const SUPPORTED_LOCALES = ["es-AR", "es-MX", "en", "pt"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "es-AR";
export const LANGUAGE_STORAGE_KEY = "creeadores-language";
export const LANGUAGE_COOKIE_NAME = "creeadores-language";

export type HowItWorksStep = {
  number: string;
  title: string;
  description: string;
};

export type LandingFeatureFloatingLabel = {
  text: string;
  position: string;
  iconName: string;
};

export type LandingFeatureItem = {
  badge: string;
  title: string;
  description: string;
  floatingLabels: LandingFeatureFloatingLabel[];
};

export type PlanFeatureItem = {
  iconName: string;
  text: string;
};

export type PricingPlan = {
  name: string;
  description: string;
  price: string | null;
  arsPrice?: string;
  period: string;
  features: PlanFeatureItem[];
  cta: string;
  popular: boolean;
  iconName: string;
  customPriceLabel?: string;
  popularLabel?: string;
  trialBadge?: string;
};

export type CampaignTypeItem = {
  iconName: string;
  title: string;
  description: string;
  bullets: string[];
  highlight?: string;
  badge?: string;
};

export type SpotlightCard = {
  iconName: string;
  title: string;
  description: string;
};

export type CampaignFloatingCard = {
  iconName: string;
  iconBg: string;
  customIcon?: string;
  text: string;
  subtext?: string;
  position: string;
};

export type CampaignFeatureBlock = {
  iconName: string;
  title: string;
  subtitle: string;
  image: string;
  cards: SpotlightCard[];
  floatingCards?: CampaignFloatingCard[];
};

export type HomeDictionary = {
  hero: {
    badge: string;
    line1: string;
    line2: string;
    line3: string;
    line3Bold: string;
    rotatingWords: string[];
    description: string;
    ctas: {
      primary: string;
      secondary: string;
    };
    freeTrial?: {
      badge: string;
      subtext: string;
    };
  };
  nav: {
    links: { label: string; href: string }[];
    signIn: string;
    startFree: string;
    startFreeMobile: string;
    signUpDropdown: {
      brand: { label: string; description: string };
      creator: { label: string; description: string };
    };
  };
  howItWorks: {
    badge: string;
    title: string;
    description: string;
    stepLabel: string;
    steps: HowItWorksStep[];
  };
  landingFeatures: {
    badge: string;
    title: string;
    description: string;
    items: LandingFeatureItem[];
  };
  campaignTypes: {
    badge: string;
    title: string;
    description: string;
    scrollLabel: string;
    freeTrialCta?: string;
    items: CampaignTypeItem[];
  };
  campaignFeatures: {
    badge: string;
    title: string;
    description: string;
    ctaButton?: string;
    blocks: CampaignFeatureBlock[];
  };
  pricing: {
    badge: string;
    title: string;
    description: string;
    ctaButton?: string;
    plans: PricingPlan[];
  };
  landingFooter: {
    description: string;
    links: string[];
    copyright: string;
    legal: string[];
  };
};

export type AppDictionary = {
  home: HomeDictionary;
};

export function isLocale(value: unknown): value is Locale {
  return SUPPORTED_LOCALES.includes(value as Locale);
}

export function resolveLocale(value: unknown): Locale {
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

function matchLocaleCandidate(value: string): Locale | null {
  const normalizedValue = value.trim().toLowerCase().replace(/_/g, "-");
  if (!normalizedValue) return null;

  const exactMatch = SUPPORTED_LOCALES.find((locale) => locale.toLowerCase() === normalizedValue);
  if (exactMatch) return exactMatch;

  const language = normalizedValue.split("-")[0];

  if (language === "es") {
    return normalizedValue === "es-mx" ? "es-MX" : "es-AR";
  }

  if (language === "en") {
    return "en";
  }

  if (language === "pt") {
    return "pt";
  }

  return null;
}

export function resolvePreferredLocale(options?: {
  storedLocale?: unknown;
  acceptLanguage?: string | null;
}): Locale {
  const storedLocale = options?.storedLocale;
  if (isLocale(storedLocale)) {
    return storedLocale;
  }

  const acceptLanguage = options?.acceptLanguage;
  if (!acceptLanguage) {
    return DEFAULT_LOCALE;
  }

  const candidates = acceptLanguage
    .split(",")
    .map((entry) => entry.split(";")[0]?.trim())
    .filter(Boolean) as string[];

  for (const candidate of candidates) {
    const matchedLocale = matchLocaleCandidate(candidate);
    if (matchedLocale) {
      return matchedLocale;
    }
  }

  return DEFAULT_LOCALE;
}

export function getLocaleLanguage(locale: Locale): string {
  return locale.split("-")[0] ?? DEFAULT_LOCALE.split("-")[0];
}

const english: AppDictionary = {
  home: {
    hero: {
      badge: "Official Partners of",
      line1: "CONTENT",
      line2: "FOR YOUR",
      line3: "",
      line3Bold: "BRAND",
      rotatingWords: ["BRAND", "AGENCY", "AUDIENCE", "BUSINESS", "STRATEGY"],
      description:
        "Creeadores is the platform that connects brands/agencies with the best UGC content creators & Influencers in Latin America.",
      ctas: {
        primary: "I'm a creator",
        secondary: "I'm a brand",
      },
      freeTrial: {
        badge: "Your first campaign is free",
        subtext: "One-time \u00b7 Available on any plan",
      },
    },
    nav: {
      links: [
        { label: "Campaigns", href: "#campaigns" },
        { label: "Features", href: "#features" },
        { label: "Pricing", href: "#pricing" },
      ],
      signIn: "Sign in",
      startFree: "Sign up for free",
      startFreeMobile: "Sign up",
      signUpDropdown: {
        brand: { label: "I'm a brand", description: "Connect with creators" },
        creator: { label: "I'm a creator", description: "Monetize your content" },
      },
    },
    howItWorks: {
      badge: "EASY AS THAT",
      title: "How does it work?",
      description: "Launch UGC content campaigns in 4 simple steps and connect with the ideal creators for your brand.",
      stepLabel: "STEP",
      steps: [
        { number: "01", title: "Create your campaign", description: "Define your campaign objectives, set your budget and describe the type of content you need. In minutes you'll have everything ready to attract the best creators." },
        { number: "02", title: "Connect with creators", description: "Receive applications from verified creators or directly invite those that best fit your brand. Filter by category, audience and experience level." },
        { number: "03", title: "Negotiate and pay safely", description: "Negotiate terms directly on the platform and make protected payments. The money is released only when you are satisfied with the delivered content." },
        { number: "04", title: "Approve and launch", description: "Review deliverables, request adjustments if needed and approve the final content. Close your campaigns successfully and measure results." },
      ],
    },
    landingFeatures: {
      badge: "FEATURES",
      title: "Everything you need to\nscale your UGC campaigns",
      description: "Tools designed for brands and creators to collaborate efficiently, safely and without friction.",
      items: [
        { badge: "CREATOR CRM", title: "Manage creators like a pro", description: "Centralize creator management, contracts and payments while running high-volume campaigns. All from one place.", floatingLabels: [{ text: "Multi-team operation", position: "top-4 right-4", iconName: "users" }, { text: "Centralized payments", position: "bottom-20 -left-6", iconName: "creditcard" }, { text: "Creator payment", position: "bottom-8 left-8", iconName: "link" }] },
        { badge: "SMART SEARCH", title: "Find the ideal creator in seconds", description: "Filter by niche, location, engagement and content style. Our AI suggests the profiles that best match your brand.", floatingLabels: [{ text: "Advanced filters", position: "top-4 left-4", iconName: "search" }, { text: "AI match", position: "bottom-12 right-4", iconName: "bot" }] },
        { badge: "SECURE PAYMENTS", title: "Pay only for approved content", description: "Money is released only when you approve the content. No risks, no surprises. Total protection for brands and creators.", floatingLabels: [{ text: "Protected payment", position: "top-4 right-4", iconName: "lock" }, { text: "Automatic invoicing", position: "bottom-12 left-4", iconName: "file" }] },
        { badge: "REAL-TIME ANALYTICS", title: "Measure the impact of each campaign", description: "Dashboards with performance, ROI and engagement metrics. Make decisions based on real data, not assumptions.", floatingLabels: [{ text: "Real-time ROI", position: "top-4 left-4", iconName: "barchart" }, { text: "Exportable reports", position: "bottom-12 right-4", iconName: "trending" }] },
      ],
    },
    campaignTypes: {
      badge: "CAMPAIGN TYPES",
      title: "Create the ideal campaign\nfor your content",
      description: "Choose the campaign type that best fits your brand's goals and start creating content that connects.",
      scrollLabel: "Scroll down",
      freeTrialCta: "I want my first campaign for free",
      items: [
        {
          iconName: "zap",
          title: "Flash",
          badge: "FREE PLAN",
          description: "Find creators based on your needs, review their profiles and send them a proposal through a Flash campaign.",
          bullets: ["Communicate directly via chat", "Total flexibility throughout the campaign"],
        },
        {
          iconName: "megaphone",
          title: "Influencer",
          description: "Send the content you want your Influencer to publish. Create collaborations and get your brand in front of the right audience.",
          bullets: ["The Influencer publishes on their profile", "Authentic collaborations that convert"],
        },
        {
          iconName: "camera",
          title: "UGC Creator",
          description: "Send resources to the UGC creator to produce professional videos for your brand.",
          bullets: ["Define the deliverables they must create", "Choose duration and content type"],
        },
        {
          iconName: "star",
          title: "UGC + Influencer",
          description: "The creator produces for your brand and also publishes on their own profile.",
          bullets: ["Define the deliverables the creator must produce", "The most complete campaign: production + publishing"],
        },
      ],
    },
    campaignFeatures: {
      badge: "FEATURES",
      title: "Tools to manage\nyour campaigns",
      description: "Create your custom campaign and connect with the best creators — all from a single platform.",
      blocks: [
        {
          iconName: "sliders",
          title: "Create your campaign",
          subtitle: "Configure every detail of your campaign before connecting with creators.",
          image: "/campaign-create.jpg",
          cards: [
            { iconName: "clapperboard", title: "Tailored content", description: "Define deliverables, format, duration and publishing requirements. Upload briefs, scripts and brand assets — all in one place." },
            { iconName: "mappin", title: "Logistics & in-person", description: "Create location-based campaigns for shootings and events, and manage product shipping and returns." },
            { iconName: "wallet", title: "Budget & deadlines", description: "Set total budget, per-creator amounts and delivery deadlines to keep everything on track." },
          ],
          floatingCards: [
            { iconName: "clapperboard", iconBg: "#0019DA", text: "Reel · 30s", subtext: "Format set", position: "-top-8 -right-14" },
            { iconName: "package", iconBg: "#F97316", text: "Product shipped", subtext: "Tracking active", position: "-bottom-8 -left-14" },
            { iconName: "calendar", iconBg: "#E11D48", text: "Content delivery", subtext: "Feb 21", position: "-bottom-8 -right-14" },
          ],
        },
        {
          iconName: "users",
          title: "Connect and negotiate with creators",
          subtitle: "Manage the entire collaboration cycle with your creators from the platform.",
          image: "/campaign-dashboard.jpg",
          cards: [
            { iconName: "send", title: "Proposals & negotiation", description: "Send personalized proposals, receive counteroffers and negotiate terms directly on the platform." },
            { iconName: "lock", title: "Payments & approval", description: "Protected payments with full control — review, approve or request adjustments before releasing each payment." },
            { iconName: "usersround", title: "Management & tracking", description: "Manage multiple creators simultaneously, receive notifications at every stage and rate each creator." },
          ],
          floatingCards: [
            { iconName: "send", iconBg: "#7C3AED", text: "Proposal sent", subtext: "2 min ago", position: "-top-8 -right-14" },
            { iconName: "lock", iconBg: "#22C55E", customIcon: "campaign-status", text: "In Progress", subtext: "Campaign status", position: "-bottom-8 -left-14" },
            { iconName: "wallet", iconBg: "#00AEEF", customIcon: "mercadopago", text: "Mercado Pago", subtext: "Payment secured", position: "-bottom-8 -right-14" },
          ],
        },
      ],
    },
    pricing: {
      badge: "PRICING",
      title: "Start creating content\nthat connects!",
      description: "Select the plan that best suits your needs and start connecting with the best creators.",
      plans: [
        { name: "Free", description: "Free, no subscription", price: "$0", period: "", features: [{ iconName: "users", text: "2 creators max" }, { iconName: "megaphone", text: "Flash campaign" }, { iconName: "percent", text: "10% commission per creator" }], cta: "Start free", popular: false, iconName: "check", trialBadge: "Includes 1 Free Campaign" },
        { name: "Starter", description: "For brands just starting", price: "US$16", arsPrice: "$24.990", period: "/month", features: [{ iconName: "users", text: "10 creators max" }, { iconName: "megaphone", text: "2 campaigns + Flash campaign" }, { iconName: "repeat", text: "1 Barter campaign" }, { iconName: "percent", text: "5% commission per creator" }], cta: "Start now", popular: false, iconName: "rocket" },
        { name: "Growth", description: "For growing brands", price: "US$29", arsPrice: "$44.990", period: "/month", features: [{ iconName: "users", text: "30 creators max" }, { iconName: "megaphone", text: "Unlimited campaigns + Flash campaign" }, { iconName: "repeat", text: "4 Barter campaigns" }, { iconName: "percent", text: "3% commission per creator" }], cta: "Start now", popular: true, iconName: "trending", popularLabel: "MOST POPULAR" },
        { name: "Scale / Enterprise", description: "Custom solution for large brands", price: null, period: "", features: [{ iconName: "users", text: "Unlimited creators" }, { iconName: "megaphone", text: "Unlimited campaigns + Flash campaign" }, { iconName: "repeat", text: "Unlimited Barter campaigns" }, { iconName: "percent", text: "Negotiable commission per creator" }], cta: "Contact", popular: false, iconName: "building", customPriceLabel: "Custom price" },
      ],
    },
    landingFooter: {
      description: "We connect the best UGC creators with the most relevant brands in Latin America.",
      links: ["Creators", "Brands", "Pricing", "Success stories"],
      copyright: "\u00a9 2026 Creadores. All rights reserved.",
      legal: ["Privacy", "Terms"],
    },
  },
};

const spanish: AppDictionary = {
  home: {
    hero: {
      badge: "Partners oficiales de",
      line1: "CONTENIDO",
      line2: "PARA TU",
      line3: "",
      line3Bold: "MARCA",
      rotatingWords: ["MARCA", "AGENCIA", "AUDIENCIA", "NEGOCIO", "ESTRATEGIA"],
      description:
        "Creadores es la plataforma que conecta marcas/agencias con los mejores creadores de contenido UGC & Influencers de Latinoamérica.",
      ctas: {
        primary: "Soy creador",
        secondary: "Soy marca",
      },
      freeTrial: {
        badge: "Tu primera campa\u00f1a es gratis",
        subtext: "1 uso \u00b7 Disponible en cualquier plan",
      },
    },
    nav: {
      links: [
        { label: "Campañas", href: "#campaigns" },
        { label: "Funcionalidades", href: "#features" },
        { label: "Precios", href: "#pricing" },
      ],
      signIn: "Iniciar sesion",
      startFree: "Registrate gratis",
      startFreeMobile: "Registrate",
      signUpDropdown: {
        brand: { label: "Soy una marca", description: "Conecta con creadores" },
        creator: { label: "Soy creador", description: "Monetiza tu contenido" },
      },
    },
    howItWorks: {
      badge: "ASÍ DE FÁCIL",
      title: "¿Cómo funciona?",
      description: "Lanza campañas de contenido UGC en 4 simples pasos y conecta con los creadores ideales para tu marca.",
      stepLabel: "PASO",
      steps: [
        { number: "01", title: "Crea tu campaña", description: "Define los objetivos de tu campaña, establece tu presupuesto y describe el tipo de contenido que necesitas. En minutos tendrás todo listo para atraer a los mejores creadores." },
        { number: "02", title: "Conecta con creadores", description: "Recibe postulaciones de creadores verificados o invita directamente a los que mejor encajen con tu marca. Filtra por categoría, audiencia y nivel de experiencia." },
        { number: "03", title: "Negocia y paga seguro", description: "Negocia los términos directamente en la plataforma y realiza pagos protegidos. El dinero se libera solo cuando estés satisfecho con el contenido entregado." },
        { number: "04", title: "Aprueba y lanza", description: "Revisa los entregables, solicita ajustes si es necesario y aprueba el contenido final. Cierra tus campañas exitosamente y mide los resultados." },
      ],
    },
    landingFeatures: {
      badge: "FUNCIONALIDADES",
      title: "Todo lo que necesitas para\nescalar tus campanas UGC",
      description: "Herramientas disenadas para que marcas y creadores colaboren de forma eficiente, segura y sin friccion.",
      items: [
        { badge: "CRM PARA CREADORES", title: "Gestiona creadores como un pro", description: "Centraliza la gestion de creadores, contratos y pagos mientras ejecutas campanas de alto volumen. Todo desde un solo lugar.", floatingLabels: [{ text: "Operacion multi-equipo", position: "top-4 right-4", iconName: "users" }, { text: "Pagos centralizados", position: "bottom-20 -left-6", iconName: "creditcard" }, { text: "Pago al creador", position: "bottom-8 left-8", iconName: "link" }] },
        { badge: "BUSQUEDA INTELIGENTE", title: "Encuentra al creador ideal en segundos", description: "Filtra por nicho, ubicacion, engagement y estilo de contenido. Nuestra IA te sugiere los perfiles que mejor encajan con tu marca.", floatingLabels: [{ text: "Filtros avanzados", position: "top-4 left-4", iconName: "search" }, { text: "Match por IA", position: "bottom-12 right-4", iconName: "bot" }] },
        { badge: "PAGOS SEGUROS", title: "Paga solo por contenido aprobado", description: "El dinero se libera solo cuando apruebas el contenido. Sin riesgos, sin sorpresas. Proteccion total para marcas y creadores.", floatingLabels: [{ text: "Pago protegido", position: "top-4 right-4", iconName: "lock" }, { text: "Facturacion automatica", position: "bottom-12 left-4", iconName: "file" }] },
        { badge: "ANALITICA EN TIEMPO REAL", title: "Mide el impacto de cada campana", description: "Dashboards con metricas de rendimiento, ROI y engagement. Toma decisiones basadas en datos reales, no en suposiciones.", floatingLabels: [{ text: "ROI en tiempo real", position: "top-4 left-4", iconName: "barchart" }, { text: "Reportes exportables", position: "bottom-12 right-4", iconName: "trending" }] },
      ],
    },
    campaignTypes: {
      badge: "TIPOS DE CAMPAÑAS",
      title: "Crea el tipo de campaña ideal\npara tu marca",
      description: "Elegí el tipo de campaña que mejor se adapte a los objetivos de tu marca y empezá a crear contenido que conecta.",
      scrollLabel: "Desliza hacia abajo",
      freeTrialCta: "Quiero mi primera campaña gratis",
      items: [
        {
          iconName: "zap",
          title: "Flash",
          badge: "PLAN FREE",
          description: "Buscá creadores de contenido según tus necesidades, revisá sus perfiles y enviales una propuesta a través de una campaña Flash.",
          bullets: ["Comunicación directa por chat", "Flexibilidad total en la campaña"],
        },
        {
          iconName: "megaphone",
          title: "Influencer",
          description: "Definí qué contenido va a publicar tu Influencer. Creá colaboraciones y posicioná tu marca frente a la audiencia correcta.",
          bullets: ["El Influencer publica en su perfil", "Colaboraciones auténticas que convierten"],
        },
        {
          iconName: "camera",
          title: "UGC Creator",
          description: "Enviá recursos al UGC para que produzca videos profesionales para tu marca.",
          bullets: ["Definí los entregables que deberá crear", "Elegí la duración y tipo de contenido"],
        },
        {
          iconName: "star",
          title: "UGC + Influencer",
          description: "El creador produce para tu marca y además publica en su propio perfil.",
          bullets: ["Definí qué entregables deberá producir el creador", "La campaña más completa: producción + publicación"],
        },
      ],
    },
    campaignFeatures: {
      badge: "FUNCIONALIDADES",
      title: "Herramientas para\ngestionar tus campañas",
      description: "Creá tu campaña personalizada y conectá con los mejores creadores — todo desde una sola plataforma.",
      blocks: [
        {
          iconName: "sliders",
          title: "Crea tu campaña IDEAL",
          subtitle: "Configurá cada detalle de tu campaña antes de conectar con creadores.",
          image: "/campaign-create.jpg",
          cards: [
            { iconName: "clapperboard", title: "Contenido a medida", description: "Definí entregables, formato, duración y requisitos de publicación. Cargá briefs, guiones y assets de marca en un solo lugar." },
            { iconName: "mappin", title: "Logística y presencialidad", description: "Creá campañas presenciales con ubicación y gestioná el envío y devolución de productos para la creación de contenido." },
            { iconName: "wallet", title: "Presupuesto y plazos", description: "Establecé presupuesto total, montos por creador y fechas límite para mantener todo bajo control." },
          ],
          floatingCards: [
            { iconName: "clapperboard", iconBg: "#0019DA", text: "Reel · 30s", subtext: "Formato definido", position: "-top-8 -right-14" },
            { iconName: "package", iconBg: "#F97316", text: "Producto enviado", subtext: "Tracking activo", position: "-bottom-8 -left-14" },
            { iconName: "calendar", iconBg: "#E11D48", text: "Entrega del contenido", subtext: "21-feb", position: "-bottom-8 -right-14" },
          ],
        },
        {
          iconName: "users",
          title: "Conecta y negocia con creadores",
          subtitle: "Gestioná todo el ciclo de colaboración con tus creadores desde la plataforma.",
          image: "/campaign-dashboard.jpg",
          cards: [
            { iconName: "send", title: "Propuestas y negociación", description: "Enviá propuestas personalizadas, recibí contraofertas y negociá los términos directamente en la plataforma." },
            { iconName: "lock", title: "Pagos y aprobación", description: "Pagos protegidos con control total — revisá, aprobá o pedí ajustes antes de liberar cada pago." },
            { iconName: "usersround", title: "Gestión y seguimiento", description: "Gestioná múltiples creadores simultáneamente, recibí notificaciones por email en cada etapa y calificá a cada creador." },
          ],
          floatingCards: [
            { iconName: "send", iconBg: "#7C3AED", text: "Propuesta enviada", subtext: "Hace 2 min", position: "-top-8 -right-14" },
            { iconName: "lock", iconBg: "#22C55E", customIcon: "campaign-status", text: "En Progreso", subtext: "Estado de la campaña", position: "-bottom-8 -left-14" },
            { iconName: "wallet", iconBg: "#00AEEF", customIcon: "mercadopago", text: "Mercado Pago", subtext: "Pago asegurado", position: "-bottom-8 -right-14" },
          ],
        },
      ],
    },
    pricing: {
      badge: "PRECIOS",
      title: "¡Comenzá a crear contenido\nque conecta!",
      description: "Seleccioná el plan que mejor se adapte a tus necesidades y comenzá a conectar con los mejores creadores.",
      plans: [
        { name: "Free", description: "Free sin suscripción", price: "$0", period: "", features: [{ iconName: "users", text: "2 creadores máximo" }, { iconName: "megaphone", text: "Campaña Flash" }, { iconName: "percent", text: "Comisión del 10% por creador" }], cta: "Empezar gratis", popular: false, iconName: "check", trialBadge: "Incluye 1 Campaña Gratis" },
        { name: "Starter", description: "Para marcas que están empezando", price: "US$16", arsPrice: "$24.990", period: "/mes", features: [{ iconName: "users", text: "10 creadores máximo" }, { iconName: "megaphone", text: "2 campañas + Campaña Flash" }, { iconName: "repeat", text: "1 Campaña con Canje" }, { iconName: "percent", text: "Comisión del 5% por creador" }], cta: "Comenzar ahora", popular: false, iconName: "rocket" },
        { name: "Growth", description: "Para marcas en crecimiento", price: "US$29", arsPrice: "$44.990", period: "/mes", features: [{ iconName: "users", text: "30 creadores máximo" }, { iconName: "megaphone", text: "Campañas ilimitadas + Campaña Flash" }, { iconName: "repeat", text: "4 Campañas con Canje" }, { iconName: "percent", text: "Comisión del 3% por creador" }], cta: "Comenzar ahora", popular: true, iconName: "trending", popularLabel: "MÁS POPULAR" },
        { name: "Scale / Enterprise", description: "Solución personalizada para grandes marcas", price: null, period: "", features: [{ iconName: "users", text: "Creadores ilimitados" }, { iconName: "megaphone", text: "Campañas ilimitadas + Campaña Flash" }, { iconName: "repeat", text: "Campañas con Canje ilimitadas" }, { iconName: "percent", text: "Comisión negociable por creador" }], cta: "Contactar", popular: false, iconName: "building", customPriceLabel: "Precio a medida" },
      ],
    },
    landingFooter: {
      description: "Creadores es la plataforma que conecta marcas/agencias con los mejores creadores de contenido UGC & Influencers de Latinoamérica.",
      links: ["Creadores", "Marcas", "Precios", "Casos de éxito"],
      copyright: "\u00a9 2026 Creadores. Todos los derechos reservados.",
      legal: ["Privacidad", "Términos"],
    },
  },
};

const portuguese: AppDictionary = {
  home: {
    hero: {
      badge: "Parceiros oficiais de",
      line1: "CONTEÚDO",
      line2: "PARA SUA",
      line3: "",
      line3Bold: "MARCA",
      rotatingWords: ["MARCA", "AGÊNCIA", "AUDIÊNCIA", "NEGÓCIO", "ESTRATÉGIA"],
      description:
        "Creeadores é a plataforma que conecta marcas/agências com os melhores criadores de conteúdo UGC & Influencers da América Latina.",
      ctas: {
        primary: "Sou criador",
        secondary: "Sou marca",
      },
      freeTrial: {
        badge: "Sua primeira campanha \u00e9 gr\u00e1tis",
        subtext: "1 uso \u00b7 Dispon\u00edvel em qualquer plano",
      },
    },
    nav: {
      links: [
        { label: "Campanhas", href: "#campaigns" },
        { label: "Funcionalidades", href: "#features" },
        { label: "Preços", href: "#pricing" },
      ],
      signIn: "Entrar",
      startFree: "Cadastre-se grátis",
      startFreeMobile: "Cadastre-se",
      signUpDropdown: {
        brand: { label: "Sou uma marca", description: "Conecte-se com criadores" },
        creator: { label: "Sou criador", description: "Monetize seu conteúdo" },
      },
    },
    howItWorks: {
      badge: "FÁCIL ASSIM",
      title: "Como funciona?",
      description: "Lance campanhas de conteúdo UGC em 4 simples passos e conecte-se com os criadores ideais para sua marca.",
      stepLabel: "PASSO",
      steps: [
        { number: "01", title: "Crie sua campanha", description: "Defina os objetivos da sua campanha, estabeleça seu orçamento e descreva o tipo de conteúdo que precisa. Em minutos terá tudo pronto para atrair os melhores criadores." },
        { number: "02", title: "Conecte-se com criadores", description: "Receba candidaturas de criadores verificados ou convide diretamente os que melhor se encaixam na sua marca. Filtre por categoria, audiência e nível de experiência." },
        { number: "03", title: "Negocie e pague com segurança", description: "Negocie os termos diretamente na plataforma e realize pagamentos protegidos. O dinheiro é liberado somente quando estiver satisfeito com o conteúdo entregue." },
        { number: "04", title: "Aprove e lance", description: "Revise os entregáveis, solicite ajustes se necessário e aprove o conteúdo final. Feche suas campanhas com sucesso e meça os resultados." },
      ],
    },
    landingFeatures: {
      badge: "FUNCIONALIDADES",
      title: "Tudo o que você precisa para\nescalar suas campanhas UGC",
      description: "Ferramentas projetadas para que marcas e criadores colaborem de forma eficiente, segura e sem atrito.",
      items: [
        { badge: "CRM PARA CRIADORES", title: "Gerencie criadores como um pro", description: "Centralize a gestão de criadores, contratos e pagamentos enquanto executa campanhas de alto volume. Tudo de um só lugar.", floatingLabels: [{ text: "Operação multi-equipe", position: "top-4 right-4", iconName: "users" }, { text: "Pagamentos centralizados", position: "bottom-20 -left-6", iconName: "creditcard" }, { text: "Pagamento ao criador", position: "bottom-8 left-8", iconName: "link" }] },
        { badge: "BUSCA INTELIGENTE", title: "Encontre o criador ideal em segundos", description: "Filtre por nicho, localização, engajamento e estilo de conteúdo. Nossa IA sugere os perfis que melhor combinam com sua marca.", floatingLabels: [{ text: "Filtros avançados", position: "top-4 left-4", iconName: "search" }, { text: "Match por IA", position: "bottom-12 right-4", iconName: "bot" }] },
        { badge: "PAGAMENTOS SEGUROS", title: "Pague apenas por conteúdo aprovado", description: "O dinheiro é liberado somente quando você aprova o conteúdo. Sem riscos, sem surpresas. Proteção total para marcas e criadores.", floatingLabels: [{ text: "Pagamento protegido", position: "top-4 right-4", iconName: "lock" }, { text: "Faturamento automático", position: "bottom-12 left-4", iconName: "file" }] },
        { badge: "ANÁLISE EM TEMPO REAL", title: "Meça o impacto de cada campanha", description: "Dashboards com métricas de desempenho, ROI e engajamento. Tome decisões baseadas em dados reais, não em suposições.", floatingLabels: [{ text: "ROI em tempo real", position: "top-4 left-4", iconName: "barchart" }, { text: "Relatórios exportáveis", position: "bottom-12 right-4", iconName: "trending" }] },
      ],
    },
    campaignTypes: {
      badge: "TIPOS DE CAMPANHAS",
      title: "Crie o tipo de campanha ideal\npara seu conteúdo",
      description: "Escolha o tipo de campanha que melhor se adapta aos objetivos da sua marca e comece a criar conteúdo que conecta.",
      scrollLabel: "Deslize para baixo",
      freeTrialCta: "Quero minha primeira campanha grátis",
      items: [
        {
          iconName: "zap",
          title: "Flash",
          badge: "PLANO FREE",
          description: "Encontre criadores de conteúdo conforme suas necessidades, revise seus perfis e envie uma proposta através de uma campanha Flash.",
          bullets: ["Comunicação direta por chat", "Flexibilidade total na campanha"],
        },
        {
          iconName: "megaphone",
          title: "Influencer",
          description: "Envie o conteúdo que você quer que seu Influencer publique. Crie colaborações e leve sua marca para a audiência certa.",
          bullets: ["O Influencer publica no perfil dele", "Colaborações autênticas que convertem"],
        },
        {
          iconName: "camera",
          title: "UGC Creator",
          description: "Envie recursos ao UGC para que produza vídeos profissionais para sua marca.",
          bullets: ["Defina os entregáveis que ele deve criar", "Escolha a duração e tipo de conteúdo"],
        },
        {
          iconName: "star",
          title: "UGC + Influencer",
          description: "O criador produz para sua marca e também publica no próprio perfil.",
          bullets: ["Defina os entregáveis que o criador deve produzir", "A campanha mais completa: produção + publicação"],
        },
      ],
    },
    campaignFeatures: {
      badge: "FUNCIONALIDADES",
      title: "Ferramentas para\ngerenciar suas campanhas",
      description: "Crie sua campanha personalizada e conecte-se com os melhores criadores — tudo de uma única plataforma.",
      blocks: [
        {
          iconName: "sliders",
          title: "Crie sua campanha",
          subtitle: "Configure cada detalhe da sua campanha antes de conectar com criadores.",
          image: "/campaign-create.jpg",
          cards: [
            { iconName: "clapperboard", title: "Conteúdo sob medida", description: "Defina entregáveis, formato, duração e requisitos de publicação. Carregue briefs, roteiros e assets da marca — tudo em um só lugar." },
            { iconName: "mappin", title: "Logística e presencialidade", description: "Crie campanhas presenciais com localização e gerencie o envio e devolução de produtos." },
            { iconName: "wallet", title: "Orçamento e prazos", description: "Defina orçamento total, valores por criador e datas limite para manter tudo sob controle." },
          ],
          floatingCards: [
            { iconName: "clapperboard", iconBg: "#0019DA", text: "Reel · 30s", subtext: "Formato definido", position: "-top-8 -right-14" },
            { iconName: "package", iconBg: "#F97316", text: "Produto enviado", subtext: "Tracking ativo", position: "-bottom-8 -left-14" },
            { iconName: "calendar", iconBg: "#E11D48", text: "Entrega do conteúdo", subtext: "21-fev", position: "-bottom-8 -right-14" },
          ],
        },
        {
          iconName: "users",
          title: "Conecte e negocie com criadores",
          subtitle: "Gerencie todo o ciclo de colaboração com seus criadores pela plataforma.",
          image: "/campaign-dashboard.jpg",
          cards: [
            { iconName: "send", title: "Propostas e negociação", description: "Envie propostas personalizadas, receba contrapropostas e negocie os termos diretamente na plataforma." },
            { iconName: "lock", title: "Pagamentos e aprovação", description: "Pagamentos protegidos com controle total — revise, aprove ou solicite ajustes antes de liberar cada pagamento." },
            { iconName: "usersround", title: "Gestão e acompanhamento", description: "Gerencie múltiplos criadores simultaneamente, receba notificações em cada etapa e avalie cada criador." },
          ],
          floatingCards: [
            { iconName: "send", iconBg: "#7C3AED", text: "Proposta enviada", subtext: "Há 2 min", position: "-top-8 -right-14" },
            { iconName: "lock", iconBg: "#22C55E", customIcon: "campaign-status", text: "Em Progresso", subtext: "Status da campanha", position: "-bottom-8 -left-14" },
            { iconName: "wallet", iconBg: "#00AEEF", customIcon: "mercadopago", text: "Mercado Pago", subtext: "Pagamento protegido", position: "-bottom-8 -right-14" },
          ],
        },
      ],
    },
    pricing: {
      badge: "PREÇOS",
      title: "Comece a criar conteúdo\nque conecta!",
      description: "Selecione o plano que melhor se adapta às suas necessidades e comece a se conectar com os melhores criadores.",
      plans: [
        { name: "Free", description: "Free sem assinatura", price: "$0", period: "", features: [{ iconName: "users", text: "2 criadores máximo" }, { iconName: "megaphone", text: "Campanha Flash" }, { iconName: "percent", text: "Comissão de 10% por criador" }], cta: "Começar grátis", popular: false, iconName: "check", trialBadge: "Inclui 1 Campanha Grátis" },
        { name: "Starter", description: "Para marcas que estão começando", price: "US$16", arsPrice: "$24.990", period: "/mês", features: [{ iconName: "users", text: "10 criadores máximo" }, { iconName: "megaphone", text: "2 campanhas + Campanha Flash" }, { iconName: "repeat", text: "1 Campanha com Troca" }, { iconName: "percent", text: "Comissão de 5% por criador" }], cta: "Começar agora", popular: false, iconName: "rocket" },
        { name: "Growth", description: "Para marcas em crescimento", price: "US$29", arsPrice: "$44.990", period: "/mês", features: [{ iconName: "users", text: "30 criadores máximo" }, { iconName: "megaphone", text: "Campanhas ilimitadas + Campanha Flash" }, { iconName: "repeat", text: "4 Campanhas com Troca" }, { iconName: "percent", text: "Comissão de 3% por criador" }], cta: "Começar agora", popular: true, iconName: "trending", popularLabel: "MAIS POPULAR" },
        { name: "Scale / Enterprise", description: "Solução personalizada para grandes marcas", price: null, period: "", features: [{ iconName: "users", text: "Criadores ilimitados" }, { iconName: "megaphone", text: "Campanhas ilimitadas + Campanha Flash" }, { iconName: "repeat", text: "Campanhas com Troca ilimitadas" }, { iconName: "percent", text: "Comissão negociável por criador" }], cta: "Contatar", popular: false, iconName: "building", customPriceLabel: "Preço sob medida" },
      ],
    },
    landingFooter: {
      description: "Conectamos os melhores criadores UGC com as marcas mais relevantes da América Latina.",
      links: ["Criadores", "Marcas", "Preços", "Casos de sucesso"],
      copyright: "\u00a9 2026 Creadores. Todos os direitos reservados.",
      legal: ["Privacidade", "Termos"],
    },
  },
};

const dictionaries: Record<Locale, AppDictionary> = {
  en: english,
  "es-AR": spanish,
  "es-MX": spanish,
  pt: portuguese,
};

export function getDictionary(locale: Locale): AppDictionary {
  return dictionaries[locale] ?? dictionaries[DEFAULT_LOCALE];
}

const creatorHomeOverridesByLocale = {
  en: {
    hero: {
      badge: "Official partners of",
      line1: "MONETIZE",
      line2: "YOUR",
      line3: "",
      line3Bold: "CONTENT",
      rotatingWords: ["CONTENT", "TALENT", "CREATIVITY", "AUDIENCE", "PASSION"],
      description:
        "Creeadores is the platform that connects you with the best brands and agencies in Latin America. Apply to campaigns, create content and get paid securely.",
      ctas: {
        primary: "I'm a creator",
        secondary: "I'm a brand",
      },
    },
    nav: {
      links: [
        { label: "I'm a brand", href: "/" },
        { label: "Features", href: "#features" },
        { label: "Reputation", href: "#reputation" },
      ],
      signIn: "Sign in",
      startFree: "Sign up for free",
      startFreeMobile: "Sign up",
      signUpDropdown: {
        brand: { label: "I'm a brand", description: "Connect with creators" },
        creator: { label: "I'm a creator", description: "Monetize your content" },
      },
    },
    campaignTypes: {
      badge: "OPPORTUNITIES",
      title: "✨ Find the perfect\ncampaign for you",
      description: "Apply to the campaign type that best matches your profile and start monetizing your content.",
      scrollLabel: "Scroll down",
      items: [
        {
          iconName: "zap",
          title: "Flash Campaign",
          description: "Brands find you based on your profile. Negotiate directly and agree on the terms that work best for you.",
          bullets: ["Negotiate your own terms", "Direct communication with the brand"],
        },
        {
          iconName: "megaphone",
          title: "Influencer Campaign",
          description: "Publish branded content on your profile and monetize your audience through authentic collaborations.",
          bullets: ["Create and publish on your own profile", "Monetize your audience authentically"],
        },
        {
          iconName: "camera",
          title: "UGC Creator Campaign",
          description: "Produce professional videos for brands using the resources they send you. You create, they publish.",
          bullets: ["Receive briefs and brand assets", "Focus on creating high-quality content"],
        },
        {
          iconName: "star",
          title: "UGC + Influencer Campaign",
          description: "The most complete opportunity: create content for the brand and publish it on your profile. Bigger impact, higher earnings.",
          bullets: ["Create + publish = higher earnings", "The platform's most complete opportunity"],
        },
      ],
    },
    campaignFeatures: {
      badge: "FEATURES",
      title: "🛠️ Tools designed\nfor creators",
      description: "Tools built so you can focus on what you do best: creating amazing content.",
      ctaButton: "Create my profile",
      blocks: [
        {
          iconName: "sliders",
          title: "Your professional profile",
          subtitle: "Build a profile that represents you and let brands discover you.",
          image: "/campaign-create.jpg",
          cards: [
            { iconName: "clapperboard", title: "Visual portfolio + social media", description: "Showcase your best work and connect Instagram and TikTok to share your metrics with brands." },
            { iconName: "lock", title: "Reputation system", description: "Each completed campaign grows your badge: Bronze -> Silver -> Gold. Brands prioritize creators with stronger reputations." },
            { iconName: "wallet", title: "Rates and availability", description: "Set your rates by video length and show your availability so brands know when to contact you." },
          ],
          floatingCards: [
            { iconName: "clapperboard", iconBg: "#0019DA", text: "Portfolio updated", subtext: "5 pieces", position: "-top-8 -right-14" },
            { iconName: "package", iconBg: "#7C3AED", text: "Pending deliverables", subtext: "2 of 4 sent", position: "-bottom-8 -left-14" },
            { iconName: "send", iconBg: "#22C55E", text: "Publication submitted", subtext: "Content approved", position: "-bottom-8 -right-14" },
          ],
        },
        {
          iconName: "users",
          title: "Apply and get paid securely",
          subtitle: "Find campaigns, negotiate and receive your payments — all from one platform.",
          image: "/campaign-dashboard.jpg",
          cards: [
            { iconName: "send", title: "Smart applications", description: "Explore active campaigns, filter by category and budget, and apply with one click." },
            { iconName: "wallet", title: "Direct negotiation", description: "Receive proposals, send counteroffers and agree on terms directly with the brand." },
            { iconName: "lock", title: "Protected payout", description: "The deposit is released when the brand approves your content." },
          ],
          floatingCards: [
            { iconName: "send", iconBg: "#EA580C", text: "Counteroffer sent", subtext: "2 min ago", position: "-top-8 -right-14" },
            { iconName: "lock", iconBg: "#22C55E", customIcon: "campaign-status", text: "Campaign completed", subtext: "Payment released", position: "-bottom-8 -left-14" },
            { iconName: "wallet", iconBg: "#00AEEF", customIcon: "mercadopago", text: "Mercado Pago", subtext: "Secure payout", position: "-bottom-8 -right-14" },
          ],
        },
      ],
    },
    pricing: {
      badge: "REPUTATION",
      title: "⭐ Your reputation is\nyour best asset",
      description: "Every completed campaign builds your reputation. Level up and unlock better opportunities.",
      ctaButton: "Start monetizing your content",
      plans: [
        { name: "New", description: "You just joined Creeadores", price: null, period: "", features: [{ iconName: "users", text: "Basic profile" }, { iconName: "megaphone", text: "Limited applications" }, { iconName: "percent", text: "New creator badge" }], cta: "Create my profile", popular: true, iconName: "check", customPriceLabel: "Start here", popularLabel: "START HERE" },
        { name: "Bronze", description: "Visible Bronze badge", price: null, period: "", features: [{ iconName: "users", text: "Verified profile" }, { iconName: "megaphone", text: "Visible Bronze badge" }, { iconName: "percent", text: "Unlimited applications" }], cta: "Start now", popular: false, iconName: "shield", customPriceLabel: "1+ campaigns" },
        { name: "Silver", description: "Established creator", price: null, period: "", features: [{ iconName: "users", text: "Visible Silver badge" }, { iconName: "megaphone", text: "Priority in applications" }, { iconName: "percent", text: "Access to exclusive campaigns" }], cta: "Keep growing", popular: false, iconName: "award", customPriceLabel: "10+ campaigns" },
        { name: "Gold", description: "Top creator on the platform", price: null, period: "", features: [{ iconName: "users", text: "Premium Gold badge" }, { iconName: "megaphone", text: "Maximum visibility" }, { iconName: "percent", text: "Direct invitations from brands" }], cta: "Reach Gold", popular: false, iconName: "crown", customPriceLabel: "100+ campaigns" },
      ],
    },
    landingFooter: {
      description: "Monetize your content by connecting with the best brands and agencies in Latin America.",
      links: ["Opportunities", "How it works", "Reputation"],
      copyright: "© 2026 Creadores. All rights reserved.",
      legal: ["Privacy", "Terms"],
    },
  },
  "es-AR": {
    hero: {
      badge: "Partners oficiales de",
      line1: "MONETIZÁ",
      line2: "TU",
      line3: "",
      line3Bold: "CONTENIDO",
      rotatingWords: ["CONTENIDO", "TALENTO", "CREATIVIDAD", "AUDIENCIA", "PASIÓN"],
      description:
        "Creeadores es la plataforma que te conecta con las mejores marcas y agencias de Latinoamérica. Postulate a campañas, creá contenido y cobrá de forma segura.",
      ctas: {
        primary: "Soy creador",
        secondary: "Soy marca",
      },
    },
    nav: {
      links: [
        { label: "Soy marca", href: "/" },
        { label: "Funcionalidades", href: "#features" },
        { label: "Reputación", href: "#reputation" },
      ],
      signIn: "Iniciar sesion",
      startFree: "Registrate gratis",
      startFreeMobile: "Registrate",
      signUpDropdown: {
        brand: { label: "Soy una marca", description: "Conecta con creadores" },
        creator: { label: "Soy creador", description: "Monetiza tu contenido" },
      },
    },
    campaignTypes: {
      badge: "OPORTUNIDADES",
      title: "✨ Encontrá la campaña\nperfecta para vos",
      description: "Postulate al tipo de campaña que mejor se adapte a tu perfil y empezá a monetizar tu contenido.",
      scrollLabel: "Desliza hacia abajo",
      items: [
        {
          iconName: "zap",
          title: "Campaña Flash",
          description: "Las marcas te encuentran según tu perfil. Negociá directamente y acordá los términos que te convengan.",
          bullets: ["Negociá tus propios términos", "Comunicación directa con la marca"],
        },
        {
          iconName: "megaphone",
          title: "Campaña Influencer",
          description: "Publicá contenido de marcas en tu perfil y monetizá tu audiencia con colaboraciones auténticas.",
          bullets: ["Crea y publica en tu propio perfil", "Monetizá tu audiencia de forma auténtica"],
        },
        {
          iconName: "camera",
          title: "Campaña UGC Creator",
          description: "Producí videos profesionales para marcas con los recursos que te envían. Vos creás, ellos publican.",
          bullets: ["Recibí briefs y recursos de la marca", "Enfocate en crear contenido de calidad"],
        },
        {
          iconName: "star",
          title: "Campaña UGC + Influencer",
          description: "La oportunidad más completa: producí contenido para la marca y publicalo en tu perfil. Doble impacto, mayor ingreso.",
          bullets: ["Producí + publicá = mayor ingreso", "La oportunidad más completa de la plataforma"],
        },
      ],
    },
    campaignFeatures: {
      badge: "FUNCIONALIDADES",
      title: "🛠️ Herramientas diseñadas\npara creadores",
      description: "Herramientas diseñadas para que puedas enfocarte en lo que mejor hacés: crear contenido increíble.",
      ctaButton: "Crear mi perfil",
      blocks: [
        {
          iconName: "sliders",
          title: "Tu perfil profesional",
          subtitle: "Construí un perfil que te represente y dejá que las marcas te encuentren.",
          image: "/campaign-create.jpg",
          cards: [
            { iconName: "clapperboard", title: "Portafolio visual + social media", description: "Mostrá tus mejores trabajos y conectá tu Instagram y TikTok para compartir tus métricas con las marcas." },
            { iconName: "lock", title: "Sistema de reputación", description: "Cada campaña completada suma a tu badge: Bronce -> Plata -> Oro. Las marcas priorizan creadores con mejor reputación." },
            { iconName: "wallet", title: "Tarifas y disponibilidad", description: "Definí tus tarifas por tiempo de video y mostrá tu disponibilidad para que las marcas sepan cuándo contactarte." },
          ],
          floatingCards: [
            { iconName: "clapperboard", iconBg: "#0019DA", text: "Portfolio actualizado", subtext: "5 trabajos", position: "-top-8 -right-14" },
            { iconName: "package", iconBg: "#7C3AED", text: "Entregables pendientes", subtext: "2 de 4 enviados", position: "-bottom-8 -left-14" },
            { iconName: "send", iconBg: "#22C55E", text: "Publicación enviada", subtext: "Contenido aprobado", position: "-bottom-8 -right-14" },
          ],
        },
        {
          iconName: "users",
          title: "Postulate y cobrá seguro",
          subtitle: "Encontrá campañas, negociá y recibí tus pagos, todo desde la plataforma.",
          image: "/campaign-dashboard.jpg",
          cards: [
            { iconName: "send", title: "Postulaciones inteligentes", description: "Explorá campañas activas, filtrá por categoría y presupuesto, y postulate con un clic." },
            { iconName: "wallet", title: "Negociación directa", description: "Recibí propuestas, enviá contraofertas y acordá los términos directamente con la marca." },
            { iconName: "lock", title: "Cobro protegido", description: "El depósito se libera cuando la marca aprueba tu contenido." },
          ],
          floatingCards: [
            { iconName: "send", iconBg: "#EA580C", text: "Contraoferta enviada", subtext: "Hace 2 min", position: "-top-8 -right-14" },
            { iconName: "lock", iconBg: "#22C55E", customIcon: "campaign-status", text: "Campaña finalizada", subtext: "Pago liberado", position: "-bottom-8 -left-14" },
            { iconName: "wallet", iconBg: "#00AEEF", customIcon: "mercadopago", text: "Mercado Pago", subtext: "Cobro seguro", position: "-bottom-8 -right-14" },
          ],
        },
      ],
    },
    pricing: {
      badge: "REPUTACIÓN",
      title: "⭐ Tu reputación es\ntu mejor activo",
      description: "Cada campaña completada construye tu reputación. Subí de nivel y accedé a mejores oportunidades.",
      ctaButton: "Comenzá a monetizar tu contenido",
      plans: [
        { name: "Nuevo", description: "Recién llegaste a Creeadores", price: null, period: "", features: [{ iconName: "users", text: "Perfil básico" }, { iconName: "megaphone", text: "Postulaciones limitadas" }, { iconName: "percent", text: "Badge de nuevo creador" }], cta: "Crear mi perfil", popular: true, iconName: "check", customPriceLabel: "Empezá acá", popularLabel: "COMENZÁ ACÁ" },
        { name: "Bronce", description: "Badge Bronce visible", price: null, period: "", features: [{ iconName: "users", text: "Perfil verificado" }, { iconName: "megaphone", text: "Badge Bronce visible" }, { iconName: "percent", text: "Postulaciones ilimitadas" }], cta: "Empezar ahora", popular: false, iconName: "shield", customPriceLabel: "1+ campañas" },
        { name: "Plata", description: "Creador con trayectoria", price: null, period: "", features: [{ iconName: "users", text: "Badge Plata visible" }, { iconName: "megaphone", text: "Prioridad en postulaciones" }, { iconName: "percent", text: "Acceso a campañas exclusivas" }], cta: "Seguir creciendo", popular: false, iconName: "award", customPriceLabel: "10+ campañas" },
        { name: "Oro", description: "Top creator de la plataforma", price: null, period: "", features: [{ iconName: "users", text: "Badge Oro premium" }, { iconName: "megaphone", text: "Máxima visibilidad" }, { iconName: "percent", text: "Invitaciones directas de marcas" }], cta: "Llegar a Oro", popular: false, iconName: "crown", customPriceLabel: "100+ campañas" },
      ],
    },
    landingFooter: {
      description: "Monetizá tu contenido conectando con las mejores marcas y agencias de Latinoamérica.",
      links: ["Oportunidades", "Cómo funciona", "Reputación"],
      copyright: "© 2026 Creadores. Todos los derechos reservados.",
      legal: ["Privacidad", "Términos"],
    },
  },
  "es-MX": {
    hero: {
      badge: "Partners oficiales de",
      line1: "MONETIZÁ",
      line2: "TU",
      line3: "",
      line3Bold: "CONTENIDO",
      rotatingWords: ["CONTENIDO", "TALENTO", "CREATIVIDAD", "AUDIENCIA", "PASIÓN"],
      description:
        "Creeadores es la plataforma que te conecta con las mejores marcas y agencias de Latinoamérica. Postulate a campañas, creá contenido y cobrá de forma segura.",
      ctas: {
        primary: "Soy creador",
        secondary: "Soy marca",
      },
    },
    nav: {
      links: [
        { label: "Soy marca", href: "/" },
        { label: "Funcionalidades", href: "#features" },
        { label: "Reputación", href: "#reputation" },
      ],
      signIn: "Iniciar sesion",
      startFree: "Registrate gratis",
      startFreeMobile: "Registrate",
      signUpDropdown: {
        brand: { label: "Soy una marca", description: "Conecta con creadores" },
        creator: { label: "Soy creador", description: "Monetiza tu contenido" },
      },
    },
    campaignTypes: {
      badge: "OPORTUNIDADES",
      title: "✨ Encontrá la campaña\nperfecta para vos",
      description: "Postulate al tipo de campaña que mejor se adapte a tu perfil y empezá a monetizar tu contenido.",
      scrollLabel: "Desliza hacia abajo",
      items: [
        {
          iconName: "zap",
          title: "Campaña Flash",
          description: "Las marcas te encuentran según tu perfil. Negociá directamente y acordá los términos que te convengan.",
          bullets: ["Negociá tus propios términos", "Comunicación directa con la marca"],
        },
        {
          iconName: "megaphone",
          title: "Campaña Influencer",
          description: "Publicá contenido de marcas en tu perfil y monetizá tu audiencia con colaboraciones auténticas.",
          bullets: ["Crea y publica en tu propio perfil", "Monetizá tu audiencia de forma auténtica"],
        },
        {
          iconName: "camera",
          title: "Campaña UGC Creator",
          description: "Producí videos profesionales para marcas con los recursos que te envían. Vos creás, ellos publican.",
          bullets: ["Recibí briefs y recursos de la marca", "Enfocate en crear contenido de calidad"],
        },
        {
          iconName: "star",
          title: "Campaña UGC + Influencer",
          description: "La oportunidad más completa: producí contenido para la marca y publicalo en tu perfil. Doble impacto, mayor ingreso.",
          bullets: ["Producí + publicá = mayor ingreso", "La oportunidad más completa de la plataforma"],
        },
      ],
    },
    campaignFeatures: {
      badge: "FUNCIONALIDADES",
      title: "🛠️ Herramientas diseñadas\npara creadores",
      description: "Herramientas diseñadas para que puedas enfocarte en lo que mejor hacés: crear contenido increíble.",
      ctaButton: "Crear mi perfil",
      blocks: [
        {
          iconName: "sliders",
          title: "Tu perfil profesional",
          subtitle: "Construí un perfil que te represente y dejá que las marcas te encuentren.",
          image: "/campaign-create.jpg",
          cards: [
            { iconName: "clapperboard", title: "Portafolio visual + social media", description: "Mostrá tus mejores trabajos y conectá tu Instagram y TikTok para compartir tus métricas con las marcas." },
            { iconName: "lock", title: "Sistema de reputación", description: "Cada campaña completada suma a tu badge: Bronce -> Plata -> Oro. Las marcas priorizan creadores con mejor reputación." },
            { iconName: "wallet", title: "Tarifas y disponibilidad", description: "Definí tus tarifas por tiempo de video y mostrá tu disponibilidad para que las marcas sepan cuándo contactarte." },
          ],
          floatingCards: [
            { iconName: "clapperboard", iconBg: "#0019DA", text: "Portfolio actualizado", subtext: "5 trabajos", position: "-top-8 -right-14" },
            { iconName: "package", iconBg: "#7C3AED", text: "Entregables pendientes", subtext: "2 de 4 enviados", position: "-bottom-8 -left-14" },
            { iconName: "send", iconBg: "#22C55E", text: "Publicación enviada", subtext: "Contenido aprobado", position: "-bottom-8 -right-14" },
          ],
        },
        {
          iconName: "users",
          title: "Postulate y cobrá seguro",
          subtitle: "Encontrá campañas, negociá y recibí tus pagos, todo desde la plataforma.",
          image: "/campaign-dashboard.jpg",
          cards: [
            { iconName: "send", title: "Postulaciones inteligentes", description: "Explorá campañas activas, filtrá por categoría y presupuesto, y postulate con un clic." },
            { iconName: "wallet", title: "Negociación directa", description: "Recibí propuestas, enviá contraofertas y acordá los términos directamente con la marca." },
            { iconName: "lock", title: "Cobro protegido", description: "El depósito se libera cuando la marca aprueba tu contenido." },
          ],
          floatingCards: [
            { iconName: "send", iconBg: "#EA580C", text: "Contraoferta enviada", subtext: "Hace 2 min", position: "-top-8 -right-14" },
            { iconName: "lock", iconBg: "#22C55E", customIcon: "campaign-status", text: "Campaña finalizada", subtext: "Pago liberado", position: "-bottom-8 -left-14" },
            { iconName: "wallet", iconBg: "#00AEEF", customIcon: "mercadopago", text: "Mercado Pago", subtext: "Cobro seguro", position: "-bottom-8 -right-14" },
          ],
        },
      ],
    },
    pricing: {
      badge: "REPUTACIÓN",
      title: "⭐ Tu reputación es\ntu mejor activo",
      description: "Cada campaña completada construye tu reputación. Subí de nivel y accedé a mejores oportunidades.",
      ctaButton: "Comenzá a monetizar tu contenido",
      plans: [
        { name: "Nuevo", description: "Recién llegaste a Creeadores", price: null, period: "", features: [{ iconName: "users", text: "Perfil básico" }, { iconName: "megaphone", text: "Postulaciones limitadas" }, { iconName: "percent", text: "Badge de nuevo creador" }], cta: "Crear mi perfil", popular: true, iconName: "check", customPriceLabel: "Empezá acá", popularLabel: "COMENZÁ ACÁ" },
        { name: "Bronce", description: "Badge Bronce visible", price: null, period: "", features: [{ iconName: "users", text: "Perfil verificado" }, { iconName: "megaphone", text: "Badge Bronce visible" }, { iconName: "percent", text: "Postulaciones ilimitadas" }], cta: "Empezar ahora", popular: false, iconName: "shield", customPriceLabel: "1+ campañas" },
        { name: "Plata", description: "Creador con trayectoria", price: null, period: "", features: [{ iconName: "users", text: "Badge Plata visible" }, { iconName: "megaphone", text: "Prioridad en postulaciones" }, { iconName: "percent", text: "Acceso a campañas exclusivas" }], cta: "Seguir creciendo", popular: false, iconName: "award", customPriceLabel: "10+ campañas" },
        { name: "Oro", description: "Top creator de la plataforma", price: null, period: "", features: [{ iconName: "users", text: "Badge Oro premium" }, { iconName: "megaphone", text: "Máxima visibilidad" }, { iconName: "percent", text: "Invitaciones directas de marcas" }], cta: "Llegar a Oro", popular: false, iconName: "crown", customPriceLabel: "100+ campañas" },
      ],
    },
    landingFooter: {
      description: "Monetizá tu contenido conectando con las mejores marcas y agencias de Latinoamérica.",
      links: ["Oportunidades", "Cómo funciona", "Reputación"],
      copyright: "© 2026 Creadores. Todos los derechos reservados.",
      legal: ["Privacidad", "Términos"],
    },
  },
  pt: {
    hero: {
      badge: "Parceiros oficiais de",
      line1: "MONETIZE",
      line2: "SEU",
      line3: "",
      line3Bold: "CONTEÚDO",
      rotatingWords: ["CONTEÚDO", "TALENTO", "CRIATIVIDADE", "AUDIÊNCIA", "PAIXÃO"],
      description:
        "Creeadores é a plataforma que conecta você às melhores marcas e agências da América Latina. Candidate-se a campanhas, crie conteúdo e receba com segurança.",
      ctas: {
        primary: "Sou criador",
        secondary: "Sou marca",
      },
    },
    nav: {
      links: [
        { label: "Sou marca", href: "/" },
        { label: "Funcionalidades", href: "#features" },
        { label: "Reputação", href: "#reputation" },
      ],
      signIn: "Entrar",
      startFree: "Cadastre-se grátis",
      startFreeMobile: "Cadastre-se",
      signUpDropdown: {
        brand: { label: "Sou uma marca", description: "Conecte-se com criadores" },
        creator: { label: "Sou criador", description: "Monetize seu conteúdo" },
      },
    },
    campaignTypes: {
      badge: "OPORTUNIDADES",
      title: "✨ Encontre a campanha\nperfeita para você",
      description: "Candidate-se ao tipo de campanha que melhor combina com o seu perfil e comece a monetizar seu conteúdo.",
      scrollLabel: "Deslize para baixo",
      items: [
        {
          iconName: "zap",
          title: "Campanha Flash",
          description: "As marcas encontram você pelo seu perfil. Negocie diretamente e combine os termos que fazem sentido para você.",
          bullets: ["Negocie seus próprios termos", "Comunicação direta com a marca"],
        },
        {
          iconName: "megaphone",
          title: "Campanha Influencer",
          description: "Publique conteúdo de marcas no seu perfil e monetize sua audiência com colaborações autênticas.",
          bullets: ["Crie e publique no seu próprio perfil", "Monetize sua audiência de forma autêntica"],
        },
        {
          iconName: "camera",
          title: "Campanha UGC Creator",
          description: "Produza vídeos profissionais para marcas com os recursos que elas enviam. Você cria, elas publicam.",
          bullets: ["Receba briefs e materiais da marca", "Foque em criar conteúdo de alta qualidade"],
        },
        {
          iconName: "star",
          title: "Campanha UGC + Influencer",
          description: "A oportunidade mais completa: produza conteúdo para a marca e publique no seu perfil. Mais impacto, maior ganho.",
          bullets: ["Produzir + publicar = maior ganho", "A oportunidade mais completa da plataforma"],
        },
      ],
    },
    campaignFeatures: {
      badge: "FUNCIONALIDADES",
      title: "🛠️ Ferramentas pensadas\npara criadores",
      description: "Ferramentas pensadas para que você foque no que faz de melhor: criar conteúdo incrível.",
      ctaButton: "Criar meu perfil",
      blocks: [
        {
          iconName: "sliders",
          title: "Seu perfil profissional",
          subtitle: "Construa um perfil que represente você e deixe as marcas encontrarem seu trabalho.",
          image: "/campaign-create.jpg",
          cards: [
            { iconName: "clapperboard", title: "Portfólio visual + redes sociais", description: "Mostre seus melhores trabalhos e conecte Instagram e TikTok para compartilhar suas métricas com as marcas." },
            { iconName: "lock", title: "Sistema de reputação", description: "Cada campanha concluída fortalece seu badge: Bronze -> Prata -> Ouro. As marcas priorizam criadores com melhor reputação." },
            { iconName: "wallet", title: "Tarifas e disponibilidade", description: "Defina suas tarifas por duração de vídeo e mostre sua disponibilidade para que as marcas saibam quando falar com você." },
          ],
          floatingCards: [
            { iconName: "clapperboard", iconBg: "#0019DA", text: "Portfólio atualizado", subtext: "5 trabalhos", position: "-top-8 -right-14" },
            { iconName: "package", iconBg: "#7C3AED", text: "Entregáveis pendentes", subtext: "2 de 4 enviados", position: "-bottom-8 -left-14" },
            { iconName: "send", iconBg: "#22C55E", text: "Publicação enviada", subtext: "Conteúdo aprovado", position: "-bottom-8 -right-14" },
          ],
        },
        {
          iconName: "users",
          title: "Candidate-se e receba com segurança",
          subtitle: "Encontre campanhas, negocie e receba seus pagamentos, tudo dentro da plataforma.",
          image: "/campaign-dashboard.jpg",
          cards: [
            { iconName: "send", title: "Candidaturas inteligentes", description: "Explore campanhas ativas, filtre por categoria e orçamento e candidate-se com um clique." },
            { iconName: "wallet", title: "Negociação direta", description: "Receba propostas, envie contrapropostas e combine os termos diretamente com a marca." },
            { iconName: "lock", title: "Recebimento protegido", description: "O valor é liberado quando a marca aprova o seu conteúdo." },
          ],
          floatingCards: [
            { iconName: "send", iconBg: "#EA580C", text: "Contraproposta enviada", subtext: "Há 2 min", position: "-top-8 -right-14" },
            { iconName: "lock", iconBg: "#22C55E", customIcon: "campaign-status", text: "Campanha finalizada", subtext: "Pagamento liberado", position: "-bottom-8 -left-14" },
            { iconName: "wallet", iconBg: "#00AEEF", customIcon: "mercadopago", text: "Mercado Pago", subtext: "Recebimento seguro", position: "-bottom-8 -right-14" },
          ],
        },
      ],
    },
    pricing: {
      badge: "REPUTAÇÃO",
      title: "⭐ Sua reputação é\nseu melhor ativo",
      description: "Cada campanha concluída fortalece sua reputação. Suba de nível e acesse oportunidades melhores.",
      ctaButton: "Comece a monetizar seu conteúdo",
      plans: [
        { name: "Novo", description: "Você acabou de chegar ao Creeadores", price: null, period: "", features: [{ iconName: "users", text: "Perfil básico" }, { iconName: "megaphone", text: "Candidaturas limitadas" }, { iconName: "percent", text: "Badge de novo criador" }], cta: "Criar meu perfil", popular: true, iconName: "check", customPriceLabel: "Comece aqui", popularLabel: "COMECE AQUI" },
        { name: "Bronze", description: "Badge Bronze visível", price: null, period: "", features: [{ iconName: "users", text: "Perfil verificado" }, { iconName: "megaphone", text: "Badge Bronze visível" }, { iconName: "percent", text: "Candidaturas ilimitadas" }], cta: "Começar agora", popular: false, iconName: "shield", customPriceLabel: "1+ campanhas" },
        { name: "Prata", description: "Criador com trajetória", price: null, period: "", features: [{ iconName: "users", text: "Badge Prata visível" }, { iconName: "megaphone", text: "Prioridade nas candidaturas" }, { iconName: "percent", text: "Acesso a campanhas exclusivas" }], cta: "Continuar crescendo", popular: false, iconName: "award", customPriceLabel: "10+ campanhas" },
        { name: "Ouro", description: "Top creator da plataforma", price: null, period: "", features: [{ iconName: "users", text: "Badge Ouro premium" }, { iconName: "megaphone", text: "Visibilidade máxima" }, { iconName: "percent", text: "Convites diretos de marcas" }], cta: "Chegar ao Ouro", popular: false, iconName: "crown", customPriceLabel: "100+ campanhas" },
      ],
    },
    landingFooter: {
      description: "Monetize seu conteúdo conectando-se com as melhores marcas e agências da América Latina.",
      links: ["Oportunidades", "Como funciona", "Reputação"],
      copyright: "© 2026 Creadores. Todos os direitos reservados.",
      legal: ["Privacidade", "Termos"],
    },
  },
} satisfies Record<Locale, Partial<HomeDictionary>>;

export function getCreatorDictionary(locale: Locale): AppDictionary {
  const base = getDictionary(locale);
  const creatorHomeOverrides = creatorHomeOverridesByLocale[locale] ?? creatorHomeOverridesByLocale[DEFAULT_LOCALE];
  return {
    ...base,
    home: {
      ...base.home,
      hero: creatorHomeOverrides.hero ?? base.home.hero,
      nav: creatorHomeOverrides.nav ?? base.home.nav,
      campaignTypes: creatorHomeOverrides.campaignTypes ?? base.home.campaignTypes,
      campaignFeatures: creatorHomeOverrides.campaignFeatures ?? base.home.campaignFeatures,
      pricing: creatorHomeOverrides.pricing ?? base.home.pricing,
      landingFooter: creatorHomeOverrides.landingFooter ?? base.home.landingFooter,
    },
  };
}
