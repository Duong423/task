import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiClient } from "../libraries/api-client"; // Đường dẫn đến api-client
import { useAuthStore } from "../context/useAuthStore";

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  start_date: string | null;
  due_date: string | null;
  assignee_id: number | null;
}

const Update: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [task, setTask] = useState<Task | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [assignee, setAssignee] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Hàm lấy task theo ID
  const getTaskById = async (id: number) => {
    try {
      const response = await apiClient.get(`/workspaces/tasks/${id}`);
      return response as unknown as Task; // apiClient đã trả về response.data
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Không thể lấy thông tin nhiệm vụ."
      );
    }
  };

  // Lấy dữ liệu task khi component mount
  useEffect(() => {
    const fetchTask = async () => {
      setLoading(true);
      try {
        const taskData = await getTaskById(Number(id));
        setTask(taskData);
        setTitle(taskData.title || "");
        setDescription(taskData.description || "");
        setStatus(taskData.status || "");
        setPriority(taskData.priority || "");
        setStartDate(
          taskData.start_date ? taskData.start_date.split("T")[0] : ""
        );
        setDueDate(taskData.due_date ? taskData.due_date.split("T")[0] : "");
        setAssignee(
          taskData.assignee_id ? taskData.assignee_id.toString() : ""
        );
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  // Hàm xử lý cập nhật task
  const handleUpdate = async () => {
    setLoading(true);
    setError("");
    try {
      await apiClient.patch(`/workspaces/tasks/${id}`, {
        title,
        description,
        status,
        priority,
        start_date: startDate || null,
        due_date: dueDate || null,
        assignee_id: assignee ? Number(assignee) : null,
      });
      navigate("/tasks");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Không thể cập nhật nhiệm vụ.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Hàm xử lý submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleUpdate();
  };

  return (
    <div className="flex justify-center items-center h-full w-full bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[800px] mx-auto p-6 bg-white rounded-xl shadow space-y-6"
      >
        <h2 className="text-2xl font-semibold text-gray-800">
          Cập nhật nhiệm vụ
        </h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        {loading && <p className="text-center text-blue-500">Đang tải...</p>}

        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Tiêu đề
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">Mô tả</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Trạng thái
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            required
          >
            <option value="">-- Chọn trạng thái --</option>
            <option value="to_do">Chưa làm</option>
            <option value="in_progress">Đang thực hiện</option>
            <option value="done">Hoàn thành</option>
          </select>
        </div>
        <div>
          <label className="blockropolitcan mb-1 font-medium text-gray-700">
            Độ ưu tiên
          </label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            required
          >
            <option value="">-- Chọn độ ưu tiên --</option>
            <option value="low">Thấp</option>
            <option value="medium">Trung bình</option>
            <option value="high">Cao</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Ngày bắt đầu
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Ngày hết hạn
          </label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Người được giao
          </label>
          <input
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            type="number"
            placeholder="ID người được giao"
          />
        </div>
        <div className="flex justify-between gap-4 mt-4">
          <button
            type="button"
            onClick={() => navigate("/tasks")}
            className="w-1/2 bg-gray-300 text-gray-800 py-2 rounded-md font-semibold hover:bg-gray-400 transition"
            disabled={loading}
          >
            Hủy
          </button>
          <button
            type="submit"
            className="w-1/2 bg-blue-500 text-white py-2 rounded-md font-semibold hover:bg-blue-600 transition disabled:bg-blue-300"
            disabled={loading}
          >
            {loading ? "Đang cập nhật..." : "Cập nhật"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Update;
