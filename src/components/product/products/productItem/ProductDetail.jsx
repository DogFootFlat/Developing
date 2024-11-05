import { Compare, Favorite, ShoppingCart } from '@mui/icons-material';
import { Box, Button, Chip, Container, Grid, Rating, Tab, Tabs, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ApiService from '../../../../ApiService';
import Header from '../../../layout/Header';
import styles from './css/ProductDetail.module.css';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function ProductDetail() {
  const { productNum } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [tabValue, setTabValue] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [mainImage, setMainImage] = useState('');

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await ApiService.fetchProductByNum(productNum);
        const data = response.data;
        setProduct(data);
        setMainImage(data.productImg[0]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productNum]);

  const handleQuantityChange = (event) => {
    setQuantity(Math.max(1, parseInt(event.target.value)));
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleImageClick = (image) => {
    setMainImage(image);
  };

  if (loading) {
    return <Typography>로딩 중...</Typography>;
  }

  if (!product) {
    return <Typography>상품을 찾을 수 없습니다.</Typography>;
  }

  // Calculate the discount percentage
  const getDiscountPercentage = (originalPrice, discountedPrice) => {
    if (originalPrice > discountedPrice && discountedPrice !== 0) {
      return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
    }
    return 0; // No discount
  };
  const discountPercentage = getDiscountPercentage(product.oprice, product.rprice);

  return (
    <Container maxWidth="lg" className={styles.productDetail}>
      <Header />

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <div className={styles.imageContainer}>
            <img src={mainImage} alt={product.productName} className={styles.mainImage} />
          </div>
          {product.productImg.length > 1 && (
            <div className={styles.thumbnailContainer}>
              {product.productImg?.map((img, index) => (
                <div
                  key={index}
                  className={`${styles.thumbnail} ${img === mainImage ? styles.thumbnailActive : ''}`}
                  onClick={() => handleImageClick(img)}
                >
                  <img src={img} alt={`${product.productName} 뷰 ${index + 1}`} className={styles.thumbnailImage} />
                </div>
              ))}
            </div>
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          <div className={styles.productInfo}>
            <Typography variant="h4" component="h1" className={styles.productName}>
              {product.productName}
            </Typography>
            <Typography variant="subtitle1" className={styles.brandName}>
              브랜드: {product.productBrand}
            </Typography>
            <div className={styles.ratingContainer}>
              <Rating value={product.rating} precision={0.5} readOnly />
              <Typography variant="body2" className={styles.reviewCount}>
                (리뷰 {product.reviewCount}개)
              </Typography>
            </div>
            <div className={styles.price}>
              {product.rprice > 0 && product.rprice < product.oprice ? (
                <>
                  <span className={styles.originalPrice}>{product.oprice} 원</span>
                  <span className={styles.discountPrice}>할인가: {product.rprice} 원</span>
                  <span className={styles.discountPercentage}>(-{discountPercentage}%)</span>
                </>
              ) : (
                <span className={styles.discountPrice}>{product.oprice} 원</span>
              )}
            </div>
            <Typography variant="body1" className={styles.description}>
              {product.description}
            </Typography>

            <div className={styles.optionContainer}>
              <Typography variant="subtitle1" className={styles.optionTitle}>
                색상:
              </Typography>
              <div className={styles.optionChips}>
                {product.colors?.map((color) => (
                  <Chip
                    key={color}
                    label={color}
                    onClick={() => handleColorSelect(color)}
                    color={selectedColor === color ? 'primary' : 'default'}
                    className={styles.optionChip}
                  />
                ))}
              </div>
            </div>

            <div className={styles.optionContainer}>
              <Typography variant="subtitle1" className={styles.optionTitle}>
                사이즈:
              </Typography>
              <div className={styles.optionChips}>
                {product.sizes?.map((size) => (
                  <Chip
                    key={size}
                    label={size}
                    onClick={() => handleSizeSelect(size)}
                    color={selectedSize === size ? 'primary' : 'default'}
                    className={styles.optionChip}
                  />
                ))}
              </div>
            </div>

            <div className={styles.quantityContainer}>
              <TextField
                type="number"
                label="수량"
                value={quantity}
                onChange={handleQuantityChange}
                inputProps={{ min: 1 }}
                className={styles.quantityInput}
              />
              <Button variant="contained" startIcon={<ShoppingCart />} style={{ color: 'white' }} className={styles.addToCartButton}>
                CART
              </Button>
            </div>

            <div className={styles.actionButtons}>
              <Button startIcon={<Favorite />} variant="outlined" className={styles.wishlistButton}>
                찜하기
              </Button>
              <Button startIcon={<Compare />} variant="outlined" className={styles.compareButton}>
                비교
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>

      <div className={styles.tabContainer}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="상품 정보 탭">
          <Tab label="상세 설명" />
          <Tab label="특징" />
          <Tab label="리뷰" />
        </Tabs>
        <div className={styles.tabContent}>
          <TabPanel value={tabValue} index={0}>
            <Typography variant="body1">{product.description}</Typography>
            <h2>상세 정보</h2>
            <p>
              최고급 면소재를 사용하여 제작된 울트라 소프트 후드티는 편안함과 스타일을 동시에 제공합니다. 부드러운 촉감과 우수한 보온성으로 사계절
              내내 즐길 수 있습니다.
            </p>
            <ul>
              <li>재질: 100% 면</li>
              <li>세탁 방법: 30도 이하 물에서 중성세제로 단독 세탁</li>
              <li>제조국: 대한민국</li>
            </ul>
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <ul className={styles.featureList}>
              {product.features?.map((feature, index) => (
                <li key={index} className={styles.featureItem}>
                  {feature}
                </li>
              ))}
            </ul>
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            <h2>리뷰</h2>
            {product.reviews.length > 0 ? (
              product.reviews.map((review) => (
                <div key={review.reviewNum} className={styles.review}>
                  <h3>{review.reviewTitle}</h3>
                  <p>{review.reviewContent}</p>
                </div>
              ))
            ) : (
              <p>아직 작성된 리뷰가 없습니다.</p>
            )}
          </TabPanel>
        </div>
      </div>
    </Container>
  );
}
