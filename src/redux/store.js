import { configureStore } from "@reduxjs/toolkit";
import { chatsApi } from "./chats";
import { usersApi } from "./users";

export const store = configureStore({
	reducer: {
		[usersApi.reducerPath]: usersApi.reducer,
		[chatsApi.reducerPath]: chatsApi.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(usersApi.middleware, chatsApi.middleware),
});
