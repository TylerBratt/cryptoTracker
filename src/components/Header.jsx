import React from 'react'
import { 
  AppBar, 
  Container, 
  MenuItem, 
  Select, 
  Toolbar, 
  Typography 
} from "@material-ui/core";
import { 
  createTheme, 
  makeStyles, 
  ThemeProvider 
} from "@material-ui/core/styles"
import { useNavigate } from "react-router-dom"
import { CryptoState } from '../CryptoContext';

const useStyles = makeStyles((theme) => ({
  title: {
    flex: 1,
    color: "gold",
    fontFamily:"Poppins",
    fontWeight:"bold",
    cursor: "pointer",
  },
}))


const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    type: "dark",
  }
})

const Header = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate('/', {replace:true})
  }
  const { currency, setCurrency } = CryptoState();

  return (
    <ThemeProvider theme={darkTheme}>
      <div>
        <AppBar color="transparent" position="static">
          <Container>
            <Toolbar>
              <Typography
                className={classes.title}
                onClick={handleNavigate}
                variant="h6">
                <h1>Crypto Tracker</h1>
              </Typography>
              <Select
                varient="outlined"
                style={{
                  width: 100,
                  height: 40,
                  marginRight: 15,
                }}
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                >
                <MenuItem value={"CAD"}>CAD</MenuItem>
                <MenuItem value={"USD"}>USD</MenuItem>
                <MenuItem value={"EUR"}>EUR</MenuItem>
                <MenuItem value={"GBP"}>GBP</MenuItem>
                <MenuItem value={"JPY"}>JPY</MenuItem>
              </Select>
            </Toolbar>
          </Container>
        </AppBar>
      </div>
    </ThemeProvider>
  )
}

export default Header
