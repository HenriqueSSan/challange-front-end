import { addHours } from "date-fns"
import { cookiesIns } from "../infra/cookies"

export class CookieHelper {
  private static instance: CookieHelper
  private cookieIns = cookiesIns()
  private cookiesMapper = new Map()

  static handle() {
    if (!this.instance) this.instance = new CookieHelper()

    return this.instance
  }

  GET_AUTH_ACCESS() {
    const key = import.meta.env.VITE_PUBLIC_COOKIE_TOKEN_KEY

    const getCookieMapper = this.cookiesMapper.get(key)

    if (!getCookieMapper) {
      const cookie = this.cookieIns.get(key)

      this.cookiesMapper.set(key, cookie)

      return this.cookieIns.get(key)
    }

    return getCookieMapper
  }

  HAS_AUTH_ACCESS() {
    return !!this.GET_AUTH_ACCESS()
  }

  SET_AUTH_ACCESS(access_token: string) {
    this.cookiesMapper.set(import.meta.env.VITE_PUBLIC_COOKIE_TOKEN_KEY, access_token)

    return this.cookieIns.set(import.meta.env.VITE_PUBLIC_COOKIE_TOKEN_KEY, JSON.stringify(access_token), {
      sameSite: "strict",
      expires: addHours(new Date(), 2),
      secure: true,
      partitioned: true,
    })
  }
}
