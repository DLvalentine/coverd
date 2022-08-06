import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

export default function BookList(props) {
    return (
        <ImageList id="img-list" cols={10} rowHeight={200}>
            {props.books.map((book, idx) => {
                if(book?.volumeInfo?.imageLinks?.thumbnail)
                return (
                    <ImageListItem key={`book-${idx}`}>
                        <img
                            alt={book?.volumeInfo?.title}
                            title={book?.volumeInfo?.title}
                            id="book-img"
                            onClick={() => goToBookPage(book?.volumeInfo/*?.industryIdentifiers[0]?.identifier*/)}
                            src={book?.volumeInfo?.imageLinks?.thumbnail}
                            srcSet={book?.volumeInfo?.imageLinks?.thumbnail}
                            loading="lazy"
                        />
                    </ImageListItem>
                )
            })}
        </ImageList>
    )
}

function goToBookPage(volumeInfo) {
    /**
     * TODO: implement book components + page using ISBN, redirect to that. In the meantime, just go to the google page.
     *       Ideally that page would aggregate data from more sources than just google. But for the MVP, this is fine.
     */
    window.open(volumeInfo?.infoLink, '_blank');
};