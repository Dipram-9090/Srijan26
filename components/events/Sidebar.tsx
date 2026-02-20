"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import gsap from "gsap";
import { Category } from "@/components/events/types/events";
import { CLIP_PATH } from "./constants/events";

interface SidebarProps {
  categories: Category[];
  activeCategory: Category;
  setActiveCategory: (category: Category) => void;
  statuses: string[];
  activeStatus: string;
  setActiveStatus: (status: string) => void;
}

type DropdownSection = "categories" | "status" | null;

const Sidebar: React.FC<SidebarProps> = ({
  categories,
  activeCategory,
  setActiveCategory,
  statuses,
  activeStatus,
  setActiveStatus,
}) => {
  // Single state to manage which dropdown is open (defaults to "categories")
  const [openSection, setOpenSection] = useState<DropdownSection>("categories");

  // Derived booleans for easier readability in GSAP and render logic
  const isCategoriesOpen = openSection === "categories";
  const isStatusOpen = openSection === "status";

  const toggleSection = (section: DropdownSection) => {
    // If clicking the already open section, close it. Otherwise, open the new one.
    setOpenSection((prev) => (prev === section ? null : section));
  };

  // Refs for GSAP animations
  const categoriesRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  // Animate Categories Dropdown
  useEffect(() => {
    const el = categoriesRef.current;
    if (!el) return;

    if (isCategoriesOpen) {
      gsap.to(el, {
        height: "auto",
        opacity: 1,
        duration: 0.35,
        ease: "power2.out",
      });
    } else {
      gsap.to(el, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
      });
    }
  }, [isCategoriesOpen]);

  // Animate Status Dropdown
  useEffect(() => {
    const el = statusRef.current;
    if (!el) return;

    if (isStatusOpen) {
      gsap.to(el, {
        height: "auto",
        opacity: 1,
        duration: 0.35,
        ease: "power2.out",
      });
    } else {
      gsap.to(el, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
      });
    }
  }, [isStatusOpen]);

  return (
    <aside className="hidden lg:block w-64 shrink-0 space-y-8">
      <div className="sticky top-24 space-y-8">
        
        {/* Categories Section */}
        <div>
          <button
            onClick={() => toggleSection("categories")}
            className="w-full font-euclid text-lg mb-2 pb-2 flex items-center justify-between text-yellow-200 border-b border-white/20 hover:text-yellow-100 transition-colors"
          >
            <span>Categories</span>
            <ChevronDown
              size={20}
              className={`transition-transform duration-300 ${
                isCategoriesOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>

          <div ref={categoriesRef} className="overflow-hidden">
            <div className="flex flex-col gap-2 pt-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{ clipPath: CLIP_PATH }}
                  className={`font-euclid text-left pl-10 px-4 py-2 rounded-lg transition-all duration-200 text-sm ${
                    activeCategory === cat
                      ? "bg-red-500 text-white font-medium"
                      : "text-white hover:bg-white/20 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Status Section */}
        <div>
          <button
            onClick={() => toggleSection("status")}
            className="w-full font-euclid text-lg mb-2 pb-2 flex items-center justify-between text-yellow-200 border-b border-white/20 hover:text-yellow-100 transition-colors"
          >
            <span>Status</span>
            <ChevronDown
              size={20}
              className={`transition-transform duration-300 ${
                isStatusOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>

          <div ref={statusRef} className="overflow-hidden">
            <div className="flex flex-col gap-2 pt-2">
              {statuses.map((status) => (
                <button
                  key={status}
                  onClick={() => setActiveStatus(status)}
                  style={{ clipPath: CLIP_PATH }}
                  className={`font-euclid text-left pl-10 px-4 py-2 rounded-lg transition-all duration-200 text-sm ${
                    activeStatus === status
                      ? "bg-red-500 text-white font-medium"
                      : "text-white hover:bg-white/20 hover:text-white"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;