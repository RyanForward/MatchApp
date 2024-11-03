import React from 'react';
import { Card, CardContent, Typography, Box, Button, Avatar, IconButton } from '@mui/material';
import StarIcon from '@mui/icons-material/StarBorder';
import StarFilledIcon from '@mui/icons-material/Star';
import Navbar from '../Navbar'; // Importando o componente Navbar

const FeedbackCard = ({ name }) => {
  const [rating, setRating] = React.useState(0);

  const handleRating = (value) => {
    setRating(value);
  };

  return (
    
    <Box display="flex" flexDirection="column" alignItems="center" p={2}>
      <Avatar sx={{ width: 60, height: 60, mb: 1 }} />
      <Typography variant="body1" mb={1}>{name}</Typography>
      <Box display="flex">
        {[1, 2, 3, 4, 5].map((value) => (
          <IconButton key={value} onClick={() => handleRating(value)}>
            {value <= rating ? <StarFilledIcon color="primary" /> : <StarIcon />}
          </IconButton>
        ))}
      </Box>
      <Button variant="text" color="error" size="small">REPORTAR</Button>
    </Box>
  );
};

const FeedbackPage = () => {
  return (
    <>
    <nav>
      <Navbar />
    </nav>  
    <Card sx={{ maxWidth: 300, mx: 'auto', mt: 5, p: 2, textAlign: 'center', boxShadow: 3 }}>
      <Typography variant="h6" gutterBottom>Como foi a partida?</Typography>
      <CardContent>
        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
          <FeedbackCard name="Jurandir Cunha" />
          <FeedbackCard name="Jurandir Cunha" />
          <FeedbackCard name="Jurandir Cunha" />
          <FeedbackCard name="Jurandir Cunha" />
          <FeedbackCard name="Jurandir Cunha" />
          <FeedbackCard name="Jurandir Cunha" />
        </Box>
      </CardContent>
      <Button variant="contained" color="success" sx={{ mt: 2 }}>Finalizar</Button>
    </Card>
    </>
  );
};

export default FeedbackPage;
