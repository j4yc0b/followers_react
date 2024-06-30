import React from "react";
import propTypes from "prop-types";

const LegalNotes = (props) => {
  return (
    <div className="container mx-auto p-4">
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
        <p>
          <strong>Effective Date: {props.effectiveDate}</strong>
        </p>
        <p>
          This Privacy Policy explains how our application ("App") collects,
          uses, and protects your social media data when you use our services.
          By using the App, you agree to the collection and use of information
          in accordance with this policy.
        </p>
        <h3 className="smallestheader">1. Information Collection</h3>
        <p>
          Our App requests access to your Instagram following and followers
          data. This includes:
          <ul className="list-disc list-inside ml-4">
            <li>
              The names of the Instagram handles you follow and those who follow
              you.
            </li>
            <li>The profile links to these handles.</li>
            <li>Timestamp of when the following started.</li>
          </ul>
        </p>
        <h3 className="smallestheader">2. Use of Information</h3>
        <p>
          The collected information is used solely to provide the
          functionalities of our App, such as displaying your Instagram
          followers and following data.
        </p>
        <h3 className="smallestheader">3. Data Handling and Storage</h3>
        <p>
          All data handling occurs on the client side (within your device using
          the React app). We do not store any data on our servers or any
          external databases. This means:
          <ul className="list-disc list-inside ml-4">
            <li>
              Your Instagram data is processed in real-time and not retained
              after the session ends.
            </li>
            <li>
              We do not have access to your Instagram data beyond your use of
              the App.
            </li>
          </ul>
        </p>
        <h3 className="smallestheader">4. Data Protection</h3>
        <p>
          While your data is handled on your device, we implement
          industry-standard security measures within the App to ensure it is
          processed securely during your session.
        </p>
        <h3 className="smallestheader">5. User Consent</h3>
        <p>
          By using our App, you consent to the collection and use of your
          Instagram data as described in this Privacy Policy. You are informed
          of this data collection when you share your Instagram data to the App.
        </p>
        <h3 className="smallestheader">6. Changes to This Privacy Policy</h3>
        <p>
          We may update our Privacy Policy from time to time. We will notify you
          of any changes by posting the new Privacy Policy on this page. You are
          advised to review this Privacy Policy periodically for any changes.
        </p>
        {/* <h3 className="smallestheader">7. Contact Us</h3>
        <p>
          If you have any questions or concerns about this Privacy Policy,
          please contact us at:
          <br />
          Email: [Insert Contact Email]
        </p> */}
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Terms of Service</h2>
        <p>
          <strong>Effective Date: {props.effectiveDate}</strong>
        </p>
        <p>
          Welcome to our application ("App"). By accessing or using our App, you
          agree to be bound by these Terms of Service ("Terms"). If you do not
          agree to these Terms, please do not use our App.
        </p>
        <h3 className="smallestheader">1. Use of the App</h3>
        <p>
          Our App provides functionalities related to your Instagram following
          and followers data. You must comply with these Terms and all
          applicable laws when using our App.
        </p>
        <h3 className="smallestheader">2. User Responsibilities</h3>
        <p>
          <ul className="list-disc list-inside ml-4">
            <li>
              You are responsible for maintaining the confidentiality of your
              Instagram account information.
            </li>
            <li>
              You agree not to misuse the App, including but not limited to
              attempting to access data you are not authorized to view.
            </li>
          </ul>
        </p>
        <h3 className="smallestheader">3. Data Collection and Use</h3>
        <p>
          Our App collects your Instagram following and followers data as
          described in our Privacy Policy. You consent to this data collection
          and use by using the App.
        </p>
        <h3 className="smallestheader">4. Limitation of Liability</h3>
        <p>
          To the fullest extent permitted by law, we disclaim all warranties and
          will not be liable for any damages arising from the use of our App.
        </p>
        <h3 className="smallestheader">5. Changes to These Terms</h3>
        <p>
          We may modify these Terms at any time. We will notify you of any
          changes by posting the updated Terms on this page. Your continued use
          of the App constitutes acceptance of the updated Terms.
        </p>
        {/* <h3 className="smallestheader">6. Contact Us</h3>
        <p>
          If you have any questions about these Terms, please contact us at:
          <br />
          Email: [Insert Contact Email]
        </p> */}
        <p>Thank you for using our App.</p>
      </section>
    </div>
  );
};

export default LegalNotes;

LegalNotes.propTypes = {
  effectiveDate: propTypes.string,
};

LegalNotes.defaultProps = {
  effectiveDate: "29th June 2024",
};
