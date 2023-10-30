import styled, { css } from "styled-components/native";

interface ErrorProps {
  error?: string;
}

interface ContainerBorderProps extends ErrorProps {}

export const Container = styled.View`
  height: 100%;
  width: 100%;
`;

export const ContainerBorder = styled.View<ContainerBorderProps>`
  border-width: 5px;
  border-radius: 20px;
  border-color: ${(props) => props.theme.colors.transparent.blackGray};

  ${(props) => {
    return (
      !!props.error &&
      css`
        border-color: ${props.theme.colors.errors.whiteRed};
      `
    );
  }}
`;

export const ContainerLabel = styled.View`
  height: 20px;

  padding-left: 15px;
`;

export const Label = styled.Text`
  color: ${(props) => props.theme.colors.errors.red};
  text-align: left;
`;

export const ButtonBorder = styled.View<ContainerBorderProps>`
  width: 100%;
  height: 100%;

  border-width: 5px;
  border-color: ${(props) => props.theme.colors.backgroundColor};
  border-radius: 15px;

  background-color: ${(props) => props.theme.colors.transparent.highlightColor};

  ${(props) => {
    return (
      !!props.error &&
      css`
        border-color: ${props.theme.colors.errors.red};
      `
    );
  }}
`;

export const Button = styled.TouchableHighlight.attrs((props) => ({
  underlayColor: props.theme.colors.transparent.persianBlue,
}))`
  background-color: ${(props) => props.theme.colors.backgroundColor};

  width: 100%;
  height: 100%;

  justify-content: center;
  align-items: center;

  border-radius: 24px;
  border-width: 4px;
  border-color: ${(props) => props.theme.colors.lightGray};
`;

export const Title = styled.Text`
  font-family: ${(props) => props.theme.fonts["Lato-Bold"]};
  font-size: ${(props) => props.theme.fontSizes.medium};
  color: ${(props) => props.theme.colors.background};
  text-align: center;
`;
