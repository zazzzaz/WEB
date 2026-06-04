const PIZZA_TYPES = {
  margherita: { name: "Маргарита", price: 500, calories: 300 },
  pepperoni:  { name: "Пепперони",  price: 800, calories: 400 },
  bavarian:   { name: "Баварская",  price: 700, calories: 450 },
};

const SIZES = {
  large: { label: "Большая",  price: 200, calories: 200 },
  small: { label: "Маленькая", price: 100, calories: 100 },
};

const TOPPINGS = {
  mozzarella: {
    name: "Сливочная моцарелла",
    smallPrice: 50,  smallCalories: 20,
    largePrice: 50,  largeCalories: 20,
  },
  cheeseBoard: {
    name: "Сырный борт",
    smallPrice: 150, smallCalories: 50,
    largePrice: 300, largeCalories: 50,
  },
  cheddarParmesan: {
    name: "Чедер и пармезан",
    smallPrice: 150, smallCalories: 50,
    largePrice: 300, largeCalories: 50,
  },
};

class Pizza {
  constructor(typeKey) {
    const base = PIZZA_TYPES[typeKey];
    if (!base) throw new Error("Неизвестный вид пиццы");
    
    this.name = base.name;
    this.basePrice = base.price;
    this.baseCalories = base.calories;
    this.size = null;
    this.toppings = [];
  }

  setSize(sizeKey) {
    if (!SIZES[sizeKey]) throw new Error("Неверный размер (large/small)");
    this.size = sizeKey;
  }

  getSize() {
    return this.size;
  }

  addTopping(toppingKey) {
    if (!TOPPINGS[toppingKey]) throw new Error("Неизвестная добавка");
    if (!this.toppings.includes(toppingKey)) {
      this.toppings.push(toppingKey);
    }
  }

  removeTopping(toppingKey) {
    const idx = this.toppings.indexOf(toppingKey);
    if (idx !== -1) this.toppings.splice(idx, 1);
  }

  getToppings() {
    return this.toppings.map(key => TOPPINGS[key].name);
  }

  calculatePrice() {
    if (!this.size) throw new Error("Не выбран размер");

    let total = this.basePrice;
    total += SIZES[this.size].price;

    for (const key of this.toppings) {
      const t = TOPPINGS[key];
      total += this.size === "large" ? t.largePrice : t.smallPrice;
    }
    return total;
  }

  calculateCalories() {
    if (!this.size) throw new Error("Не выбран размер");

    let total = this.baseCalories;
    total += SIZES[this.size].calories;

    for (const key of this.toppings) {
      const t = TOPPINGS[key];
      total += this.size === "large" ? t.largeCalories : t.smallCalories;
    }
    return total;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { Pizza, PIZZA_TYPES, SIZES, TOPPINGS };
}
