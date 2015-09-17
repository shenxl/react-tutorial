``` js
/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */
export default function applyMiddleware(...middlewares) {
  return (next) => (reducer, initialState) => {
    var store = next(reducer, initialState);
    var dispatch = store.dispatch;
    var chain = [];

    var middlewareAPI = {
      getState: store.getState,
      dispatch: (action) => dispatch(action)
    };
    chain = middlewares.map(middleware => middleware(middlewareAPI));
    dispatch = compose(...chain)(store.dispatch);

    return {
      ...store,
      dispatch
    };
  };
}


let createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

// We can use it exactly like “vanilla” createStore.
let store = createStoreWithMiddleware(rootReducer);

export default function thunkMiddleware({ dispatch, getState }) {
  return next => action =>
    typeof action === 'function' ?
      action(dispatch, getState) :
      next(action);
}

export default function compose(...funcs) {
  return arg => funcs.reduceRight((composed, f) => f(composed), arg);
}
```



## 参数传递
1.调用applyMiddleware 传入 thunk : middlewares
2.返回 (next) => (reducer，initialState)...
3.根据 applyMiddleware(thunk)(createStore) => next : createStore
4.根据 createStoreWithMiddleware(rootReducer) reducer: rootReducer initialState : undefine
5.initialState 为同构应用准备@param {any} [initialState] 如果为空则使用reducer的默认值
 
## 调用开始
``` js  
var store = next(reducer, initialState) => createStore(reducer, initialState);
var dispatch = store.dispatch; 即store当前的dispatch
var chain = [];

var middlewareAPI = {
     getState: store.getState,
     dispatch: (action) => dispatch(action) //控制反转
};
```
构造middlewates的参数。本例中是thunk  
```
  thunk = ({ dispatch, getState }) => next => action => ...
  chain = middlewares.map(middleware => middleware(middlewareAPI));

```  
将参数导入thunk中，即

``` json 
  { 
    dispacth : (action) => dispatch(action),
    getState : store.getState
  }

```  
关键是函数compose
```
 

export default function compose(...funcs) {
  return arg => funcs.reduceRight((composed, f) => f(composed), arg);
}
``` 
在本例中 chain 只有1个 即 

``` var chain[0] = next => action => typeof action === 'function' ? action((action) => dispatch(action), getState) : next(action); ```
由上面可知 

dispatch :  (action) => dispatch(action),
getState : store.getState

继续到compose的代码中
dispatch = compose(...chain)(store.dispatch);
chain.reduceRight((composed, f) => f(composed),store.dispatch);
第一个参数为 store.dispatch -- composed
第二个参数为 chain[0] -- f
执行 chain[0](srore.dispatch)
next 赋值为 srore.dispatch 
dispatch = action => action === 'function' ?  action((action) => dispatch(action), getState) : store.dispatch(action);

Ok 现在可以使用
store.dispatch(makeASandwichWithSecretSauce("shen"))调用了。

function makeASandwichWithSecretSauce(forPerson) {

  // Invert control! 控制反转
  // Return a function that accepts `dispatch` so we can dispatch later.
  // Thunk middleware knows how to turn thunk async actions into actions.

  return function (dispatch) {
    return fetchSecretSauce().then(
      sauce => dispatch(makeASandwich(forPerson, sauce)),
      error => dispatch(apologize('The Sandwich Shop', forPerson, error))
    );
  };
}

action 为函数。走action((action) => dispatch(action), getState) 







