import PropTypes from 'prop-types';

const ImageGalleryItem = ({ hits, onShowModal, handleImageShow }) => {
  return hits.map(hit => (
    <li key={hit.id} className="ImageGalleryItem">
      <img
        onClick={() => {
          onShowModal();
          handleImageShow(hit.tags, hit.largeImageURL);
        }}
        className="ImageGalleryItem-image"
        src={hit.webformatURL}
        alt={hit.tags}
      />
    </li>
  ));
};

ImageGalleryItem.propTypes = {
  hits: PropTypes.arrayOf(PropTypes.object).isRequired,
  onShowModal: PropTypes.func.isRequired,
  handleImageShow: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
