
import Link from "next/link";
import { Radio } from "lucide-react";
import { getLiveEvents } from "@/lib/liveEvents";
import { AnimatedSectionTitle } from "./AnimatedSectionTitle";

const CARD_CLIP_PATH = "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)";
const TAG_CLIP_PATH = "polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)";

export default async function LiveEvents() {
    const events = await getLiveEvents();

    if (events.length === 0) {
        return (
            <section className="w-full relative z-10 py-16 lg:py-24 overflow-hidden">
                <div className="w-full max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-24 flex flex-col items-center justify-center gap-12">
                    <div className="flex justify-center w-full">
                        <AnimatedSectionTitle
                            text="LIVE EVENTS"
                            className="p-0 font-elnath text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl uppercase tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.3em] text-amber-200/90"
                        />
                    </div>
                    
                    {/* The Card */}
                    <div className="w-full flex justify-center">
                        <div 
                            className="relative bg-white/10 p-[1px] w-full max-w-lg"
                            style={{ clipPath: CARD_CLIP_PATH }}
                        >
                            <div 
                                className="bg-[#121212]/90 backdrop-blur-md px-8 py-12 flex flex-col items-center justify-center gap-4 w-full"
                                style={{ clipPath: CARD_CLIP_PATH }}
                            >
                                <Radio className="h-8 w-8 text-white/20" strokeWidth={1.5} />
                                <span className="text-white/40 font-euclid tracking-[0.2em] uppercase text-sm sm:text-base text-center font-semibold">
                                    No Events Currently Live
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        );
    }

    return (
        <section className="w-full overflow-hidden py-16 flex flex-col gap-10 relative z-10">
            {/* Title Section */}
            <div className="w-full max-w-[1500px] mx-auto flex flex-col items-center px-6 sm:px-10 lg:px-24">
                <AnimatedSectionTitle
                    text="LIVE EVENTS"
                    className="p-0 font-elnath text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl uppercase tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.3em] text-amber-200/90 flex justify-center text-center whitespace-nowrap w-full"
                />
            </div>

            {/* Events Grid */}
            <div className="w-full max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.map((event) => (
                        <Link
                            key={event.id}
                            href={`/events/${event.slug}`}
                            className="group relative flex flex-col bg-white/10 hover:bg-[#EBD87D]/50 p-[1px] transition-colors duration-300"
                            style={{ clipPath: CARD_CLIP_PATH }}
                        >
                            <div 
                                className="relative bg-[#121212]/95 backdrop-blur-md p-6 sm:p-8 h-full flex flex-col justify-between z-10 group-hover:bg-[#1a1a1a]/95 transition-colors duration-300"
                                style={{ clipPath: CARD_CLIP_PATH }}
                            >
                                <div className="flex flex-col gap-2">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-xl sm:text-2xl font-elnath text-white group-hover:text-[#EBD87D] transition-colors duration-300">
                                            {event.name}
                                        </h3>
                                        {/* sleek live dot */}
                                        <div className="mt-2 h-2 w-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)] animate-pulse shrink-0" />
                                    </div>
                                    
                                    <div className="flex flex-wrap items-center gap-3 mt-auto text-white/70 font-euclid uppercase tracking-widest font-semibold text-[10px] sm:text-[11px]">
                                        <span 
                                            className="px-3 py-1.5 bg-white/5 border border-white/10" 
                                            style={{ clipPath: TAG_CLIP_PATH }}
                                        >
                                            {event.round}
                                        </span>
                                        {event.location && (
                                            <span 
                                                className="px-3 py-1.5 bg-white/5 border border-white/10" 
                                                style={{ clipPath: TAG_CLIP_PATH }}
                                            >
                                                {event.location}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                
                                {/* Subtle scanline effect on hover */}
                                <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.2)_50%)] bg-[length:100%_4px] opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
