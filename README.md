# Getting Started with Create React App
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts
In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

To run unit test cases
Launches the test runner in the interactive watch mode.\


## instructions on the demo flow 
1) login into hackathon app by clicking on the Log In button present below LHS of the image in homepage
2) please login with one of the following numbers as id : 1,2,3,4,5,6
3) now you can create new hack idea list item by clicking on the "Create a new Hackathon Idea" button
4) make sure to fill in the title, description and some tags in the list given
5) after filling all the necessary details click the "Create Hack Idea" button below
6) you should be able to see hack list page with created hack item present in the listing page
7) you can add 3-4 list items and then press upvote icon on RHS to check sort by votes and sort by time functionalities
8) logout functionality

## project implementation details
1) used local storage for storing the user data to persist data across page refreshed
2) have written unit test cases for 2 important feature components that is : HackathonFeedPage component and CreateHackathonForm components


## items that are in mind that can be implemented further to this project 
`(reason for not implementing the below points is that i took around 2 days to complete whole task over this weekend, so did not have enough time to cover all the additional functionalities)`
1) implement top level routes and create a product details page kinda component for individual hacakathon items where we can add member names, comment sections, etc.,

2) further, optimizations like lazy loading with intersection observer in hackathon feed page with individual hack items, using useMemo, useCallback wherever needed, wrap normal components with React.memo HOC to reduce the rerenders, chunk level code splitting can be implemented to increase performance



