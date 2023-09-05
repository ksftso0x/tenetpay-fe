import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/Signup";
import Reset from "./pages/auth/passwordReset";
import Wallet from "./pages/wallet/wallet";
import { RecoilRoot } from "recoil";
import Cards from "./pages/cards/cards";
import Transact from "./pages/transact";
import CreateWallet from "./pages/wallet/create";
import TopUp from "./pages/wallet/topup/topUp";
import EftTopUp from "./pages/wallet/topup/eft";
import StoreTopUp from "./pages/wallet/topup/store";
import AtmTopUp from "./pages/wallet/topup/atm";
import Withdraw from "./pages/wallet/withdraw/withdraw";
import EftWithDraw from "./pages/wallet/withdraw/eft";
import StoreWithDraw from "./pages/wallet/withdraw/store";
import AtmWithdraw from "./pages/wallet/withdraw/atm";
import Transfer from "./pages/wallet/transfer/transfer";
import AddCard from "./pages/cards/add";
import TopUpLinked from "./pages/wallet/topup/linked";
import FindAtm from "./pages/wallet/withdraw/findAtm";
import ManageCards from "./pages/cards/manage";
import CreateVirtualCard from "./pages/cards/create-virtualCard";
import AddPhysicalCard from "./pages/cards/add-physicalCard";
import PayQR from "./pages/QR/Pay";
import GetPaidWithQR from "./pages/QR/GetPaid";
import VasMenu from "./pages/VAS/VasMenu";
import BuyAirtimeAndData from "./pages/VAS/AirtimeData.tsx/airtimeData";
import PayAirtime from "./pages/VAS/AirtimeData.tsx/airtime";
import Electricity from "./pages/VAS/Electricity";
import PayBill from "./pages/VAS/Paybill/paybill";
import Profile from "./pages/profile";
import GeneralError from "./pages/errors/General";
import OfflineError from "./pages/errors/Offline";
import PhysicalCardNotActivated from "./pages/errors/NotPhysicalCard";
import WeNeedToChat from "./pages/errors/KYC/Asap";
import ThereSomethingWithYourInfomation from "./pages/errors/KYC/Look";
import { QueryClient, QueryClientProvider } from "react-query";
import NotFound from "./pages/notfound";
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<App />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/reset" element={<Reset />} />
            <Route path="/wallet" element={<Wallet />} />

            <Route path="/vs/menu" element={<VasMenu />} />
            <Route path="/vs/menu/electricity" element={<Electricity />} />
            <Route path="/pay-bill" element={<PayBill />} />
            <Route
              path="/vs/menu/airtime-data"
              element={<BuyAirtimeAndData />}
            />
            <Route
              path="/vs/menu/airtime-data/airtime"
              element={<PayAirtime />}
            />
            <Route path="/qr/pay" element={<PayQR />} />
            <Route path="/qr/get-paid" element={<GetPaidWithQR />} />
            <Route path="/wallet/transfer" element={<Transfer />} />
            <Route path="/wallet/withdraw" element={<Withdraw />} />
            <Route path="/wallet/withdraw/eft" element={<EftWithDraw />} />
            <Route path="/wallet/withdraw/store" element={<StoreWithDraw />} />
            <Route path="/wallet/withdraw/atm" element={<AtmWithdraw />} />
            <Route path="/wallet/withdraw/atm/find" element={<FindAtm />} />
            <Route path="/wallet/create" element={<CreateWallet />} />
            <Route path="/wallet/top-up" element={<TopUp />} />
            <Route path="/wallet/top-up/linked" element={<TopUpLinked />} />
            <Route path="/wallet/top-up/eft" element={<EftTopUp />} />
            <Route path="/wallet/top-up/store" element={<StoreTopUp />} />
            <Route path="/wallet/top-up/atm" element={<AtmTopUp />} />
            <Route path="/cards" element={<Cards />} />
            <Route path="/cards/add" element={<AddCard />} />
            <Route
              path="/cards/create-virtual-card"
              element={<CreateVirtualCard />}
            />
            <Route
              path="/cards/add-physical-card"
              element={<AddPhysicalCard />}
            />
            <Route path="/error/general" element={<GeneralError />} />
            <Route path="/error/offline" element={<OfflineError />} />
            <Route path="/error/no-virtual-card" element={<OfflineError />} />
            <Route
              path="/error/physical-card-notActivated"
              element={<PhysicalCardNotActivated />}
            />
            <Route path="/error/kyc/asap" element={<WeNeedToChat />} />
            <Route
              path="/error/kyc/look"
              element={<ThereSomethingWithYourInfomation />}
            />
            <Route path="/cards/manage" element={<ManageCards />} />
            <Route path="/transact" element={<Transact />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/transaction-history" element={<Transact />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>
);
