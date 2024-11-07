import { Wash, RemoveCircleOutline, Iron, DryCleaningOutlined } from '@mui/icons-material';

export const fabricInfo = {
  main: "메인 원단: 폴리에스터 63%, 레이온 34%, 스판덱스 3%",
  details: [
    "신축성 있는 소재로 편안한 착용감",
    "구김이 적고 관리가 용이함",
    "사계절 착용 가능한 적당한 두께감"
  ],
  care: [
    { icon: <Wash />, text: "찬물 또는 30도 이하 물에서 단독세탁" },
    { icon: <RemoveCircleOutline />, text: "표백제 사용 금지" },
    { icon: <Iron />, text: "낮은 온도에서 다림질" },
    { icon: <DryCleaningOutlined />, text: "드라이클리닝 권장" }
  ]
};