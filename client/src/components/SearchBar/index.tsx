import React from "react";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
interface searchBarProps {
	searchText?: any;
	placeholder?: any;
	handleSearch?: any;
}

export default function Search({
	handleSearch,
	placeholder,
	searchText,
}: searchBarProps) {
	const handleKeyDown = (event: any) => {
		if (event.key === "Enter") {
			handleSearch(event);
		}
	};

	React.useEffect(() => {
		if (searchText) {
			const input: any = document.getElementById("outlined-basic");
			if (input) {
				input.value = searchText;
			}
		}
	}, [searchText]);

	return (
		<TextField
			sx={{
				width: "100%",
				backgroundColor: (theme: any) => theme.palette.primary.contrastText,
				borderRadius: "5px",
			}}
			fullWidth
			onKeyDown={handleKeyDown}
			id="outlined-basic"
			variant="outlined"
			placeholder={
				placeholder
					? placeholder
					: `Search Patient by Name, Mobile, MR No. or ID No.`
			}
			InputProps={{
				sx: {
					borderRadius: "5px",
					background: "#fff",
					height: "50px",
					border: "none",
				},
				startAdornment: (
					<InputAdornment position="start">
						<SearchIcon
							sx={{
								color: "#C5C5C5",
							}}
						/>
					</InputAdornment>
				),
			}}
		/>
	);
}
