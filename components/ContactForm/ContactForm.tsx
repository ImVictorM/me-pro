"use client";

import { Controller, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import type { ContactFormDictionary } from "@/app/[lang]/dictionaries";

import { Button } from "@/components/ui/button";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";

import {
  type ContactFormValues,
  createFormSchema,
  PROJECT_DETAILS_MAX_LENGTH,
} from "./formSchema";
import { contact } from "@/data";
import GitHubIcon from "@/assets/icons/GitHubIcon";
import LinkedInIcon from "@/assets/icons/LinkedInIcon";
import { ArrowUpRight } from "lucide-react";
import { createWhatsAppMessage, createWhatsAppUrl } from "./whatsApp";

type ContactFormProps = {
  dictionary: ContactFormDictionary;
};

export default function ContactForm({ dictionary }: ContactFormProps) {
  const schema = createFormSchema(dictionary);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullname: "",
      email: "",
      projectDetails: "",
    },
  });

  const projectTypeItems = Object.entries(dictionary.projectType.options).map(
    ([value, label]) => ({
      value,
      label,
    }),
  );

  const investmentItems = Object.entries(
    dictionary.approximateInvestment.options,
  ).map(([value, label]) => ({
    value,
    label,
  }));

  function onSubmit(data: ContactFormValues) {
    const message = createWhatsAppMessage(data, dictionary);

    const whatsappUrl = createWhatsAppUrl(contact.phone.whatsapp, message);

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <Card className="w-full max-w-layout">
      <CardContent className="grid gap-10 p-6 md:p-8 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:p-12">
        <div className="lg:col-start-1 lg:row-start-1">
          <h2 className="text-4xl font-bold dash mb-8 ">{dictionary.title}</h2>

          <p className="max-w-lg text-lg text-muted-foreground leading-relaxed">
            {dictionary.description}
          </p>

          <p className="inline-flex items-center gap-2 text-primary mt-8 font-mono">
            <span className="relative flex size-2">
              <span className="hidden animate-ping absolute  size-full rounded-full bg-primary opacity-60 motion-safe:inline-flex" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            {dictionary.availability}
          </p>
        </div>

        <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <div className="flex flex-col lg:flex-row gap-4">
                <Controller
                  name="fullname"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>{dictionary.fullname.label}</FieldLabel>

                      <Input
                        {...field}
                        id={field.name}
                        autoComplete="name"
                        placeholder={dictionary.fullname.placeholder}
                        aria-label={dictionary.fullname.placeholder}
                        aria-invalid={fieldState.invalid}
                        size="lg"
                      />

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>
                        {dictionary.email.label}
                      </FieldLabel>

                      <Input
                        {...field}
                        id={field.name}
                        type="email"
                        autoComplete="email"
                        placeholder={dictionary.email.placeholder}
                        aria-invalid={fieldState.invalid}
                        size="lg"
                      />

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
              <Controller
                name="projectType"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      {dictionary.projectType.label}
                    </FieldLabel>

                    <Select
                      items={projectTypeItems}
                      name={field.name}
                      value={field.value ?? null}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        size="lg"
                      >
                        <SelectValue
                          placeholder={dictionary.projectType.placeholder}
                        />
                      </SelectTrigger>

                      <SelectContent>
                        {projectTypeItems.map(({ value, label }) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="approximateInvestment"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      {dictionary.approximateInvestment.label}
                    </FieldLabel>

                    <Select
                      items={investmentItems}
                      name={field.name}
                      value={field.value ?? null}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        size="lg"
                      >
                        <SelectValue
                          placeholder={
                            dictionary.approximateInvestment.placeholder
                          }
                        />
                      </SelectTrigger>

                      <SelectContent>
                        {investmentItems.map(({ value, label }) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="projectDetails"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      {dictionary.projectDetails.label}
                    </FieldLabel>

                    <Textarea
                      {...field}
                      id={field.name}
                      rows={6}
                      placeholder={dictionary.projectDetails.placeholder}
                      aria-invalid={fieldState.invalid}
                      className="max-h-40 overflow-y-auto scrollbar-none"
                      maxLength={PROJECT_DETAILS_MAX_LENGTH}
                    />

                    <div className="flex items-center justify-between gap-4">
                      <div>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </div>

                      <span className="shrink-0 text-xs text-muted-foreground">
                        {field.value.length}/{PROJECT_DETAILS_MAX_LENGTH}
                      </span>
                    </div>
                  </Field>
                )}
              />

              <Button
                size="lg"
                type="submit"
                disabled={form.formState.isSubmitting}
              >
                {dictionary.submit} {<ArrowUpRight />}
              </Button>
            </FieldGroup>
          </form>
        </div>

        <div className="lg:col-start-1 lg:row-start-2 lg:self-end mt-10 lg:mt-0">
          <div className="flex flex-col mb-6 gap-1">
            <span className="text-muted-foreground">
              {dictionary.data.email}:{" "}
              {<span className="text-foreground">{contact.email}</span>}
            </span>

            <span className="text-muted-foreground">
              {dictionary.data.phone}:{" "}
              {<span className="text-foreground">{contact.phone.display}</span>}
            </span>

            <span className="text-muted-foreground">
              {dictionary.data.location}:{" "}
              {
                <span className="text-foreground">
                  {dictionary.data.country}
                </span>
              }
            </span>
          </div>

          <nav className="flex flex-row gap-3">
            <a
              className="w-12 h-12 rounded-md border flex items-center justify-center bg-card hover:bg-primary hover:text-primary-foreground transition-all"
              href={contact.social.linkedIn}
              target="_blank"
            >
              <LinkedInIcon className="size-5" />
            </a>

            <a
              className="w-12 h-12 rounded-md border flex items-center justify-center bg-card hover:bg-primary hover:text-primary-foreground transition-all"
              href={contact.social.github}
              target="_blank"
            >
              <GitHubIcon className="size-5" />
            </a>
          </nav>
        </div>
      </CardContent>
    </Card>
  );
}
