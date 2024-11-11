"use client";

import Form from "@/components/shared/Form";
import FormField from "@/components/shared/FormField";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import HeaderDetailLesson from "./HeaderDetailLesson";
import { useParams } from "next/dist/client/components/navigation";
import TableDetailLesson from "./TableDetailLesson";

const DetailLesson = () => {
  //
  const params = useParams();
  console.log(params);
  //
  return (
    <Card className="p-3 bg-white">
      <HeaderDetailLesson />
    </Card>
  );
};

export default DetailLesson;
