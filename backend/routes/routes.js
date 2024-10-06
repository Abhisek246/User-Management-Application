const express = require('express');
const { getDetails, deleteDetail, addUserDetail, updateUser } = require('../api/details'); 
const routes = express.Router();

routes.get('/', getDetails); 
routes.delete('/:id', deleteDetail)
routes.post('/user', addUserDetail)
routes.put('/user/:id', updateUser);

module.exports = routes;

