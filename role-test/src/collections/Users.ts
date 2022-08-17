import { CollectionConfig } from 'payload/types';

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
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'User',
          value: 'user',
        },
        {
          label: 'Group A',
          value: 'a',
        },
        {
          label: 'Group B',
          value: 'b',
        },
      ],
      defaultValue: 'user',
    },
  ],
};

export default Users;
