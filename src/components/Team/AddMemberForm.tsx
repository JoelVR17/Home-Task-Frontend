import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import ErrorMessage from "../ErrorMessage";
import { TeamMemberForm } from "@/types/index";
import { findUserByEmail } from "@/api/TeamAPI";
import SearchResult from "./SearchResult";
import Loader from "../Utils/Loader";

export default function AddMemberForm() {
  const initialValues: TeamMemberForm = {
    email: "",
  };
  const params = useParams();
  const projectId = params.projectId!;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const mutation = useMutation({
    mutationFn: findUserByEmail,
  });

  const handleSearchUser = async (formData: TeamMemberForm) => {
    const data = { projectId, formData };

    mutation.mutate(data);
  };

  const resetData = () => {
    reset(), mutation.reset();
  };

  return (
    <>
      <form
        className="mt-10 space-y-5"
        onSubmit={handleSubmit(handleSearchUser)}
        noValidate
      >
        <div className="flex flex-col gap-3">
          <label className="font-normal text-2xl" htmlFor="name">
            Email
          </label>
          <input
            id="name"
            type="text"
            placeholder="Email to Add"
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

        <input
          type="submit"
          className=" bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
          value="Search User"
        />
      </form>

      <div className="mt-10">
        {mutation.isPending && <Loader />}
        {mutation.error && (
          <p className="text-center">{mutation.error.message}</p>
        )}
        {mutation.data && (
          <SearchResult reset={resetData} user={mutation.data} />
        )}
      </div>
    </>
  );
}
