import { FilterQuery } from "mongoose"
import User from "../../db/models/user.model"
import { IUser, IUserDoc } from "../../db/interfaces/user/IUser"

async function createUser(input: IUser) {
  return User.create<IUser>(input)
}

async function findUser(query: FilterQuery<IUserDoc>, options: object) {
  return User.findOne(query, null, options)
}

async function loginUser({
  email,
  password,
}: {
  email: IUserDoc["email"]
  password: IUserDoc["password"]
}) {
  const user = await findUser({ email }, { lean: false })

  if (!user) {
    throw new Error("User does not exist")
  }

  return user.comparePassword(password)
}

export { createUser, findUser, loginUser }
