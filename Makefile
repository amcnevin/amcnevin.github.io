

bundle-update:
	bundle install

run:
	bundle exec jekyll serve --watch --host localhost --safe

clean:
	rm -rf _site/
