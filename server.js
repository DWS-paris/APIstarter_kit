/* 
Import
*/
    require('dotenv').config();
    const express = require('express');
    const bodyParser = require('body-parser');
    const mongoDB = require('./db.connect');
//


/* 
Config
*/
    const server = express();
    const port = process.env.PORT    

    class ServerClass{
        init(){
            //=> Body-parser
            server.use(bodyParser.json({limit: '10mb'}));
            server.use(bodyParser.urlencoded({ extended: true }));


            //=> Define API router
            const ApiRouterClass = require('./api.router');
            const apiRouter = new ApiRouterClass();
            server.use('/', apiRouter.init());

            // Start server
            this.launch()
        }

        launch(){
            // Connect MongoDB
            mongoDB.initClient()
            .then( mongooseResponse => {
                // Launch server
                server.listen(port, () => console.log({ database: mongooseResponse, server: `http://localhost:${port}` }))
            })
            .catch( mongooseError => console.log(mongooseError));
        }
    }
//


/* 
Start
*/
    new ServerClass().init();
//