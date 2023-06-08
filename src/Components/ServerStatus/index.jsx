import "./index.css";

const ServerStatus = (status) => {
    console.log(status.data);

    return (
        <>
            <div id="server-status-container" >
                <h1>{status.data}</h1>
            </div>
        </>
    )
}

export default ServerStatus;