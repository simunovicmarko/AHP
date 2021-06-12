import React from "react";
import "./index.css";
import "./Components/Tree/TreeNode";
import { Layout } from "./Layout";
// import { DataGrid } from '@material-ui/data-grid';
import { Main } from "./Components/Main";

function App() {
    return (
        <div className="App">
            <Layout>
                <Main />
            </Layout>
        </div>
    );
}

export default App;
