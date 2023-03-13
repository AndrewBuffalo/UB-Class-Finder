var x = document.querySelector("a[anonymous='true']")
for(let btn of document.querySelectorAll("td.btn")){
    btn.addEventListener("click", function(e){
        x.click();
    });
}