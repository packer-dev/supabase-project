import { Label } from "@/components/ui/label";
import { ReactNode } from "react";

type FormItemProps = {
  children?: ReactNode;
  className?: string;
  required?: boolean;
  label?: string;
  styles?: {
    label?: string;
  };
  error?: string;
};

const FormItem = ({
  children,
  className = "",
  required,
  label,
  styles = { label: "font-semibold" },
  error,
}: FormItemProps) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`.trim()}>
      {label && (
        <Label className="flex items-center gap-1">
          <span className={styles?.label?.trim()}>{label}</span>
          {required && <span className="text-red-500">*</span>}
        </Label>
      )}
      {children}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default FormItem;
