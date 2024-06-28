import { ChangeEvent, useState } from 'react';
import ContactsList from './components/ContactsList';
import CreateContactForm from './components/CreateContactForm';

export interface Contacts {
	id: number;
	username: string;
	email: string;
	phone: number;
	image: string;
}

function App() {
	const [formIsOpen, setFormIsOpen] = useState<boolean>(false);
	const [contacts, setContacts] = useState<Contacts[]>([
		{
			id: 1,
			username: 'test username',
			email: 'testemail@gmail.com',
			phone: 777777777,
			image:
				'https://www.elitesingles.co.uk/wp-content/uploads/sites/59/2019/11/2b_en_articleslide_sm2-350x264.jpg',
		},
		{
			id: 2,
			username: 'test usernameeee',
			email: 'testemasssssil@gmail.com',
			phone: 223311223,
			image:
				'https://images.pexels.com/photos/1310522/pexels-photo-1310522.jpeg?cs=srgb&dl=pexels-george-dolgikh-551816-1310522.jpg&fm=jpg',
		},
	]);
	const [searchContactInput, setSearchContactInput] = useState<string>('');
	const [currentContact, setCurrentContact] = useState<Contacts | undefined>(
		undefined
	);

	const filteredContacts = contacts.filter((contact) =>
		contact.username.toLowerCase().includes(searchContactInput.toLowerCase())
	);

	function handleToggleForm() {
		if (currentContact) setFormIsOpen(false);
		setCurrentContact(undefined);
		setFormIsOpen((prevState) => !prevState);
	}

	function handleCreateContact(newContact: Contacts) {
		setContacts([...contacts, newContact]);
		setFormIsOpen(false);
	}

	function handleDeleteContact(id: number) {
		setContacts((prevState) =>
			prevState.filter((contactEl) => contactEl.id !== id)
		);
	}

	function handleSelectContactToUpdate(contact: Contacts) {
		setCurrentContact(contact);
		setFormIsOpen(true);
	}

	function handleUpdateContact(updatedContact: Contacts) {
		setContacts((prevContact) =>
			prevContact.map((contact) =>
				contact.id === updatedContact.id ? updatedContact : contact
			)
		);
		setFormIsOpen(false);
	}

	function handleSearchContact(e: ChangeEvent<HTMLInputElement>) {
		setSearchContactInput(e.target.value);
	}

	return (
		<main>
			<div className='heading-container'>
				<h1>MyContacts</h1>
				<button onClick={handleToggleForm}>+ Add contact</button>
			</div>
			<input
				type='text'
				className='search-contact-input'
				placeholder='Search Contact...'
				value={searchContactInput}
				onChange={handleSearchContact}
			/>
			{formIsOpen && (
				<CreateContactForm
					onCreate={handleCreateContact}
					currentContact={currentContact}
					onUpdateContact={handleUpdateContact}
				/>
			)}
			{filteredContacts.length === 0 && searchContactInput !== '' && (
				<h3 className='no-contact-info-text'>No contacts found</h3>
			)}
			{contacts.length === 0 ? (
				<h3 className='no-contact-info-text'>
					You dont have any contact yet. Please press{' '}
					<span className='orange-text'>+ Add contact</span> button
				</h3>
			) : (
				<ContactsList
					contacts={filteredContacts}
					onDelete={handleDeleteContact}
					onSelectToUpdate={handleSelectContactToUpdate}
				/>
			)}
		</main>
	);
}

export default App;
