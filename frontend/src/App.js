
import React, { Suspense, lazy } from 'react';

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";

const LandingPage = lazy(() => import('./screens/LandingPage/LandingPage'));
const LoginScreen = lazy(() => import('./screens/LoginScreen/LoginScreen'));
const RegisterScreen = lazy(() => import('./screens/RegisterScreen/RegisterScreen'));
const MyNotes = lazy(() => import('./screens/MyNotes/MyNotes'));
const SingleNote = lazy(() => import('./screens/SingleNote/SingleNote'));
const CreateNote = lazy(() => import('./screens/SingleNote/CreateNote'));
const ProfileScreen = lazy(() => import('./screens/ProfileScreen/ProfileScreen'));

function App() {
  const [search, setSearch] = useState("");

  return (
    <BrowserRouter>
      <Header setSearch={(s) => setSearch(s)} />
      <main className="App">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<LandingPage />} exact />
            <Route path="/login" element={<LoginScreen />} exact />
            <Route path="/register" element={<RegisterScreen />} exact />
            <Route path="/mynotes" element={<MyNotes search={search} />} />
            <Route path="/note/:id" element={<SingleNote />} exact />
            <Route path="/createnote" element={<CreateNote />} exact />
            <Route path="/profile" element={<ProfileScreen />} exact />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </BrowserRouter>

  );
}

export default App;
