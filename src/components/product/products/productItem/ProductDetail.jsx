import React, { useState, useEffect, useRef, useContext } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Rating,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Chip,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  ExpandMore,
  Favorite,
  FavoriteBorder,
  Share,
  Star,
  StarBorder,
  ShoppingCartOutlined,
  ThumbUpOutlined,
  VerifiedUser,
  Check,
  Wash,
  RemoveCircleOutline,
  Iron,
  DryCleaningOutlined,
} from '@mui/icons-material';
import { TabPanel } from '../../../layout';
import Header from '../../../layout/Header';
import styles from './css/ProductDetail.module.css';
import ApiService from '../../../../ApiService';
import CartContext from '../../../../store/cart-context';
import { care, colors, details, fabricInfo, features, reviews, sizeChart, sizeGuide, sizes } from './data';

export default function ProductDetail() {
  const { productNum } = useParams();

  const [cartIsShown, setCartIsShown] = useState(false);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [selectedSize, setSelectedSize] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [expandedMaterial, setExpandedMaterial] = useState(true);
  const [expandedCare, setExpandedCare] = useState(false);

  const [rating, setRating] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  const carouselRef = useRef(null);
  const thumbnailsRef = useRef(null);
  const cartCtx = useContext(CartContext);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await ApiService.fetchProductByNum(productNum);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product details:', error);
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productNum]);

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleScroll = (e) => {
    if (carouselRef.current) {
      const scrollPosition = e.target.scrollLeft;
      const imageWidth = carouselRef.current.clientWidth;
      const newIndex = Math.round(scrollPosition / imageWidth);
      setCurrentImageIndex(newIndex);

      if (thumbnailsRef.current) {
        const thumbnailWidth = thumbnailsRef.current.children[0].offsetWidth;
        thumbnailsRef.current.scrollTo({
          left: newIndex * thumbnailWidth,
          behavior: 'smooth',
        });
      }
    }
  };

  const handleMaterialAccordionChange = (event, isExpanded) => {
    setExpandedMaterial(isExpanded);
  };

  const handleCareAccordionChange = (event, isExpanded) => {
    setExpandedCare(isExpanded);
  };

  const scrollToImage = (index) => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: index * carouselRef.current.clientWidth,
        behavior: 'smooth',
      });
    }
  };

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const addToCartHandler = (amount) => {
    if (!selectedSize || !product) {
      alert('사이즈를 선택해주세요.');
      return;
    }
    cartCtx.addItem({
      id: product.productNum,
      name: product.productName,
      amount: amount,
      price: product.rprice > 0 ? product.rprice : product.oprice,
      size: selectedSize,
    });
  };

  if (loading) {
    return <Typography>로딩 중...</Typography>;
  }

  if (!product) {
    return <Typography>상품을 찾을 수 없습니다.</Typography>;
  }

  const discountPercentage = product.rprice > 0 ? Math.round(((product.oprice - product.rprice) / product.oprice) * 100) : 0;

  return (
    <>
      <Header cartIsShown={cartIsShown} setCartIsShown={setCartIsShown} onShowCart={showCartHandler} />
      <Container className={styles.container}>
        <div className={styles.productGrid}>
          <div className={styles.imageCarousel}>
            <div ref={carouselRef} className={styles.mainImage} onScroll={handleScroll}>
              {product.productImg.map((img, index) => (
                <div key={index} className={styles.imageWrapper}>
                  <img src={img} alt={`${product.productName} - 이미지 ${index + 1}`} className={styles.image} />
                </div>
              ))}
            </div>
            <div ref={thumbnailsRef} className={styles.thumbnails}>
              {product.productImg.map((img, index) => (
                <div
                  key={index}
                  onClick={() => scrollToImage(index)}
                  className={`${styles.thumbnail} ${currentImageIndex === index ? styles.thumbnailActive : ''}`}
                >
                  <img src={img} alt={`Thumbnail ${index + 1}`} className={styles.thumbnailImage} />
                </div>
              ))}
            </div>
          </div>

          <div className={styles.productInfo}>
            <Typography variant="h4" component="h1" className={styles.productName}>
              {product.productName}
            </Typography>
            <Box className={styles.priceSection}>
              {product.rprice > 0 ? (
                <>
                  <Typography variant="body2" className={styles.discountPercentage}>
                    {discountPercentage}% 할인
                  </Typography>
                  <Typography variant="h5" className={styles.salePrice}>
                    {product.rprice.toLocaleString()} 원
                  </Typography>
                  <Typography variant="body2" className={styles.originalPrice}>
                    {product.oprice.toLocaleString()} 원
                  </Typography>
                </>
              ) : (
                <Typography variant="h5" className={styles.salePrice}>
                  {product.oprice.toLocaleString()} 원
                </Typography>
              )}
            </Box>

            <Typography variant="subtitle1" className={styles.colorInfo}>
              색상: {colors?.[0]}
            </Typography>

            <Typography variant="subtitle1" className={styles.sizeSelection}>
              사이즈 선택
            </Typography>
            <Box>
              {sizes.map((size) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? 'contained' : 'outlined'}
                  onClick={() => handleSizeSelect(size)}
                  className={styles.sizeButton}
                >
                  {size}
                </Button>
              ))}
            </Box>
            <Button
              variant="contained"
              fullWidth
              startIcon={<ShoppingCartOutlined />}
              className={styles.addToCartButton}
              onClick={() => addToCartHandler(1)}
              disabled={!selectedSize}
            >
              장바구니 추가
            </Button>
            <Typography variant="body2" className={styles.shippingInfo}>
              배송 및 반품 무료
            </Typography>

            <Box className={styles.ratingSection}>
              <Typography variant="subtitle1" gutterBottom>
                상품 평가
              </Typography>
              <Rating
                name="product-rating"
                value={rating}
                precision={0.5}
                onChange={handleRatingChange}
                emptyIcon={<StarBorder style={{ opacity: 0.55 }} fontSize="inherit" />}
                icon={<Star fontSize="inherit" />}
              />
            </Box>

            <Box className={styles.iconButtons}>
              <IconButton onClick={handleFavoriteClick}>{isFavorite ? <Favorite style={{ color: '#fd6155' }} /> : <FavoriteBorder />}</IconButton>
              <IconButton>
                <Share />
              </IconButton>
            </Box>

            <Accordion expanded={expandedMaterial} onChange={handleMaterialAccordionChange} className={styles.accordion}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography>소재</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography component="div">{details?.join('\n')}</Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion expanded={expandedCare} onChange={handleCareAccordionChange} className={styles.accordion}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography>관리</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <ul>
                  {care?.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>

        <Box className={styles.tabsContainer}>
          <Tabs className={styles.tabs} value={tabValue} onChange={handleTabChange} aria-label="product info tabs">
            <Tab label="상세설명" />
            <Tab label="특징" />
            <Tab label="리뷰" />
          </Tabs>

          <TabPanel value={tabValue} index={0}>
            <Box className={styles.detailContent}>
              <Typography variant="h6" component="h2" gutterBottom>
                사이즈 측정 방법
              </Typography>

              <List>
                {sizeGuide?.measurements?.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={item.label} secondary={item.description} />
                  </ListItem>
                ))}
              </List>

              <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 4 }}>
                사이즈 정보
              </Typography>
              <TableContainer component={Paper}>
                <Table aria-label="size chart">
                  <TableHead>
                    <TableRow>
                      <TableCell>사이즈</TableCell>
                      <TableCell align="right">허리단면</TableCell>
                      <TableCell align="right">힙단면</TableCell>
                      <TableCell align="right">밑위</TableCell>
                      <TableCell align="right">허벅지단면</TableCell>
                      <TableCell align="right">총장</TableCell>
                      <TableCell align="right">밑단</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sizeChart?.map((row) => (
                      <TableRow key={row.size}>
                        <TableCell component="th" scope="row">
                          {row.size}
                        </TableCell>
                        <TableCell align="right">{row.waist}</TableCell>
                        <TableCell align="right">{row.hip}</TableCell>
                        <TableCell align="right">{row.rise}</TableCell>
                        <TableCell align="right">{row.thigh}</TableCell>
                        <TableCell align="right">{row.length}</TableCell>
                        <TableCell align="right">{row.legOpening}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 4 }}>
                원단 정보
              </Typography>
              <Typography variant="body1" component="div">
                {fabricInfo?.main}
              </Typography>
              <List>
                {fabricInfo?.details.map((detail, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <Check />
                    </ListItemIcon>
                    <ListItemText primary={detail} />
                  </ListItem>
                ))}
              </List>

              <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 4 }}>
                세탁 및 관리
              </Typography>
              <List>
                {fabricInfo?.care.map((instruction, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      {instruction.icon === 'Wash' && <Wash />}
                      {instruction.icon === 'RemoveCircleOutline' && <RemoveCircleOutline />}
                      {instruction.icon === 'Iron' && <Iron />}
                      {instruction.icon === 'DryCleaningOutlined' && <DryCleaningOutlined />}
                    </ListItemIcon>
                    <ListItemText primary={instruction.text} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Typography variant="h6" component="h2" gutterBottom>
              제품 특징
            </Typography>
            <ul>
              {features?.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <Box className={styles.reviewSection}>
              <Box className={styles.reviewHeader}>
                <Typography variant="h5" component="h2">
                  리뷰 {reviews?.reviews?.length}
                </Typography>
                <Box className={styles.averageRating}>{product.rating}</Box>
                <Rating value={product.rating} precision={0.1} readOnly size="large" />
              </Box>
            </Box>

            <Box className={styles.bestReviews}>
              <Typography variant="h6" component="h3" gutterBottom>
                베스트 리뷰
              </Typography>
              {reviews?.reviews?.slice(0, 3).map((review) => (
                <Box key={review.id} className={styles.reviewCard}>
                  <Box className={styles.reviewUser}>
                    <Avatar sx={{ width: 24, height: 24 }}>{review.user[0]}</Avatar>
                    <Typography variant="subtitle2">{review.user}</Typography>
                    {review.verified && <VerifiedUser sx={{ width: 16, height: 16, color: 'primary.main' }} />}
                  </Box>
                  <Rating value={review.rating} size="small" readOnly />
                  <Typography variant="body2" className={styles.reviewContent}>
                    {review.content}
                  </Typography>
                  {review.images && review.images.length > 0 && (
                    <Box className={styles.reviewImages}>
                      {review.images.map((img, index) => (
                        <img key={index} src={img} alt={`리뷰 이미지 ${index + 1}`} className={styles.reviewImage} />
                      ))}
                    </Box>
                  )}
                  <Box className={styles.reviewMeta}>
                    <Box>
                      <Chip size="small" label={`${review.size} 구매`} />
                      <Chip size="small" label={review.height} />
                    </Box>
                    <Box className={styles.helpfulButton}>
                      <ThumbUpOutlined sx={{ width: 16, height: 16 }} />
                      <Typography variant="caption">{review.helpful}</Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>

            <Box className={styles.reviewPhotos}>
              <Typography variant="h6" component="h3" gutterBottom>
                리뷰 사진
              </Typography>
              <Box className={styles.photoGrid}>
                {reviews?.reviews
                  .filter((review) => review.images && review.images.length > 0)
                  .flatMap((review) => review.images)
                  .map((img, index) => (
                    <Box key={index} className={styles.photoGridItem}>
                      <img src={img} alt={`리뷰 이미지 ${index + 1}`} className={styles.photoGridImage} />
                    </Box>
                  ))}
              </Box>
            </Box>

            <Box>
              <Typography variant="h6" component="h3" gutterBottom>
                전체 리뷰
              </Typography>
              {reviews?.reviews?.map((review) => (
                <Box key={review.id} className={styles.reviewCard}>
                  <Box className={styles.reviewUser}>
                    <Avatar sx={{ width: 24, height: 24 }}>{review.user[0]}</Avatar>
                    <Typography variant="subtitle2">{review.user}</Typography>
                    {review.verified && <VerifiedUser sx={{ width: 16, height: 16, color: 'primary.main' }} />}
                    <Typography variant="caption" sx={{ ml: 'auto' }}>
                      {review.date}
                    </Typography>
                  </Box>
                  <Rating value={review.rating} size="small" readOnly />
                  <Typography variant="body2" className={styles.reviewContent}>
                    {review.content}
                  </Typography>
                  {review.images && review.images.length > 0 && (
                    <Box className={styles.reviewImages}>
                      {review.images.map((img, index) => (
                        <img key={index} src={img} alt={`리뷰 이미지 ${index + 1}`} className={styles.reviewImage} />
                      ))}
                    </Box>
                  )}
                  <Box className={styles.reviewMeta}>
                    <Box>
                      <Chip size="small" label={`${review.size} 구매`} />
                      <Chip size="small" label={review.height} />
                    </Box>
                    <Box className={styles.helpfulButton}>
                      <ThumbUpOutlined sx={{ width: 16, height: 16 }} />
                      <Typography variant="caption">{review.helpful}</Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </TabPanel>
        </Box>
      </Container>
    </>
  );
}
