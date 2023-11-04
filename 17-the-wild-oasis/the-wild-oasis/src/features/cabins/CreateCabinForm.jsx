import { useForm } from 'react-hook-form';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';
import useCreateCabin from './useCreateCabin';
import useUpdateCabin from './useUpdateCabin';

function CreateCabinForm({ cabinToEdit = {} }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const {
    register,
    handleSubmit,
    getValues,
    reset: resetForm,
    formState,
  } = useForm({
    defaultValues: isEditSession ? { ...editValues } : {},
  });
  const { errors } = formState;

  const { createCabin, isCreating } = useCreateCabin();
  const { updateCabin, isUpdating } = useUpdateCabin();

  const onSubmit = (data) => {
    // checking if image has already been uploaded and has a string structure or is it a new file uploaded by a user
    const image = typeof data.image === 'string' ? data.image : data.image[0];
    const mutateObject = {
      onSuccess: () => resetForm(),
    };

    isEditSession
      ? updateCabin({ data: { ...data, image }, editId }, mutateObject)
      : createCabin({ ...data, image: data.image[0] }, mutateObject);
  };

  // const onError = (errors) => {
  //   console.log(errors);
  // };

  const isLoading = isCreating || isUpdating;

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Cabin name" error={errors}>
        <Input
          type="text"
          id="name"
          disabled={isLoading}
          {...register('name', {
            required: 'This field is required',
          })}
        />
      </FormRow>
      <FormRow label="Maximum capacity" error={errors}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isLoading}
          {...register('maxCapacity', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'The minimum value is 1',
            },
          })}
        />
      </FormRow>
      <FormRow label="Regular price" error={errors}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isLoading}
          {...register('regularPrice', {
            required: 'This field is required',
          })}
        />
      </FormRow>
      <FormRow label="discount" error={errors}>
        <Input
          type="number"
          id="discount"
          disabled={isLoading}
          defaultValue={0}
          {...register('discount', {
            required: 'This field is required',
            validate: (value) =>
              value <= getValues('regularPrice') ||
              'Discount cannot be higher than regular price',
          })}
        />
      </FormRow>

      <FormRow label="Description for website" error={errors}>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          disabled={isLoading}
          {...register('description', {
            required: isEditSession ? false : 'This field is required',
          })}
        />
      </FormRow>
      <FormRow label="Cabin photo" error={errors}>
        <FileInput
          id="image"
          accept="image/*"
          disabled={isLoading}
          {...register('image')}
        />
      </FormRow>
      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isLoading}>
          {isEditSession ? 'Edit cabin' : 'Add new cabin'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
