import { Contacts } from '../App';
import ContactItem from './ContactItem';

type ContactsListProps = {
	contacts: Contacts[];
	onDelete: (id: number) => void;
	onSelectToUpdate: (contact: Contacts) => void;
};

export default function ContactsList({
	contacts,
	onDelete,
	onSelectToUpdate,
}: ContactsListProps) {
	return (
		<ul>
			{contacts.map((contact) => (
				<ContactItem
					key={contact.id}
					contact={contact}
					onDelete={onDelete}
					onSelectToUpdate={onSelectToUpdate}
				/>
			))}
		</ul>
	);
}
