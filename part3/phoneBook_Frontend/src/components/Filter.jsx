const Filter = ({ filter, handleInputFilter }) => {
  
  return (
    <p>
      Filter: name starts with <input value={filter} onChange={handleInputFilter} />
    </p>
  );
};

export default Filter;