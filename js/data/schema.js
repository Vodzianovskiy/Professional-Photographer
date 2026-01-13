const now = () => Date.now();

export const DEFAULT_CONTENT = () => ({
  meta: { updatedAt: now(), source: "default" },
  navigation: {
    brand: "Alexandra Morgan",
    items: [
      { id: "nav-home", label: "Home", href: "#hero" },
      { id: "nav-about", label: "About", href: "#about" },
      { id: "nav-gallery", label: "Gallery", href: "#gallery" },
      { id: "nav-pricing", label: "Pricing", href: "#pricing" },
      { id: "nav-contact", label: "Contact", href: "#contact" },
    ],
  },
  hero: {
    titleLines: ["Capturing", "Timeless", "Moments"],
    subtitle: "Professional Photography for Your Special Moments",
    background: "",
    overlayOpacity: 0.35,
  },
  theme: {
    primaryColor: "#D4AF37",
    secondaryColor: "#1a1a1a",
    background: "#0a0a0a",
    textPrimary: "#ffffff",
    textSecondary: "#b0b0b0",
    accentGradient: "linear-gradient(135deg, #D4AF37 0%, #F4E4C1 100%)",
  },
  photos: [],
  about: {
    photoUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=800&fit=crop",
    heading: "About Me",
    intro:
      "Hello! I'm Alexandra, a passionate photographer with over 10 years of experience capturing life's most beautiful moments.",
    desc1:
      "My journey in photography began with a simple camera and an eye for beauty.",
    desc2:
      "I believe that every photograph tells a story, and my goal is to help you tell yours in the most authentic and beautiful way possible.",
    signature: "DX",
    stats: [
      { number: "500+", label: "HAPPY CLIENTS" },
      { number: "10+", label: "YEARS EXPERIENCE" },
      { number: "50+", label: "AWARDS WON" },
    ],
  },
  pricing: [
    {
      title: "Essential",
      badge: "Basic",
      price: "299",
      description: "",
      features: [
        "2 Hour Session",
        "30 Edited Photos",
        "Online Gallery",
        "Digital Download",
        "Basic Retouching",
      ],
    },
    {
      title: "Premium",
      badge: "Most Popular",
      price: "599",
      description: "",
      features: [
        "4 Hour Session",
        "60 Edited Photos",
        "Online Gallery",
        "Digital Download",
        "Advanced Retouching",
        "2 Locations",
        "Print Release",
      ],
    },
    {
      title: "Ultimate",
      badge: "Deluxe",
      price: "999",
      description: "",
      features: [
        "Full Day Coverage",
        "100+ Edited Photos",
        "Online Gallery",
        "Digital Download",
        "Premium Retouching",
        "Multiple Locations",
        "Print Release",
        "Photo Album",
      ],
    },
    {
      title: "Bespoke",
      badge: "Custom",
      price: "Let's Talk",
      description:
        "Need something unique? I'd love to create a custom package tailored specifically to your vision and requirements.",
      features: [
        "Customized Services",
        "Flexible Schedule",
        "Unlimited Locations",
        "Special Requests",
      ],
    },
  ],
  contact: {
    whatsapp: {
      number: "1234567890",
      customMessage:
        "Hello! I would like to inquire about your photography services.",
      visible: true,
    },
    telegram: {
      username: "username",
      customMessage:
        "Hello! I would like to inquire about your photography services.",
      visible: true,
    },
    email: { value: "hello@alexandramorgan.com", visible: true },
    responseTime: "I'll respond within 24 hours",
    autoReply:
      "Thank you for reaching out! I've received your message and will get back to you soon.",
    social: {
      instagram: {
        url: "https://instagram.com/alexandramorgan",
        visible: true,
      },
      facebook: { url: "https://facebook.com/alexandramorgan", visible: true },
      twitter: { url: "https://twitter.com/alexandramorgan", visible: true },
      pinterest: {
        url: "https://pinterest.com/alexandramorgan",
        visible: true,
      },
      linkedin: {
        url: "https://linkedin.com/in/alexandramorgan",
        visible: true,
      },
      github: { url: "https://github.com/alexandramorgan", visible: true },
      youtube: { url: "https://youtube.com/@alexandramorgan", visible: true },
      tiktok: { url: "https://tiktok.com/@alexandramorgan", visible: true },
    },
  },
  footer: {
    line1: "© 2026 Alexandra Morgan Photography. All rights reserved.",
    line2: "Designed with passion for capturing beautiful moments",
  },
  settings: { galleryEffect: "effect-1", theme: "dark" },
});

export const cloneDefaults = () =>
  JSON.parse(JSON.stringify(DEFAULT_CONTENT()));
