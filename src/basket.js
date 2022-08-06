let label = document.getElementById("label");
let shoppingBasket = document.getElementById("shoppingBasket");

let basket = JSON.parse(localStorage.getItem("data")) || [];
console.log(basket);
let cartAmount = document.getElementById("cartContents");
let sumFruits = () => {
  
  cartAmount.innerHTML = basket.map((x) => x.item)
    .reduce((prev, next) => prev + next, 0);

}
sumFruits();

let generateCartItems = () => {
  if (basket.length !== 0) { //runs when localStorage has AT LEAST ONE item
    console.log("not empty");
    return shoppingBasket.innerHTML = basket.map((x) => {
      let = { id, item } = x;
      let search = fruitsForSale.find((y) => y.id === id) || [];
      return `
      <div class="basketItem" id="basketItem">
        <div class="details">
          <div class="name-delete">
          <h4>
            ${search.name}
            <i class="bi bi-x-lg"></i>
          </h4>
          </div>
        </div>
      </div>
  `
    }).join("");


  } else { //runs when localStorage is EMTPY
    console.log("empty");
    shoppingBasket.innerHTML = ``;
    label.innerHTML = `
    <h2>Basket is Empty</h2>
    <a href="index.html">
      <button class="home">Return Home</button>
    </a>
    `;
    // console.log("empty");

  }
};

generateCartItems();

//increment function
let addOne = (id) => {
  let search = basket.find((x) => x.id === id);

  if (search === undefined) {
    basket.push({
      id: id,
      item: 1,
    });
  } else {
    search.item += 1;
  }
  localStorage.setItem("data", JSON.stringify(basket));
  // console.log(basket);
  update(id);
}

//decrement function

let removeOne = (id) => {
  let search = basket.find((x) => x.id === id);
  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  update(id);

  basket = basket.filter((x) => x.item !== 0);

  localStorage.setItem("data", JSON.stringify(basket));

};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  // console.log(search.item);
  sumFruits();
}

let emptyCart = () => {
  basket = [];
  generateCartItems();
  // localStorage.setItem("data", JSON.stringify(basket));
  // localStorage.removeItem("data");
  cartAmount.innerHTML = 0;
  
};