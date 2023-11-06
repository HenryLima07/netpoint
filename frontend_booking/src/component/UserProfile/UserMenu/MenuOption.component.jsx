const MenuOption = ({ className, children, ...props }) => {
  return (
    <li
      className={`flex flex-row items-center gap-2 font-inter text-base cursor-pointer lg:text-lg xl:text-xl ${className}`}
      {...props}
    >
      {children}
    </li>
  );
};

export default MenuOption;
