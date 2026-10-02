export const passwordRequirements =
  "Use de 8 a 128 caracteres, incluindo uma letra maiúscula, uma minúscula, um número e um caractere especial.";

export function isValidPassword(password: string) {
  return password.length >= 8 &&
    password.length <= 128 &&
    /\p{Lu}/u.test(password) &&
    /\p{Ll}/u.test(password) &&
    /\p{N}/u.test(password) &&
    /[^\p{L}\p{N}\s]/u.test(password);
}
