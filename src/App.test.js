import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

jest.mock("axios", () => ({
  __esModule: true,
  default: jest.fn(),
  get: jest.fn(),
}));
jest.mock("./components/docPage/doc/docTemplate", () => ({
  __esModule: true,
  default: () => null,
}));

it("renders the main navigation", () => {
  const div = document.createElement("div");
  const root = createRoot(div);

  act(() => {
    root.render(
      <MemoryRouter initialEntries={["/not-found"]}>
        <App />
      </MemoryRouter>,
    );
  });

  expect(div.textContent).toContain("主页");
  expect(div.textContent).toContain("新闻");
  expect(div.textContent).toContain("帮助文档");

  act(() => root.unmount());
});
