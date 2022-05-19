import { render, screen } from '@testing-library/react';
import VideogameCard from '../src/components/VideogameCard';

test('renders learn react link', () => {
  render(<VideogameCard/>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

describe('<VideogameCard />',()=>{
  let videogameCard, state, store;
  const mockStore = configureStore([thunk]);
  let videogames = [];
  state = {
    videogames: [],
    videogameDetails: {},
  };
  store = mockStore(state);
  beforeEach(() => {
    productCard = (videogame) =>
      render(
        <Provider store={store}>
          <MemoryRouter>
            <VideogameCard
              nombre={videogame.name}
              imagen={videogame.image}
              generos={videogame.genres}
              id={videogame.id}
            />
          </MemoryRouter>
        </Provider>,
      );
  });

  afterEach(() => jest.restoreAllMocks());
  
})
  

