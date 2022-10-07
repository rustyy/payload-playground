import { Access } from 'payload/config';
import { isRole, Role } from './roles';

/**
 * Access control handler
 *
 * Grants access if the requesting user has the required role assigned
 * and is creator of an entity.
 */
export const accessControl =
  (...roles: Role[]): Access =>
  ({ req: { user } }) => {
    const currentUserRole = user.role;

    // no user or role, no access.
    if (!user || !user.role) {
      return false;
    }

    if (isRole(currentUserRole)) {
      // Grant access for admin users.
      if (currentUserRole === 'admin') {
        return true;
      }

      // Scope collection to specific roles.
      if (!roles.includes(currentUserRole)) {
        return false;
      }
    } else {
      // Unsupported role provided by user object.
      return false;
    }

    // Query createdBy-field
    // @link https://payloadcms.com/blog/build-your-own-rbac
    return { createdBy: { equals: user.id } };
  };
