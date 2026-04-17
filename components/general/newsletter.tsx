"use client";
import { CheckCircle2, Send, Mail } from "lucide-react";
import { Field, FieldError, FieldGroup } from "../ui/field";
import { Input } from "../ui/input";
import { Controller } from "react-hook-form";
import useNewsletter from "@/hooks/use-newsletter";
import { Button } from "../ui/button";
import WidthConstraint from "../shared/width-constraint";
import { NEWSLETTER_FEATURE_ICONS } from "@/lib/utils/marketing-present";
import type { MarketingBlocksDoc } from "@/lib/types/firestore";
import { Spinner } from "../ui/spinner";

export default function NewsletterSection({
  marketing,
}: {
  marketing: MarketingBlocksDoc | null;
}) {
  const { isSubscribed, control, formState, handleSubmit, onSubmit } =
    useNewsletter();

  const featureRows = (marketing?.newsletterFeatures ?? []).map((f, i) => ({
    title: f.title,
    description: f.description,
    Icon: NEWSLETTER_FEATURE_ICONS[i % NEWSLETTER_FEATURE_ICONS.length]!,
  }));

  return (
    <section>
      <WidthConstraint>
        <div className="overflow-hidden">
          <div className="grid lg:grid-cols-2 rounded-2xl border border-input">
            {/* Left Column - Features  */}
            <div className="bg-[#003b5c] dark:bg-transparent p-8 lg:p-12 space-y-8 md:space-y-10 rounded-2xl lg:rounded-r-none">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2 bg-primary/20 rounded-lg">
                    <Mail className="size-5 text-primary" />
                  </div>
                  <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                    Newsletter
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 tracking-wide sm:tracking-normal sm:leading-tight">
                  Stay Healthy & Informed
                </h2>
                <p className="text-white/80 dark:text-white/70 leading-relaxed text-lg">
                  Join our wellness community and never miss important health
                  updates
                </p>
              </div>

              <div className="space-y-5">
                {featureRows.map((item) => {
                  const Icon = item.Icon;
                  return (
                    <div
                      key={item.title}
                      className="flex items-start gap-4 bg-white/10 dark:bg-white/5 rounded-xl p-5 group hover:bg-white/15 dark:hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="shrink-0 p-2.5 bg-primary/20 rounded-lg group-hover:scale-110 transition-transform duration-300">
                        <Icon className="size-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white mb-2 group-hover:text-primary/90 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-sm text-white/70 dark:text-white/60 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column - Form */}
            {isSubscribed ? (
              <div className="flex items-center justify-center p-8 lg:p-12 dark:bg-[#003b5c] rounded-2xl lg:rounded-l-none">
                <div className="text-center max-w-sm">
                  <div className="inline-block p-4 bg-green-100 dark:bg-green-900/30 rounded-full mb-6">
                    <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    Successfully Subscribed!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Thank you for joining our wellness community. Check your
                    inbox for a confirmation email.
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-8 lg:p-12 flex flex-col justify-center dark:bg-[#003b5c] rounded-2xl lg:rounded-l-none">
                <div className="max-w-md mx-auto w-full">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 text-center">
                    Subscribe to Our Newsletter
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-center mb-8">
                    Get the latest health tips and exclusive offers delivered
                    straight to your inbox.
                  </p>

                  <form id="email-form" onSubmit={handleSubmit(onSubmit)}>
                    <FieldGroup className="space-y-4">
                      <Controller
                        name="email"
                        control={control}
                        render={({ field, fieldState }) => (
                          <Field
                            data-invalid={fieldState.invalid}
                            className="gap-2"
                          >
                            <div className="flex shadow-md dark:border-2 rounded-2xl">
                              <Input
                                {...field}
                                id="email"
                                type="email"
                                aria-invalid={fieldState.invalid}
                                autoComplete="off"
                                placeholder="your.email@example.com"
                                className="flex-1  rounded-l-xl border-0 border-r-0 rounded-r-none dark:bg-[#002f4b] dark:text-white"
                                onKeyDown={(e) =>
                                  e.key === "Enter" && handleSubmit(onSubmit)
                                }
                              />
                              <Button
                                type="submit"
                                form="email-form"
                                disabled={
                                  formState.isLoading ||
                                  formState.isSubmitting ||
                                  !formState.isValid
                                }
                                className="px-6 rounded-r-xl rounded-l-none bg-primary hover:bg-primary/90 font-semibold text-white"
                              >
                                {formState.isSubmitting ? (
                                  <Spinner />
                                ) : (
                                  <>
                                    Subscribe <Send className="size-4 ml-2" />
                                  </>
                                )}
                              </Button>
                            </div>
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />
                    </FieldGroup>
                  </form>

                  {/* Trust Badges */}
                  <div className="mt-8 flex flex-wrap justify-center gap-5 text-sm">
                    {["No spam", "Unsubscribe anytime", "Weekly updates"].map(
                      (item) => (
                        <div
                          key={item}
                          className="flex items-center gap-2 px-3 py-2 bg-gray-50 dark:bg-[#002f4b] rounded-lg"
                        >
                          <CheckCircle2 className="w-4 h-4 text-green-500 dark:text-green-400" />
                          <span className="text-gray-700 dark:text-gray-300">
                            {item}
                          </span>
                        </div>
                      ),
                    )}
                  </div>

                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-6">
                    By subscribing, you agree to our Privacy Policy.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </WidthConstraint>
    </section>
  );
}
