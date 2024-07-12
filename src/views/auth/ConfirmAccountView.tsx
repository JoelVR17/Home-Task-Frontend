import { Link, useNavigate } from "react-router-dom";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useState } from "react";
import { ConfirmToken } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { confirmAccount } from "@/api/AuthAPI";

export default function ConfirmAccountView() {
  const navigate = useNavigate();

  const [token, setToken] = useState<ConfirmToken["token"]>("");

  const { mutate } = useMutation({
    mutationFn: confirmAccount,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      navigate("/auth/login");
    },
  });

  const handleChange = (token: ConfirmToken["token"]) => setToken(token);
  const handleComplete = (token: ConfirmToken["token"]) => mutate({ token });

  return (
    <>
      <h1 className="text-5xl font-black text-white">Confirm your Account</h1>
      <p className="text-2xl font-light text-white mt-5">
        Enter the Code (6 digits) that you received {""}
        <span className=" text-fuchsia-500 font-bold"> by Email</span>
      </p>
      <form className="space-y-8 p-8 bg-white mt-10">
        <div className="flex justify-center gap-5">
          <PinInput
            value={token}
            onChange={handleChange}
            onComplete={handleComplete}
          >
            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
            <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
          </PinInput>
        </div>
      </form>

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to="/auth/request-code"
          className="text-center text-gray-300 font-normal"
        >
          Request a new <b>Code</b>
        </Link>
      </nav>
    </>
  );
}
