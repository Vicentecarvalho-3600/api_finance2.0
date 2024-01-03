const request = require('supertest');
const app = require('../../src/app');

const MAIN_ROUTE = '/accounts';
let user;

beforeAll(async () => {
  const res = await app.services.user.save({ name: 'User Account', email: `${Date.now()}user@test.com`, password: '123456' });
  user = { ...res[0] }

});

test('Deve inserir uma conta com sucesso', () => {
  return request(app).post(MAIN_ROUTE)
    .send({ name: 'Acc #1', user_id: user.id })
    .then((result) => {
      expect(result.status).toBe(201);
      expect(result.body.name).toBe('Acc #1');
    });
});

test('Nao deve inserir um conta sem nome', () => {
  return request(app).post(MAIN_ROUTE)
    .send({ user_id: user.id })
    .then((result) => {
      expect(result.status).toBe(400);
      expect(result.body.error).toBe('Nome é um atributo obrigatorio');
    })
});

test.skip('Nao deve inserir usuario não conta de nome duplicado para o mesmo usuario', () => {})

test('deve lista todas as contas', () => {
  return app.db('accounts')
    .insert({ name: 'Acc list', user_id: user.id })
    .then(() => request(app).get(MAIN_ROUTE))
    .then((result) => {
      expect(result.status).toBe(200);
      expect(result.body.length).toBeGreaterThan(0);
    })
});

test.skip('deve lista apenas a conta do usuario', () => {})


test('deve retornar um conta por id', () => {
  return app.db('accounts')
    .insert({ name: 'Acc By Id', user_id: user.id }, ['id'])
    .then(acc => request(app).get(`${MAIN_ROUTE}/${acc[0].id}`))
    .then((result) => {
      expect(result.status).toBe(200);
      expect(result.body.name).toBe('Acc By Id');
      expect(result.body.user_id).toBe(user.id);
    })
});

test.skip('Nao deve retornar a conta de outro usuario', () => {})

test('Deve alterar um conta', () => {
  return app.db('accounts')
    .insert({ name: 'Acc To update', user_id: user.id }, ['id'])
    .then(acc => request(app).put(`${MAIN_ROUTE}/${acc[0].id}`)
      .send({ name: 'Acc Updated' }))
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.body.name).toBe('Acc Updated');
    })
});

test.skip('Nao deve alterar a conta de outro usuario', () => {})

test('deve remover uma conta', () => {
  return app.db('accounts')
    .insert({ name: 'Acc By Id', user_id: user.id }, ['id'])
    .then(acc => request(app).delete(`${MAIN_ROUTE}/${acc[0].id}`))
    .then((res) => {
      expect(res.status).toBe(204);

    });
});

test.skip('Nao deve remover a conta de outro usuario', () => {})