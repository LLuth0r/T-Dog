import { extendTheme } from '@mui/joy';

declare module '@mui/joy/styles' {
  interface Palette {
    primary: {
      "50": string;
      "100": string;
      "200": string;
      "300": string;
      "400": string;
      "500": string;
      "600": string;
      "700": string;
      "800": string;
      "900": string;
      main: string;
      light: string;
      dark: string;
      background: string;
      contrastText: string;
    };
  }
}

declare module '@mui/joy/styles' {
  interface TypographySystem {
    hero: string;
    fontFamily: string;
  }
}

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          "50": "#EEEEF0",
          "100": "#E6F6B3",
          "200": "#E6F6B3",
          "300": "#dff470",
          "400": "#D7F460",
          "500": "#DFFF4F",
          "600": "#79883E",
          "700": "#6C793C",
          "800": "#4C523A",
          "900": "#41433A",
          main: "#DFFF4F",
          light: "#F8FDF7",
          dark: "#2C2C2D",
          background: "#38472F",
          contrastText: "#1E1F24",
        },
      },
    },
    dark: {
      palette: {
        primary: {
      "50": "#EEEEF0",
          "100": "#E6F6B3",
          "200": "#E6F6B3",
          "300": "#dff470",
          "400": "#D7F460",
          "500": "#DFFF4F",
          "600": "#79883E",
          "700": "#6C793C",
          "800": "#4C523A",
          "900": "#41433A",
          main: "#DFFF4F",
          light: "#F8FDF7",
          dark: "#2C2C2D",
          background: "#38472F",
          contrastText: "#F9F9FB",
        },
      },
    },
  },
  typography: {
    hero: "'Audiowide', sans-serif",
    fontFamily: "Roboto, var(--joy-fontFamily-fallback)",
  },
  spacing: 3,
});

export default theme;