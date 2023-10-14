"use client";

import { createTheme, ThemeOptions, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

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
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	);
}
