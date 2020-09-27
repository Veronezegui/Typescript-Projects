import { Router } from 'express';
import SessionController from '../app/controllers/SessionController';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  try {
    const { matricula, password } = request.body;
    const sessionController = new SessionController();
    const { user, token } = await sessionController.store({
      matricula,
      password,
    });
    delete user.password;

    return response.json({ user, token });
  } catch (erro) {
    return response.status(400).json({ error: erro.message });
  }
});

export default sessionsRouter;
