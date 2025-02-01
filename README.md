# FAQ System

A simple FAQ (Frequently Asked Questions) system built using React for the frontend, Node.js for the backend, and MongoDB for storing FAQs. It supports adding, editing, deleting, and viewing FAQs. The system also includes multilingual support for FAQs and caching for optimized performance.

## Features

- **Create, Read, Update, Delete (CRUD)**: Admin can create, view, edit, and delete FAQs.
- **Multilingual Support**: FAQ questions and answers can be translated into different languages.
- **Caching**: FAQs are cached for faster retrieval and better performance.
- **Frontend**: Built using React for a dynamic and responsive user interface.
- **Backend**: API built using Express.js for handling CRUD operations.

## Tech Stack

- **Frontend**: React, Chakra UI, React Router
- **Backend**: Node.js, Express.js, MongoDB
- **Caching**: NodeCache for storing FAQs in memory
- **Translation**: Google Translate API (or a custom translation utility)

## Installation

### Prerequisites

- Node.js
- MongoDB instance (local or Atlas)

### Backend Setup

1. Clone the repository:
   ```bash
   git clone <repo_url>
   cd backend
