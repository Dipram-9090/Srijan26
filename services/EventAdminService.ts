'use server'
import { prisma } from "@/prisma/client";
import type { EventFormType } from "@/types/events";
import { eventToForm } from "@/utils/eventListing";
import { withAuth } from "@/utils/withAuth";

const getEventBySlug = withAuth(async (sessionUserId: string, slug: string) => {
    const event = await prisma.event.findUnique({
      where: {slug},
      select: {
        name: true,
        slug: true,
        eventListingData: true
      }
    });
    if(!event || !event.eventListingData) return null;
    return eventToForm(event);
});

const updateEvent = withAuth(async (sessionUserId: string, data: EventFormType) => {
    console.log(data);
    return {ok: true, message: "yes"};
});

export { eventToForm, getEventBySlug, updateEvent };