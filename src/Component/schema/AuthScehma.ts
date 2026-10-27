import z from "zod";

const registerSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    username: z.string().min(3, "Username must be at least 3 characters").max(30, "Username must be at most 30 characters")
    .regex( /^[a-z0-9_]+$/, "Username can only contain lowercase letters, numbers, and underscore"),

    email: z.email("Invalid email"),

    dateOfBirth: z.string().min(1, "Date of Birth is required").refine((date) => {
    const birthDate = new Date(date);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age >= 16;
  }, "You must be at least 16 years old"),

    gender: z.string().min(1, "Gender is required"),

    password: z.string().min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain an uppercase letter")
      .regex(/[a-z]/, "Password must contain a lowercase letter")
      .regex(/[0-9]/, "Password must contain a number")
      .regex(
        /[#?!@$%^&*-]/,
        "Password must contain a special character"
      ),

    rePassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });

 export default registerSchema;