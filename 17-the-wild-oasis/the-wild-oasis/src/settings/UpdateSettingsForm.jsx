import { useQuery } from '@tanstack/react-query';
import { getSettings } from '../services/apiSettings';

import Form from '../ui/Form';
import FormRow from '../ui/FormRow';
import Input from '../ui/Input';
import Spinner from '../ui/Spinner';
import useUpdateSettings from './useUpdateSettings';

function UpdateSettingsForm() {
  const { data: settings, isLoading } = useQuery({
    queryFn: getSettings,
    queryKey: ['settings'],
  });
  const {
    minBookingLength,
    maxBookingLength,
    breakfastPrice,
    maxNumberOfGuestsPerBooking,
  } = settings || {};

  const { updateSetting, isUpdating } = useUpdateSettings();

  const handleUpdate = (e) => {
    const { id: field, value } = e.target;
    if (!value) return;

    updateSetting({ [field]: value });
  };

  if (isLoading) return <Spinner />;

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="minBookingLength"
          defaultValue={minBookingLength}
          disabled={isUpdating}
          onBlur={handleUpdate}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="maxBookingLength"
          defaultValue={maxBookingLength}
          onBlur={handleUpdate}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="maxNumberOfGuestsPerBooking"
          defaultValue={maxNumberOfGuestsPerBooking}
          onBlur={handleUpdate}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfastPrice"
          defaultValue={breakfastPrice}
          onBlur={handleUpdate}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
