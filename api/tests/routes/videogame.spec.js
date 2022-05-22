/* eslint-disable import/no-extraneous-dependencies */
//const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Videogame, conn } = require('../../src/db.js');

const videogame = {
  name: 'GameTest',
  description:"test description",
  platforms:[{name:"Nintendo"}],
  genres:[{id:1}]
};

const errVideogame={
  description:"test description",
  released:"2020-02-02",
  platforms:[{name:"Nintendo"}],
  genres:[{id:1}]
}

describe('Videogame routes',()=>{
  beforeAll(async () => {
    await conn.sync({ force: true });
  })
  describe('GET /:idVideogame',()=>{
    it('should return status 404 if videogame does not exist',async ()=>{
      const res=await session(app).get('/videogame/17bdf054-55ed-43ad2-b7b4-1c9d1a85ccc4')
      expect(res.statusCode).toBe(404);
    })
    it('should return status 200 if videogame exists in API',async ()=>{
      const res=await session(app).get('/videogame/3498')
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('name','Grand Theft Auto V')
    })
    it('should return status 200 if videogame exists in DB',async ()=>{
      const game = await Videogame.create(videogame)
      const json= await Videogame.findOne({where:{name:"GameTest"},raw:true})
      const res=await session(app).get(`/videogame/${json.id}`)
      expect(res.statusCode).toBe(200);
    })
  })
  describe('POST /',()=>{
    it('should return status 404 if mandatory parameters are not send',async ()=>{
      const res=await session(app).post('/videogame').send(errVideogame)
      expect(res.statusCode).toBe(404)
    })
    it('should return status 201 if mandatory parameters are send',async ()=>{
      const genre = await session(app).get('/genres')
      const res = await session(app).post('/videogame').send(videogame)
      expect(res.statusCode).toBe(201)
    })
  })
})

// describe('Videogame routes', () => {
//   before(() => conn.authenticate()
//   .catch((err) => {
//     console.error('Unable to connect to the database:', err);
//   }));
//   beforeEach(() => Videogame.sync({ force: true })
//     .then(() => Videogame.create(videogame)));
//   describe('GET /videogame/:idVideogame', () => {
//     it('should get 200', (done) =>{
//       agent.get('/videogame/38')
//       .end((err,res)=>{
//         if(res.status!==200){
//           throw new Error('it should get status 200')
//         }
//         done()
//       })
//     }).timeout(10000)
//   });
//   describe('POST /videogame', () => {
//     it('should get 201 if videogame is valid', (done) =>{
//       agent.post('/videogame')
//       .send(videogame)
//       .end((err,res)=>{
//         if(res.status!==201){
//           throw new Error('it should get status 201')
//         }
//         done();
//       })
//     }).timeout(10000)
//     it('should get 404 if videogame is invalid', (done) =>{
//       agent.post('/videogame')
//       .send(errVideogame)
//       .end((err,res)=>{
//         if(res.status!==404){
//           throw new Error('it should get status 404')
//         }
//         done();
//       })
//     }).timeout(10000)
//     afterEach(()=>{
//       conn.close()
//     })
//   });
// });
