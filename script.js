const quoteContainer = document.getElementById('quoteContainer');
const quoteText = document.getElementById('quoteText');
const authorName = document.getElementById('authorName');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new_quote');
const loader = document.getElementById('loader');

function loading(){
	loader.hidden = false;
	quoteContainer.hidden = true;
}

function complete(){
	loader.hidden = true;
	quoteContainer.hidden = false;
}

function newQuote(){
	loading();

	const quote = apiQuote[Math.floor(Math.random() * apiQuote.length)];
	if (!quote.author){
		authorName.textContent = 'Unknwon';
	} else{
		authorName.textContent = quote.author;
	}

	if (quote.text.length > 50){
		quoteText.classList.add('long_quote');
	} else{
		quoteText.classList.remove('long_quote');
	}

	quoteText.textContent = quote.text;
	complete();
}

let apiQuote = [];

async function getQuotes(){
	loading();
	const apiUrl = 'https://type.fit/api/quotes';
	try{
		const response = await fetch (apiUrl);
		apiQuote = await response.json();
		newQuote();
	} catch (error){

	}
}

function tweetQuote(){
	const url = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorName.textContent}`;
	window.open(url, '_blank');
}

twitterBtn.addEventListener('click', tweetQuote);
newQuoteBtn.addEventListener('click', newQuote);


getQuotes();