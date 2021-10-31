import * as users from "../data/users_profile.json";
import { userDataT } from "../models/userData";

const correctUserArray = (users as unknown as { default: userDataT[] }).default;

export const getCurrentUserData = (id: string | number | undefined) =>
  JSON.stringify(
    correctUserArray.find((item: userDataT) => item.username === id)!,
    null,
    2
  );
