// src/views/profile.js

import React, { useState } from "react";
import { logger } from "../util/logger";

import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const apiUrl = (process.env.REACT_APP_RUNNING_LOCALLY) ? process.env.REACT_APP_API_URL_LOCAL : process.env.REACT_APP_API_URL;
  const { user, getAccessTokenSilently } = useAuth0();
    const { name, picture, email } = user;
    const [message, setMessage] = useState("");
    const [showAugmentedProfile, setShowAugmentedProfile] = useState(false);
    const handleHideAugProfile = () => setShowAugmentedProfile(false);
    const handleShowAugProfile = () => setShowAugmentedProfile(true);


    const getFullID = async () => {
        logger("getFullId:\n" + showAugmentedProfile);
        if (showAugmentedProfile) {
            handleHideAugProfile();
        } else {
            setMessage("Fetching...");
            handleShowAugProfile();
            try {
                logger("fullID", "backendAPI: " + apiUrl);

                const token = await getAccessTokenSilently();
                logger("fullID", "token: " + token + user.sub)

                const response = await fetch(`${apiUrl}/api/get-full-id/${user.sub}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });

                logger("getFullID: response ", response);
                const responseData = await response.json();
                setMessage(responseData);
                logger("getFullID: response data", responseData);
            } catch (error) {
                setMessage(error.message);
            }
        }
    }

  return (
    <div>
      <div className="row align-items-center profile-header">
        <div className="col-md-2 mb-3">
          <img
            src={picture}
            alt="Profile"
            className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
          />
        </div>
        <div className="col-md text-center text-md-left">
          <h2>{name}</h2>
          <p className="lead text-muted">{email}</p>
        </div>
        <div className="col-md text-center text-md-left">
          {showAugmentedProfile ?
            <Button onClick={getFullID} variant="secondary" className="mt-5">
              Hide Augmented Profile
            </Button>
            :
            <Button onClick={getFullID} variant="primary" className="mt-5">
              Show Augmented Profile
            </Button>
          }
        </div>
      </div>
      <div className="row">
        <pre className="col-12 text-light bg-dark p-4">
            {showAugmentedProfile ? <Highlight>{JSON.stringify(message, null, 1)}</Highlight> : <Highlight>{JSON.stringify(user, null, 1)}</Highlight>}
        </pre>
      </div>
    </div>
  );
};

export default Profile;
