import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { CategoryId } from "../../types/categories";
import ForumHeader from "./components/SubHeader/SubHeader";
import Forum from "./components/Forum/Forum";
import Artists from "./components/Artists/Artists";
import Jobs from "./components/Jobs/Jobs";

const MainPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: CategoryId }>();
  const [selectedSection, setSelectedSection] = useState<
    "Forum" | "Jobs" | "Artists"
  >("Forum"); // Default to "Forum"

  const currentCategory = categoryId || CategoryId.MAIN;

  const handleSectionChange = (section: "Forum" | "Jobs" | "Artists") => {
    setSelectedSection(section);
  };

  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Header with category name and section buttons */}
      <ForumHeader onSectionChange={handleSectionChange} />

      <main className="flex-grow px-2 sm:px-4 md:px-6 lg:px-8 mt-4">
        <div className="max-w-7xl mx-auto w-full space-y-6 mt-4 sm:mt-6 md:mt-8">
          {selectedSection === "Jobs" && <Jobs />}
          {selectedSection === "Artists" && (
            <Artists categoryId={currentCategory} />
          )}
          {selectedSection === "Forum" && (
            <Forum categoryId={currentCategory} />
          )}
        </div>
      </main>
    </div>
  );
};

export default MainPage;
