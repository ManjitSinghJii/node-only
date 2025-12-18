import app from "./app.js";
import { connectDB } from "./config/db.js";
import { ENV } from "./config/env.js";

const startServer = async ()=> {
    try{
        await connectDB();

        const server = app.listen(ENV.PORT, () => {
            console.log(`Server running on port ${ENV.PORT}`);
            });

            // Graceful shutdown (future proof)
            process.on("SIGINT", () => {
            console.log("Shutting down server...");
            server.close(() => {
                process.exit(0);
            });
        });
    }
    catch(err){
        console.err("Server startup failed", err);
        process.exit(1);
    }
}

startServer()