import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createOrEditCabin } from '../../services/apiCabins';

function useUpdateCabin() {
  const queryClient = useQueryClient();

  const { mutate: updateCabin, isLoading: isUpdating } = useMutation({
    mutationFn: ({ data, editId }) => createOrEditCabin(data, editId),
    onSuccess: () => {
      toast.success('Cabin successfully updated!');
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateCabin, isUpdating };
}

export default useUpdateCabin;
