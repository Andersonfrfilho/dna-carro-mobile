import React from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { ThemeProvider } from "styled-components";

export const theme = {
  colors: {
    dark: "#000000",
    primary: "#473D33",
    lightGray: "#D3D3D3",
    silver: "#C0C0C0",
    darkGray: "#A9A9A9",
    gray: "#808080",
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
    errors: {
      darkRed: '#cd0000',
      red: '#FF0000',    // Vermelho
      whiteRed: '#ff6767',
      orange: '#FFA500', // Laranja
      yellow: '#FFFF00', // Amarelo
      purple: '#800080', // Roxo
      brown: '#8B4513',  // Marrom
      darkGray: '#333',  // Cinza Escuro ou Preto
    },
    transparent: {
      highlightColor: 'rgba(256, 256, 200, 0.8)',
      secondary: 'rgba(234, 134, 0, 0.3)',
      persianBlue: 'rgba(18, 87, 104, 0.4)',
      onyx: 'rgba(0, 0, 0, 0.8)',
      blackGray: 'rgba(0, 0, 0, 0.2)'
    }
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
    small: `${RFValue(12)}px`,
    medium: `${RFValue(14)}px`,
    large: `${RFValue(18)}px`,
    subTitle: `${RFValue(24)}px`,
    title: `${RFValue(28)}px`,
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
