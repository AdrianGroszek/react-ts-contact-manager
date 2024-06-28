import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { type Contacts } from '../App';

type CreateContactFormProps = {
	onCreate: (newContact: Contacts) => void;
	onUpdateContact: (updateContact: Contacts) => void;
	currentContact?: Contacts;
};

export default function CreateContactForm({
	onCreate,
	currentContact,
	onUpdateContact,
}: CreateContactFormProps) {
	const [username, setUsername] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [phoneNumber, setPhoneNumber] = useState<number | undefined>(undefined);
	const [imageURL, setImageURL] = useState<string>('');

	useEffect(() => {
		if (currentContact) {
			setUsername(currentContact.username);
			setEmail(currentContact.email);
			setPhoneNumber(currentContact.phone);
			setImageURL(currentContact.image);
		} else {
			setUsername('');
			setEmail('');
			setPhoneNumber(undefined);
			setImageURL('');
		}
	}, [currentContact]);

	function handleOnSumbit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (!username || !email || !phoneNumber || !imageURL) return;

		const newContact = {
			id: currentContact ? currentContact.id : Math.random(),
			username,
			email,
			phone: phoneNumber,
			image: imageURL,
		};

		if (currentContact) {
			onUpdateContact(newContact);
		} else {
			onCreate(newContact);
		}
	}

	return (
		<div className='create-contact-form-container'>
			<h3>{currentContact ? 'Update Contact' : 'Create New Contact'}</h3>
			<form onSubmit={handleOnSumbit}>
				<input
					type='text'
					placeholder='Name'
					value={username}
					onChange={(e: ChangeEvent<HTMLInputElement>) =>
						setUsername(e.target.value)
					}
				/>
				<input
					type='number'
					placeholder='Phone'
					value={phoneNumber ?? ''}
					onChange={(e: ChangeEvent<HTMLInputElement>) =>
						setPhoneNumber(+e.target.value)
					}
				/>
				<input
					type='text'
					placeholder='Email'
					value={email}
					onChange={(e: ChangeEvent<HTMLInputElement>) =>
						setEmail(e.target.value)
					}
				/>
				<input
					type='text'
					placeholder='Photo URL'
					value={imageURL}
					onChange={(e: ChangeEvent<HTMLInputElement>) =>
						setImageURL(e.target.value)
					}
				/>
				<button>{currentContact ? 'Update' : 'Create +'}</button>
			</form>
		</div>
	);
}
