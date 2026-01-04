import ToggleThemeButton from "@/components/(buttons)/toggle-theme-button/toggle-theme-button";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="w-full flex justify-between items-center">
      <Link href="/" className="flex items-center gap-2">
        <Image
          className="hidden dark:block"
          src="/tiramisu-banner-dark.png"
          alt="dark-mode-image"
          width={200}
          height={60}
        />
        <Image
          className="block dark:hidden"
          src="/tiramisu-banner-light.png"
          alt="light-mode-image"
          width={200}
          height={60}
        />
      </Link>
      <ToggleThemeButton />
    </div>
  );
};

export default Navbar;
