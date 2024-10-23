import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Index from "./pages/Index"
import Login from "./pages/Login"
import Home from "./pages/Home"
import QuestDetails from "./pages/QuestDetails"
import PartySearch from "./pages/PartySearch"
import AcceptedJobs from "./pages/AcceptedJobs"
import PartyRequests from "./pages/PartyRequests"
import Messages from "./pages/Messages"

const queryClient = new QueryClient()

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/quests/:categoryId" element={<QuestDetails />} />
          <Route path="/party-search/:questId" element={<PartySearch />} />
          <Route path="/accepted-jobs" element={<AcceptedJobs />} />
          <Route path="/party-requests" element={<PartyRequests />} />
          <Route path="/messages" element={<Messages />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
)

export default App