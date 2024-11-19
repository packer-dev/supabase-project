import { Label } from "@/components/ui/label";
import { nanoid } from "nanoid";
import { Children, createElement, ReactElement } from "react";

export type FormGroupProps = {
  id?: string;
  label: string;
  children: ReactElement;
};

export default function FormGroup({
  id = nanoid(),
  label,
  children,
}: FormGroupProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      {Children.map(children, (child) =>
        createElement(child.type, {
          ...child.props,
        })
      )}
    </div>
  );
}
