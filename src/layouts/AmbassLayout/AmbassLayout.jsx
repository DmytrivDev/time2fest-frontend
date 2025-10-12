import { Outlet, useOutletContext } from 'react-router-dom';

const AmbassLayout = () => {
  const parentContext = useOutletContext();

  return (
    <Outlet context={parentContext} />
  );
};

export default AmbassLayout;
