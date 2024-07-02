import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks/blogHook"
import { ClipLoader } from "react-spinners";

export const Blogs = () => { 
    const {loading, blogs} = useBlogs();
    if (loading) {
        return <div className="flex justify-center pt-8">
            <div className="max-w-screen-lg w-full">
                <BlogSkeleton/>
                <BlogSkeleton/>
                <BlogSkeleton/>
                <BlogSkeleton/>
            </div>
        </div>
    }

    return <div>
        <Appbar />
        <div className="flex justify-center">
            <div className=" max-w-xl">
                {blogs.map(blog => 
                <BlogCard authorName={blog.author.name}
                    title={blog.title}
                    content={blog.content}
                    publishedDate={blog.createdAt.split('T')[0]}
                    id={blog.id}></BlogCard>)}

            </div>
        </div>
    </div>
}