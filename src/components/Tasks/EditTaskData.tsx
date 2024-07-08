import { getTaskById } from "@/api/TaskAPI";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router-dom";
import EditTaskModal from "./EditTaskModal";

const EditTaskData = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const taskId = queryParams.get("editTask")!;

  const params = useParams();
  const projectId = params.projectId!;

  const { data } = useQuery({
    queryKey: ["key", taskId],
    queryFn: () => getTaskById({ projectId, taskId }),
    enabled: !!taskId,
  });

  if (data) return <EditTaskModal data={data} />;
};

export default EditTaskData;
