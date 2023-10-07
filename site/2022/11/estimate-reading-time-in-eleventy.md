---
layout: layouts/post.njk
title: How to estimate and display reading time in Eleventy
date: 2022-11-12
draft: false
tags: [post,programming,javascript,11ty]
---
On my [current website](https://untypical.dev), I wanted to show the reading time of posts next to their titles. 
Eleventy doesn't come with a built-in feature to achieve this. There are a few unofficial plugins that I could've used,
but instead, I took the opportunity to learn something new and wrote the code myself.
---

## Theory

Reading time is an estimated time required to read a text by an average person. You can calculate it by dividing the
number of words in a text by the average reading speed. The average reading speed depends on many factors, including
the reader's age, language, length of words and sentences, topic, etc.

Getting the number of words in a blog post was easy. Finding the average reading speed took me more effort. I've read
multiple studies and decided to take the numbers from [this analysis](https://www.sciencedirect.com/science/article/abs/pii/S0749596X19300786):

> Based on the analysis of 190 studies (18,573 participants), we estimate that the average silent reading rate for 
> adults in English is 238 words per minute.

So, 238 words per minute, or WPM for short. Remember that these studies didn't account for the time needed to understand
the topic by the readers.

## Implementation

I extracted the function for estimating reading time into a separate file. I believe the code is straightforward, so
I'm not going to explain it in detail. One important thing worth mentioning is that the function strips the content from
any HTML tags before estimating the reading time.

```js
/**
 * Reading speed, expressed in WPM (words per minute).
 */
const readingSpeed = 238

/**
 * Return the page's HTML.
 */
const getHtml = (content) => {
  return content.templateContent ?? content
}

/**
 * Strip HTML tags and return text.
 */
const stripHtml = (htmlContent) => {
  return htmlContent.replace(new RegExp(String.raw`<\/?[a-z0-9]+\b[^>]*>|<!--[^]*?-->`, 'gi'), '')
}

/**
 * Count the number of words in the text.
 */
const countWords = (textContent) => {
  return textContent.split(/\s+/).length
}

/**
 * Estimate reading time of the content.
 */
const estimateReadingTime = (content) => {
  return Math.round(countWords(stripHtml(getHtml(content))) / readingSpeed) + ' min'
}

/**
 * Export the function.
 */
module.exports = { estimateReadingTime }
```

To use the function in my templates, I needed to add a [filter](https://www.11ty.dev/docs/filters/) or [shortcode](https://www.11ty.dev/docs/shortcodes/) to my Eleventy configuration file:

```js
/**
 * Import the function.
 */
const { estimateReadingTime } = require('./reading-time.js')

/**
 * Export the configuration.
 */
module.exports = (config) => {
  config.addFilter('readingTime', estimateReadingTime)
  config.addShortcode('readingTime', estimateReadingTime)
}
```

Here's how I'd use the filter in a Nunjucks template to render the reading time of items in all collections:

{% raw %}
```njk
{%- for item in collections.all -%}
  {{ item | readingTime }}
{%- endfor -%}
```
{% endraw %}

As easy as it gets 🙂 If you're curious about the details, you can look at the source code of [my website on GitHub](https://github.com/untydev/untypical).

