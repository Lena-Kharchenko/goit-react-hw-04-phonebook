import { useState, useEffect, useMemo } from 'react';
import ContactForm from './contactForm/contactForm';
import ContactList from './contactList/contactList';
import ContactFilter from './contactFilter/contactFilter';
import Notiflix from 'notiflix';
import contactsList from 'savedContactList/savedContactList';

export default function App() {
  const [contacts, setContacts] = useState(
    () => JSON.parse(window.localStorage.getItem('contacts')) ?? contactsList
  );

  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleChangeFilter = event => {
    setFilter(event.target.value);
  };

  const addContacts = (id, name, number) => {
    if (contacts.find(contact => contact.name === name) !== undefined) {
      Notiflix.Notify.failure(`${name} is already in your contact book`);
      return;
    }

    setContacts(prevState => [{ id, name, number }, ...prevState]);
    Notiflix.Notify.success(`You add ${name} to your phonebook`);
  };

  const visibleContacts = useMemo(() => {
    const filterNormalize = filter.toLowerCase();
    const visibleContacts = filter
      ? contacts.filter(contact =>
          contact.name.toLocaleLowerCase().includes(filterNormalize)
        )
      : contacts;
    return visibleContacts;
  }, [contacts, filter]);

  const handleDeleteContact = event => {
    const deleteSelectContact = contacts.filter(
      contact => contact.id !== event.target.id
    );

    setContacts([...deleteSelectContact]);
  };

  return (
    <div>
      <h1>My Phonebook</h1>
      <ContactForm onSubmit={addContacts} />
      <ContactFilter onChange={handleChangeFilter} value={filter} />
      <ContactList
        contactList={visibleContacts}
        onChange={handleDeleteContact}
      />
    </div>
  );
}
