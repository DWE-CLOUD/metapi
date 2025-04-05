import { pgTable, serial, varchar, timestamp, boolean, text, integer } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

// API Keys table
export const apiKeys = pgTable("api_keys", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  key: varchar("key", { length: 255 }).notNull().unique(),
  type: varchar("type", { length: 50 }).notNull(), // 'read', 'write', or 'full'
  createdAt: timestamp("created_at").defaultNow(),
  lastUsed: timestamp("last_used"),
})

// Channels table
export const channels = pgTable("channels", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  isPublic: boolean("is_public").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

// Channel fields table
export const channelFields = pgTable("channel_fields", {
  id: serial("id").primaryKey(),
  channelId: integer("channel_id").references(() => channels.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  type: varchar("type", { length: 50 }).notNull(), // 'number', 'string', 'boolean', etc.
  createdAt: timestamp("created_at").defaultNow(),
})

// Channel data table
export const channelData = pgTable("channel_data", {
  id: serial("id").primaryKey(),
  channelId: integer("channel_id").references(() => channels.id, { onDelete: "cascade" }),
  timestamp: timestamp("timestamp").defaultNow(),
  field1: text("field1"),
  field2: text("field2"),
  field3: text("field3"),
  field4: text("field4"),
  field5: text("field5"),
  field6: text("field6"),
  field7: text("field7"),
  field8: text("field8"),
  latitude: text("latitude"),
  longitude: text("longitude"),
  elevation: text("elevation"),
  status: text("status"),
  createdAt: timestamp("created_at").defaultNow(),
})

// Define relationships
export const usersRelations = relations(users, ({ many }) => ({
  apiKeys: many(apiKeys),
  channels: many(channels),
}))

export const channelsRelations = relations(channels, ({ one, many }) => ({
  user: one(users, {
    fields: [channels.userId],
    references: [users.id],
  }),
  fields: many(channelFields),
  data: many(channelData),
}))

export const channelFieldsRelations = relations(channelFields, ({ one }) => ({
  channel: one(channels, {
    fields: [channelFields.channelId],
    references: [channels.id],
  }),
}))

export const channelDataRelations = relations(channelData, ({ one }) => ({
  channel: one(channels, {
    fields: [channelData.channelId],
    references: [channels.id],
  }),
}))

