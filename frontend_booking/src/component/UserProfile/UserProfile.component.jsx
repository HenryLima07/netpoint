import UserActivity from "./UserActivities/UserActivity.component";
import UserDescription from "./UserDescription/UserDescription.component";
import UserGeneral from "./UserActivities/UserGeneral.component";
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
    <div className="w-[95%] md:w-[w-90%]">
      <UserMenu
        UserActivity={UserActivitySelected}
        UserUpdation={UserUpdationSelected}
        UserGeneral={UserGeneralSelected}
        handleUserActivitySelection={handleUserActivitySelection}
        handleUserUpdationSelection={handleUserUpdationSelection}
        handleUserGeneralSelection={handleUserGeneralSelection}
      />
      <section className="flex flex-col md:flex-row w-full ">
        <UserDescription
          className={"w-full md:w-1/3 min-w-[250px]"}
          handleUserActivitySelection={handleUserActivitySelection}
          handleUserUpdationSelection={handleUserUpdationSelection}
          handleUserGeneralSelection={handleUserGeneralSelection}
        />
        <hr className="md:h-auto md:w-[1px] w-full h-[1px] bg-light-gray" />

        {UserActivitySelected ? (
          <UserActivity className={" w-full min-w-[260px] h-max"} />
        ) : (
          <></>
        )}

        {UserUpdationSelected ? (
          <UserUpdation className={" w-2/3 min-w-[250px]"} />
        ) : (
          <></>
        )}
        {UserGeneralSelected ? (
          <UserGeneral className={" w-full min-w-[260px] h-[80vh] md:h-auto"} />
        ) : (
          <></>
        )}
      </section>
    </div>
  );
};

export default UserProfileComponent;
