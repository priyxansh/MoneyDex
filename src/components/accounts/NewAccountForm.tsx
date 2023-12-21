"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
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

type NewAccountFormProps = {};

const formSchema = z.object({
  accountName: z.string().min(1).max(50),
  balance: z.coerce
    .number({ invalid_type_error: "Balance must be a number." })
    .min(-1000000000)
    .max(1000000000)
    .transform((value) => {
      return +value;
    }),
});

const NewAccountForm = ({}: NewAccountFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      accountName: "",
      balance: 0,
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
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
                  This is your account's display name.
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
                  This is your account's initial balance.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="w-full flex gap-2 mt-4 justify-center sm:justify-start">
          <Button type="submit" className="w-full sm:w-auto max-w-[300px]">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default NewAccountForm;
