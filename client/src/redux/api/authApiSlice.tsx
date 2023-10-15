import { apiSlice } from "./apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		register: builder.mutation({
			query: (data) => {
				return {
					url: `users/signup`,
					method: "POST",
					body: data.body,
					headers: {
						"Content-Type": "application/json",
						Accept: "application/json",
						"Access-Control-Allow-Origin": "*",
					},
				};
			},
		}),
		login: builder.mutation({
			query: (data) => {
				return {
					url: `users/login`,
					method: "POST",
					body: data.body,
					headers: {
						"Content-Type": "application/json",
						Accept: "application/json",
						"Access-Control-Allow-Origin": "*",
					},
				};
			},
		}),
	}),
});

export const { useRegisterMutation, useLoginMutation } = authApiSlice;
