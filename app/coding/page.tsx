/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Form from '../common/Form';
import * as yup from 'yup';
import CurrencyInput from 'react-currency-input-field';
import { cn } from '@/lib/utils';
import FormGroup from '../common/FormGroup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@/components/ui/button';
import FormField from '../common/FormField';
import { useFormContext } from 'react-hook-form';

const schema = (enable?: boolean) =>
  yup.object({
    price: yup
      .number()
      .typeError('Price must be a valid number')
      .positive('Price must be a positive number')
      .required('Price is required')
      .test(
        'check price',
        'Original price must be more than sale price',
        (value, context) => {
          return enable ? value > context.parent?.sale_price : true;
        }
      ),
    sale_price: yup
      .number()
      .typeError('Price must be a valid number')
      .positive('Price must be a positive number')
      .required('Price is required')
      .test(
        'check price sale',
        'Sale price must be less than original price',
        (value, context) => {
          return value < context.parent?.price;
        }
      ),
  });

const Page = () => {
  return (
    <div className="p-10 flex-col flex gap-2">
      <Form
        onSubmit={(data: any) => {
          console.log(data);
        }}
        yupResolver={yupResolver(schema(true))}
        defaultValue={{
          price: 50000,
        }}
      >
        <FormPrice />
      </Form>
    </div>
  );
};

const FormPrice = () => {
  const { setValue } = useFormContext();
  return (
    <div className="p-10 flex-col flex gap-2">
      <FormGroup label="Price" name="price">
        <FormField id="price">
          <CurrencyInput
            className={cn(
              'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
            )}
            placeholder="Please enter a number"
            onValueChange={(value) => {
              setValue('price', value);
            }}
          />
        </FormField>
      </FormGroup>
      <FormGroup label="Sale price" name="sale_price">
        <FormField id="sale_price">
          <CurrencyInput
            className={cn(
              'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
            )}
            placeholder="Please enter a number"
            onValueChange={(value) => {
              setValue('sale_price', value);
            }}
          />
        </FormField>
      </FormGroup>
      <Button type="submit">Save</Button>
    </div>
  );
};

export default Page;
