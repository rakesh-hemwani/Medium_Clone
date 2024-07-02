import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {sign, verify, decode} from 'hono/jwt'
import { blogRouter } from './routes/blog'
import { userRouter } from './routes/user'
import { cors } from 'hono/cors'
//Hono is very similar to express it has http framework work with multiple clod and serverless integrity

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
}}>()

app.use('/api/*', cors())

app.route('/api/v1/blog', blogRouter);
app.route('/api/v1/user', userRouter);


//----------------------Dummy Route -----------
app.get('/user1', async (c) =>{
  return c.json({
      name : "Rakesh",
      email : "hemwani@gmail.com"
  })
})

export default app
