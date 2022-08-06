import { Link, useParams } from 'react-router-dom';

export default function Book() {
    const isbn = useParams().isbn;
    return (
        <div>
            <p>[PH] Book page for book: {isbn}</p>
            <Link to="/">Back Home</Link>
        </div>
    )
}