"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { categoryFormSchema } from "@/lib/zod-schemas/categoryFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { updateCategory } from "@/actions/category-actions";
import { Button } from "../ui/button";
import SaveButton from "../SaveButton";
import { getSubmitOnEnter } from "@/lib/utils/getSubmitOnEnter";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { TransactionCategoryType } from "@/types/prisma";

type EditCategoryFormProps = {
  id: string;
  name: string;
  type: TransactionCategoryType;
  closeDialog: () => void;
};

const EditCategoryForm = ({
  id,
  name,
  type,
  closeDialog,
}: EditCategoryFormProps) => {
  const form = useForm<z.infer<typeof categoryFormSchema>>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      categoryName: name,
      categoryType: type,
    },
  });

  const { isSubmitting, isDirty } = form.formState;

  const onSubmit = async (data: z.infer<typeof categoryFormSchema>) => {
    if (!isDirty) {
      return;
    }

    const result = await updateCategory(id, data);

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
        <div className="flex flex-col items-center gap-4">
          <FormField
            control={form.control}
            name="categoryName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Category Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Category Name"
                    {...field}
                    autoFocus
                    autoComplete="off"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryType"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Category Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="INCOME">Income</SelectItem>
                    <SelectItem value="EXPENSE">Expense</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="w-full flex gap-4 mt-4 justify-end">
          <Button variant={"secondary"} onClick={() => closeDialog()}>
            Cancel
          </Button>
          <SaveButton isSubmitting={isSubmitting} isDirty={isDirty} />
        </div>
      </form>
    </Form>
  );
};

export default EditCategoryForm;
