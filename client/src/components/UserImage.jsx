import { Box } from "@mui/material";

const UserImage = ({ image, size = "60px" }) => {
  const BASE_URL = import.meta.env.PROD ? import.meta.env.VITE_PROD_URL : import.meta.env.VITE_LOCAL_URL ;
  const imgSource = `${BASE_URL}/assets/${image}`
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={imgSource}
      />
    </Box>
  );
};

export default UserImage;