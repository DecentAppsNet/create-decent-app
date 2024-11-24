# Overview

This package includes the global command for [https://github.com/erikh2000/create-decent-app](Create Decent App).

You will get the following:

* Static-content, single-page web app with Vite-built bundles.
* Typescript/React codebase.
* Jest-based test runner for unit tests.
* Use local LLMs via WebLLM (post-deployment) or Ollama (during development)
* Common look and feel via widgets and design system from shared libraries.
* A working web app with UI to pleasantly handle local LLM access in development and production.

The code created by `create-decent-app` follows the Decent Sensibilities (described below).

# Usage

`npx create-decent-app YOUR-PROJECT-NAME`

But...

# Did You Know NPX is Kinda Dangerous?

`npx` literally just downloads a package and executes whatever is in it on your personal device. I promise I put nothing malicious or unsafe into `create-decent-app`, but why should you trust me? 

Here are some ways to protect yourself from me (and worse people) providing NPX-ecutables:

* Read through the install script at the [https://github.com/erikh2000/create-decent-app/index.js](Create Decent App git repo) before running the `npx` command. I wrote the script to be free of any dependencies other than Node.js built-in packages, and to have all the code that executes be easy to understand. You can spend 5 minutes checking, and you'll see I'm not doing anything sneaky.
* OR... you could manually clone the template yourself and rename it to match your project. The template is [https://github.com/erikh2000/decentapp-template](right over here). No execution of scripts via `npx` need happen if you decide to clone the template yourself.
* OR... you could run `npx` inside of Docker or some other virtualization.

# Decent Sensibilities

Decent apps seek to do right by their users by keeping their data off of the cloud. This template is based on certain "decent" sensibilities:

* THINK LOCAL - the project template is designed to avoid use of services and give you enough to do things without them, including local LLM and persistent storage.
* ASK BEFORE CALLING - if you do call services, ask the user for permission and never call services beyond those for which you have permission.
* LOW-DEPENDENCY - packages should be imported with reluctance as they increase risk of supply chain attacks and other problems. There's an article I wrote about this sensibility called "Write More, Reuse Less".
* NO SNEAKINESS - "Sneaky" means unexpected by the user. An example would be creating a link to a website that sends user data in the querystring.

Decent apps allow users to trust certain kinds of use cases in web apps that they might not otherwise. Some examples:

* Track your medical history and ask an LLM questions about it.
* Record meetings and generate notes for them.
* Keep a travelogue of all the places you've been in your life.
* Talk to an LLM about how much you hate your boss.
* Create web apps that can process company data without worrying about the data leaving a company-issued device.

Users can do these kinds of things without fear of insurance companies, government agencies, marketeers, research harvesters, doxxers, hackers, scammers, and spammers exploiting them.

# Licensing

My code and other files in this repository are licensed under the MIT open source license.

But if you see a LICENSE file in a sub-directory of the repository, that license will apply to all files found in that directory.

# Contributing

The project isn't open to contributions at this point. But that could change. Contact me if you'd like to collaborate.

# Contacting

You can reach me on LinkedIn. I'll accept connections if you will just mention "decent apps" or some other shared interest in your connection request.

https://www.linkedin.com/in/erikhermansen/