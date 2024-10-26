import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./components/auth/AuthProvider"
import { ProtectedRoute } from "./components/auth/ProtectedRoute"
import Index from "./pages/Index"
import AuthPage from "./pages/Auth"
import Home from "./pages/Home"
import QuestDetails from "./pages/QuestDetails"
import PartySearch from "./pages/PartySearch"
import AcceptedJobs from "./pages/AcceptedJobs"
import PartyRequests from "./pages/PartyRequests"
import Messages from "./pages/Messages"
import CompanyDashboard from "./pages/CompanyDashboard"
import CreateQuest from "./pages/CreateQuest"

const queryClient = new QueryClient()

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/quests/:categoryId"
              element={
                <ProtectedRoute>
                  <QuestDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/party-search/:questId"
              element={
                <ProtectedRoute>
                  <PartySearch />
                </ProtectedRoute>
              }
            />
            <Route
              path="/accepted-jobs"
              element={
                <ProtectedRoute>
                  <AcceptedJobs />
                </ProtectedRoute>
              }
            />
            <Route
              path="/party-requests"
              element={
                <ProtectedRoute>
                  <PartyRequests />
                </ProtectedRoute>
              }
            />
            <Route
              path="/messages"
              element={
                <ProtectedRoute>
                  <Messages />
                </ProtectedRoute>
              }
            />
            <Route
              path="/company-dashboard"
              element={
                <ProtectedRoute>
                  <CompanyDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create-quest"
              element={
                <ProtectedRoute>
                  <CreateQuest />
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
)

export default App