# iorestoacasa.work

Questo repository ospita il sito web del progetto 

https://iorestoacasa.work

Build:

`docker run --rm -it -v $(pwd):/app -w /app jekyll/jekyll jekyll build`

Run:

`docker run --rm -it -p4000:4000 -v $(pwd):/app -w /app jekyll/jekyll jekyll server`
