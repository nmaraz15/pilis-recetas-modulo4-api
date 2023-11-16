import { Router } from "express";
import {getUsers, getUser, createUser, updateUser, deleteUser} from "../controllers/user.controller";
import {signIn, signUp, protectedEndpoint, refresh } from '../controllers/user.controller'
import passport from 'passport'

const router = Router();

router.get("/users", getUsers);

router.get("/users/:id", getUser);
router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);


//Agregar para jwt
router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/token', refresh);
router.post('/protected', passport.authenticate('jwt', { session: false }), protectedEndpoint);

export default router;
