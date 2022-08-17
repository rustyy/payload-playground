import { CollectionConfig } from 'payload/types';
import { accessControl } from '../utils/accessControl';
import { addCreatedBy } from '../utils/addCreatedBy';

export const CollectionA: CollectionConfig = {
  slug: 'collection-a',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: accessControl('a'),
  },
  hooks: {
    beforeChange: [addCreatedBy],
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
