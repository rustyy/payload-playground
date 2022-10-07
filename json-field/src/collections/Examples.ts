import { CollectionConfig, FieldHook } from 'payload/types';

const afterRead: FieldHook = (args) => {
  console.log(args.req);

  return args.value;
};

// Example Collection - For reference only, this must be added to payload.config.ts to be used.
const Examples: CollectionConfig = {
  slug: 'examples',
  admin: {
    useAsTitle: 'someField',
  },
  fields: [
    {
      name: 'someField',
      type: 'text',
    },
    {
      name: 'json',
      type: 'code',
      admin: {
        language: 'json',
      },
      validate: (value) => {
        try {
          JSON.parse(value);
          return true;
        } catch (e) {
          return 'Invalid JSON';
        }
      },
      hooks: {
        afterRead: [afterRead],
      },
    },
  ],
};

export default Examples;
