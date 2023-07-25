import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test("Debe renderizar el componente Nav en todas las rutas excepto en la ruta '/'", () => {
  const { queryByTestId } = render(
    <MemoryRouter initialEntries={["/home"]}>
      <App />
    </MemoryRouter>
  );

  const navComponent = queryByTestId("nav-component");
  expect(navComponent).toBeInTheDocument();
});
