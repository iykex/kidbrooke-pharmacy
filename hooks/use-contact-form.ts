import { contactFormSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z4 from "zod/v4";
import { toast } from "sonner";
import { getTenantSlug } from "@/lib/config/tenant";
import { createContactMessage } from "@/lib/services/firestore/queries";
import { track } from "@/lib/analytics/tracker";
import { TRACKING_EVENTS } from "@/lib/constants/general";

export default function useContactForm() {
  const contactForm = useForm<z4.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      email: "",
      message: "",
      name: "",
      phone: "",
      subject: "",
    },
  });
  const { control, formState, handleSubmit, reset } = contactForm;
  async function onSubmit(data: z4.infer<typeof contactFormSchema>) {
    try {
      await createContactMessage({
        tenantId: getTenantSlug(),
        ...data,
      });
      track(TRACKING_EVENTS.contactFormSubmit, "contact form submitted");
      reset();
      toast.success("Your message has been sent to the pharmacy.");
    } catch {
      toast.error(
        "We could not send your message. Please call or email the pharmacy instead.",
      );
    }
  }

  return { control, formState, handleSubmit, reset, onSubmit };
}
