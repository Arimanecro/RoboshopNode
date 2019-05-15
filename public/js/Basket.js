class Basket
{
    static addBasket()
    {
        let addBasket = document.querySelectorAll('input[name=add_basket]');
        if(addBasket)
        {
            [...addBasket].forEach(el => {
                el.addEventListener('click', (e) => {
                    
                    e.preventDefault();
                    let parent = el.parentElement.querySelector('input[name=id]') ?
                    el.parentElement : el.parentElement.parentElement;

                    let childrens = {
                        'id':parent.querySelector('input[name=id]').value,
                        'title':parent.querySelector('input[name=title]').value,
                        'price':parent.querySelector('input[name=price]').value,
                        'img': parent.querySelector('input[name=img]').value,
                        'url': parent.querySelector('input[name=url]').value,
                        'qty': parent.querySelector('input[name=qty]') ?
                               parent.querySelector('input[name=qty]').value :
                               document.querySelector('input[name=qty]').value
                    }
                    const arr = {};
                    const { id, price, title, img_small, url, qty } = childrens;
                    const item = { price, title, url, img_small, qty };
                    arr[id] = { ...item };
                
                    if (!localStorage.getItem("basket")) {
                      localStorage.setItem("basket", JSON.stringify(arr));
                    } else {
                        let parse = JSON.parse(localStorage.getItem("basket"));
                        delete parse[id];
                        localStorage.setItem("basket", JSON.stringify({ ...arr, ...parse }));
                };
            });
        });
    }
}

    static addWishList()
    {
        let addBasket = document.querySelectorAll('input[name=add_wish]');
        if(addBasket)
        {
            [...addBasket].forEach(el => {
                el.addEventListener('click', (e) => {
                    e.preventDefault();
                    let parent = el.parentElement.querySelector('input[name=id]') ?
                    el.parentElement : el.parentElement.parentElement;
                    let childrens = {
                        'id':parent.querySelector('input[name=id]').value,
                        'title':parent.querySelector('input[name=title]').value,
                        'price':parent.querySelector('input[name=price]').value,
                        'img': parent.querySelector('input[name=img]').value,
                        'url': parent.querySelector('input[name=url]').value,
                        'qty': parent.querySelector('input[name=qty]') ?
                        parent.querySelector('input[name=qty]').value :
                        document.querySelector('input[name=qty]').value
                    }
                    const arr = {};
                    const { id, price, title, img_small, url, qty } = childrens;
                    const item = { price, title, url, img_small, qty };
                    arr[id] = { ...item };
                
                    if (!localStorage.getItem("wishlist")) {
                    localStorage.setItem("wishlist", JSON.stringify(arr));
                    } else {
                        let parse = JSON.parse(localStorage.getItem("wishlist"));
                        delete parse[id];
                        localStorage.setItem("wishlist", JSON.stringify({ ...arr, ...parse }));
                };
            });
        });
    }
    }

    static countBasket()
    {
        let count = localStorage.getItem("basket") ? Object.keys(JSON.parse(localStorage.getItem("basket"))).length : 0;
        document.querySelector('.nav_up > ul li:nth-child(3) > a > span ~ span').textContent=count;
        document.querySelector('.mobile_nav > ul li:nth-child(3) > a > span ~ span').textContent=count;
    }

    static countWishList()
    {
        let count = localStorage.getItem("wishlist") ? Object.keys(JSON.parse(localStorage.getItem("wishlist"))).length : 0;
        document.querySelector('.nav_up > ul li:nth-child(2) > a > span ~ span').textContent=count;
        document.querySelector('.mobile_nav > ul li:nth-child(2) > a > span ~ span').textContent=count;
    }

    static btnBasketBg()
    {
        if(localStorage.getItem("basket"))
        {
            // console.log(document.querySelectorAll('input[name="add_basket"]')[0]
            // .parentElement.localName);
        [...document.querySelectorAll('input[name="add_basket"]')].forEach( (v) => {
            //console.log(v.parentElement);
            if(v.parentElement.localName !== 'label'){
               if(Object.keys(JSON.parse(localStorage.getItem("basket")))
               .includes(String(v.parentElement.querySelector('input[name=id]').value)))
                {
                   v.setAttribute("style", "background: url(../img/adding_basket_btn.png)") 
                }  
            }

        })}
    }

    static btnWishListBg()
    {
        if(localStorage.getItem("wishlist"))
        {
        [...document.querySelectorAll('input[name="add_wish"]')].forEach( (v) => {
            if(v.parentElement.localName !== 'label'){
              if(Object.keys(JSON.parse(localStorage.getItem("wishlist")))
               .includes(String(v.parentElement.querySelector('input[name=id]').value)))
                {
                   v.setAttribute("style", "background: url(../img/adding_wish_btn.png)") 
                }  
            }
        })
        }

    }
}

Basket.countBasket();
Basket.countWishList();
Basket.btnBasketBg();
Basket.btnWishListBg();
Basket.addBasket();
Basket.addWishList();