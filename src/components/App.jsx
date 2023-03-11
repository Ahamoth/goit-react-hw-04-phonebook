import { ContactForm } from './Form/Form';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { useState, useEffect } from 'react';

const LS_KEY = 'contactbook-items';

export const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem(LS_KEY)) ?? [
        { id: 'id-1', name: 'Andrey', number: '380955007040' },
        { id: 'id-2', name: 'Sergey', number: '380955007050' },
        { id: 'id-3', name: 'Elena', number: '380955007060' },
        { id: 'id-4', name: 'Olga', number: '380955007070' },
        { id: 'id-5', name: 'Ihor', number: '380955007080' },
      ]
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