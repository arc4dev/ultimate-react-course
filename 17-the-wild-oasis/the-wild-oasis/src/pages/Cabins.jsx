import { useState } from 'react';

import Heading from '../ui/Heading';
import Row from '../ui/Row';
import CabinTable from '../features/cabins/CabinTable';
import Button from '../ui/Button';
import CreateCabinForm from '../features/cabins/CreateCabinForm';

function Cabins() {
  const [isFormOpen, setIsFormOpen] = useState(true);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter / Sort</p>
      </Row>

      <Row>
        <CabinTable />

        <Button onClick={() => setIsFormOpen((v) => !v)}>Add new cabin</Button>

        {isFormOpen && <CreateCabinForm />}
      </Row>
    </>
  );
}

export default Cabins;
