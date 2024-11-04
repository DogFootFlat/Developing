import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Snackbar,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './css/ProductPurchase.module.css';

const steps = ['상품 정보', '배송 정보', '결제'];

const ProductPurchase = () => {
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [formData, setFormData] = useState({
    quantity: 1,
    name: '',
    address: '',
    phone: '',
    paymentMethod: 'card',
  });

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      // 주문 완료 처리
      setSnackbarOpen(true);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setTimeout(() => {
      navigate('/products')
    }, 400)
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <div className={styles.stepContent}>
            <Typography variant="h6" gutterBottom>
              상품 정보
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <img src="https://image.msscdn.net/images/goods_img/20240509/4118941/4118941_17152412559989_125.jpg" alt="상품 이미지" className={styles.productImage} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6">프리미엄 울트라 소프트 후드티</Typography>
                <Typography variant="body1" color="textSecondary">
                  가격: 71,200원
                </Typography>
                <TextField
                  name="quantity"
                  label="수량"
                  type="number"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  InputProps={{ inputProps: { min: 1 } }}
                  fullWidth
                  margin="normal"
                />
              </Grid>
            </Grid>
          </div>
        );
      case 1:
        return (
          <div className={styles.stepContent}>
            <Typography variant="h6" gutterBottom>
              배송 정보
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  name="name"
                  label="이름"
                  fullWidth
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  name="address"
                  label="주소"
                  fullWidth
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  name="phone"
                  label="전화번호"
                  fullWidth
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
          </div>
        );
      case 2:
        return (
          <div className={styles.stepContent}>
            <Typography variant="h6" gutterBottom>
              결제 정보
            </Typography>
            <FormControl component="fieldset">
              <FormLabel component="legend">결제 방법</FormLabel>
              <RadioGroup
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleInputChange}
              >
                <FormControlLabel value="card" control={<Radio />} label="신용카드" />
                <FormControlLabel value="bank" control={<Radio />} label="계좌이체" />
                <FormControlLabel value="mobile" control={<Radio />} label="휴대폰 결제" />
              </RadioGroup>
            </FormControl>
            <Typography variant="h6" className={styles.totalPrice}>
              총 결제 금액: {(71200 * formData.quantity).toLocaleString()}원
            </Typography>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md" className={styles.container}>
      <Paper elevation={3} className={styles.paper}>
        <Typography variant="h4" align="center" gutterBottom>
          상품 구매
        </Typography>
        <Stepper activeStep={activeStep} className={styles.stepper}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {renderStepContent(activeStep)}
        <div className={styles.buttons}>
          {activeStep !== 0 && (
            <Button onClick={handleBack} className={styles.button}>
              이전
            </Button>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            className={styles.button}
          >
            {activeStep === steps.length - 1 ? '주문 완료' : '다음'}
          </Button>
        </div>
      </Paper>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message="주문이 완료되었습니다. 감사합니다!"
      />
    </Container>
  );
};

export default ProductPurchase;