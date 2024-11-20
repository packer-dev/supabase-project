import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MinusCircle, Plus } from 'lucide-react';
import { UseFieldArrayReturn, useFormContext } from 'react-hook-form';
import { FormFields } from '../schema';
import FormItem from '../FormItem';

type GivenHeadingProps = {
  fieldArray: UseFieldArrayReturn<FormFields, never, 'id'>;
};

const GivenInformation = ({ fieldArray }: GivenHeadingProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormFields>();
  return (
    <div className="flex flex-col gap-3">
      <FormItem
        label="Title"
        name="title"
        error={errors.givenInformation?.title?.message}
      >
        <Input
          id="title"
          placeholder="What makes people happy"
          {...register('givenInformation.title')}
        />
      </FormItem>
      <FormItem className="" label="List" required>
        {fieldArray.fields.map((item, index) => (
          <FormItem
            key={item.id}
            error={errors.givenInformation?.items?.[index]?.value?.message}
          >
            <div className="flex items-center gap-3">
              <Input
                className="flex-1"
                placeholder="Heading 01"
                {...register(`givenInformation.items.${index}.value`)}
              />
              <Button
                type="button"
                onClick={() => {
                  fieldArray.remove(index);
                }}
                variant="secondary"
              >
                <MinusCircle size={24} />
              </Button>
            </div>
          </FormItem>
        ))}
      </FormItem>
      <Button
        type="button"
        onClick={() =>
          fieldArray.append({
            value: '',
          })
        }
        variant="secondary"
        className="flex py-0 items-center gap-2"
      >
        <Plus />
        <span>Add new item</span>
      </Button>
    </div>
  );
};

export default GivenInformation;
