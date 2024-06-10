import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router';
import ApiService from '../../ApiService';
import AuthContext from '../../store/auth-context';
import Loading from '../basic/Loading';
import { TextField, Typography, Button, Box, Card, CardMedia, FormControl, RadioGroup, FormControlLabel, FormLabel, Radio } from '@mui/material';
import ausercss from './css/auser.module.css';
import lightLogo from '../../img/OtPishAI_light.png';

const SignUp = () => {
  document.body.style.backgroundColor = '#f0f8f9';

  const navigate = useNavigate();
  const ctx = useContext(AuthContext);

  const [user, setUser] = useState({
    age: '',
    phone: '',
    gender: '',
  });

  const [ageIsEntered, setAgeIsEntered] = useState(true);
  const [ageIsValid, setAgeIsValid] = useState(true);
  const [ageHelperText, setAgeHelperText] = useState('');

  const [phoneIsEntered, setPhoneIsEntered] = useState(true);
  const [phoneIsValid, setPhoneIsValid] = useState(true);
  const [phoneHelperText, setPhoneHelperText] = useState('');

  const [genderIsEntered, setGenderIsEntered] = useState(true);

  const [formIsValid, setFormIsValid] = useState(true);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    ctx.setCurrentPage('add-user');
  }, []);

  useEffect(() => {
    const user = getUserHandler();

    const identifier = setTimeout(() => {
      setFormIsValid(ageIsEntered && ageIsValid && phoneIsEntered && genderIsEntered);
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [ageIsEntered, ageIsValid, phoneIsEntered, genderIsEntered]);

  const getUserHandler = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await ApiService.fetchUsers();
      console.log(response.data);

      await ApiService.signIn(url?.data);
      if (response.status < 200 || response.status > 299) {
        throw new Error('Something went wrong!');
      }
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  const onChangeHandler = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const validateAgeHandler = () => {
    setAgeIsEntered(user.age !== undefined);
    setAgeIsValid(user.age < 200);
    setAgeHelperText(user.age !== undefined ? (user.age < 150 ? '' : '유효하지 않은 나이입니다.') : '필수 작성란입니다.');
  };

  const validatePhoneHandler = () => {
    const phoneRule = /^(010)[0-9]{3,4}[0-9]{4}$/;
    user.phone = [undefined, ''].includes(user.phone) ? '' : user.phone.replace(/[^0-9]/g, '');
    const isHp = phoneRule.test(user.phone);

    setPhoneIsEntered(user.phone !== '');
    setPhoneIsValid(isHp);
    setPhoneHelperText(user.phone !== undefined ? (isHp ? '' : '유효하지 않은 핸드폰번호입니다.') : '필수 작성란입니다.');
    user.phone = [undefined, ''].includes(user.phone) ? '' : user.phone.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
  };

  const validateGenderHandler = () => {
    setGenderIsEntered(user.gender !== undefined);
  };

  const ageInputRef = useRef();
  const phoneInputRef = useRef();

  const addUserHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    if (formIsValid) {
      const formData = new FormData();
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
    }

    if (!ageIsEntered) {
      ageInputRef.current.focus();
    } else if (!phoneIsEntered) {
      phoneInputRef.current.focus();
    }
  };

  let content = (
    <Box className={ausercss.box}>
      <form className={ausercss.form} onSubmit={addUserHandler}>
        <Card className={`${ausercss.card} ${ausercss.cardHeader}`}>
          <CardMedia className={ausercss.logo} component="img" image={lightLogo} alt="OtpishAI Light Logo" />
        </Card>
        <Card className={`${ausercss.card} ${ausercss.cardHalf} ${ausercss.cardLeft}`}>
          <Typography className={ausercss.typo} variant="h4">
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
            <Typography className={`${ausercss.typo} ${ausercss.primaryDarkerFont}`} variant="h6">
              Google 계정 사용
            </Typography>
          </Box>
        </Card>
        <Card className={`${ausercss.card} ${ausercss.cardHalf} ${ausercss.cardRight}`}>
          <div>
            <TextField
              autoFocus
              type="number"
              name="age"
              label="나이"
              error={!ageIsEntered || !ageIsValid}
              helperText={ageHelperText}
              ref={ageInputRef}
              sx={{ m: 1, width: '55ch' }}
              variant="outlined"
              value={user.age || ''}
              onChange={onChangeHandler}
              onBlur={validateAgeHandler}
            />
          </div>
          <div>
            <TextField
              type="text"
              name="phone"
              label="핸드폰번호"
              error={!phoneIsEntered || !phoneIsValid}
              helperText={phoneHelperText}
              ref={phoneInputRef}
              sx={{ m: 1, width: '55ch' }}
              variant="outlined"
              value={user.phone || ''}
              onChange={onChangeHandler}
              onBlur={validatePhoneHandler}
            />
          </div>
          <div>
            <FormControl className={ausercss.radioForm}>
              <FormLabel
                id="gender"
                className={ausercss.radioLabel}
              >
                성별
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="gender"
                name="gender"
                value={user.gender || ''}
                onChange={onChangeHandler}
                onBlur={validateGenderHandler}
              >
                <FormControlLabel
                  value="male"
                  label="남자"
                  control={
                    <Radio
                      sx={{
                        color: '#767676',
                        '&.Mui-checked': {
                          color: '#12b8de',
                        },
                      }}
                    />
                  }
                />
                <FormControlLabel
                  value="female"
                  label="여자"
                  control={
                    <Radio
                      sx={{
                        color: '#767676',
                        '&.Mui-checked': {
                          color: '#12b8de',
                        },
                      }}
                    />
                  }
                />
                <FormControlLabel
                  value="other"
                  label="기타"
                  control={
                    <Radio
                      sx={{
                        color: '#767676',
                        '&.Mui-checked': {
                          color: '#12b8de',
                        },
                      }}
                    />
                  }
                />
              </RadioGroup>
            </FormControl>
          </div>
        </Card>
        <Card className={`${ausercss.card} ${ausercss.cardFooter}`}>
          <Card className={`${ausercss.card} ${ausercss.cardHalf}`}></Card>
          <Card className={`${ausercss.card} ${ausercss.cardHalf}`}>
            <Button className={ausercss.addBtn} variant="contained" type="submit">
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

  return <>{content}</>;
};

export default SignUp;
