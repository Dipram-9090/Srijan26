"use client";

import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

interface MerchSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  options: { label: string; value: string }[];
  placeholder: string;
}

export function MerchSelect({ value, onValueChange, options, placeholder }: MerchSelectProps) {
  return (
    <Select.Root value={value} onValueChange={onValueChange}>
      <Select.Trigger className="inline-flex items-center justify-between w-full bg-white/5 border border-white/20 hover:bg-white/10 rounded-lg px-4 py-2.5 text-white outline-none focus:border-[#EBD87D] focus:ring-1 focus:ring-[#EBD87D] transition data-[placeholder]:text-white/50">
        <Select.Value placeholder={placeholder} />
        <Select.Icon className="text-[#EBD87D]">
          <ChevronDown className="h-4 w-4 opacity-80" />
        </Select.Icon>
      </Select.Trigger>
      
      <Select.Portal>
        <Select.Content position="popper" sideOffset={4} className="overflow-hidden bg-neutral-900 border border-white/20 rounded-lg shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] z-[100] animate-in fade-in-80 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 min-w-[var(--radix-select-trigger-width)]">
          <Select.ScrollUpButton className="flex items-center justify-center h-[25px] bg-neutral-900 text-white cursor-default">
            <ChevronUp className="h-4 w-4" />
          </Select.ScrollUpButton>
          <Select.Viewport className="p-1">
            {options.map((option) => (
              <Select.Item
                key={option.value}
                value={option.value}
                className="text-[14px] leading-none text-white/90 rounded-[5px] flex items-center h-[35px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-white/30 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-[#EBD87D] data-[highlighted]:text-black transition-colors cursor-pointer"
              >
                <Select.ItemText>{option.label}</Select.ItemText>
                <Select.ItemIndicator className="absolute left-[5px] w-[20px] inline-flex items-center justify-center">
                  <Check className="h-3.5 w-3.5" />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
          <Select.ScrollDownButton className="flex items-center justify-center h-[25px] bg-neutral-900 text-white cursor-default">
            <ChevronDown className="h-4 w-4" />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
