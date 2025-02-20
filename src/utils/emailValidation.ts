export function emailValidation(value: string) {
  const emailFormat = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailFormat.test(value)) {
    return "Correo electrónico inválido";
  }

  return true;
}
