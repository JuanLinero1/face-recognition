import React from "react";

const rank = (props) => {
  const userInformation = props.userInformation.props.userInformation.userInformation

  return (
    <div className="rank">
      Good Work <span>{userInformation.userName}</span>, your <span>total entries</span> {userInformation.userEntries === 1 ? "is" : "are"}{" "}
      <span>{userInformation.userEntries}</span>
    </div>
  );
};

export default rank;
