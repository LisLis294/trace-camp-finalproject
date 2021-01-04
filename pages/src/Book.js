const Book = props => {
    return(
        <div className="bg-purple-200">
            <h1 className="px-5 py-1"><b>{props.title}</b> by {props.author}</h1>
        </div>
    )
}

export default Book;