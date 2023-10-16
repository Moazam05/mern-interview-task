import { createSlice } from "@reduxjs/toolkit";

const getInitialUser = () => {
	if (typeof window !== "undefined") {
		const localStorageItems = localStorage.getItem("user");
		if (localStorageItems) {
			return JSON.parse(localStorageItems);
		}
	}
	return null;
};

const initialState = {
	user: getInitialUser(),
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setUser(state, action) {
			state.user = action.payload;
		},
	},
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
