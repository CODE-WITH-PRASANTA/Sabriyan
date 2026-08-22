const mongoose = require("mongoose");

const WebsiteSettingSchema = new mongoose.Schema(
  {
    // =====================================================
    // STORE PROFILE
    // =====================================================
    storeProfile: {
      storeName: {
        type: String,
        default: "Choco Bliss",
        trim: true,
      },

      tagline: {
        type: String,
        default: "Premium Chocolates, Pure Happiness",
        trim: true,
      },

      websiteEmail: {
        type: String,
        default: "support@chocobliss.com",
        trim: true,
      },

      storeDescription: {
        type: String,
        default: "",
        trim: true,
      },

      logo: {
        type: String,
        default: "",
        trim: true,
      },
    },

    // =====================================================
    // CONTACT DETAILS
    // =====================================================
    contactDetails: {
      address: {
        type: String,
        default: "",
        trim: true,
      },

      phone: {
        type: String,
        default: "",
        trim: true,
      },

      whatsapp: {
        type: String,
        default: "",
        trim: true,
      },

      supportEmail: {
        type: String,
        default: "",
        trim: true,
      },

      workingHours: {
        type: String,
        default: "",
        trim: true,
      },
    },

    // =====================================================
    // FEATURES
    // =====================================================
    features: {
      premiumCollection: {
        type: Boolean,
        default: true,
      },

      honeyProducts: {
        type: Boolean,
        default: true,
      },

      customerReviews: {
        type: Boolean,
        default: true,
      },

      newsletter: {
        type: Boolean,
        default: true,
      },

      whatsappChat: {
        type: Boolean,
        default: true,
      },
    },

    // =====================================================
    // SOCIAL MEDIA
    // =====================================================
    socialMedia: {
      facebook: {
        type: String,
        default: "",
        trim: true,
      },

      instagram: {
        type: String,
        default: "",
        trim: true,
      },

      youtube: {
        type: String,
        default: "",
        trim: true,
      },

      twitter: {
        type: String,
        default: "",
        trim: true,
      },
    },

    // =====================================================
    // SEO
    // =====================================================
    seo: {
      metaTitle: {
        type: String,
        default: "",
        trim: true,
      },

      metaDescription: {
        type: String,
        default: "",
        trim: true,
      },
    },

    // =====================================================
    // EMAIL SETTINGS
    // =====================================================
    emailSettings: {
      mailProvider: {
        type: String,
        default: "SMTP",
        trim: true,
      },

      smtpHost: {
        type: String,
        default: "smtp.gmail.com",
        trim: true,
      },

      smtpPort: {
        type: String,
        default: "587",
        trim: true,
      },

      smtpUsername: {
        type: String,
        default: "",
        trim: true,
      },

      smtpPassword: {
        type: String,
        default: "",
      },

      encryption: {
        type: String,
        default: "TLS",
        trim: true,
      },

      senderName: {
        type: String,
        default: "Choco Bliss",
        trim: true,
      },

      senderEmail: {
        type: String,
        default: "",
        trim: true,
      },

      orderNotification: {
        type: Boolean,
        default: true,
      },

      customerRegistration: {
        type: Boolean,
        default: true,
      },

      paymentNotification: {
        type: Boolean,
        default: true,
      },

      newsletterNotification: {
        type: Boolean,
        default: false,
      },
    },

    // =====================================================
    // PAYMENT SETTINGS
    // =====================================================
    paymentSettings: {
      currency: {
        type: String,
        default: "USD",
        trim: true,
      },

      currencySymbol: {
        type: String,
        default: "$",
        trim: true,
      },

      razorpayKey: {
        type: String,
        default: "",
      },

      razorpaySecret: {
        type: String,
        default: "",
      },

      stripePublicKey: {
        type: String,
        default: "",
      },

      stripeSecretKey: {
        type: String,
        default: "",
      },

      cod: {
        type: Boolean,
        default: true,
      },

      onlinePayment: {
        type: Boolean,
        default: true,
      },

      paypal: {
        type: Boolean,
        default: false,
      },

      razorpay: {
        type: Boolean,
        default: true,
      },

      stripe: {
        type: Boolean,
        default: false,
      },

      testMode: {
        type: Boolean,
        default: true,
      },
    },

    // =====================================================
    // OTHER SETTINGS
    // =====================================================
    otherSettings: {
      timezone: {
        type: String,
        default: "Asia/Kolkata",
        trim: true,
      },

      language: {
        type: String,
        default: "English",
        trim: true,
      },

      dateFormat: {
        type: String,
        default: "DD/MM/YYYY",
        trim: true,
      },

      maintenanceMode: {
        type: Boolean,
        default: false,
      },

      customerRegistration: {
        type: Boolean,
        default: true,
      },

      guestCheckout: {
        type: Boolean,
        default: true,
      },

      googleAnalytics: {
        type: String,
        default: "",
        trim: true,
      },

      facebookPixel: {
        type: String,
        default: "",
        trim: true,
      },

      enableCache: {
        type: Boolean,
        default: true,
      },

      enableSecurity: {
        type: Boolean,
        default: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "WebsiteSetting",
  WebsiteSettingSchema
);