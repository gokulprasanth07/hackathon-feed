// import App from './App';

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import HackathonFeedPage from './Hackathon/HackathonFeedPage';
import CreateHackathonForm from './Hackathon/CreateHackathonForm';

const mockHackList = [
  {
    title: 'Hackathon 1',
    desc: 'Description 1',
    tags: ['Tag1', 'Tag2'],
    date: '2024-01-01T07:00:38.138Z',
    votes: 5,
  },
  {
    title: 'Hackathon 2',
    desc: 'Description 2',
    tags: ['Tag3', 'Tag4'],
    date: '2024-01-02T08:00:38.138Z',
    votes: 3,
  },
];


//unit tests for Hackathon Feed Component
describe('HackathonFeedPage', () => {
  it('renders the component with no hackList', () => {
    render(<HackathonFeedPage hackList={[]} upvoteActionHandler={() => {}} sortArr={() => {}} />);
    expect(screen.getByText(/there are no hackathon items as of now/i)).toBeInTheDocument();
  });

  it('renders the component with hackList', () => {
    render(<HackathonFeedPage hackList={mockHackList} upvoteActionHandler={() => {}} sortArr={() => {}} />);
    expect(screen.getByText(/Hackathon 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Hackathon 2/i)).toBeInTheDocument();
  });

  it('handles upvote click', () => {
    const upvoteActionHandlerMock = jest.fn();
    render(<HackathonFeedPage hackList={mockHackList} upvoteActionHandler={upvoteActionHandlerMock} sortArr={() => {}} />);

    fireEvent.click(screen.getByText(/click to upvote/i));
    expect(upvoteActionHandlerMock).toHaveBeenCalledWith(0);
  });

  it('handles sorting by upvotes', () => {
    const sortArrMock = jest.fn();
    render(<HackathonFeedPage hackList={mockHackList} upvoteActionHandler={() => {}} sortArr={sortArrMock} />);

    fireEvent.click(screen.getByText(/sort by upvotes/i));
    expect(sortArrMock).toHaveBeenCalledWith('votes');
  });

  it('handles sorting by time', () => {
    const sortArrMock = jest.fn();
    render(<HackathonFeedPage hackList={mockHackList} upvoteActionHandler={() => {}} sortArr={sortArrMock} />);

    fireEvent.click(screen.getByText(/sort by time/i));
    expect(sortArrMock).toHaveBeenCalledWith('time');
  });
});


//unit tests for Hackathon Form component
const mockSetNewHack = jest.fn();
const mockAddHackathonItemHandler = jest.fn();

const renderComponent = () => {
  const utils = render(
    <CreateHackathonForm
      newHack={{title: 'Hackathon Title', desc: 'Hackathon Description', tags: ['hackathon', 'front-end'] }}
      setNewHack={mockSetNewHack}
      addHackathonItemHandler={mockAddHackathonItemHandler}
    />
  );

  return {
    ...utils,
    openModal: () => fireEvent.click(screen.getByText(/Create a new Hackathon Idea/i)),
    getTitleInput: () => screen.getByLabelText(/Title/i),
    getDescInput: () => screen.getByLabelText(/Description/i),
    // getTagsInput: () => screen.getByTestId('tags-standard'), // Use document.getElementById
    getCreateButton: () => document.getElementById('create-hack-btn'), // Use document.getElementById
  };
};

describe('CreateHackathonForm', () => {
  it('renders correctly and opens modal on button click', () => {
    const { openModal } = renderComponent();

    expect(screen.getByText(/Create a new Hackathon Idea/i)).toBeInTheDocument();
    expect(screen.queryByText(/please enter the hackathon details/i)).toBeNull();
    openModal();
    expect(screen.getByText(/please enter the hackathon details/i)).toBeInTheDocument();
  });

  it('handles input changes and button click', () => {
    const { openModal, getTitleInput, getDescInput, getCreateButton } = renderComponent();
    openModal();
    fireEvent.change(getTitleInput(), { target: { value: 'Hackathon Title' } });
    fireEvent.change(getDescInput(), { target: { value: 'Hackathon Description' } });
    // fireEvent.change(getTagsInput(), { target: { value: ['hackathon', 'front-end'] } });
    fireEvent.click(getCreateButton());

    expect(mockSetNewHack).toHaveBeenCalledWith({ title: 'Hackathon Title', desc: 'Hackathon Description', tags: ['hackathon', 'front-end'] });
    expect(mockAddHackathonItemHandler).toHaveBeenCalled();
  });
});
