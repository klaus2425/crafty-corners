import Loading from "./utils/Loading";

const Fallback = () => {
  return (
    <div className="authenticated-container" id='home'>
        <div id="feed" className="feed">
          <Loading />
        </div>
        <div className="recommended">
        </div>
    </div>
)
}

export default Fallback;