$(".hero__main_block").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  });

  import { getTab,getdataContent } from "./data.js";



const tab = document.querySelector(".tab")
const box = document.querySelector(".box");
const btns = document.getElementsByClassName(".tab_button")


const renderContent = async (item) => {
    const data = await getdataContent(item) || []
  
    box.innerHTML = data.map((item) => `
      <li class="itemsss">
      <div class = "hover_top">
        <div class="item__imgg_block">
          <img class="item__imgg"  src="${item.image}" alt="">
        </div>
        <div class = "hover_btns_block">
          <div class = "hover_btn">
            <button>like</button>
            <button>buy</button>
          </div>
        </div>
      </div>
      
     
     

      <h2 class="item__tit">${item.title}</h2>
      <p class="item__pr">${item.price}</p>
      <p class="offer">Price in Offer: ${Math.round(item.price / 100 * 24)}</p>
       
       
        
       

        
      </li>
    `).join("")
  };
renderContent()


const tabRender = async () => {
    const data = await getTab()

    tab.innerHTML = data.map((item) => `
    <li>
    <button data-item="${item}" class="tab_button">${item}</button>
    </li>
   
    `).join("")
   

      renderContent(data[0]);
  }

   




tab.addEventListener("click", (e) => {
    if (e.target.dataset.item) {
      renderContent(e.target.dataset.item);
      for (let i of btns) {
      i.style.color = "";

    }
    e.target.style.color = "blue";
  }

});
  



tabRender()

