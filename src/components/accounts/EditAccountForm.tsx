"use client";

import { editAccountFormSchema as formSchema } from "@/lib/zod-schemas/accountFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../ui/input";
import SaveButton from "../SaveButton";
import { Button } from "../ui/button";
import { updateAccount } from "@/actions/account-actions";
import { getSubmitOnEnter } from "@/lib/utils/getSubmitOnEnter";
import { toast } from "sonner";
import { Switch } from "../ui/switch";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      accountName: accountName,
      balance: accountBalance,
      recordDifference: true,
    },
  });

  const { isSubmitting, isDirty, dirtyFields } = form.formState;

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!isDirty) {
      return;
    }

    const result = await updateAccount(accountId, data);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);

    closeDialog();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-5"
        onKeyDown={getSubmitOnEnter(form, onSubmit)}
      >
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
          <FormField
            control={form.control}
            name="recordDifference"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Record Difference</FormLabel>
                  <FormDescription>
                    Record a new transaction when the balance changes.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={!dirtyFields.balance}
                  />
                </FormControl>
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
