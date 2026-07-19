"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import useContactForm from "@/hooks/use-contact-form";
import { CONTACT_FORM_FIELD_ITEMS } from "@/lib/constants/general";
import { Controller } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import EmergencyContact from "./emergency-contact";

export function ContactForm() {
  const { control, formState, handleSubmit, onSubmit } = useContactForm();
  return (
    <div className="space-y-5 z-10">
      <Card className="w-full max-w-6xl h-fit border-0 shadow-lg">
        <CardHeader className="space-y-2">
          <CardTitle className="text-card-title">Send Us a Message</CardTitle>
          <CardDescription className="text-card-[20px]">
            Fill out the form below and we&apos;ll get back to you as soon as
            possible
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="contact-form" onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <div className="grid sm:grid-cols-2 gap-4">
                {CONTACT_FORM_FIELD_ITEMS.map((item) => {
                  const { label, name, placeholder } = item;
                  return (
                    <Controller
                      key={name}
                      name={name}
                      control={control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={`contact-form-${name}`}>
                            {label}
                          </FieldLabel>
                          <Input
                            {...field}
                            id={`contact-form-${name}`}
                            aria-invalid={fieldState.invalid}
                            placeholder={placeholder}
                            autoComplete="off"
                            className="placeholder:text-muted-foreground/60"
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  );
                })}
              </div>
              <Controller
                name="message"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="contact-form-message">
                      Message
                    </FieldLabel>
                    <Textarea
                      {...field}
                      id="contact-form-message"
                      placeholder="Please provide details about your inquiry"
                      rows={6}
                      className="min-h-24 placeholder:text-muted-foreground/60"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Field orientation="horizontal">
            <Button
              type="submit"
              form="contact-form"
              disabled={
                !formState.isValid ||
                formState.isSubmitting
              }
              className="ml-auto"
            >
              {formState.isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </Field>
        </CardFooter>
      </Card>
      <EmergencyContact />
    </div>
  );
}
