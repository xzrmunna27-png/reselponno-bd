import { BottomNav } from "@/components/BottomNav";
import { Header } from "@/components/Header";
import { Modal } from "@/components/Modal";
import { NoticeCard } from "@/components/NoticeCard";
import { PromoBanner } from "@/components/PromoBanner";
import { ServiceGrid } from "@/components/ServiceGrid";
import { Sidebar } from "@/components/Sidebar";
import { SocialLinks } from "@/components/SocialLinks";
import { AdminPage } from "@/pages/AdminPage";
import { CreateAccountPage } from "@/pages/CreateAccountPage";
import { LandingPage } from "@/pages/LandingPage";
import { LoginPage } from "@/pages/LoginPage";
import { OrdersPage } from "@/pages/OrdersPage";
import { ProductsPage } from "@/pages/ProductsPage";
import { ProfilePage } from "@/pages/ProfilePage";
import type { ActiveTab, AppState, ModalState } from "@/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

const qc = new QueryClient();

export default function App() {
  // Route check first — /admin always shows admin
  const isAdminRoute =
    typeof window !== "undefined" && window.location.pathname === "/admin";

  const [appState, setAppState] = useState<AppState>({
    isLoggedIn: isAdminRoute,
    isAdmin: isAdminRoute,
    currentReseller: null,
  });
  const [view, setView] = useState<
    "landing" | "login" | "app" | "createAccount"
  >(isAdminRoute ? "app" : "landing");

  const handleLogin = (isAdmin: boolean, phone?: string, name?: string) => {
    setAppState({
      isLoggedIn: true,
      isAdmin,
      currentReseller: isAdmin
        ? null
        : phone
          ? { id: BigInt(Date.now()), name: name ?? phone, phone }
          : null,
    });
    setView("app");
  };

  if (view === "landing") {
    return (
      <QueryClientProvider client={qc}>
        <LandingPage onGetStarted={() => setView("login")} />
      </QueryClientProvider>
    );
  }

  if (view === "login") {
    return (
      <QueryClientProvider client={qc}>
        <LoginPage
          onLogin={handleLogin}
          onCreateAccount={() => setView("createAccount")}
        />
      </QueryClientProvider>
    );
  }

  if (view === "createAccount") {
    return (
      <QueryClientProvider client={qc}>
        <CreateAccountPage
          onSuccess={(phone, name) => handleLogin(false, phone, name)}
          onBack={() => setView("login")}
        />
      </QueryClientProvider>
    );
  }

  if (appState.isAdmin) {
    return (
      <QueryClientProvider client={qc}>
        <AdminPage
          onLogout={() => {
            setAppState({
              isLoggedIn: false,
              isAdmin: false,
              currentReseller: null,
            });
            setView("landing");
          }}
        />
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={qc}>
      <MainApp
        appState={appState}
        onLogout={() => {
          setAppState({
            isLoggedIn: false,
            isAdmin: false,
            currentReseller: null,
          });
          setView("landing");
        }}
      />
    </QueryClientProvider>
  );
}

function MainApp({
  appState,
  onLogout,
}: { appState: AppState; onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState<ActiveTab>("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modal, setModal] = useState<ModalState>({ type: null });

  const openModal = (type: ModalState["type"], serviceName?: string) =>
    setModal({ type, serviceName });
  const closeModal = () => setModal({ type: null });

  return (
    <div className="min-h-screen bg-muted">
      <div
        className="relative mx-auto bg-background min-h-screen flex flex-col"
        style={{ maxWidth: "480px" }}
      >
        <Header
          onMenuClick={() => setSidebarOpen(true)}
          onBalanceClick={() => openModal("balance")}
        />
        <main
          className="flex-1 flex flex-col overflow-y-auto"
          style={{ paddingTop: "52px", paddingBottom: "64px" }}
          data-ocid="main.page"
        >
          {activeTab === "home" && (
            <div className="flex flex-col gap-3 py-3">
              <PromoBanner onOrderClick={() => openModal("order")} />
              <SocialLinks />
              <NoticeCard onDetailsClick={() => openModal("notice")} />
              <ServiceGrid
                onServiceClick={(name) => openModal("service", name)}
                resellerId={appState.currentReseller?.id ?? null}
                onLogout={onLogout}
              />
            </div>
          )}
          {activeTab === "products" && (
            <ProductsPage reseller={appState.currentReseller} />
          )}
          {activeTab === "daily" && (
            <OrdersPage reseller={appState.currentReseller} />
          )}
          {activeTab === "profile" && (
            <ProfilePage
              reseller={appState.currentReseller}
              onLogout={onLogout}
            />
          )}
        </main>
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onLogout={onLogout}
          reseller={appState.currentReseller}
        />
        {modal.type && (
          <Modal
            modal={modal}
            onClose={closeModal}
            resellerId={appState.currentReseller?.id ?? null}
          />
        )}
      </div>
    </div>
  );
}
