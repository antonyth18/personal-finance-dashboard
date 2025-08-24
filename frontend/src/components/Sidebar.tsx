import { HomeOutline } from "../icons/HomeOutline";
import { MoneyDollarCircleLine } from "../icons/MoneyDollarCircleLine";
import { OutlineAccountBalanceWallet } from "../icons/OutlineAccountBalanceWallet";
import { OutlineTipsAndUpdates } from "../icons/OutlineTipsAndUpdates";
import { TwotoneAttachMoney } from "../icons/TwotoneAttachMoney";
import SidebarButton from "./SidebarButton";

export default function Sidebar() {
    return <div className="w-full p-3 sticky top-0 h-screen bg-my-blue text-white">
        <div className="font-semibold text-xl p-3">
            Personal Finance
        </div>

        <div className="p-8"></div>
        
        <SidebarButton content="Dashboard" icon= {HomeOutline} page="dashboard"/>
        <SidebarButton content="Expenses" icon={OutlineAccountBalanceWallet} page="expense"/>
        <SidebarButton content="Income" icon={TwotoneAttachMoney} page="income"/>
        <SidebarButton content="Savings Goals" icon={MoneyDollarCircleLine} page="savings"/>
        <SidebarButton content="Tips" icon={OutlineTipsAndUpdates} page="tips"/>
        
    </div>
}