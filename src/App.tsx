import { Typography } from "@mui/material";
import { Box, ThemeProvider } from "@mui/system";
import { SnackbarProvider } from "notistack";
import { Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { Layout } from "./components/Layout";
import { appTheme } from "./config/theme";
import { CastMemberCreate } from "./features/cast-members/CastMemberCreate";
import { CastMemberEdit } from "./features/cast-members/CastMemberEdit";
import { CastMemberList } from "./features/cast-members/CastMemberList";
import { CategoryCreate } from "./features/categories/CategoryCreate";
import { CategoryEdit } from "./features/categories/CategoryEdit";
import { CategoryList } from "./features/categories/CategoryList";
import { GenreCreate } from "./features/genres/GenreCreate";
import { GenreEdit } from "./features/genres/GenreEdit";
import { GenreList } from "./features/genres/GenreList";

function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <SnackbarProvider
        autoHideDuration={2000}
        maxSnack={3}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Box
          component="main"
          sx={{
            height: "100vh",
            minHeight: 650,
            backgroundColor: (theme) => theme.palette.grey[900],
          }}
        >
          <Header />
          <Layout>
            <Routes>
              <Route path="/" element={<CategoryList />} />
              {/* Category */}
              <Route path="/categories" element={<CategoryList />} />
              <Route path="/categories/create" element={<CategoryCreate />} />
              <Route path="/categories/edit/:id" element={<CategoryEdit />} />

              {/* Cast Members */}
              <Route path="/cast-members" element={<CastMemberList />} />
              <Route
                path="/cast-members/create"
                element={<CastMemberCreate />}
              />
              <Route
                path="/cast-members/edit/:id"
                element={<CastMemberEdit />}
              />

              {/* Genres */}
              <Route path="/genres" element={<GenreList />} />
              <Route path="/genres/create" element={<GenreCreate />} />
              <Route path="/genres/edit/:id" element={<GenreEdit />} />

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
        </Box>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
