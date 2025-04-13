import { useState } from "react";

const SubHeader = ({
  onSectionChange,
}: {
  onSectionChange: (section: "Forum" | "Jobs" | "Artists") => void;
}) => {
  const [selectedSection, setSelectedSection] = useState<
    "Forum" | "Jobs" | "Artists"
  >("Forum");
  const [hovering, setHovering] = useState<null | "Forum" | "Jobs" | "Artists">(
    null
  );

  const handleSectionChange = (section: "Forum" | "Jobs" | "Artists") => {
    setSelectedSection(section);
    onSectionChange(section);
  };

  const renderButton = (section: "Forum" | "Jobs" | "Artists") => {
    const isSelected = selectedSection === section;
    const isHovering = hovering === section;
    
    // Base classes that don't change
    const baseClasses = "px-4 md:px-25 py-2 text-base md:text-lg cursor-pointer rounded-full transition-colors duration-300 ease-in-out";
    
    // Determine background and text color classes based on state
    let stateClasses = "";
    
    if (isSelected) {
      stateClasses = "bg-granat font-semibold text-beige-100"; // Selected state
    } else if (isHovering) {
      stateClasses = "bg-granat font-semibold text-beige-100"; // Hover state when not selected
    } else {
      stateClasses = "text-beige-light font-semibold hover:bg-granat hover:text-beige-light"; // Default state
    }
    
    return (
      <button
        key={section}
        onClick={() => handleSectionChange(section)}
        onMouseEnter={() => setHovering(section)}
        onMouseLeave={() => setHovering(null)}
        className={`${baseClasses} ${stateClasses}`}
      >
        {section}
      </button>
    );
  };

  return (
    <header className="bg-white py-0 px-2 md:px-0 rounded-full mx-auto max-w-fit text-center mt-4 flex gap-4 md:gap-10">
      {["Forum", "Jobs", "Artists"].map((section) =>
        renderButton(section as any)
      )}
    </header>
  );
};

export default SubHeader;