"use client";

import { accountFormSchema } from "@/lib/zod-schemas/accountFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import SaveButton from "../SaveButton";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { updateAccount } from "@/actions/account-actions";

type EditAccountFormProps = {
  accountId: string;
  accountName: string;
  accountBalance: number;
  closeDialog: () => void;
};

const EditAccountForm = ({
  accountId,
  accountName,
  accountBalance,
  closeDialog,
}: EditAccountFormProps) => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof accountFormSchema>>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      accountName: accountName,
      balance: accountBalance,
    },
  });

  const { isSubmitting, isDirty } = form.formState;

  const onSubmit = async (data: z.infer<typeof accountFormSchema>) => {
    const result = await updateAccount(accountId, data);

    if (result?.error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.error.message,
      });
      return;
    }

    closeDialog();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5">
        <div className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="accountName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Account Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Account Name"
                    {...field}
                    autoComplete="off"
                    autoFocus
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="balance"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Account Balance</FormLabel>
                <FormControl>
                  <Input placeholder="0" {...field} autoComplete="off" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="w-full flex gap-4 mt-4 justify-end">
          <Button variant="secondary" onClick={closeDialog}>
            Cancel
          </Button>
          <SaveButton isSubmitting={isSubmitting} isDirty={isDirty} />
        </div>
      </form>
    </Form>
  );
};

export default EditAccountForm;
