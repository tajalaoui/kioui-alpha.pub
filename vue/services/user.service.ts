import { Ref } from "vue"
import { IUser } from "../../interfaces/models/IUser"
import { AxiosResponse } from "axios"
import axios from "./axios"

async function getUsersService(): Promise<AxiosResponse<IUser[]>> {
  return await axios.get("/user")
}

async function getUserService(id: string): Promise<AxiosResponse<IUser>> {
  // return await axios.get(`/user/${id}`)
  return await axios.get(`/user`, { params: { id } })
}

async function loginUserService(userData: object): Promise<AxiosResponse<IUser>> {
  // return await axios.get(`/user/${id}`)
  return await axios.post(`/user/login`, userData)
}

async function createUserService(user: object): Promise<AxiosResponse> {
  return await axios.post("/user", user)
}

async function updateUserService(id: string, newTask: IUser): Promise<AxiosResponse<IUser>> {
  return await axios.put(`/user/${id}`, newTask)
}

async function deleteUserService(id: string): Promise<AxiosResponse> {
  return await axios.delete(`/user/${id}`)
}

export {
  getUsersService,
  getUserService,
  loginUserService,
  createUserService,
  updateUserService,
  deleteUserService,
}
