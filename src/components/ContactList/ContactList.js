import { Box } from 'components/styles/Box';
import { ContactItem , ContactText} from './ContactList.styled';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getFilter } from 'redux/reducer';
import { getContacts } from 'redux/reducer';
import { ButtonForm } from 'components/ContactForm/ContactForm.styled';
import { deleteActionContact } from 'redux/reducer';
import { useDispatch } from 'react-redux';

export const ContactList = () => {
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();
  const filter = useSelector(getFilter).toLowerCase();


  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter)
  );
  
  const deleteContact = contactId => {
    dispatch(deleteActionContact(contactId))
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
