import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


export default function RecipeCard(props) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  
  let authorLetter;
  let color;
  
  if (!props.recipie.author){
    authorLetter = " ";
  } else {
    authorLetter = props.recipie.author.substr(0,1).toUpperCase()
  }
 
 if (!props.recipie.color){
   color = "#" + Math.floor(Math.random()*16777215).toString(16);
 } else {
   color = props.recipie.color
 }
 
    return(   
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: color }} aria-label="recipe">
            {authorLetter}
          </Avatar>
        }
        title={props.recipie.name}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.recipie.prepTime}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.recipie.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
        <Typography paragraph>Ingredients:</Typography>
          <Typography paragraph>
            {props.recipie.ingredients}
          </Typography>
          <Typography paragraph>Instructions:</Typography>
          <Typography paragraph>
            {props.recipie.instructions}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
    )
  }