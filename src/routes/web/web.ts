import express, { Request, Response } from 'express';
import { response } from '../../common/response';
import validRoutes from '../../constants/allowed_routes';
import route from '../../constants/routes';
import { Role } from '../../models/role';
import RoleSlug from '../../utils/enum/role_slug';
import { readJsonFile } from '../../utils/helper/file_helper';
import { cleanObject } from '../../utils/helper/object_helper';
import t from '../../lang/language';
//import { FieldMaster } from '../../models/field_master';

const router = express.Router();

router.get(route.home, [], async (req: Request, res: Response) => {
  res.send('<h1>Something cool is coming soon 😍🏫🏆</h1>');
});

/*router.get(route.createAdminAccount, [], async (req: Request, res: Response) => {
  const getRole = await Role.findOne({slug: "admin"});
  if(!getRole)
  {
    throw throwError("error in role");
  }

  const userModel = new User({
    first_name: "Super",
    last_name: "Admin",
    email: "admin@yopmail.com",
    password: "Silverxis@123",
    role:[getRole._id]
  });

  let resultUser = await userModel.save();

  const userSettingsModel = new UserSetting({
    user:resultUser._id,
  });
  await userSettingsModel.save();

  return res.json(response(true,"Admin Account Created Successfully",{user:resultUser}))
  
});*/

/*router.get(route.updateField, [], async (req: Request, res: Response) => {
  try {
    // Delete old collections
    await Promise.all([
      ModuleMaster.collection.drop().catch(e => console.log('ModuleMaster collection drop skipped')),
      FieldGroup.collection.drop().catch(e => console.log('FieldGroup collection drop skipped')),
      FieldMaster.collection.drop().catch(e => console.log('FieldMaster collection drop skipped'))
    ]);

    // Read and parse the JSON file
    const data = fs.readFileSync('src/utils/field_master.json', 'utf8');
    const jsonData = JSON.parse(data);
    
    // Insert new data
    for (const module of jsonData) {
      const newModule = new ModuleMaster({
        name: module.name,
        slug: module.slug,
      });
      const savedModule = await newModule.save();


      for (const group of module.group) {
        const newFieldGroup = new FieldGroup({
          module_master: savedModule._id,
          name: group.name,
          slug: group.slug,
          sort_order: group.sort_order
        });
        const savedFieldGroup = await newFieldGroup.save();


        for (const element of group.element) {

          // Convert empty string to null for ref_method
          if (element.ref_method === "") {
            element.ref_method = null;
          }

          const newFieldMaster = new FieldMaster({
            module_master: savedModule._id,
            field_group: savedFieldGroup._id,
            ...element,
            status: element.status,
          });
          await newFieldMaster.save();
        } //field loop
      } //group loop
    } //module loop

    res.send('Data successfully inserted');
  } catch (error) {
    console.error('Error updating field data:', error);
    res.status(500).send('Error updating field data');
  }
});*/

/*router.get(route.emptyDB,[],async (req: Request, res: Response) => {
  const collectionsToDrop = [
    'branch', 'calendar', 'candidate', 'candidate_status', 'candidate_status_history', 
    'candidate_submission', 'candidate_submission_history', 'candidate_timeline', 'city', 
    'client', 'company', 'create_password_request', 'currency', 'department', 'document_type', 
    'employee', 'employee_type', 'field_group', 'field_master', 'interview', 'interview_level', 
    'interview_status', 'job_opening', 'job_opening_attachment', 'job_opening_attachment_category', 
    'job_opening_status', 'job_title', 'leave_request', 'leave_status', 'leave_type', 'module_master', 
    'notes', 'openai_log', 'otp_master', 'pay_type', 'pincode', 'reference', 'reminder', 
    'reset_password_request', 'shift', 'skill', 'source_booster', 'source_booster_interaction_history', 
    'sr_no_master', 'state', 'task', 'user_device', 'visa_type'
  ];

  for (const collectionName of collectionsToDrop) {
    try {
      await mongoose.connection.db.dropCollection(collectionName);
      console.log(`Collection ${collectionName} dropped`);
    } catch (err : any) {
      if (err.code === 26) {
        console.log(`Collection ${collectionName} does not exist`);
      } else {
        console.error(`Error dropping collection ${collectionName}:`, err);
      }
    }
  }
});*/

