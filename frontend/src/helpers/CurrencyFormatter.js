export function CurrencyFormatter(price) {
  return new Intl.NumberFormat('hu-HU', { maximumSignificantDigits: 5, style: 'currency', currency: 'HUF' }).format(price)
}