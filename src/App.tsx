import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Login } from "./components/Login";
import { ProtectedRoute } from "./components/ProtectedRoute";
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
      <UploadList />
      <Routes>
        {/* Login */}
        <Route path="/login" element={<Login />} />
        {/* Category is the default route  */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <CategoryList />
            </ProtectedRoute>
          }
        />
        {/* Category */}
        <Route
          path="/categories"
          element={
            <ProtectedRoute>
              <CategoryList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/categories/create"
          element={
            <ProtectedRoute>
              <CategoryCreate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/categories/edit/:id"
          element={
            <ProtectedRoute>
              <CategoryEdit />
            </ProtectedRoute>
          }
        />

        {/* Cast Members */}
        <Route
          path="/cast-members"
          element={
            <ProtectedRoute>
              <CastMemberList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cast-members/create"
          element={
            <ProtectedRoute>
              <CastMemberCreate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cast-members/edit/:id"
          element={
            <ProtectedRoute>
              <CastMemberEdit />
            </ProtectedRoute>
          }
        />

        {/* Genres */}
        <Route
          path="/genres"
          element={
            <ProtectedRoute>
              <GenreList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/genres/create"
          element={
            <ProtectedRoute>
              <GenreCreate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/genres/edit/:id"
          element={
            <ProtectedRoute>
              <GenreEdit />
            </ProtectedRoute>
          }
        />

        {/* Videos */}
        <Route
          path="/videos"
          element={
            <ProtectedRoute>
              <VideoList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/videos/create"
          element={
            <ProtectedRoute>
              <VideoCreate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/videos/edit/:id"
          element={
            <ProtectedRoute>
              <VideoEdit />
            </ProtectedRoute>
          }
        />

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
