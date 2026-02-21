import React, { useRef, useEffect, useState } from "react";
import { useForm, type SubmitHandler, useFieldArray } from "react-hook-form";
import {
    getEventBySlug,
    updateEvent,
} from "@/services/EventAdminService";
import { transformCategory, validateCategory } from "@/utils/eventListing";
import { Clickable } from "../Clickable";
import { EventFormType } from "@/types/events";

function EditEventDetails({ slug }: { slug: string | undefined }) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    const defaultEventData: EventFormType = {
        name: "",
        slug: slug ?? "",
        description: "",
        format: "",
        rules: [{ value: "" }],
        category: "CODING",
        prizes: [{ value: "" }],
        registrationDeadline: "",
        teamSize: "",
        eventDates: [{ value: "" }],
        coordinators: [{ value: "" }],
    };

    const [eventData, setEventData] = useState<EventFormType>(defaultEventData);
    const [loading, setLoading] = useState<boolean>(true);
    const [message, setMessage] = useState<string>("");

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<EventFormType>({ defaultValues: eventData });

    const {
        fields: ruleFields,
        append: appendRule,
        remove: removeRule,
    } = useFieldArray({
        control,
        name: "rules",
    });
    const {
        fields: prizeFields,
        append: appendPrize,
        remove: removePrize,
    } = useFieldArray({ control, name: "prizes" });
    const {
        fields: dateFields,
        append: appendDate,
        remove: removeDate,
    } = useFieldArray({ control, name: "eventDates" });
    const {
        fields: coordinatorFields,
        append: appendCoordinator,
        remove: removeCoordinator,
    } = useFieldArray({
        control,
        name: "coordinators",
    });

    useEffect(() => {
        const fetchEvent = async (slug: string | undefined) => {
            if (!slug) return false;

            const data = await getEventBySlug(slug);
            if (!data) return false;

            reset(data);

            setEventData(data);
            return true;
        };

        fetchEvent(slug).finally(() => setLoading(false));
    }, [slug, reset]);

    if (!slug) return;
    if (loading) return <div>Loading...</div>;

    const onSubmit: SubmitHandler<EventFormType> = (data) => {
        updateEvent(data).then((updatedEvent) => {
            setMessage(updatedEvent.message);
            console.log(updatedEvent);
        });
    };

    const openDialog = () => {
        dialogRef.current?.showModal();
    };

    const closeDialog = () => {
        dialogRef.current?.close();
    };

    return (
        <>
            <Clickable
                as="button"
                onClick={openDialog}
                className="bg-black text-white"
            >
                Manage Listing
            </Clickable>
            <dialog
                ref={dialogRef}
                className="fixed top-1/2 left-1/2 z-300 w-full max-w-2xl -translate-1/2 bg-yellow text-black p-0 backdrop:bg-black/85 pointer-events-auto"
                onClick={(e) => {
                    if (e.target === dialogRef.current) close();
                }}
            >
                    <div className="flex flex-col h-[90vh] max-h-[90vh] items-center gap-6 px-8 py-7 flex-1 overflow-y-auto">
                        <span tabIndex={0} className="sr-only" />
                        <div className="flex justify-between w-full border-b border-red-900/40 pb-4">
                            <h2 className="font-elnath text-2xl tracking-widest uppercase">
                                Manage Event Listing
                            </h2>
                            <button
                                onClick={closeDialog}
                                className="text-[0.65rem] font-medium tracking-[0.14em] uppercase px-3 py-1.5 border border-white/80 text-black bg-transparent hover:bg-white/10 hover:border-white transition-colors duration-200"
                            >
                                Close
                            </button>
                        </div>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="flex flex-col gap-y-1 w-full flex-1"
                        >
                            <div className="flex flex-col gap-y-1">
                                <input
                                    type="text"
                                    className="outline-none border border-black bg-white/4 text-black placeholder-black py-2 px-3 text-sm focus:border-black focus:bg-yellow/6 transition-colors duration-200"
                                    {...register("name", {
                                        required: "This field is required",
                                    })}
                                    placeholder="Event Name"
                                />
                                <span
                                    className={`text-xs ${
                                        errors.name
                                            ? "text-yellow"
                                            : "text-transparent"
                                    }`}
                                >
                                    {errors.name?.message}.
                                </span>
                            </div>

                            <div className="flex flex-col gap-y-1">
                                <input
                                    type="text"
                                    className="outline-none border border-black bg-white/4 text-black placeholder-black py-2 px-3 text-sm focus:border-black focus:bg-yellow/6 transition-colors duration-200"
                                    {...register("slug", {
                                        required: "This field is required",
                                    })}
                                    placeholder="Event Slug"
                                />
                                <span
                                    className={`text-xs ${
                                        errors.slug
                                            ? "text-yellow"
                                            : "text-transparent"
                                    }`}
                                >
                                    {errors.slug?.message}.
                                </span>
                            </div>

                            <div className="flex flex-col gap-y-1">
                                <input
                                    type="text"
                                    className="outline-none border border-black bg-white/4 text-black placeholder-black py-2 px-3 text-sm focus:border-black focus:bg-yellow/6 transition-colors duration-200"
                                    {...register("category", {
                                        required: "This field is required",
                                        setValueAs: transformCategory,
                                        validate: validateCategory,
                                    })}
                                    placeholder="Event Category"
                                />
                                <span
                                    className={`text-xs ${
                                        errors.category
                                            ? "text-yellow"
                                            : "text-transparent"
                                    }`}
                                >
                                    {errors.category?.message}.
                                </span>
                            </div>

                            <div className="flex flex-col gap-y-1">
                                <textarea
                                    className="outline-none border border-black bg-white/4 text-black placeholder-black py-2 px-3 text-sm focus:border-black focus:bg-yellow/6 transition-colors duration-200 resize-y min-h-22.5"
                                    {...register("description", {
                                        required: "This is required",
                                    })}
                                    placeholder="Event Description"
                                />
                                <span
                                    className={`text-xs ${
                                        errors.description
                                            ? "text-yellow"
                                            : "text-transparent"
                                    }`}
                                >
                                    {errors.description?.message}.
                                </span>
                            </div>

                            <div className="flex flex-col gap-y-1">
                                <input
                                    type="text"
                                    className="outline-none border border-black bg-white/4 text-black placeholder-black py-2 px-3 text-sm focus:border-black focus:bg-yellow/6 transition-colors duration-200"
                                    {...register("registrationDeadline", {
                                        required: "This field is required",
                                    })}
                                    placeholder="Registration Deadline"
                                />
                                <span
                                    className={`text-xs ${
                                        errors.registrationDeadline
                                            ? "text-yellow"
                                            : "text-transparent"
                                    }`}
                                >
                                    {errors.registrationDeadline?.message}.
                                </span>
                            </div>

                            <div className="flex flex-col gap-y-1">
                                <input
                                    type="text"
                                    className="outline-none border border-black bg-white/4 text-black placeholder-black py-2 px-3 text-sm focus:border-black focus:bg-yellow/6 transition-colors duration-200"
                                    {...register("teamSize", {
                                        required: "This field is required",
                                    })}
                                    placeholder="Team Size"
                                />
                                <span
                                    className={`text-xs ${
                                        errors.teamSize
                                            ? "text-yellow"
                                            : "text-transparent"
                                    }`}
                                >
                                    {errors.teamSize?.message}.
                                </span>
                            </div>

                            <div className="border-t border-red-900/25 my-3" />

                            <p className="font-elnath text-xs tracking-[0.15em] text-yellow uppercase mb-1">
                                Rules
                            </p>
                            <div className="flex gap-3 items-baseline w-full">
                                <div className="flex flex-col gap-y-2 w-full">
                                    {ruleFields.map((field, index) => {
                                        return (
                                            <div
                                                key={field.id}
                                                className="flex w-full gap-3 items-center"
                                            >
                                                <input
                                                    type="text"
                                                    {...register(
                                                        `rules.${index}.value` as const,
                                                    )}
                                                    className="outline-none border border-black bg-white/4 text-black placeholder-black py-2 px-3 text-sm focus:border-black focus:bg-yellow/6 transition-colors duration-200 w-full sm:grow"
                                                    placeholder={`Rule ${index + 1}`}
                                                />
                                                {index > 0 && (
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            removeRule(index)
                                                        }
                                                        className="shrink-0 text-[0.65rem] font-medium tracking-[0.12em] uppercase px-3 py-1.5 border border-red-800/60 text-black bg-transparent hover:bg-red-900/30 hover:text-red-300 transition-colors duration-200"
                                                    >
                                                        Remove
                                                    </button>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                                <button
                                    type="button"
                                    onClick={() => appendRule({ value: "" })}
                                    className="shrink-0 text-[0.65rem] font-medium tracking-[0.12em] uppercase px-3 py-1.5 border border-red-800/60 text-black bg-transparent hover:bg-red-900/30 hover:text-red-300 transition-colors duration-200"
                                >
                                    Add
                                </button>
                            </div>

                            <div className="border-t border-red-900/25 my-3" />

                            <p className="font-elnath text-xs tracking-[0.15em] text-yellow uppercase mb-1">
                                Prizes
                            </p>
                            <div className="flex gap-3 items-baseline w-full my-2">
                                <div className="flex flex-col gap-y-2 w-full">
                                    {prizeFields.map((field, index) => {
                                        return (
                                            <div
                                                key={field.id}
                                                className="flex w-full gap-3 items-center"
                                            >
                                                <input
                                                    type="text"
                                                    {...register(
                                                        `prizes.${index}.value` as const,
                                                    )}
                                                    className="outline-none border border-black bg-white/4 text-black placeholder-black py-2 px-3 text-sm focus:border-black focus:bg-yellow/6 transition-colors duration-200 w-full sm:grow"
                                                    placeholder={`Prize ${index + 1}`}
                                                />
                                                {index > 0 && (
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            removePrize(index)
                                                        }
                                                        className="shrink-0 text-[0.65rem] font-medium tracking-[0.12em] uppercase px-3 py-1.5 border border-red-800/60 text-black bg-transparent hover:bg-red-900/30 hover:text-red-300 transition-colors duration-200"
                                                    >
                                                        Remove
                                                    </button>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                                <button
                                    type="button"
                                    onClick={() => appendPrize({ value: "" })}
                                    className="shrink-0 text-[0.65rem] font-medium tracking-[0.12em] uppercase px-3 py-1.5 border border-red-800/60 text-black bg-transparent hover:bg-red-900/30 hover:text-red-300 transition-colors duration-200"
                                >
                                    Add
                                </button>
                            </div>

                            <div className="border-t border-red-900/25 my-3" />

                            <p className="font-elnath text-xs tracking-[0.15em] text-yellow uppercase mb-1">
                                Event Dates
                            </p>
                            <div className="flex gap-3 items-baseline w-full">
                                <div className="flex flex-col gap-y-2 w-full">
                                    {dateFields.map((field, index) => {
                                        return (
                                            <div
                                                key={field.id}
                                                className="flex w-full gap-3 items-center"
                                            >
                                                <input
                                                    type="text"
                                                    {...register(
                                                        `eventDates.${index}.value` as const,
                                                    )}
                                                    className="outline-none border border-black bg-white/4 text-black placeholder-black py-2 px-3 text-sm focus:border-black focus:bg-yellow/6 transition-colors duration-200 w-full sm:grow"
                                                    placeholder={`Date ${index + 1}`}
                                                />
                                                {index > 0 && (
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            removeDate(index)
                                                        }
                                                        className="shrink-0 text-[0.65rem] font-medium tracking-[0.12em] uppercase px-3 py-1.5 border border-red-800/60 text-black bg-transparent hover:bg-red-900/30 hover:text-red-300 transition-colors duration-200"
                                                    >
                                                        Remove
                                                    </button>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                                <button
                                    type="button"
                                    onClick={() => appendDate({ value: "" })}
                                    className="shrink-0 text-[0.65rem] font-medium tracking-[0.12em] uppercase px-3 py-1.5 border border-red-800/60 text-black bg-transparent hover:bg-red-900/30 hover:text-red-300 transition-colors duration-200"
                                >
                                    Add
                                </button>
                            </div>

                            <p className="text-xs text-black uppercase mt-1">
                                Coordinators
                            </p>
                            <div className="flex gap-3 items-baseline w-full">
                                <div className="flex flex-col gap-y-2 w-full">
                                    {coordinatorFields.map((field, index) => {
                                        return (
                                            <div
                                                key={field.id}
                                                className="flex w-full gap-3 items-center"
                                            >
                                                <input
                                                    type="text"
                                                    {...register(
                                                        `coordinators.${index}.value` as const,
                                                    )}
                                                    className="outline-none border border-black bg-white/4 text-black placeholder-black py-2 px-3 text-sm focus:border-black focus:bg-yellow/6 transition-colors duration-200 w-full sm:grow"
                                                    placeholder={`Coordinator ${index + 1}`}
                                                />
                                                {index > 0 && (
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            removeCoordinator(index)
                                                        }
                                                        className="shrink-0 text-[0.65rem] font-medium tracking-[0.12em] uppercase px-3 py-1.5 border border-red-800/60 text-black bg-transparent hover:bg-red-900/30 hover:text-red-300 transition-colors duration-200"
                                                    >
                                                        Remove
                                                    </button>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                                <button
                                    type="button"
                                    onClick={() => appendCoordinator({ value: "" })}
                                    className="shrink-0 text-[0.65rem] font-medium tracking-[0.12em] uppercase px-3 py-1.5 border border-red-800/60 text-black bg-transparent hover:bg-red-900/30 hover:text-red-300 transition-colors duration-200"
                                >
                                    Add
                                </button>
                            </div>

                            <button
                                type="submit"
                                className="w-full mt-5 py-2.5 px-4 font-elnath tracking-[0.2em] uppercase text-sm bg-red-700 text-black hover:bg-yellow disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200"
                                disabled={message === "Submitting.."}
                            >
                                Submit
                            </button>
                        </form>
                        <p className="text-yellow text-sm tracking-wider">
                            {message}
                        </p>
                    </div>
            </dialog>
        </>
    );
}

export default EditEventDetails;
