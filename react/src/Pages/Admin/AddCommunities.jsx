
const AddCommunities = () => {
    return (
        <div className="add-community-container">
            <div className="community-form">
                <div className="community-labels">
                    <label htmlFor="community-name">Community Name</label>
                    <label htmlFor="community-name">Community Description</label>
                </div>
                <div className="community-inputs">
                    <input type="text" name="community-name" id="community-name" />
                    <textarea  name="community-name" rows={6} cols={20} />
                </div>
            </div>
        </div>
    )
}

export  default AddCommunities;