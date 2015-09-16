// Tutorial 5 - get-state.js

// How do we retrieve the state from our Redux instance?

import { createStore } from 'redux'

var reducer_0 = function (state, action) {
    console.log('reducer_0 was called with state', state, 'and action', action)
}

var store_0 = createStore(reducer_0)
// Output: reducer_0 was called with state undefined and action { type: '@@redux/INIT' }

// To get the state that Redux is holding for us, you call getState

console.log('store_0 state after initialization:', store_0.getState())
// Output: Redux state after initialization: undefined

// So the state of our application is still undefined after the initialization? Well of course it is,
// our reducer is not doing anything... Remember how we described the expected behavior of reducer in
// "about-state-and-meet-redux"?
//     "A reducer is just a function that receives the current state of your application, the action,
//     and returns a new state modified (or reduced as they call it)"
// Our reducer is not returning anything right now so the state of our application is what
// reducer() returns, hence "undefined".

// Let's try to send an initial state of our application if the state given to reducer is undefined:

var reducer_1 = function (state, action) {
    console.log('reducer_1 was called with state', state, 'and action', action)
    if (typeof state === 'undefined') {
        return {}
    }

    return state;
}

var store_1 = createStore(reducer_1)
// Output: reducer_1 was called with state undefined and action { type: '@@redux/INIT' }

console.log('store_1 state after initialization:', store_1.getState())
// Output: Redux state after initialization: {}

// As expected, the state returned by Redux after initialization is now {}

// There is however a much cleaner way to implement this pattern thanks to ES6:

var reducer_2 = function (state = {}, action) {
    console.log('reducer_2 was called with state', state, 'and action', action)

    return state;
}

var store_2 = createStore(reducer_2)
// Output: reducer_2 was called with state {} and action { type: '@@redux/INIT' }

console.log('store_2 state after initialization:', store_2.getState())
// Output: Redux state after initialization: {}

// You've probably noticed that since we've used the default parameter on state parameter of reducer_2,
// we no longer get undefined as state's value in our reducer's body.

// Let's now recall that a reducer is only called in response to an action dispatched and
// let's fake a state modification in response to an action type 'SAY_SOMETHING'

var reducer_3 = function (state = {}, action) {
    console.log('reducer_3 was called with state', state, 'and action', action)

    switch (action.type) {
        case 'SAY_SOMETHING':
            //return Object.assign({},state,{message: action.value})
            return {
                ...state,
                message: action.value
            }
        default:
            return state;
    }
}

var store_3 = createStore(reducer_3)
// Output: reducer_3 was called with state {} and action { type: '@@redux/INIT' }

console.log('redux state after initialization:', store_3.getState())
// Output: Redux state after initialization: {}

// Nothing new in our state so far since we did not dispatch any action yet. But there are few 
// important things to pay attention to in the last example:
// 
// 目前在我们的state中没有任何事情发生，因为我们还没dispatch任何的action.但是在最后的例子中有几点需要注意一下。
// 
//     0) I assumed that our action contains a type and a value property. type property is mostly
//        a convention in flux actions and the value property could have been anything else.
//     0）我假定了我们的action中包含type与value属性。type属性在fulx约定里通常是存在的，但是value却可能是任何值。
//     
//     1) You'll see a lot the pattern involving a switch to respond accordingly
//        to an action received in your reducers
//     1）在你的reduces接受到action后，你会看到很多都是以 switch - case 的模式来做出响应
//     
//     2) When using a switch, NEVER forget to have a "default: return state" because 
//        if you don't, you'll end up having your reducer return undefined (hence loosing your state).
//     2）当使用switch时，不要忘记“default: return state” 。如果你不这么做，你会让你的reduce最终返回undefined
//     （因此会失去state）
//     
//     3) Notice how we returned a new state made by merging current state with { message: action.value },
//        all that thanks to this awesome ES7 notation (Object Spread): { ...state, message: action.value }
//     3)关注一下我们是怎么返回一个新的状态，在其中合并了当前状态{message:action.value}，这都归功于ES7的记号（对象传播）：
//        {..state,message:action.value}
//     
//     4) Note also that this ES7 Object Spread notation suits our example because it's doing a shallow
//        copy of { message: action.value } over our state (meaning that first level property of state
//        are completely overwritten - by opposition to gracefully merged - by first level property of
//        { message: action.value }). But if we had a more complex / nested data structure, you may choose
//        to handle your state's updates very differently:
//        - using Immutable.js (https://facebook.github.io/immutable-js/)
//        - using Object.assign (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
//        - using manual merge
//        - or whatever other strategy that suits your needs and the structure of your state since
//          Redux is absolutely NOT opinionated on this (remember, Redux is a state container).
//     4) 请注意ES7的对象传播（Object Spread）特性是时候我们的示例的，因为他会将{message:action.value}浅复制到我们的state上。
//     (意味着state第一级的属性将会被重写-{message:action.value}将被优雅的合并到state的第一级属性中）但是如果你有更复杂/深层嵌套的数据结构，
//     你就需要根据state的不同更新需求做不同的处理。
//        - 使用Immutable.js(https://facebook.github.io/immutable-js/)
//        - 使用Object.assign(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
//        - 手动合并
//        - 使用任何你认为合适的方式。Redux绝不会将某一方式制定为是规则。（要记住，Redux是状态容器）

// Now that we're starting to handle actions in our reducer let's speak about having multiple reducers and
// combining them.
// 
// 现在我们将要在reducer中处理actions了。

// Go to next tutorial: combine-reducers.js
