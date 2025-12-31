import express from 'express';
import multer from 'multer';
// import route from '../../constants/routes';
// import hub from '../../controllers/hub';
import requestLimiter from '../../middleware/rate_limiter';
import routes from '../../constants/routes';
import hub from '../../controllers/hub';
import { verifyToken } from '../../middleware/auth.middleware';
// import validateRoutePermission from '../../middleware/role_access';
// import requireAuthentication from '../../middleware/token_verification';

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.use(requestLimiter);
router.get("/profile", verifyToken, hub.profileController.getProfileData);

router.post("/edit-profile", verifyToken, hub.profileController.patchProfile);

router.post(
  routes.login,
  hub.loginController.loginValidation,
  hub.loginController.login
);

router.post(
  routes.signup,
  hub.signupController.signupValidation,
  hub.signupController.signup
);
// profile 
// router.post(
//   routes.profile,
//   hub.profileController.patchProfileValidation,
//   hub.profileController.patchProfile
// );
// router.get(
//   routes.getProfile,
//  [],
//   hub.profileController.getProfileData
// );

// Note
router.get(
  routes.getNote,
 [],
  hub.noteController.getNote
);
router.post(
  routes.addNote,
  hub.noteController.addNoteValidation,
  hub.noteController.addNote
);
router.post(
  routes.updateNote,
  hub.noteController.patchNoteValidation,
  hub.noteController.patchNote
);
router.delete(
  routes.deleteNote,
  hub.noteController.deleteNoteValidation,
  hub.noteController.deleteNote
);
// Category
router.post(
  routes.addCategory,
  hub.categoryController.addCategoryValidation,
  hub.categoryController.addCategory
);
router.post(
  routes.updateCategory,
  hub.categoryController.patchCategoryValidation,
  hub.categoryController.patchCategory
);
router.delete(
  routes.deleteCategory,
  [],
  hub.categoryController.deleteCategory
);
router.get(
  routes.getCategory,
 [],
  hub.categoryController.getCategory
);

export default router;
