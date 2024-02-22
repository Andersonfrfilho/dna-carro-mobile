import { MaterialCommunityIcons } from "@expo/vector-icons";
import styled from "styled-components/native";

export const IconLogout = styled(MaterialCommunityIcons).attrs((props) => ({
  size: props.theme.icon.size.large,
  color: props.theme.colors.gray,
}))``;
