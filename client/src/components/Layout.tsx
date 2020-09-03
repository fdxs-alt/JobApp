import React, { PropsWithChildren } from 'react';
import Navbars from './Navbars/Navbars';

type Props = {};
const Layout: React.FC<PropsWithChildren<Props>> = ({ children }) => {
  return (
    <div>
      <Navbars />
      {children}
    </div>
  );
};

export default Layout;
