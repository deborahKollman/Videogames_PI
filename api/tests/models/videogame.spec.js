const { Videogame, conn } = require('../../src/db.js');
//const { expect, assert } = require('chai');

describe('Videogame model',()=>{
  beforeAll(async () => {
    await conn.sync({ force: true });
  });
  describe('Name',()=>{
    it('should throw an error if name is not send', async() => {
      expect.assertions(1);
      try {
        await Videogame.create({description:"This is a game",platforms:[{name:"platform1"}]})
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });
  })
  describe('Description',()=>{
    it('should throw an error if description is not send', async() => {
      expect.assertions(1);
      try {
        await Videogame.create({name:"Game1",platfoms:[{name:"platform1"}]})
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });
  });
  describe('Released',()=>{
    it('should throw an error if released date is not date format', async() => {
      expect.assertions(1);
      try {
        await Videogame.create({name:"Game1",description:"This is a game test",released:"DATE",platforms:[{name:"platform1"}]})
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });
  });
  describe('Rating',()=>{
    it('should throw an error if rating is not a number', async() => {
      expect.assertions(1);
      try {
        await Videogame.create({name:"Game1",description:"This is a game test",rating:"RATING",platforms:[{name:"platform1"}]})
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });
  });
  describe('Platforms',()=>{
    it('should throw an error if platforms is not send', async() => {
      expect.assertions(1);
      try {
        await Videogame.create({name:"Game1",description:"Description"})
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });
    it('should throw an error if platforms is not an array', async() => {
      expect.assertions(1);
      try {
        await Videogame.create({name:"Game1",description:"This is a game test",platforms:"PLATFORM"})
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });
  });
  describe('videogame',()=>{
    it('should create the Videogame if all required properties are ok', async () => {
      const videogame = await Videogame.create({name:"Game1",description:"Description",platforms:[{name:"platform 1"}],rating:2.5,released:"2020-02-02"})
      const json= await Videogame.findOne({where:{name:"Game1"},raw:true})
      expect(json.id.length).toBe(36);
      expect(json.name).toBe("Game1");
      expect(json.description).toBe("Description");
      expect(json.rating).toBe(2.5);
      expect(Array.isArray(json.platforms)).toBe(true)
      expect(json.released).toBe("2020-02-02")
    });
  })
  

  afterAll(async () => {
    await conn.sync({ force: true });
    conn.close();
  })
})


// describe('Videogame model', () => {
//   before(() => conn.authenticate()
//     .catch((err) => {
//       console.error('Unable to connect to the database:', err);
//     }));
//   describe('Validators', () => {
//     beforeEach(() => Videogame.sync({ force: true }));
//     describe('name', () => {
//       it('should throw an error if name is not send',(done) => {
//         Videogame.create({description:"This is a game",platforms:[{name:"platform1"}]})
//         .then(()=>done(new Error('it requires a valid name')))
//         .catch(()=>done())
//       });
//       it('should work when its a valid name',(done)=>{
//         Videogame.create({name:"Game1",description:"This is a game",platforms:[{name:"platform1"}]})
//         .then(()=>done())
//         .catch((err)=>done(new Error(err)))
//       })
//     });
//     describe('description',()=>{
//       it('should throw an error if description is not send',(done)=>{
//         Videogame.create({name:"Game1",platfoms:[{name:"platform1"}]})
//         .then(()=>done(new Error('it requires a valid desciption')))
//         .catch(()=>done())
//       });
//       it('should work when its a valid description',(done)=>{
//         Videogame.create({name:"Game1",description:"This is a game",platforms:[{name:"platform1"}]})
//         .then(()=>done())
//         .catch((err)=>done(new Error(err)))
//       })
//     });
//     describe('released',()=>{
//       it('should throw an error if released is not in date format',(done)=>{
//         Videogame.create({name:"Game1",description:"This is a game test",released:"DATE",platforms:[{name:"platform1"}]})
//         .then(()=>done(new Error('it requires a valid release date')))
//         .catch(()=>done())
//       });
//       it('should work when its a valid release date',(done)=>{
//         Videogame.create({name:"Game1",description:"This is a game",released:"2020-02-02",platforms:[{name:"platform1"}]})
//         .then(()=>done())
//         .catch((err)=>done(new Error(err)))
//       })
//     });
//     describe('rating',()=>{
//       it('should throw an error if rating is not a number',(done)=>{
//         Videogame.create({name:"Game1",description:"This is a game test",rating:"RATING",platforms:[{name:"platform1"}]})
//         .then(()=>done(new Error('it requires a float number')))
//         .catch(()=>done())
//       });
//       it('should work when its a valid rating',(done)=>{
//         Videogame.create({name:"Game1",description:"This is a game",rating:5,platforms:[{name:"platform1"}]})
//         .then(()=>done())
//         .catch((err)=>done(new Error(err)))
//       })
//     });
//     describe('platforms',()=>{
//       it('should throw an error if platfoms is not an array',(done)=>{
//         Videogame.create({name:"Game1",description:"This is a game test",platforms:"PLATFORM"})
//         .then(()=>done(new Error('it requires a valid platform format')))
//         .catch(()=>done())
//       })
//       it('should work when its a valid platform format',(done)=>{
//         Videogame.create({name:"Game1",description:"This is a game",platforms:[{name:"platform1"}]})
//         .then(()=>done())
//         .catch((err)=>done(new Error(err)))
//       })
//     })
    
//   });
  
// });
