import { Box } from "@mui/material";
import {styled} from '@mui/system'

const Wrapper = styled(Box)(({ theme }) => ({
    padding: "1.5rem 1.5rem 0.75rem 1.5rem",
    backgroundColor: "rgb(255, 255, 255)",
    borderRadius: "18px",
    boxShadow: "rgba(236, 176, 178, 0.8) 0px 4px 12px",
    color: "rgb(35, 35, 35)"

  }));

  export default Wrapper;