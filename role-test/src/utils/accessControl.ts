import { isRole, Role } from './roles';

export const accessControl =
  (role: Role) =>
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

    return { createdBy: { equals: user.id } };
  };
