import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import RecipieForm from './components/recipieForm'
import RecipieGrid from './components/recipieGrid'
import LoginForm from './components/login-form'
import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import PushPinIcon from '@mui/icons-material/PushPin';

function App() {
  
  // setup state
  const [recipies, setRecipies] = useState([]);
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [color,setColor] = useState("");
  
  const getUser = async() => {
    try {
      const response = await axios.get('/user/');
      console.log('Get User: There is a user saved in the server session: ')
      setLoggedIn(true);
      setUsername(response.data.user.username);
      setColor(response.data.user.color);
    } catch(error){
      console.log(error);
        console.log('Get user: no user');
        setLoggedIn(false);
        setUsername(null);
    }
  }
  

  const fetchRecipies = async() => {
    try {      
      const response = await axios.get("/api/recipies");
      setRecipies(response.data.recipies);
    } catch(error) {
      setError("error retrieving recpies: " + error);
    }
  }

  // fetch ticket data
  useEffect(() => {
    getUser();
    fetchRecipies();
  },[]);

  const updateUser = (user) => {
    const username = user.username
    setUsername(username)
    if (username != null){
      setLoggedIn(true);
      setColor(user.color)
    }
    else {
      setLoggedIn(false);
    }
    fetchRecipies();
  }


  // render results
  return (
    <div className="App">
      {error}
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <Stack direction="row" spacing={2}>
            <PushPinIcon/>
            <h1> (Reci)Pinterest </h1>
          </Stack>
        </CardContent>
      </Card>
     
      <Grid container spacing={2}>
        <Grid xs={4}>
        {loggedIn ? (
        <div>
          <RecipieForm class="form" updateUser={updateUser} username={username} color={color}/>
          <Card  sx={{ maxWidth: 345 }}>
                <CardContent>
                 <FormGroup>
                  <FormControlLabel control={<Switch/>} label="Filter by Favorites" />
                </FormGroup>
                </CardContent>
            </Card>
            <Card  sx={{ maxWidth: 345 }}>
                <CardContent>
                 <FormGroup>
                  <FormControlLabel control={<Switch/>} label="Only my Recipies" />
                </FormGroup>
                </CardContent>
            </Card>
            </div>
          ) : (
          <LoginForm class="form" updateUser={updateUser}/>
        )}
            <Card  sx={{ maxWidth: 345 }}>
                <CardContent>
                 <a href="https://github.com/jameskrueger00/recipinterest"><p>jameskrueger00@GitHub</p></a>
                </CardContent>
            </Card>
        </Grid>
        <Grid  xs={8}>
          <RecipieGrid recipies={recipies}/>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
