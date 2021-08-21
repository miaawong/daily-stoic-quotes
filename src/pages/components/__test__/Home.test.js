import {
  render,
  screen,
  waitFor,
  cleanup,
  act,
  getResource,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "../../Home";
import axios from "axios";

jest.mock("axios");

global.fetch = axios.get.mockImplementation(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        author: "Marcus Aurelius",
        author_id: 1,
        body: "It is not events that disturb people, it is their judgements concerning them.",
        id: 30,
      }),
  })
);

// const data = { body: "value from the api" };
beforeEach(() => {
  jest.clearAllMocks();
});

beforeAll(() => {
  axios.get.mockResolvedValueOnce({ data: 1600 });
  //å axios.post.mockImplementation(() => Promise.resolve("whatever-post"));
});

afterEach(() => {
  cleanup();
});
// renders UI completely
test("renders UI", () => {
  const { getAllByTestId, getByTestId, getByText, getByRole } = render(
    <Home />
  );
  const mainEl = getByTestId("main");
  const title = getByText("Daily Stoic Quote");
  const quote = getByTestId("quote");
  const author = getByTestId("author");
  const button = getByRole("button");
  expect(mainEl).toBeInTheDocument();
  expect(title).toBeInTheDocument();
  expect(quote).toBeInTheDocument();
  expect(author).toBeInTheDocument();
  expect(button).toBeInTheDocument();
});

function mockCall() {
  axios.get.mockResolvedValueOnce({
    data: {
      body: "hello",
    },
  });
}

test("fetch and load quote on mount", async () => {
  mockCall();

  const { getByTestId } = render(<Home />);

  //check what's rendered in the row
  const rowValues = await waitFor(() => getByTestId("quote"));
  expect(rowValues).toHaveTextContent("hello");
  expect(axios.get).toHaveBeenCalledTimes(1);
  expect(axios.get).toHaveBeenCalledWith(
    "https://stoicquotesapi.com/v1/api/quotes/random"
  );
});
// animation
