import { apiSlice } from "./apiSlice";

export const carApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCar: builder.mutation({
      query: (data) => {
        return {
          url: `cars`,
          method: "POST",
          body: data.body,
          // headers: {
          //   "Content-Type": "application/json",
          //   Accept: "application/json",
          //   "Access-Control-Allow-Origin": "*",
          // },
        };
      },
    }),
  }),
});

export const { useCreateCarMutation } = carApiSlice;
