import PropTypes from 'prop-types';

export default function ContactFilter({ onChange }) {
  return (
    <>
      <p>Please enter the name </p>
      <input type="text" name="filter" onChange={onChange}></input>
    </>
  );
}

ContactFilter.propTypes = {
  onChange: PropTypes.func.isRequired,
};
