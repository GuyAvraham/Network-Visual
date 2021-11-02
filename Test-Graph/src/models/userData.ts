import { CorrectRouteDataT } from "./routesData";

export type userDataT = {
  username: string;
  merchant_status: string;
  blocked_by: string;
  merchant_reason: string;
  forter_status: string;
  forter_reason: string;
  connection_strength: string;
  link_type: string;
  had_chargeback: number;
  first_seen: number;
  ip: string;
  ip_country: string;
  browser: string;
  os: string;
  amount: number;
  order_count: number;
  is_buyer: number;
  is_seller: number;
  ccount_id: string;
  old_related_count: number;
  langs: string | number;
  js_block: number;
  id: string;
  label: string;
  group: number;
};

export type CorrectPointDataT = {
  id: string;
  forterStatus: string;
  neighbors?: CorrectPointDataT[];
  links?: CorrectRouteDataT[];
  isBuyer: boolean;
  isSeller: boolean;
  amount: number;
  merchantStatus: string;
};
