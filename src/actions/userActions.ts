"use server";

import { db } from "@/db";
import {
  users,
  profile,
  post,
  categories,
  postOnCategories,
} from "@/db/schema";
import { eq } from "drizzle-orm";

export const manyToMany = async () => {
  const newUser = await db
    .insert(users)
    .values({
      address: "street-2",
      fullName: "user -4",
      phone: "883838383",
      score: 88,
    })
    .returning({ userId: users.id });

  const userId = newUser[0].userId;

  const newCats = await db
    .insert(categories)
    .values([{ name: "cat-1" }, { name: "cat-2" }])
    .returning({ catId: categories.id });

  const newPosts = await db
    .insert(post)
    .values([
      {
        authorId: userId,
        text: "post-21",
      },
      {
        authorId: userId,
        text: "post-22",
      },
    ])
    .returning({ postId: post.id });

  await db
    .insert(postOnCategories)
    .values([
      {
        postId: newPosts[0].postId,
        categoryId: newCats[0].catId,
      },
      {
        postId: newPosts[0].postId,
        categoryId: newCats[1].catId,
      },
      {
        postId: newPosts[1].postId,
        categoryId: newCats[0].catId,
      },
    ])
    .execute();
};

export const createUserWithManyPosts = async () => {
  const newUser = await db
    .insert(users)
    .values({
      address: "street-2",
      fullName: "user -4",
      phone: "883838383",
      score: 88,
    })
    .returning({ userId: users.id });

  const userId = newUser[0].userId;

  ["post-1", "post-2"].forEach(
    async (postItem) =>
      await db.insert(post).values({
        authorId: userId,
        text: postItem,
      })
  );
};

export const createUserWithProfile = async () => {
  const newUser = await db
    .insert(users)
    .values({
      address: "street-1",
      fullName: "Menula",
      phone: "883838383",
      score: 55,
    })
    .returning({ userId: users.id });

  await db
    .insert(profile)
    .values({
      userId: newUser[0].userId,
      bio: "I am a programmer",
    })
    .execute();

  const result = await db.query.users.findFirst({
    where: eq(users.id, newUser[0].userId),
    with: {
      profile: true,
    },
  });

  return result;
};

export const createUser = async () => {
  const newUser = await db
    .insert(users)
    .values({
      address: "street-1",
      fullName: "Jagath",
      phone: "883838383",
      score: 33,
    })
    .returning();

  return newUser;
};

export const getUserById = async (id: number) => {
  const user = await db.select().from(users).where(eq(users.id, id));
  return user;
};

export const userWithProfile = async () => {
  const userWithProfile = await db.query.users.findFirst({
    with: {
      profile: true,
    },
  });
  return userWithProfile;
};
