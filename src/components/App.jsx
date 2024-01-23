import {
  addContact,
  changeFilter,
  deleteContact,
} from '../redux/contactsSlice';

import { v4 as uuidv4 } from 'uuid';
import { ContactList } from './ContactList/ContactList';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { useDispatch, useSelector } from 'react-redux';

export const App = () => {
  const contacts = useSelector(store => store.contactsReducer.contacts);
  const state = useSelector(store => store.contactsReducer.filter);
  const dispatch = useDispatch();
  // const [contacts, setContacts] = useState(
  //   JSON.parse(localStorage.getItem('contacts')) ?? []
  // );

  // useEffect(() => {
  //   localStorage.setItem('contacts', JSON.stringify(contacts));
  // }, [contacts]);

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

  const handleChangeFilter = evt => {
    const value = evt.target.value;
    dispatch(changeFilter(value));
  };

  const handleDeleteContacts = profileId => {
    dispatch(deleteContact(profileId));
  };

  const filterProfiles = contacts.filter(profile =>
    profile.name.toLowerCase().includes(state.trim().toLowerCase())
  );
  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm handleAddName={handleAddName} />

      <h2>Contacts</h2>
      <Filter handleChangeFilter={handleChangeFilter} />
      <ContactList
        contacts={filterProfiles}
        handleDeleteContacts={handleDeleteContacts}
      />
    </div>
  );
};
