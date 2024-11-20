import { Input } from '@/components/ui/input';
import { Combobox } from '@/app/common/Combobox';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { FormFields } from '../schema';
import FormItem from '../FormItem';

type ItemQuestionProps = {
  handleRemoveQuestion: () => void;
  index: number;
};

const ItemQuestion = ({ handleRemoveQuestion, index }: ItemQuestionProps) => {
  const {
    formState: { errors },
    register,
    setValue,
    clearErrors,
  } = useForm<FormFields>();
  const items = [
    { label: 'A', value: 'a' },
    { label: 'B', value: 'b' },
    { label: 'C', value: 'c' },
    { label: 'D', value: 'd' },
  ];
  const [correctHeading, setCorrectHeading] = useState('');
  return (
    <div className="border-dashed p-3 border-2 rounded-sm">
      <FormItem
        label="Question 1"
        styles={{ label: '' }}
        error={errors.questionList?.[index]?.section?.message}
      >
        <Input
          placeholder="Section A"
          {...register(`questionList.${index}.section`)}
        />
      </FormItem>
      <FormItem
        label="Correct heading"
        className="my-3"
        styles={{ label: '' }}
        error={errors.questionList?.[index]?.correctHeading?.message}
      >
        <Combobox
          list={items}
          setItem={(item) => {
            setValue(`questionList.${index}.correctHeading`, item);
            setCorrectHeading(item);
            clearErrors(`questionList.${index}.correctHeading`);
          }}
          defaultValue={correctHeading}
        />
      </FormItem>
      <Button
        type="button"
        onClick={handleRemoveQuestion}
        className="bg-red-100 hover:bg-red-400 hover:text-white text-gray-800 py-0 w-full flex items-center justify-center gap-2"
      >
        <Trash size={18} />
        <span>Remove question 1</span>
      </Button>
    </div>
  );
};

export default ItemQuestion;
