$(".hero__main_block").slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
});

import { getTab, getdataContent, getdata } from "./data.js";

const tab = document.querySelector(".tab");
const box = document.querySelector(".box");
const like_btn = document.getElementsByClassName("like_btn");
const show = document.querySelector(".show__block");
const modalcon = document.querySelector(".modal_cont");
const close = document.querySelector(".close");
const showcon = document.querySelector(".show_cont");
const bag_modal = document.querySelector(".bag_modal");
const count = document.querySelector(".count");
const totalCount = document.querySelector(".totalCount");
const counterElement = document.querySelector(".counter");

const updateCounter = () => {
  const data = JSON.parse(localStorage.getItem("datas")) || [];
  const totalItems = data.reduce((sum, item) => sum + (item.count || 1), 0);
  if (count) {
    count.textContent = `Total items: ${totalItems}`;
  }
  if (counterElement) {
    counterElement.textContent = `${totalItems}`;
  }
};

const updateTotalPrice = () => {
  const data = JSON.parse(localStorage.getItem("datas")) || [];
  const totalPrice = data.reduce((sum, item) => sum + (item.price * (item.count || 1)), 0);
  if (totalCount) {
    totalCount.textContent = `Total price: ${totalPrice.toFixed(2)}`;
  }
};

const local = (item) => {
  const olddata = JSON.parse(localStorage.getItem("datas")) || [];
  const existingItem = olddata.find((dataItem) => dataItem.id == item.id);

  if (existingItem) {
    existingItem.count = (existingItem.count || 1) + 1;
  } else {
    item.count = 1;
    olddata.push(item);
  }

  localStorage.setItem("datas", JSON.stringify(olddata));
  updateCounter();
  updateTotalPrice();
};

const contRender = () => {
  const data = JSON.parse(localStorage.getItem("datas")) || [];

  showcon.innerHTML = data.map((item, index) => `
    <li class="itemsss">
      <div class="item__imgg_block">
        <img class="item__imgg" src="${item.image}" alt=""/>
      </div>
      <h2 class="item__tit">${item.title}</h2>
      <p class="item__pr">${item.price}</p>
      <p class="offer">Price in Offer: ${Math.round(item.price * 0.24)}</p>
      <button class="del_btn" data-index="${index}">delete</button>
      <p class="count">count: ${item.count}</p>
    </li>
  `).join("");
};

showcon.addEventListener("click", (e) => {
  if (e.target.classList.contains("del_btn")) {
    const index = e.target.dataset.index;
    const data = JSON.parse(localStorage.getItem("datas")) || [];
    data.splice(index, 1);
    localStorage.setItem("datas", JSON.stringify(data));
    contRender();
    updateCounter();
    updateTotalPrice();
  }
});

const renderContent = async (item) => {
  try {
    const data = await getdataContent(item);
    box.innerHTML = data.map((item) => `
      <li class="itemsss">
        <div class="hover_top">
          <div class="item__imgg_block">
            <img class="item__img" src="${item.image}" alt=""/>
          </div>
          <div class="hover_btns_block">
            <div class="hover_btn">
              <button class="like_btn"></button>
              <button class="bag_btn" data-id="${item.id}"></button>
            </div>
          </div>
        </div>
        <h2 class="item__tit">${item.title}</h2>
        <p class="item__pr">${item.price}</p>
        <p class="offer">Price in Offer: ${Math.round(item.price * 0.24)}</p>
      </li>
    `).join("");
  } catch (error) {
   
  }
};

const tabRender = async () => {
  try {
    const data = await getTab();
    tab.innerHTML = data.map((item) => `
      <li>
        <button class="tab_button" data-item="${item}">${item}</button>
      </li>
    `).join("");
    renderContent(data[0]);
  } catch (error) {
   
  }
};




tab.addEventListener("click", (e) => {
  if (e.target.dataset.item) {
    renderContent(e.target.dataset.item);
    const btns = document.querySelectorAll(".tab_button");
    btns.forEach(element => {
      element.style.color = "";
      element.style.borderBottom = "";
    });
    e.target.style.color = "#33a0ff";
    e.target.style.borderBottom = "4px solid #33a0ff";
  }
});

box.addEventListener("click", async (e) => {
  const item = e.target.closest('button')?.dataset.id;
  if (item) {
    const data = await getdata(item);
    local(data);
  }
});

tabRender();

bag_modal.addEventListener("click", () => {
  show.style.display = "block";
  contRender();
});

close.addEventListener("click", () => {
  show.style.display = "none";
});

document.addEventListener("DOMContentLoaded", () => {
  updateCounter();
  updateTotalPrice();
});
