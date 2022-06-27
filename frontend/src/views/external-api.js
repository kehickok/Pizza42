// src/views/external-api.js

import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const ExternalApi = () => {
  const [message, setMessage] = useState("");
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const { getAccessTokenSilently } = useAuth0();

  const callApi = async () => {
    try {
      const response = await fetch(`${serverUrl}/api/messages/public-message`);

      const responseData = await response.json();

      setMessage(responseData.message);
    } catch (error) {
      setMessage(error.message);
    }
  };

  const callSecureApi = async () => {
    try {
      const token = await getAccessTokenSilently();

      const response = await fetch(
        `${serverUrl}/api/messages/protected-message`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const responseData = await response.json();

      setMessage(responseData.message);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="container">
      <h1>Pizza Order</h1>
      <p>
        Go ahead and select the one flavor of pizza that we have today! Make sure to verify your email before submitting.
      </p>
          <button
              type="button"
              onClick={sendVerifyEmailLink}
              variant="secondary"
              className="mt-5"
          >
              Verify Email
          </button>
        <button type="button" className="btn btn-primary" onClick={callApi}>
          Get Public Message
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={callSecureApi}
        >
          Submit
        </button>
      </div>
      {message && (
        <div className="mt-5">
          <h6 className="muted">Result</h6>
          <div className="container-fluid">
            <div className="row">
              <code className="col-12 text-light bg-dark p-4">{message}</code>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

async function sendVerifyEmailLink() {

    try {
        logger("verifyemail", "backendAPI: " + apiUrl);

        const token = await getAccessTokenSilently();
        logger("verifyemail", "email verified: " + user.email_verified);
        logger("verifyemail", "token: " + token)

        const response = await fetch(`${apiUrl}/api/verify-email/${user.sub}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                //UserID: user.sub
            },
        });

        const responseData = await response.json();
        setMessage(responseData);
    } catch (error) {
        setMessage(error.message);
    }
}

export default ExternalApi;
