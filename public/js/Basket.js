class Basket
{
    static add()
    {
        let addBasket = document.querySelectorAll('.add_basket');
        if(addBasket)
        {
            [...addBasket].forEach(el => {
                el.addEventListener('click', (e) => {
                    e.preventDefault();
                    let parent = el.parentElement;
                    let childrens = {
                        'id':parent.querySelector('input[name=id]').value,
                        'title':parent.querySelector('input[name=title]').value,
                        'price':parent.querySelector('input[name=price]').value,
                        'img': parent.querySelector('input[name=img]').value,
                        'url': parent.querySelector('input[name=url]').value,
                        'qty': parent.querySelector('input[name=qty]').value
                    }
                    //console.log(el.parentElement.querySelector('input[name=id]').value);
                    const arr = {};
                    const { id, price, title, img_small, url, qty } = childrens;
                    const item = { price, title, url, img_small, qty };
                    arr[id] = { ...item };
                
                    if (localStorage.getItem("basket") == "0") {
                      localStorage.setItem("basket", JSON.stringify(arr));
                    } else {

                        let parse = JSON.parse(localStorage.getItem("basket"));
                        delete parse[id];
                        localStorage.setItem("basket", JSON.stringify({ ...parse }));

                        //   let parse = JSON.parse(localStorage.getItem("basket"));
                        //   localStorage.setItem("basket", JSON.stringify({ ...arr, ...parse }));

                };
            });
        });
    }
}
    static count()
    {
        let count = localStorage.getItem("basket") ? Object.keys(JSON.parse(localStorage.getItem("basket"))).length : 0;
        document.querySelector('.nav_up > ul li:nth-child(3) > a > span').textContent=count;
    }
}

Basket.count();
Basket.add();