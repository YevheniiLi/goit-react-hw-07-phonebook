import { Box } from 'components/styles/Box';
import { ContactItem, ContactText } from './ContactList.styled';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { ButtonForm } from 'components/ContactForm/ContactForm.styled';
import { deleteContacts } from 'redux/operations';
import { useDispatch } from 'react-redux';
import { selectFilteredContacts } from 'redux/selectors';

export const ContactList = () => {
  const dispatch = useDispatch();

  const visibleContacts = useSelector(selectFilteredContacts);
  const deleteContact = contactId => {
    dispatch(deleteContacts(contactId));
  };

  return (
    <ul>
      {visibleContacts.map(({ id, name, number }) => (
        <Box as="li" mb={3} key={id}>
          <ContactItem id={id}>
            <ContactText>{name}: </ContactText>
            <ContactText>{number}</ContactText>
            <ButtonForm type="button" onClick={() => deleteContact(id)}>
              Delete
            </ButtonForm>
          </ContactItem>
        </Box>
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
