import server from "@/server";


const userApis = {

  loginUser: async (url: string, payload: object) => {
    const response = await server.post(url, payload)
    return response
  },

  getUserList: async (url: string, params: object = {}) => {
    const response = await server.get(url, { params });
    return response
  },

  deleteUser: async (url: string) => {
    return await server.delete(url);
  },

  createUser: async (url: string, payload: object) => {
    const response = await server.post(url, payload)
    return response
  },

  updateUser: async (url: string, payload: object) => {
    return await server.put(url, payload);
  },
};

export default userApis;
