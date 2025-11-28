import { Router } from "express";
import {
  createUserController,
  getAllUsersController,
  
} from "../controller/userController";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management APIs
 */

/**
 * @swagger
 * /api/user/create:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - phone
 *               - address
 *             properties:
 *               name:
 *                 type: string
 *                 example: "hihi"
 *               email:
 *                 type: string
 *                 example: "jimmy@gmail.com"
 *               password:
 *                 type: string
 *                 example: "jim@123!"
 *               phone:
 *                 type: string
 *                 example: "09234792"
 *               address:
 *                 type: string
 *                 example: "Newzerland"
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     phone:
 *                       type: string
 *                     address:
 *                       type: string
 *                     isActive:
 *                       type: boolean
 *                     roles:
 *                       type: array
 *                       items:
 *                         type: string
 */
router.post("/create", createUserController);

/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       email:
 *                         type: string
 *                       phone:
 *                         type: string
 *                       address:
 *                         type: string
 *                       isActive:
 *                         type: boolean
 *                       roles:
 *                         type: array
 *                         items:
 *                           type: string
 */
router.get("/", getAllUsersController);

export default router;
