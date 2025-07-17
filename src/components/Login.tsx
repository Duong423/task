// import React, { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuthStore } from '../useAuthStore';
// const Login: React.FC = () => {
//   const [username, setUsername] = useState('tungnt@softech.vn');
//   const [password, setPassword] = useState('123456789');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     setLoading(true);
//     setError('');
//     const success = await login(username, password);
//     setLoading(false);
//     if (success) {
//       navigate('/tasks');
//     } else {
//       setError('Sai username hoặc password');
//     }
//   };

//   return (
//     <div className="flex justify-center items-center">
//       <div className="bg-white p-6 rounded shadow w-80 it">
//         <h2 className="text-xl mb-4">Đăng nhập</h2>
//         {error && <p className="text-red-500 mb-4">{error}</p>}
//         <input
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           placeholder="Username"
//           className="w-full p-2 mb-4 border rounded"
//           disabled={loading}
          
//         />
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//           className="w-full p-2 mb-4 border rounded"
//           disabled={loading}
//         />
//         <button
//           onClick={handleLogin}
//           className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
//           disabled={loading}
//         >
//           {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Login;



// src/pages/Login.tsx

import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import { useAuthStore } from '../context/useAuthStore';
import { useNavigate } from 'react-router-dom';

// Strong typed interface for form data
interface IFormInput {
  username: string;
  password: string;
}

// Yup validation schema with strong typing
const validationSchema: yup.ObjectSchema<IFormInput> = yup.object({
  username: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address')
    .min(5, 'Email must be at least 5 characters')
    .max(100, 'Email must be less than 100 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(50, 'Password must be less than 50 characters'),
});

export default function Login() {
  const navigate = useNavigate();
  const { login, error } = useAuthStore((state) => state);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, dirtyFields },
  } = useForm<IFormInput>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange', // Validate on change for better UX
    defaultValues: {
      username: 'tungnt@softech.vn',
      password: '123456789', // Example default value
    },
  });

  const onSubmit = async (data: IFormInput): Promise<void> => {
    login({
      username: data.username,
      password: data.password,
      navigate: navigate,
    });
  };

  console.log('Login error:', error);

  return (
    <div className="flex justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">Login with Zustand</h2>

        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            id="username"
            type="text"
            {...register('username')}
            className={`w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 transition-colors ${
              errors.username
                ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                : !errors.username && dirtyFields.username
                ? 'border-green-500 focus:border-green-500 focus:ring-green-200'
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
            }`}
            placeholder="Enter your username"
          />
          {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register('password')}
            className={`w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 transition-colors ${
              errors.password
                ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                : !errors.password && dirtyFields.password
                ? 'border-green-500 focus:border-green-500 focus:ring-green-200'
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
            }`}
            placeholder="Enter your password"
          />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !isValid}
          className={`w-full py-2 rounded-md font-medium transition-colors ${
            isSubmitting || !isValid ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>

        {/* Form validation status indicator */}
        <div className="mt-4 text-center">
          <p className={`text-xs ${isValid ? 'text-green-500' : 'text-red-500'}`}>
            {isValid ? 'Form is valid ✓' : 'Please fill in all required fields correctly'}
          </p>
          {error && (
            <p className="text-red-500 text-xs mt-1">
              <span>Login failed</span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
}