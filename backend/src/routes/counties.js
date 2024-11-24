const express = require('express');

const CountiesService = require('../services/counties');
const CountiesDBApi = require('../db/api/counties');
const wrapAsync = require('../helpers').wrapAsync;

const router = express.Router();

const { parse } = require('json2csv');

const { checkCrudPermissions } = require('../middlewares/check-permissions');

router.use(checkCrudPermissions('counties'));

/**
 *  @swagger
 *  components:
 *    schemas:
 *      Counties:
 *        type: object
 *        properties:

 *          name:
 *            type: string
 *            default: name

 */

/**
 *  @swagger
 * tags:
 *   name: Counties
 *   description: The Counties managing API
 */

/**
 *  @swagger
 *  /api/counties:
 *    post:
 *      security:
 *        - bearerAuth: []
 *      tags: [Counties]
 *      summary: Add new item
 *      description: Add new item
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                data:
 *                  description: Data of the updated item
 *                  type: object
 *                  $ref: "#/components/schemas/Counties"
 *      responses:
 *        200:
 *          description: The item was successfully added
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Counties"
 *        401:
 *          $ref: "#/components/responses/UnauthorizedError"
 *        405:
 *          description: Invalid input data
 *        500:
 *          description: Some server error
 */
router.post(
  '/',
  wrapAsync(async (req, res) => {
    const referer =
      req.headers.referer ||
      `${req.protocol}://${req.hostname}${req.originalUrl}`;
    const link = new URL(referer);
    await CountiesService.create(
      req.body.data,
      req.currentUser,
      true,
      link.host,
    );
    const payload = true;
    res.status(200).send(payload);
  }),
);

/**
 * @swagger
 * /api/budgets/bulk-import:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    tags: [Counties]
 *    summary: Bulk import items
 *    description: Bulk import items
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *         schema:
 *          properties:
 *            data:
 *              description: Data of the updated items
 *              type: array
 *              items:
 *                $ref: "#/components/schemas/Counties"
 *    responses:
 *      200:
 *        description: The items were successfully imported
 *    content:
 *      application/json:
 *        schema:
 *          $ref: "#/components/schemas/Counties"
 *      401:
 *        $ref: "#/components/responses/UnauthorizedError"
 *      405:
 *        description: Invalid input data
 *      500:
 *        description: Some server error
 *
 */
router.post(
  '/bulk-import',
  wrapAsync(async (req, res) => {
    const referer =
      req.headers.referer ||
      `${req.protocol}://${req.hostname}${req.originalUrl}`;
    const link = new URL(referer);
    await CountiesService.bulkImport(req, res, true, link.host);
    const payload = true;
    res.status(200).send(payload);
  }),
);

/**
 *  @swagger
 *  /api/counties/{id}:
 *    put:
 *      security:
 *        - bearerAuth: []
 *      tags: [Counties]
 *      summary: Update the data of the selected item
 *      description: Update the data of the selected item
 *      parameters:
 *        - in: path
 *          name: id
 *          description: Item ID to update
 *          required: true
 *          schema:
 *            type: string
 *      requestBody:
 *        description: Set new item data
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                id:
 *                  description: ID of the updated item
 *                  type: string
 *                data:
 *                  description: Data of the updated item
 *                  type: object
 *                  $ref: "#/components/schemas/Counties"
 *              required:
 *                - id
 *      responses:
 *        200:
 *          description: The item data was successfully updated
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Counties"
 *        400:
 *          description: Invalid ID supplied
 *        401:
 *          $ref: "#/components/responses/UnauthorizedError"
 *        404:
 *          description: Item not found
 *        500:
 *          description: Some server error
 */
router.put(
  '/:id',
  wrapAsync(async (req, res) => {
    await CountiesService.update(req.body.data, req.body.id, req.currentUser);
    const payload = true;
    res.status(200).send(payload);
  }),
);

/**
 * @swagger
 *  /api/counties/{id}:
 *    delete:
 *      security:
 *        - bearerAuth: []
 *      tags: [Counties]
 *      summary: Delete the selected item
 *      description: Delete the selected item
 *      parameters:
 *        - in: path
 *          name: id
 *          description: Item ID to delete
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: The item was successfully deleted
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Counties"
 *        400:
 *          description: Invalid ID supplied
 *        401:
 *          $ref: "#/components/responses/UnauthorizedError"
 *        404:
 *          description: Item not found
 *        500:
 *          description: Some server error
 */
