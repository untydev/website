---
layout: layouts/post.njk
title: How to deploy to an FTP server with GitHub Actions
date: 2022-11-14
draft: false
tags: [post,devops,github]
---
I have a fair amount of experience deploying commercial projects to various Azure services. That's why for my hobby projects, I prefer solutions that get out of my way so I can focus on the important stuff.
---

I host my current website on a shared hosting plan in OVH. It's not shiny, but it's cheap and reliable. The primary form of deployment is to copy files over FTP. It's so easy that I could do it manually forever. However, I like the idea of automating repeated tasks, so I configured a GitHub Action that automatically deploys my website over FTP whenever I push the code to the repository.

Here's how I did this.

## Setting up secrets

This first step was to set repository secrets to store my FTP server credentials, so I could later reference them in my workflow file.

I could put them directly in the workflow file, but it comes with some serious security issues. Because the source code of my website is public, anyone reading the code could find the credentials and mess with my FTP server. Not good.

I defined three secrets:
* `FTP_SERVER` is the address of the FTP server,
* `FTP_USERNAME` is the login to the FTP server,
* `FTP_PASSWORD` is the password to the FTP server

![GitHub secrets](/images/2022/11/github-secrets.png)

If you're going to replicate my workflow, you can name the secrets differently, but remember to adjust the workflow file accordingly.

## Creating the workflow

The next step was to create a workflow file in the project's root directory and define the steps to deploy my website:

* Get the latest website code from the GitHub repository,
* Install and use the latest Node.js version,
* Install dependencies by running the `npm install` command,
* Build the website by running the `npm run build` script,
* Transfer files to the FTP server

{% raw %}
```yaml
on: push
name: 🚀 Deploy website
jobs:
  ftp-deploy:
    name: 🎉 Deploy
    runs-on: ubuntu-latest
    steps:
      - name: 🚚 Get latest code
        uses: actions/checkout@v2

      - name: 🚚 Set up Node.js
        uses: actions/setup-node@v2

      - name: 🚚 Install dependencies
        run: npm install

      - name: 🏗 Build website
        run: npm run build

      - name: 📂 Sync files
        uses: SamKirkland/FTP-Deploy-Action@4.3.2
        with:
          server: ${{ secrets.FTP_SERVER }}
          username: ${{ secrets.FTP_USERNAME }}
          password: ${{ secrets.FTP_PASSWORD }}
          local-dir: ./www/
          server-dir: www/
```
{% endraw %}

The `build` script runs Eleventy and TailwindCSS to generate the website and build styles into the `www` directory. The last step in the workflow file uses the [FTP Deploy Action](https://github.com/marketplace/actions/ftp-deploy) package to transfer the generated files from the `www` directory to the FTP server. There's no need to copy source files.

## Testing the process

The last step was to commit and push the workflow file. On each push to the repository, GitHub will pick up the workflow file and execute each step.

![GitHub Action result](/images/2022/11/github-action-result.png)

There are a few improvements that I could make. For example, I should use FTPS instead of FTP to transfer the files. Unfortunately, the FTP Deploy action doesn't support it at the moment, but I can live with it for now 🙂
