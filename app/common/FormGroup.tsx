import { Label } from '@/components/ui/label';
import { nanoid } from 'nanoid';
import { Children, createElement, ReactElement } from 'react';
import { useFormContext } from 'react-hook-form';

export type FormGroupProps = {
  id?: string;
  label: string;
  children: ReactElement;
  name: string;
};

export default function FormGroup({
  id = nanoid(),
  label,
  children,
  name,
}: FormGroupProps) {
  const methods = useFormContext();

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      {Children.map(children, (child) =>
        createElement(child.type, {
          ...child.props,
          name,
        })
      )}
      {methods.formState.errors?.[name]?.message && (
        <p className="text-red-500 text-sm pt-1">
          {methods.formState.errors?.[name]?.message?.toString()}
        </p>
      )}
    </div>
  );
}
