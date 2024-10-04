import { Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import AdDetailsPage from "./pages/AdDetailsPage";
import NewAdFormPage from "./pages/NewAdForm";
import NewCategoryFormPage from "./pages/NewCategoryForm";
import AdSearchPage from "./pages/AdSearchPage";
import AdsByCategoryPage from "./pages/AdsByCategoryPage";
import AdEditPage from "./pages/AdEditPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="ad/new" element={<NewAdFormPage />} />
          <Route path="ad/edit/:id" element={<AdEditPage />} />
          <Route path="ad/search/:keyword" element={<AdSearchPage />} />
          <Route path="ad/:id" element={<AdDetailsPage />} />
          <Route path="category/new" element={<NewCategoryFormPage />} />
          <Route path="category/:keyword" element={<AdsByCategoryPage />} />
        </Route>
      </Routes>
      <ToastContainer theme="colored" />
    </>
  );
}

export default App;
