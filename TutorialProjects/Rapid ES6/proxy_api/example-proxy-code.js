//If shutdown is true, no data can be gotten
const shutdown = false;


function Employee(){
    this.name = "Peter Mal";
    this.salary = 0;
}

var e = new Employee();


//Setting up our proxy object to trap get calls to our employee object.
var employeeProxy = new Proxy(e, {

    //Defines a trap on get
    get: function(target, prop, receiver){
        if(shutdown)
            return "Attempted access: " + prop;
        else
            //Access to salary is denied
            if(prop === "salary")
                return "Access to employee Salaries is denied";
            else
                return Reflect.get(target,prop,receiver);
    }
});

function adder(a,b){
    if(typeof a === "number" && typeof a === "number" )
        return a+b;        
}

var adderProxy = new Proxy(adder, {

    apply: function(target, thisArg, argumentsList){

        if(argumentsList[0] === 10)
            return "10 IS NOT ALLOWED";
        console.log("THIS CALL WAS INTERCEPTED");
        return Reflect.apply(target, thisArg, argumentsList);
    }
})




console.log(employeeProxy.salary);
console.log(employeeProxy.name);

console.log("\n--------\n");

console.log(adderProxy(1,10));