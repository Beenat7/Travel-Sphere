import React from "react";
import { Box, Typography} from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
       
        padding: "20px",
        textAlign: "center",
      }}
    >
      <Typography variant="body2" sx={{ marginBottom: "10px" }}>
        © {new Date().getFullYear()} Beenatlay Tsehay. All rights reserved.
      </Typography>
     
    </Box>
  );
};

export default Footer;

