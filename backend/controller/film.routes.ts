/**
 * @swagger
 * components:
 *   schemas:
 *     Film:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The movie ID.
 *         title:
 *           type: string
 *           description: The movie title.
 *         year:
 *           type: integer
 *           description: The movie year.
 *         duration:
 *           type: integer
 *           description: The movie duration.
 *         info:
 *           type: string 
 *           description: The movie info.
 *         beoordeling:
 *           type: integer
 *           description: The movie beoordeling.
 *         directorId:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *         actors:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Actor'
 *           description: The movie actors.
 *     Actor:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 */

import express, { Request, Response } from 'express';
import filmService from '../service/film.service';
import { filmInput } from '../types';

const filmRouter = express.Router();

/**
 * @swagger
 * /movies:
 *   get:
 *     description: Use to request all movies
 *     summary: Use to request all movies
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Film'
 *       '500':
 *         description: Internal server error
 */
filmRouter.get('/movies', async (req: Request, res: Response) => {
  try {
    const films = await filmService.getAllFilms();
    res.status(200).json(films);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /movie/add:
 *   post:
 *     summary: Add a movie.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               "title":
 *                 type: string
 *               "year":
 *                 type: integer
 *               "duration":
 *                 type: integer
 *               "info":
 *                 type: string
 *               "beoordeling":
 *                 type: integer
 *               "directorId":
 *                 type: object
 *               "actors":
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *     responses:
 *       200:
 *         description: A success message, you now have added a movie.
 *       403:
 *         description: not allowed.
 *       500:
 *         description: An error has occurred, see error message for more details.
 */
filmRouter.post('/movie/add', async (req: Request, res: Response) => {
  try {
    const filmInput = <filmInput>req.body;
    const newFilm = await filmService.addFilm(filmInput);
    res.status(200).json(newFilm);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /movie/{id}:
 *   get:
 *     summary: get a movie.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: movie ID
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: Now you see the movie.
 */
filmRouter.get('/movie/:id', async (req: Request, res: Response) => {
  try {
    const FilmId = Number(req.params.id);
    const film = await filmService.getFilmById(FilmId);
    res.status(200).json(film);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /movie/delete/{id}:
 *   delete:
 *     summary: Delete a movie.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: movie ID
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: Now you see the deleted movie.
 */
filmRouter.delete('/movie/delete/:id', async (req: Request, res: Response) => {
  try {
    const FilmId = Number(req.params.id);
    await filmService.deleteFilm(FilmId);
    res.status(200).json({ message: "movie deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /movie/update/{id}:
 *   post:
 *     summary: Update a movie.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: movie ID
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               "title":
 *                 type: string
 *               "year":
 *                 type: integer
 *               "duration":
 *                 type: integer
 *               "info":
 *                 type: string
 *               "beoordeling":
 *                 type: integer
 *               "directorId":
 *                 type: object
 *               "actors":
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *     responses:
 *       200:
 *         description: A success message, the movie updated successfully.
 */
filmRouter.put('/movie/update/:id', async (req: Request, res: Response) => {
  try {
    const FilmId = Number(req.params.id);
    const filmInput = <filmInput>req.body;
    const newFilm = await filmService.updateFilm(FilmId, filmInput);
    res.status(200).json(newFilm);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default filmRouter;
