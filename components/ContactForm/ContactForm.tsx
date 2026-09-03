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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";

import { type ContactFormValues, createFormSchema } from "./formSchema";
import { contact } from "@/data";

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

  function onSubmit(data: ContactFormValues) {
    console.log(data);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-4xl dash mb-8">
          <h2>{dictionary.title}</h2>
        </CardTitle>
        <CardDescription>placeholder</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <div className="flex flex-col mb-6">
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

          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
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
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="projectType"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      {dictionary.projectType.label}
                    </FieldLabel>

                    <Select
                      name={field.name}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                      >
                        <SelectValue
                          placeholder={dictionary.projectType.placeholder}
                        />
                      </SelectTrigger>

                      <SelectContent>
                        {Object.entries(dictionary.projectType.options).map(
                          ([value, label]) => (
                            <SelectItem key={value} value={value}>
                              {label}
                            </SelectItem>
                          ),
                        )}
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
                      name={field.name}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                      >
                        <SelectValue
                          placeholder={
                            dictionary.approximateInvestment.placeholder
                          }
                        />
                      </SelectTrigger>

                      <SelectContent>
                        {Object.entries(
                          dictionary.approximateInvestment.options,
                        ).map(([value, label]) => (
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
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Button type="submit" disabled={form.formState.isSubmitting}>
                {dictionary.submit}
              </Button>
            </FieldGroup>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
