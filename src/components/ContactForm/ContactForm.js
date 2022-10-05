import { ButtonForm, LabelStyle } from './ContactForm.styled';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts } from 'redux/selectors';
import { nanoid } from 'nanoid';
import { addContacts } from 'redux/operations';

// Создание формы с библиотекой Formik

const schema = yup.object().shape({
  name: yup.string().required(),
  number: yup.number().min(4).required(),
});

const initialValues = {
  name: '',
  number: '',
};

export const ContactForm = () => {
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();
  

  const addNewContact = (values, actions) => {
    
    const newContact = {
      id: nanoid(),
      name: values.name,
      number: values.number,
    };
    if (
      contacts
        .map(contact => {
          return contact.name;
        })
        .includes(newContact.name)
    ) {
      alert(`${newContact.name} is already in contacts!`);
    } else {
      dispatch(addContacts(newContact));
      actions.resetForm();
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={addNewContact}
      >
        <Form autoComplete="off">
          <LabelStyle htmlFor="name">
            Name :
            <Field
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
            />
            <ErrorMessage name="name" component="div" />
          </LabelStyle>

          <LabelStyle htmlFor="number">
            Tel :
            <Field
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
            />
            <ErrorMessage name="number" component="div" />
            <ButtonForm type="submit">Add contact</ButtonForm>
          </LabelStyle>
        </Form>
      </Formik>
    </>
  );
};
