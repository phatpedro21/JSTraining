const EventEmitter = require('events');

const myEmitter = new EventEmitter();

//HERE IS AN EXAMPLE OF WHERE SETIMMEDIATE MIGHT BE USEFUL
//on its own, this emit will 'do nothing' as nothing has subscribed until after the emit,
//however, if we use setImmediate, it will be added to the event loop, and be fired on the next tick
//which will be AFTER the subscribers have been registered!

setImmediate(() => {
myEmitter.emit("EXAMPLE_EVENT");
});

myEmitter.on("EXAMPLE_EVENT", () => {
    console.log("An example event occured");
})
myEmitter.on("EXAMPLE_EVENT", () => {
    console.log("Adding 4+4: ", 4+4);
})

