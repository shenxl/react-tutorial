// Tutorial 0 - introduction.js

// Why this tutorial?
// When trying to learn Redux, I realized that I had accumulated in the past incorrect knowledge about flux through
// articles I read and personal experience. I don't mean that articles about flux are not well written
// but I just didn't grasp concepts correctly. In the end, I was just applying documentation of different
// flux frameworks (Reflux, Flummox, FB Flux) and trying to make them match with the theoretical concept I read
// about (actions / actions creators, store, dispatcher, etc).
// Only when I started using Redux did I realize that flux is more simple than I thought. This is all
// thanks to Redux being very well designed and having removed a lot of "anti-boilerplate features" introduced 
// by other framework I tried before. I feel today that Redux is a much better way to learn about flux
// than many other framework. That's why I want now to share with everyone, using my own words,
// flux concepts that I am starting to grasp, focusing on the use of Redux.
// 
// 为什么开始这个教程？
// 在学习redux的过程中，我意识到，之前通过阅读文章及个人经验积累的关于FLUX的认识是不正确的。
// 我并不是说关于FLUX的介绍文章写得不好，而是我不正确把握的概念。
// 最后，我得到的只是运用不同的FLUX框架（Reflux，Flummox，FB-FLUX），并试图让他们的匹配我所学到的理论概念，
// （actions、actions creators，store，dispatcher等）。
// 当我开始使用Redux时，我才意识到，FLUX比我想象的更简单。这一切都归功于Redux被设计得非常好，并已经删除了很多其他框架中
// 我尝试引进过的“反样板特性”。
// 现在，比许多其他的框架，我觉得通过Redux去了解FLUX是一个更好的方式。
// 这就是为什么我要用自己的理解与大家一起分享FLUX概念。我开始尝试重点使用Redxu。



// You may have seen this diagram representing the famous unidirectional data flow of a flux application:
// 
// 您可能已经看到过这个表示Flux的应用单向数据流的著名图表：

/*
                 _________               ____________               ___________ 
                |         |             |            |             |           |
                | Action  |------------▶| Dispatcher |------------▶| callbacks |
                |_________|             |____________|             |___________|
                     ▲                                                   |
                     |                                                   |
                     |                                                   |
 _________       ____|_____                                          ____▼____ 
|         |◀----|  Action  |                                        |         |
| Web API |     | Creators |                                        |  Store  |
|_________|----▶|__________|                                        |_________|
                     ▲                                                   |
                     |                                                   |
                 ____|________           ____________                ____▼____ 
                |   User       |         |   React   |              | Change  |
                | interactions |◀--------|   Views   |◀-------------| events  |
                |______________|         |___________|              |_________|

*/

// In this tutorial we'll gradually introduce you to concepts of the diagram above. But instead of trying
// to explain this complete diagram and the overall flow it describes, we'll take each piece separately and try to
// understand why it exists and what role it plays. In the end you'll see that this diagram makes perfect sense
// once we understood each of its parts.
// 
// 在本教程中，我们将逐步向您介绍上图的概念。我们不试图完整的解释图表中数据流的描述，而是
// 分别介绍每个部件并试图了解它为什么存在，它发挥什么样的作用。
// 最后，一旦我们了解它的每一个部分，你会看到，这个图是非常合情合理的。
// 

// But before we start, let's speak a little bit about why flux exists and why we need it...
// Let's pretend we're building a web application. What are all web applications made of?
// 1) Templates / html = View
// 2) Data that will populate our views = Models
// 3) Logic to retrieve data, glue all views together and to react accordingly to user events,
//    data modifications, etc. = Controller
//    
// 在我们开始之间，我们先聊一下Flux存在的意义以及我们为什么需要它...
// 假设我们正在构造一个web application.  一般的Web application是由什么构成的呢？
// 1） Templates / html = View
// 2) 数据将填充我们的Views = Models
// 3) 检索数据的逻辑，将所有的View组织起来，并根据用户事件、数据修改做出相应的改变 = Controller   

// This is the very classic MVC that we all know about. But it actually looks like concepts of flux,
// just expressed in a slightly different way:
// - Models look like stores
// - user events, data modifications and their handlers look like
//   "action creators" -> action -> dispatcher -> callback
// - Views look like React views (or anything else as far as flux is concerned)
// 
// 我们都知道，这是非常经典的MVC模型。但是这个Flux的概念还是有很多相似之处的，只是通过不同的方式表达了出来
// - Model 很像 stores
// - 用户事件、数据变更已经他们的处理程序很像"action creators" -> action -> dispatcher -> callback
// - Views就是React的View(对flux而言，可以是其他任何东西)

