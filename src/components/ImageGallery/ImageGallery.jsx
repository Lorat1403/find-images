import { Component } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Modal from 'components/Modal';

export default class ImageGallery extends Component {
  state = {
    showModal: false,
    imageTags: null,
    imageLarge: null,
  };

  handleShowModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  handleImageShow = (imageTags, imageLarge) => {
    this.setState({ imageTags, imageLarge });
  };

  render() {
    const { handleShowModal, handleImageShow } = this;
    const { showModal, imageTags, imageLarge } = this.state;
    const { hits } = this.props;
    return (
      <>
        <ul className="ImageGallery">
          <ImageGalleryItem
            hits={hits}
            onShowModal={handleShowModal}
            handleImageShow={handleImageShow}
          />
        </ul>
        {showModal && (
          <Modal onClose={handleShowModal}>
            <img src={imageLarge} alt={imageTags} />
          </Modal>
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  hits: PropTypes.arrayOf(PropTypes.object).isRequired,
};
