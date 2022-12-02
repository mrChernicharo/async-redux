import { configureStore } from "@reduxjs/toolkit";
import { chatsApi } from "./chats";
import { usersApi } from "./users";
import { messagesApi } from "./messages";

export const store = configureStore({
	reducer: {
		[usersApi.reducerPath]: usersApi.reducer,
		[chatsApi.reducerPath]: chatsApi.reducer,
		[messagesApi.reducerPath]: messagesApi.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(
			usersApi.middleware,
			chatsApi.middleware,
			messagesApi.middleware
		),
});