// So is flux just a matter of new vocabulary? Not exactly. But vocabulary DOES matter, because by introducing 
// these new terms we are now able to express more precisely things that were regrouped under 
// various terminologies... For example, isn't a data fetch an action? just as a click is also an action?
// and a change in an input is an action too... Then we're all already used to issuing actions from our
// applications, we were just calling them differently. And instead of having handlers for those
// actions directly modify Models or Views, flux ensures all actions go first through something called
// a dispatcher, then through our stores, and finally all watchers of stores are notified.
// 
// 那么Flux只是科技人员创造的一个新词汇？这并不准确。但是新的词汇很重要，通过引入这个新词，
// 我们可以重新集结一些新的术语来进行更准确的表达。举个例子：数据获取不就是一个action吗？就像点击也是一个action一样。
// 改变输入框中的值也是一个action。既然我们已经习惯了从我们的应用中发起action,我们只是用不同的方式调用他们。
// 在这些action修改Models或是Views之前，flux确保所有的actions先通过一个被称之为dispatcher的组件，再通过我们的stroes.
// 最后，所有观察srotes的组件会被通知。

// To get more clarity how MVC and flux differs, we'll
// take a classic use-case in an MVC application:
// In a classic MVC application you could easily end up with:
// 1) User clicks on button "A"
// 2) A click handler on button "A" triggers a change on Model "A"
// 3) A change handler on Model "A" triggers a change on Model "B"
// 4) A change handler on Model "B" triggers a change on View "B" that re-renders itself
// 
// 为了举例说明传统的MVC对象模型与Flux有哪些不同，我们来看一个典型的MVC应用程序：
// 在这个典型模型中，你可以很简单的执行：
// 1）用户点击按钮“A”
// 2）在按钮“A”的单击处理程序中，触发了模块（model） “A”的变化
// 3）模块（model）“A”的变化处理程序中，触发了模块（model）“B”的变化
// 4）模块（model）“A”的变化处理程序中，触发了视图（View）“B”的重新渲染

// Finding the source of a bug in such an environment when something goes wrong can become quite challenging
// very quickly. This is because every View can watch every Model, and every Model can watch other Models, so 
// basically data can arrive from a lot of places and be changed by a lot of sources (any views or any models).
// 
// 在这种环境中，当出现问题时查找bug将会变得非常有挑战性。这是因为所有的View都可以观察每个model。
// 并且每个model也可以观察其他的model。所以基本数据将会从很多地方到达，并在很多代码中产生影响(任何的views或是models).

//  Whereas when using flux and its unidirectional data flow, the example above could become:
// 1) user clicks on button "A"
// 2) a handler on button "A" triggers an action that is dispatched and produces a change on Store "A"
// 3) since all other stores are also notified about the action, Store B can react to the same action too
// 4) View "B" gets notified by the change in Stores A and B, and re-renders
// 
// 在上面的例子中使用Flux及单向数据流后：
// 1）用户点击按钮“A”
// 2）按钮“A”的单击处理程序触发一个dispatch的action.并产生对Store“A”的改变
// 3）由于其他所有的stores都被通知了相关的action.Store“B”也会对相同的action做出响应。
// 4）View“B”获得StroeA与StoreB的变化通知，并重新渲染

// See how we avoid directly linking Store A to Store B? Each store can only be 
// modified by an action and nothing else. And once all stores have replied to an action, 
// views can finally update. So in the end, data always flows in one way: 
//     action -> store -> view -> action -> store -> view -> action -> ...
//     
// 来看一下我们是如何避免Store A直接连接到Store B的？每一个store只能通过action来进行修改。
// 一旦所有的store相应同一个action后，views就被最终更新。所以一整套流程下来，数据总是单向的
//    action -> store -> view -> action -> store -> view -> action -> ... 

// Just as we started our use case above from an action, let's start our tutorial with
// actions and action creators.
// 
// 正如我们上面由action开始，让我们也由actions及action creator来开启我们的教程

// Go to next tutorial: simple-action-creator.js
