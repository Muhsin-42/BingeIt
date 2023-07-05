import "./list.scss";
import { getAllPoster } from "../../utils/Constants";
import { useState, useEffect } from "react";
import axios from "../../utils/axios";
import { Box, Card, CardMedia, CardActions, CardContent }  from '@mui/material';
import { DeleteIcon, EditIcon } from "@mui/icons-material";

const PosterList = () => {
  const [poster, getPoster] = useState([]);
  useEffect((key) => {
    getAllPosters();
  }, []);

  const getAllPosters = () => {
    axios
      .get(getAllPoster)
      .then((response) => {
        getPoster(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  return (
    <div className="news">
      <div className="newContainers">
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {poster.map((pos,index) => {
            return (
              <Box key={index}
                sx={{ width: ["100%", "50%", "33.33%", "50%"], p: 2, m: 2 }}>
                <Card sx={{ maxWidth: 500 }}>
                  <CardMedia
                    sx={{ height: 400, width: 500 }}
                    image={pos.posterImageUrl}
                    title="green iguana"
                  />
                  <CardContent style={{textAlign:"center"}}>
                   
                  </CardContent>
                  <CardActions style={{paddingLeft:"110px"}}>
                    {/* <Link> */}
                      <DeleteIcon style={{color:"red"}}  />
                    {/* </Link> */}
                    {/* <Link to={`/editMovie/${movie._id}`}> */}
                      <EditIcon style={{color:"green"}}/>
                    {/* </Link> */}
                  </CardActions>
                </Card>
              </Box>
            );
          })}
        </Box>
      </div>
    </div>
  );
  
};

export default PosterList;