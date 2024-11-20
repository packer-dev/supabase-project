import { useFieldArray, useFormContext } from 'react-hook-form';
import FormItem from '../FormItem';
import { FormFields } from '../schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Combobox } from '@/app/common/Combobox';
import { MinusCircle, Plus } from 'lucide-react';

type ListOfQuestionProps = {
  isYesNo?: boolean;
};

const ListOfQuestion = ({ isYesNo }: ListOfQuestionProps) => {
  const value1 = isYesNo ? 'Yes' : 'True';
  const value2 = isYesNo ? 'No' : 'False';
  const optionItems = [
    {
      label: value1,
      value: value1.toLowerCase(),
    },
    {
      label: value2,
      value: value2.toLowerCase(),
    },
    {
      label: 'Not given',
      value: 'Not given',
    },
  ];
  const { control } = useFormContext<FormFields>();
  const listOfQuestion = useFieldArray<FormFields>({
    control,
    name: isYesNo ? 'yesNo' : 'trueFalse',
  });
  return (
    <FormItem className="mt-6" label="List of question" required>
      <div className="flex flex-col gap-2 w-full">
        {listOfQuestion.fields.map((item) => (
          <div key={item.id} className="flex items-center gap-2 w-full">
            <Button variant="secondary" type="button" className="w-10 h-10">
              2
            </Button>
            <Input placeholder="Input..." className="flex-1" />
            <div>
              <Combobox list={optionItems}></Combobox>
            </div>
            <Button variant="secondary" type="button" className="w-10 h-10 p-1">
              <MinusCircle size={24} />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          onClick={() =>
            listOfQuestion.append({
              value: '',
            })
          }
          variant="secondary"
          className="flex py-0 items-center gap-2"
        >
          <Plus />
          <span>Add new question</span>
        </Button>
      </div>
    </FormItem>
  );
};

export default ListOfQuestion;
