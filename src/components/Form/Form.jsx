import { Formik, Form, Field } from 'formik';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import s from './Form.module.css';

export const ContactForm = ({ addContact }) => {
  return (
    <>
      <Formik
        initialValues={{ name: '', number: '' }}
        onSubmit={(values, { resetForm }) => {
          const item = {
            ...values,
            id: nanoid(),
          };
          addContact(item);
          resetForm();
        }}
      >
        <Form className={s.form}>
          <label htmlFor="name" className={s.label}>
            Name
          </label>
          <Field
            className={s.input}
            type="text"
            name="name"
            id="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
          <label htmlFor="number" className={s.label}>
            Number
          </label>
          <Field
            className={s.input}
            type="tel"
            name="number"
            id="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
          <button type="submit" className={s.button}>
            Add contact
          </button>
        </Form>
      </Formik>
    </>
  );
};

ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
};
