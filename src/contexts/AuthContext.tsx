import { UserDTO } from "@dtos/UserDTO";
import { createContext, ReactNode } from "react";

export type AuthConteDataProps = {
  user: UserDTO;
}

type AuthContexProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext<AuthConteDataProps>({} as AuthConteDataProps);

export function AuthContexProvider({ children }: AuthContexProviderProps) {
  return (
      <AuthContext.Provider value={{ 
        user: {
          id: '1',
          name: 'Lucas',
          email: 'Wl0yO@example.com',
          avatar: 'https://github.com/lucasrgtic.png'
        }
      }}>
        {children}
      </AuthContext.Provider>
  );
}