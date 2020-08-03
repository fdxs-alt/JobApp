import styled from 'styled-components';

interface MyButtonProps {
  readonly width?: number;
}
export const MyButton = styled.button<MyButtonProps>`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
  width: ${(props) => (props.width ? props.width + '%' : '20%')};
  font-size: 1.2rem;
  background-color: ${(props) => props.theme.colors.button};
  border: none;
  color: white;
  padding: 1.2rem;
  font-weight:600;
`;