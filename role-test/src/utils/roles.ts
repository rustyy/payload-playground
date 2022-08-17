type RoleConfigs = typeof roles[number];
// role property -> 'value'.
type RoleConfigValueProperty = keyof Pick<RoleConfigs, 'value'>;
// union type of all machine-readable role names.
export type Role = RoleConfigs[RoleConfigValueProperty];

export const roles = [
  {
    label: 'Admin',
    value: 'admin',
  },
  {
    label: 'User',
    value: 'user',
  },
  {
    label: 'Group A',
    value: 'a',
  },
  {
    label: 'Group B',
    value: 'b',
  },
] as const;

export const defaultRole: 'user' = roles[1].value;

export const isRole = (x: unknown): x is Role => {
  return typeof x === 'string' && roles.map((a) => a.value).includes(x as Role);
};
