---
layout: none
---
var idx = lunr(function () {
    this.field('title', { boost: 10 })
    this.field('excerpt', { boost: 5 })
    this.field('categories')
    this.field('tags')
    this.ref('id')
    this.pipeline.remove(lunr.trimmer)
    for (var item in store) {
        this.add({
            title: store[item].title,
            excerpt: store[item].excerpt,
            categories: store[item].categories,
            tags: store[item].tags,
            id: item
        })
    }
});

$(document).ready(function() {
    var PER_PAGE = 5;
    var allResults = [];
    var currentCount = 0;

    function renderResults(results, append) {
        var resultdiv = $('#results');

        if (!append) {
            resultdiv.empty();
            resultdiv.prepend('<p class="results__found">' + results.length + ' {{ site.data.ui-text[site.locale].results_found | default: "Result(s) found" }}</p>');
            currentCount = 0;
        }

        $('#load-more').remove();

        var slice = results.slice(currentCount, currentCount + PER_PAGE);
        currentCount += slice.length;

        for (var i = 0; i < slice.length; i++) {
            var ref = slice[i].ref;
            var searchitem;
            if (store[ref].teaser) {
                searchitem =
                    '<div class="list__item">' +
                    '<article class="archive__item" itemscope itemtype="https://schema.org/CreativeWork">' +
                    '<h2 class="archive__item-title" itemprop="headline">' +
                    '<a href="' + store[ref].url + '" rel="permalink">' + store[ref].title + '</a>' +
                    '</h2>' +
                    '<div class="archive__item-teaser">' +
                    '<img src="' + store[ref].teaser + '" alt="">' +
                    '</div>' +
                    '<p class="archive__item-excerpt" itemprop="description">' + store[ref].excerpt.split(" ").splice(0, 20).join(" ") + '...</p>' +
                    '</article>' +
                    '</div>';
            } else {
                searchitem =
                    '<div class="list__item">' +
                    '<article class="archive__item" itemscope itemtype="https://schema.org/CreativeWork">' +
                    '<h2 class="archive__item-title" itemprop="headline">' +
                    '<a href="' + store[ref].url + '" rel="permalink">' + store[ref].title + '</a>' +
                    '</h2>' +
                    '<p class="archive__item-excerpt" itemprop="description">' + store[ref].excerpt.split(" ").splice(0, 20).join(" ") + '...</p>' +
                    '</article>' +
                    '</div>';
            }
            resultdiv.append(searchitem);
        }

        if (currentCount < results.length) {
            resultdiv.after('<button id="load-more" class="btn btn--primary" style="display:block;margin:1em auto;">Load more results (' + (results.length - currentCount) + ' remaining)</button>');
            $('#load-more').on('click', function() {
                renderResults(allResults, true);
            });
        }
    }

    $('input#search').on('keyup', function () {
        var query = $(this).val().toLowerCase();

        allResults = idx.query(function (q) {
            query.split(lunr.tokenizer.separator).forEach(function (term) {
                q.term(term, { boost: 100 })
                if (query.lastIndexOf(" ") != query.length - 1) {
                    q.term(term, { usePipeline: false, wildcard: lunr.Query.wildcard.TRAILING, boost: 10 })
                }
                if (term != "") {
                    q.term(term, { usePipeline: false, editDistance: 1, boost: 1 })
                }
            })
        });

        renderResults(allResults, false);
    });
});