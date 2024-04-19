import Icon from "@UI/Icon/Icon";
import React, { useState } from "react";
import { useOnClickOutside } from "./hooks/useOnClickOutside";

export interface Option<T> {
  label: string;
  value: T;
}

type ConferenceButtonProps<T> = {
  children: React.ReactNode
  onClick: (value: T) => void;
  classNames?: string
  options: Option<T>[];
}

export const ConferenceButtons = <T,>({ options, children, onClick, classNames = '' }: ConferenceButtonProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const ref = useOnClickOutside(() => {
    setIsOpen(false);
  });

  const handleClick = (value: T) => {
    setIsOpen(false);
    onClick(value);
  }

  isOpen ? classNames += "bg-[#454f50] text-white" : classNames;
  return (
    <div className="relative inline-block text-left" ref={ref}>
      <div>
        <button
          type="button"
          className={`flex w-fit rounded-md items-center pl-4 pr-2 h-[86px] rounded-[12px] hover:bg-[#454f50] hover:text-white ${classNames}`}
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
          onClick={toggleDropdown}
        >
          <div className="flex flex-row  justify-center text-xs">
            {children}
            <Icon variant="shevron-mini-closed" className="text-center" />
          </div>
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 bottom-full mt-2 w-56 rounded-md shadow-lg bg-[#454f50] text-white w-fit min-w-[120px] rounded-[12px] mb-[2px]">
          <div
            className="py-1 px-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {
              options.map((o: Option<T>) => (
                <button
                  className="flex block px-4 py-2 text-sm text-gray-700  hover:bg-[#202323] w-full rounded-[12px] text-xs"
                  role="menuitem"
                  onClick={() => handleClick(o.value)}
                >
                  {o.label}
                </button>
              )

              )}
          </div>
        </div>
      )}
    </div>
  );
};
