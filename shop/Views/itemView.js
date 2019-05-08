module.exports.Item = (data) =>  `
<div class="category cat_item_cat">
    <span><a href="/category/${data[0]['category']}">${data[0]['category']}</a></span>
    <span>${data[0]['title']}</span>
</div>
    </div>
    <section class="item_block">
        <figure class="item_block__img" style="background: url(${data[0]['img_original'].replace(/public/gi, "")}) no-repeat center;
            background-size: contain;">
        </figure>
        <div class="item_block__params">
            <h1>${data[0]['title']}</h1>
            <h2>${data[0]['price']}</h2>
            <p>Availability: <span>In Stock</span></p>
            <p>Quantity <input form="add_tools" type="text" name="qty" value="1"></p>
        </div>
    </section>
    <form method="post" id="add_tools">
        <input name='title' type='hidden' value='${data[0]['title']}'>
        <input name='price' type='hidden' value='${data[0]['price']}'>
        <input name='img' type='hidden' value='${data[0]['img_small'].replace(/public/gi, "")}'>
        <input name='url' type='hidden' value='${data[0]['url']}'>
        <label for="add_basket" id="btn_basket"><input name="add_basket" id="add_basket" type="submit" value=""></label>
        <label for="add_wish" id="btn_wishlist"><input name="add_wish" id="add_wish" type="submit" value=""></label>
    </form>
    <article class="description_item">
        <h1>Description</h1>
        <p>
            <span>${data[0]['description']}</span>
        </p>
    </article>
`;