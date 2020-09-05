import React, { PropsWithChildren } from 'react';
import Navbars from './Navbars/Navbars';
import Footer from './Footer';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
type Props = {};
const Layout: React.FC<PropsWithChildren<Props>> = ({ children }) => {
  return (
    <Container>
      <Navbars />
      <div style={{ minHeight: '100vh' }}>{children}</div>
      <Footer />
    </Container>
  );
};

export default Layout;
