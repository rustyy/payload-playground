export const accessControl =
  (role: 'a' | 'b') =>
  ({ req: { user } }) => {
    if (!user) {
      return false;
    }

    if (user.role === 'admin') {
      return true;
    }

    if (user.role !== role) {
      return false;
    }

    return { createdBy: { equals: user.id } };
  };
