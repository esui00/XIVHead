import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEncounters } from "state";
import EncounterWidget from "./EncounterWidget.jsx";

const EncountersWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const encounters = useSelector((state) => state.encounters);
  const token = useSelector((state) => state.token);

  const getEncounters = async () => {
    const response = await fetch("http://localhost:3001/encounters", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setEncounters({ encounters: data }));
  };


  useEffect(() => {
    getEncounters();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {Array.isArray(encounters) &&
        encounters.map(
        ({
          _id,
          userId,
          displayName,
          description,
        }) => (
          <EncounterWidget
            key={_id}
            encounterId={_id}
            name={`${displayName}`}
            description={description}
            admin={_id.admin}
            userId={userId}
          />
        )
      )}
    </>
  ); 
};

export default EncountersWidget;