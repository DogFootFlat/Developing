import GoogleIcon from '@mui/icons-material/Google';
import { Box, Button, Card, CardMedia, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import ApiService from '../../ApiService';
import NaverIcon from '../../assets/naver_icon/NaverIcon';
import lightLogo from '../../img/OtPishAI_light.png';
import AuthContext from '../../store/auth-context';
import Loading from '../basic/Loading';
import logincss from './css/login.module.css';

const Login = () => {
  document.body.style.backgroundColor = '#f0f8f9';

  const navigate = useNavigate();
  const ctx = useContext(AuthContext);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    ctx.setCurrentPage('add-user');
  }, []);

  const addUserHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const site_name = event.nativeEvent.submitter.name;
    try {
      const url = await ApiService.getSignInUrl(site_name);
      const response = await ApiService.signIn(url?.data);
      if (response.status < 200 || response.status > 299) {
        throw new Error('Something went wrong!');
      }
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  let content = (
    <Box className={logincss.box}>
      <form className={logincss.form} onSubmit={addUserHandler}>
        <Card className={`${logincss.card} ${logincss.cardHeader}`}>
          <CardMedia className={logincss.logo} component="img" image={lightLogo} alt="OtpishAI Light Logo" />
        </Card>
        <Card className={`${logincss.card} ${logincss.cardHalf} ${logincss.cardLeft}`}>
          <Typography className={logincss.typo} variant="h4">
            로그인
          </Typography>
          <Box
            variant="outlined"
            sx={{
              padding: '0 1em',
              width: 'fit-content',
              height: 'fit-content',
              borderColor: '#12b8de',
              border: 'none',
              borderLeft: '4px solid #12b9de6b',
            }}
          >
            <Typography className={`${logincss.typo} ${logincss.primaryDarkerFont}`} variant="h6">
              Google 또는 Naver 계정 사용
            </Typography>
          </Box>
        </Card>
        <Card className={`${logincss.card} ${logincss.cardHalf} ${logincss.cardRight}`}>
          <div>
            <Button
              className={`${logincss.signupBtn} ${logincss.googleBtn}`}
              variant="contained"
              component={Button}
              type="submit"
              name="google"
              startIcon={<GoogleIcon />}
            >
              구글로 회원가입 / 로그인
            </Button>
            <Button
              className={`${logincss.signupBtn} ${logincss.naverBtn}`}
              variant="contained"
              component={Button}
              type="submit"
              name="naver"
              startIcon={<NaverIcon />}
            >
              네이버로 회원가입 / 로그인
            </Button>
          </div>
        </Card>
      </form>
    </Box>
  );
  if (error) {
    content = (
      <div>
        <p>{error}</p>
      </div>
    );
  }
  if (isLoading) {
    content = <Loading />;
  }

  return <>{content}</>;
};

export default Login;
