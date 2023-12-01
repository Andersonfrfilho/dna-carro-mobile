import styled from "styled-components/native";

export const Container = styled.View`
  height: 100%;
  width: 100%;
`;

export const LoadingComponent = styled.ActivityIndicator.attrs((props) => ({
  size: props.size,
  color: props.color,
}))``;
