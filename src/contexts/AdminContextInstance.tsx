import { createContext } from 'react';
import { AdminState, AdminAction } from './AdminContext';

export const AdminContext = createContext<{
  state: AdminState;
  dispatch: React.Dispatch<AdminAction>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
} | undefined>(undefined);
