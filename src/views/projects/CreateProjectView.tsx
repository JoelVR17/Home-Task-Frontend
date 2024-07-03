import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import ProjectForm from "@/components/Projects/ProjectForm";

const CreateProjectView = () => {
  const initialValues = {
    projectName: "",
    clientName: "",
    description: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const handleForm = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-black">Create a Project</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          Fill out this form
        </p>

        <nav className="my-5">
          <Link
            className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
            to={`/`}
          >
            Back
          </Link>
        </nav>

        <form
          className="mt-10 bg-white shadow-lg p-10 rounder-lg"
          onSubmit={handleSubmit(handleForm)}
          noValidate
        >
          <ProjectForm register={register} errors={errors} />
          <input
            type="submit"
            value={`Create Project`}
            className="bg-fuchsia-600 w-full p-3 text-white uppercase font-bold hover:bg-fuchsia-700 cursor-pointer transition-colors"
          />
        </form>
      </div>
    </>
  );
};

export default CreateProjectView;
