import LandingPage from "./components/LandingPage";
import AboutUs from "./components/AboutUs";
import Contact from "./components/Contact";
import ChoosePage from "./components/ChoosePage";
import { useState } from "react";
import LandigPageMedStaff from "./components/LandigPageMedStaff";

export default function HomePage() {
  const [profilePacient, setProfilePacient] = useState(false);
  const [profileMedStaff, setProfileMedStaff] = useState(false);

  const handleBackToChoosePage = () => {
    if (profileMedStaff) {
      setProfileMedStaff(false);
    }
    if (profilePacient) {
      setProfilePacient(false);
    }
  };

  const handleChooseProfilePacient = () => {
    if (profilePacient === false) {
      setProfilePacient(true);
    }
  };

  const handleChooseProfileMedStaff = () => {
    if (profileMedStaff === false) {
      setProfileMedStaff(true);
    }
  };

  return (
    <>
      {profilePacient ? (
        <>
          <LandingPage
            profileMedStaff={profileMedStaff}
            profilePacient={profilePacient}
            setProfileMedStaff={setProfileMedStaff}
            setProfilePacient={setProfilePacient}
            handleBackToChoosePage={handleBackToChoosePage}
          />
          <AboutUs />
          <Contact />
        </>
      ) : (
              <ChoosePage
                handleChooseProfileMedStaff={handleChooseProfileMedStaff}
                handleChooseProfilePacient={handleChooseProfilePacient}
              />
        ) && profileMedStaff ? (
        <LandigPageMedStaff handleBackToChoosePage={handleBackToChoosePage} />
      ) : (
        <ChoosePage
          handleChooseProfileMedStaff={handleChooseProfileMedStaff}
          handleChooseProfilePacient={handleChooseProfilePacient}
        />
      )}
    </>
  );
}
