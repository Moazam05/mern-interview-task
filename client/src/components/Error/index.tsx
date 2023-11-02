import * as React from "react";
import { Typography } from "@mui/material";

type Props = {
  children?: React.ReactNode;
  sx?: any;
};

export default function Errors(props: Props) {
  const { sx } = props;
  return (
    <Typography component="p" sx={[sx]}>
      {props.children}
    </Typography>
  );
}
