jest.mock('../config/db', () => ({
  Usuario: {
    findAll: jest.fn()
  }
}));

const usuarioController = require('../controllers/usuarioController');
const db = require('../config/db');

describe('usuarioController.postLogin', () => {
  it('sets session login on successful login', async () => {
    const req = { body: { login: 'admin', senha: '123' }, session: {} };
    const res = { render: jest.fn(), redirect: jest.fn() };
    db.Usuario.findAll.mockResolvedValue([{}]);

    await usuarioController.postLogin(req, res);

    expect(req.session.login).toBe('admin');
    expect(res.render).toHaveBeenCalledWith('/home');
  });
});
