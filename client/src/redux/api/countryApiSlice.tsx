import { apiSlice } from "./apiSlice";

export const countryApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getCountry: builder.query({
			query: (data) => {
				return {
					url: `country/${data.countryName}`,
					method: "GET",
				};
			},
		}),
	}),
});

export const { useGetCountryQuery } = countryApiSlice;
