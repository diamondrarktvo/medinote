import Box from "./Box";
import { BoxProps } from "./Box";
import React from "react";

type RowProps = Omit<BoxProps, "flexDirection"> & {
  children: React.ReactNode;
};

const Row: React.FC<RowProps> = ({ children, ...rest }) => {
  return (
    <Box flexDirection={"row"} {...rest}>
      {children}
    </Box>
  );
};

export default Row;
