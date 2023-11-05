import { Box, Typography, useTheme, useMediaQuery } from '@mui/material'
import Form from './form';

const Login = () => {
    const theme = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    return (
      <Box>
        <Box
          width="100%"
          backgroundColor="white"
          p="1rem 6%"
          textAlign="center"
          boxShadow="rgba(236, 176, 178, 0.8) 0px 4px 12px"
          borderRadius="0 0 30px 30px"
        >
          <Typography fontWeight="bold" fontSize="32px" color='rgb(242, 138, 86)'>
            UBC Car Share
          </Typography>
        </Box>
  
        <Box
          width={isNonMobileScreens ? "50%" : "93%"}
          p="2rem"
          m="2rem auto"
          borderRadius="1.5rem"
          backgroundColor="white"
          boxShadow="rgba(236, 176, 178, 0.8) 0px 4px 12px"
        >
          <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
            Welcome to UBC Care Share, where you can find ways to get to class!
          </Typography>
          <Form />
        </Box>
      </Box>
    );
  };

export default Login;