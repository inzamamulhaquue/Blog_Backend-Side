const express = require('express');
const { getAllVlog, addVlog, updatevlog, getById, deletevlog, getByUserId } = require('../controllers/vlogController');

const VlogRouter = express.Router();

VlogRouter.get('/', getAllVlog);
VlogRouter.post('/add', addVlog );
VlogRouter.put('/update/:id', updatevlog);
VlogRouter.get('/:id', getById);
VlogRouter.delete('/:id', deletevlog);
VlogRouter.get('/user/:id', getByUserId );

module.exports = VlogRouter;