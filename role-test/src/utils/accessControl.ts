export const accessControl =
  (role: 'a' | 'b') =>
  ({ req: { user } }) => {
    // no user, no access.
    if (!user) {
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
