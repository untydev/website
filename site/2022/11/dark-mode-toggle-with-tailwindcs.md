---
layout: layouts/post.njk
title: How to implement a dark mode toggle with TailwindCSS
date: 2022-11-24
draft: false
tags: [post,programming,javascript,tailwindcss]
favourite: true
---

I designed the first version of my website in dark colors. I prefer dark color themes (white text on black background) when programming or casually browsing the Internet.
---

However, when reading walls of text like books or online publications, I feel more comfortable doing it in lighter color themes (black text on white background). I also regularly switch between dark and light themes in my code editor. I have no idea why I am doing it 🙂

Because people have personal preferences, I've recently added a light color theme to my website, allowing visitors to choose the one they like more. You can try it yourself by clicking on the sun or moon symbol on the navigation bar.

Keep reading if you want to learn how I've done that, and use that knowledge to add it to any website you're building with TailwindCSS.

## Automatic dark mode

TailwindCSS has first-class [support for dark mode](https://tailwindcss.com/docs/dark-mode). All you need to do is write the alternative styles for your elements, and the browser will apply them based on the user's settings.

```html
<p class="white dark:black">
  Black or white?
</p>
```

When the dark mode is enabled, the color of the paragraph will be black. Otherwise, it'll be white. The implementation uses the [`prefers-color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) CSS feature, which allows applying styles depending on the operating system or browser settings.

I could style my website using the `dark:` prefix and call it a day. However, I wanted to allow my visitors to change the theme manually, overriding their operating system or browser settings. I could achieve that thanks to the TailwindCSS class strategy.

## Manual dark mode

To enable the class strategy, I had to add the following code to my TailwindCSS configuration file:

```js
module.exports = {
  darkMode: 'class'
}
```

Changing to the dark mode after enabling the class strategy is achieved by adding a `dark` class to the HTML document element, like this:

```html
<html class="dark">
  <body>
    <p class="white dark:black">
      Black or white?
    </p>
  </body>
</html>
```


The browser will render the paragraph from the above example in black or white depending on the presence of the `dark` class in the `<html>` tag. That requirement implies that the automatic mode selection won't work anymore. Fortunately, adding a few lines of JavaScript solves the problem, which I'll show you later.


The next step was to write some JavaScript code to achieve the following features:
* On the first visit, get the operating system settings, remember them in the local storage, and add or remove the 
  `dark` class name from the HTML document element.
* On subsequent visits, get the stored settings from the local storage, and add or remove the `dark` class name from 
  the HTML document element.
* On clicking the toggle theme button, override the settings in the local storage, and add or remove the `dark` class 
  name from the HTML document element.

Here's the first iteration of the code that implements those features:

```js
const themeToggleBtn = document.getElementById('themeToggleBtn')

if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark')
  localStorage.setItem('theme', 'dark')
} else {
  document.documentElement.classList.remove('dark')
  localStorage.setItem('theme', 'light')
}

if (themeToggleBtn != null) {
  themeToggleBtn.addEventListener('click', () => {
    if (localStorage.getItem('theme') === 'dark') {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    } else {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    }
  })
}
```

The code applies the color theme based on the settings found in the local storage or provided by the browser through the `prefers-color-scheme` CSS feature.

I complicated things further because I wanted the button to have different icons for both themes. I also had to change the SVG logotype depending on the current theme. The key idea of my solution is as follows:
* Add two elements (hidden initially), one for the light color theme and the other for the dark color theme.
* Upon getting the user's theme setting, show or hide elements depending on the current theme.
* After changing the color theme, show or hide elements depending on the current theme.

Any element can be shown or hidden by adding or removing the [`hidden`](https://tailwindcss.com/docs/display#hidden) class from that element. Here's the stripped-down HTML code of the theme toggle button:

```html
<button id="themeToggleButton">
  <span class="hidden is-dark">
    <svg></svg>
  </span>
  
  <span class="hidden is-light">
    <svg></svg>
  </span>
</button>
```

I initially hide all elements that depend on the theme settings until I know what theme should be applied. I decide which elements should be visible by checking if they have either `is-dark` or `is-light` custom class names. Here's the second iteration of the code:

```js
const themeToggleBtn = document.getElementById('themeToggleBtn')
const darkElements = document.getElementsByClassName('is-dark')
const lightElements = document.getElementsByClassName('is-light')

const applyDarkTheme = () => {
  document.documentElement.classList.add('dark')

  for (const elem of darkElements) {
    elem.classList.remove('hidden')
  }

  for (const elem of lightElements) {
    elem.classList.add('hidden')
  }
}

const applyLightTheme = () => {
  document.documentElement.classList.remove('dark')

  for (const elem of darkElements) {
    elem.classList.add('hidden')
  }

  for (const elem of lightElements) {
    elem.classList.remove('hidden')
  }
}

if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  applyDarkTheme()
  localStorage.setItem('theme', 'dark')
} else {
  applyLightTheme()
  localStorage.setItem('theme', 'light')
}

if (themeToggleBtn != null) {
  themeToggleBtn.addEventListener('click', () => {
    if (localStorage.getItem('theme') === 'dark') {
      applyLightTheme()
      localStorage.setItem('theme', 'light')
    } else {
      applyDarkTheme()
      localStorage.setItem('theme', 'dark')
    }
  })
}
```

I keep the code in a separate JavaScript file and load it like this:

```js
<script defer src="/scripts/site.js"></script>
```

I used [the `defer` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#attr-defer) in the 
`<script>` tag to defer the script's execution until the entire DOM gets constructed, ensuring that all elements, including the theme toggle button, are present during script execution.

Now I had to deal with the last remaining issue.

## Avoiding FOUC issue

The FOUC (Flash of unstyled content) issue happens when a browser renders a page with default styles before external CSS is loaded. It's purely a visual issue and has nothing to do with the website's functionality.

TailwindCSS documentation suggests adding the `dark` class to the HTML document element in the `<script>` tag.

```js
<script>
  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
</script>
```

It doesn't solve the FOUC issue because my styles are still external to the HTML and can take a long time to load. However, it selects the proper theme before the browser renders the page, so at least I avoid the FOWT issue (Flash of the wrong theme) 🙂

Check out [the source code of my website on GitHub](https://github.com/untydev/untypical) if you're interested in more details.
