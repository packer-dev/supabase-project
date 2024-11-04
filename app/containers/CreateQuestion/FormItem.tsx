import { Label } from "@/components/ui/label";
import { ReactNode } from "react";

type FormItemProps = {
  children?: ReactNode;
  className?: string;
  required?: boolean;
  label?: string;
  optional?: boolean;
  styles?: {
    label?: string;
  };
};

const FormItem = ({
  children,
  className = "",
  required,
  label,
  optional,
  styles = { label: "font-semibold" },
}: FormItemProps) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`.trim()}>
      <Label className="flex items-center gap-1">
        <span className={styles?.label?.trim()}>{label}</span>
        {optional && <span className="italic">(optional)</span>}
        {required && <span className="text-red-500">*</span>}
      </Label>
      {children}
    </div>
  );
};

export default FormItem;
