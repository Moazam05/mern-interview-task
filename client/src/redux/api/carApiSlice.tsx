import { apiSlice } from "./apiSlice";

export const carApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCar: builder.mutation({
      query: (data) => {
        return {
          url: `cars`,
          method: "POST",
          body: data.body,
        };
      },
      invalidatesTags: ["Cars"],
    }),
    getAllCars: builder.query({
      query: (data) => {
        return {
          url: `cars`,
          method: "GET",
        };
      },
      providesTags: ["Cars"],
    }),
  }),
});

export const { useCreateCarMutation, useGetAllCarsQuery } = carApiSlice;
