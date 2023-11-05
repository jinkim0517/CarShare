import { createTheme } from "@mui/material/styles";


export const themeSettings = createTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
         body: {
           background: 'linear-gradient(to right, #FF416C, #FF4B2B)',
           backgroundRepeat: "no-repeat",
           backgroundAttachment: "fixed",
        },
      },
    },
  },
      palette: {
        mode: 'light',
        primary: {
          dark: '#99EEFD',
          main: '#00D5FA',
          light: '#00353F',
        },
        neutral: {
          dark: '#E0E0E0',
          main: 'rgb(35, 35, 35)',
          mediumMain: '#A3A3A3',
          medium: 'rgb(35, 35, 35)',
          light: '#333333',
        },
        background: {
          default: '#0A0A0A',
          alt: '#1A1A1A',
        },
      },
    typography: {
      fontFamily: ["Roboto", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Roboto", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Roboto", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Roboto", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Roboto", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Roboto", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Roboto", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  });

export default themeSettings
