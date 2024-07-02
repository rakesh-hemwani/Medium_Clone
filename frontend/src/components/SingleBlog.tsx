import { Blog } from "../hooks/blogHook"
import { Avatar } from "./Avatar"

export const SingleBlog = ({ blog }: { blog: Blog }) => {
    return <div className="flex justify-center">
            <div className="grid grid-cols-12 px-10 py-8 w-full max-w-screen-2xl">
                <div className="col-span-8">
                    <div className="text-4xl font-extrabold ">
                        {blog.title}
                    </div>
                    <div className=" font-light pt-3 text-slate-500">
                        Posted on {blog.createdAt.split('T')[0]}
                    </div>
                    <div className="py-5">
                        {blog.content}
                    </div>
                </div>
                <div className="col-span-4 px-5 ">
                    <div className="text-lg flex justify-center flex-col px-5 text-slate-700">
                        Author
                    </div>
                    <div className="pt-5 flex">
                        <div className="grid grid-cols-10">
                            <div className="col-span-2  flex justify-center items-center">
                                <Avatar name = {blog.author.name} size="large"/>
                            </div>
                            <div className="col-span-8 ">
                                <div className="text-xl font-bold">
                                    {blog.author.name}
                                </div>
                                <div className="text-md text-slate-500 pt-1">
                                    Master of Myth fighter of Hearts, “I'm always reinventing my blog for the better.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
}