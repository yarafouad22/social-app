import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface LoginForm {
  login: string;
  password: string;
}

const loginSchema = z.object({
  login: z.string().min(1, "Email or username is required"),

  password: z.string().min(1, "Password is required"),
});

export default function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    defaultValues: {
      login: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      const response = await axios.post(
        "https://route-posts.routemisr.com/users/signin",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);

      toast.success(response.data.message);

      // هنستخدم الـ token بعدين لحماية الصفحات
      localStorage.setItem("token", response.data.data.token);

      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const apiError = error.response?.data;

        console.log(apiError);

        if (apiError?.errors) {
          toast.error(apiError.errors);
        } else if (apiError?.message) {
          toast.error(apiError.message);
        } else {
          toast.error("Login failed");
        }
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4">Login</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="form-label">Email or Username</label>

          <input
            type="text"
            className="form-control"
            placeholder="Enter your email or username"
            {...register("login")}
          />

          {errors.login && (
            <p className="text-danger">{errors.login.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="form-label">Password</label>

          <input
            type="password"
            className="form-control"
            placeholder="Enter your password"
            {...register("password")}
          />

          {errors.password && (
            <p className="text-danger">{errors.password.message}</p>
          )}
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
    </div>
  );
}
