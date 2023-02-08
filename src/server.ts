import express, { Application } from 'express'
import swagger from 'swagger-ui-express';
import { dataSource } from './config/ormconfig';
import { errorMiddleware } from './middleware/error.middleware';
import routes from './routes';
import doc from './docs.json'

const app:Application = express()

const main = async(): Promise<void> => {
  try{
    await dataSource.initialize().then(() => console.log("Connect"))
    app.use(express.json())
    app.use(routes)
    app.use(errorMiddleware)

    app.use('/api', swagger.serve, swagger.setup(doc))
  }catch(err: unknown){
    console.log(err);
  }finally{
    app.listen(9090, ():void => console.log(9090))
  }
}

main()