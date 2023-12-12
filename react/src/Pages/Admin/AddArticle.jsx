const AddArticle = () => {

    const onSubmit = () => {
        return null;
    }

    return(
        
        <div className="add-article-container">
            <form onSubmit={onSubmit}>
                <h2>Add an Article</h2>
                <div className="article-form">
                    <div className="article-input">
                        <label>Article Title:</label>
                        <input type="text" />
                    </div>

                </div>
            </form>
        </div>
    )
}

export default AddArticle;