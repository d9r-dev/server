import { controller, get, use } from './decorators';
import { NextFunction, Request, Response } from 'express';

@controller('')
class RootController {
  @get('/')
  getRoot(req: Request, res: Response) {
    if (req.session && req.session.loggedIn) {
      res.send(`
    <div>
      <div>You are logged in</div>
      <a href="/logout">Logout</a>
    </div>
    `);
    } else {
      res.send(`
    <div>
      <div>You are not logged in</div>
      <a href="/login">Login</a>
    </div>
    `);
    }
  }

  @get('/protected')
  @use(requireAuth)
  getProtected(req: Request, res: Response) {
    res.send('Welcome to protected content!');
  }
}

function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (req.session && req.session.loggedIn) {
    next();
    return;
  }

  res.status(403);
  res.send('Not permitted');
}
