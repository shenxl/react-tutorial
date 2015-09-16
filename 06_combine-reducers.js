// Tutorial 6 - combine-reducers.js

// We're now starting to get a grasp of what a reducer is...

var reducer_0 = function (state = {}, action) {
    console.log('reducer_0 was called with state', state, 'and action', action)

    switch (action.type) {
        case 'SAY_SOMETHING':
            return {
                ...state,
                message: action.value
            }
        default:
            return state;
    }
}

// ... but before going further, we should start wondering what our reducer will look like when
// we'll have tens of actions:

var reducer_1 = function (state = {}, action) {
    console.log('reducer_1 was called with state', state, 'and action', action)

    switch (action.type) {
        case 'SAY_SOMETHING':
            return {
                ...state,
                message: action.value
            }
        case 'DO_SOMETHING':
            // ...
        case 'LEARN_SOMETHING':
            // ...
        case 'HEAR_SOMETHING':
            // ...
        case 'GO_SOMEWHERE':
            // ...
        // etc.
        default:
            return state;
    }
}

// It become quite evident that a single reducer function cannot hold all our
// application's actions handling (well it could hold it, but it wouldn't be very maintainable...).
// 
// 很明显，一个单独的reducer函数是不足以处理我们所有的actions(当然他可以全部容纳进来，但是却非常难以维护)


// Luckily for us, Redux doesn't care if we have one reducer or a dozen and it will even help us to
// combine them if we have many!
// 
// 幸运的是，Redux并不关心我们有几个reducer.甚至当我们有多个reducer时，他会帮助我们将这些reducer合并到一起

// Let's declare 2 reducers

var userReducer = function (state = {}, action) {
    console.log('userReducer was called with state', state, 'and action', action)

    switch (action.type) {
        // etc.
        default:
            return state;
    }
}
var itemsReducer = function (state = [], action) {
    console.log('itemsReducer was called with state', state, 'and action', action)

    switch (action.type) {
        // etc.
        default:
            return state;
    }
}

// With this new multiple reducer approach, we will end up having each reducer to only handle
// a slice of our application state.
// 
// 当发现有多个reducer时。我们最终也会使每个reducer处理应用状态的一部分。

// But as we already know, just one single reducer function is expected by createStore.
// 但是我们了解到，createStore函数只接受一个reducer函数

// So how do we combine our reducers? and how do we tell Redux that each reducer will only handle
// a slice of our state?
// 那么我们要怎么组合我们的reducers呢？并且我们要怎么告知Redux每个reducer要处理哪一部分的state?
// 
// It's fairly simple. We use Redux combineReducers function helper. combineReducers take a hash and
// return a function that when invoked, will call all our reducers, retrieve the state new slice and
// reunite them in a state object (a simple hash {}) that Redux is holding.
// Long story short, here is how you create a Redux instance with multiple reducers:
// 这非常简单。我们可以使用Redux的combineReducer辅助函数。combineReducer接受一个hash对象，当调用后会
// 返回一个函数。将会调用我们所有的reducers，获取新的一段state。最终将他们都返回并合并为一个新的object
// (一个简单的hash{})让Redux继续保持。
// 总而言之，这就是我们如何通过多个reducers来创建Redux实体。


import { createStore, combineReducers } from 'redux'

var reducer = combineReducers({
    user: userReducer,
    items: itemsReducer
})

console.log("Init by combineReducer");

// Output:
// userReducer was called with state {} and action { type: '@@redux/INIT' }
// userReducer was called with state {} and action { type: 'a.2.e.i.j.9.e.j.y.v.i' }
// itemsReducer was called with state [] and action { type: '@@redux/INIT' }
// itemsReducer was called with state [] and action { type: 'i.l.j.c.a.4.z.3.3.d.i' }
// 
var store_0 = createStore(reducer)
// Output:
// userReducer was called with state {} and action { type: '@@redux/INIT' }
// itemsReducer was called with state [] and action { type: '@@redux/INIT' }

// As you can see in the output, each reducer is correctly called with the init action @@redux/INIT.
// But what is this other action that is received? This is a sanity check implemented in combineReducers
// to assure that a reducer will always return a state != 'undefined'.
// Please note also that the first invocation of init actions in combineReducers share the same purpose
// as random actions (to do a sanity check).
// 通过output我们了解到，在初始化时，每个reducer都正确的调用了init action @@redux/INIT
// 但是。如果另一个action到达后怎么去接收呢？在combineReducers中合理的进行了检查，以确保reducer总是返回一个不等于
// 'undefined'的state.
// 也请注意，当第一次调用CombineReducer时，除了调用init action,也一起调用了一个随机的action来完成合理性检查的目的。

console.log('store_0 state after initialization:', store_0.getState())
// Output:
// store_0 state after initialization: { user: {}, items: [] }

// It's interesting to note that accordingly to how Redux was supposed to handle our slices,
// the final state is indeed a simple hash made of the userReducer's slice and the itemsReducer's slice:
// {
//     user: {}, // {} is the slice returned by our userReducer
//     items: [] // [] is the slice returned by our itemsReducer
// }
// 
// 有趣的是，Redux确实是支持我们对reducer分段的，而且最终state合并了userReducer 与 itemsReducer的分段，并返回了一个完整的state
// {
//     user: {}, // {} is the slice returned by our userReducer
//     items: [] // [] is the slice returned by our itemsReducer
// }

// We have by now a good idea of how reducers will work. It would be nice to have some
// actions being dispatched and see the impact on our Redux state.
// 
// 我们现在对reducers的运行有了一个深入的了解，下面来看一下 当同一个actions被派发时，reducer是如何对
// Redux产生影响的。

// Go to next tutorial: dispatch-action.js
