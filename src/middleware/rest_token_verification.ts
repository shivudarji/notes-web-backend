// import { Request, Response } from 'express';
// import { response } from '../common/response';
// import { UnAuthorized, InternalServerError } from '../common/status';
// import t from '../lang/language';
// // import { Company } from '../models/company';
// // import { DeveloperAPIKey } from '../models/developer_api_key';
// // import { getClientIp } from '../utils/helper/project_helper';

// const requireRestAuthentication = async (
//   req: Request,
//   res: Response,
//   next: any
// ) => {
//   try {
//     let headers = req.headers;

//     if (headers.authorization == null || headers.authorization == undefined) {
//       return res.status(UnAuthorized).json(response(false, t('unauthorized')));
//     }

//     const token = headers.authorization.split('Bearer ')[1];

//     if (token == null) {
//       return res.status(UnAuthorized).json(response(false, t('unauthorized')));
//     }

//     //find developer API Key
//     const keyInfo = await DeveloperAPIKey.findOne({
//       api_key: token,
//     });

//     if (!keyInfo) {
//       return res.status(UnAuthorized).json(response(false, t('unauthorized')));
//     }

//     // const clientIP = getClientIp(req);

//     console.info(`${process.env.ENV} clientIP`, clientIP);

//     if (keyInfo.white_list_ip && keyInfo.white_list_ip.length > 0) {
//       if (!keyInfo.white_list_ip.includes(clientIP)) {
//         return res
//           .status(UnAuthorized)
//           .json(response(false, t('unauthorized')));
//       }
//     }

//     req.body.loginCompany = await Company.findById(keyInfo.company);

//     next();
//   } catch (e: any) {
//     return res.status(InternalServerError).json(response(false, e.msg));
//   }
// };

// export default requireRestAuthentication;
