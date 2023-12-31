import './App.css';
import { useState, useEffect } from 'react';
import BasicModal from "./Hackathon/LoginPage";
import HackathonFeedPage from "./Hackathon/HackathonFeedPage";
import CreateHackathonForm from "./Hackathon/CreateHackathonForm";



function App() {
  const [hackList, setHackList] = useState([]);
  const [newHack, setNewHack] = useState({ title: '', desc: '', tag: [] });
  const [employeeId, setEmployeeId] = useState(''); // new state for employee id
  const [isLoggedIn, setIsLoggedIn] = useState(false); // new state for login status
  const [employeeIds, setEmployeeIds] = useState([1, 2, 3, 4, 5, 6]); // new state for employee ids

  useEffect(() => {
    const storedChallenges = JSON.parse(localStorage.getItem('hackList')) || [];
    const storedEmployeeIds = JSON.parse(localStorage.getItem('employeeIds')) || [];
    console.log(">>> from local storage", storedChallenges, storedEmployeeIds);

    setHackList(storedChallenges);
    setEmployeeIds(storedEmployeeIds);

  }, []);



  const addHackathonItemHandler = (e) => {
    if(newHack?.title === "" || newHack?.desc === ""){ // form validations
      alert("Please fill in all the required fields : name and description fields");
      return;
    }
    setHackList([...hackList, { ...newHack, votes: 0, date: new Date() }]);
    setNewHack({ title: '', desc: '', tags: [] });
  }


  useEffect(() => {
    console.log(">> did update :", hackList);

    localStorage?.setItem('hackList', JSON.stringify(hackList));
    localStorage?.setItem('employeeIds', JSON.stringify(employeeIds)); // save employee ids to local storage

    console.log(">>> fetched from LS", JSON.parse(localStorage.getItem('hackList')) || []);

  }, [hackList]);

  const sortArr = (sortBy) => {
    console.log(">>> sort fn");
    let sortedArr = [...hackList];
    if (sortBy === "votes") {
      sortedArr.sort((a, b) => a.votes > b.votes ? -1 : 1);
    } else {
      sortedArr.sort((a, b) => a.date > b.date ? 1 : -1);
    }
    setHackList(sortedArr);
  }


  const upvoteActionHandler = (index) => {
    console.log(">>> upvoteActionHandler", hackList, index);
    let updatedList = [...hackList];
    if (updatedList[index]) {
      updatedList[index].votes += 1;
      setHackList(updatedList);
    }
  }

  return (
    <div className='App'>
      <br /> <br />
      {isLoggedIn ? (
        <>
          <CreateHackathonForm newHack={newHack} setNewHack={setNewHack} addHackathonItemHandler={addHackathonItemHandler} />
          <HackathonFeedPage hackList={hackList} upvoteActionHandler={upvoteActionHandler} sortArr={sortArr} />
        </>
      ) : (
        <BasicModal employeeId={employeeId} setEmployeeId={setEmployeeId} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} employeeIds={employeeIds} />
      )}
    </div>
  );
}

export default App;