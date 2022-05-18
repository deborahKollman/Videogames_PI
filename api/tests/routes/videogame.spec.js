/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Videogame, conn } = require('../../src/db.js');

const agent = session(app);
const videogame = {
  name: 'GameTest',
  description:"test description",
  image:"",
  released:"2020-02-02",
  rating:5,
  platforms:[{name:"Nintendo"}],
  genres:[{id:1}]
};

const errVideogame={
  description:"test description",
  released:"2020-02-02",
  rating:5,
  platforms:[{name:"Nintendo"}]
}

describe('Videogame routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Videogame.sync({ force: true })
    .then(() => Videogame.create(videogame)));
  describe('GET /videogame/:idVideogame', () => {
    it('should get 200', (done) =>{
      agent.get('/videogame/38')
      .end((err,res)=>{
        if(res.status!==200){
          throw new Error('it should get status 200')
        }
        done()
      })
    }).timeout(10000)
  });
  describe('POST /videogame', () => {
    it('should get 201 if videogame is valid', (done) =>{
      agent.post('/videogame')
      .send(videogame)
      .end((err,res)=>{
        if(res.status!==201){
          throw new Error('it should get status 201')
        }
        done();
      })
    }).timeout(10000)
    it('should get 404 if videogame is invalid', (done) =>{
      agent.post('/videogame')
      .send(errVideogame)
      .end((err,res)=>{
        if(res.status!==404){
          throw new Error('it should get status 404')
        }
        done();
      })
    }).timeout(10000)
    
  });
});
