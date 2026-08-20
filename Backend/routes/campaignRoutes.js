const express = require('express');
const router = express.Router();
const { getCampaigns, createCampaign, updateCampaign, deleteCampaign } = require("../controllers/campaignController");
const { upload, convertToWebp } = require("../middleware/upload");

router.get('/', getCampaigns);
router.post('/', upload.single('thumbnail'), convertToWebp({ folder: 'campaigns', quality: 85 }), createCampaign);
router.put('/:id', upload.single('thumbnail'), convertToWebp({ folder: 'campaigns', quality: 85 }), updateCampaign);
router.delete('/:id', deleteCampaign);

module.exports = router;