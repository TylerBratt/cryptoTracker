import React from 'react'
import { Container, makeStyles, Typography } from "@material-ui/core";
import Carousel from './Carousel';


const useStyles = makeStyles(() => ({
  banner: {
    backgroundImage: "url(./banner2.jpg)",
  },
  bannerContent: {
    height: 400,
    display: "flex",
    flexDirection: "column",
    justifyContent:"space-around",
    paddingTop: 25,
  },
  tagline: {
    display: "flex",
    height: "40%",
    flexDirection:"column",
    justifyContent:"center",
    textAlign: "center",
  },
}));

const Banner = () => {

  const classes = useStyles();

  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              marginBottom: 15,
              fontFamily: "Poppins",
            }}
          >
            Crypto Tracker
          </Typography>
          <Typography
            variant="subtitle1"
            style={{
              color: "darkgrey",
              textTransform:"capitalize",
              fontFamily:"Poppins"
            }}
          >
            Get all the info regardeing your favourite Crypto Currencies!
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  )
}

export default Banner
