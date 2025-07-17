import React, { useEffect, useState } from "react";
import { useAuthStore } from "../context/useAuthStore";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../libraries/api-client";

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  due_date: string | null;
  start_date: string | null;
  assignee_id: number | null;
}

const Task: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const navigate = useNavigate();
  const { loggedInUser } = useAuthStore((state) => state);

  // Kiểm tra vai trò Administrators
  const isAdmin =
    loggedInUser?.roles?.some((role) => role.name === "Administrators") ||
    false;

  // Chuyển hướng nếu chưa đăng nhập
  useEffect(() => {
    if (!loggedInUser) {
      navigate("/login");
    }
  }, [loggedInUser, navigate]);

  // Lấy danh sách tasks
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = (await apiClient.get("/workspaces/tasks")) as Task[];
        setTasks(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Failed to fetch tasks. Please try again.");
      }
    };
    fetchData();
  }, []);

  // Hàm xóa task với xác thực
  const deleteTask = async (id: number) => {
    try {
      // Gửi yêu cầu DELETE đến API
      const response = await apiClient.delete(`/workspaces/tasks/${id}`);
      return response; // Trả về phản hồi để xử lý tiếp
    } catch (error: any) {
      // Xử lý lỗi từ API
      const errorMessage =
        error.response?.data?.message || "Failed to delete task.";
      throw new Error(errorMessage);
    }
  };

  // Hàm xử lý sự kiện xóa
  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTask(id);
        // Cập nhật danh sách tasks sau khi xóa thành công
        setTasks(tasks.filter((task) => task.id !== id));
        alert("Task deleted successfully");
      } catch (error: any) {
        console.error("Failed to delete task:", error.message);
        alert(error.message); // Hiển thị lỗi cụ thể cho người dùng
      }
    }
  };

  // Hàm xử lý chỉnh sửa
  const handleEdit = (id: number) => {
    navigate(`/update-task/${id}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Danh sách nhiệm vụ</h1>
      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-200 table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">
                ID
              </th>
              <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">
                Title
              </th>
              <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">
                Description
              </th>
              <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">
                Status
              </th>
              <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">
                Priority
              </th>
              <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">
                Due Date
              </th>
              <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">
                Start Date
              </th>
              <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">
                Assignee
              </th>
              <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {tasks?.map((task: Task) => (
              <tr key={task.id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-2 text-sm text-center">{task.id}</td>
                <td className="px-4 py-2 text-sm text-center">{task.title}</td>
                <td className="px-4 py-2 text-sm text-center">
                  {task.description}
                </td>
                <td className="px-4 py-2 text-sm text-center">
                  <span
                    className={`inline-block px-2 py-1 rounded text-white ${
                      task.status === "done"
                        ? "bg-green-500"
                        : task.status === "in_progress"
                        ? "bg-yellow-500"
                        : task.status === "to_do"
                        ? "bg-red-500"
                        : "bg-gray-400"
                    }`}
                  >
                    {task.status}
                  </span>
                </td>
                <td className="px-4 py-2 text-sm text-center">
                  <span
                    className={`inline-block px-2 py-1 rounded text-white ${
                      task.priority === "high"
                        ? "bg-red-500"
                        : task.priority === "medium"
                        ? "bg-yellow-500"
                        : task.priority === "low"
                        ? "bg-green-500"
                        : "bg-gray-400"
                    }`}
                  >
                    {task.priority}
                  </span>
                </td>
                <td className="px-4 py-2 text-sm text-center">
                  {task.due_date
                    ? new Date(task.due_date).toLocaleDateString()
                    : ""}
                </td>
                <td className="px-4 py-2 text-sm text-center">
                  {task.start_date
                    ? new Date(task.start_date).toLocaleDateString()
                    : ""}
                </td>
                <td className="px-4 py-2 text-sm text-center">
                  {task.assignee_id}
                </td>
                {isAdmin && (
                  <td className="px-4 py-2 text-sm text-center">
                    <button
                      onClick={() => handleEdit(task.id)}
                      className="text-yellow-600 hover:text-blue-800 font-medium mr-4"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(task.id)}
                      className="text-red-600 hover:text-blue-800 font-medium"
                    >
                      Xóa
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Task;
