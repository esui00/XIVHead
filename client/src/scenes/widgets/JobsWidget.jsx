import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setJobs } from "state";
import JobWidget from "./JobWidget.jsx";
import { mainURL } from "lib/api.js";

const JobsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs);
  const token = useSelector((state) => state.token);

  const getJobs = async () => {
    const response = await fetch(`${mainURL}/jobs`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setJobs({ jobs: data }));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${month}-${day}-${year}`;
  };

  useEffect(() => {
    getJobs();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {Array.isArray(jobs) &&
        jobs.map(
        ({
          _id,
          userId,
          displayName,
          description,
          createdAt
        }) => (
          <JobWidget
            key={_id}
            jobId={_id}
            name={`${displayName}`}
            description={description}
            userId={userId}
            createdAt={formatDate(createdAt)}
          />
        )
      )}
    </>
  ); 
};

export default JobsWidget;