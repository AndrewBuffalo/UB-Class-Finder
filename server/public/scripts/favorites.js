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
        let class_id = e.target.dataset.classId
        // let class_id = tr.querySelector("td[data-class-id]").dataset.classId;
        if(e.target.textContent === "+"){
            fetch(`/favorites?class_id=${class_id}`, {method: "PUT"});
        } else {
            fetch(`/favorites?class_id=${class_id}`, {method: "DELETE"});
        }
        e.target.textContent = e.target.textContent === "+" ? "-" : "+";
    });
}