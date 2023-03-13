fetch("/api/favorites").then(res=>res.json()).then(data=>{
    data.forEach(fav=>{
        let btn = document.querySelector(`td.btn[data-class-id='${fav}']`);
        if(btn)
            btn.textContent = "-";
    });
});
for(let btn of document.querySelectorAll("td.btn")){
    btn.addEventListener("click", function(e){
        let tr = e.target.parentElement;
        let class_id = tr.children[1].textContent;
        class_id = isNaN(class_id) ? `${tr.children[3].textContent}-${tr.children[6].textContent}` : class_id;
        if(e.target.textContent === "+"){
            fetch(`/favorites?class_id=${class_id}`, {method: "PUT"});
        } else {
            fetch(`/favorites?class_id=${class_id}`, {method: "DELETE"});
        }
        e.target.textContent = e.target.textContent === "+" ? "-" : "+";
    });
}