import { UseFieldArrayReturn } from "react-hook-form";
import { FormFields } from "../schema";
import FormItem from "../FormItem";
import GivenHeading from "./GivenHeading";
import QuestionList from "./QuestionList";
import GivenInformation from "./GivenInformation";

type MatchingSectionProps = {
  fieldListQuestion: UseFieldArrayReturn<FormFields, never, "id">;
  fieldGiven: UseFieldArrayReturn<FormFields, never, "id">;
  label: string;
  haveList?: boolean;
};

const MatchingSection = ({
  fieldListQuestion,
  fieldGiven,
  label,
  haveList,
}: MatchingSectionProps) => {
  return (
    <>
      <FormItem className="mt-6" label={label}>
        {!haveList ? (
          <GivenHeading fieldArray={fieldGiven} />
        ) : (
          <GivenInformation fieldArray={fieldGiven} />
        )}
      </FormItem>
      <QuestionList questionList={fieldListQuestion} />
    </>
  );
};

export default MatchingSection;
