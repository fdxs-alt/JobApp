import styled from 'styled-components';

interface MyButtonProps {
  readonly width?: number;
}
export const MyButton = styled.button<MyButtonProps>`
  width: ${(props) => (props.width ? props.width + '%' : '20%')};
  font-size: 1.2rem;
  background-color: ${(props) => props.theme.colors.button};
  border: none;
  color: white;
  padding: 1.2rem;
  font-weight: 600;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }
`;
