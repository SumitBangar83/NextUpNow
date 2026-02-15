import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen">
      <Link href="/home" ><ul>this is home page link</ul></Link>
      <Link href="/myTask" ><ul>this is task page link</ul></Link>
    </div>
  );
}
