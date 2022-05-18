import VideogameCard from '../src/components/VideogameCard'
import React from 'react';
import { MemoryRouter, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configure, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

configure({ adapter: new Adapter() });

describe('<VideogameCard />',()=>{
    let videogameCard, state, store;
    const mockStore = configureStore([thunk]);
  let videogames = [{id:1,nombre:"Game1",imagen:"",genres:[{name:"genre1"}]},{id:2,nombre:"Game2",imagen:"",genres:[{name:"genre2"}]}];
  state = {
    videogames: [],
    videogameDetails: {},
  };
  store = mockStore(state);
  beforeEach(() => {
    videogameCard = (videogame) =>
      mount(
        <Provider store={store}>
          <MemoryRouter>
            <VideogameCard
              id={videogame.id} nombre={videogame.name} imagen={videogame.image} generos={videogame.genres}
            />
          </MemoryRouter>
        </Provider>,
      );
  });
  afterEach(() => jest.restoreAllMocks());

    describe('Structure',()=>{
        it('should renderize the videogame name',()=>{
            expect(videogameCard(videogames[0]).find('h2').at(0).text()).toBe('Game1',);
        })
    })
})
  

