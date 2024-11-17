import React from 'react';
import { Card, CardContent, Typography, Box, Button, Avatar, IconButton } from '@mui/material';
import StarIcon from '@mui/icons-material/StarBorder';
import StarFilledIcon from '@mui/icons-material/Star';
import './postmatch.css';
import Navbar from '../Navbar'; // Importando o componente Navbar

const FeedbackCard = ({ name }) => {
  const [rating, setRating] = React.useState(0);

  const handleRating = (value) => {
    setRating(value);
  };

  return (
    <Box id="feedback-card" display="flex" flexDirection="column" alignItems="center" p={2}>
      <Avatar id="avatar" sx={{ width: 60, height: 60, mb: 1 }} />
      <Typography id="name" variant="body1" mb={1}>{name}</Typography>
      <Box id="rating" display="flex">
        {[1, 2, 3, 4, 5].map((value) => (
          <IconButton key={value} id={`star-button-${value}`} onClick={() => handleRating(value)}>
            {value <= rating ? <StarFilledIcon id={`star-filled-${value}`} color="primary" /> : <StarIcon id={`star-empty-${value}`} />}
          </IconButton>
        ))}
      </Box>
      <Button id="report-button" variant="text" color="error" size="small">REPORTAR</Button>
    </Box>
  );
};

const FeedbackPage = () => {
  return (
    <>
    <nav>
      <Navbar id="navbar" />
    </nav>  
    <Card id="feedback-card-container" sx={{ maxWidth: "sm", mx: 'auto', mt: 5, p: 2, textAlign: 'center', boxShadow: 3 }}>
      <Typography id="card-title" variant="h6" gutterBottom>Como foi a partida?</Typography>
      <CardContent>
        <Box id="feedback-grid" display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
          <FeedbackCard id="feedback-1" name="Jurandir Cunha" />
          <FeedbackCard id="feedback-2" name="Jurandir Cunha" />
          <FeedbackCard id="feedback-3" name="Jurandir Cunha" />
          <FeedbackCard id="feedback-4" name="Jurandir Cunha" />
          <FeedbackCard id="feedback-5" name="Jurandir Cunha" />
          <FeedbackCard id="feedback-6" name="Jurandir Cunha" />
        </Box>
      </CardContent>
      <Button id="finalize-button" type="submit" 
              variant="contained" 
              color="primary"
              fullWidth 
              disableElevation sx={{ mt: 2 }}>Finalizar</Button>
    </Card>
    </>
  );
};

export default FeedbackPage;
