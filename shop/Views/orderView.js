module.exports = (data) =>  
`${(Object.keys(data.errors).length > 0) ? 
         `<div class='errors'><p>ERRORS:</p>
            ${data.errors.map( v => `<p>${v}</p>`)}
         </div>`.replace(/[, ]+/g, ' ') : ''
}
${data.good ? `<div class="errors no_errors">
<p>Order Completed Successfully! Thank you!</p>
</div>` : ''}
    <div class="wrapp_order">
    <div class="robo_order"></div>
    <form method="post" id="order">
        <input name="name" type="text" placeholder="__FULL NAME__" value="${data.name ? data.name : ''}">
        <input name="address" type="text" placeholder="__ADDRESS__" value="${data.address ? data.address.replace(/[+ ]+/g, ' ') : ''}">
        <input name="email" type="text" placeholder="__EMAIL__" value="${data.email ? data.email : ''}">
        <p>CAPTCHA</p>
        <div class="captcha" style="background: url(../img/captcha/${data.captcha}) no-repeat center center;background-size:contain;"></div>
        <input name="captcha" type="text" placeholder="ROBOT OR HUMAN ? ">
        <input name="captchaImg" type="hidden" value='${data.captcha}'>
        <input type="hidden" name="csrf" value="">
        <div class="pp"></div>
        <label for="check_order" class="check_order">ORDER<input id="check_order" name="check_order" type="submit"></label>
    </form>
</div>`;

// if(count($_SESSION['basket']) > 0) {

//     \security\CSRF::generate_token();

//     if(isset($_SESSION['thanks'])) {
//         echo  "<div class='errors no_errors'><p>$_SESSION[thanks]</p></div>";
//         unset($_SESSION['thanks'], $_SESSION['inputs'], $_SESSION['basket']);
//     }
{/* <div className="errors no_errors">
        <p>Order Completed Successfully! Thank you!</p>
      </div> */}
// 	if(!empty($_SESSION['err_valid'])) {
//         echo "<div class='errors'>
// 			<p>ERRORS:</p>";
//         foreach($_SESSION['err_valid'] as $v) {
//             echo "<p>$v</p>";
//         }
//         echo "</div>";
//         unset($_SESSION['err_valid']);}