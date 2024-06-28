import propTypes from "prop-types";

function ListGeneric(props) {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800 dark:text-white">
      <h3 className="smallheader mb-3">{props.name}</h3>
      <ol className="list-decimal list-inside space-y-2 pl-3 text-xl">
        {props.listItems.map((item, key) => (
          <li
            className={`${props.hasError && key === 12 ? "text-3xl border-red-500 bg-red-100" : "border-gray-300"}`}
          >
            {item}
            {key === 9 && (
              <p className="font-bold my-3">
                Now it might take from few minutes up to 2 hours (depending on
                size of your following) until you will receive an email from
                Instagram informing that the download is ready..
              </p>
            )}
          </li>
        ))}
      </ol>
      <h4 className="smallheader my-4 dark:bg-gray-800 text-black dark:text-white">
        And you will see a list of people not following you back!
      </h4>
    </div>
  );
}

ListGeneric.propTypes = {
  name: propTypes.string,
  hasError: propTypes.bool,
  listItems: propTypes.array,
};

ListGeneric.defaultProps = {
  name: "Just follow the instructions to get your files:",
  hasError: false,
  listItems: [
    "Go to the Instagram app on your phone and open the blade on the top right corner",
    " Click on 'Your activity'",
    "Scroll all the way down to 'Information you shared with Instagram' -section and click 'Download Your Information'",
    "Request a download",
    "Select your Instagram profile from which you want to inspect the followers",
    "Select types of information",
    "Under 'Connections section select 'Followers and following'",
    "Select download on this device",
    "Change date range to 'All time'",
    "For the format change it to 'JSON' and then click 'Submit Request'",
    "After you receive it, head back to the 'Information you shared with Instagram' -section mentioned in step 3)",
    "Click the 'Download' button under 'Available downloads' you will have your data on your device",
    "Now just navigate to the downloaded folder and choose the followers_1.json and following.json files from within the folder",
  ],
};

export default ListGeneric;
