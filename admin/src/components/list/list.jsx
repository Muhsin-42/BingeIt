import "./list.scss";
import { getAllPoster } from "../../utils/Constants";
import { useState } from "react";
import { useEffect } from "react";
import axios from "../../utils/axios";
import React,{ useCallback } from "react";
import Box from '@mui/material/Box';
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

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
        console.log("inside catch");
        console.log(error);
      });
  };


  return (
    <div className="news">
      <div className="newContainers">
        {/* <Box sx={{ display: "flex", flexWrap: "wrap",justifyContent:"space-between" }}>
          {poster.map((pos,index) => {
            return (
              <Card key={index} sx={{ maxWidth: 600,maxHeight:400, flexBasis: "100%" }}>
                <CardMedia
                  sx={{ height: 350, width: 600 }}
                  image={pos.posterImageUrl}
                  title="green iguana"
                />
              </Card>
            );
          })}
        </Box> */}
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {poster.map((pos,index) => {
            return (
              <Box
                key={index}
                sx={{
                  width: ["100%", "50%", "33.33%", "50%"], // responsive width, 4 cards per row
                  p: 2,
                  m: 2,
                }}
              >
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


   