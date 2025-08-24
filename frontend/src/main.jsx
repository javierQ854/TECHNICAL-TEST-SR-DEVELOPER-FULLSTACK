import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import React from "react";
import Propertie from "./Pages/Propertie.jsx";
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}/>
          <Route path="/propertie/:id" element={<Propertie />}/>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>

)
