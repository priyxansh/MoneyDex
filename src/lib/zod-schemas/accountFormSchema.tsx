import { z } from "zod";

export const accountFormSchema = z.object({
  accountName: z.string().min(1).max(50),
  balance: z.coerce
    .number({ invalid_type_error: "Balance must be a number." })
    .min(-1000000000)
    .max(1000000000)
    .transform((value) => {
      return +value;
    }),
});
