function previewImage(event) {
    var input = event.target;
    var preview = document.getElementById('preview');
  
    var reader = new FileReader();
    reader.onload = function() {
      preview.src = reader.result;
    }
    reader.readAsDataURL(input.files[0]);
  }