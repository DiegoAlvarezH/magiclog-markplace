import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import * as productoController from './producto.controller'; 
import Producto from '../models/producto.model'; 

const mongod = new MongoMemoryServer();

beforeAll(async () => {
  const uri = await mongod.getConnectionString();
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterEach(async () => {
  await Producto.deleteMany();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});

describe('createProducto function', () => {
  it('should create a new producto', async () => {
    const req = {
      body: {
        title: 'Test Producto',
        sku: 'This is a test producto.',
        credits: 'John Doe',
        date: '2022-01-01T00:00:00Z',
      },
      user: {
        id: mongoose.Types.ObjectId(),
      },
    };

    const res = {
      json: jest.fn(),
    };

    await productoController.createProducto(req, res);

    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Test Producto',
      sku: 'This is a test producto.',
      credits: 'John Doe',
      date: expect.any(Date),
      user: req.user.id,
    }));
  });

});
