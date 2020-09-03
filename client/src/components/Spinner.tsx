import React from 'react';
import HashLoader from 'react-spinners/HashLoader';
import { css } from '@emotion/core';
type Props = {
  loading: boolean;
  size: number;
  small?: boolean;
};
const override = css`
  border-color: red;
  padding: 2rem 0;
  align-self: center;
`;
const Spinner: React.FC<Props> = ({ loading, size, small }) => {
  return !small ? (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <HashLoader
        loading={loading}
        size={size}
        css={override}
        color="#888888"
      />
    </div>
  ) : (
    <div
      style={{
        padding: '3rem',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <HashLoader
        loading={loading}
        size={size}
        css={override}
        color="#888888"
      />
    </div>
  );
};

export default Spinner;
