"use client";

import { ContactFormDictionary } from "@/app/[lang]/dictionaries";
import { interpolate } from "@/localization";
import * as z from "zod";

const FULLNAME_MIN_LENGTH = 3;
const FULLNAME_MAX_LENGTH = 40;

const PROJECT_DETAILS_MIN_LENGTH = 10;
const PROJECT_DETAILS_MAX_LENGTH = 1000;

export type ProjectType = keyof ContactFormDictionary["projectType"]["options"];

export type ApproximateInvestment =
  keyof ContactFormDictionary["approximateInvestment"]["options"];

export function createFormSchema(dictionary: ContactFormDictionary) {
  const projectTypes = Object.keys(dictionary.projectType.options) as [
    ProjectType,
    ...ProjectType[],
  ];

  const approximateInvestments = Object.keys(
    dictionary.approximateInvestment.options,
  ) as [ApproximateInvestment, ...ApproximateInvestment[]];

  return z.object({
    fullname: z
      .string()
      .trim()
      .min(FULLNAME_MIN_LENGTH, {
        error: interpolate(dictionary.fullname.minError, {
          min: FULLNAME_MIN_LENGTH,
        }),
      })
      .max(FULLNAME_MAX_LENGTH, {
        error: interpolate(dictionary.fullname.maxError, {
          max: FULLNAME_MAX_LENGTH,
        }),
      }),

    email: z.email({
      error: dictionary.email.invalidError,
    }),

    projectType: z.enum(projectTypes, {
      error: dictionary.projectType.placeholder,
    }),

    approximateInvestment: z.enum(approximateInvestments, {
      error: dictionary.approximateInvestment.placeholder,
    }),

    projectDetails: z
      .string()
      .trim()
      .min(PROJECT_DETAILS_MIN_LENGTH, {
        error: interpolate(dictionary.projectDetails.minError, {
          min: PROJECT_DETAILS_MIN_LENGTH,
        }),
      })
      .max(PROJECT_DETAILS_MAX_LENGTH, {
        error: interpolate(dictionary.projectDetails.maxError, {
          max: PROJECT_DETAILS_MAX_LENGTH,
        }),
      }),
  });
}

export type ContactFormValues = z.infer<ReturnType<typeof createFormSchema>>;
