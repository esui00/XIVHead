import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRelics } from "state";
import RelicWidget from "./RelicWidget.jsx";
import { mainURL } from "lib/api.js";

const RelicsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const relics = useSelector((state) => state.relics);
  const token = useSelector((state) => state.token);

  const getRelics = async () => {
    const response = await fetch(`${mainURL}/relics`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setRelics({ relics: data }));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${month}-${day}-${year}`;
  };

  useEffect(() => {
    getRelics();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {Array.isArray(relics) &&
        relics.map(
          ({ _id, userId, displayName, description, createdAt }) => (
            <RelicWidget
              key={_id}
              relicId={_id}
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

export default RelicsWidget;