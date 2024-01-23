import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/contactsSlice';

import { v4 as uuidv4 } from 'uuid';
import css from './ContactForm.module.css';

export const ContactForm = () => {
  const contacts = useSelector(store => store.contactsReducer.contacts);
  const dispatch = useDispatch();

  const handleFormSubmit = evt => {
    evt.preventDefault();
    const name = evt.currentTarget.elements.name.value;
    const number = evt.currentTarget.elements.number.value;
    const formData = { name, number };
    handleAddName(formData);
    evt.currentTarget.reset();
  };

  const handleAddName = formData => {
    const hasDuplicates = contacts.some(
      profile => profile.name.toLowerCase() === formData.name.toLowerCase()
    );
    if (hasDuplicates) {
      alert(`${formData.name} is already in contacts`);
      return;
    }
    const contactData = { ...formData, id: uuidv4() };
    dispatch(addContact(contactData));
  };

  return (
    <form className={css.formContacts} onSubmit={handleFormSubmit}>
      <label className={css.formLabel}>
        <span className={css.formSpan}>Name</span>
        <input type="text" name="name" className={css.formInput} required />
      </label>
      <label className={css.formLabel}>
        <span className={css.formSpan}>Number</span>
        <input type="tel" name="number" className={css.formInput} required />
      </label>
      <button type="submit" className={css.formButton}>
        Add Contact
      </button>
    </form>
  );
};
