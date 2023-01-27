import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { CastMemberCreate } from "./features/cast-members/CastMemberCreate";
import { CastMemberEdit } from "./features/cast-members/CastMemberEdit";
import { CastMemberList } from "./features/cast-members/CastMemberList";
import { CategoryCreate } from "./features/categories/CategoryCreate";
import { CategoryEdit } from "./features/categories/CategoryEdit";
import { CategoryList } from "./features/categories/CategoryList";
import { GenreCreate } from "./features/genres/GenreCreate";
import { GenreEdit } from "./features/genres/GenreEdit";
import { GenreList } from "./features/genres/GenreList";
import { UploadList } from "./features/uploads/UploadList";
import { VideoCreate } from "./features/videos/VideoCreate";
import { VideoEdit } from "./features/videos/VideoEdit";
import { VideoList } from "./features/videos/VideoList";

function App() {
  return (
    <Layout>
      <UploadList
        uploads={[
          { name: "banner", progress: 1 },
          { name: "thumbnail", progress: 1 },
          { name: "trailer", progress: 1 },
          { name: "video", progress: 1 },
        ]}
      />
      <Routes>
        <Route path="/" element={<CategoryList />} />
        {/* Category */}
        <Route path="/categories" element={<CategoryList />} />
        <Route path="/categories/create" element={<CategoryCreate />} />
        <Route path="/categories/edit/:id" element={<CategoryEdit />} />

        {/* Cast Members */}
        <Route path="/cast-members" element={<CastMemberList />} />
        <Route path="/cast-members/create" element={<CastMemberCreate />} />
        <Route path="/cast-members/edit/:id" element={<CastMemberEdit />} />

        {/* Genres */}
        <Route path="/genres" element={<GenreList />} />
        <Route path="/genres/create" element={<GenreCreate />} />
        <Route path="/genres/edit/:id" element={<GenreEdit />} />

        {/* Videos */}
        <Route path="/videos" element={<VideoList />} />
        <Route path="/videos/create" element={<VideoCreate />} />
        <Route path="/videos/edit/:id" element={<VideoEdit />} />

        <Route
          path="*"
          element={
            <Box sx={{ color: "white" }}>
              <Typography variant="h1">404</Typography>
              <Typography variant="h2">Page not found</Typography>
            </Box>
          }
        />
      </Routes>
    </Layout>
  );
}

export default App;
