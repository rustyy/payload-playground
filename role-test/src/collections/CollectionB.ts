import { CollectionConfig } from 'payload/types';
import { accessControl } from '../utils/accessControl';
import { addCreatedBy } from '../utils/addCreatedBy';

export const CollectionB: CollectionConfig = {
  slug: 'collection-b',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: accessControl('b'),
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
