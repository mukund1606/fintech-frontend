import * as z from "zod";

export const LoginFormSchema = z.object({
  email: z
    .string()
    .email({
      message: "Invalid Email",
    })
    .min(1, {
      message: "Email is required",
    }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
});

export const RegisterFormSchema = LoginFormSchema.extend({
  name: z.string().min(1, {
    message: "Name is Required",
  }),
});
