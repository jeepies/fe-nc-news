import { Link } from "react-router-dom"

export default function PageNotFound() {
    return <div className="text-center mt-5 text-white">
        <h1 className="font-bold text-4xl">D'oh! We lost it!</h1>
        <p className="text-faint mb-2">(404 - Not Found!)</p>
        <Link to="/"><button className="bg-iris rounded p-2">Take me home!</button></Link>
    </div>
}