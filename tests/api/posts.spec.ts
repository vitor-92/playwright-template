import { test, expect } from '@playwright/test';

test.describe('API Tests - /posts endpoint', () => {
    const baseURL = 'https://jsonplaceholder.typicode.com';

    test('GET /posts/:id - should return status 200 and valid post structure', async ({ request }) => {
        const response = await request.get(`${baseURL}/posts/1`);

        expect(response.status()).toBe(200);

        expect(response.headers()['content-type']).toContain('application/json');

        const body = await response.json();
        
        expect(body).toMatchObject({
            userId: expect.any(Number),
            id: 1,
            title: expect.any(String),
            body: expect.any(String),
        });

        expect(body.id).toBe(1);
        expect(body.userId).toBeGreaterThan(0);
        expect(body.title.length).toBeGreaterThan(5);
    });

    test('GET /posts - should return an array of posts with valid structure', async ({ request }) => {
        const response = await request.get(`${baseURL}/posts`);
        expect(response.status()).toBe(200);

        const posts = await response.json();

        expect(Array.isArray(posts)).toBe(true);
        expect(posts.length).toBeGreaterThan(0);

        for (const post of posts) {
            expect(post).toMatchObject({
                userId: expect.any(Number),
                id: expect.any(Number),
                title: expect.any(String),
                body: expect.any(String),
            });
        }
    });

    test('POST /posts - should create a new post and return it with an id', async ({ request }) => {
        const newPost = {
            title: 'Novo Post',
            body: 'Conteúdo do post de teste',
            userId: 99,
        };

        const response = await request.post(`${baseURL}/posts`, {
            data: newPost,
        });

        expect(response.status()).toBe(201);

        const body = await response.json();

        expect(body).toMatchObject({
            ...newPost,
            id: expect.any(Number),
        });
    });

    test('GET /posts/:id - should return 404 for non-existent post', async ({ request }) => {
        const response = await request.get(`${baseURL}/posts/999999`);
        expect(response.status()).toBe(404);
    });

    test('GET /posts/:id - should return title as a string and body with minimum length', async ({ request }) => {
        const response = await request.get(`${baseURL}/posts/2`);
        const post = await response.json();

        expect(typeof post.title).toBe('string');
        expect(post.title.length).toBeGreaterThan(5);

        expect(post.body).toMatch(/[a-zA-Z]/);
    });
});
