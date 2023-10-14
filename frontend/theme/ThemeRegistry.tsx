"use client";

import { createTheme, ThemeOptions, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Provider } from "react-redux";
import { store } from "../src/redux/store";

const themeOptions: ThemeOptions = {
	typography: {
		fontFamily: "Open Sans Variable, sans-serif",
	},
};

const theme = createTheme(themeOptions);

export default function ThemeRegistry({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				{children}
			</ThemeProvider>
		</Provider>
	);
}
