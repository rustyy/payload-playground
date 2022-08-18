import deepmerge from 'deepmerge';
import { Config } from 'payload/config';
import { configurableMiddleware, middleware } from './middleware';

interface PluginOptions {
  someOption: string;
}

export const pluginMiddleware =
  (opts: PluginOptions) =>
  (incomingConfig: Config): Config => {
    console.log('Plugin options', opts);

    // For (pre-/post)Middleware see:
    // https://github.com/payloadcms/payload/blob/5e66e3ee78447a0cc01defa767b846c408bb93ee/src/express/middleware/index.ts#L33

    const pluginConfig: Config = {
      express: {
        preMiddleware: [configurableMiddleware('Hello from pre-middleware')],
        // middleware is deprecated middleware will be removed in future versions of payload
        middleware: [middleware],
        postMiddleware: [configurableMiddleware('Hello from post-middleware')],
      },
    };

    return deepmerge(incomingConfig, pluginConfig);
  };
