import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import type { RegisterForm } from "../Iterfaces/AouthIterfaces";
import registerSchema from "../schema/AuthScehma";



export default function Register() {
  const navigate = useNavigate();
  const { register,handleSubmit,formState: { errors } } = useForm<RegisterForm>({
    defaultValues: {
      name: "",
      username: "",
      email: "",
      dateOfBirth: "",
      gender: "",
      password: "",
      rePassword: "",
    },
        resolver: zodResolver(registerSchema),

  });

const onSubmit = async (data: RegisterForm) => {
  try {
    const response = await axios.post(
      "https://route-posts.routemisr.com/users/signup",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
    toast.success(response.data.message);
    navigate("/login");

  } catch (error) {
    if (axios.isAxiosError(error)) {
      const apiError = error.response?.data;

      console.log(apiError);

      if (apiError?.errors) {
        toast.error(apiError.errors);
      }
    }
  }
};


  return (
    <div className="container mt-5" data-theme="dark" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4">Create Account</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="form-label">Full Name</label>

          <input
            className="form-control"
            type="text"
            {...register("name", {
              required: "Name is required",
            })}
          />
          {errors.name && <p className="text-danger">{errors.name.message}</p>}
        </div>

        <div className="mb-3">
          <label className="form-label">Username</label>

          <input
            className="form-control"
            type="text"
            {...register("username", {
              required: "Username is required",
            })}
          />

          {errors.username && <p className="text-danger">{errors.username.message}</p>}
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>

          <input
            className="form-control"
            type="email"
            {...register("email", {
              required: "Email is required",
            })}
          />

          {errors.email && <p className="text-danger">{errors.email.message}</p>}
        </div>

        <div className="mb-3">
          <label className="form-label">Date of Birth</label>

          <input
            className="form-control"
            type="date"
            {...register("dateOfBirth", {
              required: "Date of Birth is required",
            })}
          />

          {errors.dateOfBirth && <p className="text-danger">{errors.dateOfBirth.message}</p>}
        </div>

        <div className="mb-3">
          <label className="form-label">Gender</label>

          <select
            className="form-select"
            {...register("gender", {
              required: "Gender is required",
            })}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          {errors.gender && <p className="text-danger">{errors.gender.message}</p>}
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>

          <input
            className="form-control"
            type="password"
            {...register("password", {
              required: "Password is required",
            })}
          />

          {errors.password && <p className="text-danger">{errors.password.message}</p>}
        </div>

        <div className="mb-4">
          <label className="form-label">Confirm Password</label>

          <input
            className="form-control"
            type="password"
            {...register("rePassword", {
              required: "Please confirm your password",
            })}
          />

          {errors.rePassword && <p className="text-danger">{errors.rePassword.message}</p>}
        </div>

        <button type="submit" className="btn btn-primary w-100 mb-5 danger">
          Register
        </button>
      </form>
    </div>
  );
}


