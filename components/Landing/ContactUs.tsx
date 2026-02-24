import { AnimatedSectionTitle } from "./AnimatedSectionTitle";

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

export const ContactUs = () => {
  return (
    <>
      <div id="contact-us" className="full-bleed">
        <AnimatedSectionTitle
          text="Contact Us"
          className="p-0 font-elnath text-2xl sm:text-3xl md:text-5xl lg:text-6xl uppercase tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.3em] text-amber-200/90 ml-10 mb-10 sm:ml-18 lg:ml-24 sm:mb-16 flex justify-start"
        />
      </div>
      <ul className="divide-y divide-white/10 py-8 md:px-16 lg:px-32">
        {contacts.map((person, index) => (
          <li
            key={index}
            className="px-8 py-6 flex flex-row items-center justify-between gap-2 hover:bg-white/5 transition-all duration-300"
          >
            <div>
              <p className="text-lg font-semibold tracking-wide">
                {person.name}
              </p>
              <p className="text-sm text-neutral-400">{person.position}</p>
            </div>

            <a
              href={`tel:${person.phone}`}
              className="text-blue-400 hover:text-blue-300 transition-colors duration-200 text-sm md:text-base"
            >
              {person.phone}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};
