import styled from 'styled-components';

export const Section = styled.form`
  width: 100%;
  background-color: ${(props) => props.theme.colors.dark};
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
`;
export const Title = styled.h1`
  color: white;
  font-size: 2.4rem;
  font-weight: 500;
  padding: 0.8rem;
`;
export const Container = styled.div`
  width: 40%;
  display: flex;
  padding: 0.5rem;
`;
export const SearchInput = styled.input`
  width: 75%;
  padding: 0.8rem;
  font-size: 1.2rem;
`;
