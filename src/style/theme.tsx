import React from "react";
import { ThemeProvider } from "styled-components";

export const theme = {
  colors: {
    primary: "#473D33",
    secondary: "#EA8600",
    powderWhite: "#FFFDF9",
    persianGreen: "#06B49A",
    lightBlue: "#AFDBD2",
    onyx: "#36313D",
    background: "#3A3128",
    primaryColor: '#3498db', // Azul
    backgroundColor: '#ffffff', // Branco
    accentColor: '#27ae60', // Verde
    secondaryColor: '#666666', // Cinza
    highlightColor: '#f39c12', // Amarelo ou laranja (cor de destaque)
  },
  fonts: {
    'Lato-Black': 'Lato-Black',
    'Helvetica-Neue-Medium-Extended': 'Helvetica-Neue-Medium-Extended',
    'Helvetica-Neue-UltraLight': 'Helvetica-Neue-UltraLight',
    'Lato-Light': 'Lato-Light',
    'Lato-Regular': 'Lato-Regular',
    'Lato-ThinItalic': 'Lato-ThinItalic',
    'Lato-BlackItalic': 'Lato-BlackItalic',
    'Lato-Thin': 'Lato-Thin',
    'Roboto-Bold': 'Roboto-Bold',
    'Lato-BoldItalic': 'Lato-BoldItalic',
    'Roboto-Light': 'Roboto-Light',
    'Lato-Bold': 'Lato-Bold',
    'Roboto-Regular': 'Roboto-Regular',
    'Lato-Italic': 'Lato-Italic',
    'Roboto-Thin': 'Roboto-Thin',
    'Lato-LightItalic': 'Lato-LightItalic',
  },
  fontSizes: {
    small: "1em",
    medium: "2em",
    large: "3em",
  },
};

const darkTheme = {
  PRIMARY_COLOR: '#000',
  SECONDARY_COLOR: '#73737d',
  TITLE_COLOR: '#fff',
  BACKGROUND_COLOR: '#111216',
  BUTTON_COLOR: '#fff',
};
const lightTheme = {
  PRIMARY_COLOR: '#fff',
  SECONDARY_COLOR: '#73737d',
  TITLE_COLOR: '#000',
  BACKGROUND_COLOR: '#fff',
  BUTTON_COLOR: '#000',
};

const Theme = ({ children }) => {
  return (<ThemeProvider theme={theme}>{children}</ThemeProvider>)
}


export default Theme;
