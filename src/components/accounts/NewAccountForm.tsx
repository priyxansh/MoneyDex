"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { accountFormSchema as formSchema } from "@/lib/zod-schemas/accountFormSchema";
import { createAccount } from "@/actions/account-actions";
import CreateAccountButton from "./CreateAccountButton";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";

type NewAccountFormProps = {};

const NewAccountForm = ({}: NewAccountFormProps) => {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      accountName: "",
      balance: 0,
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const result = await createAccount(data);

    if (result?.error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.error.message,
      });
      return;
    }

    router.push("/accounts");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <FormField
            control={form.control}
            name="accountName"
            render={({ field }) => (
              <FormItem className="w-full max-w-[350px]">
                <FormLabel>Account Name</FormLabel>
                <FormControl>
                  <Input placeholder="Account Name" {...field} />
                </FormControl>
                <FormDescription>
                  This is your account&apos;s display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="balance"
            render={({ field }) => (
              <FormItem className="w-full max-w-[350px]">
                <FormLabel>Account Balance</FormLabel>
                <FormControl>
                  <Input placeholder="0" {...field} />
                </FormControl>
                <FormDescription>
                  This is your account&apos;s initial balance.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="w-full flex gap-2 mt-4 justify-center sm:justify-start">
          <CreateAccountButton pending={form.formState.isSubmitting} />
        </div>
      </form>
    </Form>
  );
};

export default NewAccountForm;
