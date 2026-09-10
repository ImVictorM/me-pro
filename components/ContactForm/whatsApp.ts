import type { ContactFormDictionary } from "@/app/[lang]/dictionaries";
import type { ContactFormValues } from "./formSchema";

export function createWhatsAppMessage(
  data: ContactFormValues,
  dictionary: ContactFormDictionary,
) {
  const projectType = dictionary.projectType.options[data.projectType];
  const approximateInvestment =
    dictionary.approximateInvestment.options[data.approximateInvestment];

  return (
    `${dictionary.whatsapp.intro}.\n\n` +
    `*${dictionary.fullname.label}*\n${data.fullname}\n\n` +
    `*${dictionary.email.label}*\n${data.email}\n\n` +
    `*${dictionary.projectType.label}*\n${projectType}\n\n` +
    `*${dictionary.approximateInvestment.label}*\n${approximateInvestment}\n\n` +
    `*${dictionary.projectDetails.label}*\n${data.projectDetails}`
  );
}

export function createWhatsAppUrl(phone: string, message: string) {
  const params = new URLSearchParams({ text: message });

  return `https://wa.me/${phone}?${params.toString()}`;
}
