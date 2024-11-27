export function validateEnvVariable(variable: string, name: string): string {
  if (!variable) {
    throw new Error(
      `Environment variable "${name}" is required but was not provided.`
    );
  }
  return variable;
}
