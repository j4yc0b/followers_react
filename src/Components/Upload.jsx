import propTypes from "prop-types";
import FileUpload from "./FileUpload";

function Upload({ setHasError }) {
  return (
    <div className="shadow-lg bg-white my-8 border-dotted border-black">
      <h3 className="smallheader">Upload your files here</h3>
      <FileUpload
        setHasError={setHasError}
        followersFileName="followers_1.json"
        followingFileName="following.json"
      />
    </div>
  );
}

Upload.propTypes = {
  setHasError: propTypes.bool,
};

Upload.defaultProps = {
  setHasError: false,
};

export default Upload;
