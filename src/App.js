import './App.css';
import { useState, useEffect } from 'react';
import BasicModal from "./Hackathon/LoginPage";
import HackathonFeedPage from "./Hackathon/HackathonFeedPage";
import CreateHackathonForm from "./Hackathon/CreateHackathonForm";
import Header from "./Hackathon/Header";


function App() {
  const [hackList, setHackList] = useState([]);
  const [newHack, setNewHack] = useState({ title: '', desc: '', tag: [] });
  const [employeeId, setEmployeeId] = useState(localStorage.getItem('employeeId') || ""); // new state for employee id
  const [listLength, setListLength] = useState(0);

  let storedLoginStatus = !!( localStorage?.getItem('isUserLoggedIn'));
  const [isLoggedIn, setIsLoggedIn] = useState(storedLoginStatus); // new state for login status
  const [employeeIds, setEmployeeIds] = useState([1, 2, 3, 4, 5, 6]); // new state for employee ids

  

  useEffect(() => {
    const storedChallenges = JSON.parse(localStorage.getItem('hackList')) || [];
    setHackList(storedChallenges);
    setListLength(storedChallenges?.length);
  }, []);

  useEffect(() => {
  }, [listLength]);

  const addHackathonItemHandler = (e) => {
    if (newHack?.title === "" || newHack?.desc === "" || newHack?.tags?.length === 0) { // form validations
      alert("Please fill in all the required fields : name and description fields");
      return;
    }

    
    setHackList((prevList) => {
      let updatedHackListArr = [...prevList, { ...newHack, votes: 0, date: new Date(), id: `hack-id-${listLength + 1}`, empid: employeeId, votedEmps: [] }];
      localStorage?.setItem('hackList', JSON.stringify(updatedHackListArr));
      return updatedHackListArr;
    });

    setNewHack({ title: '', desc: '', tags: [] });
  }

  const sortArr = (sortBy, voteSortOrder="asc") => {
    let sortedArr = [...hackList];

    if (sortBy === "votes") {
      if(voteSortOrder === "asc") {
        sortedArr.sort((a, b) => a.votes > b.votes ? -1 : 1);
      } else {
        sortedArr.sort((a, b) => a.votes < b.votes ? -1 : 1);
      }
    }
    localStorage?.setItem('hackList', JSON.stringify(sortedArr));
    setHackList(sortedArr);
  }


  const upvoteActionHandler = (index) => {

    let updatedList = [...hackList];
    console.log("> BOOLEAN", Number(updatedList[index]?.empid) );
    if (updatedList[index] && Number(updatedList[index]?.empid) != employeeId &&
    !(updatedList[index] && updatedList[index].votedEmps && updatedList[index].votedEmps.includes(employeeId))
    ) {
      updatedList[index].votes += 1;
      updatedList[index].votedEmps.push(employeeId);
      setHackList(updatedList);
      localStorage?.setItem('hackList', JSON.stringify(updatedList));
    }

  }

  const logOutHandler = () => {
    setIsLoggedIn(false);
    localStorage.clear('employeeId');
    localStorage.setItem('isUserLoggedIn', !!(false));
  }

  // useEffect(() => console.log("> isUserLoggedIn: ", isLoggedIn), [isLoggedIn]);

  return (
    <div className='App'>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} logOutHandler={logOutHandler} employeeId={employeeId} />
      <div style={{ paddingTop: '16px' }}>
        {isLoggedIn ? (
          <>
            <CreateHackathonForm newHack={newHack} setNewHack={setNewHack} addHackathonItemHandler={addHackathonItemHandler} />
            <HackathonFeedPage hackList={hackList} upvoteActionHandler={upvoteActionHandler} sortArr={sortArr} />
          </>
        ) : (
          <BasicModal employeeId={employeeId} setEmployeeId={setEmployeeId} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} employeeIds={employeeIds} />
        )}
      </div>
    </div>
  );
}

export default App;