import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import TimeAgo from 'timeago.js';

const Comment = ({comment}) => {
    
    const timeago = new TimeAgo()
  return (
      <Box>
          
            
                  <Card  sx={{ marginBottom: "0.5rem" }}>
                      <Stack justifyContent="space-between" direction="row" sx={{ margin: "1rem" }}>
                          <Box sx={{display:"flex"}}>
                      <Avatar src={comment.author.profilePic} sx={{ width: 30, height: 30 }} />
                          <Typography variant='span' sx={{ marginTop: "0.3rem", marginLeft: "1rem" }}>{ comment.author.username }</Typography>
                          </Box>
                          <Box>
                      <Typography variant='p'>{timeago.format(comment.createdAt)}</Typography> 
                              <IconButton aria-label="settings">
                                  <MoreVertIcon />
                              </IconButton>
                          </Box>
                      </Stack>
                      <Box sx={{margin:"1rem"}}>
                  <Typography variant='p'>{comment.text}</Typography>
                      </Box>
                      <Box>
                          
                      </Box>
                  </Card>
    </Box>
  )
}

export default Comment
