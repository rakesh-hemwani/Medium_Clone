import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify, decode } from 'hono/jwt'
import { createBlogInput, updateBlogInput } from '@rakesh_hemwani/medium-common/dist'

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: number;
    }
}>();

//Middle ware for JWT verfications
blogRouter.use('/*', async (c, next) => {
    const header = c.req.header('Authorization') || "";
    const token = header?.split(' ')[1];
    const response = await verify(token, c.env.JWT_SECRET);
    if (response) {
        c.set("userId", Number(response.id));
        await next();
    }
    else {
        c.status(403);
        return c.json({
            error: "Unauthorized"
        })
    }
})

blogRouter.post('/create', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
   
    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);
    if(!success){
        c.status(400);
        return c.json({
            error: "Invalid input"
        });
    }
    console.log("Inside create blog router");
    const authorId = c.get("userId");
    const blog = await prisma.blog.create({
        data: {
            title: body.title,
            content: body.content,
            published: body.published,
            authorId: authorId
        }
    })
    return c.json({
        id : blog.id
    })
})

blogRouter.put('/update', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body);
    if(!success){
        c.status(400);
        return c.json({
            error: "Invalid input"
        });
    }
    const blog = await prisma.blog.update({
        where: {
            id: body.id
        },
        data: {
            title: body.title,
            content: body.content,
            published: body.published,
        }
    })
    return c.json(blog);
})

blogRouter.get('/get/:id', async (c) => {
    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())

        //const body = await c.req.json();
        const id = c.req.param('id');
        const blog = await prisma.blog.findFirst({
            where: {
                id: Number(id)
            },
            select : {
                content :true,
                title :true,
                id :true,
                createdAt :true,
                author: {
                    select : {
                        name: true
                    }
                }
            }
        })
        return c.json(blog);
    }
    catch (err) {
        console.log(err);
        c.status(404)
        return c.json({
            error: "Some Error Occured"
        })
    }

})

blogRouter.get('/bulk', async (c) => {
    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())

        //const body = await c.req.json();
        const blog = await prisma.blog.findMany({
            select : {
                content :true,
                title :true,
                id :true,
                createdAt :true,
                author: {
                    select : {
                        name: true
                    }
                }
            }
        });
        return c.json(blog);
    }
    catch (err) {
        console.log(err);
        c.status(404)
        return c.json({
            error: "Blog not found"
        })
    }
})