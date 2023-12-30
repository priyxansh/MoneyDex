import { z } from "zod";

export const transactionFormSchema = z
  .object({
    type: z.enum(["INCOME", "EXPENSE", "TRANSFER"]),
    amount: z.coerce
      .number({ invalid_type_error: "Amount must be a number." })
      .min(1, { message: "Amount must be greater than 0." })
      .max(1000000000, { message: "Amount must be less than 1,000,000,000." }),
    description: z
      .string()
      .max(250, {
        message: "Description must be less than 250 characters.",
      })
      .optional(),
    categoryId: z
      .string()
      .optional()
      .refine(
        (val) => {
          return (
            val === "NONE" ||
            val === undefined ||
            z.string().uuid().safeParse(val).success
          );
        },
        { message: "Invalid category." }
      )
      .transform((val) => {
        if (val === "NONE") {
          return undefined;
        }
        return val;
      }),
    fromAccountId: z.string().uuid(),
    toAccountId: z.string().uuid().optional(),
  })
  .refine(
    (data) => {
      if (data.type === "TRANSFER") {
        return data.toAccountId !== undefined;
      }
      return true;
    },
    {
      message: "Please select a transfer account.",
      path: ["toAccountId"],
    }
  )
  .refine(
    (data) => {
      if (data.type === "TRANSFER") {
        return data.fromAccountId !== data.toAccountId;
      }
      return true;
    },
    {
      message: "Transfer accounts must be different.",
      path: ["toAccountId"],
    }
  );
