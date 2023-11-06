import MenuOption from "./MenuOption.component";
import { Person } from "react-bootstrap-icons";

const UserMenu = ({ ...props }) => {
  const {
    UserActivity,
    UserUpdation,
    UserGeneral,
    handleUserGeneralSelection,
    handleUserUpdationSelection,
    handleUserActivitySelection,
  } = props;

  return (
    <section className="border-b-2 p-3 border-light-gray w-full">
      <ul className="flex flex-row flex-wrap gap-3 sm:gap-12 md:gap-14 lg:gap-16">
        <MenuOption
          className={`${
            UserGeneral ? "font-bold text-dark-gray" : "text-light-gray"
          }`}
          onClick={() => {
            handleUserGeneralSelection(true);
            handleUserUpdationSelection(false);
            handleUserActivitySelection(false);
          }}
        >
          {" "}
          <Person
            className={`${
              UserGeneral
                ? " text-lg md:text-2xl font-bold text-dark-gray"
                : "text-light-gray"
            }`}
          />{" "}
          Vista general
        </MenuOption>

        <MenuOption
          className={`${
            UserActivity ? "font-bold text-dark-gray" : "text-light-gray"
          }`}
          onClick={() => {
            handleUserGeneralSelection(false);
            handleUserUpdationSelection(false);
            handleUserActivitySelection(true);
          }}
        >
          {" "}
          <Person
            className={`${
              UserActivity
                ? "text-lg md:text-2xl font-bold text-dark-gray"
                : "text-light-gray"
            }`}
          />
          Tu agenda
        </MenuOption>

        <MenuOption
          className={`${
            UserUpdation ? "font-bold text-dark-gray" : "text-light-gray"
          }`}
          onClick={() => {
            handleUserGeneralSelection(false);
            handleUserUpdationSelection(true);
            handleUserActivitySelection(false);
          }}
        >
          {" "}
          <Person
            className={`${
              UserUpdation
                ? "text-lg md:text-2xl font-bold text-dark-gray"
                : "text-light-gray"
            }`}
          />
          Actualizar perfil
        </MenuOption>
      </ul>
    </section>
  );
};

export default UserMenu;
