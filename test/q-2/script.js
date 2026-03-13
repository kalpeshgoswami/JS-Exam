document.getElementById("form").addEventListener("submit", (e) => {
    e.PreventDefault();

    let num = Number(document.getElementById("number").value);
    let result = document.getElementById("result");

    if (num <= 1) {
        result.textContent = "This is an positive";
    } else if (num = 0) {
        result.textContent = "This is Zero";
    } else (num >= 1){      
        result.textContent = "This is an negative";
    }
});
