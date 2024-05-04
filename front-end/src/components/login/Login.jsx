import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router';
import ApiService from '../../ApiService';
import AuthContext from '../../store/auth-context';
import Loading from '../basic/Loading';
import { IconButton, InputAdornment, TextField, Typography, Button, Box, Card, CardMedia } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import ausercss from './css/auser.module.css';
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
    <Box className={ausercss.box}>
      <form className={ausercss.form} onSubmit={addUserHandler}>
      <Card className={`${ausercss.card} ${ausercss.cardHeader}`}>
        <CardMedia
          className={ausercss.logo}
          component="img"
          image={lightLogo}
          alt="OtpishAI Light Logo"
        />
      </Card>
      <Card className={`${ausercss.card} ${ausercss.cardHalf} ${ausercss.cardLeft}`}>
        <Typography className={ausercss.typo} variant="h4">
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
          <Typography className={`${ausercss.typo} ${ausercss.primaryDarkerFont}`} variant="h6">
            Google 계정 사용
          </Typography>
        </Box>
      </Card>
        <Card className={`${ausercss.card} ${ausercss.cardHalf} ${ausercss.cardRight}`}>
          <div>
            <TextField
              autoFocus
              type="text"
              name="id"
              label="아이디"
              error={!idIsValid}
              helperText={idIsValid ? '' : '필수 작성란입니다.'}
              ref={idInputRef}
              sx={{ m: 1, width: '55ch' }}
              variant="outlined"
              value={user.id || ''}
              onChange={onChangeHandler}
              onBlur={validateIdHandler}
            />
          </div>
          <div>
            <TextField
              type={showPassword ? 'text' : 'password'}
              name="pw"
              label="비밀번호"
              error={!pwIsValid}
              helperText={pwIsValid ? '' : '필수 작성란입니다.'}
              ref={pwInputRef}
              sx={{ m: 1, width: '55ch' }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      className={ausercss.iconCell}
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              value={user.pw || ''}
              onChange={onChangeHandler}
              onBlur={validatePwHandler}
            />
          </div>
          <div className={ausercss.linkDiv}>
            <Link
              className={ausercss.primaryDarkerFont}
              to={'./sign-in'}
            >
              <div>아이디/비밀번호 찾기</div>
            </Link>
          </div>
        </Card>
        <Card className={`${ausercss.card} ${ausercss.cardFooter}`}>
          <Card className={`${ausercss.card} ${ausercss.cardHalf}`}>
          </Card>
          <Card className={`${ausercss.card} ${ausercss.cardHalf}`}>
            <Button
              className={ausercss.signupBtn}
              variant="contained"
              component={Link}
              to={'../sign-up'}
              startIcon={<GoogleIcon />}
            >
              구글로 회원가입 / 로그인
            </Button>
            <Button
              className={ausercss.addBtn}
              variant="contained"
              type="submit"
            >
              다음
            </Button>
          </Card>
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
