import ToggleThemeButton from "@/components/toggle-theme-button/toggle-theme-button";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="w-full flex justify-between items-center">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/tiramisu-logo.png"
          alt="Tiramisu Logo"
          width={40}
          height={40}
        />
        <h1 className="text-2xl font-bold">Tiramisu</h1>
      </Link>
      <ToggleThemeButton />
    </div>
  );
};

export default Navbar;
