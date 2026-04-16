import type { ReactNode } from "react";
import type { Contact } from "../types";

interface ContactListProps {
  contacts: Contact[];
  selectedContactId: string;
  onSelect: (contactId: string) => void;
  pendingContactIds: string[];
}

export function ContactList({
  contacts,
  selectedContactId,
  onSelect,
  pendingContactIds
}: ContactListProps) {
  const visibleContacts = contacts.filter((contact) => contact.unlocked);
  const systemContacts = visibleContacts.filter((contact) => contact.pinned);
  const npcContacts = visibleContacts.filter((contact) => !contact.pinned);

  return (
    <aside className="left-panel">
      <div className="panel-title">联系人</div>
      <Section title="置顶">
        {systemContacts.map((contact) => (
          <ContactRow
            key={contact.id}
            contact={contact}
            selected={selectedContactId === contact.id}
            onSelect={onSelect}
            pending={pendingContactIds.includes(contact.id)}
          />
        ))}
      </Section>
      <Section title="案件相关人">
        {npcContacts.map((contact) => (
          <ContactRow
            key={contact.id}
            contact={contact}
            selected={selectedContactId === contact.id}
            onSelect={onSelect}
            pending={pendingContactIds.includes(contact.id)}
          />
        ))}
      </Section>
    </aside>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="contact-section">
      <div className="section-title">{title}</div>
      <div className="contact-list">{children}</div>
    </div>
  );
}

function ContactRow({
  contact,
  selected,
  onSelect,
  pending
}: {
  contact: Contact;
  selected: boolean;
  onSelect: (contactId: string) => void;
  pending: boolean;
}) {
  const avatarText = contact.name.slice(0, 1);

  return (
    <button
      type="button"
      className={`contact-row ${selected ? "selected" : ""}`}
      onClick={() => onSelect(contact.id)}
    >
      <div className="avatar">{avatarText}</div>
      <div className="contact-meta">
        <div className="contact-name-line">
          <span className="contact-name">{contact.name}</span>
          {contact.type === "npc" && contact.online ? <span className="online-dot" /> : null}
          {contact.unreadCount > 0 ? <span className="unread-dot">{contact.unreadCount}</span> : null}
        </div>
        <div className="contact-subtitle">
          {contact.type === "system"
            ? "系统联系人"
            : `${contact.roleTitle ?? "未知身份"}${contact.attitude ? ` · ${contact.attitude}` : ""}${pending ? " · 回复中" : ""}`}
        </div>
      </div>
    </button>
  );
}
