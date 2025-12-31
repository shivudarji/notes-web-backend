
import RoleSlug from "../utils/enum/role_slug";
import routes from "./routes"
const commonRoute: string[] = [
  //developer Only access
//   route.routeSync,

  //Auth
//   route.getRole,
//   route.login,
//   route.verifyOTP,
//   route.resendOTP,
]
const adminRoute: string[] = [
  //developer Only access
//   route.routeSync,

  //Auth
//   route.getRole,
//   route.login,
//   route.verifyOTP,
//   route.resendOTP,
]
const companyRoute: string[] = [
  //developer Only access
//   route.routeSync,

  //Auth
//   route.getRole,
//   route.login,
//   route.verifyOTP,
//   route.resendOTP,
]

const validRoutes: {} = {
  [RoleSlug.Admin]: [...commonRoute, ...adminRoute],
  [RoleSlug.Company]: [...commonRoute, ...companyRoute],
};

export default validRoutes;
