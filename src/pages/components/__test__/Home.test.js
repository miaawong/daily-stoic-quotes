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

// on mount, fetch quote

// onclick fetches new quote

// test("Example", async () => {
//   const url = "https://stoicquotesapi.com/v1/api/quotes/random";
//   const mockGet = jest.spyOn(axios, "get").mockResolvedValue({ body: "hello" });
//   const wrapper = render(<Home />);
//   await waitFor(() => expect.wrapper.queryAllByText("hello").toHaveLength(1));
// });

describe("good response", () => {
  it("loads the quote on mount", async () => {
    await act(() => {
      const { getAllByTestId, getByTestId, getByText, getByRole } = render(
        <Home />
      );

      expect(screen.getByText("Marcus Aurelius")).toBeInTheDocument();
    });
  });
});
// animation
