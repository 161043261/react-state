import { z } from "zod";

const todoSchema = z.object({
  id: z.number().min(0).optional(),
  content: z.string().min(0),
  done: z.preprocess((val) => {
    if (typeof val === "string") {
      return val === "on";
    }
    return val;
  }, z.boolean().default(false)),
  // done: z.coerce.boolean().default(false),
});

export { todoSchema };
