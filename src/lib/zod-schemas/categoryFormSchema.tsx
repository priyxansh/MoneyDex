import { z } from "zod";

export const categoryFormSchema = z.object({
  categoryName: z
    .string()
    .min(1, {
      message: "Category name must be at least 1 character long.",
    })
    .max(50, {
      message: "Category name cannot be longer than 50 characters.",
    }),
  categoryType: z.enum(["INCOME", "EXPENSE"], {
    invalid_type_error: "Category type must be either income or expense.",
  }),
});
