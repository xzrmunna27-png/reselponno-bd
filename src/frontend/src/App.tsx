import { BottomNav } from "@/components/BottomNav";
import { Header } from "@/components/Header";
import { Modal } from "@/components/Modal";
import { NoticeCard } from "@/components/NoticeCard";
import { PromoBanner } from "@/components/PromoBanner";
import { ServiceGrid } from "@/components/ServiceGrid";
import { Sidebar } from "@/components/Sidebar";
import { SocialLinks } from "@/components/SocialLinks";
import { PlaceholderPage } from "@/pages/PlaceholderPage";
import type { ActiveTab, ModalState } from "@/types";
import { Calendar, Package, User } from "lucide-react";
import { useState } from "react";

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modal, setModal] = useState<ModalState>({ type: null });

  const openModal = (type: ModalState["type"], serviceName?: string) => {
    setModal({ type, serviceName });
  };
  const closeModal = () => setModal({ type: null });

  return (
    <div
      className="min-h-screen bg-muted"
      style={{ fontFamily: "system-ui, sans-serif" }}
    >
      {/* Centered mobile container */}
      <div
        className="relative mx-auto bg-background min-h-screen flex flex-col"
        style={{ maxWidth: "480px" }}
      >
        <Header
          onMenuClick={() => setSidebarOpen(true)}
          onBalanceClick={() => openModal("balance")}
        />

        {/* Scrollable content area */}
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
              />
            </div>
          )}

          {activeTab === "products" && (
            <PlaceholderPage
              title="নতুন প্রডাক্ট"
              Icon={Package}
              description="নতুন প্রডাক্টসমূহ শীঘ্রই এখানে প্রদর্শিত হবে। আমাদের সাথে থাকুন!"
            />
          )}

          {activeTab === "daily" && (
            <PlaceholderPage
              title="প্রতিদিন"
              Icon={Calendar}
              description="দৈনিক আপডেট এবং অফার শীঘ্রই এখানে আসছে।"
            />
          )}

          {activeTab === "profile" && (
            <PlaceholderPage
              title="আমার প্রোফাইল"
              Icon={User}
              description="আপনার প্রোফাইল তথ্য এবং অ্যাকাউন্ট সেটিংস এখানে পাবেন।"
            />
          )}
        </main>

        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {modal.type && <Modal modal={modal} onClose={closeModal} />}
      </div>
    </div>
  );
}
