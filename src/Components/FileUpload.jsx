import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import propTypes from "prop-types";
import { Card } from "react-bootstrap";

function FileUpload({ setHasError, followersFileName, followingFileName }) {
  const [files, setFiles] = useState([]);
  const [noFilesSelected, setNoFilesSelected] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [accountsList, setAccountsList] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [showSubmitButton, setShowSubmitButton] = useState(false); // default value in the ()
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    try {
      const selectedFiles = [...event.target.files];
      if (selectedFiles.length > 0) {
        setFiles(selectedFiles);
        setErrorMessage("");
        setShowSubmitButton(true);
        setIsDragOver(false);
      } else {
        setShowSubmitButton(false);
        setHasError(true);
        setErrorMessage("No files selected.");
      }
    } catch (error) {
      setShowSubmitButton(false);
      setHasError(true);
      setErrorMessage("Failed to add files.");
    }
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    try {
      const droppedItems = [...event.dataTransfer.items];
      const allFiles = [];

      for (const item of droppedItems) {
        const entry = item.webkitGetAsEntry();
        if (entry) {
          await traverseFileTree(entry, allFiles);
        }
      }
      setFiles(allFiles);
      setShowSubmitButton(true);
      setHasError(false);
      setErrorMessage("");
    } catch (error) {
      setShowSubmitButton(false);
      setHasError(true);
      setErrorMessage("Failed to add files.");
    }
    setIsDragOver(false);
  };

  const traverseFileTree = (entry, allFiles) => {
    return new Promise((resolve) => {
      if (entry.isFile) {
        entry.file((file) => {
          allFiles.push(file);
          resolve();
        });
      } else if (entry.isDirectory) {
        const reader = entry.createReader();
        reader.readEntries(async (entries) => {
          for (const ent of entries) {
            await traverseFileTree(ent, allFiles);
          }
          resolve();
        });
      }
    });
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleClick = () => {
    document.getElementById("fileInput").click();
  };

  const readFileAsync = (file) => {
    return new Promise((resolve, reject) => {
      // A new instance of FileReader is created.
      // FileReader is a built-in web API that provides methods to read the contents of files stored on the user's computer.
      const reader = new FileReader();

      // Set up the onload event handler before starting the file read operation.
      // Eventually calling resolve with a value fulfills the promise with that value.
      // This means the promise returned by readFileAsync will be fulfilled with the parsed JSON data.
      reader.onload = () => resolve(JSON.parse(reader.result));

      // Set up the onerror event handler before starting the file read operation
      reader.onerror = reject;

      // Start reading the file as text (this is an asynchronous operation)
      reader.readAsText(file);
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const fileNames = files.map((file) => file.name);

    if (
      fileNames.includes(followersFileName) &&
      fileNames.includes(followingFileName)
    ) {
      setErrorMessage("");

      try {
        const followersFile = files.find(
          (file) => file.name === "followers_1.json"
        );
        const followingFile = files.find(
          (file) => file.name === "following.json"
        );

        const followersData = await readFileAsync(followersFile);
        const followingData = await readFileAsync(followingFile);

        const followersList = followersData.map((x) => ({
          user_name: x.string_list_data[0].value,
          link: x.string_list_data[0].href,
        }));
        const followingList = followingData.relationships_following.map(
          (x) => ({
            user_name: x.string_list_data[0].value,
            link: x.string_list_data[0].href,
          })
        );

        const accountsList = followingList.filter(
          (item) =>
            !followersList.some(
              (follower) => follower.user_name === item.user_name
            )
        );
        setAccountsList(accountsList);
        navigate("/accounts", { state: { accountsList } }); // Navigate to the /accounts route and pass the accountsList as state
      } catch (error) {
        setErrorMessage("Error processing files: " + error.message);
      }
    } else {
      setHasError(true);
      setErrorMessage(
        "One or both of the files uploaded is incorrect, see the correct files below."
      );
    }
  };

  return (
    <div
      className={`border-2 border-dashed rounded p-6 text-left cursor-pointer ${isDragOver ? "border-blue-500 bg-blue-100" : "border-gray-300"}`}
      onSubmit={handleSubmit}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <form>
        <card className="button" onClick={handleClick}>
          Choose Files
        </card>
        {showSubmitButton && (
          <button type="submit" id="submitBtn" className="submitbutton">
            Submit files
          </button>
        )}
        <input
          multiple
          type="file"
          id="fileInput"
          className="ml-10 hidden"
          webkitdirectory=""
          onChange={handleFileChange}
        />
        {files.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg mb-2">Selected Files:</h3>
            <ul className="list-disc list-inside">
              {Array.from(files).map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}
      </form>
      {errorMessage && <p className="text-red-500 font-bold">{errorMessage}</p>}
    </div>
  );
}

export default FileUpload;
