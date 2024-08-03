Supabase and Express Server
Overview
This project sets up an Express server connected to a Supabase instance. The server provides two endpoints:

/ - A root endpoint that returns a simple message indicating that the server is running.
/data - An endpoint that retrieves and returns data from a Supabase table.
Features
Express Server: Provides a RESTful API with basic routes.
Supabase Integration: Connects to a Supabase instance to fetch data from a specified table.
Environment Configuration: Uses environment variables to securely store and access configuration settings.
Getting Started
Prerequisites
Node.js and npm installed on your local machine.
A Supabase account with an active project and table.
MongoDB instance (if required by other parts of your project).