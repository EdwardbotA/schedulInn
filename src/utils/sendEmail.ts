import emailjs from "@emailjs/browser";

const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

interface IEmailData {
  email: string;
  from_name: string;
  nombre: string;
  hotel: string;
  fechaEntrada: string;
  fechaSalida: string;
  [key: string]: unknown;
}

export const sendConfirmationEmail = async (
  email: string,
  data: IEmailData
) => {
  try {
    await emailjs.send(SERVICE_ID, TEMPLATE_ID, data, PUBLIC_KEY);

    console.log(`correo enviado con exito a ${email}`);
  } catch (error) {
    console.error("error al enviar correo", error);
  }
};
