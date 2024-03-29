import Icon from '@mui/material/Icon';
import ThumbUpAltOutlined from '@mui/icons-material/ThumbUpAltOutlined';
import Paper from "@mui/material/Paper";
import Box from '@mui/material/Box';
import FeedImg from "./Images/feed03.avif";
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import Chip from '@mui/material/Chip';
import { useEffect, useState } from 'react';

const HackathonFeedPage = ({ hackList, upvoteActionHandler, sortArr }) => {
    const [voteSortOrder, setVoteSortOrder] = useState("asc");


    useEffect(() => {
        sortArr("votes", voteSortOrder);
        console.log("> voteSortOrder", voteSortOrder);
    }, [voteSortOrder]);

    const sortBtnClick = (str) => {
        setVoteSortOrder(prev => prev === "asc" ? "desc" : "asc");
    }

    if (!hackList?.length) {
        return (<div style={{ paddingTop: '6%' }}><h2>there are no hackathon items as of now, <br /> click on CREAT A NEW HACKATHON to create new hack ideas.</h2></div>);
    }

    console.log("HL", hackList);
    return (
        <><div>
            <br /> <br />
            <Button variant="outlined" onClick={() => sortBtnClick("votes")}>sort by upvotes</Button>
            <Button sx={{ marginLeft: '12px' }} variant="outlined" onClick={() => sortArr("time")}>sort by time</Button>
        </div>
            <div>{hackList?.length && hackList?.map((item, index) => (
                <Paper key={item?.id} elevation={12} sx={{ marginLeft: '12%', marginRight: '12%', marginTop: '32px', marginBottom: '32px', borderRadius: '6px' }}>
                    <Box sx={{ padding: '12px' }}>
                        <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '56px',
                        }}>
                            <div>
                                <img width="420" height="240" src={FeedImg} style={{ borderRadius: '6px' }} />
                            </div>
                            <div style={{ width: '50%', marginTop: '44px', textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                                <div><Typography variant="h4">{item?.title}</Typography>
                                    <Typography variant="h6">{item?.desc}</Typography></div>
                                <span>{item?.tags?.map((tag, index) => (
                                    <Chip key={`tag-${index}`} variant="outlined" label={tag} />
                                ))}</span>
                                <span>created at {new Date(item?.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</span>
                                <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '6px', color: 'blue', fontWeight: '660' }}>
                                    <span style={{ marginBottom: '12px' }}>{item?.votes > 0 ? item?.votes : 0} </span>upvotes
                                </div>
                            </div>
                            <span onClick={() => upvoteActionHandler(index)} style={{ width: '4%', marginTop: '66px', marginRight: '36px' }}>
                                <div style={{ display: 'flex', position: 'relative', justifyContent: 'flex-end', margin: 'auto', cursor: 'pointer' }}><div><ThumbUpAltOutlined sx={{ width: '56px', height: '64px' }} /><span style={{color:'grey'}}> click to upvote</span></div> &nbsp;</div>
                            </span>
                        </div>

                    </Box>
                </ Paper>
            ))}</div></>
    );
}


export default HackathonFeedPage;