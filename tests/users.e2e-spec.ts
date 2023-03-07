import { App } from './../src/app';
import { boot } from './../src/main';
import request from 'supertest';

let application: App;

beforeAll(async () => {
	const { app } = await boot;
	application = app;
});

describe('Users e2e', () => {
	it('Register - error', async () => {
		const result = await request(application.app)
			.post('/users/register')
			.send({ email: 'test@gmail.com', password: '123123123' });
		expect(result.statusCode).toBe(422);
	});

	it('Login - success', async () => {
		const result = await request(application.app)
			.post('/users/login')
			.send({ email: 'test@gmail.com', password: '123123123' });
		expect(result.body.jwt).not.toBeUndefined();
	});

	it('Login - error', async () => {
		const result = await request(application.app)
			.post('/users/login')
			.send({ email: 'test@gmail.com', password: '123123121' });
		expect(result.statusCode).toBe(401);
	});

	it('Info - success', async () => {
		const login = await request(application.app)
			.post('/users/login')
			.send({ email: 'test@gmail.com', password: '123123123' });
		const result = await request(application.app)
			.get('/users/info')
			.set('Authorization', `Bearer ${login.body.jwt}`);
		expect(result.body.email).toBe('test@gmail.com');
	});

	it('Info - error', async () => {
		const login = await request(application.app)
			.post('/users/login')
			.send({ email: 'test@gmail.com', password: '123123123' });
		const result = await request(application.app)
			.get('/users/info')
			.set('Authorization', 'Bearer 1');
		expect(result.statusCode).toBe(401);
	});
});

afterAll(() => {
	application.close();
});
