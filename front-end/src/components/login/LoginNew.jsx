import React from "react";
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button } from "@mui/material";
import { Forum, Google } from "@mui/icons-material";
import logo from "../../assets//logo.jpg";

function LoginNew(){
  const theme = useTheme();

  return(
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: 'lightblue'
    }}>
      <Card sx={{ display: 'flex', width: '80%', borderRadius: 10 }}>
        <CardMedia
          component="img"
          sx={{ width: 350 }}
          image={logo}
          alt="OtpishAl Logo"
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: '1 0 auto' }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              로그인
            </Typography>
            <br/>
            <Button 
              variant="contained" 
              size="large" 
              startIcon={<Forum />} 
              sx={{ 
                width: '100%', 
                marginBottom: 1,
                bgcolor: '#FEE500', 
                color: '#3C1E1E',   
                '&:hover': {
                  bgcolor: '#FFCD00'
                }
              }}
            >
              카카오로 로그인
            </Button>
            <Button 
              variant="outlined" 
              size="large" 
              startIcon={<Google />} 
              sx={{ 
                width: '100%',
                borderColor: '#4285F4', 
                color: '#4285F4',       
                '&:hover': {
                  bgcolor: '#f1f3f4',   
                  borderColor: '#4285F4'
                }
              }}
            >
              구글로 로그인
            </Button>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
}

export default LoginNew;
