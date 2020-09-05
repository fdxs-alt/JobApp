import React from 'react';
import { encode } from 'base64-arraybuffer';
import { GridContainer } from '../../../styles/CompanyProfileStyle';
import { Image } from '../../../styles/ImagesGallery';
import { ImageType } from './ImagesGallery';
type Props = {
  images: ImageType[] | undefined;
  handleSubmit: (arg: number) => void;
};
const Images: React.FC<Props> = ({ images, handleSubmit }) => {
  return (
    <GridContainer>
      {images?.map((element) => (
        <div onClick={() => handleSubmit(element.id)} key={element.id}>
          <Image
            alt="Job offer"
            src={`data:image/jpeg;base64, ${encode(element.data)}`}
          />
        </div>
      ))}
    </GridContainer>
  );
};

export default Images;
