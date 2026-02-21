import React, { useRef, useEffect, useState } from "react";
import { useForm, type SubmitHandler, useFieldArray } from "react-hook-form";
import {
    transformCategory,
    validateCategory,
    getEventBySlug,
    updateEvent,
} from "@/services/EventManagementService";
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
                className="fixed top-1/2 left-1/2 z-300 m-0 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 border border-white/20 bg-black p-0 backdrop:bg-black/80 text-white"
                onClick={(e) => {
                    if (e.target === dialogRef.current) close();
                }}
            >
                <div className="flex flex-col items-center gap-8 px-8 py-8">
                    <span tabIndex={0} className="sr-only" />
                    <div className="flex justify-between w-full">
                        <h2>Manage Event Listing</h2>
                        <button
                            onClick={closeDialog}
                            className="bg-white text-black px-2 py-1 rounded-sm"
                        >
                            Close
                        </button>
                    </div>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col gap-y-1 w-full"
                    >
                        <div className="flex flex-col gap-y-1">
                            <input
                                type="text"
                                className="outline-none border border-primary py-1 px-2 rounded-sm"
                                {...register("name", {
                                    required: "This field is required",
                                })}
                                placeholder="Event Name"
                            />
                            <span
                                className={`text-xs ${
                                    errors.name
                                        ? "text-red-500"
                                        : "text-transparent"
                                }`}
                            >
                                {errors.name?.message}.
                            </span>
                        </div>

                        <div className="flex flex-col gap-y-1">
                            <input
                                type="text"
                                className="outline-none border border-primary py-1 px-2 rounded-sm"
                                {...register("slug", {
                                    required: "This field is required",
                                })}
                                placeholder="Event Slug"
                            />
                            <span
                                className={`text-xs ${
                                    errors.slug
                                        ? "text-red-500"
                                        : "text-transparent"
                                }`}
                            >
                                {errors.slug?.message}.
                            </span>
                        </div>

                        <div className="flex flex-col gap-y-1">
                            <input
                                type="text"
                                className="outline-none border border-primary py-1 px-2 rounded-sm"
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
                                        ? "text-red-500"
                                        : "text-transparent"
                                }`}
                            >
                                {errors.category?.message}.
                            </span>
                        </div>

                        <div className="flex flex-col gap-y-1">
                            <textarea
                                className="outline-none border border-primary py-1 px-2 rounded-sm"
                                {...register("description", {
                                    required: "This is required",
                                })}
                                placeholder="Event Description"
                            />
                            <span
                                className={`text-xs ${
                                    errors.description
                                        ? "text-red-500"
                                        : "text-transparent"
                                }`}
                            >
                                {errors.description?.message}.
                            </span>
                        </div>

                        <div className="flex flex-col gap-y-1">
                            <input
                                type="text"
                                className="outline-none border border-primary py-1 px-2 rounded-sm"
                                {...register("registrationDeadline", {
                                    required: "This field is required",
                                })}
                                placeholder="Registration Deadline"
                            />
                            <span
                                className={`text-xs ${
                                    errors.registrationDeadline
                                        ? "text-red-500"
                                        : "text-transparent"
                                }`}
                            >
                                {errors.registrationDeadline?.message}.
                            </span>
                        </div>

                        <div className="flex flex-col gap-y-1">
                            <input
                                type="text"
                                className="outline-none border border-primary py-1 px-2 rounded-sm"
                                {...register("teamSize", {
                                    required: "This field is required",
                                })}
                                placeholder="Team Size"
                            />
                            <span
                                className={`text-xs ${
                                    errors.teamSize
                                        ? "text-red-500"
                                        : "text-transparent"
                                }`}
                            >
                                {errors.teamSize?.message}.
                            </span>
                        </div>

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
                                                className="outline-none border border-primary py-1 px-2 rounded-sm w-full sm:grow"
                                                placeholder={`Rule ${index + 1}`}
                                            />
                                            {index > 0 && (
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeRule(index)
                                                    }
                                                    className="bg-ink text-background p-1 rounded-sm text-sm"
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
                                className="bg-ink text-background py-1 px-2 rounded-sm text-sm"
                            >
                                Add
                            </button>
                        </div>

                        <div className="flex gap-3 items-baseline w-full my-6">
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
                                                className="outline-none border border-primary py-1 px-2 rounded-sm w-full sm:grow"
                                                placeholder={`Prize ${index + 1}`}
                                            />
                                            {index > 0 && (
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removePrize(index)
                                                    }
                                                    className="bg-ink text-background p-1 rounded-sm text-sm"
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
                                className="bg-ink text-background py-1 px-2 rounded-sm text-sm"
                            >
                                Add
                            </button>
                        </div>

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
                                                className="outline-none border border-primary py-1 px-2 rounded-sm w-full sm:grow"
                                                placeholder={`Date ${index + 1}`}
                                            />
                                            {index > 0 && (
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeDate(index)
                                                    }
                                                    className="bg-ink text-background p-1 rounded-sm text-sm"
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
                                className="bg-ink text-background py-1 px-2 rounded-sm text-sm"
                            >
                                Add
                            </button>
                        </div>

                        <button
                            type="submit"
                            className="bg-ink text-background py-1 px-2 rounded-sm"
                            disabled={message === "Submitting.."}
                        >
                            Submit
                        </button>
                    </form>
                    <p className="text-primary">{message}</p>
                </div>
            </dialog>
        </>
    );
}

export default EditEventDetails;
