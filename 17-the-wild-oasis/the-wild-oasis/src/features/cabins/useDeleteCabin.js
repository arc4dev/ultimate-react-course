import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteCabin as deleteCabinApi } from '../../services/apiCabins';

function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { mutate: deleteCabin, isLoading: isDeleting } = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });

      toast.success('Cabin successfully deleted!');
    },
    onError: (err) => toast.error(err.message),
  });

  return { deleteCabin, isDeleting };
}

export default useDeleteCabin;
