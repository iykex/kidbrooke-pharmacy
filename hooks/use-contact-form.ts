import { contactFormSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z4 from "zod/v4";

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
  function onSubmit(_data: z4.infer<typeof contactFormSchema>) {}

  return { control, formState, handleSubmit, reset, onSubmit };
}
