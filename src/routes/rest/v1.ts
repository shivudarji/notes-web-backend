import express from 'express';
// import route from '../../constants/routes';
// import hub from '../../controllers/hub';
import requestLimiter from '../../middleware/rate_limiter';
// import requireRestAuthentication from '../../middleware/rest_token_verification';

const router = express.Router();

router.use(requestLimiter);

//meta lead fetch
// router.get(route.metaInquiry, [], hub.leadController.metaLeadWebhook);

// ----------------------------- Start: Open Routes ----------------------------------

// router.use(requireRestAuthentication);

//Inquiry
// router.post(
//   route.inquiry,
//   hub.inquiryController.addRestInquiryValidation,
//   hub.inquiryController.addRestInquiry
// );

export default router;
