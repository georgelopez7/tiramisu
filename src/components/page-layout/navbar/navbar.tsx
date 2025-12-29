import ToggleThemeButton from "@/components/toggle-theme-button/toggle-theme-button";

const Navbar = () => {
  return (
    <div className="w-full flex justify-between items-center">
      <h1 className="text-xl font-semibold">Tiramisu</h1>
      <ToggleThemeButton />
    </div>
  );
};

export default Navbar;
