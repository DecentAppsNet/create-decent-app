# Overview

This package includes the global command for [Create Decent App](https://github.com/DecentAppsNet/create-decent-app).

After completing the install, you will get a working web app with UI to pleasantly handle local LLM access in development and production.

Features:
* Static-content, single-page web app with Vite-built bundles.
* Typescript/React codebase.
* Vitest-based test runner for unit tests.
* Use local LLMs via WebLLM
* Model loading success prediction based on device capabilities, model specs, and past history of loading success.
* On-device storage of app settings and logs.
* Common look and feel via widgets and design system.
* Progressive web app (PWA) support. (Users can install fully-offline versions of your web app.)

The code created by `create-decent-app` follows the spirit (if not the letter) of [Local-First](https://www.inkandswitch.com/local-first/) software development. There is a basic persistent-storage key/value utility module included to help you store user data without calling services. To give users of your web app the privacy benefits of using a local LLM, think about local-first.

I've taken some pains to keep the project low-dependency, avoiding 3rd-party packages in favor of easily-writable code, and in-lining (vendoring) code from my own packages into the template. There's an article I wrote about this sensibility called "[Write More, Reuse Less](https://medium.com/gitconnected/write-more-reuse-less-fbf8a010c5f4)".

# Usage

`npx create-decent-app YOUR-PROJECT-NAME`

Some options will be presented and you can pick what you like. Then `create-decent-app` will make your new project. The installer will create a new subdirectory for your project.

# Checking the Install Script

`npx` literally just downloads a package and executes whatever is in it on your personal device. I promise I put nothing malicious or unsafe into `create-decent-app`, but why should you trust me? 

Here are some ways to protect yourself from me (and worse people) providing NPX-ecutables:

* Read through the install script at the [Create Decent App git repo](https://github.com/DecentAppsNet/create-decent-app/blob/main/index.js) before running the `npx` command. I wrote the script to be free of any dependencies other than Node.js built-in packages, and to have all the code that executes be easy to understand. You can spend 5 minutes checking, and you'll see I'm not doing anything sneaky.
* OR... you could manually clone the template yourself and rename it to match your project. The template is [right over here](https://github.com/DecentAppsNet/decentapp-template). No execution of scripts via `npx` need happen if you decide to clone the template yourself.
* OR... you could run `npx` inside of Docker or some other virtualization.

# Licensing

This repository is licensed under the MIT open source license.

The template is in a [separate repository](https://github.com/DecentAppsNet/decentapp-template) and has its own licensing, also MIT.

# Contributing

The project isn't open to contributions at this point. But that could change. Contact me if you'd like to collaborate.

# Contacting

You can reach me via my [LinkedIn profile](https://www.linkedin.com/in/erikhermansen/). I'll accept connections if you will just mention "decent apps" or some other shared interest in your connection request.