router.delete(
  '/:id',
  wrapAsync(async (req, res) => {
    await CountiesService.remove(req.params.id, req.currentUser);
    const payload = true;
    res.status(200).send(payload);
  }),
);

/**
 *  @swagger
 *  /api/counties/deleteByIds:
 *    post:
 *      security:
 *        - bearerAuth: []
 *      tags: [Counties]
 *      summary: Delete the selected item list
 *      description: Delete the selected item list
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                ids:
 *                  description: IDs of the updated items
 *                  type: array
 *      responses:
 *        200:
 *          description: The items was successfully deleted
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Counties"
 *        401:
 *          $ref: "#/components/responses/UnauthorizedError"
 *        404:
 *          description: Items not found
 *        500:
 *          description: Some server error
 */
router.post(
  '/deleteByIds',
  wrapAsync(async (req, res) => {
    await CountiesService.deleteByIds(req.body.data, req.currentUser);
    const payload = true;
    res.status(200).send(payload);
  }),
);

/**
 *  @swagger
 *  /api/counties:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags: [Counties]
 *      summary: Get all counties
 *      description: Get all counties
 *      responses:
 *        200:
 *          description: Counties list successfully received
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: "#/components/schemas/Counties"
 *        401:
 *          $ref: "#/components/responses/UnauthorizedError"
 *        404:
 *          description: Data not found
 *        500:
 *          description: Some server error
 */
router.get(
  '/',
  wrapAsync(async (req, res) => {
    const filetype = req.query.filetype;

    const payload = await CountiesDBApi.findAll(req.query);
    if (filetype && filetype === 'csv') {
      const fields = ['id', 'name'];
      const opts = { fields };
      try {
        const csv = parse(payload.rows, opts);
        res.status(200).attachment(csv);
        res.send(csv);
      } catch (err) {
        console.error(err);
      }
    } else {
      res.status(200).send(payload);
    }
  }),
);

/**
 *  @swagger
 *  /api/counties/count:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags: [Counties]
 *      summary: Count all counties
 *      description: Count all counties
 *      responses:
 *        200:
 *          description: Counties count successfully received
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: "#/components/schemas/Counties"
 *        401:
 *          $ref: "#/components/responses/UnauthorizedError"
 *        404:
 *          description: Data not found
 *        500:
 *          description: Some server error
 */
router.get(
  '/count',
  wrapAsync(async (req, res) => {
    const payload = await CountiesDBApi.findAll(
      req.query,

      { countOnly: true },
    );

    res.status(200).send(payload);
  }),
);

/**
 *  @swagger
 *  /api/counties/autocomplete:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags: [Counties]
 *      summary: Find all counties that match search criteria
 *      description: Find all counties that match search criteria
 *      responses:
 *        200:
 *          description: Counties list successfully received
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: "#/components/schemas/Counties"
 *        401:
 *          $ref: "#/components/responses/UnauthorizedError"
 *        404:
 *          description: Data not found
 *        500:
 *          description: Some server error
 */
router.get('/autocomplete', async (req, res) => {
  const payload = await CountiesDBApi.findAllAutocomplete(
    req.query.query,
    req.query.limit,
  );

  res.status(200).send(payload);
});

/**
 * @swagger
 *  /api/counties/{id}:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags: [Counties]
 *      summary: Get selected item
 *      description: Get selected item
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID of item to get
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Selected item successfully received
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Counties"
 *        400:
 *          description: Invalid ID supplied
 *        401:
 *          $ref: "#/components/responses/UnauthorizedError"
 *        404:
 *          description: Item not found
 *        500:
 *          description: Some server error
 */
router.get(
  '/:id',
  wrapAsync(async (req, res) => {
    const payload = await CountiesDBApi.findBy({ id: req.params.id });

    res.status(200).send(payload);
  }),
);

router.use('/', require('../helpers').commonErrorHandler);

module.exports = router;
