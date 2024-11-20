import { useFieldArray, useForm } from 'react-hook-form';
import { FormFields } from '../schema';
import FormItem from '../FormItem';
import GivenHeading from './GivenHeading';
import QuestionList from './QuestionList';
import GivenInformation from './GivenInformation';

type MatchingSectionProps = {
  label: string;
  haveList?: boolean;
};

const MatchingSection = ({ label, haveList }: MatchingSectionProps) => {
  const { control } = useForm<FormFields>();
  const fieldGiven = useFieldArray<FormFields>({
    control,
    name: haveList ? 'givenInformation.items' : 'givenHeadings',
  });
  return (
    <>
      <FormItem className="mt-6" label={label}>
        {!haveList ? (
          <GivenHeading fieldArray={fieldGiven} />
        ) : (
          <GivenInformation fieldArray={fieldGiven} />
        )}
      </FormItem>
      <QuestionList />
    </>
  );
};

export default MatchingSection;
