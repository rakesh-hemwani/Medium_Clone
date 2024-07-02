import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { signUpInput, signInInput } from '@rakesh_hemwani/medium-common/dist'

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET: string
    }
}>()

// c stands for context res req and next
userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    //Logic 
    const body = await c.req.json();
    const { success} = signUpInput.safeParse(body);
    if (!success) {
        c.status(400);
        return c.json({
            error: "Invalid input"
        });
    }
    try {
        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: body.password,
                name: body.name
            }
        })
        const token = await sign({ id: user.id }, c.env.JWT_SECRET)
        return c.json({
            jwt: token,
            id : user.id,
            name : user.name
        })
    }
    catch (err) {
        c.status(400);
        return c.json({
            error: "User already exists"
        })
    }
})

userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    

    const body = await c.req.json();
    const { success} = signInInput.safeParse(body);
    if (!success) {
        c.status(400);
        return c.json({
            error: "Invalid input"
        });
    }
    const user = await prisma.user.findUnique({
        where: {
            email: body.email
        }
    })
    if (!user) {
        c.status(403);
        return c.json({
            error: "No user found"
        });
    }
    else if (user.password !== body.password) {
        c.status(401);
        return c.json({
            error: "Invalid password"
        });
    }

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({
        jwt: token,
        id : user.id,
        name :user.name
    })
})


//------------Dummy Router --------------------->

