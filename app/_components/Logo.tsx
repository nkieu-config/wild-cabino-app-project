import Link from "next/link";
import Image from "next/image";
import logoImage from "@/public/logo.png";

function Logo() {
  return (
    <Link href="/" className="z-10 flex items-center gap-4">
      <Image
        src={logoImage}
        height="60"
        width="60"
        alt="The Cozy Cabino logo"
        quality={100}
        priority
      />
      <span className="text-primary-100 text-xl font-semibold">
        The Wild Cabino
      </span>
    </Link>
  );
}

export default Logo;
