import { format } from "date-fns"

import { ptBR } from "date-fns/locale/pt-BR"
import { toCurrency } from "../util/parse.currency.util"

export class FormatHelper {
  constructor() {}

  static toCurrency(value?: string | number) {
    return toCurrency(value)
  }

  static toDate(date: Date | string, formatStr?: string): string {
    const dt = new Date(date)
    const dtDateOnly = new Date(dt.valueOf() + dt.getTimezoneOffset() * 60 * 1000)
    return format(dtDateOnly, formatStr || "Pp", { locale: ptBR })
  }
}
