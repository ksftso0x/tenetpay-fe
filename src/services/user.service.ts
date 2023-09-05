import api from "../lib/axios";

export const getUserHome = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await api.get("/v1/users/get-user-home", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      resolve(data.data.data);
    } catch (error) {
      reject(error);
    }
  });
};

export const getProfileData = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await api.get("/v1/users/get-user-data", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      resolve(data.data.data);
    } catch (error) {
      reject(error);
    }
  });
};
