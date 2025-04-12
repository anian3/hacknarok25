import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { CategoryId } from "../../types/categories";
import SubHeader from "./components/SubHeader/SubHeader";
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
    // This outer div preserves your original background for the overall page
    <div className="min-h-screen bg-beige-200">
      {/* This inner container preserves your original container with different background */}
      <div className="flex flex-col m-0 items-center justify-center bg-beige-100 mx-auto min-h-screen px-4 md:px-5 max-w-xl md:max-w-4xl">
        <SubHeader onSectionChange={handleSectionChange} />
        <main className="flex-grow text-center mt-4 px-0">
          <div className="space-y-6 mt-8">
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
    </div>
  );
};

export default MainPage;
