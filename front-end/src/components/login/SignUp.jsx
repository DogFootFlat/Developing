import React from "react";
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import logo from "../../assets/logo.jpg";
import naverButton from "../../assets/naver_button.png";
import googleButton from "../../assets/google_button.png";

function SignUp() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/sign-in");
  };

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: 'lightpink'
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
            <Typography variant="h5" gutterBottom style={{ marginBottom: '20px', fontWeight: 'bold' }}>
              회원가입
            </Typography>
            <div style={{ cursor: 'pointer', display: 'flex', border: '1px solid #ccc', borderRadius: '5px', marginBottom: '10px', alignItems: 'center', padding: '7px' }} onClick={handleLoginClick} >
              <img src={naverButton} alt="네이버로 회원가입" style={{ width: '45px', height: '45px', objectFit: 'contain', marginRight: '10px' }} />
              <span style={{ flex: 1, textAlign: 'center', fontSize: '16px', lineHeight: '45px' }}>네이버로 회원가입</span>
            </div>
            <div style={{ cursor: 'pointer', display: 'flex', border: '1px solid #ccc', borderRadius: '5px', marginBottom: '10px', alignItems: 'center', padding: '7px' }} onClick={handleLoginClick} >
              <img src={googleButton} alt="구글로 회원가입" style={{ width: '45px', height: '45px', objectFit: 'contain', marginRight: '10px' }} />
              <span style={{ flex: 1, textAlign: 'center', fontSize: '16px', lineHeight: '45px' }}>구글로 회원가입</span>
            </div>
            <p style={{ color: 'gray', marginTop: '10px' }}>이미 계정이 있으신가요? <span onClick={handleLoginClick} style={{ cursor: 'pointer', fontWeight: 'bold' }}>로그인</span></p>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
}

export default SignUp;