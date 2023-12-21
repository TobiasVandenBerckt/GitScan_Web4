/**
 * @swagger
 * components:
 *   schemas:
 *     Regisseur:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The director ID.
 *         name:
 *           type: string
 *           description: The director name.
 *         firstName:
 *           type: string
 *           description: The director first name.
 *         info:
 *           type: string
 *           description: The director password.
 *         films:
 *           type: array
 *           items: 
 *             $ref: '#/components/schemas/Film'
 *           description: The director movies.
 * 
 *     Film:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 */

import express, { Request, Response } from 'express';
import { Regisseur } from '../domain/model/Regisseur';
import regisseurService from '../service/regisseur.service';
import { regisseurInput, userInput } from '../types';

const regisseurRouter = express.Router();

/**
 * @swagger
 * /directors:
 *   get:
 *     summary: Get all directors.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Now you see all directors.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Regisseur'
 */
regisseurRouter.get('/directors', async (req: Request & { auth: userInput }, res: Response) => {
  const loggedInUser = req.auth.email;
  const regisseurs = await regisseurService.getAllRegisseurs();
  res.status(200).json(regisseurs);
});

/**
 * @swagger
 * /director/delete/{id}:
 *   delete:
 *     summary: Delete a director.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: director ID
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: Now you see the deleted director.
 */
regisseurRouter.delete('/director/delete/:id', async (req: Request, res: Response) => {
  try {
    const regisseurId = Number(req.params.id);
    await regisseurService.deleteRegisseurById(regisseurId);
    res.status(200).json({ message: 'Regisseur deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /director/{id}:
 *   get:
 *     summary: get a director.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: director id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: Now you see the director.
 */
regisseurRouter.get('/director/:id', async (req: Request, res: Response) => {
  try {
    const regisseurId = Number(req.params.id);
    const regisseur = await regisseurService.getRegisseurById(regisseurId);
    res.status(200).json(regisseur);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /director/update/{id}:
 *   put:
 *     summary: Update a director.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: director id
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
 *         description: Now you see the updated director.
 */
regisseurRouter.put('/director/update/:id', async (req: Request, res: Response) => {
  try {
    const regisseurInput = <regisseurInput>req.body;
    const regisseurId = parseInt(req.params.id);
    const newRegisseur = await regisseurService.updateRegisseurById(regisseurId, regisseurInput);
    res.status(200).json(newRegisseur);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /director/add:
 *   post:
 *     summary: Add a director.
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
 *                 type: number
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
 *         description: An error has occurred, see the error message for more details.
 */
regisseurRouter.post('/director/add', async (req: Request, res: Response) => {
  const regisseurInput = <regisseurInput>req.body;
  try {
    const newRegisseur = await regisseurService.addRegisseur(regisseurInput);
    res.status(200).json(newRegisseur);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default regisseurRouter;
