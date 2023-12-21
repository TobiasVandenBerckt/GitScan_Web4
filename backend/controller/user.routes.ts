/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The user ID.
 *         email:
 *           type: string
 *           description: The user email.
 *         name:
 *           type: string
 *           description: The user name.
 *         firstName:
 *           type: string
 *           description: The user first name.
 *         password:
 *           type: string
 *           description: The user password.
 */

import express, { Request, Response } from 'express';
import userServices from '../service/user.service';
import { userInput } from '../types';

const userRouter = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Now you see all users.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
userRouter.get("/users", async (req: Request & {auth: userInput }, res: Response) => {
  const loggedInUser = req.auth.email;
  const users = await userServices.getAllUsers();
  res.status(200).json(users);
});

/**
 * @swagger
 * /user/add:
 *   post:
 *     summary: Add a user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               "email":
 *                 type: string
 *               "name":
 *                 type: string
 *               "firstName":
 *                 type: string
 *               "password":
 *                 type: string
 *     responses:
 *       200:
 *         description: A success message, you now have added a user.
 *       403:
 *         description: not allowed.
 *       500:
 *         description: An error has occurred, see error message for more details.
 */
userRouter.post('/user/add', async (req: Request, res: Response) => {
  const userInput = <userInput>req.body;
  try {
    const newUser = await userServices.addUser(userInput);
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /user/delete/{id}:
 *   delete:
 *     summary: Delete a user.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: User ID
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: Now you see the deleted user.
 */
userRouter.delete('/user/delete/:id', async (req: Request, res: Response) => {
  try {
    const UserId = parseInt(req.params.id);
    await userServices.deleteUserById(UserId);
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: get a user.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: user id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: Now you see the user.
 */
userRouter.get('/user/:id', async (req: Request, res: Response) => {
  try {
    const UserId = parseInt(req.params.id);
    const user = await userServices.getUserById(UserId);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /user/email/{email}:
 *   get:
 *     summary: Get user by email.
 *     responses:
 *       200:
 *         description: Now you see the user with that email.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
userRouter.get('/user/email/:email', async (req: Request, res: Response) => {
  try {
    const UserEmail = req.params.email;
    const user = await userServices.getUserByEmail(UserEmail);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /user/update:
 *   put:
 *     summary: Update a user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               "id":
 *                 type: number
 *               "email":
 *                 type: string
 *               "name":
 *                 type: string
 *               "firstName":
 *                 type: string
 *               "password":
 *                 type: string
 *     responses:
 *       200:
 *         description: Now you see the updated user.
 */
userRouter.put('/user/update', async (req: Request, res: Response) => {
  const userInput = <userInput>req.body;
  try {
    const user = await userServices.updateUserById(userInput);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ status: 'error', errorMessage: error.message });
  }
});

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login a user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               "email":
 *                 type: string
 *               "password":
 *                 type: string
 *     responses:
 *       200:
 *         description: Now you have logged in.
 */
userRouter.post('/user/login', async (req: Request, res: Response) => {
  try {
    const userInput: userInput = req.body;
    const token = await userServices.authenticate(userInput);
    res.status(200).json({ message: 'Authentication succesful', token }); 
  } catch (error) { 
    res.status(401).json({ status: 'unauthorized', errorMessage: error.message });
  }
});

export default userRouter;
