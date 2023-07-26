import React from 'react';
import { Grid, CardHeader, Card, Typography, CardContent, Avatar, Stack,
    List,ListItemText,ListItem,ListItemAvatar,ListSubheader } from '@mui/material';
import MopedIcon from '@mui/icons-material/Moped';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import DiningIcon from '@mui/icons-material/Dining';
import Header from './Header';

class Landing extends React.Component {
  render() {
    return (
      <>
      <Header/>
        <Grid container>
          <Grid item xs={7} sx={{ justifyContent: "flex-start", alignItems: "flex-start" }}>
            <Card sx={{ boxShadow: "none"}}>
              <CardHeader
              sx={{marginTop: "50px", marginLeft: "-150px" }}
                titleTypographyProps={{ variant: 'h3' }}
                title={"Fast Delivery & Easy Pickup"}
              />
               <Typography sx={{ marginLeft: "-520px" }} variant='h5'>Easy Order, easy life</Typography>
              <CardContent>
           
               
                <List  sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper',marginLeft:"40px",color:"blueviolet"}}>
                <ListItem alignItems="flex-start">
                
        <ListItemAvatar>
        <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTExtX_S0CfW0Ep0g61wRkQu1U6en-j4a6B7Q7bE-iB6WAaMQWvSfNjihSkatWNxVBw3y0&usqp=CAU" alt="Avatar" />
        </ListItemAvatar>
        <ListItemText
          primary="When you are too lazy to cook,We are just a click away"
        />
      </ListItem>
</List>
              </CardContent>
            </Card>

            <Typography variant='h5' color="primary" sx={{marginLeft:"-610px",marginTop:"50px"}}>ABOUT US</Typography>
                <List  sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper',marginLeft:"50px"}}>
            
      <ListItem alignItems="flex-start">
        
        <ListItemAvatar>
        <Avatar sx={{ backgroundColor: 'white', color: 'black' }}>
                     <MopedIcon />
                </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Fast Delivery"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
               We deliver food as soon as possible
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>

      <ListItem alignItems="flex-start">
        <ListItemAvatar>
        <Avatar sx={{ backgroundColor: 'white', color: 'black' }}>
                     <LocalMallIcon/>
                </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Pick Up"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
               PickUp Delivery, at your doorStep
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
        <Avatar sx={{ backgroundColor: 'white', color: 'black' }}>
                     <DiningIcon/>
                </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Dine in"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
               Enjoy your food fresh,
                     crispy and hot.
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
    </Grid>
          <Grid item xs={4}>
            <img
              height="650"
              width="640"
              src="https://i.pinimg.com/736x/e6/35/b1/e635b1c638fd374c38724735d1864597.jpg"
              alt="Background"
            />
          </Grid>
        </Grid>
      </>
    );
  }
}

export default Landing;
