import React, { Component } from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import PublishIcon from '@mui/icons-material/Publish';
import axios from 'axios'

class RecipieForm extends Component {
    constructor() {
        super()
        this.state = {
          name: "",
          description: "",
          ingredients: "",
          instructions: "",
          prepTime: "",
          username: "",
          color: "",
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.logout = this.logout.bind(this)
  
    }
    
    componentWillMount() {
    this.setState({username: this.props.username, color: "#" + this.props.color});
  }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        console.log('handleSubmit')

        axios
            .post('/api/recipies', {
                name: this.state.name,
                description: this.state.description,
                ingredients: this.state.ingredients,
                instructions: this.state.instructions,
                prepTime: this.state.prepTime,
                author:this.state.username,
                color:this.state.color
            })
            .then(response => {
                console.log('recipie response: ')
                console.log(response)
                if (response.status === 200) {
                   // yay
                }
            }).catch(error => {
                console.log('recipie error: ')
                console.log(error);
                
            })
        this.props.updateUser({
            loggedIn: true,
            username: this.state.username
        })
    }
    
    logout(event) {
        event.preventDefault()
        console.log('logging out')
        axios.post('/user/logout').then(response => {
          console.log(response.data)
          if (response.status === 200) {
            this.props.updateUser({
              loggedIn: false,
              username: null
            })
          }
        }).catch(error => {
            console.log('Logout error')
            console.log(error)
        })
      }

    render() {
            let userLetter = this.state.username.substr(0,1).toUpperCase();
            return (
                <Card sx={{ maxWidth: 345 }}>
                  <CardHeader
                    avatar={
                      <Avatar sx={{ bgcolor: this.state.color }} aria-label="recipe">
                        {userLetter}
                      </Avatar>
                    }
                    title="Add a Recipie"
                  />
                  <CardContent>
                    <form className="form-horizontal">
                        <div className="form-group">
                            <div className="col-1 col-ml-auto">
                                <label className="form-label" htmlFor="name">Recipie Name:</label>
                            </div>
                            <div className="col-3 col-mr-auto">
                                <input className="form-input"
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Recipie Name"
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                        
                        <div className="form-group">
                            <div className="col-1 col-ml-auto">
                                <label className="form-label" htmlFor="description">Description:</label>
                            </div>
                            <div className="col-3 col-mr-auto">
                                <input className="form-input"
                                    type="text"
                                    id="description"
                                    name="description"
                                    placeholder="Description"
                                    value={this.state.description}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                        
                        <div className="form-group">
                            <div className="col-1 col-ml-auto">
                                <label className="form-label" htmlFor="prepTime">Prep Time:</label>
                            </div>
                            <div className="col-3 col-mr-auto">
                                <input className="form-input"
                                    type="text"
                                    id="prepTime"
                                    name="prepTime"
                                    placeholder="Prep Time"
                                    value={this.state.prepTime}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                        
                        <div className="form-group">
                            <div className="col-1 col-ml-auto">
                                <label className="form-label" htmlFor="ingredients">Ingredients:</label>
                            </div>
                            <div className="col-3 col-mr-auto">
                                <input className="form-input"
                                    type="text"
                                    id="ingredients"
                                    name="ingredients"
                                    placeholder="Ingredients"
                                    value={this.state.ingredients}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                        
                        <div className="form-group">
                            <div className="col-1 col-ml-auto">
                                <label className="form-label" htmlFor="instructions">Instructions:</label>
                            </div>
                            <div className="col-3 col-mr-auto">
                                <input className="form-input"
                                    type="text"
                                    id="instructions"
                                    name="instructions"
                                    placeholder="Instructions"
                                    value={this.state.intructions}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                        <div className="form-group ">
                            <div className="col-7"></div>
                            <button
                                className="btn btn-primary col-1 col-mr-auto"
                               
                                onClick={this.handleSubmit}
                                type="submit">Submit</button>
                        </div>
                        
                    </form>
                  </CardContent>
                  <CardActions disableSpacing>
                    <a href="" onClick={this.logout}><p>Logout</p></a>
                  </CardActions>
                </Card>
            )
        }
}

export default RecipieForm
