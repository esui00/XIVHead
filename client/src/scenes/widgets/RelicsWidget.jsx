import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRelics } from "state";
import RelicWidget from "./RelicWidget.jsx";

const RelicsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const relics = useSelector((state) => state.relics);
  const token = useSelector((state) => state.token);

  const getRelics = async () => {
    const response = await fetch("http://localhost:3001/relics", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setRelics({ relics: data }));
  };


  useEffect(() => {
    getRelics();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {Array.isArray(relics) &&
        relics.map(
        ({
          _id,
          userId,
          displayName,
          description,
        }) => (
          <RelicWidget
            key={_id}
            relicId={_id}
            relicUserId={userId}
            name={`${displayName}`}
            description={description}
          />
        )
      )}
    </>
  ); 
};

export default RelicsWidget;