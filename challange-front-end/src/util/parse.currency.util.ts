const currencyObject = (value?: number) => {
  const currency_format = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  })

  if ((typeof value === "undefined" || value === null) && value !== 0) {
    const currencyPart = currency_format.formatToParts(0)

    return {
      symbol: currencyPart.find((cr) => cr.type === "currency"),
      number: "--",
      decimal: "--",
      display: "R$ --",
    }
  }

  const currency = currency_format.format(value)
  const currencyPart = currency_format.formatToParts(value)

  // prettier-ignore
  return {
		symbol: currencyPart.find((cr) => cr.type === 'currency')?.value,
		number: currencyPart.reduce((prev, cr) => (cr.type === 'integer' ? (prev += cr.value) : prev),''),
		decimal: currencyPart.find((cr) => cr.type === 'fraction')?.value,
		display: currency
	};
}

export const toCurrency = (value?: string | number) => {
  if (typeof value === "string") {
    const onlyNumber = parseFloat(value)

    if (!isNaN(onlyNumber)) {
      return currencyObject(parseFloat(onlyNumber.toFixed(2)))
    }

    const stringOnlyNumber = parseFloat(
      value
        .replace(/[^\d,]/g, "")
        .replace(/\./g, "")
        .replace(",", "."),
    )

    if (!isNaN(stringOnlyNumber)) {
      return currencyObject(stringOnlyNumber)
    }

    return currencyObject(0)
  }

  if (typeof value === "number" && value !== 0) {
    return currencyObject(parseFloat(value.toFixed(2)))
  }

  return currencyObject(0)
}
