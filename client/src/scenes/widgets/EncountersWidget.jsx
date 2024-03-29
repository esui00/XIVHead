import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEncounters } from "state";
import EncounterWidget from "./EncounterWidget.jsx";
import { mainURL } from "lib/api.js";

const EncountersWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const encounters = useSelector((state) => state.encounters);
  const token = useSelector((state) => state.token);

  const getEncounters = async () => {
    const response = await fetch(`${mainURL}/encounters`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setEncounters({ encounters: data }));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${month}-${day}-${year}`;
  };

  useEffect(() => {
    getEncounters();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {Array.isArray(encounters) &&
        encounters.map(
          ({ _id, userId, displayName, description, createdAt }) => (
            <EncounterWidget
              key={_id}
              encounterId={_id}
              name={`${displayName}`}
              description={description}
              admin={_id.admin}
              userId={userId}
              createdAt={formatDate(createdAt)}
            />
          )
        )}
    </>
  );
};

export default EncountersWidget;