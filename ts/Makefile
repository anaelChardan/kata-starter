YARN=docker run --rm -it -v  $(shell pwd):/home/node/app -w /home/node/app node:23-alpine yarn
NPM=docker run --rm -it -v  $(shell pwd):/home/node/app -w /home/node/app node:23-alpine npm

.PHONY: ts
ts:
	${NPM} ${C}

.PHONY: build
build:
	${NPM} run build

.PHONY: test
test:
	${NPM} test

.PHONY: install
install:
	${NPM} install

