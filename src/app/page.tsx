import {
  getUserById,
  userWithProfile,
  createUser,
  createUserWithProfile,
  createUserWithManyPosts,
  manyToMany,
} from "@/actions/userActions";
import { db } from "@/db";
import { users } from "@/db/schema";

export default async function Home() {
  const res = await db.select().from(users);
  const user = await userWithProfile();
  console.log("userWithProfile", user);

  const newUserWithPosts = await manyToMany();
  // console.log("newUser", newUserWithPosts);

  return (
    <div className="container mx-auto">
      <h1>Users</h1>
      <p>{JSON.stringify(res)}</p>
    </div>
  );
}
