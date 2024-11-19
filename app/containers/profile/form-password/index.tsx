import Form from "@/app/common/Form";
import FormField from "@/app/common/FormField";
import FormGroup from "@/app/common/FormGroup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const FormPassword = () => {
  return (
    <Form>
      <div className="flex flex-col gap-2">
        <FormGroup label="Old password">
          <FormField name="oldPassword">
            <Input placeholder="Old password" />
          </FormField>
        </FormGroup>
        <FormGroup label="New password">
          <FormField name="newPassword">
            <Input placeholder="New password" />
          </FormField>
        </FormGroup>
        <FormGroup label="Confirm password">
          <FormField name="confirmPassword">
            <Input placeholder="Confirm password" />
          </FormField>
        </FormGroup>

        <div className="flex flex-row gap-2 justify-end py-2">
          <Button type="button" variant="secondary">
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </div>
    </Form>
  );
};

export default FormPassword;
