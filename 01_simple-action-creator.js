// Tutorial 1 - simple-action-creator.js

// We started to talk a little about actions in the introduction but what exactly are those "action creators"
// and how are they linked to "actions"?
// 
// 在前言中，我们谈了一些actions的概念，那么究竟什么是“action creators”,他们又是怎么与“action”关联的呢？

// It's actually so simple that few lines of code can explain it all!
// 
// 他实际上非常简单，只需要几行代码就可以解释一切了

// The action creator is just a function...
// 
// action creator 仅仅是一个function而已..
var actionCreator = function() {
    // ...that creates an action (yeah the name action creator is pretty obvious now) and returns it
    // ... 创建（create） 一个 action(当然 action creator的名字就已经很明显了) 并返回他
    return {
        type: 'AN_ACTION'
    }
}

// So is that all? yes.
// 仅仅是这些？是的

// However one thing to note is the format of the action. This is kind of a convention in flux
// that the action is an object that contains a "type" property. This type allow for further
// handling of the action. Of course, the action can also contain other properties to 
// pass any data you want.
// 
// 有一点要注意的是action的格式。在flux的约定中，action是一个包含 “type”属性的对象。这个“type”属性在action中允许
// 被进一步处理。当然，action也包含其他属性来传递你需要的数据。

// We'll also see later that the action creator can actually return something else than an action,
// like a function. This will be extremely useful for async action handling (more on that 
// in dispatch-async-action.js). 
// 
// 后期我们也会发现action creator可以返回除action以外的其他类型，比如function。这个功能在异步处理action时会
// 显着非常有用(更多信息请参考 dispatch-async-action.js)

// We can call this action creator and get an action as expected:
// 我们可以调用action creator来得到预期的action
console.log(actionCreator())
// Output: { type: 'AN_ACTION' }

// Ok, this works but it does not go anywhere...
// What we need is to have this action to be sent somewhere so that 
// anyone interested could know that something happened and could act accordingly.
// We call this process "Dispatching an action".
// 
// 好了，已经正常工作了，但是并没有任何用处...
// 我们需要的是将这个action发送到对它感兴趣的人那里，让他知道这件事情已经发生了，并做相应的处理。
// 我们将这个过程称之为"Dispatching an action"。
// 

// To dispatch an action we need... a dispatch function ("Captain obvious"). 
// And to let anyone interested know that an action happened, we need a mechanism to register
// subscribers.
// 
// 派发这个动作我们需要一个 dispatch function(“拼写就已经很明显了”)
// 来让所有对这个动作感兴趣的人知道动作已经发生了。现在我们需要有一套注册订阅者（subscribers）的机制

// So far here is the flow of our application:
// ActionCreator -> Action
// 
// 总结下：目前为止我们的流程是：
// ActionCreator -> Action

// Read more about actions and action creators here:
// 在以下链接获取action creators更多的信息
// http://gaearon.github.io/redux/docs/recipes/ReducingBoilerplate.html

// Go to next tutorial: simple-subscriber.js
