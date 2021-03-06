# Proof of concept for css in js

<p float="left">
    <img src="https://raw.githubusercontent.com/nialloc9/emotion-vs-styled-components-vs-styletron-bundle-analysis/master/assets/main.jpg" alt='css in js' width="400" margin="50">
</p>


### Prerequisites

- install node: <a href="https://nodejs.org/en/download">https://nodejs.org/en/download</a>

## Install

```sh
    npm i -g yarn

    git clone git@github.com:nialloc9/emotion-vs-styled-components-vs-styletron-bundle-analysis.git

    cd emotion-vs-styled-components-vs-styletron-bundle-analysis

    npm install
```

### Run

```sh
    npm run compile
```

```sh
    npm run compare
```

### Questions to answer?

- Which library produces the smallest bundle?

- Which has the fastest compile time?

### Answers

<p float="left">
    <img src="https://raw.githubusercontent.com/nialloc9/emotion-vs-styled-components-vs-styletron-bundle-analysis/master/screenshots/time.png" alt='time to compile' width="800">
</p>


- Styletron is fastest to compile with styled-components taking the longest.


<p float="left">
    <img src="https://raw.githubusercontent.com/nialloc9/emotion-vs-styled-components-vs-styletron-bundle-analysis/master/screenshots/size.png" alt='size' width="800">
</p>


- Emotion is biggest to compile with styled-components the smallest.