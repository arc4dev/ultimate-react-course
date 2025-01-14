import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createOrEditCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';

function useCreateCabin() {
  const queryClient = useQueryClient();

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createOrEditCabin,
    onSuccess: () => {
      toast.success('New cabin successfully created!');
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { createCabin, isCreating };
}

export default useCreateCabin;
