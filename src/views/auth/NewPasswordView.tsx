import NewPasswordToken from "@/components/Auth/NewPasswordToken";
import NewPasswordForm from "@/components/Auth/NewPasswordForm";
import { useState } from "react";
import { ConfirmToken } from "@/types/index";

const NewPasswordView = () => {
  const [token, setToken] = useState<ConfirmToken["token"]>("");
  const [isValidToken, setIsValidToken] = useState(false);

  return (
    <>
      <h1 className="text-5xl font-black text-white">Reset Password</h1>
      <p className="text-2xl font-light text-white mt-5">
        Enter the code (6 digits) that you recieved in {""}
        <span className=" text-fuchsia-500 font-bold"> your email</span>
      </p>

      {!isValidToken ? (
        <NewPasswordToken
          token={token}
          setToken={setToken}
          setIsValidToken={setIsValidToken}
        />
      ) : (
        <NewPasswordForm token={token} />
      )}
    </>
  );
};

export default NewPasswordView;
