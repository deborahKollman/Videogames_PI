import '@testing-library/react';
import React from 'react';
import { MemoryRouter, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configure, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import VideogameCard from '../src/components/VideogameCard';

configure({ adapter: new Adapter() });

describe('<VideogameCard />',()=>{
  let videogameCard, state, store;
  const mockStore = configureStore([thunk]);
  let videogames = [{id:1,name:"Game 1",image:"",genres:[{id:1,name:"Action"}]}];
  
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
  
  describe('Structure',()=>{
    it('should render the name of the videogame',()=>{
      expect(videogameCard(videogames[0])).find('p').at(0).text().toBe('Game 1')
    })
  })
})
  

