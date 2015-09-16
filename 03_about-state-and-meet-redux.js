// Tutorial 3 - about-state-and-meet-redux.js

// Sometimes the actions that we'll handle in our application will not only inform us
// that something happened but also tell us that data needs to be updated.
// 
// 在我们的应用中处理actions，有时不仅需要通知我们发生了，还需要告知我们哪些数据需要被改变。

// This is actually quite a big challenge in any apps.
// Where do I keep all the data regarding my application along its lifetime?
// How do I handle modification of such data?
// How do I propagate modifications to all parts of my application?
// 
// 这对任何应用来说都是一个巨大的挑战
// 我在哪里保持整个程序生命周期的数据？
// 我要如何处理这些数据的修改？
// 我怎么将修改传播到应用程序的所有部分？

// Here comes Redux.
// 于是 Redux 出现了

// Redux (https://github.com/gaearon/redux) is a "predictable state container for JavaScript apps"
// Redux (https://github.com/gaearon/redux) 是一个“针对JavaScript的应用程序可预见的状态容器”

// Let's review the above questions and reply to them with 
// Redux vocabulary (flux vocabulary too for some of them):
// 
// 让我们回顾一下上面的问题，然后用Redux的词汇回答一下。（flux的词汇跟这个基本一致） 

// Where do I keep all the data regarding my application along its lifetime?
// 我在哪里保持整个程序生命周期的数据？
//     You keep it the way you want (JS object, array, Immutable structure, ...).
//     Data of your application will be called state. Makes sense since we're talking about
//     all the applications data that will evolve over time, it's really the applications state.
//     But you hand it over to Redux (Redux is "state container", remember?).
//     你可以用你希望的形式保存（JS object，array,Immutable structure,）.
//     应用程序的数据将被称之为state.这是有道理的，因为我们正在谈论的所有应用程序的数据都会随着时间的推移而变化。
//     它才是真正的application的状态（state）
//     你把它交给了Redux处理（还记得吧，Redux被称作“状态容器”）
//     
// How do I handle modification of such data?
// 我要如何处理这些数据的修改？
//     Using reducers.
//     使用 reducers.
//     A reducer is a subscriber to actions.
//     reducers 就是 actions的订阅者。
//     A reducer is just a function that receives the current state of your application, the action,
//     and returns a new state modified (or reduced as they call it)
//     reducers只是一个函数。他接受应用当前的state和action.并返回一个修改过的新state。
//     （或就像名字里描述的一样 一个减少了的state）
//     
// How do I propagate modifications to all parts of my application?
// 我怎么将修改传播到应用程序的所有部分
//     Using subscribers to state's modifications.
//     对state的改变使用订阅者
//     
// Redux ties all this together for you.
// Redux将这一切整合起来。
// 
// To sum up, Redux will provide you:
//     1) a place to put your application state
//     2) a mechanism to subscribe to state updates
//     3) a mechanism to dispatch actions to modifiers of your application state, AKA reducers
//  总结一下，Redux能给你带来的有：
//     1）一个你存放应用全局状态的容器
//     2）一个监听者状态变更的机制
//     3）一个调度action来改变应用状态的机制，又名reducers

// The Redux instance is called a store and can be created like this:
/*
    import { createStore } from 'redux'
    var store = createStore()
*/

// But if you run the code above, you'll notice that it throw an error:
// 但是如果你执行上面的代码，你会发现抛出了错误异常
//     Error: Invariant Violation: Expected the reducer to be a function.

// That's because createStore expects a function that will allow it to reduce your state.
// 这是因为createStore期望一个function来允许reduce应用state

// Let's try again

import { createStore } from 'redux'

var store = createStore(() => {})

// Seems good for now...

// Go to next tutorial: simple-reducer.js
