const express = require('express');
const router = express.Router();
const dataService = require('../service/dataService');

/* GET data */
router.get('/', async function(req, res, next) {
  try {
    res.json(await dataService.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting data `, err.message);
    next(err);
  }
});

/* POST new data*/
router.post('/', async function(req, res, next) {
  try {
    res.json(await dataService.create(req.body));
  } catch (err) {
    console.error(`Error while creating entry`, err.message);
    next(err);
  }
});

router.put('/:id', async function(req, res, next) {
  try {
    res.json(await dataService.update(req.params.id, req.body));
  } catch (err) {
    console.error('Error while updating data', err.message);
    next(err);
  }
});

router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await dataService.remove(req.params.id));
  } catch (err) {
    console.error('Error while deleting data entry', err.message);
    next(err);
  }
});

module.exports = router;