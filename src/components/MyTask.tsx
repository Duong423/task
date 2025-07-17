// import React, { use, useContext, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { set } from "react-hook-form";

// const MyTask: React.FC = () => {
//   const [tasks, setTasks] = React.useState([]);
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();
//   interface Task {
//     id: number;
//     title: string;
//     description: string;
//     status: string;
//     priority: string;
//     due_date: string | null;
//     start_date: string | null;
//     assignee_id: number | null;
//   }

// ///edit
//   const handleEdit = (id: number) => {
//     navigate(`/update-task/${id}`);
//   };
// ///delete
//   const deleteTask = async (id: number) => {
//     const response = await fetch(
//       `https://server.aptech.io/workspaces/tasks/${id}`,
//       {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${user?.token}`,
//         },
//       }
//     );

//     if (!response.ok) {
//       throw new Error(`Delete failed with status ${response.status}`);
//     }

//     return response.json();
//   };
// //call api delete
//   const handleDelete = async (id: number) => {
//     if (window.confirm("Are you sure you want to delete this task?")) {
//       deleteTask(id)
//         .then(() => {
//           setTasks(tasks.filter((task: Task) => task.id !== id));
//           alert("Task deleted successfully");
//         })
//         .catch((error) => {
//           console.error("Failed to delete task:", error);
//           alert("Failed to delete task. Please try again.");
//         });
//     }
//   };

  
//   const getMyTask = async (userId: number) => {
//     const response = await fetch(
//       `https://server.aptech.io/workspaces/tasks/assignee/${userId}`,
//       {
//         headers: {
//           Authorization: `Bearer ${user?.token}`,
//         },
//       }
//     );

//     if (!response.ok) {
//       throw new Error(`Failed to fetch tasks for user ${userId}`);
//     }

//     return response.json();
//   };

//   useEffect(() => {
//     const fetchTasksId = async () => {
//       if (!user) return;
//       try {
//         const response = await getMyTask(user.id);

//         setTasks(response);
//       } catch (error) {
//         console.error("Error fetching tasks:", error);
//       }
//     };
//     fetchTasksId();
//   }, [user]);

//   return (
//     <div>
//       {/* <SearchTasks onSearch={handleOnSearch} /> */}
//       <div className="overflow-x-auto rounded-lg shadow-md mt-6">
//         <table className="min-w-full divide-y divide-gray-200 table-auto">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">
//                 ID
//               </th>
//               <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">
//                 Title
//               </th>
//               <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">
//                 Description
//               </th>
//               <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">
//                 Status
//               </th>
//               <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">
//                 Priority
//               </th>
//               <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">
//                 Due Date
//               </th>
//               <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">
//                 Start Date
//               </th>
//               <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">
//                 Assignee
//               </th>
//               <th className="px-4 py-2 text-center text-sm font-semibold text-gray-700">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-100 bg-white">
//             {tasks?.map((task: Task) => (
//               <tr key={task.id} className="hover:bg-gray-50 transition">
//                 <td className="px-4 py-2 text-sm text-center">{task.id}</td>
//                 <td className="px-4 py-2 text-sm text-center">{task.title}</td>
//                 <td className="px-4 py-2 text-sm text-center">
//                   {task.description}
//                 </td>
//                 <td className="px-4 py-2 text-sm text-center">
//                   <span
//                     className={`inline-block px-2 py-1 rounded text-white ${
//                       task.status === "done"
//                         ? "bg-green-500"
//                         : task.status === "in_progress"
//                         ? "bg-yellow-500"
//                         : task.status === "to_do"
//                         ? "bg-red-500"
//                         : "bg-gray-400"
//                     }`}
//                   >
//                     {task.status}
//                   </span>
//                 </td>

//                 <td className="px-4 py-2 text-sm text-center">
//                   <span
//                     className={`inline-block px-2 py-1 rounded text-white ${
//                       task.priority === "high"
//                         ? "bg-red-500"
//                         : task.priority === "medium"
//                         ? "bg-yellow-500"
//                         : task.priority === "low"
//                         ? "bg-green-500"
//                         : "bg-gray-400"
//                     }`}
//                   >
//                     {task.priority}
//                   </span>
//                 </td>

//                 <td className="px-4 py-2 text-sm text-center">
//                   {task.due_date
//                     ? new Date(task.due_date).toLocaleDateString()
//                     : ""}
//                 </td>
//                 <td className="px-4 py-2 text-sm text-center">
//                   {task.start_date
//                     ? new Date(task.start_date).toLocaleDateString()
//                     : ""}
//                 </td>
//                 <td className="px-4 py-2 text-sm text-center">
//                   {task.assignee_id}
//                 </td>
//                 <td className="px-4 py-2 text-center text-sm text-center">
//                   <button
//                     onClick={() => handleEdit(task.id as number)}
//                     className="text-yellow-600 hover:text-blue-800 font-medium"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(task.id as number)}
//                     className="text-red-600 hover:text-blue-800 font-medium"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default MyTask;
