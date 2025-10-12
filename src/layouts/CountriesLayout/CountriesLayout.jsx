import { Outlet, useOutletContext } from 'react-router-dom';

const CountriesLayout = () => {
  const parentContext = useOutletContext();

  return <Outlet context={parentContext} />;
};

export default CountriesLayout;
