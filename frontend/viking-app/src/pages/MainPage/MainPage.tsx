import React from "react";
import { useParams } from "react-router-dom";
import { CategoryId } from "../../types/categories";
import { useState } from "react";
import SubHeader from "./components/SubHeader/SubHeader";
import Forum from "./components/Forum/Forum";
import Artists from "./components/Artists/Artists";
import Jobs from "./components/Jobs/Jobs";

const MainPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: CategoryId }>();
  const [selectedSection, setSelectedSection] = useState<
    "Forum" | "Jobs" | "Artists"
  >("Forum"); // Domyślnie "Forum"

  const currentCategory = categoryId || CategoryId.MAIN;
  const handleSectionChange = (section: "Forum" | "Jobs" | "Artists") => {
    setSelectedSection(section);
  };

  return (
    <div className="flex flex-col m-0 items-center justify-center w-max bg-beige-100 px-5 mx-auto min-h-screen">
      {/* Header with category name and section buttons */}
      <SubHeader onSectionChange={handleSectionChange} />
      <main className="flex-grow text-center mt-4 px-0">
        <div className="space-y-6 mt-8">
          {selectedSection === "Jobs" && <Jobs />}
          {selectedSection === "Artists" && <Artists />}
          {selectedSection === "Forum" && (
            <Forum categoryId={currentCategory} />
          )}
        </div>
      </main>
    </div>
  );
};

export default MainPage;
