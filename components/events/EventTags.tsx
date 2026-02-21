import React from "react";

interface Props {
  category: string;
}

export default function EventTags({ category }: Props) {
  return (
    <div className="flex flex-wrap gap-3">
      <span className="bg-white/10 border border-white/20 px-3 py-1 rounded text-xs uppercase tracking-wider text-white">
        Srijan '26
      </span>
      <span className="bg-white/10 border border-white/20 px-3 py-1 rounded text-xs uppercase tracking-wider text-white">
        {category}
      </span>
    </div>
  );
}