router.get(route.routeSync, [], async (req: Request, res: Response) => {
  const result = await Promise.all(
    Object.keys(validRoutes).map(async (key) => {
      const resultroles = await Role.findOneAndUpdate(
        { slug: key },
        { permissions: (validRoutes as any)[key] },
        { new: true }
      );

      if (key == RoleSlug.Company) {
        let apiPermission = await Role.find({
          company: { $ne: null } as any,
          is_system_role: false,
        });
        await Role.updateMany(
          {
            _id: { $in: apiPermission.map((role) => role._id) },
          },
          {
            permissions: (validRoutes as any)[key],
          }
        );
      }

      return resultroles;
    })
  );

  if (!result) {
    return res.json(response(true, t('technical_issue')));
  }

  result.map((e: any) => cleanObject(e._doc, true, true));
  return res.json(response(true, t('success'), result));
});

function extractSlugs(permission: any, slugs: any = []) {
  slugs.push(permission.slug);
  if (permission.child && permission.child.length > 0) {
    permission.child.forEach((child: any) => extractSlugs(child, slugs));
  }
  return slugs;
}

// function extractSlugs(permission: any, slugs: any = {}) {
//   permission.service.forEach((service: string) => {
//     if (!slugs[service]) {
//       slugs[service] = [];
//     }
//     slugs[service].push(permission.slug);
//   });

//   if (permission.child && permission.child.length > 0) {
//     permission.child.forEach((child: any) => extractSlugs(child, slugs));
//   }

//   return slugs;
// }

router.get(route.permissionSync, [], async (req: Request, res: Response) => {
  let files = [
    {
      file: 'src/utils/json/admin_permission.json',
      role: 'admin',
    },
    {
      file: 'src/utils/json/company_permission.json',
      role: 'company',
    },
  ];

  try {
    for (const item of files) {
      const permissionsData = await readJsonFile(item.file);

      // let allSlugs: any = {};

      // permissionsData.forEach((permission: any) => {
      //   allSlugs = extractSlugs(permission, allSlugs);
      // });

      // const rolePermissions = Object.keys(allSlugs).map(service => ({
      //   service,
      //   permission: allSlugs[service]
      // }));

      let allSlugs: any = [];
      permissionsData.forEach((permission: any) => {
        allSlugs = [...allSlugs, ...extractSlugs(permission)];
      });

      // Update the role with new permissions
      await Role.findOneAndUpdate(
        { slug: item.role }, // Filter by role slug
        { role_permissions: allSlugs }, // Set new permissions
        { new: true } // Options to return the updated document
      );
      // console.log('Permission for ',item.role,' : ',allSlugs);
    }

    res.status(200).send('Permissions synchronized successfully.');
  } catch (error) {
    console.error('Error synchronizing permissions:', error);
    res.status(500).send('Failed to synchronize permissions.');
  }
});

/*router.get('/data-entry', [], async (req: Request, res: Response) => {
  fs.readFile('src/utils/industry.json', 'utf8', async (err, data) => {
    if (err) {
      console.error('Error reading the file:', err);
      return res.status(500).send('Error reading the file');
    }
    try {
      const jsonData = JSON.parse(data);
      const transformedData = jsonData.map((item: any) => ({
        name: item.name
      }));
      
      await Industry.insertMany(transformedData);
      res.send('Data inserted successfully');
    } catch (error) {
      console.error('Error inserting data:', error);
      res.status(500).send('Error inserting data');
    }
  });
});*/

export default router;
