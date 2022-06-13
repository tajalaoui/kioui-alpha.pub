import { FilterQuery, ObjectId } from "mongoose"
import Post from "../db/models/post.model"
import { IPost } from "../interfaces/IPost"

// export async function createPost(input: IPost) {
//   return Post.create<IPost>(input)
// }

export async function createPost(user: string, content: string) {
  // return await Post.create({ content, user })
 
  const post = new Post({ content, user })
  return await post.save()
}

export async function findPosts() {
  return Post.find().populate("user", "_id username").select("content createdAt")
}

export async function findPost(query: FilterQuery<unknown>, options?: object, leanValue = false) {
  return Post.findOne(query, options).lean(leanValue)
}
