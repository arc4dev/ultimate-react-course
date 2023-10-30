import { useRouteError } from 'react-router-dom';
import LinkButton from './LinkButton';

function Error() {
  const error = useRouteError();

  console.log(error);

  return (
    <div className="mt-6 space-y-1">
      <h1>Something went wrong 😢</h1>
      <p className="mb-3">{error.data || error.message}</p>
      <LinkButton to="-1">&larr; Go back</LinkButton>
    </div>
  );
}

export default Error;
