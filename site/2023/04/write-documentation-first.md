---
layout: layouts/post.njk
title: Write your documentation first
date: 2023-04-03
draft: false
author: Dariusz Sobczyk
description: Why documenting your code first can make it substantially better. 
tags: [post,programming]
favourite: true
---
Have you ever thought of writing documentation before jumping right into programming? My intuition tells me that 
your answer is a bold no. Software developers are notoriously dubious about documenting their code. At the same time,
they expect that some third-party framework they use comes with a full suite of documents to make their jobs easier.

Over the years, I've formed my own approach to documenting code. One of the practices I've been following
consistently, is that I document interfaces before implementing them. I'll explain why I think it's a 
worthwhile approach, but before that, let's talk about why documenting interfaces adds value to your projects.

## Missing documentation is an obstacle

Here's a rhetorical question: how do you feel about using a library or framework having access only to its source code?
Unless you're a superhuman, your answer should be: "that's insane." Yet, some programmers
advocate that the source code is the best documentation (especially those who misunderstood everything what Uncle Bob
said).

Code documentation, particularly interface documentation, carries a lot of value for programmers who use those
interfaces. To better illustrate what I mean, let's imagine that you're implementing a function in C++ that returns a
portion of a string. You could come up with the following declaration:

```cpp
auto substr(std::string str, std::size_t pos, std::size_t len) -> std::string;
```

That's pretty straightforward. Once you start implementing this function, you'll quickly realize that there's a couple
of questions to answer:

* What if `pos` is equal to the length of the string?
* What if `pos` is greater than the length of the string?
* What if `len` is greater than the length of the string?

If you care about your design enough, you could try to come up with a different declaration to eliminate those questions
entirely. Here's one possibility:

```cpp
auto substr(std::string str, std::size_t beg, std::size_t end) -> std::string;
```

But after a moment of thinking, you'll realize that there's actually more questions to answer:

* What if `beg` is equal to the length of the string?
* What if `end` is equal to the length of the string?
* What if `beg` is greater than `end`?
* Should the character at `end` be included in the result?

You could repeat this process multiple times, but eventually, you'll have to choose your poison. So you go back to the
first version. You put an `if` here, a `throw` there, and you call it a day. Perhaps you're in a good mood and write a
test or two, or even go into full TDD mode. After you're done, it may seem that everything's in place:

* Your function has a short and self-explanatory name.
* The names of the parameters are also self-explanatory.
* The types of the parameters are quite strict (at least you didn't use `int`).
* The return value can be easily deduced from what the function does.
* You have a suite of unit tests to cover all the edge-cases.

That's already better than what most programmers would produce. However, despite your efforts, the users of the 
`substr` function are still left with unanswered questions about how it works in various situations. They're left with 
reading the implementation to find the answers, or asking the author of the function on Slack. Definitely not ideal 
for both parties. What about adding some docs?

```cpp
/**
 * Returns a newly constructed string object with its value initialized to a copy of a substring of this object.
 *
 * \param[in] str The string object whose portion will be returned.
 *
 * \param[in] pos The position of the first character to be copied as a substring. If this is equal to the string
 *                length, the function returns an empty string. If this is greater than the string length, it throws
 *                `out_of_range`. The first character is denoted by a value of 0.
 *                 
 * \param[in] len The number of characters to include in the substring. If the string length is shorter, then as many
 *                characters as possible are used. A value of `npos` indicates all characters until the end of the 
 *                string.
 *
 * \return A string object with a substring of this object.
 *
 * \throw `out_of_range` if `pos` is greater than the string length.  
 */
auto substr(std::string str, size_t pos, size_t len) const -> std::string;
```

Everyone using your function will be thankful for this (unless you lied in the comments). If you document your
interfaces to resolve doubts, you've just made everyone's job easier. And in case there's an important detail missing,
anyone can update the documentation to make it more accurate. You are free to document your interfaces at any time,
but there's one particular moment when you can get the most from the process. 

## Documenting as an afterthought is suboptimal

Programmers who know they should write documentation, often put that activity off after they're done with the
implementation. But such approach has several negative consequences. First, delaying documentation often means that it
never gets written. Second, the more time passes after the implementation, the more details you forget, and the
documentation will have a lot of holes (lack of answers to the questions that users of your interface have). Even if
you're motivated enough to dig out all the details from the existing implementation, it's not very effective.

That's a good reason to shift writing documentation during the implementation. But it can get even better if you 
shift it before the implementation because you'll gain a valuable design tool. Writing documentation is like explaining
the problem to someone else. You'll gain a lot of insights during the process. It will force you to think about your 
abstractions, usability of methods, pre- and post- conditions, or relations to other parts of the code. If you 
include usage examples of your functions, methods or classes in your documentation, you'll get a very good idea 
about ergonomics of your interfaces.

When I start writing a new class, I follow a specific approach:

* I start by writing the class name and its description. It's impossible to capture the entire responsibility of any
  entity with a single name, unless its so long that it crashes the compiler.
* Next, I outline the class interface by writing method declarations and documentation in comments. I often add short
  usage examples to nail down the usability. If there's a need for additional types (other classes), I outline them too.
* I iterate over the design (comments and declarations) until it feels about right. I don't spend too much time on this 
  part because the implementation can influence the class interface.
* Finally, I write method bodies, modifying the class interface and comments as needed. I also write unit tests when it
  makes sense. I don't force myself to follow TDD or any other practice, but tests are too important to skip them 
  thoughtlessly.

The above process is basically the same for global functions, class properties, or macros. After I'm done with each
step, I'm confident that I've produced a decent output. Sure, I don't get it right every time. I often have to go back
to the drawing board and fix things, but I'm ok with it because no person, process, or framework is perfect.

Some programmers may point out that it's just too much work. I can say from my experience that's not the case. When you
finally nail down your design during this process, there's not much documentation you're left with. Remember, you want
to be specific and concise in your documentation. Your job is to describe things you cannot express with code, not
entertain the readers with your essays.
