const mongoose = require('mongoose');
const dbHandler = require('../db-handler');
const userService = require('../../services/UserServices');
const userModel = require('../../models/Users');

beforeAll(async () => await dbHandler.connect());

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());

describe('User services', () => {
    //Testear UserServices

    it('Crear usuario', async() =>{

        expect(true).toBe(true);

        const mockUser= {
            name:"test user",
            email:"testuser@email.com",
            password: "test1234"
        }

        const userDb = await userService.createUser(mockUser);

        expect(mockUser.email).toBe(userDb.email);
        expect(userDb).toHaveProperty('_id');

    });

    it('Esto no debe henerar un usuario', async() =>{
        
    })

})