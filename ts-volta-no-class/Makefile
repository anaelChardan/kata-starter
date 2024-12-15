YARN=docker run --rm -it -v  $(shell pwd):/home/node/app -w /home/node/app node:23-alpine yarn
PACKAGE_MANAGER=pnpm


.PHONY: list
list:
	@echo "${YELLOW}***${RED}***${RESTORE}***${YELLOW}***${RED}***${RESTORE}***${YELLOW}***${RED}***${RESTORE}***${YELLOW}***${RED}***${RESTORE}"
	@echo "${RED}Mars Rover Kata: ${YELLOW}Available targets${RESTORE}:"
	@grep -E '^[a-zA-Z-]+:.*?## .*$$' Makefile | sort | awk 'BEGIN {FS = ":.*?## "}; {printf " ${YELLOW}%-15s${RESTORE} > %s\n", $$1, $$2}'
	@echo "${RED}=================================${RESTORE}"


.PHONY: install
install:
	${PACKAGE_MANAGER} i

.PHONY: build
build:
	${PACKAGE_MANAGER} run build

.PHONY: test
test:
	${PACKAGE_MANAGER} test
