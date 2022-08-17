import { OptionObject } from 'payload/dist/fields/config/types';
import { CollectionConfig } from 'payload/types';
import { defaultRole, roles } from '../utils/roles';

const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  access: {
    // read: ({ req: { user } }) => user.role === 'admin',
  },
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name: 'role',
      type: 'select',
      required: true,
      options: roles as unknown as OptionObject[],
      defaultValue: defaultRole,
    },
  ],
};

export default Users;
