import { Router } from 'express';
import { permission } from '../middlewares/permission';

const route = Router();

route.get('/author', permission('author'), (req, res, next) => {

    // Send a secret message include decoded user
    return res.json({
        message: 'This is a secret!',
        name: req.user.name,
    });
}).get('/guest', permission('guest'), (req, res, next) => {
    return res.json({
        message: 'This is for guest',
        name: req.user.name,
    });
});

export default route;
