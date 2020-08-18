import React, { useCallback } from 'react';
import { GET_ALL_JOB_IMAGES } from '../Graphql/Queries';
import { useQuery, useMutation } from '@apollo/client';
import { toBase64 } from '../utils/ToBase64';
import {
  Used,
  ColumContainer,
  Title,
  GridContainer,
} from '../styles/CompanyProfileStyle';
import { useDropzone } from 'react-dropzone';
import { ADD_IMAGE, DELETE_IMAGE } from '../Graphql/CompanyMutations';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import {
  Confirmation,
  ImageInputContainer,
  ButtonContainer,
  Button,
  Image,
} from '../styles/ImagesGallery';

type Props = {
  id: number;
};
const ImagesGallery: React.FC<Props> = ({ id }) => {
  const { data, loading } = useQuery(GET_ALL_JOB_IMAGES, {
    variables: { id },
    fetchPolicy: 'network-only',
  });

  const [deleteImage, { loading: deletingImage }] = useMutation(DELETE_IMAGE, {
    refetchQueries: [{ query: GET_ALL_JOB_IMAGES, variables: { id } }],
  });

  const [addImage, { loading: addingImage }] = useMutation(ADD_IMAGE, {
    refetchQueries: [
      {
        query: GET_ALL_JOB_IMAGES,
        variables: { id },
      },
    ],
  });

  const onDrop = useCallback(
    async ([file]) => {
      await addImage({
        variables: {
          id,
          file,
        },
      });
    },
    [addImage],
  );

  const handleSubmit = (imageId: number) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div>
            <Title>Are you sure?</Title>
            <Confirmation>
              Do you really want to delete this photo?
            </Confirmation>
            <ButtonContainer>
              <Button onClick={onClose}>No</Button>
              <Button
                onClick={async () => {
                  await deleteImage({
                    variables: { id: imageId },
                  });
                  onClose();
                }}
              >
                Yes, Delete it!
              </Button>
            </ButtonContainer>
          </div>
        );
      },
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png',
  });

  if (loading) return null;
  else
    return (
      <>
        {data.getAllJobOfferImages.length !== 0 ? (
          <ColumContainer>
            <Used>Gallery: (click to delete an image)</Used>
            <GridContainer>
              {data.getAllJobOfferImages.map((element: any) => {
                if (element.type === 'image/png')
                  return (
                    <div
                      onClick={() => handleSubmit(element.id)}
                      key={element.id}
                    >
                      <Image
                        alt="Job offer"
                        src={`data:image/png;base64, ${toBase64(element.data)}`}
                      />
                    </div>
                  );
                else
                  return (
                    <div
                      onClick={() => handleSubmit(element.id)}
                      key={element.id}
                    >
                      <Image
                        alt="Job offer"
                        src={`data:image/jpeg;base64, ${toBase64(
                          element.data,
                        )}`}
                      />
                    </div>
                  );
              })}
            </GridContainer>
          </ColumContainer>
        ) : null}
        {data &&
          data.getAllJobOfferImages.length < 9 &&
          !deletingImage &&
          !addingImage && (
            <ImageInputContainer {...getRootProps()}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the file here ...</p>
              ) : (
                <p>Drag 'n' drop images, to add image (max 9)</p>
              )}
            </ImageInputContainer>
          )}
      </>
    );
};

export default ImagesGallery;
