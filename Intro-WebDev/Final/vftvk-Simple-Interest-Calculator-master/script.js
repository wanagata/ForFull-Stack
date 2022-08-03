function compute() {
    principal = document.getElementById("principal").value;
    if(!validate(principal)){
        return;
    }
    rate = document.getElementById("rate").value;
    years = document.getElementById("years").value;
    interest = principal * years * rate / 100;
    year = new Date().getFullYear() + parseInt(years);
    showOutput(principal,rate,year);
}

function validate(data){
    princ_id = document.getElementById("principal");
    if (data<=0) {
        alert("Enter a positive number!");
        princ_id.focus();
        return false;
    }
    return true;
}

function showval(data) {
    document.getElementById("rate_val").innerText = data;
}

function showOutput(principal,rate,year){
    
    document.getElementById("result").innerHTML =
        "If you deposit \<nstyle\>" + principal + 
        "\<\/nstyle\>,\<br\>at an interest rate of \<nstyle\>" + rate + 
        "\<\/nstyle\>%\<br\>You will receive an amount of \<nstyle\>" + interest + 
        "\<\/nstyle\>,\<br\>in the year \<nstyle\>" + year + "\<\/nstyle\>\<br\>"
}