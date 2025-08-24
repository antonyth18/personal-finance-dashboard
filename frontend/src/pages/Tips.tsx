import AppBar from "../components/AppBar";
import Sidebar from "../components/Sidebar";

export default function Tips() {
    return <div className="bg-big-black grid grid-cols-[16rem_1fr]">
        <div>
            <Sidebar />
        </div>
            
        <div>
            <AppBar heading="Tips"/>
        
        </div>
    </div>
}