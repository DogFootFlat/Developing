export const PRODUCT_CATEGORY = {
  data: {
    content: [
      {
        productCode: '5006538447',
        productName: '네티 랩 썸머니트',
        productImg: ['https://image.msscdn.net/images/goods_img/20240509/4118941/4118941_17152412559989_125.jpg'],
        productInfo: null,
        category: ['nnn'],
        genreCode: '0010106',
        payment: 3,
        favorite: 0,
        review: 0,
        productRdate: '2024-06-01T02:08:00',
        isDeleted: 0,
        judge: 'NULL',
        productBrand: 'TWEE',
        productGender: 1,
        productRegistrant: 'NULL',
        productNum: 6,
        oprice: 29900,
        rprice: 0,
      },
    ],
    pageable: {
      pageNumber: 0,
      pageSize: 30,
      sort: { empty: false, sorted: true, unsorted: false },
      offset: 0,
      paged: true,
      unpaged: false,
    },
    last: true,
    totalElements: 1,
    totalPages: 1,
    size: 30,
    number: 0,
    sort: { empty: false, sorted: true, unsorted: false },
    first: true,
    numberOfElements: 1,
    empty: false,
  },
  status: 200,
  statusText: '',
  headers: {
    'cache-control': 'no-cache, no-store, max-age=0, must-revalidate',
    'content-type': 'application/json',
    expires: '0',
    pragma: 'no-cache',
  },
  config: {
    transitional: {
      silentJSONParsing: true,
      forcedJSONParsing: true,
      clarifyTimeoutError: false,
    },
    adapter: ['xhr', 'http'],
    transformRequest: [null],
    transformResponse: [null],
    timeout: 0,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxContentLength: -1,
    maxBodyLength: -1,
    env: {},
    headers: {
      Accept: 'application/json, text/plain, */*',
    },
    method: 'get',
    url: 'http://localhost:8080/product',
  },
  request: {},
};