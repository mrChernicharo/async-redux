import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const chatsApi = createApi({
	reducerPath: "chatsApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/" }),
	endpoints: builder => ({
		getAllChats: builder.query({
			query: () => `chats`,
			providesTags: (result, error) => ["Chats"],
		}),
		getUserChats: builder.query({
			query: userId => userId && `user-chats/${userId}`,
			providesTags: (result, error, userId) => [{ type: "Chats", userId }],
		}),
	}),
});

export const { useGetAllChatsQuery, useGetUserChatsQuery } = chatsApi;
