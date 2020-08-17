import React from 'react';
import { GET_ALL_JOB_IMAGES } from '../Graphql/Queries';
import { useQuery } from '@apollo/client';
type Props = {
  id: number;
};
const ImagesGallery: React.FC<Props> = ({ id }) => {
  const { data, loading, error } = useQuery(GET_ALL_JOB_IMAGES, {
    variables: { id },
  });

  const toBase64 = (element: number[]) => {
    return btoa(
      new Uint8Array(element).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        '',
      ),
    );
  };
  if (loading) return null;
  else
    return (
      <div>
        {data.getAllJobOfferImages.map((element: Buffer) => (
          <img src={`data:image/png;base64`} />
        ))}
      </div>
    );
};

export default ImagesGallery;
