'use client';
'use client';

import { Label } from '@/components/ui/label';
import { Children, createElement } from 'react';
import { useFormContext } from 'react-hook-form';

export default function FormField({
  children,
  name,
  transform,
  onChange: _onChange,
  label,
  required,
}: any) {
  const methods = useFormContext();

  const registered = methods.register(name);
  const defaultValue = methods.getValues(name);
  const registeredProps = {
    ...registered,
    defaultValue,
    onChange: (event: any) => {
      _onChange?.(event);
      return transform
        ? registered.onChange({
          target: { name, value: transform(event) },
        })
        : registered.onChange(event);
    },
    onBlur: (event: any) =>
      transform
        ? registered.onBlur({
          target: { name, value: transform(event) },
        })
        : registered.onBlur(event),
  };

  return (
    <>
      {label && <Label htmlFor={name}>{label}</Label>}
      {Children.map(children, (child) =>
        createElement(child.type, {
          ...child.props,
          ...registeredProps,
        })
      )}
      {methods.formState.errors?.[name]?.message && (
        <p className="text-red-500 text-sm pt-2">
          {methods.formState.errors?.[name]?.message?.toString()}
        </p>
      )}
    </>
  );
}