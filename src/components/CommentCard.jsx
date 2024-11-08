import { useContext } from "react";
import { UserContext } from "../contexts/User"
import { TrashIcon } from "lucide-react";

export default function CommentCard(props) {
    const { author, body, comment_id } = props.comment;
    const deleteComment = props.deleteComment
    const { user } = useContext(UserContext)
    return <div key={comment_id} className="bg-dark-grey rounded p-1 m-1" id={comment_id}>
        <p>{body}</p>
        <p className="font-extralight text-sm opacity-75">
            By {author}
        </p>
        {author === user.username ? <TrashIcon className="hover:cursor-pointer" onClick={deleteComment} /> : null}
    </div>
}