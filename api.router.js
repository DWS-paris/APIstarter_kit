/*
Imports & configuration
*/
  // Class
  const express = require('express');
  const classRouter = express.Router({ mergeParams: true });

  // Modules
  const model = require('./api.model');
// 


/*
Class definition
*/
  class RouterClass {
    
    constructor(){}

    // Définition des routes
    routes(){

        /**
         * Route to create new item
         * @param path: String => api endpoint
         * @param body: Object => mandatory data
        */
        classRouter.post('/', (req, res) => {
            // Check request body
            if (
                req.body.email === undefined &&
                req.body.username === undefined &&
                req.body.password === undefined

            ) { return res.status(400).json({ message: 'Bad data provided', data: null }) }
           
            else{
                model.findOne({email: req.body.email}, (error, item) => {
                    // Request error
                    if(error) { return res.status(400).json({ message: 'Network error', data: null}) }
                    else if(item) { return res.status(400).json({ message: 'Item not new', data: null}) }
                    else {
                        // Save item in DB
                        model.create(req.body)
                        .then( response => res.status(200).send({ message: 'Object created', data: response._id }))
                        .catch( response => res.status(200).send({ message: 'Request error', data: null }))
                    };
                });
            };
        });

        /**
         * Route to get item data by _id
         * @param path: String => api endpoint
         * @param id: String => selected objet id
        */
        classRouter.get('/:id', (req, res) => {
            model.findById(req.params.id, (error, item) => {
                if(error) { return res.status(400).json({ message: 'Network error', data: null}) }
                else if(item) { return res.status(200).send({ message: 'Object data sended', data: item }) }
            });
        });

        /**
         * Route to get all item data
         * @param path: String => api endpoint
        */
        classRouter.get('/', (req, res) => {
            model.find((error, items) => {
                if(error) { return res.status(400).json({ message: 'Network error', data: null}) }
                else if(items) { return res.status(200).send({ message: 'Objects data sended', data: items }) }
            });
        });

        /**
         * Route to update item data by _id
         * @param path: String => api endpoint
         * @param id: String => selected objet id
        */
        classRouter.put('/:id', (req, res) => {
            // Check request body
            if (
                req.body.email === undefined &&
                req.body.username === undefined &&
                req.body.password === undefined

            ) { return res.status(400).json({ message: 'No data provided', data: null }) }
           
            else{
                model.findByIdAndUpdate(req.params.id, {$set: req.body}, (error, item) => {
                    if(error) { return res.status(400).json({ message: 'Network error', data: null}) }
                    else if(item) { return res.status(200).send({ message: 'Object updated', data: req.params.id }) }
                });
            }
        });

        /**
         * Route to delete item by _id
         * @param path: String => api endpoint
         * @param id: String => selected objet id
        */
        classRouter.delete('/:id', (req, res) => {
            model.findByIdAndDelete({_id: req.params.id}, (error, item) => {
                if(error) { return res.status(400).json({ message: 'Network error', data: null}) }
                else if(item) { return res.status(200).send({ message: 'Object deleted', data: req.params.id }) }
            });
        });
    };

    // Initialize routes
    init(){
        this.routes();
        return classRouter;
    };
  };
//


/*
Export class
*/
    module.exports = RouterClass;
//