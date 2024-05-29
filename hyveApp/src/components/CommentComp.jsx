import React from 'react'
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
// import ListItemAvatar from '@mui/material/ListItemAvatar';


import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';




const CommentComp = () => {

    const comments = [
        { displayName: 'Roohi', comment: 'This is a comment1', timestamp: "ts...", photoURL: "pic..url" },
        { displayName: 'Ali', comment: 'This is a comment2', timestamp: "ts...", photoURL: "pic..url" }]

    const [open, setOpen] = React.useState(false);
    0
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const DrawerList = (
        <Box sx={{ width: 350 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                {comments.map((el, index) => (     
                    <ListItem key={index} >
                        <Grid container wrap="nowrap" spacing={2}>
                            <Grid item>
                                <Avatar alt={el.displayName} src={el.photoURL} />
                            </Grid>
                            <Grid justifyContent="left" item xs zeroMinWidth>
                                <h4 style={{ margin: 0, textAlign: "left" }}>{el.displayName}</h4>
                                <p style={{ textAlign: "left" }}>
                                ```{el.comment}{" "}
                                </p>
                                <p style={{ textAlign: "left", color: "gray" }}>
                                    {el.timestamp}
                                </p>
                            </Grid>
                           
                        </Grid>
                    </ListItem>
                    
                    
                ))}
            </List>

        </Box>
    );
    return (
        <div>



            <Button onClick={toggleDrawer(true)}>View Comments</Button>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </div>
    )
}

export default CommentComp

