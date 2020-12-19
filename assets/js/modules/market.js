export default class Market {
  constructor(wrapper, results, activeClass) {
    this.wrapper = document.querySelector(wrapper);
    this.results = document.querySelector(results);
    this.discount = document.querySelector('[data-discount]');

    this.wrapperArray = [...this.wrapper.children];
    this.activeClass = activeClass || 'active';
  }

  onStart(index = 0) {
    this.addActiveClass(index);
    this.insertHtml();
  }

  addActiveClass(index) {
    this.wrapperArray.forEach((item) =>
      item.classList.remove(this.activeClass),
    );

    this.wrapperArray[index].classList.add(this.activeClass);
    this.results.classList.add(this.activeClass);
  }

  getValue() {
    const itemActive = this.wrapper.querySelector('.active');

    if (itemActive) {
      let nameProduct = itemActive.querySelector('.card__title');
      let priceProduct = itemActive.querySelector('.card__price');

      const clearPrice = this.clearValue(priceProduct);
      const priceFormated = this.formatPrice(clearPrice);

      return {
        name: nameProduct.textContent,
        price: clearPrice,
        totalPrice: priceFormated.totalPrice,
        discount: priceFormated.discount,
      };
    }

    return;
  }

  insertHtml() {
    const { name, price, totalPrice, discount } = this.getValue();

    const priceCurrency = this.currencyFormat(price);
    const discountCurrency = this.currencyFormat(discount);
    const totalPriceCurrency = this.currencyFormat(totalPrice);

    const html = `
      <h1>${name}</h1>
      <p>Preço do produto: ${priceCurrency}</p>
      <p>Promoção leve 3 por: ${totalPriceCurrency}</p>
      <p>O 3º produto custa apenas ${discountCurrency}</p>
    `;

    this.results.innerHTML = html;
  }

  formatPrice(price) {
    const discount = this.discount.value !== '' ? this.discount.value : 50;

    const priceDiscount = Math.abs((discount / 100) * price - price);
    const totalPrice = price * 2 + priceDiscount;

    return { discount: priceDiscount, totalPrice };
  }

  currencyFormat(value) {
    return Number(value).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  clearValue(price) {
    const valuePrice = price.innerText;
    const clearValue = +valuePrice.replace('R$ ', '');

    return clearValue;
  }

  addListener() {
    this.wrapperArray.forEach((item, index) => {
      item.addEventListener('click', () => this.onStart(index));
    });
  }

  init() {
    if (this.wrapper) {
      this.getValue();
      this.addListener();
    }

    return this;
  }
}
