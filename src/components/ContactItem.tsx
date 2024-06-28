import { Contacts } from '../App';

type ContactItemProps = {
	contact: Contacts;
	onDelete: (id: number) => void;
	onSelectToUpdate: (contact: Contacts) => void;
};

export default function ContactItem({
	contact,
	onDelete,
	onSelectToUpdate,
}: ContactItemProps) {
	return (
		<li>
			<div className='img-box'>
				<img src={contact.image} alt={contact.username} />
			</div>
			<div className='contact-details-box'>
				<p>{contact.username}</p>
				<p>{contact.phone}</p>
				<p>{contact.email}</p>
			</div>
			<div className='contact-buttons-box'>
				<button
					className='update-btn'
					onClick={() => onSelectToUpdate(contact)}>
					U
				</button>
				<button className='delete-btn' onClick={() => onDelete(contact.id)}>
					D
				</button>
			</div>
		</li>
	);
}
