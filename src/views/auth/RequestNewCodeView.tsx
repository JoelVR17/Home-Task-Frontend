import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { RequestConfirmationCodeForm } from "../../types";
import ErrorMessage from "@/components/ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { requestConfirmCode } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function RegisterView() {
  const initialValues: RequestConfirmationCodeForm = {
    email: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: requestConfirmCode,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      reset();
    },
  });

  const handleRequestCode = (formData: RequestConfirmationCodeForm) =>
    mutate(formData);

  return (
    <>
      <h1 className="text-5xl font-black text-white">
        Request Verification Code
      </h1>
      <p className="text-2xl font-light text-white mt-5">
        Enter your email to recieve {""}
        <span className=" text-fuchsia-500 font-bold"> a new code</span>
      </p>

      <form
        onSubmit={handleSubmit(handleRequestCode)}
        className="space-y-8 p-10 rounded-lg bg-white mt-10"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label className="font-normal text-2xl" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg border-gray-300 border"
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

        <input
          type="submit"
          value="Send Code"
          className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer"
        />
      </form>

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to="/auth/login"
          className="text-center text-gray-300 font-normal"
        >
          Already have an account? <b>Login</b>
        </Link>
        <Link
          to="/auth/forgot-password"
          className="text-center text-gray-300 font-normal"
        >
          Forgot your password? <b>Change It</b>
        </Link>
      </nav>
    </>
  );
}
