type ContactPerson = {
  name: string;
  position: string;
  phone: string;
};

const contacts: ContactPerson[] = [
  {
    name: "Arjun Sen",
    position: "Event Coordinator",
    phone: "+91 98765 43210",
  },
  {
    name: "Riya Mukherjee",
    position: "Technical Head",
    phone: "+91 91234 56789",
  },
  {
    name: "Sayan Das",
    position: "Sponsorship Lead",
    phone: "+91 99887 66554",
  },
];

export default function ContactInfo() {
  return (
    <ul className="divide-y divide-white/10 w-full">
      {contacts.map((person, index) => (
        <li
          key={index}
          className="px-4 py-4 flex flex-row items-center justify-between gap-4 hover:bg-white/5 transition-all duration-300"
        >
          <div className="text-left">
            <p className="text-sm md:text-base font-semibold tracking-wide text-white">
              {person.name}
            </p>
            <p className="text-xs md:text-sm text-neutral-400">{person.position}</p>
          </div>

          <a
            href={`tel:${person.phone}`}
            className="text-blue-400 hover:text-blue-300 transition-colors duration-200 text-xs md:text-sm whitespace-nowrap"
          >
            {person.phone}
          </a>
        </li>
      ))}
    </ul>
  );
}