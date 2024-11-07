import React, { useState, useEffect, useRef } from 'react';
import {
  Container,
  Typography,
  Button,
  IconButton,
  Breadcrumbs,
  Link,
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
} from '@mui/material';
import {
  ExpandMore,
  Favorite,
  FavoriteBorder,
  Share,
  Star,
  StarBorder,
  ShoppingCartOutlined,
  ThumbUp,
  ThumbUpOutlined,
  VerifiedUser,
} from '@mui/icons-material';
import Header from '../../../layout/Header';
import styles from './css/ProductDetail.module.css';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <div className={styles.tabPanel}>
          <Typography>{children}</Typography>
        </div>
      )}
    </div>
  );
}

export default function ProductDetail() {
  const [selectedSize, setSelectedSize] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [expandedMaterial, setExpandedMaterial] = useState(true);
  const [expandedCare, setExpandedCare] = useState(false);
  const [images, setImages] = useState([]);
  const [rating, setRating] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const carouselRef = useRef(null);
  const mainImageRef = useRef(null);

  const dummyProduct = {
    name: '플리츠 스트레이트 팬츠',
    price: '59,000 원',
    colors: ['블랙', '화이트', '베이지'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: '하이웨이스트 팬츠. 와이드 레그. 앞면 플리츠 디테일. 옆면 포켓. 뒷면 파이핑 포켓. 앞면 지퍼, 내부 버튼 및 금속 후크 여밈.',
    details: ['겉감', '63% 폴리에스터 · 34% 비스코스 · 3% 엘라스탄'],
    care: ['최대 30°C에서 약하게 세탁하기', '염소 표백 불가', '최대 110°C에서 다림질하기', '드라이클리닝 불가', '건조기 사용 불가'],
    features: [
      '하이웨이스트 디자인',
      '와이드 레그 실루엣',
      '앞면 플리츠 디테일',
      '옆면 포켓',
      '뒷면 파이핑 포켓',
      '앞면 지퍼, 내부 버튼 및 금속 후크 여밈',
    ],
    sizeChart: [
      { size: 'XS', waist: '64cm', hip: '88cm', length: '100cm' },
      { size: 'S', waist: '68cm', hip: '92cm', length: '101cm' },
      { size: 'M', waist: '72cm', hip: '96cm', length: '102cm' },
      { size: 'L', waist: '76cm', hip: '100cm', length: '103cm' },
      { size: 'XL', waist: '80cm', hip: '104cm', length: '104cm' },
    ],
  };

  const reviews = {
    average: 4.8,
    total: 245,
    bestReviews: [
      {
        id: 1,
        user: '패션좋아',
        rating: 5,
        content: '허리가 너무 편하고 다리가 길어보여요! 오피스룩으로 딱이에요',
        images: ['https://picsum.photos/400/400?random=1', 'https://picsum.photos/400/400?random=2'],
        helpful: 42,
        verified: true,
        date: '2024.01.15',
        size: 'S',
        color: '블랙',
        height: '163cm',
      },
      {
        id: 2,
        user: '스타일리시',
        rating: 5,
        content: '핏이 너무 예쁘고 소재도 좋아요. 여름에도 입을 수 있을 것 같아요!',
        images: ['https://picsum.photos/400/400?random=3'],
        helpful: 38,
        verified: true,
        date: '2024.01.14',
        size: 'M',
        color: '베이지',
        height: '168cm',
      },
    ],
    reviews: [
      {
        id: 3,
        user: '데일리룩',
        rating: 4,
        content: '전체적으로 만족스러워요. 다만 생각보다 기장이 조금 긴 감이 있어요.',
        images: [],
        helpful: 15,
        verified: true,
        date: '2024.01.13',
        size: 'S',
        color: '블랙',
        height: '160cm',
      },
      {
        id: 4,
        user: '쇼핑러버',
        rating: 5,
        content: '일주일 정도 입어봤는데 정말 편하고 예뻐요! 블랙 색상이라 어디에나 잘 어울려요.',
        images: ['https://picsum.photos/400/400?random=4', 'https://picsum.photos/400/400?random=5', 'https://picsum.photos/400/400?random=6'],
        helpful: 27,
        verified: true,
        date: '2024.01.12',
        size: 'M',
        color: '블랙',
        height: '165cm',
      },
    ],
  };

  useEffect(() => {
    setImages(generateRandomImages(5));
  }, []);

  const generateRandomImages = (count) => {
    return Array.from({ length: count }, (_, i) => `https://picsum.photos/800/1200?random=${i}`);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleScroll = () => {
    if (mainImageRef.current) {
      const scrollPosition = mainImageRef.current.scrollTop;
      const imageHeight = mainImageRef.current.clientHeight;
      const newIndex = Math.round(scrollPosition / imageHeight);
      setCurrentImageIndex(newIndex);

      // 캐러셀 스크롤
      if (carouselRef.current) {
        const thumbnailWidth = carouselRef.current.children[0].offsetWidth;
        carouselRef.current.scrollTo({
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
    if (mainImageRef.current) {
      mainImageRef.current.scrollTo({
        top: index * mainImageRef.current.clientHeight,
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

  return (
    <Container className={styles.container}>
      <Header />

      <div className={styles.productGrid}>
        <div className={styles.imageCarousel}>
          <div ref={mainImageRef} className={styles.mainImage} onScroll={handleScroll}>
            {images.map((img, index) => (
              <div key={index} className={styles.imageWrapper}>
                <img src={img} alt={`${dummyProduct.name} - 이미지 ${index + 1}`} className={styles.image} />
              </div>
            ))}
          </div>
          <div ref={carouselRef} className={styles.thumbnails}>
            {images.map((img, index) => (
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
            {dummyProduct.name}
          </Typography>
          <Typography variant="h5" className={styles.productPrice}>
            {dummyProduct.price}
          </Typography>

          <Typography variant="subtitle1" className={styles.colorInfo}>
            색상: {dummyProduct.colors[0]}
          </Typography>

          <Typography variant="subtitle1" className={styles.sizeSelection}>
            사이즈 선택
          </Typography>
          <div>
            {dummyProduct.sizes.map((size) => (
              <Button
                key={size}
                variant={selectedSize === size ? 'contained' : 'outlined'}
                onClick={() => handleSizeSelect(size)}
                className={styles.sizeButton}
              >
                {size}
              </Button>
            ))}
          </div>

          <Button variant="contained" fullWidth startIcon={<ShoppingCartOutlined />} className={styles.addToCartButton}>
            장바구니 추가
          </Button>

          <Typography variant="body2" className={styles.shippingInfo}>
            배송 및 반품 무료
          </Typography>

          <div className={styles.ratingSection}>
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
          </div>

          <div className={styles.iconButtons}>
            <IconButton onClick={handleFavoriteClick}>{isFavorite ? <Favorite style={{ color: '#fd6155' }} /> : <FavoriteBorder />}</IconButton>
            <IconButton>
              <Share />
            </IconButton>
          </div>

          <Accordion expanded={expandedMaterial} onChange={handleMaterialAccordionChange} className={styles.accordion}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography>소재</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{dummyProduct.details.join('\n')}</Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion expanded={expandedCare} onChange={handleCareAccordionChange} className={styles.accordion}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography>관리</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ul>
                {dummyProduct.care.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>

      <div className={styles.tabsContainer}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="product info tabs">
          <Tab label="상세설명" />
          <Tab label="특징" />
          <Tab label="리뷰" />
        </Tabs>

        <TabPanel className={styles.description} value={tabValue} index={0}>
          <Typography paragraph>{dummyProduct.description}</Typography>
          <Typography paragraph>
            이 플리츠 스트레이트 팬츠는 현대적인 여성의 다양한 스타일링에 완벽하게 어울리는 제품입니다. 하이웨이스트 디자인과 와이드 레그 실루엣이
            길어 보이는 다리 라인을 연출해주며, 앞면의 플리츠 디테일이 세련된 분위기를 더해줍니다.
          </Typography>
          <Typography paragraph>
            옆면 포켓과 뒷면 파이핑 포켓이 실용성을 높여주며, 앞면 지퍼와 내부 버튼, 금속 후크 여밈으로 안정적인 착용감을 제공합니다. 다양한 톱과
            매치하여 오피스룩부터 캐주얼한 주말 스타일까지 폭넓게 활용할 수 있는 만능 아이템입니다.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            사이즈 정보
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="size chart">
              <TableHead>
                <TableRow>
                  <TableCell>사이즈</TableCell>
                  <TableCell align="right">허리둘레</TableCell>
                  <TableCell align="right">엉덩이둘레</TableCell>
                  <TableCell align="right">총장</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dummyProduct.sizeChart.map((row) => (
                  <TableRow key={row.size}>
                    <TableCell component="th" scope="row">
                      {row.size}
                    </TableCell>
                    <TableCell align="right">{row.waist}</TableCell>
                    <TableCell align="right">{row.hip}</TableCell>
                    <TableCell align="right">{row.length}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            사이즈 추천
          </Typography>
          <Typography paragraph>
            평소 착용하시는 바지 사이즈를 선택하시는 것이 좋습니다. 허리둘레가 64-68cm인 경우 XS, 68-72cm인 경우 S, 72-76cm인 경우 M을 추천드립니다.
            허리둘레가 76-80cm인 경우 L, 80cm 이상인 경우 XL을 선택하시면 됩니다.
          </Typography>
          <Typography paragraph>
            키가 160cm 미만이신 경우, 총장이 길 수 있으므로 S 사이즈 이하를 추천드립니다. 키가 170cm 이상이신 경우, M 사이즈 이상을 선택하시면 적당한
            길이감을 느끼실 수 있습니다.
          </Typography>
          <Typography paragraph>체형에 따라 사이즈 선택이 달라질 수 있으므로, 상세 사이즈표를 참고하여 선택하시는 것이 가장 정확합니다.</Typography>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" gutterBottom>
            제품 특징
          </Typography>
          <ul>
            {dummyProduct.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <div className={styles.reviewSection}>
            <div className={styles.reviewHeader}>
              <Typography variant="h5">리뷰 {reviews.total}</Typography>
              <div className={styles.averageRating}>{reviews.average}</div>
              <Rating value={reviews.average} precision={0.1} readOnly size="large" />
            </div>
          </div>

          <div className={styles.bestReviews}>
            <Typography variant="h6" gutterBottom>
              베스트 리뷰
            </Typography>
            {reviews.bestReviews.map((review) => (
              <div key={review.id} className={styles.reviewCard}>
                <div className={styles.reviewUser}>
                  <Avatar sx={{ width: 24, height: 24 }}>{review.user[0]}</Avatar>
                  <Typography variant="subtitle2">{review.user}</Typography>
                  {review.verified && <VerifiedUser sx={{ width: 16, height: 16, color: 'primary.main' }} />}
                </div>
                <Rating value={review.rating} size="small" readOnly />
                <Typography variant="body2" className={styles.reviewContent}>
                  {review.content}
                </Typography>
                {review.images.length > 0 && (
                  <div className={styles.reviewImages}>
                    {review.images.map((img, index) => (
                      <img key={index} src={img} alt={`리뷰 이미지 ${index + 1}`} className={styles.reviewImage} />
                    ))}
                  </div>
                )}
                <div className={styles.reviewMeta}>
                  <div>
                    <Chip size="small" label={`${review.size} 구매`} />
                    <Chip size="small" label={review.height} />
                  </div>
                  <div className={styles.helpfulButton}>
                    <ThumbUpOutlined sx={{ width: 16, height: 16 }} />
                    <Typography variant="caption">{review.helpful}</Typography>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.reviewPhotos}>
            <Typography variant="h6" gutterBottom>
              리뷰 사진
            </Typography>
            <div className={styles.photoGrid}>
              {reviews.reviews
                .filter((review) => review.images.length > 0)
                .flatMap((review) => review.images)
                .map((img, index) => (
                  <div key={index} className={styles.photoGridItem}>
                    <img src={img} alt={`리뷰 이미지 ${index + 1}`} className={styles.photoGridImage} />
                  </div>
                ))}
            </div>
          </div>

          <div>
            <Typography variant="h6" gutterBottom>
              전체 리뷰
            </Typography>
            {reviews.reviews.map((review) => (
              <div key={review.id} className={styles.reviewCard}>
                <div className={styles.reviewUser}>
                  <Avatar sx={{ width: 24, height: 24 }}>{review.user[0]}</Avatar>
                  <Typography variant="subtitle2">{review.user}</Typography>
                  {review.verified && <VerifiedUser sx={{ width: 16, height: 16, color: 'primary.main' }} />}
                  <Typography variant="caption" sx={{ ml: 'auto' }}>
                    {review.date}
                  </Typography>
                </div>
                <Rating value={review.rating} size="small" readOnly />
                <Typography variant="body2" className={styles.reviewContent}>
                  {review.content}
                </Typography>
                {review.images.length > 0 && (
                  <div className={styles.reviewImages}>
                    {review.images.map((img, index) => (
                      <img key={index} src={img} alt={`리뷰 이미지 ${index + 1}`} className={styles.reviewImage} />
                    ))}
                  </div>
                )}
                <div className={styles.reviewMeta}>
                  <div>
                    <Chip size="small" label={`${review.size} 구매`} />
                    <Chip size="small" label={review.height} />
                  </div>
                  <div className={styles.helpfulButton}>
                    <ThumbUpOutlined sx={{ width: 16, height: 16 }} />
                    <Typography variant="caption">{review.helpful}</Typography>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabPanel>
      </div>
    </Container>
  );
}
