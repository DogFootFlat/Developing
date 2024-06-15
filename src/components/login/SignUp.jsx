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
    age: 0,
    addr: '',
    birth: '',
    email: '',
    gender: 0,
    name: '',
    nickname: '',
    preferGenre: '',
    profile_img: '',
    phone: '',
    role: '',
    username: '',
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
    getUserHandler();

    const identifier = setTimeout(() => {
      setFormIsValid(ageIsEntered && ageIsValid && phoneIsEntered && genderIsEntered);
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [ageIsEntered, ageIsValid, phoneIsEntered, genderIsEntered]);

  const onChangeHandler = (event) => {
    setUser({
      ...user,
      [event.target.name]: ['age', 'gender'].includes(event.target.name) ? parseInt(event.target.value) : event.target.value,
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

  const getUserHandler = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await ApiService.fetchUsers();
      const responseData = response?.data;
      setUser({
        email: responseData?.email,
        username: responseData?.username,
        name: responseData?.name,
        nickname: responseData?.nickname,
        addr: responseData?.addr,
        birth: responseData?.birth,
        phone: responseData?.phone,
        age: parseInt(responseData?.age),
        profile_img: responseData?.profile_img,
        gender: parseInt(responseData?.gender),
        preferGenre: responseData?.preferGenre,
        role: responseData?.role,
      })

      if (response.status < 200 || response.status > 299) {
        throw new Error('Something went wrong!');
      }
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  const addUserHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    if (formIsValid) {
      try {
        setUser({
          email: user?.email,
          username: user?.username,
          name: user?.name,
          nickname: user?.nickname,
          addr: user?.addr,
          birth: user?.birth,
          phone: user?.phone,
          age: parseInt(user?.age),
          profile_img: user?.profile_img,
          gender: parseInt(user?.gender),
          preferGenre: user?.preferGenre,
          role: user?.role,
        })
        const response = await ApiService.addUser(user);
        if (response.status < 200 || response.status > 299) {
          throw new Error('Something went wrong!');
        }
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
              {ctx.loginMethod} 계정 사용
            </Typography>
          </Box>
        </Card>
        <Card className={`${ausercss.card} ${ausercss.cardHalf} ${ausercss.cardRight}`}>
          <TextField
            type="hidden"
            name="addr"
            label="주소"
            value={user.addr || ''}
          />
          <TextField
            type="hidden"
            name="birth"
            label="생년월일"
            value={user.birth || ''}
          />
          <TextField
            type="hidden"
            name="email"
            label="이메일"
            value={user.email || ''}
          />
          <TextField
            type="hidden"
            name="name"
            label="이름"
            value={user.name || ''}
          />
          <TextField
            type="hidden"
            name="nickname"
            label="닉네임"
            value={user.nickname || ''}
          />
          <TextField
            type="hidden"
            name="preferGenre"
            label="선호장르"
            value={user.preferGenre || ''}
          />
          <TextField
            type="hidden"
            name="profile_img"
            label="프로필이미지"
            value={user.profile_img || ''}
          />
          <TextField
            type="hidden"
            name="role"
            label="역할"
            value={user.role || ''}
          />
          <TextField
            type="hidden"
            name="username"
            label="유저명"
            value={user.username || ''}
          />
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
                value={user.gender || 0}
                onChange={onChangeHandler}
                onBlur={validateGenderHandler}
              >
                <FormControlLabel
                  value={3}
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
                  value={2}
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
                  value={1}
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
