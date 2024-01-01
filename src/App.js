import './App.css';
import { useState, useEffect } from 'react';
import BasicModal from "./Hackathon/LoginPage";
import HackathonFeedPage from "./Hackathon/HackathonFeedPage";
import CreateHackathonForm from "./Hackathon/CreateHackathonForm";
import Button from '@mui/material/Button';



function App() {
  const [hackList, setHackList] = useState([]);
  const [newHack, setNewHack] = useState({ title: '', desc: '', tag: [] });
  const [employeeId, setEmployeeId] = useState(''); // new state for employee id
  const [listLength, setListLength] = useState(0);

  let storedLoginStatus = localStorage?.getItem('isUserLoggedIn') || false;
  const [isLoggedIn, setIsLoggedIn] = useState(storedLoginStatus); // new state for login status

  const [employeeIds, setEmployeeIds] = useState([1, 2, 3, 4, 5, 6]); // new state for employee ids

  useEffect(() => {
    const storedChallenges = JSON.parse(localStorage.getItem('hackList')) || [];
    // const storedEmployeeIds = JSON.parse(localStorage.getItem('employeeId')) || [];
    console.log(">>> from local storage", storedChallenges);
    setHackList(storedChallenges);
    setListLength(storedChallenges?.length);
    // setEmployeeIds(storedEmployeeIds);

  }, []);

  const addHackathonItemHandler = (e) => {
    if(newHack?.title === "" || newHack?.desc === ""){ // form validations
      alert("Please fill in all the required fields : name and description fields");
      return;
    }

    setHackList((prevList) => {
      let updatedHackListArr = [...prevList, { ...newHack, votes: 0, date: new Date() }];
      localStorage?.setItem('hackList', JSON.stringify(updatedHackListArr));
      return updatedHackListArr;
    });

    setNewHack({ title: '', desc: '', tags: [] });
  }

  const sortArr = (sortBy) => {
    console.log(">>> sort fn");
    let sortedArr = [...hackList];
    if (sortBy === "votes") {
      sortedArr.sort((a, b) => a.votes > b.votes ? -1 : 1);
    } else {
      sortedArr.sort((a, b) => a.date > b.date ? 1 : -1);
    }
    localStorage?.setItem('hackList', JSON.stringify(sortedArr));
    setHackList(sortedArr);
  }


  const upvoteActionHandler = (index) => {
    console.log(">>> upvoteActionHandler", hackList, index);
    let updatedList = [...hackList];
    if (updatedList[index]) {
      updatedList[index].votes += 1;
      setHackList(updatedList);
      localStorage?.setItem('hackList', JSON.stringify(updatedList));
    }
  }

  return (
    <div className='App'>
      <br /> <br />
      <Button onClick={() => setIsLoggedIn(false)}>LOG OUT</Button>
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