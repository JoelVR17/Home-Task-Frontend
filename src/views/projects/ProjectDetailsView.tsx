import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProjectById } from "@/api/ProjectAPI";
import AddTaskModal from "@/components/Tasks/AddTaskModal";
import TaskModalDetails from "@/components/Tasks/TaskModalDetails";
import TaskList from "@/components/Tasks/TaskList";
import EditTaskData from "@/components/Tasks/EditTaskData";
import Loader from "@/components/Utils/Loader";
import { useAuth } from "@/hooks/useAuth";
import { isManager } from "@/utils/policies";

const ProjectDetailsView = () => {
  const { data: user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();

  const params = useParams();
  const projectId = params.projectId!;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getProjectById(projectId),
    retry: false,
  });

  if (isLoading && authLoading) return <Loader />;
  if (isError) return <Navigate to={"/404"} />;
  if (data && user)
    return (
      <>
        <h1 className="text-5xl font-black">{data.projectName}</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          {data.description}
        </p>

        <nav className="my-5 flex gap-3">
          <Link
            className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
            to={`/`}
          >
            Back
          </Link>
          <button
            type="button"
            className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
            onClick={() => navigate(location.pathname + "?newTask=true")}
          >
            Add Task
          </button>
          {isManager(data.manager, user._id) && (
            <>
              <Link
                className="bg-fuchsia-600 hover:bg-fuchsia-700 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                to={`team`}
              >
                Collaborators
              </Link>
            </>
          )}
        </nav>

        <TaskList tasks={data.tasks} />
        <AddTaskModal />
        <EditTaskData />
        <TaskModalDetails />
      </>
    );
};

export default ProjectDetailsView;
