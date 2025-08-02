export const getEnvVar = (name) => {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Env var with name ${name} is not set`);
  }
  return value;
};
