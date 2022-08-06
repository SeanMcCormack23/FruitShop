let shop = document.getElementById("shop");


let basket = JSON.parse(localStorage.getItem("data")) || [];

let startShop = () => {
  return (shop.innerHTML = fruitsForSale
    .map((x)=>{
      let {id,name} = x;
      let search = basket.find((x) => x.id === id) || [];
    return `
    <div id="fruit-id-${id}" class="fruit">
      <div class="info">
        <h3>${name}</h3>
      </div>
      <div class="amount">
        <button onclick="removeOne(${id})">-</button>
        <div id="${id}" class="quantity" id="quantity">
        ${search.item === undefined? 0 : search.item}
        </div>
        <button onclick="addOne(${id})">+</button>
      </div>
  </div>
    `
  }).join(""));
};
startShop();

//increment function
let addOne = (id) => {
let search = basket.find((x) => x.id === id);

if (search === undefined){
  basket.push({
    id: id,
    item: 1,
  });
} else {
  search.item += 1;
}
update(id);
localStorage.setItem("data", JSON.stringify(basket));
  // console.log(basket);
  
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

basket = basket.filter((x)=> x.item !== 0);

localStorage.setItem("data", JSON.stringify(basket));


};
 
let update = (id) => {
  let search = basket.find((x)=> x.id === id);
  document.getElementById(id).innerHTML = search.item;
  // console.log(search.item);
  sumFruits();
}

let sumFruits = () => {
  let cartAmount = document.getElementById("cartContents");
  cartAmount.innerHTML = (basket.map((x)=> x.item)
  .reduce((prev,next) => prev + next, 0));

}
sumFruits();

let removeAll = (id) => {
  
  // console.log(id);
  basket= basket.filter((x) => x.id !== id);
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));

}