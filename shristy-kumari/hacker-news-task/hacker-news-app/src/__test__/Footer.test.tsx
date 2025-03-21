import { render,screen } from "@testing-library/react";
import Footer from "../Components/Footer"

describe("Footer Component", () => {
  test("renders the footer with correct text",()=>{
     render(<Footer/>)
     expect(screen.getByText("HACKERNEWS.")).toBeInTheDocument()
  })
})