import { Metadata } from "next";
import { EVENTS_DATA } from "@/components/events/constants/events"; 
import EventDetailsClient from "@/components/events/EventDetailsClient";

type Props = {
  // 1. In Next.js 15, params is a Promise! Now looking for 'slug'
  params: Promise<{ slug: string }>; 
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // 2. You must await the params before reading the slug
  const resolvedParams = await params;
  
  // Find the event using the new slug property
  const event = EVENTS_DATA.find((e) => e.slug === resolvedParams.slug);

  if (!event) {
    return {
      title: "Event Not Found | Srijan 2026",
      description: "This event does not exist or has been removed.",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://yourwebsite.com";

  return {
    title: `${event.title} | Srijan 2026`,
    description: event.description,
    openGraph: {
      title: event.title,
      description: event.description,
      // Update the canonical URL to use the slug
      url: `${baseUrl}/events/${event.slug}`,
      siteName: "Srijan 2026",
      images: [
        {
          url: event.image, 
          width: 595,
          height: 842,
          alt: `${event.title} Poster`,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: event.title,
      description: event.description,
      images: [event.image],
    },
  };
}

// 3. Make sure your default export is also an async function
export default async function EventDetailsPage({ params }: Props) {
  // 4. Await the params here too!
  const resolvedParams = await params;
  
  // Find the event using the new slug property
  const event = EVENTS_DATA.find((e) => e.slug === resolvedParams.slug);

  if (!event) {
    return <div className="text-white text-center mt-20">Event not found</div>;
  }

  return <EventDetailsClient event={event} />;
}