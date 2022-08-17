import { CollectionConfig } from 'payload/types';
import { accessControl } from '../utils/accessControl';

export const CollectionA: CollectionConfig = {
  slug: 'collection-a',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: accessControl('a'),
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
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
  ],
};
