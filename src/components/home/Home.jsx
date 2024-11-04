import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, InputBase, Card, CardContent, CardMedia, Grid, Container, Box } from '@mui/material';
import { ShoppingCart, Search, Menu } from '@mui/icons-material';
import ApiService from '../../ApiService';
import closetImage from '../../assets/closet.jpg';
import styles from './css/home.module.css';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProductsHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await ApiService.fetchProducts();
      if (response.status < 200 || response.status >= 300) {
        throw new Error('상품을 불러오는 데 실패했습니다.');
      }
      const data = response.data?.content || [];

      const sortedProducts = data
        .filter((product) => product.judge !== 'NULL')
        .sort((a, b) => b.judge - a.judge)
        .slice(0, 4);

      setFeaturedProducts(sortedProducts.length > 0 ? sortedProducts : data.slice(0, 4));
    } catch (err) {
      setError(err.message || '상품을 불러오는 데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProductsHandler();
  }, [fetchProductsHandler]);

  return (
    <div className={styles.homeContainer}>
      <AppBar position="sticky" className={`${styles.header} ${styles.backdropBlur}`}>
        <Toolbar>
          <Typography variant="h6" component={Link} to="/" className={styles.logo}>
            Otfficial
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Button color="inherit" component={Link} to="/" className={styles.navLink}>
              홈
            </Button>
            <Button color="inherit" component={Link} to="/products" className={styles.navLink}>
              제품
            </Button>
            <Button color="inherit" component={Link} to="/about" className={styles.navLink}>
              소개
            </Button>
            <Button color="inherit" component={Link} to="/contact" className={styles.navLink}>
              문의
            </Button>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <InputBase placeholder="검색..." className={styles.searchInput} />
            <IconButton color="inherit" className={styles.iconButton}>
              <Search />
            </IconButton>
          </Box>
          <IconButton color="inherit" className={styles.iconButton}>
            <ShoppingCart />
          </IconButton>
          <IconButton color="inherit" sx={{ display: { md: 'none' } }} className={styles.iconButton}>
            <Menu />
          </IconButton>
        </Toolbar>
      </AppBar>

      <main>
        <Box className={styles.banner}>
          <Box className={styles.bannerOverlay} />
          <Box className={styles.bannerContent}>
            <Typography variant="h2" component="h1" className={styles.bannerTitle}>
              Otfficial에 오신 것을 환영합니다
            </Typography>
            <Typography variant="h5" component="p" sx={{ mb: 4 }}>
              최신 컬렉션을 만나보세요
            </Typography>
            <Button variant="contained" size="large" className={styles.bannerButton}>
              쇼핑하러 가기
            </Button>
          </Box>
        </Box>

        <Container maxWidth="lg" className={styles.featuredProducts}>
          <Typography variant="h3" component="h2" align="center" gutterBottom className={styles.sectionTitle}>
            추천 제품
          </Typography>
          {isLoading && <Typography>로딩 중...</Typography>}
          {error && <Typography color="error">{error}</Typography>}
          {!isLoading && !error && (
            <Grid container spacing={4}>
              {featuredProducts.map((product) => (
                <Grid item key={product.productCode} xs={12} sm={6} md={3}>
                  <Card className={styles.productCard}>
                    <div className={styles.productImageContainer}>
                      <CardMedia component="img" className={styles.productImage} image={product.productImg[0]} alt={product.productName} />
                    </div>
                    <CardContent className={styles.productContent}>
                      <Typography gutterBottom variant="h6" component="h4" className={styles.productName} color="text.secondary" paragraph>
                        {product.productName}
                      </Typography>
                      <div className={styles.productFooter}>
                        <div>
                          {product.rprice > 0 ? (
                            <>
                              <Typography variant="body2" color="text.secondary" className={styles.originalPrice}>
                                {product.oprice.toLocaleString()} 원
                              </Typography>
                              <Typography variant="body2" className={styles.discountRate}>
                                {Math.round(((product.oprice - product.rprice) / product.oprice) * 100)}% 할인
                              </Typography>
                              <Typography variant="h6" className={styles.productPrice}>
                                {product.rprice.toLocaleString()}원
                              </Typography>
                            </>
                          ) : (
                            <Typography variant="h6" className={styles.productPrice}>
                              {product.oprice.toLocaleString()}원
                            </Typography>
                          )}
                        </div>
                        <Button sx={{ width: '10px' }} variant="outlined" className={styles.addToCartButton}>
                          <ShoppingCart />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </main>

      <Box component="footer" className={styles.footer}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                회사 소개
              </Typography>
              <Typography variant="body2">Otfficial은 최신 패션 트렌드와 액세서리를 위한 원스톱 쇼핑몰입니다.</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                빠른 링크
              </Typography>
              <ul className={styles.footerLinks}>
                <li>
                  <Link to="/faq">자주 묻는 질문</Link>
                </li>
                <li>
                  <Link to="/shipping">배송 안내</Link>
                </li>
                <li>
                  <Link to="/returns">반품 정책</Link>
                </li>
                <li>
                  <Link to="/privacy">개인정보 처리방침</Link>
                </li>
              </ul>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                뉴스레터
              </Typography>
              <Typography variant="body2" paragraph>
                최신 업데이트와 특별 할인 정보를 받아보세요.
              </Typography>
              <form className={styles.newsletterForm}>
                <InputBase placeholder="이메일 주소" className={styles.newsletterInput} />
                <Button variant="contained" type="submit" className={styles.subscribeButton}>
                  구독하기
                </Button>
              </form>
            </Grid>
          </Grid>
          <Typography variant="body2" align="center" sx={{ mt: 4 }} className={styles.footerText}>
            © 2024 Otfficial. 모든 권리 보유.
          </Typography>
        </Container>
      </Box>
    </div>
  );
};

export default Home;
