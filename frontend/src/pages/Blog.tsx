import { ClipLoader } from "react-spinners";
import { useBlog } from "../hooks/blogHook"
import { Appbar } from "../components/Appbar";
import { useParams } from "react-router-dom";
import { SingleBlog } from "../components/SingleBlog";

export const Blog = () => {
    const {id} = useParams()
    const {loading, blog} = useBlog(
       {id : id || ""}
    );
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <ClipLoader size={50} color={"#123abc"} loading={loading} />
                <span className="ml-4">Loading...</span>
            </div>
        ); 
    }

    return <div>
        <Appbar />
        <SingleBlog blog={blog}/>
    </div>
}