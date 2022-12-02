import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const messagesApi = createApi({
	reducerPath: "messagesApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/" }),
	endpoints: builder => ({
		getAllMessages: builder.query({
			query: () => `messages`,
			providesTags: (result, error) => ["Messages"],
		}),
		getChatMessages: builder.query({
			query: chatId => `chat-messages/${chatId}`,
			providesTags: (result, error, chatId) => [{ type: "Messages", chatId }],
		}),
		postMessage: builder.mutation({
			query: body => ({
				url: `messages/${body.userId}`,
				method: "POST",
				body,
			}),
		}),
	}),
});

export const { useGetAllMessagesQuery, useGetChatMessagesQuery, usePostMessageMutation } =
	messagesApi;
