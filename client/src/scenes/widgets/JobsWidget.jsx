import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setJobs } from "state";
import JobWidget from "./JobWidget.jsx";

const JobsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.jobs);
  const token = useSelector((state) => state.token);

  const getJobs = async () => {
    const response = await fetch("http://localhost:3001/jobs", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setJobs({ jobs: data }));
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
        }) => (
          <JobWidget
            key={_id}
            jobId={_id}
            jobUserId={userId}
            name={`${displayName}`}
            description={description}
          />
        )
      )}
    </>
  ); 
};

export default JobsWidget;