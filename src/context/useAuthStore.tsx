// import React, { createContext, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// interface User {
//   id: number;
//   username: string;
//   token: string;
// }

// interface AuthContextType {
//   user: User | null;
//   login: (username: string, password: string) => Promise<boolean>;
//   logout: () => void;
// }

// export const AuthContext = createContext<AuthContextType>({
//   user: null,
//   login: async () => false,
//   logout: () => {},
// });

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);
//   // const navigate = useNavigate();
// ///lưu lại trạng thái đăng nhập khi tải lại trang
//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);
//  //API login
//   const login = async (username: string, password: string): Promise<boolean> => {
//     try {
//       const response = await fetch('https://server.aptech.io/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ username, password }),
//       });

//       if (!response.ok) {
//         throw new Error('Đăng nhập thất bại');
//       }

//       const data = await response.json();
//       const newUser = {id: data.loggedInUser.id, username: data.loggedInUser.email, token: data.access_token };
//       setUser(newUser);
//       localStorage.setItem('user', JSON.stringify(newUser));
//       return true;
//     } catch (error) {
//       console.error('Lỗi đăng nhập:', error);
//       return false;
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem('user');
//     // navigate('/',{ replace: true });
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NavigateFunction } from 'react-router';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { apiClient } from '../libraries/api-client';

export interface LoggedInUser {
  id: string | number;
  email: string;
  isActive: boolean;
  roles: [
    {
      id: string | number;
      name: string;
    }
  ];
}

export interface AuthState {
  access_token?: string;
  refresh_token?: string;
  loggedInUser?: LoggedInUser;
  loading: boolean;
  error: any;
  login: ({ username, password, navigate }: { username: string; password: string; navigate: NavigateFunction }) => Promise<void>;
  logOut: () => Promise<void>;
  changeAccessToken: () => Promise<void>;
  changeRefreshToken: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => {
        return {
          access_token: undefined,
          refresh_token: undefined,
          loggedInUser: undefined,
          loading: false,
          error: null,
          login: async ({ username, password, navigate }) => {
            try {
              set(
                {
                  loggedInUser: undefined,
                  access_token: undefined,
                  refresh_token: undefined,
                  error: null,
                  loading: true,
                },
                false,
                { type: '@AUTH/LOGIN/LOADING' }
              );

              const response: any = (await apiClient.post('/auth/login', { username, password })) as any;

              set(
                {
                  access_token: response.access_token,
                  refresh_token: response.refresh_token,
                  loggedInUser: response.loggedInUser,
                  loading: false,
                  error: null,
                },
                false,
                { type: '@AUTH/LOGIN/SUCCESS' }
              );
              navigate('/tasks');
            } catch (error) {
              set({ error, access_token: undefined, refresh_token: undefined, loggedInUser: undefined }, false, {
                type: '@AUTH/LOGIN/ERROR',
              });
            }
          },

          logOut: async () => {
            set({ access_token: undefined, refresh_token: undefined, loggedInUser: undefined });
          },

          changeAccessToken: async () => {
            set(
              {
                access_token:
                  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJ0dW5nbnRAc29mdGVjaC52biIsImVtYWlsIjoidHVuZ250QHNvZnRlY2gudm4iLCJzdWIiOjEsImFwcGxpY2F0aW9uIjoiT25saW5lIFNob3AgLSBBUEkiLCJyb2xlcyI6W3siaWQiOjEsIm5hbWUiOiJBZG1pbmlzdHJhdG9ycyJ9LHsiaWQiOjIsIm5hbWUiOiJNYW5hZ2VycyJ9XSwiaWF0IjoxNzUyNjYzMjIzLCJleHAiOjE3ODQyMjA4MjN9._SjS09sdc-BWc_7tOINhEfvfYZ2X1QvwtEyc3E8OCXX',
              },
              false,
              { type: '@AUTH/CHANGE_ACCESS_TOKEN' }
            );
          },
          changeRefreshToken: async () => {
            set(
              {
                refresh_token:
                  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzUyNjYzMjIzLCJleHAiOjE3NTMyNjgwMjN9.ATl3GcFXhrr3WUb8BEPU3PdrCbDfutdUoY1P4l7w_Zd',
              },
              false,
              { type: '@AUTH/CHANGE_REFRESH_TOKEN' }
            );
          },
        };
      },
      {
        name: 'auth-storage',
      }
    )
  )
);