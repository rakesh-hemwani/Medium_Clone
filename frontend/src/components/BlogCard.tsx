import { Link } from "react-router-dom";
import { Avatar } from "./Avatar";

interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string
    id:number
}
export const BlogCard = ({
    authorName,
    title,
    content,
    publishedDate,
    id
}: BlogCardProps) => {
    return <Link to ={`/blog/${id}`}>
        <div className=" p-4 border-b border-slate-150 pb-4">
            <div className="flex">
                <div className="flex justify-center flex-col ">
                    <Avatar name={authorName} />
                </div>
                <div className="font text-sm pl-2 flex justify-center flex-col">{authorName}</div>
                <div className="flex justify-end flex-col pl-2 pb-1.5">
                    <Circle />
                </div>
                <div className="font-thin text-slate-500 pl-2 text-sm flex justify-center flex-col">{publishedDate}</div>
            </div>
            <div className="text-xl font-bold pt-2">
                {title}
            </div>
            <div className="font-light text-md mt-1">
                {content.length > 100 ? content.slice(0, 150) + "...." : content}
            </div>
            <div className="text-slate-500 text-sm font-thin mt-1 pt-2">
                {`${Math.ceil(content.length / 100)} minute(s) read`}
            </div>
        </div>
    </Link>
}
function Circle() {
    return <div className=" h-1 w-1 rounded-full bg-slate-500">

    </div>
}