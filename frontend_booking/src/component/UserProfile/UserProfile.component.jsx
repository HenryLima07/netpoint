import UserActivity from "./UserActivities/UserActivity.component";
import UserDescription from "./UserDescription/UserDescription.component";
import UserMenu from "./UserMenu/UserMenu.component";
import UserUpdation from "./UserActivities/UserUpdation.component";
import { useState } from "react";

const UserProfileComponent = () => {
  const [UserActivitySelected, setUserActivitySelected] = useState(false);
  const [UserUpdationSelected, setUserUpdationSelected] = useState(false);
  const [UserGeneralSelected, setUserGeneralSelected] = useState(true);

  const handleUserActivitySelection = (state) => setUserActivitySelected(state);
  const handleUserUpdationSelection = (state) => setUserUpdationSelected(state);
  const handleUserGeneralSelection = (state) => setUserGeneralSelected(state);

  return (
    <div className="w-[90%] md:w-[w-85%]">
      <UserMenu
        UserActivity={UserActivitySelected}
        UserUpdation={UserUpdationSelected}
        UserGeneral={UserGeneralSelected}
        handleUserActivitySelection={handleUserActivitySelection}
        handleUserUpdationSelection={handleUserUpdationSelection}
        handleUserGeneralSelection={handleUserGeneralSelection}
      />
      <section className="flex flex-col md:flex-row  w-full">
        <UserDescription
          className={" w-1/3 sm:w-full md:w-1/3 min-w-[250px]"}
          handleUserActivitySelection={handleUserActivitySelection}
          handleUserUpdationSelection={handleUserUpdationSelection}
          handleUserGeneralSelection={handleUserGeneralSelection}
        />

        <UserActivity className={" w-2/3 min-w-[250px]"} />
      </section>
    </div>
  );
};

export default UserProfileComponent;
