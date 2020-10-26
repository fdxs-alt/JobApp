import React, { useCallback } from 'react';
import {
  GET_ALL_JOB_IMAGES,
  GET_ALL_SPECIFIC_INFO,
} from '../../../Graphql/Queries';
import { useQuery, useMutation } from '@apollo/client';
import { useDropzone } from 'react-dropzone';
import { ADD_IMAGE, DELETE_IMAGE } from '../../../Graphql/CompanyMutations';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { ImageInputContainer } from '../../../styles/ImagesGallery';
import Spinner from '../../Spinner';
import Images from './Images';
import ConfirmationModal from '../../sharedComp/ConfirmationModal';
import { Used, ColumContainer } from '../../../styles/CompanyProfileStyle';
export type ImageType = {
  id: number;
  data: Buffer;
  type: string;
};
type getAllJobOfferImagesResponse = {
  getAllJobOfferImages: ImageType[];
};
type Props = {
  id: number;
};
const ImagesGallery: React.FC<Props> = ({ id }) => {
  const { data, loading } = useQuery<getAllJobOfferImagesResponse>(
    GET_ALL_JOB_IMAGES,
    {
      variables: { id },
      fetchPolicy: 'network-only',
    },
  );

  const [deleteImage, { loading: deletingImage }] = useMutation(DELETE_IMAGE, {
    refetchQueries: [
      { query: GET_ALL_JOB_IMAGES, variables: { id } },
      { query: GET_ALL_SPECIFIC_INFO, variables: { id } },
    ],
  });

  const [addImage, { loading: addingImage }] = useMutation(ADD_IMAGE, {
    refetchQueries: [
      {
        query: GET_ALL_JOB_IMAGES,
        variables: { id },
      },
      { query: GET_ALL_SPECIFIC_INFO, variables: { id } },
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
    [addImage, id],
  );
  const handleClick = async (close: () => void, imageId?: number) => {
    await deleteImage({
      variables: { id: imageId },
    });
    close();
  };
  const handleSubmit = (imageId: number) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <ConfirmationModal
            id={imageId}
            onClose={onClose}
            confirmationText="Do you really want to delete this image"
            handleClick={handleClick}
            title="Are you sure"
            deleteText="Yes"
          />
        );
      },
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png',
  });

  if (loading) return <Spinner size={50} loading={loading} small />;
  else
    return (
      <>
        {data?.getAllJobOfferImages.length !== 0 ? (
          <ColumContainer>
            <Used>Gallery: (click to delete an image)</Used>
            <Images
              handleSubmit={handleSubmit}
              images={data?.getAllJobOfferImages as ImageType[]}
            />
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
                <p>Drag and drop images, to add image (max 9)</p>
              )}
            </ImageInputContainer>
          )}
      </>
    );
};

export default ImagesGallery;
