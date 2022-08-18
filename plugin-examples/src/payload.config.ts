import path from 'path';
import { buildConfig } from 'payload/config';
import Examples from './collections/Examples';
import Users from './collections/Users';
import { pluginMiddleware } from './plugins/plugin-middleware';

export default buildConfig({
  serverURL: 'http://localhost:3000',
  admin: {
    user: Users.slug,
  },
  collections: [Users, Examples],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [pluginMiddleware({ someOption: 'hello' })],
});
