/**
 * @swagger
 * components:
 *   schemas:
 *     Actor:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The actor ID.
 *         name:
 *           type: string
 *           description: The actor name.
 *         firstName:
 *           type: string
 *           description: The actor firstname.
 *         info:
 *           type: string
 *           description: The actor info.
 *         films:
 *           type: array 
 *           items: 
 *             $ref: '#/components/schemas/Film'
 *           description: The actor movies.
 *     Film:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 */

import express, { Request, Response } from 'express';
import { actorInput } from '../types/index';
import { userInput } from '../types/index';
import acteurService from '../service/acteur.service';

const actorRouter = express.Router();

/**
 * @swagger
 * /actors:
 *   get:
 *     summary: Get all actors.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Now you see all actors.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Actor'
 */
actorRouter.get("/actors", async (req: Request & {auth: userInput }, res: Response) => {
  const loggedInUser = req.auth.email;
  const actors = await acteurService.getAllActors();
  res.status(200).json(actors);
});

/**
 * @swagger
 * /actor/{id}:
 *   get:
 *     summary: get an actor.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: actor id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: Now you see the actor.
 */
actorRouter.get('/actor/:id', async (req: Request, res: Response) => {
  try {
    const actorId = Number(req.params.id);
    const actor = await acteurService.getActorById(actorId);
    res.status(200).send(actor);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

/**
 * @swagger
 * /actor/add:
 *   post:
 *     summary: Add an actor.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               "name":
 *                 type: string
 *               "firstName":
 *                 type: string
 *               "info":
 *                 type: string
 *               "movies":
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *     responses:
 *       200:
 *         description: A success message, you now have added a recipe.
 *       403:
 *         description: not allowed.
 *       500:
 *         description: An error has occurred, see error message for more details.
 */
actorRouter.post('/actor/add', async (req: Request, res: Response) => {
  const actorInput = <actorInput>req.body;
  try {
    const newActor = await acteurService.addActor(actorInput);
    res.status(200).json(newActor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /actor/delete/{id}:
 *   delete:
 *     summary: Delete an actor.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: actor ID
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: Now you see the deleted actor.
 */
actorRouter.delete('/actor/delete/:id', async (req: Request, res: Response) => {
  try {
    const actorId = Number(req.params.id);
    await acteurService.deleteActor(actorId);
    res.status(200).json({ message: 'Actor deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /actor/update/{id}:
 *   put:
 *     summary: Update an actor.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: actor ID
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               "name":
 *                 type: string
 *               "firstName":
 *                 type: string
 *               "info":
 *                 type: string
 *               "movies":
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *     responses:
 *       200:
 *         description: Now you see the updated actor.
 */
actorRouter.put('/actor/update/:id', async (req: Request, res: Response) => {
  try {
    const actorInput = <actorInput>req.body;
    const actorId = Number(req.params.id);
    const actor = await acteurService.updateActor(actorId, actorInput);
    res.status(200).json(actor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default actorRouter;
