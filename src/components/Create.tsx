// import React, { useContext } from "react";
// import { AuthContext } from "../context/useAuthStore";
// import { useNavigate } from "react-router-dom";

// type Props = {};

// interface Task {
//   title: string;
//   description: string;
//   due_date: Date | null;
//   start_date: Date | null;
//   status: string;
//   priority: string;
//   assignee_id: number | null;
// }

// const Create = (props: Props) => {
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const [title, setTitle] = React.useState("");
//   const [description, setDescription] = React.useState("");
//   const [dueDate, setDueDate] = React.useState<string>("");
//   const [startDate, setStartDate] = React.useState<string>("");
//   const [status, setStatus] = React.useState("to_do");
//   const [priority, setPriority] = React.useState("medium");
//   const [assigneeId, setAssigneeId] = React.useState<number | null>(
//     user?.id || null
//   );

//   ///api
//   const createTask = async (task: Task) => {
//     const response = await fetch("https://server.aptech.io/workspaces/tasks", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${user?.token}`,
//       },
//       body: JSON.stringify(task),
//     });

//     if (!response.ok) {
//       throw new Error(`Create failed with status ${response.status}`);
//     }

//     return response.json();
//   };

//   const handleSubmit = async (event: React.FormEvent) => {
//     const task: Task = {
//       title,
//       description,
//       due_date: dueDate ? new Date(dueDate) : null,
//       start_date: startDate ? new Date(startDate) : null,
//       status,
//       priority,
//       assignee_id: assigneeId,
//     };

//     try {
//       const newTask = await createTask(task);
//       console.log("Task tạo thành công:", newTask);
//       alert("Task created successfully!");
//       navigate("/my-tasks");
//     } catch (err) {
//       console.error("Lỗi khi submit:", err);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-6 rounded shadow w-80 space-y-4"
//       >
//         <h2 className="text-xl mb-4 text-center">Create Task</h2>
//         <input
//           type="text"
//           placeholder="Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring focus:ring-blue-200"
//           required
//         />
//         <textarea
//           placeholder="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring focus:ring-blue-200"
//           required
//         />
//         <input
//           type="date"
//           value={startDate}
//           onChange={(e) => setStartDate(e.target.value)}
//           className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring focus:ring-blue-200"
//           required
//         />
//         <input
//           type="date"
//           value={dueDate}
//           onChange={(e) => setDueDate(e.target.value)}
//           className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring focus:ring-blue-200"
//           required
//         />
//         <select
//           value={status}
//           onChange={(e) => setStatus(e.target.value)}
//           className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring focus:ring-blue-200"
//           required
//         >
//           <option value="to_do">To Do</option>
//           <option value="in_progress">In Progress</option>
//           <option value="done">Done</option>
//         </select>
//         <select
//           value={priority}
//           onChange={(e) => setPriority(e.target.value)}
//           className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring focus:ring-blue-200"
//           required
//         >
//           <option value="medium">Medium</option>
//           <option value="low">Low</option>
//           <option value="high">High</option>
//         </select>
//         <input
//           type="number"
//           placeholder="Assignee ID (default to your ID)"
//           value={assigneeId?.toString() || ""}
//           onChange={(e) =>
//             setAssigneeId(e.target.value ? Number(e.target.value) : null)
//           }
//           className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring focus:ring-blue-200"
//         />
//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
//         >Submit</button>
//       </form>
//     </div>
//   );
// };
// export default Create;