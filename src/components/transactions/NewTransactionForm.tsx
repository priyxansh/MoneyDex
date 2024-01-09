// Add pagination to transactions

"use client";

import { transactionFormSchema } from "@/lib/zod-schemas/transactionFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import SubmitButton from "../SubmitButton";
import { createTransaction } from "@/actions/transaction-actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { Account, TransactionCategory, TransactionType } from "@prisma/client";

type NewTransactionFormProps = {
  type: TransactionType;
  userAccounts: Account[];
  userCategories: (Partial<TransactionCategory> & { id: string })[];
};

const NewTransactionForm = ({
  type,
  userAccounts,
  userCategories,
}: NewTransactionFormProps) => {
  const isTransfer = type === "TRANSFER";

  const form = useForm<z.infer<typeof transactionFormSchema>>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      type: type,
      fromAccountId: userAccounts[0].id,
      categoryId: undefined,
    },
  });

  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof transactionFormSchema>) => {
    const result = await createTransaction(data);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);

    router.push("/transactions");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="fromAccountId"
            render={({ field }) => (
              <FormItem className="col-start-1">
                <FormLabel>{isTransfer ? "From" : "Account"}</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Account" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {userAccounts.map((account) => (
                      <SelectItem key={account.id} value={account.id}>
                        {account.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {isTransfer && (
            <FormField
              control={form.control}
              name="toAccountId"
              render={({ field }) => (
                <FormItem className="col-start-1">
                  <FormLabel>To</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Account" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {userAccounts.map((account) => (
                        <SelectItem key={account.id} value={account.id}>
                          {account.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {!isTransfer && (
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem className="col-start-1">
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="NONE">Uncategorized</SelectItem>
                      {userCategories.map((category) => {
                        if (category.type === type) {
                          return (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          );
                        }
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem className="col-start-1">
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input placeholder="0" {...field} autoComplete="off" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem
                className={`sm:row-start-1 sm:row-end-3 sm:col-start-2 flex flex-col justify-center pt-[9px]`}
              >
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe this transaction"
                    {...field}
                    autoComplete="off"
                    className="resize-none flex-grow"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="w-full flex gap-2 mt-4 justify-center sm:justify-start">
          <SubmitButton
            isSubmitting={form.formState.isSubmitting}
            isDirty={form.formState.isDirty}
            className="w-full sm:w-auto"
            text="Log Transaction"
            pendingText="Logging Transaction..."
          />
        </div>
      </form>
    </Form>
  );
};

export default NewTransactionForm;
