import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ChaptersPage from './pages/ChaptersPage';
import ChapterPage from './pages/ChapterPage';
import LessonPage from './pages/LessonPage';
import GamePage from './pages/GamePage';
import LoginPage from './pages/LoginPage';
import NavBar from './Components/NavBar';
// import Footer from './Components/Footer';
import PrivateRoute from './routes/PrivateRoute';
import AuthRoute from './routes/AuthRoute'
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <div>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<AuthRoute element={<RegisterPage />} />} />
          <Route path="/login" element={<AuthRoute element={<LoginPage />} />} />
          <Route path="/chapters" element={<PrivateRoute element={<ChaptersPage />} />} />
          <Route path="/chapter/:chapterId" element={<PrivateRoute element={<ChapterPage />} />} />
          <Route path="/chapter/:chapterId/lesson/:lessonId" element={<PrivateRoute element={<LessonPage />} />} />

          <Route path="/chapter/:chapterId/game/:gameId" element={<PrivateRoute element={<GamePage />} />} />
        </Routes>
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
