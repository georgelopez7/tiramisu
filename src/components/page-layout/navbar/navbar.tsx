import ToggleThemeButton from "@/components/toggle-theme-button/toggle-theme-button";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="w-full flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Image
          src="/tiramisu-logo.png"
          alt="Tiramisu Logo"
          width={40}
          height={40}
        />
        <h1 className="text-2xl font-bold">Tiramisu</h1>
      </div>
      <ToggleThemeButton />
    </div>
  );
};

export default Navbar;
