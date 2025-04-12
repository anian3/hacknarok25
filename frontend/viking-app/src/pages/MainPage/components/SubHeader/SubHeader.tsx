import { useState } from "react";

const SubHeader = ({ onSectionChange }: { onSectionChange: (section: 'Forum' | 'Jobs' | 'Artists') => void }) => {
  const [selectedSection, setSelectedSection] = useState<'Forum' | 'Jobs' | 'Artists'>('Forum');
  const [hovering, setHovering] = useState<null | 'Forum' | 'Jobs' | 'Artists'>(null);

  const handleSectionChange = (section: 'Forum' | 'Jobs' | 'Artists') => {
    setSelectedSection(section);
    onSectionChange(section);
  };

  const renderButton = (section: 'Forum' | 'Jobs' | 'Artists') => {
    const isSelected = selectedSection === section;
    const isHoveringAnother = hovering !== null && hovering !== section;

    const baseClasses =
      'mx-0 px-25 py-2 text-lg cursor-pointer rounded-full transition-colors duration-300 ease-in-out';

    const selectedClasses = isHoveringAnother
      ? 'bg-slate-500 text-white'
      : 'bg-granat text-white';

    const hoverClasses = 'hover:bg-granat hover:text-white';

    return (
      <button
        key={section}
        onClick={() => handleSectionChange(section)}
        onMouseEnter={() => setHovering(section)}
        onMouseLeave={() => setHovering(null)}
        className={`${baseClasses} ${isSelected ? selectedClasses : hoverClasses}`}
      >
        {section}
      </button>
    );
  };

  return (
    <header className="bg-white py-0 px-0 rounded-full mx-auto max-w-fit text-center mt-4 flex gap-10"> 
      {['Forum', 'Jobs', 'Artists'].map((section) => renderButton(section as any))}
    </header>
  );
};

export default SubHeader;