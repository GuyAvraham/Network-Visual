export type GraphProps = {
  setCurrentUserData(data: string): void;
  setIsPopupShow(data: boolean): void;
  lineWidth: number;
  lineColor: string;
  nodeSizeForBuyer: number;
  nodeSizeForSeller: number;
  nodeSizeForBuyerAndSeller: number;
  nodeSizeForOther: number;
  startFlickering?: boolean;
  shapeForBuyer: string;
  shapeForSeller: string;
  shapeForBuyerAndSeller: string;
  shapeForOther: string;
  colorForBuyer: string;
  colorForSeller: string;
  colorForBuyerAndSeller: string;
  colorForOther: string;
  isFocusOnNodeNeeded?: boolean;
  showAllLabels?: boolean;
  zoomLevel?: number
};
