function toggle_visibility(id, state) {
   var e = document.getElementById(id);
   if(state == 'off')
      e.style.display = 'none';
   else
      e.style.display = 'block';
}

function toggle_contact_visibility(state) {
    var form = document.getElementById('contact');
    if(state == 'off') {
      form.style.display = 'none';
    } else {
      form.style.display = 'block';
      $( "div#contact-form").load('/contact_form.html');
    }
}
