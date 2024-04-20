// TODO: Use envalid package for easy evnironment management.
export const getOrThrow = (key: string): string => {
  const value = process.env[key];

  if (!value) throw new Error(`Missing environment variable: ${key}`);

  return value;
};
