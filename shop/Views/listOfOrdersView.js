module.exports = data => `
<style>
.application__content > * {
font-family: 'Athiti', sans-serif;
font-size: 18px; 
}
</style>
<section class="latestList title_category_itemsList basket_items">List Of Orders</section>
${
  Object.keys(data).length > 0
    ? `<div class="application__content">
    ${data.map(
      v => `
    <p><strong>Order ID:</strong> ${v._id}</p>
    <p><strong>Name:</strong> ${v.name}</p>
    <p><strong>Address:</strong> ${v.address}</p>
    <p><strong>Email:</strong> ${v.email}</p>
    <p><strong>Items:</strong></p>
    <ul style='display:block;margin-left:20px;'>
    ${v.items.map(
      i =>
        `<li><strong>Item ID: </strong>${i.id}</li></br>
        <li><strong>TITLE: </strong>${i.title}</li></br>
        <li><strong>PRICE: </strong>${i.price}</li></br>
        <li><strong>QTY: </strong>${i.qty}</li></br></br>`
    )}
    </ul>
    <span>---------------------<span>
    <p style="color: green;"><strong>TOTAL: ${v.total} $</strong></p>
    <span>---------------------<span>
    <div style="color: red;">DELETE</div>
    <div class="wrapp_order" style='margin:0'>
    <form method="post">
    <label for="del_wish" class="del_wish">
    <input name='id' type='hidden' value='${v._id}'>
    <input onclick="" name="delete" type="submit" id="del_wish"></label>
    </form>
    </div>
    <span>==================</span>
    `
    )}
    </div>
    <section class="latest_wrapper bestsellers_wraper latest_featured" style="display:block;margin-bottom: 330px;"></section>`
    : `<h1>No Orders!</h1>`
}`;
