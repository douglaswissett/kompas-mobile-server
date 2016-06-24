$(document).ready(function(){
  $.ajax({
    url: '/api/v1/categories/stored'
  })
  .done(function(data) {
    $('.category_cbox').each(function(i, val) {
      data.forEach(function(category) {
        if(val.value === category) {
          $(val).prop('checked', true)
        }
      })
    })
  });
})