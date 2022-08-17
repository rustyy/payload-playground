import { CollectionConfig } from 'payload/types';

export const CollectionA: CollectionConfig = {
  slug: 'collection-a',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: ({ req: { user } }) => ['admin', 'a'].includes(user.role),
  },
  hooks: {
    beforeChange: [
      ({ req, operation, data }) => {
        if (operation === 'create' && req.user) {
          data.createdBy = req.user.id;
        }
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Some text',
    },
    {
      name: 'createdBy',
      type: 'relationship',
      relationTo: 'users',
      access: {
        // @ts-ignore
        read: ({ req: { user } }) => {
          if (!user) {
            return false;
          }

          if (user.role === 'admin') {
            return true;
          }

          return { createdBy: { equals: user.id } };
        },
        update: () => false,
      },
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
  ],
};
