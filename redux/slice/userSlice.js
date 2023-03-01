import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	theme: "light",
};

const userSlice = createSlice({
	initialState,
	name: "user",
	reducers: {
		toggleTheme: (state, action) => {
			return {
				...state,
				theme: action.payload.theme === "dark" ? "light" : "dark",
			};
		},
	},
});

export const { toggleTheme } = userSlice.actions;
const userReducer = userSlice.reducer;
export default userReducer;
