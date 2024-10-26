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
import CompanyDashboard from "./pages/CompanyDashboard"
import CreateQuest from "./pages/CreateQuest"

const queryClient = new QueryClient()

// プログラマーユーザーのみアクセスを許可するガード
const ProgrammerRoute = ({ children }) => {
  const userType = localStorage.getItem("userType");
  
  if (userType !== "programmer") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// 企業ユーザーのみアクセスを許可するガード
const CompanyRoute = ({ children }) => {
  const userType = localStorage.getItem("userType");
  
  if (userType !== "company") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/company-dashboard"
            element={
              <CompanyRoute>
                <CompanyDashboard />
              </CompanyRoute>
            }
          />
          <Route
            path="/create-quest"
            element={
              <CompanyRoute>
                <CreateQuest />
              </CompanyRoute>
            }
          />
          <Route
            path="/home"
            element={
              <ProgrammerRoute>
                <Home />
              </ProgrammerRoute>
            }
          />
          <Route
            path="/quests/:categoryId"
            element={
              <ProgrammerRoute>
                <QuestDetails />
              </ProgrammerRoute>
            }
          />
          <Route
            path="/party-search/:questId"
            element={
              <ProgrammerRoute>
                <PartySearch />
              </ProgrammerRoute>
            }
          />
          <Route
            path="/accepted-jobs"
            element={
              <ProgrammerRoute>
                <AcceptedJobs />
              </ProgrammerRoute>
            }
          />
          <Route
            path="/party-requests"
            element={
              <ProgrammerRoute>
                <PartyRequests />
              </ProgrammerRoute>
            }
          />
          <Route
            path="/messages"
            element={
              <ProgrammerRoute>
                <Messages />
              </ProgrammerRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
)

export default App