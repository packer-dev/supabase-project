import { ArrowLeft, SquarePen } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const HeaderDetailLesson = () => {
  return (
    <div className="flex gap-6 items-center mb-6">
      <Link href="/courses">
        <ArrowLeft size={20} className="cursor-pointer" />
      </Link>
      <div className="-mt-1">
        <p className="font-semibold text-2xl">Vocabulary: Daily activities</p>
        <p className="">Unit 1: Daily routine</p>
      </div>
      <SquarePen size={14} className="cursor-pointer" />
    </div>
  );
};

export default HeaderDetailLesson;
