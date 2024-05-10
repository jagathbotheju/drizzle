import { relations } from "drizzle-orm";
import { integer, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  fullName: text("full_name"),
  phone: varchar("phone", { length: 256 }),
  address: varchar("address", { length: 256 }),
  score: integer("score"),
});

export const profile = pgTable("profile", {
  id: serial("id").primaryKey(),
  bio: varchar("bio", { length: 256 }),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
});

export const post = pgTable("post", {
  id: serial("id").primaryKey(),
  text: varchar("text", { length: 256 }),
  authorId: integer("author_id")
    .notNull()
    .references(() => users.id),
});

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
});

export const postOnCategories = pgTable(
  "post_categories",
  {
    postId: integer("post_id")
      .notNull()
      .references(() => post.id),
    categoryId: integer("category_id")
      .notNull()
      .references(() => categories.id),
  }
  // (t) => ({
  //   pk: primaryKey(t.categoryId.id, t.postId.id),
  // })
);

export const userRelations = relations(users, ({ one, many }) => ({
  profile: one(profile, {
    fields: [users.id],
    references: [profile.userId],
  }),
  post: many(post),
}));

export const postRelations = relations(post, ({ one, many }) => ({
  author: one(users, {
    fields: [post.authorId],
    references: [users.id],
  }),

  postCategories: many(postOnCategories),
}));

export const categoryRelations = relations(categories, ({ many }) => ({
  posts: many(postOnCategories),
}));

export const postOnCategoriesRelations = relations(
  postOnCategories,
  ({ one }) => ({
    post: one(post, {
      fields: [postOnCategories.postId],
      references: [post.id],
    }),

    category: one(categories, {
      fields: [postOnCategories.categoryId],
      references: [categories.id],
    }),
  })
);
