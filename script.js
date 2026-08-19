const photo = document.getElementById("myPhoto");
const button = document.getElementById("changePhotoBtn");
button.addEventListener("click", function () {
   photo.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrb4OvIZOz-Z2RvlJ0xDl1E_e3qOfh_TQK1va1Z7gJ4g&s=10";
    photo.alt = "My Photo";
    console.log("Photo changed successfully!");
});