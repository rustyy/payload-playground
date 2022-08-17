import { Access } from 'payload/config';
import { isRole, Role } from './roles';

/**
 * Access control handler
 *
 * Grants access if the requesting user has the required role assigned
 * and is creator of an entity.
 */
export const accessControl =
  (role: Role): Access =>
  ({ req: { user } }) => {
    // no user, no access or unsupported role provided.
    if (!user || !isRole(role)) {
      return false;
    }

    // Grant access for admin users.
    if (user.role === 'admin') {
      return true;
    }

    // Scope collection to a specific role.
    if (user.role !== role) {
      return false;
    }

    // Query createdBy-field
    // @link https://payloadcms.com/blog/build-your-own-rbac
    return { createdBy: { equals: user.id } };
  };
