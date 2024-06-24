import propTypes from 'prop-types'

function List(props) {

    return(
        <div className="p-6 bg-white rounded-lg shadow-lg">    
            <h3 className="smallheader mb-3">{props.name}</h3>
                <ol className="list-decimal list-inside space-y-2">
                    <li> Go to the Instagram app on your phone and open the blade on the top right corner</li>
                    <li> Click on "Your activity"</li>
                    <li> Scroll all the way down to "Information you shared with Instagram" -section and click "Download Your Information"</li>
                    <li> Request a download</li>
                    <li> Select your Instagram profile from which you want to inspect the followers</li>
                    <li> Select types of information</li>
                    <li> Under "Connections" section select "Followers and following"</li>
                    <li> Select download on this device</li>
                    <li> Change date range to "All time"</li>
                    <li> For the format change it to "JSON" and then click "Submit Request</li>
                    <p className="font-bold">
                    Now it might take a minute or two until you will receive an email 
                    from Instagram informing that the download is ready.. 
                    </p>
                    <li> After you receive it, head back to the "Information you shared with Instagram" -section mentioned in step 3)</li>
                    <li> Click the "Download" button under "Available downloads" you will have your data on your device</li>
                    <li className={`${props.hasError ? 'text-2xl border-red-500 bg-red-100' : 'border-gray-300'}`}>
                    Now just drop the entire folder above or if you are on phone then choose 
                    the followers_1.json and following.json files from within the folder.
                    </li>
                </ol>
                <h4 className='smallheader my-4'> And you will see a list of people not following you back! </h4>
        </div>
    );
}

List.propTypes = {
    name: propTypes.string,
    hasError: propTypes.bool
}

List.defaultProps = {
    name: "Just follow the instructions:",
    hasError: false
}

export default List 