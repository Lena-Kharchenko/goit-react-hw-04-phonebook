import { setState, useState } from 'react';
import ContactForm from './contactForm/contactForm';
import ContactList from './contactList/contactList';
import ContactFilter from './contactFilter/contactFilter';
import Notiflix from 'notiflix';
import contacts from './savedContactList/savedContactList';

export default function App () {

 const [contacts, setContacts] = useState(() => JSON.parse.window.localStorage.getItem('contacts') ?? contacts);
 

  componentDidMount() {
    const parsedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handleChangeFilter = event => {
    this.setState({
      filter: event.target.value,
    });
  };

  addContacts = (id, name, number) => {
    if (
      this.state.contacts.find(contact => contact.name === name) !== undefined
    ) {
      Notiflix.Notify.failure(`${name} is already in your contact book`);
      return;
    }

    const newContact = { id, name, number };
    this.setState(prevState => ({
      contacts: [newContact, ...prevState.contacts],
    }));
    Notiflix.Notify.success(`You add ${name} to your phonebook`);
  };

  visibleContacts = () => {
    const filterNormalize = this.state.filter.toLowerCase();
    const visibleContacts = this.state.filter
      ? this.state.contacts.filter(contact =>
          contact.name.toLocaleLowerCase().includes(filterNormalize)
        )
      : this.state.contacts;
    return visibleContacts;
  };

  handleDeleteContact = event => {
    const deleteSelectContact = this.state.contacts.filter(
      contact => contact.id !== event.target.id
    );

    this.setState({
      contacts: [...deleteSelectContact],
    });
  };

  render() {
    const { addContacts, handleChangeFilter, visibleContacts } = this;
    return (
      <div>
        <h1>My Phonebook</h1>
        <ContactForm onSubmit={addContacts} />
        <ContactFilter onChange={handleChangeFilter} />
        <ContactList
          contactList={visibleContacts()}
          onChange={this.handleDeleteContact}
        />
      </div>
    );
  }
}
