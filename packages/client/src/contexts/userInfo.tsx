import { User } from 'domain/types/user';
import React, { createContext, FC, ReactNode, useContext, useState } from 'react';

interface UserValue {
  userInfo: User | undefined;
  setUserInfo: React.Dispatch<React.SetStateAction<User | undefined>>;
}

const UserContext = createContext<UserValue>({} as UserValue);

export const useUserInfo = () => useContext(UserContext);

interface Props {
  children: ReactNode;
}

const UserInfoProvider: FC<Props> = ({ children }) => {
  const [userInfo, setUserInfo] = useState<User | undefined>({} as User);

  return <UserContext.Provider value={{ userInfo, setUserInfo }}>{children}</UserContext.Provider>;
};

export default UserInfoProvider;
