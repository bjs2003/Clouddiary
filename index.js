document.getElementById("changetosignupbtn").addEventListener("click", function(){
    document.getElementById("signup").style.display = "block";
    document.getElementById("login").style.display = "none";
});

document.getElementById("changetologinbtn").addEventListener("click", function(){
    document.getElementById("signup").style.display = "none";
    document.getElementById("login").style.display = "block";
});