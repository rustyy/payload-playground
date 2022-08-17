import mongoose from 'mongoose';
import path from 'path';
import { buildConfig } from 'payload/config';
import { CollectionA } from './collections/CollectionA';
import { CollectionB } from './collections/CollectionB';
import Users from './collections/Users';

export default buildConfig({
  admin: {
    user: Users.slug,
    webpack: (config) => ({
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config?.resolve?.alias,
          fs: path.resolve(__dirname, 'emptyModule.js'),
        },
      },
    }),
  },
  serverURL: 'http://localhost:3000',

  collections: [Users, CollectionA, CollectionB],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  onInit: async (payload) => {
    await mongoose.connect(process.env.MONGODB_URI);

    payload.logger.info('---- DROPPING DATABASE ----');
    await mongoose.connection.dropDatabase();
    payload.logger.info('---- DROPPED DATABASE ----');

    // --------------------------------------------
    // Create demo users
    // --------------------------------------------

    await payload.create({
      collection: 'users',
      data: {
        email: 'admin@example.com',
        password: 'test',
        role: 'admin',
      },
    });

    await payload.create({
      collection: 'users',
      data: {
        email: 'a1@example.com',
        password: 'test',
        role: 'a',
      },
    });

    await payload.create({
      collection: 'users',
      data: {
        email: 'a2@example.com',
        password: 'test',
        role: 'a',
      },
    });

    await payload.create({
      collection: 'users',
      data: {
        email: 'b1@example.com',
        password: 'test',
        role: 'b',
      },
    });

    await payload.create({
      collection: 'users',
      data: {
        email: 'user@example.com',
        password: 'test',
        role: 'user',
      },
    });

    // --------------------------------------------
    // Create demo docs collection A
    // --------------------------------------------

    let result = await payload.find({
      collection: 'users',
      where: {
        email: {
          equals: 'a1@example.com',
        },
      },
    });

    let userId = result.docs[0].id;

    await payload.create({
      collection: 'collection-a',
      data: {
        createdBy: userId,
      },
    });

    result = await payload.find({
      collection: 'users',
      where: {
        email: {
          equals: 'a2@example.com',
        },
      },
    });

    userId = result.docs[0].id;

    await payload.create({
      collection: 'collection-a',
      data: {
        createdBy: userId,
      },
    });

    // --------------------------------------------
    // Create demo docs collection B
    // --------------------------------------------

    result = await payload.find({
      collection: 'users',
      where: {
        email: {
          equals: 'b1@example.com',
        },
      },
    });

    userId = result.docs[0].id;

    await payload.create({
      collection: 'collection-b',
      data: {
        createdBy: userId,
      },
    });
  },
});
