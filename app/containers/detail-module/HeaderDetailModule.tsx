import { ArrowLeft, SquarePen } from "lucide-react";
import Link from "next/link";

const HeaderDetailModule = () => {
  return (
    <div className="flex gap-6 items-center mb-6">
      <Link href="/courses">
        <ArrowLeft size={20} className="cursor-pointer" />
      </Link>
      <div className="-mt-1">
        <p className="font-semibold text-2xl">Unit 1: Daily routine</p>
        <p className="">BỨC PHÁ IELTS 3.0 - 4.5+</p>
      </div>
      <SquarePen size={14} className="cursor-pointer" />
    </div>
  );
};

export default HeaderDetailModule;
