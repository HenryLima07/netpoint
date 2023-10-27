const NoBorderButton = ({
  className,
  children,
  handleClick = () => {},
  ...props
}) => {
  return (
    <button
      className={`rounded-xl hover:cursor-pointer ${className}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default NoBorderButton;
