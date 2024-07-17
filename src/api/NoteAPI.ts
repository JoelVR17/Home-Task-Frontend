import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { Note, NoteFormData, Project, Task } from "../types";

type NoteAPIType = {
  formData: NoteFormData;
  projectId: Project["_id"];
  taskId: Task["_id"];
  noteId: Note["_id"];
};

export const createNote = async ({
  projectId,
  taskId,
  formData,
}: Pick<NoteAPIType, "projectId" | "taskId" | "formData">) => {
  try {
    const { data } = await api.post<string>(
      `/projects/${projectId}/tasks/${taskId}/notes`,
      formData
    );

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response?.data.error);
    }
  }
};

export const deleteNote = async ({
  projectId,
  taskId,
  noteId,
}: Pick<NoteAPIType, "projectId" | "taskId" | "noteId">) => {
  try {
    const { data } = await api.delete<string>(
      `/projects/${projectId}/tasks/${taskId}/notes/${noteId}`
    );

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response?.data.error);
    }
  }
};
