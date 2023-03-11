import { ContactForm } from './Form/Form';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { useState, useEffect } from 'react';

const LS_KEY = 'contactbook-items';

export const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem(LS_KEY)) ?? contacts
  );
  const [filter, setFilter] = useState('');

  const addContact = newContact => {
    if (contacts.find(contact => contact.name === newContact.name)) {
      alert(`${newContact.name} is already in contacts.`);
      return '';
    }
    setContacts(prevContacts => [newContact, ...prevContacts]);
  };

  const handleFilter = text => {
    setFilter(text);
  };

  const onDeleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className="wrapper">
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />
      <h2>Contacts</h2>
      <Filter onChange={handleFilter} value={filter} />
      <ContactList
        contacts={contacts}
        filter={filter}
        onDeleteContact={onDeleteContact}
      />
    </div>
  );
};