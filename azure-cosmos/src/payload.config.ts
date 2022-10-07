import path from 'path';
import { buildConfig, SanitizedConfig } from 'payload/config';
import sortableFieldTypes from 'payload/dist/fields/sortableFieldTypes';

import Users from './collections/Users';

const config = buildConfig({
  // serverURL: "http://localhost:8080",
  admin: {
    user: Users.slug,
  },
  collections: [Users],
  // @see https://payloadcms.com/docs/configuration/overview
  // No longer implemented
  //indexSortableFields: true,
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
});

const withCosmosDbSettings = (config: SanitizedConfig) => {
  config.collections = config.collections.map((collection) => {
    // Sortable fields need to be indexed in cosmos-db to work properly.
    // Therefore, set "index"-prop to true.
    const indexedFields = collection.fields.map((field) => {
      return sortableFieldTypes.includes(field.type)
        ? { ...field, index: true }
        : field;
    });

    // Workaround: If "timestamps" is set to true,
    // createdAt and updatedAt fields are created but w/o index set to true.
    // So we need to add them upfront.
    if (collection.timestamps || collection.slug === 'users') {
      indexedFields.push(
        {
          name: 'createdAt',
          type: 'date',
          index: true,
          admin: {
            disabled: true,
            readOnly: true,
          },
        },
        {
          name: 'updatedAt',
          type: 'date',
          index: true,
          admin: {
            disabled: true,
            readOnly: true,
          },
        }
      );
    }

    collection.fields = indexedFields;

    return collection;
  });

  return config;
};

export default withCosmosDbSettings(config);
