import * as React from "react";
import { Box } from "@mui/material";
import { PulseLoader } from "react-spinners";
import CircularProgress from "@mui/material/CircularProgress";

interface LoaderProps {
	color?: any;
	circle?: boolean;
	size?: number;
}

export default function Loader({ color, circle, size }: LoaderProps) {
	return (
		<Box
			sx={{
				padding: "5px",
			}}>
			{circle ? (
				<CircularProgress size={size} />
			) : (
				<PulseLoader color={color} size={10} />
			)}
		</Box>
	);
}
