"use client";
import { db } from "@/lib/firebase/firebase-client";
import { newsletterSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FirebaseError } from "firebase/app";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z4 from "zod/v4";

export default function useNewsletter() {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const { handleSubmit, control, formState, reset } = useForm<
    z4.infer<typeof newsletterSchema>
  >({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  });

  async function onSubmit(data: z4.infer<typeof newsletterSchema>) {
    try {
      await addDoc(
        collection(db, "tenants", "kidbrooke", "newsletter_subscribers"),
        {
          email: data.email.toLowerCase().trim(),
          date: serverTimestamp(),
        },
      );
      setIsSubscribed(true);
      toast.success("Successfully subscribed to newsletter");
      reset();
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === "permission-denied") {
          toast.error("This email is already subscribed!");
        } else {
          toast.error("Subscription failed. Please try again.");
        }
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  }

  return {
    isSubscribed,
    setIsSubscribed,
    handleSubmit,
    control,
    formState,
    onSubmit,
  };
}
