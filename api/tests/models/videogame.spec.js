const { Videogame, conn } = require('../../src/db.js');
const { expect, assert } = require('chai');

describe('Videogame model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Videogame.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is not send',(done) => {
        Videogame.create({description:"This is a game",platforms:[{name:"platform1"}]})
        .then(()=>done(new Error('it requires a valid name')))
        .catch(()=>done())
      });
      it('should work when its a valid name',(done)=>{
        Videogame.create({name:"Game1",description:"This is a game",platforms:[{name:"platform1"}]})
        .then(()=>done())
        .catch((err)=>done(new Error(err)))
      })
    });
    describe('description',()=>{
      it('should throw an error if description is not send',(done)=>{
        Videogame.create({name:"Game1",platfoms:[{name:"platform1"}]})
        .then(()=>done(new Error('it requires a valid desciption')))
        .catch(()=>done())
      });
      it('should work when its a valid description',(done)=>{
        Videogame.create({name:"Game1",description:"This is a game",platforms:[{name:"platform1"}]})
        .then(()=>done())
        .catch((err)=>done(new Error(err)))
      })
    });
    describe('released',()=>{
      it('should throw an error if released is not in date format',(done)=>{
        Videogame.create({name:"Game1",description:"This is a game test",released:"DATE",platforms:[{name:"platform1"}]})
        .then(()=>done(new Error('it requires a valid release date')))
        .catch(()=>done())
      });
      it('should work when its a valid release date',(done)=>{
        Videogame.create({name:"Game1",description:"This is a game",released:"2020-02-02",platforms:[{name:"platform1"}]})
        .then(()=>done())
        .catch((err)=>done(new Error(err)))
      })
    });
    describe('rating',()=>{
      it('should throw an error if rating is not a number',(done)=>{
        Videogame.create({name:"Game1",description:"This is a game test",rating:"RATING",platforms:[{name:"platform1"}]})
        .then(()=>done(new Error('it requires a float number')))
        .catch(()=>done())
      });
      it('should work when its a valid rating',(done)=>{
        Videogame.create({name:"Game1",description:"This is a game",rating:5,platforms:[{name:"platform1"}]})
        .then(()=>done())
        .catch((err)=>done(new Error(err)))
      })
    });
    describe('platforms',()=>{
      it('should throw an error if platfoms is not an array',(done)=>{
        Videogame.create({name:"Game1",description:"This is a game test",platforms:"PLATFORM"})
        .then(()=>done(new Error('it requires a valid platform format')))
        .catch(()=>done())
      })
      it('should work when its a valid platform format',(done)=>{
        Videogame.create({name:"Game1",description:"This is a game",platforms:[{name:"platform1"}]})
        .then(()=>done())
        .catch((err)=>done(new Error(err)))
      })
    })
    
  });
  
});
