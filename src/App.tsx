import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Task from "./components/Task";
// import MyTask from "./components/MyTask";
// import { AuthContext, AuthProvider } from "./context/useAuthStore";
// import Create from "./components/Create";
// import Update from "./pages/Update";
import AccessDenied from "./components/AccessDenied";
import Update from "./pages/Update";

const AppContent: React.FC = () => {
  // const { user } = useContext(AuthContext);

  return (
    // <BrowserRouter>
    //   <div className="flex flex-col w-screen h-screen">
    //     <Header />
    //     <main className="flex-grow p-4">
    //       <Routes>
    //         <Route
    //           index
    //           element={user ? <Navigate to="/tasks" replace /> : <Login />}
    //         />
    //         <Route
    //           path="/tasks"
    //           element={user ? <Task /> : <Navigate to="/" />}
    //         />
    //         <Route
    //           path="/my-tasks"
    //           element={user ? <MyTask /> : <Navigate to="/" />}
    //         />
    //         <Route
    //           path="/create-task"
    //           element={user ? <Create /> : <Navigate to="/" />}
    //         />
    //         <Route
    //           path="/update-task/:id"
    //           element={user ? <Update /> : <Navigate to="/" />}
    //         />
    //       </Routes>
    //     </main>
    //   </div>
    // </BrowserRouter>

    // <div className="bg-gray-50">
    <BrowserRouter>
      <div className="flex flex-col w-screen h-screen">
        <Header />
        <main className="flex-grow p-4">
          <Routes>
            <Route index element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/tasks" element={<Task />} />
            <Route path="/update-task/:id" element={<Update />} />

            {/* <Route path="/customer" element={<Customer />} /> */}
            <Route path="/access-denied" element={<AccessDenied />} />
            <Route path="*" element={<AccessDenied />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
    // </div>
  );
};

// const App: React.FC = () => {
//   return (
//     <AuthProvider>
//       <AppContent />
//     </AuthProvider>
//   );
// };

export default AppContent;
