/* eslint-disable @typescript-eslint/no-explicit-any */
import useEventEmitter from '@/app/hooks/use-event-emitter';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useApi } from '@/services/api';
import { useMutation } from '@tanstack/react-query';
import { ORDER_DATA_TABLE_QUERY_KEY } from './constants';

type ConfirmDeleteType = {
  show: boolean;
  onClose: () => void;
  orderId: string;
  action: 'done' | 'canceled' | 'pending';
};

const ConfirmActionOrder = ({
  show,
  orderId,
  onClose,
  action,
}: ConfirmDeleteType) => {
  const { order } = useApi();
  const { toast } = useToast();
  const dataTableEventEmitter = useEventEmitter(ORDER_DATA_TABLE_QUERY_KEY);

  const { mutate: updateOrder, isPending } = useMutation({
    mutationFn: async (orderId: string) =>
      order.update({
        id: orderId,
        status: action,
      } as any),
    onSuccess: () => {
      toast({
        title: 'Update order successfully.',
        description: 'The order has been successfully updated.',
      });
      dataTableEventEmitter.emit('refresh');
      onClose();
    },
  });
  return (
    <Dialog open={show}>
      <DialogContent>
        <DialogTitle>Are you sure you want to delete this course?</DialogTitle>
        <DialogDescription>This action cannot be undone.</DialogDescription>
        <div className="flex justify-end pt-6 gap-3">
          <Button onClick={onClose} type="button" variant="secondary">
            Cancel
          </Button>
          <Button
            onClick={() => updateOrder(orderId)}
            type="button"
            variant="default"
            disabled={isPending}
          >
            {isPending ? 'Updating...' : 'Update'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmActionOrder;
