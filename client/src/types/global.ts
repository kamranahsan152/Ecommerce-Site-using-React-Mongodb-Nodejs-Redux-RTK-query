export const GetToken = () => {
  const authToken = localStorage.getItem("auth-token");
  return authToken || "";
};

export const useToken = () => {
  const userToken = localStorage.getItem("user-token");
  return userToken || "";
};
