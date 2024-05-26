import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router';
import ApiService from '../../ApiService';
import AuthContext from '../../store/auth-context';
import Loading from '../basic/Loading';
import { Typography, Button, Box, Card, CardMedia } from '@mui/material';
import logincss from './css/login.module.css';
import lightLogo from '../../img/OtPishAI_light.png';
import GoogleIcon from '@mui/icons-material/Google';

const Login = () => {
  document.body.style.backgroundColor = '#f0f8f9';

  const navigate = useNavigate();
  const ctx = useContext(AuthContext);

  const [user, setUser] = useState({});
  const [idIsValid, setIdIsValid] = useState(true);
  const [pwIsValid, setPwIsValid] = useState(true);
  const [formIsValid, setFormIsValid] = useState(true);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    ctx.setCurrentPage('add-user');
  }, []);

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(idIsValid && pwIsValid);
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [idIsValid, pwIsValid]);

  const onChangeHandler = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };
  const validateIdHandler = () => {
    setIdIsValid(user.id !== '');
  };
  const validatePwHandler = () => {
    setPwIsValid(user.pw !== '');
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const idInputRef = useRef();
  const pwInputRef = useRef();

  const addUserHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    if (formIsValid) {
      const formData = new FormData();
      for (const key in user) {
        if (user[key] === '' && ['borrow1', 'borrow2', 'borrow3', 'donate'].includes(key)) {
          user[key] = 'X';
        }
        if (user[key] === '' && key === 'uid') {
          user[key] = '00 00 00 00';
        }
        if (user[key] !== undefined) {
          formData.append(key, user[key]);
        }
      }
      try {
        const response = await ApiService.addUser(formData);
        if (response.status < 200 || response.status > 299) {
          throw new Error('Something went wrong!');
        }
        navigate('/users');
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    } else if (!idIsValid) {
      idInputRef.current.focus();
    } else {
      pwInputRef.current.focus();
    }
  };

  let content = (
    <Box className={logincss.box}>
      <form className={logincss.form} onSubmit={addUserHandler}>
      <Card className={`${logincss.card} ${logincss.cardHeader}`}>
        <CardMedia
          className={logincss.logo}
          component="img"
          image={lightLogo}
          alt="OtpishAI Light Logo"
        />
      </Card>
      <Card className={`${logincss.card} ${logincss.cardHalf} ${logincss.cardLeft}`}>
        <Typography className={logincss.typo} variant="h4">
          로그인
        </Typography>
        <Box
          variant='outlined'
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
            Google 계정 사용
          </Typography>
        </Box>
      </Card>
        <Card className={`${logincss.card} ${logincss.cardHalf} ${logincss.cardRight}`}>
          <div>
            <Button
              className={logincss.signupBtn}
              variant="contained"
              component={Link}
              to={'../sign-up'}
              startIcon={<GoogleIcon />}
            >
              구글로 회원가입 / 로그인
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

  return (
    <>
      {content}
    </>
  );
};

export default Login;
