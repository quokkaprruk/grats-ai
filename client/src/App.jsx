import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import WriteArticle from "./pages/WriteArticle";
import BlogTitles from "./pages/BlogTitles";
import RemoveBackground from "./pages/RemoveBackground";
import ReviewResume from "./pages/ReviewResume";
import Community from "./pages/Community";
import RemoveObject from "./pages/RemoveObject";
import GenerateImages from "./pages/GenerateImages";
import SummarizeText from "./pages/SummarizeText";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

function App() {
  // We remove this after using Toaster
  // const { getToken } = useAuth();
  // useEffect(() => {
  //   getToken().then((token) => console.log(token));
  // }, []);

  return (
    <div>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ai" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="write-article" element={<WriteArticle />} />
          <Route path="blog-titles" element={<BlogTitles />} />
          <Route path="generate-images" element={<GenerateImages />} />
          <Route path="remove-background" element={<RemoveBackground />} />
          <Route path="remove-object" element={<RemoveObject />} />
          <Route path="review-resume" element={<ReviewResume />} />
          <Route path="community" element={<Community />} />
          <Route path="summarize-text" element={<SummarizeText />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
