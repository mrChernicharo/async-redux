import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
	preloadedState: {
		user: {},
		preferences: {},
		chats: {},
	},
	reducer: {},
});
