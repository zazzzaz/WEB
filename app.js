const addBtn = document.getElementById("add-to-cart");
const cartMessage = document.getElementById("cart-message");

function getSelectedType() {
  return document.querySelector('input[name="type"]:checked')?.value;
}

function getSelectedSize() {
  return document.querySelector('input[name="size"]:checked')?.value;
}

function getSelectedToppings() {
  return [...document.querySelectorAll('input[name="topping"]:checked')].map(
    (el) => el.value
  );
}

function buildPizzaFromForm() {
  const typeKey = getSelectedType();
  const sizeKey = getSelectedSize();
  if (!typeKey || !sizeKey) return null;

  const pizza = new Pizza(typeKey);
  pizza.setSize(sizeKey);
  for (const key of getSelectedToppings()) {
    pizza.addTopping(key);
  }
  return pizza;
}

function getToppingPrice(key, sizeKey) {
  const t = TOPPINGS[key];
  return sizeKey === "large" ? t.largePrice : t.smallPrice;
}

function updateToppingPrices() {
  const sizeKey = getSelectedSize();
  if (!sizeKey) return;

  document.querySelectorAll(".topping-card__price[data-topping]").forEach((el) => {
    const key = el.dataset.topping;
    const price = getToppingPrice(key, sizeKey);
    el.textContent = `${price} ₽`;
  });
}

function updateCartButton() {
  const pizza = buildPizzaFromForm();
  if (!pizza) {
    addBtn.textContent = "Добавить в корзину";
    return;
  }

  const price = pizza.calculatePrice();
  const calories = pizza.calculateCalories();
  addBtn.textContent = `Добавить в корзину за ${price} ₽ (${calories} кКалл)`;
}

function initCalculator() {
  const root = document.querySelector(".calculator");

  root.addEventListener("change", () => {
    updateToppingPrices();
    updateCartButton();
    cartMessage.hidden = true;
  });

  addBtn.addEventListener("click", () => {
    const pizza = buildPizzaFromForm();
    if (!pizza) return;

    const toppings = pizza.getToppings();
    const toppingsText =
      toppings.length > 0 ? ` · ${toppings.join(", ")}` : "";

    cartMessage.textContent = `${pizza.name} (${SIZES[pizza.getSize()].label}) в корзине${toppingsText}`;
    cartMessage.hidden = false;
  });

  updateToppingPrices();
  updateCartButton();
}

initCalculator();
