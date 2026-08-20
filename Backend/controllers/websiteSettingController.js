const WebsiteSetting = require("../models/WebsiteSetting");
const {
  deleteUploadedFile,
} = require("../middleware/upload");

// =====================================================
// PARSE JSON SAFELY
// =====================================================

const parseObject = (
  value,
  fallback = {}
) => {
  if (
    value === undefined ||
    value === null ||
    value === ""
  ) {
    return fallback;
  }

  if (
    typeof value === "object" &&
    !Buffer.isBuffer(value)
  ) {
    return value;
  }

  try {
    const parsed =
      JSON.parse(value);

    if (
      parsed &&
      typeof parsed === "object"
    ) {
      return parsed;
    }

    return fallback;
  } catch (error) {
    return fallback;
  }
};

// =====================================================
// GET WEBSITE SETTINGS
// =====================================================

const getWebsiteSettings = async (
  req,
  res
) => {
  try {
    let settings =
      await WebsiteSetting.findOne();

    // -------------------------------------------------
    // Create default settings if not available
    // -------------------------------------------------

    if (!settings) {
      settings =
        await WebsiteSetting.create({});
    }

    return res.status(200).json({
      success: true,
      message:
        "Website settings fetched successfully.",
      data: settings,
    });
  } catch (error) {
    console.error(
      "❌ Get Website Settings Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to fetch website settings.",
    });
  }
};

// =====================================================
// CREATE / UPDATE WEBSITE SETTINGS
// =====================================================

const createOrUpdateWebsiteSettings =
  async (req, res) => {
    let newLogoUrl = null;

    try {
      // -------------------------------------------------
      // Find existing settings
      // -------------------------------------------------

      let settings =
        await WebsiteSetting.findOne();

      // -------------------------------------------------
      // Save OLD logo URL before updating
      // -------------------------------------------------

      const oldLogoUrl =
        settings?.storeProfile?.logo ||
        "";

      // -------------------------------------------------
      // Parse request sections
      // -------------------------------------------------

      const currentStoreProfile =
        settings?.storeProfile?.toObject?.() ||
        settings?.storeProfile ||
        {};

      const currentContactDetails =
        settings?.contactDetails?.toObject?.() ||
        settings?.contactDetails ||
        {};

      const currentFeatures =
        settings?.features?.toObject?.() ||
        settings?.features ||
        {};

      const currentSocialMedia =
        settings?.socialMedia?.toObject?.() ||
        settings?.socialMedia ||
        {};

      const currentSeo =
        settings?.seo?.toObject?.() ||
        settings?.seo ||
        {};

      const currentEmailSettings =
        settings?.emailSettings?.toObject?.() ||
        settings?.emailSettings ||
        {};

      const currentPaymentSettings =
        settings?.paymentSettings?.toObject?.() ||
        settings?.paymentSettings ||
        {};

      const currentOtherSettings =
        settings?.otherSettings?.toObject?.() ||
        settings?.otherSettings ||
        {};

      // -------------------------------------------------
      // Parse incoming data
      // -------------------------------------------------

      const incomingStoreProfile =
        parseObject(
          req.body.storeProfile,
          {}
        );

      const incomingContactDetails =
        parseObject(
          req.body.contactDetails,
          {}
        );

      const incomingFeatures =
        parseObject(
          req.body.features,
          {}
        );

      const incomingSocialMedia =
        parseObject(
          req.body.socialMedia,
          {}
        );

      const incomingSeo =
        parseObject(
          req.body.seo,
          {}
        );

      const incomingEmailSettings =
        parseObject(
          req.body.emailSettings,
          {}
        );

      const incomingPaymentSettings =
        parseObject(
          req.body.paymentSettings,
          {}
        );

      const incomingOtherSettings =
        parseObject(
          req.body.otherSettings,
          {}
        );

      // -------------------------------------------------
      // Merge sections
      // -------------------------------------------------

      const storeProfile = {
        ...currentStoreProfile,
        ...incomingStoreProfile,
      };

      const contactDetails = {
        ...currentContactDetails,
        ...incomingContactDetails,
      };

      const features = {
        ...currentFeatures,
        ...incomingFeatures,
      };

      const socialMedia = {
        ...currentSocialMedia,
        ...incomingSocialMedia,
      };

      const seo = {
        ...currentSeo,
        ...incomingSeo,
      };

      const emailSettings = {
        ...currentEmailSettings,
        ...incomingEmailSettings,
      };

      const paymentSettings = {
        ...currentPaymentSettings,
        ...incomingPaymentSettings,
      };

      const otherSettings = {
        ...currentOtherSettings,
        ...incomingOtherSettings,
      };

      // -------------------------------------------------
      // Create or update MongoDB document
      // -------------------------------------------------

      if (!settings) {
        settings =
          await WebsiteSetting.create({
            storeProfile,
            contactDetails,
            features,
            socialMedia,
            seo,
            emailSettings,
            paymentSettings,
            otherSettings,
          });
      } else {
        settings.storeProfile =
          storeProfile;

        settings.contactDetails =
          contactDetails;

        settings.features =
          features;

        settings.socialMedia =
          socialMedia;

        settings.seo =
          seo;

        settings.emailSettings =
          emailSettings;

        settings.paymentSettings =
          paymentSettings;

        settings.otherSettings =
          otherSettings;
      }

      // -------------------------------------------------
      // NEW LOGO
      // -------------------------------------------------

      if (
        req.file &&
        req.file.destinationPath
      ) {
        newLogoUrl =
          req.file.destinationPath;

        // Save new logo URL
        settings.storeProfile.logo =
          newLogoUrl;
      }

      // -------------------------------------------------
      // Save everything
      // -------------------------------------------------

      await settings.save();

      // -------------------------------------------------
      // Delete OLD logo only AFTER successful DB save
      // -------------------------------------------------

      if (
        newLogoUrl &&
        oldLogoUrl &&
        oldLogoUrl !== newLogoUrl
      ) {
        await deleteUploadedFile(
          oldLogoUrl
        );
      }

      // -------------------------------------------------
      // Response
      // -------------------------------------------------

      return res.status(200).json({
        success: true,
        message:
          "Website settings saved successfully.",
        data: settings,
      });
    } catch (error) {
      console.error(
        "❌ Save Website Settings Error:",
        error
      );

      // -------------------------------------------------
      // If DB save failed after new image was created,
      // remove the newly created image.
      // -------------------------------------------------

      if (
        newLogoUrl
      ) {
        await deleteUploadedFile(
          newLogoUrl
        );
      }

      return res.status(500).json({
        success: false,
        message:
          error.message ||
          "Failed to save website settings.",
      });
    }
  };

module.exports = {
  getWebsiteSettings,
  createOrUpdateWebsiteSettings,
};