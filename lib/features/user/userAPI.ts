import api from "@/lib/config";
import { User } from "@/types";

const USER_API_URL = "http://localhost:3000/api/user";

export const getAllUsersRequest = async () => {
  const res = await api.get(`${USER_API_URL}`);
  const result: User[] = await res.data;
  return result;
};

export const loginUserRequest = async (username: string) => {
  const res = await api.get(`${USER_API_URL}/${username}`);
  const result: User = await res.data;
  if (result === null) {
    const user: User = {
      username: username,
      password: "123",
      favExercise: "none",
    };
    const res2 = await api.post(`${USER_API_URL}`, user);
    const result2: User = await res2.data;
    return result2;
  }
  return result;
};

export const createUserRequest = async (
  username: string,
  password: string,
  favExercise: string
) => {
  const user: User = {
    username: username,
    password: password,
    favExercise: favExercise,
  };
  const res = await api.post(`${USER_API_URL}`, user);
  const result: User = await res.data;
  return result;
};

export const deleteUserRequest = async (username: string) => {
  const res = await api.delete(`${USER_API_URL}?username=${username}`);
  const result: { acknowledged: boolean; deletedCount: number } =
    await res.data;
  return result;
};
