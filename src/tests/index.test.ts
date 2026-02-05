import supertest from 'supertest';
import app from '../index';

const request = supertest(app);
describe('Test endpoint responses', (): void => {
  it('Retrieves the base API endpoint', async (): Promise<void> => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });
  it('Fails on the images API endpoint MISSING all parameters', async (): Promise<void> => {
    const response = await request.get('/images');
    expect(response.status).toBe(400);
  });
  it('Fails on the images API endpoint MISSING dimension parameters', async (): Promise<void> => {
    const response = await request.get('/images?filename=test');
    expect(response.status).toBe(400);
  });
  it('Fails on the images API endpoint MISSING name parameters', async (): Promise<void> => {
    const response = await request.get('/images?width=400&height=400');
    expect(response.status).toBe(400);
  });
  it('Retrieves the images API endpoint negative dimension parameters', async (): Promise<void> => {
    const response = await request.get(
      '/images?filename=test&width=-400&height=-400'
    );
    expect(response.status).toBe(400);
  });
  it('Retrieves·the·images·API·endpoint·WITH·required·query·parameters', async (): Promise<void> => {
    const response = await request.get(
      '/images?filename=test&width=400&height=400'
    );
    expect(response.status).toBe(200);
  });
});
describe('send fake Endpoint', (): void => {
  it('GET /anyEndpoint', async (): Promise<void> => {
    const response = await request.get('/fake');
    expect(response.status).toBe(404);
  });
});
