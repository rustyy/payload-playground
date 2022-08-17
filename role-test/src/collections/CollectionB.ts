import { CollectionConfig } from 'payload/types';
import { accessControl } from '../utils/accessControl';

export const CollectionB: CollectionConfig = {
  slug: 'collection-b',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: accessControl('b'),
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
