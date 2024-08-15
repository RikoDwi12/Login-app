import { COOKIE_TOKEN } from "@modules/Auth/constants/cookies";
import { COOKIE_USER } from "@modules/User/constants/cookies";
import { IUser } from "@modules/User/types/User";
import { getCookie, deleteCookie, setCookie } from "cookies-next";
import dayjs from "dayjs";
import { atom, selector } from "recoil";

interface AuthStore {
  token: string | null;
  user: null | IUser;
}
const tokenStorage = getCookie(COOKIE_TOKEN);
const userStorage = getCookie(COOKIE_USER);

export const authStore = atom<AuthStore>({
  key: "auth",
  default: {
    token: null,
    user: null,
  },
  effects: [
    ({ setSelf }) => {
      if (tokenStorage && userStorage) {
        setSelf({
          token: tokenStorage.toString(),
          user: JSON.parse(userStorage.toString()),
        });
      }
    },
    ({ onSet }) => {
      onSet(newValue => {
        if (newValue.token === null || newValue.user === null) {
          deleteCookie(COOKIE_TOKEN);
          deleteCookie(COOKIE_USER);
        }
        if (newValue.token) {
          setCookie(COOKIE_TOKEN, newValue.token, {
            expires: dayjs().add(1, "year").toDate(),
          });
        }
        if (newValue.user) {
          setCookie(COOKIE_USER, newValue.user, {
            expires: dayjs().add(1, "year").toDate(),
          });
        }
      });
    },
  ],
});

export const isAuth = () =>
  selector({
    key: "isAuth",
    get({ get }) {
      const { token } = get(authStore);
      return token !== null;
    },
  });
