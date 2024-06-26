import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import JSZip from "jszip";

function FileUpload({ setHasError, followersFileName, followingFileName }) {
  const [files, setFiles] = useState([]);
  const [noFilesSelected, setNoFilesSelected] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [accountsList, setAccountsList] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [showSubmitButton, setShowSubmitButton] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = async (event) => {
    try {
      const selectedFiles = [...event.target.files];
      const allFiles = [];

      for (const file of selectedFiles) {
        await processSingleFile(file, allFiles);
      }

      if (selectedFiles.length > 0) {
        await processFiles(allFiles);
        setFiles(allFiles);
        setErrorMessage("");
        setShowSubmitButton(true);
        setIsDragOver(false);
      } else {
        setShowSubmitButton(false);
        setHasError(true);
        setErrorMessage("No files selected.");
      }
    } catch (error) {
      console.error(error);
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
        console.log("item:" + item + "with type:" + typeof item);
        if (entry) {
          await traverseFileTree(entry, allFiles);
        }
      }
      await processFiles(allFiles);
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

  const processSingleFile = async (file, allFiles) => {
    if (file.name.endsWith(".zip")) {
      const zipFiles = await extractZip(file);
      allFiles.push(...zipFiles);
    } else {
      allFiles.push(file);
    }
  };

  const processFiles = async (fileList) => {
    const allFiles = [];

    for (const file of fileList) {
      if (file.name.endsWith(".zip")) {
        const zipFiles = await extractZip(file);
        allFiles.push(...zipFiles);
      } else {
        allFiles.push(file);
      }
    }

    setFiles(allFiles);
    setShowSubmitButton(allFiles.length > 0);
    setHasError(false); // Reset error flag if files are successfully added
    setErrorMessage(""); // Clear error message
  };

  const traverseFileTree = (entry, allFiles) => {
    return new Promise((resolve) => {
      if (entry.isFile) {
        console.log("happy path");
        entry.file(async (file) => {
          if (file.name.endsWith(".zip")) {
            const zipFiles = await extractZip(file);
            allFiles.push(...zipFiles);
          } else {
            allFiles.push(file);
          }
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

  const extractZip = async (file) => {
    const zip = await JSZip.loadAsync(file);
    const zipFiles = [];

    await Promise.all(
      Object.keys(zip.files).map(async (fileName) => {
        const zipFile = zip.files[fileName];
        if (!zipFile.dir) {
          try {
            const content = await zipFile.async("blob");
            zipFiles.push(new File([content], fileName));
          } catch (error) {
            console.error("Failed to extract file from zip:", error);
          }
        }
      })
    );

    return zipFiles;
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
    setErrorMessage("");

    try {
      const followersFile = files.find(
        (file) =>
          file.name.includes(followersFileName) &&
          !file.name.includes("__MACOSX") // filtering out extra files from the zip
      );
      const followingFile = files.find(
        (file) =>
          file.name.includes(followingFileName) &&
          !file.name.includes("__MACOSX")
      );

      if (followersFile && followingFile) {
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
      } else {
        setErrorMessage("One or both files are incorrect.");
        setHasError(true);
      }
    } catch (error) {
      setErrorMessage("Error processing files: " + error.message);
      setHasError(true);
    }
  };

  return (
    <div
      className={`flex items-center justify-between border-2 border-dashed rounded p-6 text-left cursor-pointer dark:text-white ${isDragOver ? "flex items-center justify-between border-blue-500 bg-blue-100" : "border-gray-300 dark:bg-gray-600"}`}
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
            <h3 className="text-lg mb-2 font-bold">
              {files.length} file(s) selected.
            </h3>
            {errorMessage && (
              <p className="text-red-500 font-bold">{errorMessage}</p>
            )}
          </div>
        )}
      </form>
    </div>
  );
}

export default FileUpload;
