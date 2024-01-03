import { z } from "zod";

export const accountFormSchema = z.object({
  accountName: z.string().min(1).max(50),
  balance: z.coerce
    .number({ invalid_type_error: "Balance must be a number." })
    .min(0, { message: "Balance must be greater than or equal to 0." })
    .max(1000000000, {
      message: "Balance must be less than or equal to 1,000,000,000.",
    }),
});
