.DEFAULT_GOAL := dev

install:
	pnpm install --frozen-lockfile

dev:
	pnpm dev

run:
	pnpm preview

fmt:
	pnpm fmt

lint:
	pnpm lint

test:
	pnpm test

check:
	pnpm check

build:
	pnpm build

.PHONY: install dev run fmt lint test check build
