"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { categoryFormSchema } from "@/lib/zod-schemas/categoryFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import CreateCategoryButton from "./CreateCategoryButton";
import { useRouter } from "next/navigation";
import { createCategory } from "@/actions/category-actions";
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

type NewCategoryFormProps = {};

const NewCategoryForm = ({}: NewCategoryFormProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof categoryFormSchema>>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      categoryName: "",
      categoryType: "INCOME",
    },
  });

  const onSubmit = async (data: z.infer<typeof categoryFormSchema>) => {
    const result = await createCategory(data);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);

    router.push("/categories");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <FormField
            control={form.control}
            name="categoryName"
            render={({ field }) => (
              <FormItem className="w-full max-w-[350px]">
                <FormLabel>Category Name</FormLabel>
                <FormControl>
                  <Input placeholder="Category Name" {...field} autoFocus />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryType"
            render={({ field }) => (
              <FormItem className="w-full max-w-[350px]">
                <FormLabel>Category Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="sm:w-[180px]">
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
        <div className="w-full flex gap-2 mt-4 justify-center sm:justify-start">
          <CreateCategoryButton pending={form.formState.isSubmitting} />
        </div>
      </form>
    </Form>
  );
};

export default NewCategoryForm;
