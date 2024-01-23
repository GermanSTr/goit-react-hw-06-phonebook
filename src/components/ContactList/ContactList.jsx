import { useDispatch, useSelector } from 'react-redux';
import { ContactListItem } from './ContactListItem';
import { deleteContact } from 'redux/contactsSlice';
import { selectContacts, selectFilter } from 'redux/selector';

const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const state = useSelector(selectFilter);
  const dispatch = useDispatch();

  const handleDeleteContacts = profileId => {
    dispatch(deleteContact(profileId));
  };

  const filterContacts = contacts.filter(profile =>
    profile.name.toLowerCase().includes(state.trim().toLowerCase())
  );

  return (
    <ul>
      {contacts.map(contact => (
        <ContactListItem
          name={filterContacts.name}
          number={filterContacts.number}
          key={filterContacts.id}
          handleDeleteContacts={handleDeleteContacts}
          id={filterContacts.id}
        />
      ))}
    </ul>
  );
};

export { ContactList };
