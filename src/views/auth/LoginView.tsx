import { useForm } from "react-hook-form";
import { UserLoginForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { loginUser } from "@/api/AuthAPI";

export default function LoginView() {
  const navigate = useNavigate();

  const initialValues: UserLoginForm = {
    email: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: loginUser,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Welcome");
      navigate("/");
    },
  });

  const handleLogin = (formData: UserLoginForm) => mutate(formData);

  return (
    <>
      <h1 className="text-5xl font-black text-white">Log In</h1>
      <p className="text-2xl font-light text-white mt-5">
        Start planning your projects {""}
        <span className=" text-fuchsia-500 font-bold"> by logging in</span>
      </p>

      <form
        onSubmit={handleSubmit(handleLogin)}
        className="space-y-8 p-10 mt-10 bg-white"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl">Email</label>

          <input
            id="email"
            type="email"
            placeholder="Email"
            className="w-full p-3  border-gray-300 border"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid Email",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl">Password</label>

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3  border-gray-300 border"
            {...register("password", {
              required: "Password is required",
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value="Login"
          className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
        />
      </form>
      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to={`/auth/register`}
          className="text-center text-gray-300 font-normal"
        >
          You do not have an account? <b>Register</b>
        </Link>
        <Link
          to={`/auth/forgot-password`}
          className="text-center text-gray-300 font-normal"
        >
          Forgot your password? <b>Reset</b>
        </Link>
      </nav>
    </>
  );
}
