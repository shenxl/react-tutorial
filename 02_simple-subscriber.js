// Tutorial 2 - simple-subscriber.js

// First things first, let's write a theoretical subscriber
// 首先，我们先写一个理论上的订阅者

var mySubscriber = function() {
    console.log('Something happened')
    // do something
}

// Simple isn't it?
// 很简单是吧
// It's still not registered anywhere but soon it will be.
// 目前它仍然没有注册在任何地方，但是很快就可以了。

// And when called, it will do what it was designed for (here just a console.log)
// 当他被调用时，他将完成在设计时赋予他的动作(例子中仅仅是打印一个 console.log)

mySubscriber()

// So far here is the flow of our application
// ActionCreator -> Action ... Subscriber
// 
// 目前为止 我们应用数据流向为：
// ActionCreator -> Action ... Subscriber

// Go to next tutorial: about-state-and-meet-redux.js
