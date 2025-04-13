import React from "react";

type SectionType = "Forum" | "Jobs" | "Artists";

interface SubHeaderProps {
  currentSection?: SectionType; // Optional to maintain backward compatibility
  onSectionChange: (section: SectionType) => void;
}

const SubHeader: React.FC<SubHeaderProps> = ({ currentSection = "Forum", onSectionChange }) => {
  const baseClasses = "px-4 md:px-23 py-2 text-base md:text-lg cursor-pointer hover:text-beige-100 rounded-full transition-colors duration-300 ease-in-out";
  
  return (
    <header className="bg-white py-0 px-2 md:px-0 rounded-full mx-auto max-w-fit text-center mt-4 flex gap-4 md:gap-10 shadow-lg">
      <button
        className={`${baseClasses} ${
          currentSection === "Forum"
            ? "bg-granat font-semibold text-beige-100"
            : "text-beige-light font-semibold hover:bg-granat"
        }`}
        onClick={() => onSectionChange("Forum")}
      >
        Forum
      </button>
      <button
        className={`${baseClasses} ${
          currentSection === "Jobs"
            ? "bg-granat font-semibold text-beige-100"
            : "text-beige-light font-semibold hover:bg-granat"
        }`}
        onClick={() => onSectionChange("Jobs")}
      >
        Jobs
      </button>
      <button
        className={`${baseClasses} ${
          currentSection === "Artists"
            ? "bg-granat font-semibold text-beige-100"
            : "text-beige-light font-semibold hover:bg-granat"
        }`}
        onClick={() => onSectionChange("Artists")}
      >
        Artists
      </button>
    </header>
  );
};

export default SubHeader;