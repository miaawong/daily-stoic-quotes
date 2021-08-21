import React, { useEffect, useState } from "react";
import { Main, Quote, Button, ButtonWrapper } from "./components/StyledHome";
import axios from "axios";

const Home = () => {
  const [quote, setQuote] = useState("");
  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const res = await axios
          .get("https://stoicquotesapi.com/v1/api/quotes/random")
          .then(res => console.log(res.data));
        setQuote(res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchQuote(); // fetch a random quote
  }, []);

  const getNewQuote = () => {
    const quoteElements = document.querySelectorAll("#quote");

    quoteElements.forEach(el => {
      el.classList.add("new-quote");
    });

    setTimeout(() => {
      quoteElements.forEach(el => {
        el.classList.remove("new-quote");
      });
    }, 1000);

    axios
      .get("https://stoicquotesapi.com/v1/api/quotes/random")
      .then(res => res.json())
      // setQuote(res.data);
      //})
      .catch(err => {
        console.log(err, "err");
      });
  };
  return (
    <Main data-testid="main">
      <h1 style={{ textAlign: "center" }}>Daily Stoic Quote</h1>

      <Quote>
        <h2 data-testid="quote" id="quote" style={{ textAlign: "center" }}>
          "{quote.body}"
        </h2>
      </Quote>
      <Quote>
        <h4 data-testid="author" id="quote" style={{ textAlign: "right" }}>
          - {quote.author}
        </h4>
      </Quote>
      <p>{quote.author}</p>

      <ButtonWrapper>
        <Button onClick={getNewQuote}>New Quote</Button>
      </ButtonWrapper>
    </Main>
  );
};

export default Home;
