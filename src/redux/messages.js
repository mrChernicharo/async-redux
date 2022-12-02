import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const messagesApi = createApi({
	reducerPath: "messagesApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/" }),
	endpoints: builder => ({
		getAllMessages: builder.query({
			query: () => `messages`,
			providesTags: (result, error) => ["messages"],
		}),
		getChatMessages: builder.query({
			query: chatId => `chat-messages/${chatId}`,
			providesTags: (result, error, chatId) => [{ type: "messages", chatId }],
		}),
	}),
});

export const { useGetAllMessagesQuery, useGetChatMessagesQuery } = messagesApi;
