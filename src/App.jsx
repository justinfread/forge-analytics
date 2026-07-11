import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import WhaleWatch from "./pages/WhaleWatch";
import SocialPayExplorer from "./pages/SocialPayExplorer";
import Stablecoins from "./pages/Stablecoins";
import Partnerships from "./pages/Partnerships";
import News from "./pages/News";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="whale-watch" element={<WhaleWatch />} />
        <Route path="socialpay" element={<SocialPayExplorer />} />
        <Route path="stablecoins" element={<Stablecoins />} />
        <Route path="partnerships" element={<Partnerships />} />
        <Route path="news" element={<News />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;