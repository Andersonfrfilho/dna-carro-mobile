import "styled-components/native";
import { theme } from "./src/style/theme.style";
type CustomTheme = typeof theme;
declare module "styled-components/native" {
  export interface DefaultTheme extends CustomTheme {}
}
