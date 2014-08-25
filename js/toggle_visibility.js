function toggle_visibility(id, state) {
   var e = document.getElementById(id);
   if(state == 'off')
      e.style.display = 'none';
   else
      e.style.display = 'block';
}
