import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
	reducerPath: "usersApi",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/" }),
	endpoints: builder => ({
		getAllUsers: builder.query({
			query: () => `users`,
			providesTags: (result, error) => [{ type: "Users", id: "LIST" }],
		}),
		getUserById: builder.query({
			query: id => id && `users/${id}`,
			providesTags: (result, error, id) => [{ type: "Users", id }],
		}),
	}),
});

export const { useGetAllUsersQuery, useGetUserByIdQuery } = usersApi;
