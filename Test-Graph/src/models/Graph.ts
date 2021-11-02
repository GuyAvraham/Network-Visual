export type GraphProps = {
  setCurrentUserData(data: string): void;
  setIsPopupShow(data: boolean): void;
  lineWidth: any;
  nodeSizeForBuyer: number;
  nodeSizeForSeller: number;
  nodeSizeForBuyerAndSeller: number;
  nodeSizeForOther: number;
  startFlickering?: boolean;
};
