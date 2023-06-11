---
layout: layouts/post.njk
title: The anatomy of the main function
date: 2023-02-21
draft: false
author: Dariusz Sobczyk
description: A brief summary of the main function in C++.
tags: [post,C++]
favourite: true
---

In C++, `main` is a global function invoked by the implementation at the program startup. It acts as the program's 
entry point, and most of the code you write executes in it.

{% note %}
An <i>implementation of the C++ language</i> is a system of components capable of running C++ programs. It consists 
of a compiler, a linker, the source code of the standard library, and the language runtime. The operating system and
the hardware are also part of the implementation.
{% endnote %}

Let's look at how to declare the `main` function, what happens before and after it executes, and the differences
between various implementations.

## Function declaration

Every C++ program must contain a global function `main`. An implementation cannot predefine it, which means you must
define it explicitly.

{% note %}
The C++ standard distinguishes between two language implementations: <b>hosted</b> and <b>freestanding</b>. Only
programs running in hosted environments must define the <code>main</code> function. You can read more about these 
concepts <a href="https://en.cppreference.com/w/cpp/freestanding">on cppreference.com</a>.   
{% endnote %}

The C++ standard requires implementations to support at least two variants of main function declarations:

```cpp
int main()
int main(int argc, char* argv[])
```

You can sometimes find the second variant written in a slightly different way:

```cpp
int main(int argc, char** argv)
```

The declared return type of the `main` function must be `int`. Some compilers are not so strict about this. For
example, Visual Studio C++ permits the return type to be `void`, but emits a warning if you do so.

## Program execution

Before and after the execution of the `main` function, a few things must happen.

First, the implementation initializes all non-local objects with static storage duration (global variables). Next, it
starts the main thread of execution and invokes the `main` function. After the execution of the `main` function
finishes, all objects with automatic storage duration (local variables) are destroyed, just like with a regular
function. Finally, the `std::exit` is invoked with the return value of the `main` function. Calling `std::exit`
(manually or automatically) destroys all non-local objects with static storage duration (global variables) and
terminates the program.

The operating system stores the program's exit code and allows the user to retrieve it. For example, on Linux, you can
get the exit code of the recently executed program from the terminal:

```shell
echo $?
```

You can explicitly return a value in the function definition or omit it. If you don't explicitly return a value, it 
will default to 0. The following implementations of the `main` function are equivalent:

```cpp
int main() {}
int main() { return 0; }
```

A non-zero exit code is usually an indicator of a program failure.

## Command line arguments

The standard way of obtaining command line arguments in a C++ program, is through the parameters of the `main` 
function. The following is a declaration of the `main` function that accepts command line arguments: 

```cpp
int main(int argc, char* argv[])
```

The `argc` parameter is the number of arguments passed to the program. If `argc` is greater than 0, the arguments are
supplied in `argv[0]` through `argv[argc-1]`. Note that `argc` cannot have a negative value.

{% note %}
On Windows, there's another way of obtaining command line arguments. The <code>GetCommandLine</code> returns the entire
command line string. You can use it with<code>CommandLineToArgv</code> to get an array of command line arguments
similar to the <code>argv</code> parameter of the <code>main</code> function.  
{% endnote %}

The `argv` parameter is an array of null-terminated strings containing the arguments passed to the program. The
`argv[0]` usually contains the program's name. In some environments, it can be empty or even null.

The strings in `argv` have environment specific encoding. On Linux and OSX, it's usually UTF-8. On Windows, it's plain
ANSI. However, Windows also supports an alternative way to define the `main` function to get command line arguments in
Unicode:

```cpp
int wmain(int argc, wchar_t* argv[]) {
  // ...
}
```

The `wchar_t` is a C++ standard type for representing wide characters. On Windows, it's 2 bytes long and contains
UTF-16 encoded characters. Another way to define the `main` function on Windows is to use the `_tmain` macro, which
expands to either `main` or `wmain` depending on the presence of `_UNICODE` definition.

The `WinMain` function is used in windowed applications and comes with its own set of parameters:

```cpp
int WINAPI WinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance, PWSTR pCmdLine, int nCmdShow) {
  // ...
}
```

You can read about the details of the `WinMain` function on the [MSDN pages](https://learn.microsoft.com/en-us/windows/win32/learnwin32/winmain--the-application-entry-point).

## Environment variables

On Windows, the `main` and `wmain` functions offer a non-standard way of obtaining environment variables for a 
program. Their declarations look like follows:

```cpp
int main(int argc, char* argv[], char* envp[])
int wmain(int argc, wchar_t* argv[], wchar_t* envp[])
```

The `envp[]` parameter is an array of strings containing the variables set in the user's environment. A null element
indicates the end of the array. There's a bunch more of implementation specific nuances on Windows. You can 
read more about them on [MSDN](https://learn.microsoft.com/en-us/cpp/cpp/main-function-command-line-args?view=msvc-170).

## Exception handling

C++ has a feature called *function-try-block*. It's a way to associate a sequence of `catch` clauses with the entire
function body. Here's an example:

```cpp
void foo() try {
}
catch (...) {
}
```

You can also declare the `main` function with a function-try-block:

```cpp
int main() try {
}
catch (...) {
}
```

The function-try-block of the `main` function doesn't catch exceptions thrown from the constructors and destructors of
non-local objects with static storage duration. They are initialized before the `main` function executes, so it's
impossible for the function-try-block to catch any exceptions thrown from them.

One way to handle exceptions throw by global objects is to set your own terminate handler using `std::set_terminate`.
However, due to all the nuisances involved, I think it's a topic for another time 🙂
