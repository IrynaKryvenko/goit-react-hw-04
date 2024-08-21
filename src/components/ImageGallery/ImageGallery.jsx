import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

const ImageGallery = ({ images, openModal }) => {
  return (
    <ul className={css.list}>
      {images.map(({ id, urls, alt_description }) => (
        <li key={id} className={css.item}>
          <ImageCard
            urls={urls}
            alt_description={alt_description}
            openModal={openModal}
          />
        </li>
      ))}
    </ul>
  );
};
export default ImageGallery;