.PHONY: build up down restart shell clean new-post help

# Default target
.DEFAULT_GOAL := help

## Build the Docker image
build:
	docker-compose build

## Start the blog locally (with livereload)
up:
	docker-compose up

## Start in detached mode
up-d:
	docker-compose up -d
	@echo "Blog running at http://localhost:4000"

## Stop the blog
down:
	docker-compose down

## Restart the blog
restart: down up

## Open a shell in the container
shell:
	docker-compose run --rm jekyll bash

## Build the static site for production
build-site:
	docker-compose run --rm -e JEKYLL_ENV=production jekyll \
		bundle exec jekyll build

## Clean the generated site
clean:
	docker-compose run --rm jekyll bundle exec jekyll clean
	docker-compose down -v
	rm -rf _site .jekyll-cache .sass-cache

## Create a new draft post  (usage: make new-post TITLE="My Post Title")
new-post:
	@if [ -z "$(TITLE)" ]; then echo "Usage: make new-post TITLE=\"My Post Title\""; exit 1; fi
	@DATE=$$(date +%Y-%m-%d); \
	SLUG=$$(echo "$(TITLE)" | tr '[:upper:]' '[:lower:]' | tr ' ' '-' | tr -cd '[:alnum:]-'); \
	FILE="_posts/$$DATE-$$SLUG.md"; \
	echo "---" > $$FILE; \
	echo "title: \"$(TITLE)\"" >> $$FILE; \
	echo "date: $$DATE" >> $$FILE; \
	echo "categories:" >> $$FILE; \
	echo "  - blog" >> $$FILE; \
	echo "tags:" >> $$FILE; \
	echo "  - " >> $$FILE; \
	echo "excerpt: \"\"" >> $$FILE; \
	echo "---" >> $$FILE; \
	echo "" >> $$FILE; \
	echo "Your content here." >> $$FILE; \
	echo "Created $$FILE"

## Show this help
help:
	@echo ""
	@echo "Jekyll Blog — Available Commands"
	@echo "================================="
	@grep -E '^## ' Makefile | sed 's/## /  /'
	@echo ""
	@echo "Examples:"
	@echo "  make up"
	@echo "  make new-post TITLE=\"Hello World\""
	@echo ""
