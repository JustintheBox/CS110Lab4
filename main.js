document.addEventListener('DOMContentLoaded', function() {
    function fetchNYTArticles(sortBy, timeFrame) {
        const apiKey = '0ThESPUv5cidQcK77fwF0y21tvQXu08m';
        const url = `https://api.nytimes.com/svc/mostpopular/v2/${sortBy}/${timeFrame}.json?api-key=${apiKey}`;
        fetch(url)
        .then(res => res.json()) .then(data => {  
            // get only 5 articles
            const articles = data.results.slice(0, 5);
            displayArticles(articles);
     
        })
        .catch(err => {
        // error catching
        console.log(err) })
    }
  
    // update all the articles by the fetch
    function displayArticles(articles) {
        const newsContainer = document.querySelector('.news-container');
        newsContainer.innerHTML = '';
        let counter = 1; 

        articles.forEach(article => {
            const articleElement = document.createElement('div');
            articleElement.classList.add('article');
  
            const dateElement = document.createElement('small');
            dateElement.textContent = article.published_date;
            dateElement.style.float = 'right';
            dateElement.style.marginBottom = '5px';
            articleElement.appendChild(dateElement);

            const headline = document.createElement('h2');
            headline.textContent = counter + ") " + article.title;
            articleElement.appendChild(headline);

            const articleImg = document.createElement('img');
            articleImg.classList.add('article-img');
            if (article.media && article.media[0] && article.media[0]['media-metadata'] && article.media[0]['media-metadata'][0] && article.media[0]['media-metadata'][0].url) {
                articleImg.src = article.media[0]['media-metadata'][0].url;
                articleImg.style.width = '100px';
                articleImg.style.height = '100px';
            }
            articleImg.style.borderRadius = '10px';
            articleImg.style.marginRight = '10px';
            articleImg.style.float = 'left'; 
            articleElement.appendChild(articleImg);

            const text = document.createElement('p');
            text.textContent = article.abstract;
            text.style.display = 'inline-block';
            text.style.float = 'right';
            articleElement.appendChild(text);

            newsContainer.appendChild(articleElement);
            counter++;
      });
    }
    
    // event listener for the forms
    var filterForms = document.querySelectorAll('.filter form');

    filterForms.forEach(function(form) {
        form.addEventListener('change', function() {
            var sortBy = document.querySelector('input[name="sortBy"]:checked').value;
            var timeFrame = document.querySelector('input[name="timeFrame"]:checked').value;

            // fetch the articles with updated filter
            fetchNYTArticles(sortBy, timeFrame);
        });
    });

    // default display most viewed in the last day
    fetchNYTArticles('viewed', '1');
  });
  