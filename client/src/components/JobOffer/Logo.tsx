import React, { useCallback } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_COMPANY_LOGO } from '../../Graphql/Queries';
import { useDropzone } from 'react-dropzone';
import { ADD_LOGO, DELETE_LOGO } from '../../Graphql/CompanyMutations';
import { encode } from 'base64-arraybuffer';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {
  ImageInputContainer,
  LogoImage,
} from '../../styles/CompanyProfileStyle';
import Spinner from '../Spinner';
import ConfirmationModal from '../shared/ConfirmationModal';

type Props = {
  id: number;
};
const Logo: React.FC<Props> = ({ id }) => {
  const { data, loading } = useQuery(GET_COMPANY_LOGO, { variables: { id } });

  const [addLogo] = useMutation(ADD_LOGO);
  const [deleteLogo] = useMutation(DELETE_LOGO, {
    variables: { id },
    refetchQueries: [{ query: GET_COMPANY_LOGO, variables: { id } }],
  });
  const onDrop = useCallback(
    async ([file]) => {
      await addLogo({
        variables: {
          id,
          file,
        },
        refetchQueries: [{ query: GET_COMPANY_LOGO, variables: { id } }],
      });
    },
    [addLogo, id],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png',
  });

  const handleClick = async (onClose: () => void) => {
    await deleteLogo();
    onClose();
  };
  const handleSubmit = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <ConfirmationModal
            deleteText="Yes"
            title="Are you sure?"
            confirmationText="Do you really want to delete the logo?"
            handleClick={handleClick}
            onClose={onClose}
          />
        );
      },
    });
  };
  if (loading) return <Spinner size={50} loading={loading} small />;
  else if (!data.getCompanyLogo) {
    return (
      <ImageInputContainer {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Add your logo</p>
        ) : (
          <p>Drag 'n' drop image, to add logo</p>
        )}
      </ImageInputContainer>
    );
  } else
    return (
      <>
        {data.getCompanyLogo && (
          <div>
            {data.getCompanyLogo.type === 'image/png' && (
              <div onClick={handleSubmit}>
                <LogoImage
                  alt="Job offer"
                  src={`data:image/png;base64, ${encode(
                    data.getCompanyLogo.data,
                  )}`}
                />
              </div>
            )}
            {data.getCompanyLogo.type === 'image/jpeg' && (
              <div onClick={handleSubmit}>
                <LogoImage
                  alt="Job offer"
                  src={`data:image/jpeg;base64, ${encode(
                    data.getCompanyLogo.data,
                  )}`}
                />
              </div>
            )}
          </div>
        )}
      </>
    );
};

export default Logo;
