import { InputName, InputText } from './Filter.styled';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter } from 'redux/selectors';
import { changeFilter } from 'redux/reducer';

export const Filter = () => {
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  return (
    <>
      <InputName>
        Find contacts
        <InputText
          type="text"
          name="name"
          value={filter}
          onChange={e => dispatch(changeFilter(e.target.value))}
        />
      </InputName>
    </>
  );
};
