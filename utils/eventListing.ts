import { EventCategory, EventFormType, EventFrontendData } from "@/types/events";

const eventCategories = ["CODING", "CIRCUITS_AND_ROBOTICS", "BUSINESS", "BRAINSTORMING", "GAMING","MISCELLANEOUS"];

function validateCategory(str: string): boolean | string {
  if (eventCategories.includes(str)) return true;

  return "Invalid Event Category";
}

function transformCategory(str: string){
  return str.toUpperCase();
}

function formToEvent(formData: EventFormType):EventFrontendData{
  const data:EventFrontendData = {
      name: formData.name,
      slug: formData.slug,
      description: formData.description,
      rules: [],
      category: formData.category,
      prizes: [],
      registrationDeadline: formData.registrationDeadline,
      teamSize: formData.teamSize,
      eventDates: [],
      organisers: formData.organisers
  };
  data.rules = formData.rules.map(rule=>rule.value);
  data.prizes = formData.prizes.map(prize =>prize.value);
  data.eventDates = formData.eventDates.map(eventDate=>eventDate.value);
  return data;
}

function eventToForm(eventData: EventFrontendData):EventFormType{
  const data:EventFormType = {
      name: eventData.name,
      slug: eventData.slug,
      description: eventData.eventListingData.description,
      rules: [],
      category: eventData.eventListingData.category as EventCategory,
      prizes: [],
      eventDates: [],
      coordinators: []
  };
  data.rules = eventData.eventListingData.rules.map((rule: string)=>({value:rule}));
  data.prizes = eventData.eventListingData.prizes.map((prize: string) =>({value:prize}));
  data.eventDates = eventData.eventListingData.dates.map((eventDate: string)=>({value: eventDate}));
  data.coordinators = eventData.eventListingData.coordinators.map((coordinator: string) => ({value: coordinator}));
  return data;
}

export {validateCategory, transformCategory, formToEvent, eventToForm}