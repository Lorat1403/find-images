import PropTypes from 'prop-types';

const Button = ({ onClick }) => {
  return (
    <button onClick={onClick} type="button" className="Button">
      Load More
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
