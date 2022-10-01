import { InputName, InputText } from './Filter.styled';
import { useDispatch, useSelector } from 'react-redux';
import { getFilter } from 'redux/reducer';
import { changeActionFilter } from 'redux/reducer';

export const Filter = () => {
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  return (
    <>
      <InputName>
        Find contacts
        <InputText
          type="text"
          name="name"
          value={filter}
          onChange={e => dispatch(changeActionFilter(e.target.value))}
        />
      </InputName>
    </>
  );
};
